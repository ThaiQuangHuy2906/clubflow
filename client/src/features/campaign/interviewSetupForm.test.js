import assert from 'node:assert/strict';
import test from 'node:test';
import { interviewForm, newInterval, prepareInterviewSetup, setupFieldErrors } from './interviewSetupForm.js';

const catalog = {
  positions: [{ id: 'writing' }, { id: 'outreach' }],
  rooms: [{ id: 'R-B' }],
  interviewers: [{ id: 'I01' }]
};

function setup() {
  return interviewForm({
    date: '2028-02-29', start: '09:00', end: '10:00', durationMinutes: 20, roomIds: ['R-B'],
    interviewers: [{ id: 'I01', positionIds: ['writing', 'outreach'], availability: [{ start: '09:00', end: '10:00' }] }],
    availabilityWindows: [{ start: '09:40', end: '10:00' }, { start: '09:00', end: '09:20' }, { start: '09:20', end: '09:40' }]
  });
}

test('serializes minute times, adjacent intervals and independent slot durations without UI keys', () => {
  const form = setup();
  const original = [...form.availabilityWindows];
  for (const value of [15, '20', '30']) {
    form.durationMinutes = value;
    const { body, errors } = prepareInterviewSetup(form, catalog, '2028-02-28T08:00:00+07:00');
    assert.deepEqual(errors, {});
    assert.equal(body.durationMinutes, Number(value));
    assert.deepEqual(body.roomIds, ['R-B']);
    assert.deepEqual(body.interviewers, [
      { id: 'I01', positionIds: ['writing', 'outreach'], availability: [{ start: '09:00', end: '10:00' }] }
    ]);
    assert.deepEqual(body.availabilityWindows, original.map(({ start, end }) => ({ start, end })));
    assert.deepEqual(form.availabilityWindows, original);
  }
});

test('reports invalid dates, slot lengths, overlapping and out-of-bounds intervals', () => {
  const form = setup();
  form.date = '2027-02-29';
  form.end = '09:19';
  form.availabilityWindows = form.availabilityWindows.slice(1);
  form.interviewers[0].availability = [newInterval('09:00', '09:15'), newInterval('09:04', '09:10'), newInterval('08:50', '09:11')];
  const { errors } = prepareInterviewSetup(form, catalog);
  assert.ok(errors.date && errors.end && errors.availabilityWindows);
  const [, overlap, outside] = form.interviewers[0].availability;
  assert.ok(errors['interviewers.I01.availability.' + overlap.key + '.start']);
  assert.ok(errors['interviewers.I01.availability.' + outside.key + '.end']);
  form.date = '2028-02-29';
  assert.ok(prepareInterviewSetup(form, catalog, '2028-02-29T02:00:00Z').errors.date);
});

test('optional empty rooms and interviewers are valid and stale catalogue IDs are flagged', () => {
  const form = setup();
  form.roomIds = [];
  form.interviewers = [];
  assert.deepEqual(prepareInterviewSetup(form, catalog).errors, {});
  form.roomIds = ['missing'];
  form.interviewers = [{ id: 'I02', positionIds: ['retired'], availability: [] }];
  assert.deepEqual(Object.keys(prepareInterviewSetup(form, catalog).errors),
    ['roomIds', 'interviewers.I02.id', 'interviewers.I02.positionIds']);
});

test('maps API interval indexes to stable UI keys so other field errors survive row removal', () => {
  const form = setup();
  const selected = form.availabilityWindows[1];
  const available = form.interviewers[0].availability[0];
  const errors = setupFieldErrors({
    'availabilityWindows.1.start': 'Offer distinct windows.',
    'interviewers.I01.availability.0.end': 'End after start.',
    'interviewers.0.id': 'Unknown interviewer.',
    roomIds: 'Unknown room.'
  }, form);
  form.availabilityWindows.shift();
  assert.equal(errors['availabilityWindows.' + selected.key + '.start'], 'Offer distinct windows.');
  assert.equal(errors['interviewers.I01.availability.' + available.key + '.end'], 'End after start.');
  assert.equal(errors['interviewers.I01.id'], 'Unknown interviewer.');
  assert.equal(errors.roomIds, 'Unknown room.');
});
