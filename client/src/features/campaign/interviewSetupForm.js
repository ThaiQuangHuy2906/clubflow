export const durations = [15, 20, 30];

export function newInterval(start = '', end = '') {
  return { key: crypto.randomUUID(), start, end };
}

export function interviewForm(settings) {
  if (!settings) return { date: '', start: '', end: '', durationMinutes: 20, roomIds: [], interviewers: [], availabilityWindows: [] };
  const rows = intervals => intervals.map(({ start, end }) => newInterval(start, end));
  return {
    ...settings,
    availabilityWindows: rows(settings.availabilityWindows),
    interviewers: settings.interviewers.map(person => ({ ...person, availability: rows(person.availability) }))
  };
}

const clockTime = value => /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
const minutes = value => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
const intervalFields = rows => rows.map(({ start, end }) => ({ start, end }));

function validateIntervals(rows, prefix, bounds, errors) {
  const ordered = [];
  for (const row of rows) {
    const path = prefix + '.' + row.key;
    if (!clockTime(row.start)) errors[path + '.start'] = 'Enter a start time.';
    if (!clockTime(row.end)) errors[path + '.end'] = 'Enter an end time.';
    if (errors[path + '.start'] || errors[path + '.end']) continue;
    if (row.end <= row.start) errors[path + '.end'] = 'End after start.';
    else if ((clockTime(bounds.start) && row.start < bounds.start) || (clockTime(bounds.end) && row.end > bounds.end)) {
      errors[path + '.end'] = 'Use times inside the interview day bounds.';
    }
    if (!errors[path + '.end']) ordered.push(row);
  }
  let previousEnd = '';
  for (const row of ordered.sort((left, right) => left.start.localeCompare(right.start))) {
    if (row.start < previousEnd) errors[prefix + '.' + row.key + '.start'] = 'Intervals cannot overlap.';
    if (row.end > previousEnd) previousEnd = row.end;
  }
}

export function prepareInterviewSetup(form, catalog, draftClose) {
  const { date, start, end, roomIds, interviewers, availabilityWindows } = form;
  const durationMinutes = Number(form.durationMinutes);
  const errors = {};
  const parsedDate = new Date(date + 'T00:00:00Z');
  if (!/^\d{4}-\d\d-\d\d$/.test(date) || Number.isNaN(+parsedDate) || !parsedDate.toISOString().startsWith(date + 'T')) {
    errors.date = 'Enter a valid calendar date.';
  }
  if (!clockTime(start)) errors.start = 'Enter a start time.';
  if (!clockTime(end)) errors.end = 'Enter an end time.';
  if (!durations.includes(durationMinutes)) errors.durationMinutes = 'Choose 15, 20 or 30 minutes.';
  if (!errors.start && !errors.end && (start >= end || minutes(end) - minutes(start) < durationMinutes)) {
    errors.end = 'Allow at least one full interview slot.';
  }
  if (draftClose && !errors.date && !errors.start && Date.parse(date + 'T' + start + ':00+07:00') <= Date.parse(draftClose)) {
    errors.date = 'Schedule interviews after applications close.';
  }
  const positions = new Set(catalog.positions.map(({ id }) => id));
  const rooms = new Set(catalog.rooms.map(({ id }) => id));
  const staff = new Set(catalog.interviewers.map(({ id }) => id));
  if (roomIds.some(id => !rooms.has(id))) errors.roomIds = 'Remove unavailable rooms from the selection.';
  if (availabilityWindows.length < 3) errors.availabilityWindows = 'Offer at least three distinct windows.';
  validateIntervals(availabilityWindows, 'availabilityWindows', form, errors);
  for (const person of interviewers) {
    const prefix = 'interviewers.' + person.id;
    if (!staff.has(person.id)) errors[prefix + '.id'] = 'Remove this unavailable interviewer.';
    if (!person.positionIds.length || person.positionIds.some(id => !positions.has(id))) {
      errors[prefix + '.positionIds'] = 'Select at least one position from the current catalogue.';
    }
    validateIntervals(person.availability, prefix + '.availability', form, errors);
  }
  return { errors, body: { date, start, end, durationMinutes, roomIds,
    availabilityWindows: intervalFields(availabilityWindows),
    interviewers: interviewers.map(({ id, positionIds, availability }) =>
      ({ id, positionIds, availability: intervalFields(availability) })) } };
}

export function setupFieldErrors(fields, form) {
  return Object.fromEntries(Object.entries(fields).map(([path, message]) => {
    const parts = path.split('.');
    let row;
    if (parts[0] === 'availabilityWindows') row = form.availabilityWindows[parts[1]];
    if (parts[0] === 'interviewers') {
      const person = form.interviewers.find(({ id }) => id === parts[1]) ?? form.interviewers[parts[1]];
      if (person) {
        parts[1] = person.id;
        if (parts[2] === 'availability') {
          row = person.availability[parts[3]];
          if (row) parts[3] = row.key;
        }
      }
    } else if (row) parts[1] = row.key;
    return [parts.join('.'), message];
  }));
}
