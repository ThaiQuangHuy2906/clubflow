import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { setTimeout as delay } from 'node:timers/promises';
import { domainToASCII } from 'node:url';

const seed = JSON.parse(readFileSync(new URL('./data/seed.json', import.meta.url), 'utf8'));
const sampleCv = readFileSync(new URL('./data/sample-cv.pdf', import.meta.url));
const mode = process.env.MOCK_MODE || 'normal';
if (!['normal', 'slow', 'error', 'empty'].includes(mode)) throw new Error('Unknown MOCK_MODE');
const demoEnabled = process.env.DEMO_ENABLED !== 'false';
const port = Number(process.env.PORT ?? 3001);
const EXEC = 'Executive', APPLICANT = 'Applicant', INTERVIEWER = 'Interviewer';
const accounts = new Map(seed.accounts.map(a => [a.id, a]));
// Opaque, reproducible tokens for the public course fixtures.
const tokenFor = a => createHash('sha256').update('clubflow-demo:' + a.id + ':' + a.password).digest('hex');
const sessions = new Map(seed.accounts.map(a => [tokenFor(a), a]));
const byId = (a, b) => compareText(a.id, b.id);
const isObject = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const own = (obj, key) => Object.hasOwn(obj, key);
function emailOK(value) {
  if (typeof value !== 'string' || [...value].length > 254) return false;
  const parts = value.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  const atom = /^[\p{L}\p{M}\p{N}!#$%&'*+/=?^_\x60{|}~-]+$/u;
  if (!local.split('.').every(part => atom.test(part))) return false;
  if (!/^[\p{L}\p{M}\p{N}.-]+$/u.test(domain)) return false;
  const labels = domainToASCII(domain).split('.');
  return labels.length >= 2 && labels.every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label));
}
const whitespace = /[\s\u0085]/u;
function trimText(text) {
  let start = 0, end = text.length;
  while (start < end && whitespace.test(text[start])) start++;
  while (end > start && whitespace.test(text[end - 1])) end--;
  return text.slice(start, end);
}
const clockTime = v => typeof v === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v);
function validDate(v) {
  if (typeof v !== 'string' || !/^\d{4}-\d\d-\d\d$/.test(v)) return false;
  const ms = Date.parse(v + 'T00:00:00Z');
  return Number.isFinite(ms) && new Date(ms).toISOString().startsWith(v + 'T');
}
function validInstant(v) {
  return typeof v === 'string' && /^\d{4}-\d\d-\d\dT(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[+-](?:[01]\d|2[0-3]):?[0-5]\d)$/.test(v)
    && validDate(v.slice(0, 10)) && Number.isFinite(Date.parse(v));
}
// Date.parse retains milliseconds. Compare the full fraction when two instants share a millisecond.
const fractionOf = stamp => (stamp.match(/\.(\d+)/)?.[1] ?? '').replace(/0+$/, '');
function compareInstants(a, b) {
  return Date.parse(a) - Date.parse(b) || compareText(fractionOf(a), fractionOf(b));
}
function compareText(a, b) {
  const left = [...a], right = [...b];
  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    const delta = left[i].codePointAt(0) - right[i].codePointAt(0);
    if (delta) return delta;
  }
  return left.length - right.length;
}
class ApiError extends Error {
  constructor(status, code, message, fields = {}) {
    super(message);
    Object.assign(this, { status, code, fields });
  }
}
function conflict(code, message, fields) { throw new ApiError(409, code, message, fields); }
function forbidden() { throw new ApiError(403, 'FORBIDDEN', 'Access denied.'); }
function missing(resource) { throw new ApiError(404, 'NOT_FOUND', resource + ' not found.'); }
function editable() {
  if (state.confirmed) conflict('LOCKED', 'The confirmed campaign is read-only.');
}
function invalid(fields) { throw new ApiError(400, 'VALIDATION', 'Check the highlighted fields.', fields); }
class Fields {
  errors = Object.create(null);
  check(condition, path, message) {
    if (!condition) this.errors[path] ??= message;
    return condition;
  }
  object(value, allowed, prefix = '') {
    if (!this.check(isObject(value), prefix || 'body', 'Enter an object.')) return false;
    for (const key of Object.keys(value)) {
      this.check(allowed.includes(key), prefix ? prefix + '.' + key : key, 'Unexpected field.');
    }
    return true;
  }
  text(value, path, max, required = true, message = 'Enter a valid text value.') {
    this.check(typeof value === 'string' && (!required || value.length > 0) && [...value].length <= max, path, message);
  }
  finish() { if (Object.keys(this.errors).length) invalid(this.errors); }
}
function trimValues(value, key) {
  if (typeof value === 'string') return key === 'password' ? value : trimText(value);
  if (Array.isArray(value)) return value.map(v => trimValues(v));
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, trimValues(v, k)]));
  return value;
}
const ok = (data, status = 200) => ({ status, data });
function freshState(pristine) {
  const apps = new Map();
  if (!pristine) {
    for (const raw of seed.applications) {
      apps.set(raw.id, newApplication(raw, accounts.get(raw.applicantId).profile, sampleCv, 'cv.pdf'));
    }
  }
  return {
    now: seed.serverTime, canBegin: !pristine && demoEnabled, draft: pristine ? null : structuredClone(seed.campaign),
    published: pristine ? null : structuredClone(seed.campaign), setup: pristine ? null : structuredClone(seed.settings),
    apps, nextId: apps.size + 1, saved: null, revision: 0, confirmed: false, interviews: new Map(), publishedAt: null
  };
}
function newApplication(raw, profile, cv, cvFileName) {
  return {
    ...raw, ...profile, cv, cvFileName, status: 'Submitted', privateNote: '', applicantReason: null,
    publishedScreening: null
  };
}
let state = freshState(false);
const positions = campaign => campaign?.departments.flatMap(d => d.positions) ?? [];
const currentPositions = () => positions(state.published ?? state.draft);
const positionName = id => currentPositions().find(p => p.id === id)?.name ?? id;
function accepting() {
  return !!state.published && !state.confirmed && compareInstants(state.now, state.published.opensAt) >= 0
    && compareInstants(state.now, state.published.closesAt) < 0;
}
function campaignView() {
  return {
    campaignId: state.draft ? seed.campaignId : null, draft: state.draft, published: !!state.published,
    locked: state.confirmed, serverTime: state.now, demo: { enabled: demoEnabled, canBegin: state.canBegin }
  };
}
function login({ body, fields: v }) {
  v.object(body, ['email', 'password']);
  v.check(emailOK(body.email), 'email', 'Enter a valid email address.');
  v.text(body.password, 'password', 128);
  v.finish();
  const a = seed.accounts.find(a => a.email.toLowerCase() === body.email.toLowerCase() && a.password === body.password);
  if (!a) throw new ApiError(401, 'UNAUTHENTICATED', 'Invalid email or password.');
  return ok({ token: tokenFor(a), user: { id: a.id, name: a.name, role: a.role } });
}
function publicCampaign({ user }) {
  const result = {
    campaign: state.published ? { id: seed.campaignId, ...state.published } : null,
    acceptingApplications: accepting()
  };
  if (user?.role === APPLICANT) {
    result.profile = user.profile;
    result.availabilityWindows = state.published ? offeredWindows() : [];
  }
  return ok(result);
}
function rowPath(v, row, index, prefix, seen) {
  const valid = typeof row?.id === 'string' && /^[a-z][a-z0-9-]{0,39}$/.test(row.id) && !seen.has(row.id);
  v.check(valid, prefix + '.' + index + '.id', 'Enter a unique row ID.');
  if (valid) seen.add(row.id);
  return prefix + '.' + (valid ? row.id : index);
}
function saveCampaign({ body, fields: v }, publish) {
  editable();
  const deptIds = new Set(), posIds = new Set();
  v.object(body, ['name', 'hostClub', 'description', 'instructions', 'opensAt', 'closesAt', 'departments']);
  for (const key of ['name', 'hostClub', 'description', 'instructions']) {
    v.text(body[key], key, ['name', 'hostClub'].includes(key) ? 120 : 2000, publish,
      key === 'name' ? 'Enter the campaign name.' : 'Enter a valid ' + key + '.');
  }
  for (const key of ['opensAt', 'closesAt']) {
    v.check((!publish && body[key] === '') || validInstant(body[key]), key, 'Enter a timestamp with seconds and UTC offset.');
  }
  if (validInstant(body.opensAt) && validInstant(body.closesAt)) {
    v.check(compareInstants(body.opensAt, body.closesAt) < 0, 'closesAt', 'Close after opening.');
  }
  if (state.setup && validInstant(body.closesAt)) {
    v.check(compareInstants(body.closesAt, localInstant(state.setup.date, state.setup.start)) < 0, 'closesAt', 'Close before interviews begin.');
  }
  const depts = body.departments;
  v.check(Array.isArray(depts) && depts.length <= 30 && (!publish || depts.length), 'departments', 'Enter up to 30 departments.');
  if (Array.isArray(depts)) depts.forEach((d, index) => {
    const p = rowPath(v, d, index, 'departments', deptIds);
    if (!v.object(d, ['id', 'name', 'positions'], p)) return;
    v.text(d.name, p + '.name', 100, publish);
    v.check(Array.isArray(d.positions) && d.positions.length <= 50 && (!publish || d.positions.length),
      p + '.positions', 'Enter up to 50 positions.');
    if (Array.isArray(d.positions)) d.positions.forEach((item, i) => {
      const k = rowPath(v, item, i, p + '.positions', posIds);
      if (!v.object(item, ['id', 'name', 'quota', 'description', 'requirements'], k)) return;
      v.text(item.name, k + '.name', 100, publish);
      v.text(item.description, k + '.description', 2000, publish);
      v.text(item.requirements, k + '.requirements', 2000, publish);
      v.check((!publish && item.quota === null) || (Number.isInteger(item.quota) && item.quota >= 1 && item.quota <= 999),
        k + '.quota', 'Enter a whole number from 1 to 999.');
    });
  });
  v.finish();
  if (publish) {
    const used = [...state.apps.values()].map(a => a.positionId).concat(state.setup?.interviewers.flatMap(i => i.positionIds) ?? []);
    if (used.some(id => !posIds.has(id))) conflict('IN_USE', 'A referenced position cannot be removed.');
    state.published = body;
  }
  state.draft = body;
  return ok(campaignView());
}
const localInstant = (date, time) => date + 'T' + time + ':00+07:00';
function oneMinuteAfter(stamp) {
  const local = new Date(Date.parse(stamp) + 60000 + 7 * 3600000).toISOString().split('.')[0];
  const fraction = fractionOf(stamp);
  return local + (fraction ? '.' + fraction : '') + '+07:00';
}
function demoStep({ body, fields: v }) {
  if (!demoEnabled) missing('Route');
  v.object(body, ['action']);
  const { action } = body;
  v.check(['beginCreation', 'pastClose', 'pastInterviews'].includes(action), 'action', 'Choose a supported demo step.');
  v.finish();
  if (action === 'beginCreation') {
    if (!state.canBegin) conflict('CREATION_UNAVAILABLE', 'Creation is available only on a pristine demo.');
    state = freshState(true);
  } else {
    let target;
    if (action === 'pastClose') {
      if (!state.published) conflict('CAMPAIGN_REQUIRED', 'Publish the campaign first.');
      target = oneMinuteAfter(state.published.closesAt);
    } else {
      if (!state.setup) conflict('SETUP_REQUIRED', 'Save interview setup first.');
      target = oneMinuteAfter(localInstant(state.setup.date, state.setup.end));
    }
    if (compareInstants(target, state.now) < 0) conflict('CLOCK_BACKWARD', 'The demo clock cannot move backwards.');
    state.now = target;
    state.canBegin = false;
  }
  return ok({ action, serverTime: state.now, canBegin: state.canBegin });
}


