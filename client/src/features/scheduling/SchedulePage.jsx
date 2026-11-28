import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { Resource, useResource } from '../../ui.jsx';
import { AssignmentEditor } from './AssignmentEditor.jsx';
import { ConfirmPanel } from './ConfirmPanel.jsx';
import { ExportButton } from './ExportButton.jsx';
import { GenerateForm } from './GenerateForm.jsx';
import { Counts, ScheduleTable, rowActionId } from './ScheduleTable.jsx';
import { choiceFields, choicesOf, formBaseline, toAssignments, usableWindow } from './scheduleText.js';
import { useExclusiveRequest } from './useExclusiveRequest.js';
import './scheduling.css';

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
  // `record` is the latest saved schedule the API sent: the page read, then the answer of each successful write.
  const [record, setRecord] = useState(saved);
  const [lastRead, setLastRead] = useState(saved);
  if (saved !== lastRead) {
    setLastRead(saved);
    setRecord(saved);
  }
  const [preview, setPreview] = useState(null);
  // The open slot editor and its selected values: { id, values }.
  const [editing, setEditing] = useState(null);
  // What the user typed into the generation form, or null while it follows the saved draft.
  const [formEdits, setFormEdits] = useState(null);
  const [formVersion, setFormVersion] = useState(0);
  const [notice, setNotice] = useState('');
  const [failure, setFailure] = useState(null);
  const [focusId, setFocusId] = useState(null);
  const [pending, run] = useExclusiveRequest();

  const settings = config.settings;
  const locked = record.state === 'Confirmed' || config.locked;
  // A preview holds unsaved changes. It belongs to the saved revision it was built from.
  const unsaved = !!preview && preview.revision === record.revision && !locked;
  const view = unsaved ? preview : record;
  const editingRow = !locked && settings && view.rows.find(row => row.applicationId === editing?.id);
  const editorDirty = !!editingRow && choiceFields.some(name => editing.values[name] !== choicesOf(editingRow)[name]);
  const baseline = settings && formBaseline(record, settings);
  const formValues = formEdits ?? baseline;
  const formDirty = !locked && !!formEdits && !!baseline && Object.keys(baseline).some(key => formEdits[key] !== baseline[key]);
  const unappliedChoice = editorDirty ? `You changed the choices for ${editingRow.applicationId} but have not applied them.` : '';
  // Why the screen differs from the saved draft, most specific first. Empty means they match.
  const pendingChanges = editorDirty
    ? `${unappliedChoice} Use Check and apply and then Save Changes, or Cancel the editor.`
    : unsaved ? 'Save or discard your changes first: only the saved draft can be confirmed.'
      : formDirty ? 'The generation settings differ from the saved draft. Generate and save a new draft, or choose Discard changes.'
        : '';

  function resetEdits() {
    setPreview(null);
    setEditing(null);
    setFormEdits(null);
    setFormVersion(n => n + 1);
  }

  useEffect(() => {
    if (!focusId || pending) return;
    document.getElementById(focusId)?.focus();
    setFocusId(null);
  }, [focusId, pending]);

  function handleError(error) {
    if (error.code === 'LOCKED') {
      reloadSchedule();
      reloadSetup();
    }
  }

  // The saved schedule or the shortlist moved on under the edits: offer a reload instead of dropping them.
  const outdated = error => ['STALE_REVISION', 'NO_SHORTLIST', 'SETUP_REQUIRED'].includes(error.code) ||
    Object.entries(error.fields ?? {}).some(([key, message]) => /^assignments\.[^.]+$/.test(key) && /shortlisted/i.test(message));

  function showFailure(error) {
    setFailure({ message: error.message, details: Object.values(error.fields ?? {}), outdated: outdated(error) });
  }

  function loadCurrent() {
    resetEdits();
    setFailure(null);
    setNotice('');
    reloadSchedule();
    reloadSetup();
  }

  async function generate({ start, end, durationMinutes }) {
    let failed = null;
    await run('generate', async signal => {
      setNotice('');
      setFailure(null);
      try {
        if (durationMinutes !== settings.durationMinutes) {
          // Duration is campaign-wide C4 configuration; the setup contract owns it.
          await apiRequest('/api/campaign/setup', { method: 'PUT', body: { ...settings, durationMinutes }, signal });
          setPreview(null);
          reloadSetup();
          reloadSchedule();
        }
        const result = await apiRequest('/api/schedule/draft', {
          method: 'POST', signal,
          body: { action: 'generate', revision: record.revision, window: { date: settings.date, start, end } }
        });
        setPreview(result);
        setEditing(null);
      } catch (error) {
        if (signal.aborted) return;
        failed = error;
        handleError(error);
        if (outdated(error)) showFailure(error);
      }
    });
    return failed;
  }

  async function checkChoice(choice) {
    let failed = null;
    await run('check', async signal => {
      setNotice('');
      setFailure(null);
      try {
        const result = await apiRequest('/api/schedule/draft', {
          method: 'POST', signal,
          body: {
            action: 'preview', revision: record.revision, window: usableWindow(view.window, settings),
            assignments: toAssignments(view.rows).map(a => a.applicationId === choice.applicationId ? choice : a)
          }
        });
        setPreview(result);
        setEditing(null);
        setFocusId(rowActionId(choice.applicationId));
        const row = result.rows.find(r => r.applicationId === choice.applicationId);
        setNotice(`Checked ${choice.applicationId}: ${row?.status ?? 'removed'}. Not saved yet.`);
      } catch (error) {
        if (signal.aborted) return;
        failed = error;
        handleError(error);
        if (outdated(error)) showFailure(error);
      }
    });
    return failed;
  }

  function saveChanges() {
    run('save', async signal => {
      setNotice('');
      setFailure(null);
      try {
        const result = await apiRequest('/api/schedule', {
          method: 'PUT', signal,
          body: { revision: record.revision, window: usableWindow(view.window, settings), assignments: toAssignments(view.rows) }
        });
        setRecord(result);
        setPreview(null);
        setEditing(null);
        // Typed settings that now match the saved draft stop counting as edits.
        const savedForm = formBaseline(result, settings);
        setFormEdits(typed => typed && Object.keys(savedForm).every(key => typed[key] === savedForm[key]) ? null : typed);
        const { conflict, unassigned } = result.counts;
        setNotice(conflict || unassigned
          ? `Draft saved. ${conflict} in conflict and ${unassigned} unassigned still need attention.`
          : 'Draft saved. Every row is proposed.');
      } catch (error) {
        if (signal.aborted) return;
        handleError(error);
        showFailure(error);
      }
    });
  }

  function discard() {
    resetEdits();
    setFailure(null);
    setNotice('Unsaved changes discarded.');
  }

  function confirmed(result) {
    setRecord(result);
    resetEdits();
    setFailure(null);
    setNotice('Schedule confirmed. It is now read-only.');
    setFocusId('confirm-title');
  }

  function refused(error) {
    setNotice('');
    // The server rechecked the saved rows against current data, so read them again once.
    if (error.code === 'CONFIRMATION_BLOCKED') {
      reloadSchedule();
      reloadSetup();
    } else {
      handleError(error);
      if (outdated(error)) showFailure(error);
    }
  }

  const heading = unsaved ? 'Unsaved changes' : record.state === 'Confirmed' ? 'Confirmed schedule'
    : record.state === 'Draft' ? 'Saved draft' : 'Shortlisted applications';

  return <section className="panel scheduling" aria-labelledby="schedule-title">
    <h1 id="schedule-title">Interview schedule</h1>
    <p className="muted">Generate a draft for shortlisted applications, adjust the rows, then save it.</p>
    {locked && <p className="schedule-note confirmed-note">The schedule is confirmed. Editing and generation are closed.</p>}
    {!settings
      ? <div className="schedule-note">
        <p>Interview setup is missing. Configure interviewers, rooms and the slot duration first.</p>
        <Link className="button" to="/executive/interview-setup">Open interview setup</Link>
      </div>
      : <GenerateForm key={formVersion} values={formValues} settings={settings} disabled={locked || record.rows.length === 0}
          busy={!!pending} generating={pending === 'generate'} onChange={setFormEdits} onGenerate={generate} />}

    <section className="schedule-result" aria-labelledby="schedule-table-title">
      <h2 id="schedule-table-title">{heading}</h2>
      {view.window && <p className="muted">Window {view.window.date} · {view.window.start}–{view.window.end} (UTC+7) · saved revision {record.revision}</p>}
      {unsaved && <p className="schedule-note">These rows are a preview. The saved draft has not changed. Unsaved changes are lost if you leave this page.</p>}
      <Counts counts={view.counts} />
      {editingRow && <AssignmentEditor key={editingRow.applicationId} row={editingRow} view={view} config={config}
        window={usableWindow(view.window, settings)} values={editing.values} busy={!!pending} checking={pending === 'check'}
        onChange={values => setEditing({ id: editingRow.applicationId, values })} onCheck={checkChoice}
        onCancel={() => { setEditing(null); setFocusId(rowActionId(editingRow.applicationId)); }} />}
      {editorDirty && <p id="unapplied-help" className="schedule-note">
        {unappliedChoice} Check and apply them, or Cancel the editor, before saving or opening another row.
      </p>}
      {/* Opening another row would silently drop an unapplied choice, so row actions wait for it. */}
      <ScheduleTable view={view} catalog={config.catalog} editable={!locked && !!settings} actionsDisabled={!!pending || editorDirty}
        editingId={editingRow?.applicationId} labelledBy="schedule-table-title"
        onEdit={id => {
          setNotice('');
          setEditing({ id, values: choicesOf(view.rows.find(row => row.applicationId === id)) });
        }} />
      <div className="actions">
        <button type="button" className="button primary" disabled={!unsaved || editorDirty || !!pending} onClick={saveChanges}
          aria-describedby={editorDirty ? 'unapplied-help' : undefined}>
          {pending === 'save' ? 'Saving…' : 'Save Changes'}
        </button>
        {!!pendingChanges && <button type="button" className="button" disabled={!!pending} onClick={discard}>Discard changes</button>}
      </div>
      <p role="status" className="schedule-status">{notice}</p>
      {failure && <div className="schedule-failure">
        <p role="alert">{failure.message}</p>
        {failure.details.length > 0 && <ul className="issue-list">{failure.details.map(text => <li key={text}>{text}</li>)}</ul>}
        {failure.outdated && <button type="button" className="button" disabled={!!pending} onClick={loadCurrent}>
          Load the current schedule and drop my changes
        </button>}
      </div>}
    </section>
    <ExportButton unsaved={unsaved || editorDirty} />
    <ConfirmPanel key={`${record.revision}-${!!pendingChanges}`} record={record} catalog={config.catalog} locked={locked}
      pendingChanges={pendingChanges} busy={!!pending} confirming={pending === 'confirm'} run={run} onConfirmed={confirmed} onRefused={refused} />
  </section>;
}
