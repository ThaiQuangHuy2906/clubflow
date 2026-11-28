import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { createInterface } from 'node:readline';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const seed = JSON.parse(readFileSync(new URL('./data/seed.json', import.meta.url)));

async function start(t) {
  const server = spawn(process.execPath, [fileURLToPath(new URL('./server.mjs', import.meta.url))], {
    env: { ...process.env, PORT: '0', MOCK_MODE: 'normal', DEMO_ENABLED: 'true' },
    stdio: ['ignore', 'pipe', 'inherit']
  });
  const exited = once(server, 'exit');
  t.after(async () => { server.kill(); await exited; });
  const lines = createInterface({ input: server.stdout });
  const first = await Promise.race([once(lines, 'line'), exited.then(() => { throw Error('Mock exited during startup'); })]);
  const port = first[0].match(/port (\d+)$/)[1];
  const tokens = new Map();
  async function request(method, path, body, status = 200, role = 'exec') {
    const headers = { 'Content-Type': 'application/json' };
    if (tokens.has(role)) headers.Authorization = 'Bearer ' + tokens.get(role);
    const res = await fetch('http://localhost:' + port + '/api/' + path, { method, headers, body: JSON.stringify(body) });
    const data = await res.json();
    assert.equal(res.status, status, method + ' ' + path + ': ' + JSON.stringify(data.error ?? {}));
    return data;
  }
  for (const alias of ['exec', 'studentA', 'studentB', 'int-content']) {
    const { email, password } = seed.accounts.find(account => account.alias === alias);
    tokens.set(alias, (await request('POST', 'auth/login', { email, password }, 200, alias)).token);
  }
  return request;
}

test('screening checks the reviewed application and public reason only', async t => {
  const api = await start(t);
  const path = 'applications/A01';
  const change = body => api('PATCH', path + '/screening', body);
  const publish = (body, status) => api('POST', path + '/screening/publication', body, status);
  const owner = () => api('GET', path, undefined, 200, 'studentA');
  const first = await change({ status: 'Shortlisted' });
  await api('PATCH', 'applications/A02/screening', { status: 'Rejected' });
  assert.equal((await change({ privateNote: 'Internal only' })).revision, first.revision);
  assert.equal((await publish({ revision: first.revision })).publishedScreening.status, 'Shortlisted');
  const rejected = await change({ status: 'Rejected', applicantReason: 'Reason one' });
  assert.equal((await publish({ revision: first.revision }, 409)).error.code, 'STALE_REVISION');
  const final = await change({ applicantReason: 'Reason two' });
  assert.equal((await change({ applicantReason: 'Reason two' })).revision, final.revision);
  assert.equal((await publish({ revision: rejected.revision }, 409)).error.code, 'STALE_REVISION');
  for (const body of [{}, {revision:-1}, {revision:'1'}, {revision:final.revision, extra:true}]) {
    assert.equal((await publish(body, 400)).error.code, 'VALIDATION');
  }
  const before = await owner();
  assert.equal(before.status, 'Shortlisted');
  assert.equal(before.applicantReason, null);
  assert.equal('revision' in before, false);
  const published = await publish({ revision: final.revision });
  await change({ privateNote: 'Updated after publication' });
  const retried = await publish({ revision: final.revision });
  assert.deepEqual(retried.publishedScreening, published.publishedScreening);
  assert.equal(retried.revision, published.revision);
  assert.equal(retried.privateNote, 'Updated after publication');
  assert.equal((await owner()).applicantReason, 'Reason two');
});

test('campaign release rejects a stale board and concurrent retries return one immutable release', async t => {
  const api = await start(t);
  const results = () => api('GET', 'results');
  const notices = who => api('GET', 'notifications', undefined, 200, who);
  const publish = (revision, status) => api('POST', 'results/publication', {revision}, status);
  const save = (id, body) => api('PUT', 'applications/' + id + '/result', body);
  assert.equal((await results()).revision, 0);
  for (const id of ['A01','A02','A03']) {
    await api('PATCH', 'applications/' + id + '/screening', {status:id === 'A03' ? 'Rejected' : 'Shortlisted'});
  }
  const schedule = await api('GET', 'schedule');
  const {window, revision} = schedule;
  const draft = await api('POST', 'schedule/draft', {action:'generate', window, revision});
  const assignments = draft.rows.map(({applicationId, slotId, interviewerId, roomId}) => ({applicationId, slotId, interviewerId, roomId}));
  const saved = await api('PUT', 'schedule', {window, revision, assignments});
  await api('POST', 'demo/steps', {action:'pastClose'});
  await api('POST', 'schedule/confirmation', {revision:saved.revision});
  const scheduled = await results();
  await api('POST', 'demo/steps', {action:'pastInterviews'});
  const ended = await results();
  assert.ok(ended.revision > scheduled.revision);
  await api('POST', 'interviews/IV-A01/assessment', {feedback:'Good work'}, 201, 'int-content');
  assert.ok((await results()).revision > ended.revision);
  await save('A01', {decision:'Pass'});
  await save('A02', {decision:'Fail', caseStatus:'Absent'});
  const reviewed = await results();
  await save('A02', {decision:'Fail', caseStatus:'Absent'});
  assert.equal((await results()).revision, reviewed.revision);
  await save('A01', {decision:'Fail'});
  assert.equal((await publish(reviewed.revision, 409)).error.code, 'STALE_REVISION');
  const afterDecision = await results();
  await save('A02', { caseStatus: 'Attended' });
  assert.equal((await publish(afterDecision.revision, 409)).error.code, 'STALE_REVISION');
  await save('A02', { decision: 'Pass' });
  const current = await results();
  assert.equal(current.publishedAt, null);
  assert.equal((await notices('studentA')).total, 0);
  assert.equal((await api('GET','applications/A01',undefined,200,'studentA')).result, null);
  for (const body of [{}, { revision: -1 }, { revision: '1' }, { revision: current.revision, extra: true }]) {
    assert.equal((await api('POST', 'results/publication', body, 400)).error.code, 'VALIDATION');
  }
  const [a,b] = await Promise.all([publish(current.revision), publish(current.revision)]);
  assert.ok(a.publishedAt);
  assert.deepEqual(a,b);
  const original = await notices('studentA');
  assert.deepEqual(original.items.map(n => [n.applicationId,n.result]), [['A01','Fail'],['A02','Pass']]);
  assert.deepEqual(await publish(current.revision), a);
  assert.equal((await publish(reviewed.revision,409)).error.code,'STALE_REVISION');
  assert.deepEqual(await notices('studentA'),original);
  assert.equal((await notices('studentB')).total,0);
});
