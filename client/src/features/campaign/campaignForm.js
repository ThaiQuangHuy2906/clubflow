const zone = '+07:00';
const trim = text => text.replace(/^[\s\u0085]+|[\s\u0085]+$/gu, '');

export function newDepartment() {
  return { id: 'd-' + crypto.randomUUID(), name: '', positions: [] };
}

export function newPosition() {
  return { id: 'p-' + crypto.randomUUID(), name: '', quota: '', description: '', requirements: '' };
}

function editableTime(stamp, closing = false) {
  if (!stamp) return { date: '', time: '' };
  const local = new Date(Date.parse(stamp) + 7 * 3600000);
  const [date, clock] = local.toISOString().split('T');
  const fraction = stamp.match(/\.\d+/)?.[0] ?? '';
  if (clock.startsWith('00:00:00') && !/[1-9]/.test(fraction)) {
    if (closing) local.setUTCDate(local.getUTCDate() - 1);
    return { date: local.toISOString().split('T')[0], time: '' };
  }
  return { date, time: clock.slice(0, 8) + fraction };
}

export function campaignForm(draft) {
  const data = draft ?? { name: '', hostClub: '', description: '', instructions: '', departments: [] };
  return { ...data, opensAt: editableTime(data.opensAt), closesAt: editableTime(data.closesAt, true) };
}

// An omitted closing time includes the entire selected calendar day in UTC+7.
function timestamp({ date, time }, path, publishing, errors) {
  const value = trim(time);
  if (!date) {
    if (value || publishing) errors[path] = 'Choose a date.';
    return '';
  }
  const midnight = new Date(date + 'T00:00:00Z');
  if (!/^\d{4}-\d\d-\d\d$/.test(date) || !Number.isFinite(+midnight) || !midnight.toISOString().startsWith(date + 'T')) {
    errors[path] = 'Choose a valid calendar date.';
    return '';
  }
  if (value && !/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?$/.test(value)) {
    errors[path + '.time'] = 'Use HH:mm or HH:mm:ss, optionally with fractional seconds.';
    return '';
  }
  if (!value && path === 'closesAt') {
    midnight.setUTCDate(midnight.getUTCDate() + 1);
    const next = midnight.toISOString().split('T')[0];
    if (next.length !== 10) {
      errors[path] = 'Choose an earlier date or specify a closing time.';
      return '';
    }
    date = next;
  }
  const clock = value.length === 5 ? value + ':00' : value || '00:00:00';
  return date + 'T' + clock + zone;
}

function compareInstants(a, b) {
  const milliseconds = Date.parse(a) - Date.parse(b);
  if (milliseconds) return milliseconds;
  const fraction = stamp => (stamp.match(/\.(\d+)/)?.[1] ?? '').replace(/0+$/, '');
  const left = fraction(a), right = fraction(b);
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

export function previewIntake({ opensAt, closesAt }, { serverTime, locked }) {
  if (!opensAt || !closesAt || compareInstants(opensAt, closesAt) >= 0) return undefined;
  return !locked && compareInstants(opensAt, serverTime) <= 0 && compareInstants(serverTime, closesAt) < 0;
}

export function prepareCampaign(form, publishing) {
  const errors = {};
  function text(value, path, max) {
    const cleaned = trim(value);
    if (!cleaned && publishing) errors[path] = 'Required to publish.';
    else if ([...cleaned].length > max) errors[path] = 'Use ' + max + ' characters or fewer.';
    return cleaned;
  }
  const body = {
    name: text(form.name, 'name', 120), hostClub: text(form.hostClub, 'hostClub', 120),
    description: text(form.description, 'description', 2000), instructions: text(form.instructions, 'instructions', 2000),
    opensAt: timestamp(form.opensAt, 'opensAt', publishing, errors),
    closesAt: timestamp(form.closesAt, 'closesAt', publishing, errors),
    departments: []
  };
  if (body.opensAt && body.closesAt && compareInstants(body.closesAt, body.opensAt) <= 0) {
    errors.closesAt = 'Closing must be later than opening.';
  }
  if (publishing && !form.departments.length) errors.departments = 'Add at least one department.';
  if (form.departments.length > 30) errors.departments = 'Use up to 30 departments.';
  body.departments = form.departments.map(department => {
    const prefix = 'departments.' + department.id;
    const name = text(department.name, prefix + '.name', 100);
    if (publishing && !department.positions.length) errors[prefix + '.positions'] = 'Add at least one position.';
    if (department.positions.length > 50) errors[prefix + '.positions'] = 'Use up to 50 positions per department.';
    const positions = department.positions.map(position => {
      const path = prefix + '.positions.' + position.id;
      const entered = String(position.quota ?? '').trim();
      const quota = entered ? Number(entered) : null;
      const name = text(position.name, path + '.name', 100);
      if ((!entered && publishing) || (entered && (!/^\d+$/.test(entered) || quota < 1 || quota > 999))) {
        errors[path + '.quota'] = 'Enter a whole number from 1 to 999.';
      }
      return { id: position.id, name, quota, description: text(position.description, path + '.description', 2000),
        requirements: text(position.requirements, path + '.requirements', 2000) };
    });
    return { id: department.id, name, positions };
  });
  return { body, errors };
}
