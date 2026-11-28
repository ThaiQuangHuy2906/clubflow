import React, { useEffect, useRef, useState } from 'react';
import { Field } from './Field.jsx';
import { choiceFields as names, describeIssue, slotLabel } from './scheduleText.js';

const missing = {
  slotId: 'Choose a time slot.', interviewerId: 'Choose an interviewer.', roomId: 'Choose a room.'
};

function validate(values) {
  const errors = {};
  for (const name of names) if (!values[name]) errors[name] = missing[name];
  return errors;
}

// Keeps a stored choice selectable even after interview setup stopped offering it.
function withCurrent(options, current, label) {
  return current && !options.some(o => o.value === current) ? [{ value: current, label }, ...options] : options;
}

// The page owns the selected values, so Save and Confirm know about choices that were not applied yet.
// `onCheck` previews the whole draft with this row replaced. It resolves to the request error, or null.
export function AssignmentEditor({ row, view, config, window: draftWindow, values, busy, checking, onChange, onCheck, onCancel }) {
  const { catalog, settings } = config;
  const [tried, setTried] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [failure, setFailure] = useState(null);
  const heading = useRef(null);
  const form = useRef(null);
  useEffect(() => { heading.current.focus(); }, []);

  const prefix = 'assignments.' + row.applicationId;
  const errors = { ...(tried ? validate(values) : {}), ...serverErrors };
  const idOf = name => 'edit-' + name;

  const slots = withCurrent(config.slots
    .filter(s => s.date === draftWindow.date && s.start >= draftWindow.start && s.end <= draftWindow.end)
    .map(s => ({
      value: s.id,
      label: `${s.start}–${s.end}` + (row.availableSlotIds.includes(s.id) ? '' : ' (applicant not available)')
    })), values.slotId, slotLabel(values.slotId) + ' (not in the current slot grid)');

  const interviewers = withCurrent(catalog.interviewers.map(person => {
    const configured = settings.interviewers.find(i => i.id === person.id);
    return {
      value: person.id,
      label: person.name + (configured?.positionIds.includes(row.positionId) ? '' : ` (not qualified for ${row.positionName})`)
    };
  }), values.interviewerId, values.interviewerId);

  const rooms = withCurrent(catalog.rooms.map(room => ({
    value: room.id, label: room.name + (settings.roomIds.includes(room.id) ? '' : ' (not selected in setup)')
  })), values.roomId, values.roomId);

  function change(name, value) {
    onChange({ ...values, [name]: value });
    setServerErrors(({ [name]: _, ...rest }) => rest);
  }

  async function check(choice) {
    setFailure(null);
    setServerErrors({});
    const error = await onCheck({ applicationId: row.applicationId, ...choice });
    if (!error) return;
    const mapped = {};
    const other = [];
    for (const [key, message] of Object.entries(error.fields ?? {})) {
      const name = names.find(n => key === prefix + '.' + n);
      if (name) mapped[name] = message;
      else other.push(message);
    }
    setServerErrors(mapped);
    setFailure([error.message, ...other].join(' '));
  }

  function submit(event) {
    event.preventDefault();
    if (busy) return;
    setTried(true);
    const local = validate(values);
    const first = names.find(name => local[name]);
    if (first) {
      form.current.querySelector('#' + idOf(first)).focus();
      return;
    }
    check(values);
  }

  const select = (name, label, options, placeholder) =>
    <Field id={idOf(name)} label={label} error={errors[name]}>
      <select value={values[name]} disabled={busy} onChange={e => change(name, e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Field>;

  return <form ref={form} className="assignment-editor" noValidate onSubmit={submit} aria-labelledby="editor-title">
    <h3 id="editor-title" ref={heading} tabIndex="-1">
      Interview slot for {row.applicationId} · {row.applicantName} · {row.positionName}
    </h3>
    {row.issues.length > 0 && <ul className="issue-list">{row.issues.map(issue =>
      <li key={issue.code + issue.resourceId + issue.applicationIds.join()}>{describeIssue(issue, row, view, catalog)}</li>)}</ul>}
    <div className="editor-fields">
      {select('slotId', 'Time slot', slots, 'Choose a time slot')}
      {select('interviewerId', 'Interviewer', interviewers, 'Choose an interviewer')}
      {select('roomId', 'Room', rooms, 'Choose a room')}
    </div>
    <div className="actions">
      <button type="submit" className="button primary" disabled={busy}>{checking ? 'Checking…' : 'Check and apply'}</button>
      {row.slotId && <button type="button" className="button" disabled={busy}
        onClick={() => check({ slotId: null, interviewerId: null, roomId: null })}>Clear assignment</button>}
      <button type="button" className="button" disabled={busy} onClick={onCancel}>Cancel</button>
    </div>
    {failure && <p role="alert">{failure}</p>}
  </form>;
}
