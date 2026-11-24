import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { Resource, useResource } from '../../ui.jsx';
import { describeIssue, nameOf, slotLabel, windowFitsSlot } from './scheduleText.js';
import './scheduling.css';

const durations = [15, 20, 30];
const fieldIds = { start: 'schedule-start', end: 'schedule-end', duration: 'schedule-duration' };
const serverFieldMap = { 'window.start': 'start', 'window.end': 'end', 'window.date': 'start', window: 'start', durationMinutes: 'duration' };

export function SchedulePage() {
  const schedule = useResource('/api/schedule');
  const setup = useResource('/api/campaign/setup');
  // One loading/error state for both reads, so a single Retry reloads whichever request failed.
  const both = {
    data: schedule.data !== undefined && setup.data !== undefined ? { saved: schedule.data, config: setup.data } : undefined,
    error: schedule.error ?? setup.error,
    reload: () => { if (schedule.error) schedule.reload(); if (setup.error) setup.reload(); }
  };
  return <Resource title="Interview schedule" resource={both}>{({ saved, config }) =>
    <ScheduleWorkspace saved={saved} config={config} reloadSchedule={schedule.reload} reloadSetup={setup.reload} />}
  </Resource>;
}

function ScheduleWorkspace({ saved, config, reloadSchedule, reloadSetup }) {
  const settings = config.settings;
  const locked = saved.state === 'Confirmed' || config.locked;
  const [preview, setPreview] = useState(null);
  // A preview belongs to the saved revision it was generated from.
  const shownPreview = preview && preview.revision === saved.revision && !locked ? preview : null;
  const view = shownPreview ?? saved;

  return <section className="panel scheduling" aria-labelledby="schedule-title">
    <h1 id="schedule-title">Interview schedule</h1>
    <p className="muted">Generate a draft for shortlisted applications, then review each row's status.</p>
    {locked && <p className="schedule-note confirmed-note" role="status">The schedule is confirmed. Generation is closed.</p>}
    {!settings
      ? <EmptySetup />
      : <GenerateForm saved={saved} settings={settings}
          disabled={locked || saved.rows.length === 0} onPreview={setPreview}
          reloadSchedule={reloadSchedule} reloadSetup={reloadSetup} />}
    <ScheduleTable view={view} catalog={config.catalog} isPreview={!!shownPreview} onDiscard={() => setPreview(null)} />
    <ExportButton />
  </section>;
}

function EmptySetup() {
  return <div className="schedule-note">
    <p>Interview setup is missing. Configure interviewers, rooms and the slot duration first.</p>
    <Link className="button" to="/executive/interview-setup">Open interview setup</Link>
  </div>;
}

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

function GenerateForm({ saved, settings, disabled, onPreview, reloadSchedule, reloadSetup }) {
  const [values, setValues] = useState(() => initialWindow(saved, settings));
  const [tried, setTried] = useState(false);
  const [serverErrors, setServerErrors] = useState({});
  const [failure, setFailure] = useState(null);
  const [pending, setPending] = useState(false);
  const active = useRef(null);
  const form = useRef(null);
  useEffect(() => () => active.current?.abort(), []);

  const errors = { ...(tried ? validate(values, settings) : {}), ...serverErrors };

  function change(name, value) {
    setValues(v => ({ ...v, [name]: value }));
    setServerErrors(({ [name]: _, ...rest }) => rest);
  }

  async function submit(event) {
    event.preventDefault();
    if (active.current || disabled) return;
    setTried(true);
    const local = validate(values, settings);
    if (Object.keys(local).length) {
      form.current.querySelector('#' + fieldIds[Object.keys(fieldIds).find(k => local[k])])?.focus();
      return;
    }
    const controller = new AbortController();
    active.current = controller;
    setPending(true);
    setFailure(null);
    setServerErrors({});
    try {
      const duration = Number(values.duration);
      if (duration !== settings.durationMinutes) {
        // Duration is campaign-wide C4 configuration; the setup contract owns it.
        await apiRequest('/api/campaign/setup', { method: 'PUT', body: { ...settings, durationMinutes: duration }, signal: controller.signal });
        reloadSetup();
        reloadSchedule();
      }
      const result = await apiRequest('/api/schedule/draft', {
        method: 'POST', signal: controller.signal,
        body: { action: 'generate', revision: saved.revision, window: { date: settings.date, start: values.start, end: values.end } }
      });
      onPreview(result);
    } catch (error) {
      if (controller.signal.aborted) return;
      const mapped = {};
      for (const [key, message] of Object.entries(error.fields ?? {})) {
        const field = serverFieldMap[key];
        if (field && !mapped[field]) mapped[field] = message;
      }
      if (Object.keys(mapped).length) setServerErrors(mapped);
      setFailure(error.message);
      if (['STALE_REVISION', 'LOCKED', 'NO_SHORTLIST', 'SETUP_REQUIRED'].includes(error.code)) { reloadSchedule(); reloadSetup(); }
    } finally {
      if (!controller.signal.aborted) setPending(false);
      active.current = null;
    }
  }

  const field = (name, label, input, help) => {
    const id = fieldIds[name];
    const described = [help && id + '-help', errors[name] && id + '-error'].filter(Boolean).join(' ') || undefined;
    return <div className="schedule-field">
      <label htmlFor={id}>{label}</label>
      {React.cloneElement(input, { id, 'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': described })}
      {help && <p id={id + '-help'} className="field-help">{help}</p>}
      {errors[name] && <p id={id + '-error'} className="field-error">{errors[name]}</p>}
    </div>;
  };

  return <form ref={form} className="schedule-form" noValidate onSubmit={submit} aria-labelledby="generate-title">
    <h2 id="generate-title">Generate a draft</h2>
    <div className="schedule-fields">
      <div className="schedule-field">
        <label htmlFor="schedule-date">Interview date</label>
        <input id="schedule-date" type="date" value={settings.date} readOnly aria-describedby="schedule-date-help" />
        <p id="schedule-date-help" className="field-help">The campaign has one interview date, set in interview setup.</p>
      </div>
      {field('start', 'Window start', <input type="time" step="60" value={values.start} disabled={disabled}
        onChange={e => change('start', e.target.value)} />)}
      {field('end', 'Window end', <input type="time" step="60" value={values.end} disabled={disabled}
        onChange={e => change('end', e.target.value)} />)}
      {field('duration', 'Slot duration', <select value={values.duration} disabled={disabled}
        onChange={e => change('duration', e.target.value)}>
        {durations.map(d => <option key={d} value={d}>{d} minutes</option>)}
      </select>, 'Changing the duration updates the interview setup for the whole campaign.')}
    </div>
    <p className="field-help">Setup allows {settings.start}–{settings.end}. Generating replaces the table below with a preview; nothing is saved.</p>
    <div className="actions">
      <button type="submit" className="button primary" disabled={disabled || pending}>{pending ? 'Generating…' : 'Generate Draft'}</button>
    </div>
    {pending && <p role="status" className="muted">Generating the draft…</p>}
    {failure && <p role="alert">{failure}</p>}
  </form>;
}

