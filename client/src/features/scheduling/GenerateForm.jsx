import React, { useRef, useState } from 'react';
import { Field } from './Field.jsx';
import { windowFitsSlot } from './scheduleText.js';

const durations = [15, 20, 30];
const fieldIds = { start: 'schedule-start', end: 'schedule-end', duration: 'schedule-duration' };
const serverFieldMap = {
  'window.start': 'start', 'window.end': 'end', 'window.date': 'start', window: 'start', durationMinutes: 'duration'
};

function initialWindow(saved, settings) {
  const w = saved.window?.date === settings.date ? saved.window : settings;
  return { start: w.start, end: w.end, duration: String(settings.durationMinutes) };
}

function validate(values, settings) {
  const errors = {};
  const duration = Number(values.duration);
  if (!durations.includes(duration)) errors.duration = 'Choose 15, 20 or 30 minutes.';
  if (!values.start) errors.start = 'Enter a start time.';
  else if (values.start < settings.start || values.start >= settings.end) errors.start = `Start between ${settings.start} and ${settings.end}.`;
  if (!values.end) errors.end = 'Enter an end time.';
  else if (values.end > settings.end) errors.end = `End at or before ${settings.end}.`;
  else if (values.start && values.end <= values.start) errors.end = 'End after the start time.';
  if (!errors.start && !errors.end && !errors.duration && !windowFitsSlot(settings, duration, values.start, values.end)) {
    errors.end = `The window must contain at least one whole ${duration}-minute slot counted from ${settings.start}.`;
  }
  return errors;
}

// `onGenerate` resolves to the request error, or null on success.
export function GenerateForm({ saved, settings, disabled, busy, generating, onGenerate }) {
  const [values, setValues] = useState(() => initialWindow(saved, settings));
  const [tried, setTried] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [failure, setFailure] = useState(null);
  const form = useRef(null);

  const errors = { ...(tried ? validate(values, settings) : {}), ...serverErrors };

  function change(name, value) {
    setValues(v => ({ ...v, [name]: value }));
    setServerErrors(({ [name]: _, ...rest }) => rest);
  }

  async function submit(event) {
    event.preventDefault();
    if (busy || disabled) return;
    setTried(true);
    const local = validate(values, settings);
    if (Object.keys(local).length) {
      form.current.querySelector('#' + fieldIds[Object.keys(fieldIds).find(k => local[k])])?.focus();
      return;
    }
    setFailure(null);
    setServerErrors({});
    const error = await onGenerate({ start: values.start, end: values.end, durationMinutes: Number(values.duration) });
    if (!error) return;
    const mapped = {};
    for (const [key, message] of Object.entries(error.fields ?? {})) {
      const field = serverFieldMap[key];
      if (field && !mapped[field]) mapped[field] = message;
    }
    setServerErrors(mapped);
    setFailure(error.message);
  }

  return <form ref={form} className="schedule-form" noValidate onSubmit={submit} aria-labelledby="generate-title">
    <h2 id="generate-title">Generate a draft</h2>
    <div className="schedule-fields">
      <Field id="schedule-date" label="Interview date" help="The campaign has one interview date, set in interview setup.">
        <input type="date" value={settings.date} readOnly />
      </Field>
      <Field id={fieldIds.start} label="Window start" error={errors.start}>
        <input type="time" step="60" value={values.start} disabled={disabled} onChange={e => change('start', e.target.value)} />
      </Field>
      <Field id={fieldIds.end} label="Window end" error={errors.end}>
        <input type="time" step="60" value={values.end} disabled={disabled} onChange={e => change('end', e.target.value)} />
      </Field>
      <Field id={fieldIds.duration} label="Slot duration" error={errors.duration}
        help="Changing the duration updates the interview setup for the whole campaign.">
        <select value={values.duration} disabled={disabled} onChange={e => change('duration', e.target.value)}>
          {durations.map(d => <option key={d} value={d}>{d} minutes</option>)}
        </select>
      </Field>
    </div>
    <p className="field-help">Setup allows {settings.start}–{settings.end}. Generating replaces the table below with a preview; nothing is saved.</p>
    <div className="actions">
      <button type="submit" className="button primary" disabled={disabled || busy}>{generating ? 'Generating…' : 'Generate Draft'}</button>
    </div>
    {generating && <p role="status" className="muted">Generating the draft…</p>}
    {failure && <p role="alert">{failure}</p>}
  </form>;
}
