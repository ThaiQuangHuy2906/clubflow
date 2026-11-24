import test from 'node:test';
import assert from 'node:assert/strict';
import { campaignForm, newDepartment, newPosition, prepareCampaign, previewIntake } from './campaignForm.js';

test('incomplete drafts serialize empty text, dates, row lists and unset quotas', () => {
  const form = campaignForm(null);
  const dept = newDepartment();
  const position = newPosition();
  dept.positions.push(position);
  form.departments.push(dept);
  const { body, errors } = prepareCampaign(form, false);
  assert.deepEqual(errors, {});
  assert.equal(body.opensAt, '');
  assert.equal(body.departments[0].positions[0].quota, null);
  assert.match(position.id, /^[a-z][a-z0-9-]{0,39}$/);
  assert.equal(body.departments[0].id, dept.id);
  const publication = prepareCampaign(form, true);
  assert.ok(publication.errors['departments.' + dept.id + '.positions.' + position.id + '.name']);
  assert.ok(publication.errors.closesAt);
  assert.ok(prepareCampaign(campaignForm(null), true).errors.departments);
});

test('date-only closing includes the full last day across leap day and year boundaries', () => {
  const form = campaignForm(null);
  for (const [date, next] of [['2028-02-29', '2028-03-01'], ['2026-12-31', '2027-01-01']]) {
    form.opensAt = { date, time: '' };
    form.closesAt = { date, time: '' };
    const { body, errors } = prepareCampaign(form, false);
    assert.deepEqual(errors, {});
    assert.equal(body.opensAt, date + 'T00:00:00+07:00');
    assert.equal(body.closesAt, next + 'T00:00:00+07:00');
    assert.deepEqual(campaignForm(body).closesAt, { date, time: '' });
  }
  form.opensAt.date = '2026-02-29';
  assert.ok(prepareCampaign(form, false).errors.opensAt);
  form.opensAt = { date: '', time: '12:00' };
  assert.ok(prepareCampaign(form, false).errors.opensAt);
  form.opensAt = { date: '2026-12-30', time: '24:20' };
  assert.ok(prepareCampaign(form, false).errors['opensAt.time']);
});

test('reopening timestamps from another offset preserves the instant and sub-millisecond precision', () => {
  const form = campaignForm({ departments: [], name: '', hostClub: '', description: '', instructions: '',
    opensAt: '2026-11-15T22:00:00.12345Z', closesAt: '2026-11-16T00:00:00.12346+02:00' });
  assert.deepEqual(form.opensAt, { date: '2026-11-16', time: '05:00:00.12345' });
  const { body, errors } = prepareCampaign(form, false);
  assert.deepEqual(errors, {});
  assert.equal(body.closesAt, '2026-11-16T05:00:00.12346+07:00');
  form.closesAt.time = '05:00:00.1234500';
  assert.ok(prepareCampaign(form, false).errors.closesAt);
});

test('text limits count trimmed Unicode code points and rows enforce quota and cardinality', () => {
  const form = campaignForm(null);
  form.name = '  ' + '🌱'.repeat(120) + '\u0085';
  assert.equal(prepareCampaign(form, false).errors.name, undefined);
  form.name += 'x';
  const department = newDepartment();
  const position = newPosition();
  department.positions.push(position);
  form.departments.push(department);
  const path = 'departments.' + department.id + '.positions.' + position.id + '.quota';
  for (const invalid of ['0', '1.5', '1000', '1e2', 'words']) {
    position.quota = invalid;
    assert.ok(prepareCampaign(form, false).errors[path]);
  }
  position.quota = '999';
  const { body, errors } = prepareCampaign(form, false);
  assert.equal(body.departments[0].positions[0].quota, 999);
  assert.ok(errors.name);
  department.positions = Array.from({ length: 51 }, newPosition);
  assert.ok(prepareCampaign(form, false).errors['departments.' + department.id + '.positions']);
  form.departments = Array.from({ length: 31 }, newDepartment);
  assert.ok(prepareCampaign(form, false).errors.departments);
});

test('preview uses the server clock, inclusive opening, exclusive closing and confirmed lock', () => {
  const window = { opensAt: '2026-11-16T08:00:00.0011+07:00', closesAt: '2026-11-16T08:00:00.0013+07:00' };
  assert.equal(previewIntake(window, { serverTime: '2026-11-16T01:00:00.001Z', locked: false }), false);
  assert.equal(previewIntake(window, { serverTime: window.opensAt, locked: false }), true);
  assert.equal(previewIntake(window, { serverTime: window.closesAt, locked: false }), false);
  assert.equal(previewIntake(window, { serverTime: window.opensAt, locked: true }), false);
  assert.equal(previewIntake({ ...window, opensAt: '' }, { serverTime: window.opensAt }), undefined);
});