function slotRecord(date, start, end, prefix = '') {
  return { id: prefix + date + '_' + start.replace(':', '') + '_' + end.replace(':', ''), date, start, end };
}
const minutes = time => Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
const asTime = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
const contains = (outer, inner) => outer.start <= inner.start && inner.end <= outer.end;
const intervalOrder = (a, b) => compareText(a.start, b.start) || compareText(a.end, b.end);
function offeredWindows() {
  const s = state.setup;
  return s ? s.availabilityWindows.map(w => slotRecord(s.date, w.start, w.end, 'W-')) : [];
}
function interviewSlots() {
  const s = state.setup, slots = [];
  if (s) for (let t = minutes(s.start); t + s.durationMinutes <= minutes(s.end); t += s.durationMinutes) {
    slots.push(slotRecord(s.date, asTime(t), asTime(t + s.durationMinutes)));
  }
  return slots;
}
function setupView() {
  return {
    settings: state.setup, catalog: {
      positions: currentPositions().map(({ id, name }) => ({ id, name })), rooms: seed.rooms,
      interviewers: seed.accounts.filter(a => a.role === INTERVIEWER).map(({ id, name }) => ({ id, name }))
    },
    slots: interviewSlots(), availabilityWindows: offeredWindows(), availabilityLocked: state.apps.size > 0, locked: state.confirmed
  };
}
function validateIntervals(v, intervals, key, window, minimum) {
  if (!v.check(Array.isArray(intervals), key, 'Enter a list of intervals.')) return;
  v.check(intervals.length >= minimum, key, 'Offer at least three distinct windows.');
  const valid = [];
  intervals.forEach((w, i) => {
    const path = key + '.' + i;
    if (!v.object(w, ['start', 'end'], path)) return;
    v.check(clockTime(w.start), path + '.start', 'Enter a start time.');
    v.check(clockTime(w.end), path + '.end', 'Enter an end time.');
    if (clockTime(w.start) && clockTime(w.end)) {
      v.check(w.start < w.end, path + '.end', 'End after start.');
      if (clockTime(window.start) && clockTime(window.end)) v.check(contains(window, w), path + '.end', 'Use the configured window.');
      if (w.start < w.end) valid.push({ ...w, index: i });
    }
  });
  valid.sort(intervalOrder);
  let lastEnd = '';
  for (const w of valid) {
    v.check(w.start >= lastEnd, key + '.' + w.index + '.start', 'Intervals cannot overlap.');
    if (w.end > lastEnd) lastEnd = w.end;
  }
}
function allowedIds(v, ids, path, allowed, minimum = 0) {
  if (!v.check(Array.isArray(ids), path, 'Enter a list of IDs.')) return;
  v.check(ids.length >= minimum && new Set(ids).size === ids.length && ids.every(id => allowed.has(id)), path, 'Choose distinct IDs from the catalogue.');
}
function saveSetup({ body, fields: v }) {
  editable();
  if (!state.draft) conflict('CAMPAIGN_REQUIRED', 'Save a campaign first.');
  if (state.apps.size) {
    const fields = {};
    for (const key of ['date', 'start', 'end']) {
      const valid = key === 'date' ? validDate(body[key]) : clockTime(body[key]);
      if (valid && body[key] !== state.setup[key]) fields[key] = 'Keep the bounds offered at first submission.';
    }
    const windows = body.availabilityWindows;
    if (Array.isArray(windows) && windows.every(w => clockTime(w?.start) && clockTime(w?.end))) {
      const frozen = state.setup.availabilityWindows;
      if (windows.length !== frozen.length || [...windows].sort(intervalOrder).some(
        (w, i) => w.start !== frozen[i].start || w.end !== frozen[i].end
      )) fields.availabilityWindows = 'Keep the windows offered at first submission.';
    }
    if (Object.keys(fields).length) conflict('AVAILABILITY_LOCKED', 'Applicant availability is already in use.', fields);
  }
  v.object(body, ['date', 'start', 'end', 'durationMinutes', 'roomIds', 'interviewers', 'availabilityWindows']);
  v.check(validDate(body.date), 'date', 'Enter a valid calendar date.');
  v.check(clockTime(body.start), 'start', 'Enter a start time.');
  v.check(clockTime(body.end), 'end', 'Enter an end time.');
  v.check([15, 20, 30].includes(body.durationMinutes), 'durationMinutes', 'Choose 15, 20 or 30 minutes.');
  if (clockTime(body.start) && clockTime(body.end)) {
    v.check(body.end > body.start && minutes(body.end) - minutes(body.start) >= body.durationMinutes, 'end', 'Allow at least one full slot.');
  }
  const close = (state.published ?? state.draft).closesAt;
  if (close && validDate(body.date) && clockTime(body.start)) {
    v.check(compareInstants(localInstant(body.date, body.start), close) > 0, 'date', 'Schedule interviews after applications close.');
  }
  allowedIds(v, body.roomIds, 'roomIds', new Set(seed.rooms.map(r => r.id)));
  validateIntervals(v, body.availabilityWindows, 'availabilityWindows', body, 3);
  const seen = new Set(), positions = new Set(currentPositions().map(p => p.id));
  if (v.check(Array.isArray(body.interviewers), 'interviewers', 'Enter a list of interviewers.')) {
    body.interviewers.forEach((person, i) => {
      const good = accounts.get(person?.id)?.role === INTERVIEWER && !seen.has(person.id);
      const p = 'interviewers.' + (good ? person.id : i);
      v.check(good, p + '.id', 'Choose a distinct interviewer.');
      if (!v.object(person, ['id', 'positionIds', 'availability'], p)) return;
      seen.add(person.id);
      allowedIds(v, person.positionIds, p + '.positionIds', positions, 1);
      validateIntervals(v, person.availability, p + '.availability', body, 0);
    });
  }
  v.finish();
  body.availabilityWindows.sort(intervalOrder);
  for (const person of body.interviewers) person.availability.sort(intervalOrder);
  state.setup = body;
  return ok(setupView());
}