function Counts({ counts }) {
  const items = [['Total', counts.total], ['Proposed', counts.proposed], ['Conflict', counts.conflict],
    ['Unassigned', counts.unassigned], ['Confirmed', counts.confirmed]];
  return <dl className="schedule-counts">{items.map(([label, value]) =>
    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

function ScheduleTable({ view, catalog, isPreview, onDiscard }) {
  const heading = isPreview ? 'Generated draft (not saved)' : view.state === 'Confirmed' ? 'Confirmed schedule'
    : view.state === 'Draft' ? 'Saved draft' : 'Shortlisted applications';
  return <section className="schedule-result" aria-labelledby="schedule-table-title">
    <h2 id="schedule-table-title">{heading}</h2>
    {view.window && <p className="muted">Window {view.window.date} · {view.window.start}–{view.window.end} (UTC+7) · revision {view.revision}</p>}
    {isPreview && <div className="schedule-note" role="status">
      <p>This is a preview generated from the current setup. The saved draft has not changed.</p>
      <button type="button" className="button" onClick={onDiscard}>Discard preview</button>
    </div>}
    <Counts counts={view.counts} />
    {view.rows.length === 0 ? <p className="state muted">No applications are shortlisted yet, so there is nothing to schedule.{' '}
      <Link to="/executive/applications">Open application review</Link> to shortlist candidates.</p> :
      <div className="table-scroll" role="region" aria-labelledby="schedule-table-title" tabIndex="0">
        <table className="schedule-table">
          <thead><tr><th scope="col">Application</th><th scope="col">Applicant and position</th>
            <th scope="col">Time</th><th scope="col">Interviewer</th><th scope="col">Room</th>
            <th scope="col">Status and reason</th></tr></thead>
          <tbody>{view.rows.map(row => <tr key={row.applicationId}>
            <th scope="row">{row.applicationId}</th>
            <td>{row.applicantName}<span className="cell-detail">{row.positionName}</span></td>
            <td className="nowrap">{row.slotId ? slotLabel(row.slotId) : '—'}</td>
            <td>{row.interviewerId ? nameOf(catalog.interviewers, row.interviewerId) : '—'}</td>
            <td className="nowrap">{row.roomId ? nameOf(catalog.rooms, row.roomId) : '—'}</td>
            <td className="status-cell"><span className={'badge badge-' + row.status.toLowerCase()}>{row.status}</span>
              {row.issues.length > 0 && <ul className="issue-list">{row.issues.map(issue =>
                <li key={issue.code + issue.resourceId}>{describeIssue(issue, row, view, catalog)}</li>)}</ul>}</td>
          </tr>)}</tbody>
        </table>
      </div>}
  </section>;
}

function ExportButton() {
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState(null);
  const active = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  async function download() {
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    setPending(true);
    setFailure(null);
    try {
      const blob = await apiRequest('/api/schedule/export', { responseType: 'blob', signal: controller.signal });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'schedule.csv';
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (error) {
      if (!controller.signal.aborted) setFailure(error.message);
    } finally {
      if (!controller.signal.aborted) setPending(false);
      active.current = null;
    }
  }
  return <div className="schedule-export">
    <p className="field-help">The export contains the saved schedule, not an unsaved preview.</p>
    <button type="button" className="button" onClick={download} disabled={pending}>{pending ? 'Exporting…' : 'Export CSV'}</button>
    {failure && <p role="alert">{failure}</p>}
  </div>;
}