function uploadedCv(bytes) {
  // Signature-only demo uploads have no PDF cross-reference table or stream.
  const footer = bytes.lastIndexOf('startxref');
  if (footer < 0) return sampleCv;
  const match = /^startxref\s+(\d+)\s+%%EOF\b/.exec(bytes.toString('latin1', footer, footer + 128));
  if (!match) return sampleCv;
  const offset = Number(match[1]);
  if (!Number.isSafeInteger(offset) || offset <= 0 || offset >= footer) return sampleCv;
  const reference = bytes.toString('latin1', offset, offset + 128);
  return /^(?:xref\b|\d+\s+\d+\s+obj\b)/.test(reference) ? bytes : sampleCv;
}
function submitApplication({ user, form, fields: v }) {
  editable();
  if (!accepting()) conflict('APPLICATIONS_CLOSED', 'Applications are closed.');
  const allowed = ['positionId', 'phone', 'email', 'motivation', 'availabilityWindowIds', 'cv'];
  const single = key => {
    const values = form.getAll(key);
    v.check(values.length === 1, key, 'Supply this field once.');
    return typeof values[0] === 'string' ? trimText(values[0]) : values[0];
  };
  for (const k of form.keys()) {
    v.check(allowed.includes(k), k, ['studentName', 'studentNumber', 'faculty'].includes(k) ? 'This field comes from your account.' : 'Unexpected field.');
  }
  const positionId = single('positionId'), phone = single('phone'), email = single('email'), motivation = single('motivation');
  v.check(currentPositions().some(p => p.id === positionId), 'positionId', 'Select a published position.');
  v.check(typeof phone === 'string' && /^\+?\d{7,15}$/.test(phone), 'phone', 'Enter 7 to 15 digits.');
  v.check(emailOK(email), 'email', 'Enter a valid email address.');
  v.check(typeof motivation === 'string' && motivation.length > 0 && motivation.split(/[\s\u0085]+/u).length <= 300, 'motivation', 'Enter 1 to 300 words.');
  const ids = form.getAll('availabilityWindowIds').map(i => typeof i === 'string' ? trimText(i) : i);
  const offered = new Set(offeredWindows().map(w => w.id));
  v.check(ids.length >= 3 && new Set(ids).size === ids.length && ids.every(id => offered.has(id)), 'availabilityWindowIds', 'Select at least three distinct offered windows.');
  const file = single('cv');
  v.check(isObject(file) && file.size > 0 && file.size <= 5 * 1024 * 1024 && /\.pdf$/i.test(file.name)
    && file.type === 'application/pdf' && form.cvBytes?.subarray(0, 5).toString() === '%PDF-', 'cv', 'Upload a PDF no larger than 5 MB.');
  v.finish();
  const existing = [...state.apps.values()].find(a => a.applicantId === user.id && a.positionId === positionId);
  if (existing) return ok({ id: existing.id, created: false });
  const id = 'A' + String(state.nextId++).padStart(2, '0');
  state.apps.set(id, newApplication({ id, applicantId: user.id, positionId, submittedAt: state.now, motivation, availabilityWindowIds: ids },
    { ...user.profile, email, phone }, uploadedCv(form.cvBytes), file.name));
  return ok({ id, created: true }, 201);
}
function applicationRow(a, executive) {
  const iv = state.interviews.get(a.id);
  const row = {
    id: a.id, campaignId: seed.campaignId, positionId: a.positionId, positionName: positionName(a.positionId), submittedAt: a.submittedAt,
    status: executive ? a.status : a.publishedScreening?.status ?? 'Submitted',
    interview: iv ? { id: iv.id, date: iv.date, start: iv.start, end: iv.end, roomId: iv.roomId, roomName: iv.roomName } : null,
    result: state.publishedAt ? iv?.decision ?? null : null
  };
  if (executive) Object.assign(row, { applicantId: a.applicantId, studentName: a.studentName, studentNumber: a.studentNumber });
  else row.applicantReason = a.publishedScreening?.applicantReason ?? null;
  return row;
}
function applicationDetail(a, executive) {
  const row = {
    ...applicationRow(a, executive), studentName: a.studentName, studentNumber: a.studentNumber, faculty: a.faculty,
    email: a.email, phone: a.phone, motivation: a.motivation, availabilityWindowIds: a.availabilityWindowIds, cvFileName: a.cvFileName
  };
  if (executive) Object.assign(row, { applicantReason: a.applicantReason, publishedScreening: a.publishedScreening, privateNote: a.privateNote, locked: state.confirmed });
  return row;
}
function screenApplication({ app, body, fields: v }) {
  editable();
  v.object(body, ['status', 'privateNote', 'applicantReason']);
  v.check(Object.keys(body).length > 0, 'body', 'Supply a screening change.');
  if (own(body, 'status')) v.check(['Shortlisted', 'Rejected'].includes(body.status), 'status', 'Choose Shortlisted or Rejected.');
  if (own(body, 'privateNote')) v.text(body.privateNote, 'privateNote', 2000, false);
  if (own(body, 'applicantReason') && body.applicantReason !== null) {
    v.text(body.applicantReason, 'applicantReason', 2000);
    v.check((body.status ?? app.status) === 'Rejected', 'applicantReason', 'Set a reason only for a rejected application.');
  }
  v.finish();
  Object.assign(app, body);
  if (app.status !== 'Rejected') app.applicantReason = null;
  if (app.status !== 'Shortlisted' && state.saved) state.saved.assignments = state.saved.assignments.filter(a => a.applicationId !== app.id);
  return ok(applicationDetail(app, true));
}
function publishScreening({ app }) {
  if (app.status === 'Submitted') conflict('SCREENING_PENDING', 'Review the application first.');
  app.publishedScreening = { status: app.status, applicantReason: app.applicantReason };
  return ok(applicationDetail(app, true));
}
function csvReply(name, columns, records) {
  const escape = value => {
    let text = String(value ?? '');
    if (/^[\s]*[=+\-@]|^[\t\r]/.test(text)) text = "'" + text;
    return /[",\r\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
  };
  const lines = [columns, ...(mode === 'empty' ? [] : records.map(r => columns.map(key => r[key])))];
  return { status: 200, bytes: lines.map(row => row.map(escape).join(',')).join('\r\n') + '\r\n', type: 'text/csv; charset=utf-8', name };
}
const APPROVED_SORTS = ['id', 'submittedAt', 'studentName', 'positionName'];
function applicationList({ user, query, fields: v }, csv = false) {
  const all = [...state.apps.values()];
  if (user.role === APPLICANT) {
    const items = all.filter(a => a.applicantId === user.id).sort(byId).map(a => applicationRow(a, false));
    return ok({ items, total: items.length });
  }
  const { q = '', positionId, status, sort = 'id', order = 'asc' } = query;
  const page = Number(query.page ?? 1), pageSize = Number(query.pageSize ?? 20);
  v.text(q, 'q', 120, false);
  v.check(!own(query, 'positionId') || currentPositions().some(p => p.id === positionId), 'positionId', 'Unknown position.');
  v.check(!own(query, 'status') || ['Submitted', 'Shortlisted', 'Rejected'].includes(status), 'status', 'Unknown screening status.');
  v.check(APPROVED_SORTS.includes(sort), 'sort', 'Unsupported sort.');
  v.check(['asc', 'desc'].includes(order), 'order', 'Unsupported sort order.');
  for (const [key, value] of [['page', page], ['pageSize', pageSize]]) {
    if (own(query, key)) v.check(/^\d+$/.test(query[key]) && Number.isSafeInteger(value) && value > 0 && (key !== 'pageSize' || value <= 100), key, 'Invalid page or page size.');
  }
  v.finish();
  const term = q.toLowerCase();
  const rows = all.map(a => applicationRow(a, true)).filter(r => (!status || r.status === status) && (!positionId || r.positionId === positionId)
    && [r.id, r.studentName, r.studentNumber, r.positionName].some(text => text.toLowerCase().includes(term)));
  rows.sort((a, b) => {
    const delta = sort === 'submittedAt' ? compareInstants(a.submittedAt, b.submittedAt) : compareText(a[sort], b[sort]);
    return (order === 'desc' ? -delta : delta) || byId(a, b);
  });
  if (csv) return csvReply('applications.csv', ['applicationId', 'applicantId', 'studentName', 'studentNumber', 'positionId', 'positionName', 'submittedAt', 'status'],
    rows.map(r => ({ ...r, applicationId: r.id })));
  const statistics = { applications: all.length, applicants: new Set(all.map(a => a.applicantId)).size, submitted: 0, shortlisted: 0, rejected: 0 };
  for (const a of all) statistics[a.status.toLowerCase()]++;
  const start = (page - 1) * pageSize;
  return ok({ items: rows.slice(start, start + pageSize), total: rows.length, page, pageSize, statistics, locked: state.confirmed });
}


const shortlist = () => [...state.apps.values()].filter(a => a.status === 'Shortlisted').sort(byId);
const windowOf = ({ date, start, end }) => ({ date, start, end });
const blankChoice = applicationId => ({ applicationId, slotId: null, interviewerId: null, roomId: null });
const issue = (code, resourceId, applicationIds) => ({ code, resourceId, applicationIds });
function covers(intervals, slot) {
  let cursor = slot.start;
  for (const w of intervals) {
    if (w.start > cursor) break;
    if (w.end > cursor) cursor = w.end;
    if (cursor >= slot.end) return true;
  }
  return false;
}
function schedulingInputs(window) {
  const slots = interviewSlots(), people = [...(state.setup?.interviewers ?? [])].sort(byId);
  const rooms = [...(state.setup?.roomIds ?? [])].sort(compareText);
  const windows = offeredWindows(), inside = slots.filter(s => window?.date === s.date && contains(window, s));
  const availableByApp = new Map();
  for (const app of shortlist()) {
    const chosen = windows.filter(w => app.availabilityWindowIds.includes(w.id));
    availableByApp.set(app.id, slots.filter(s => covers(chosen, s)).map(s => s.id));
  }
  return { slots, inside, availableByApp, people, rooms };
}
function firstChoice(app, ctx, occupied) {
  const people = ctx.people.filter(p => p.positionIds.includes(app.positionId));
  const none = (code, resourceId) => ({ choice: blankChoice(app.id), reason: issue(code, resourceId, [app.id]) });
  if (!people.length) return none('NO_QUALIFIED_INTERVIEWER', app.positionId);
  let shared = false;
  for (const slot of ctx.inside) {
    if (!ctx.availableByApp.get(app.id).includes(slot.id)) continue;
    for (const person of people) {
      if (!covers(person.availability, slot)) continue;
      shared = true;
      for (const roomId of ctx.rooms) {
        const taken = occupied.some(o => o.slotId === slot.id &&
          (o.applicantId === app.applicantId || o.interviewerId === person.id || o.roomId === roomId));
        if (!taken) return { choice: { applicationId: app.id, slotId: slot.id, interviewerId: person.id, roomId } };
      }
    }
  }
  if (!shared) return none('NO_SHARED_TIME', app.id);
  if (!ctx.rooms.length) return none('NO_ROOM', null);
  return none('NO_FREE_COMBINATION', app.id);
}
function generate(window) {
  const ctx = schedulingInputs(window), occupied = [], choices = [];
  const ordered = shortlist().sort((a, b) => compareInstants(a.submittedAt, b.submittedAt) || byId(a, b));
  for (const app of ordered) {
    const { choice } = firstChoice(app, ctx, occupied);
    choices.push(choice);
    if (choice.slotId) occupied.push({ ...choice, applicantId: app.applicantId });
  }
  return choices;
}
function assignmentIssues(app, choice, ctx) {
  const errors = [];
  const add = (code, resource) => errors.push(issue(code, resource, [app.id]));
  const slot = ctx.inside.find(s => s.id === choice.slotId);
  if (!slot) add('INVALID_SLOT', choice.slotId);
  else if (!ctx.availableByApp.get(app.id).includes(slot.id)) add('APPLICANT_UNAVAILABLE', app.applicantId);
  const person = ctx.people.find(i => i.id === choice.interviewerId);
  if (!person?.positionIds.includes(app.positionId)) add('UNQUALIFIED', choice.interviewerId);
  else if (slot && !covers(person.availability, slot)) add('INTERVIEWER_UNAVAILABLE', person.id);
  if (!ctx.rooms.includes(choice.roomId)) add('ROOM_UNAVAILABLE', choice.roomId);
  return errors;
}
function scheduleView(label = state.confirmed ? 'Confirmed' : state.saved ? 'Draft' : 'None',
  window = state.saved?.window ?? (state.setup ? windowOf(state.setup) : null), assignments = state.saved?.assignments ?? []) {
  const ctx = schedulingInputs(window), selected = new Map(assignments.map(a => [a.applicationId, a]));
  const rows = shortlist().map(app => {
    const choice = selected.get(app.id) ?? blankChoice(app.id);
    const issues = choice.slotId ? assignmentIssues(app, choice, ctx) : [];
    return {
      ...choice, applicantId: app.applicantId, applicantName: app.studentName, positionId: app.positionId, positionName: positionName(app.positionId),
      availableSlotIds: ctx.availableByApp.get(app.id), status: !choice.slotId || issues.length ? 'Unassigned' : 'Proposed', issues
    };
  });
  const assigned = rows.filter(row => row.status === 'Proposed');
  for (const row of rows.filter(r => r.slotId === null)) {
    const reason = label === 'None' ? null : firstChoice(state.apps.get(row.applicationId), ctx, assigned).reason;
    row.issues = [reason ?? issue('NO_ASSIGNMENT', null, [row.applicationId])];
  }
  // All valid slots belong to the same non-overlapping grid, so matching IDs imply overlap.
  for (let i = 0; i < assigned.length; i++) for (const other of assigned.slice(i + 1)) {
    const row = assigned[i];
    if (row.slotId !== other.slotId) continue;
    for (const [field, code] of [['applicantId', 'APPLICANT_OVERLAP'], ['interviewerId', 'INTERVIEWER_OVERLAP'], ['roomId', 'ROOM_OVERLAP']]) {
      if (row[field] !== other[field]) continue;
      const problem = issue(code, row[field], [row.applicationId, other.applicationId]);
      row.issues.push(problem);
      other.issues.push(problem);
      row.status = other.status = 'Conflict';
    }
  }
  const counts = { total: rows.length, proposed: 0, unassigned: 0, conflict: 0, confirmed: 0 };
  for (const row of rows) {
    if (label === 'Confirmed') row.status = 'Confirmed';
    counts[row.status.toLowerCase()]++;
  }
  return { state: label, revision: state.revision, window, rows, counts };
}
function checkRevision(v, revision) { v.check(Number.isSafeInteger(revision) && revision >= 0, 'revision', 'Enter a nonnegative integer.'); }
function currentRevision(n) {
  if (n !== state.revision) conflict('STALE_REVISION', 'Reload the current saved schedule.');
}
function scheduleChange({ body, fields: v }, save) {
  editable();
  if (!state.setup) conflict('SETUP_REQUIRED', 'Save interview setup first.');
  const apps = shortlist();
  if (!apps.length) conflict('NO_SHORTLIST', 'Shortlist an application first.');
  const generating = !save && body.action === 'generate';
  const keys = ['window', 'revision'];
  if (!save) keys.push('action');
  if (!generating) keys.push('assignments');
  v.object(body, keys);
  if (!save) v.check(['generate', 'preview'].includes(body.action), 'action', 'Choose generate or preview.');
  checkRevision(v, body.revision);
  const w = body.window;
  if (v.object(w, ['date', 'start', 'end'], 'window')) {
    v.check(w.date === state.setup.date, 'window.date', 'Use the configured interview date.');
    v.check(clockTime(w.start) && w.start >= state.setup.start, 'window.start', 'Choose a start inside setup.');
    v.check(clockTime(w.end) && w.end <= state.setup.end && w.end > w.start, 'window.end', 'Choose an end inside setup.');
    if (clockTime(w.start) && clockTime(w.end)) v.check(interviewSlots().some(s => contains(w, s)), 'window.end', 'Include at least one whole interview slot.');
  }
  if (!generating && v.check(Array.isArray(body.assignments), 'assignments', 'Supply the entire shortlisted set.')) {
    const required = new Set(apps.map(a => a.id)), seen = new Set();
    body.assignments.forEach((a, index) => {
      const valid = required.has(a?.applicationId) && !seen.has(a.applicationId);
      const id = a?.applicationId;
      const rowKey = typeof id === 'string' && /^[\w-]+$/.test(id) && !seen.has(id) ? id : index;
      const path = 'assignments.' + rowKey;
      if (!v.object(a, ['applicationId', 'slotId', 'interviewerId', 'roomId'], path)) return;
      v.check(valid, path, 'Choose each shortlisted ID exactly once.');
      seen.add(a.applicationId);
      const fields = ['slotId', 'interviewerId', 'roomId'];
      if (!fields.every(k => a[k] === null)) for (const k of fields) {
        v.check(typeof a[k] === 'string' && /^[\w-]+$/.test(a[k]), path + '.' + k, 'Supply a resource ID or clear all three choices.');
      }
    });
    for (const id of required) v.check(seen.has(id), 'assignments.' + id, 'Include this shortlisted application.');
  }
  v.finish();
  currentRevision(body.revision);
  const choices = generating ? generate(w) : body.assignments;
  const view = scheduleView(save ? 'Draft' : 'Preview', w, choices);
  if (save) {
    state.saved = { window: w, assignments: choices };
    view.revision = ++state.revision;
  }
  return ok(view);
}
function describeIssue(i) {
  if (i.code.endsWith('_OVERLAP')) {
    return i.applicationIds.join(' and ') + ' overlap for ' + i.code.split('_')[0].toLowerCase() + ' ' + i.resourceId + '.';
  }
  if (i.code === 'NO_ASSIGNMENT') return i.applicationIds[0] + ' has no assignment.';
  return i.applicationIds.join(', ') + ': ' + i.code + (i.resourceId ? ' (' + i.resourceId + ')' : '') + '.';
}
function confirmSchedule({ body, fields: v }) {
  editable();
  v.object(body, ['revision']); checkRevision(v, body.revision); v.finish();
  currentRevision(body.revision);
  if (!state.saved) conflict('DRAFT_REQUIRED', 'Save a draft before confirmation.');
  const fields = {};
  if (!state.published || compareInstants(state.now, state.published.closesAt) < 0) fields.deadline = 'Applications are still open.';
  for (const a of state.apps.values()) if (a.status === 'Submitted') fields['applications.' + a.id + '.status'] = a.id + ' still needs screening.';
  const view = scheduleView();
  for (const r of view.rows) if (r.issues.length) fields['assignments.' + r.applicationId] = r.issues.map(describeIssue).join(' ');
  if (Object.keys(fields).length) conflict('CONFIRMATION_BLOCKED', 'The schedule cannot be confirmed.', fields);
  const slots = interviewSlots();
  const interviews = view.rows.map(r => {
    const slot = slots.find(s => s.id === r.slotId);
    return [r.applicationId, {
      id: 'IV-' + r.applicationId, applicationId: r.applicationId, applicantName: r.applicantName,
      positionId: r.positionId, positionName: r.positionName, date: slot.date, start: slot.start, end: slot.end, roomId: r.roomId,
      roomName: seed.rooms.find(room => room.id === r.roomId).name, interviewerId: r.interviewerId, assessment: null, decision: null, handling: null
    }];
  });
  state.interviews = new Map(interviews);
  state.confirmed = true;
  state.revision++;
  return ok(scheduleView());
}
function scheduleExport() {
  const view = scheduleView(), slots = interviewSlots();
  const records = view.rows.map(r => {
    const slot = slots.find(s => s.id === r.slotId);
    return { ...r, date: slot?.date, start: slot?.start, end: slot?.end, reasons: r.issues.map(describeIssue).join(' | ') };
  });
  return csvReply('schedule.csv', ['applicationId', 'applicantName', 'positionName', 'date', 'start', 'end', 'interviewerId', 'roomId', 'status', 'reasons'], records);
}


const ended = iv => compareInstants(state.now, localInstant(iv.date, iv.end)) >= 0;
function interviewView(iv) {
  const { decision, handling, ...row } = iv;
  return { ...row, canAssess: ended(iv) && !iv.assessment && iv.handling !== 'Absent' && !state.publishedAt };
}
function interviewList({ user }) {
  const items = [...state.interviews.values()].filter(i => i.interviewerId === user.id)
    .sort((a, b) => compareText(a.date, b.date) || compareText(a.start, b.start) || byId(a, b)).map(interviewView);
  return ok({ items, total: items.length, confirmed: state.confirmed, serverTime: state.now });
}
function assess({ iv, body, fields: v }) {
  v.object(body, ['feedback']); v.text(body.feedback, 'feedback', 2000); v.finish();
  if (!ended(iv)) conflict('INTERVIEW_NOT_ENDED', 'The interview has not ended.');
  if (iv.assessment) conflict('ALREADY_ASSESSED', 'An assessment already exists.');
  if (state.publishedAt) conflict('RESULTS_PUBLISHED', 'Final results have been published.');
  if (iv.handling === 'Absent') conflict('CASE_ABSENT', 'The applicant was recorded absent.');
  iv.assessment = { feedback: body.feedback, submittedAt: state.now };
  iv.handling = 'Attended';
  return ok(interviewView(iv), 201);
}
function resultRow(iv) {
  const { applicationId, positionId, positionName, applicantName, assessment, decision } = iv;
  return {
    applicationId, positionId, positionName, applicantName, interviewId: iv.id, assessment, decision,
    caseStatus: iv.handling ?? (ended(iv) ? 'NeedsReview' : 'Scheduled')
  };
}
function resultsView() {
  const items = [...state.interviews.values()].sort((a, b) => compareText(a.applicationId, b.applicationId)).map(resultRow);
  return { items, total: items.length, publishedAt: state.publishedAt };
}
function saveResult({ app, body, fields: v }) {
  if (state.publishedAt) conflict('RESULTS_PUBLISHED', 'Final results have been published.');
  const iv = state.interviews.get(app.id);
  if (!iv || !ended(iv)) conflict('RESULT_NOT_READY', 'Wait until the confirmed interview ends.');
  v.object(body, ['caseStatus', 'decision']); v.check(Object.keys(body).length > 0, 'body', 'Supply a decision or case status.');
  if (own(body, 'caseStatus')) v.check(['Attended', 'Absent'].includes(body.caseStatus), 'caseStatus', 'Choose Attended or Absent.');
  if (own(body, 'decision')) v.check(['Pass', 'Fail'].includes(body.decision), 'decision', 'Choose Pass or Fail.');
  v.finish();
  if (iv.assessment && body.caseStatus === 'Absent') conflict('CASE_CONFLICT', 'An assessed interview cannot be marked absent.');
  if (body.caseStatus) iv.handling = body.caseStatus;
  if (body.decision) iv.decision = body.decision;
  return ok(resultRow(iv));
}
function publishResults() {
  if (state.publishedAt) return ok(resultsView());
  const apps = shortlist(), fields = {};
  if (!apps.length) conflict('NO_FINAL_RESULTS', 'No shortlisted applications have final results.');
  if (!state.confirmed) fields.schedule = 'Confirm the interview schedule.';
  for (const app of apps) {
    const iv = state.interviews.get(app.id), key = 'applications.' + app.id;
    if (!iv?.decision) fields[key + '.decision'] = 'Record a final decision.';
    if (!iv || !ended(iv) || !iv.handling) fields[key + '.caseStatus'] = 'Confirm how this interview was handled.';
  }
  if (Object.keys(fields).length) conflict('PUBLICATION_BLOCKED', 'Resolve the outstanding campaign results.', fields);
  // One immutable release instant also identifies the complete set of owner notifications.
  state.publishedAt = state.now;
  return ok(resultsView());
}
function notifications({ user }) {
  const items = [];
  if (state.publishedAt) for (const app of [...state.apps.values()].sort(byId)) {
    const iv = state.interviews.get(app.id);
    if (app.applicantId === user.id && iv?.decision) items.push({
      id: 'N-' + app.id, applicationId: app.id,
      positionId: iv.positionId, kind: 'resultPublished', result: iv.decision, createdAt: state.publishedAt
    });
  }
  return ok({ items, total: items.length });
}

const routes = [];
function route(method, path, roles, handler, { format = 'none', query = [], resource, write = false } = {}) {
  const pattern = new RegExp('^/api/' + path.replace(':id', '([^/]+)') + '$');
  routes.push({ method, pattern, roles, handler, format, query, resource, write });
}
const executive = [EXEC], applicant = [APPLICANT], interviewer = [INTERVIEWER];
const reviewQuery = ['q', 'status', 'positionId', 'sort', 'order'];
route('POST', 'auth/login', null, login, { format: 'json' });
route('GET', 'campaign', null, publicCampaign);
route('GET', 'campaign/draft', executive, () => ok(campaignView()));
route('PUT', 'campaign/draft', executive, ctx => saveCampaign(ctx, false), { format: 'json', write: true });
route('POST', 'campaign/publication', executive, ctx => saveCampaign(ctx, true), { format: 'json', write: true });
route('GET', 'campaign/setup', executive, () => ok(setupView()));
route('PUT', 'campaign/setup', executive, saveSetup, { format: 'json', write: true });
route('POST', 'applications', applicant, submitApplication, { format: 'form', write: true });
route('GET', 'applications', [EXEC, APPLICANT], ctx => applicationList(ctx), { query: [...reviewQuery, 'page', 'pageSize'] });
route('GET', 'applications/export', executive, ctx => applicationList(ctx, true), { query: reviewQuery });
route('GET', 'applications/:id', [EXEC, APPLICANT], ({ user, app }) => ok(applicationDetail(app, user.role === EXEC)), { resource: 'application' });
route('GET', 'applications/:id/cv', [EXEC, APPLICANT, INTERVIEWER], ({ app }) => ({ status: 200, bytes: app.cv, type: 'application/pdf', name: app.cvFileName }), { resource: 'application' });
route('PATCH', 'applications/:id/screening', executive, screenApplication, { resource: 'application', format: 'json', write: true });
route('POST', 'applications/:id/screening/publication', executive, publishScreening, { resource: 'application', format: 'empty', write: true });
route('GET', 'schedule', executive, () => ok(scheduleView()));
route('POST', 'schedule/draft', executive, ctx => scheduleChange(ctx, false), { format: 'json' });
route('PUT', 'schedule', executive, ctx => scheduleChange(ctx, true), { format: 'json', write: true });
route('GET', 'schedule/export', executive, scheduleExport);
route('POST', 'schedule/confirmation', executive, confirmSchedule, { format: 'json', write: true });
route('GET', 'interviews', interviewer, interviewList);
route('GET', 'interviews/:id', interviewer, ({ iv }) => ok(interviewView(iv)), { resource: 'interview' });
route('POST', 'interviews/:id/assessment', interviewer, assess, { resource: 'interview', format: 'json', write: true });
route('GET', 'results', executive, () => ok(resultsView()));
route('PUT', 'applications/:id/result', executive, saveResult, { resource: 'application', format: 'json', write: true });
route('POST', 'results/publication', executive, publishResults, { format: 'empty', write: true });
route('GET', 'notifications', applicant, notifications);
route('POST', 'demo/steps', executive, demoStep, { format: 'json' });

function resourceContext(resource, id, user) {
  if (resource === 'application') {
    const app = state.apps.get(id);
    if (!app) missing('Application');
    if (user.role === APPLICANT && app.applicantId !== user.id) forbidden();
    if (user.role === INTERVIEWER && state.interviews.get(id)?.interviewerId !== user.id) forbidden();
    return { app };
  }
  if (resource === 'interview') {
    const iv = state.interviews.get(id.slice(3));
    if (!iv || iv.id !== id) missing('Interview');
    if (iv.interviewerId !== user.id) forbidden();
    return { iv };
  }
  return {};
}
function readUser(header, roles) {
  if (!roles && header === undefined) return null;
  const token = typeof header === 'string' && /^Bearer ([^\s]+)$/i.exec(header)?.[1];
  const user = sessions.get(token);
  if (!user) throw new ApiError(401, 'UNAUTHENTICATED', 'Sign in with a valid session.');
  if (roles && !roles.includes(user.role)) forbidden();
  return user;
}
async function decodeBody(req, format, fields) {
  const chunks = [];
  const maxBodyBytes = 16 * 1024 * 1024;
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size <= maxBodyBytes) chunks.push(chunk);
    else chunks.length = 0;
  }
  if (size > maxBodyBytes) {
    invalid(format === 'form' ? { cv: 'Upload a PDF no larger than 5 MB.' } : { body: 'Request body is too large.' });
  }
  if (format === 'none') {
    fields.check(!size, 'body', 'This request has no body.');
    return {};
  }
  if (!size && format === 'empty') return { body: {} };
  const bytes = Buffer.concat(chunks), type = req.headers['content-type'] ?? '';
  if (format === 'form') {
    if (!/^multipart\/form-data(?:;|$)/i.test(type)) invalid({ body: 'Send a multipart form.' });
    try {
      const form = await new Response(bytes, { headers: { 'Content-Type': type } }).formData();
      const file = form.get('cv');
      if (file && typeof file !== 'string' && file.size <= 5 * 1024 * 1024) form.cvBytes = Buffer.from(await file.arrayBuffer());
      return { form };
    } catch { invalid({ body: 'Malformed multipart form.' }); }
  }
  if (!/^application\/json(?:;|$)/i.test(type)) invalid({ body: 'Send a JSON object.' });
  let body;
  try { body = JSON.parse(bytes.toString('utf8')); } catch { invalid({ body: 'Malformed JSON.' }); }
  if (!isObject(body)) invalid({ body: 'Enter an object.' });
  return { body: trimValues(body) };
}
const countFields = new Set(['total', 'applications', 'applicants', 'submitted', 'shortlisted', 'rejected', 'proposed', 'unassigned', 'conflict', 'confirmed']);
function emptyProjection(value, key) {
  if (Array.isArray(value)) return [];
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, emptyProjection(v, k)]));
  if (typeof value === 'number' && countFields.has(key)) return 0;
  return value;
}
async function dispatch(req, url) {
  await delay(mode === 'slow' ? 2000 : 150);
  const path = url.pathname.replace(/\/$/, '');
  if (mode === 'error' && !(req.method === 'POST' && path === '/api/auth/login')) {
    throw new ApiError(500, 'MOCK_ERROR', 'The mock is in error mode.');
  }
  const endpoint = routes.find(r => r.method === req.method && r.pattern.test(path));
  if (!endpoint) missing('Route');
  const user = endpoint.handler === login ? null : readUser(req.headers.authorization, endpoint.roles);
  let id;
  try { id = decodeURIComponent(endpoint.pattern.exec(path)[1] ?? ''); } catch { missing('Record'); }
  resourceContext(endpoint.resource, id, user);
  const allowed = user?.role === APPLICANT && path === '/api/applications' ? [] : endpoint.query;
  const query = Object.create(null), fields = new Fields();
  for (const [key, value] of url.searchParams) {
    fields.check(allowed.includes(key) && !own(query, key), key, 'Unexpected or repeated query parameter.');
    query[key] = trimText(value);
  }
  let result;
  try {
    const payload = await decodeBody(req, endpoint.format, fields);
    if (endpoint.format === 'empty') {
      fields.object(payload.body, []);
      fields.finish();
    }
    // Each write checks these shared query/body errors before mutation. Recheck scope after the read.
    result = endpoint.handler({ ...payload, user, query, fields, ...resourceContext(endpoint.resource, id, user) });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 400) Object.assign(fields.errors, error.fields);
      fields.finish();
    }
    throw error;
  }
  fields.finish();
  if (endpoint.write) state.canBegin = false;
  if (endpoint.write && result.data?.demo) result.data.demo.canBegin = false;
  return result;
}
function attachmentHeader(name) {
  const fallback = name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const header = 'attachment; filename="' + fallback + '"';
  if (name === fallback) return header;
  const encoded = encodeURIComponent(name).replace(/['()*]/g, ch => '%' + ch.charCodeAt(0).toString(16).toUpperCase());
  return header + "; filename*=UTF-8''" + encoded;
}
const server = createServer(async (req, res) => {
  let path = '/';
  try {
    const url = new URL(req.url, 'http://localhost');
    path = url.pathname;
    const reply = await dispatch(req, url);
    res.statusCode = reply.status;
    res.setHeader('Cache-Control', 'no-store');
    if (reply.bytes !== undefined) {
      res.setHeader('Content-Disposition', attachmentHeader(reply.name));
      res.setHeader('Content-Type', reply.type);
      res.end(reply.bytes);
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(mode === 'empty' ? emptyProjection(reply.data) : reply.data));
    }
  } catch (error) {
    const known = error instanceof ApiError;
    res.statusCode = known ? error.status : 500;
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({
      error: known ? { code: error.code, message: error.message, fields: error.fields } :
        { code: 'MOCK_ERROR', message: 'The mock could not complete the request.', fields: {} }
    }));
  } finally {
    console.log(req.method + ' ' + path + ' ' + res.statusCode);
  }
});
server.listen(port, () => console.log('ClubFlow mock (' + mode + ') listening on port ' + server.address().port));
