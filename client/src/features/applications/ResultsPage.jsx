import React, { useEffect, useRef, useState } from 'react';
import { apiRequest } from '../../api.js';
import { CampaignTime, EmptyState, Resource, useResource } from '../../ui.jsx';
import './results.css';

const caseLabels = {
  Scheduled: 'Scheduled',
  NeedsReview: 'Needs review',
  Attended: 'Attended',
  Absent: 'Absent'
};

const caseHandled = status => status === 'Attended' || status === 'Absent';

function changesSinceReview(previous, latest) {
  const before = new Map(previous.items.map(item => [item.applicationId, item]));
  const after = new Map(latest.items.map(item => [item.applicationId, item]));
  return [...new Set([...before.keys(), ...after.keys()])].flatMap(id => {
    const oldCase = before.get(id);
    const newCase = after.get(id);
    if (!oldCase) return [`${id} · Interview case added.`];
    if (!newCase) return [`${id} · Interview case removed.`];

    const changes = [];
    if (oldCase.decision !== newCase.decision) {
      changes.push(`${id} · Decision: ${oldCase.decision ?? 'Pending'} → ${newCase.decision ?? 'Pending'}`);
    }
    if (oldCase.caseStatus !== newCase.caseStatus) {
      changes.push(`${id} · Interview status: ${caseLabels[oldCase.caseStatus]} → ${caseLabels[newCase.caseStatus]}`);
    }
    if (oldCase.assessment?.submittedAt !== newCase.assessment?.submittedAt ||
        oldCase.assessment?.feedback !== newCase.assessment?.feedback) {
      changes.push(`${id} · Interviewer assessment changed.`);
    }
    return changes;
  });
}

function ResultField({ id, label, name, value, error, onChange, children }) {
  const inputId = `result-${id}-${name}`;
  return <div className="result-field">
    <label htmlFor={inputId}>{label}</label>
    <select id={inputId} value={value} onChange={event => onChange(name, event.target.value)}
      aria-invalid={error ? true : undefined} aria-describedby={error ? inputId + '-error' : undefined}>
      {children}
    </select>
    {error && <p className="field-error" id={inputId + '-error'}>{error}</p>}
  </div>;
}

function ResultCase({ application, changes, published, busy, saving, failure, saved, onChange, onSave }) {
  const { applicationId: id, positionName, applicantName, caseStatus, assessment, decision } = application;
  const form = useRef(null);
  const error = useRef(null);
  const handled = caseHandled(caseStatus);
  const fields = failure?.fields;

  useEffect(() => {
    if (!failure || busy) return;
    const invalid = form.current?.querySelector('[aria-invalid="true"]:not(:disabled)');
    (invalid ?? error.current)?.focus();
  }, [busy, failure]);

  return <li className="result-case">
    <h3>{positionName} · {id}</h3>
    <p className="muted">{applicantName}</p>
    <dl className="result-facts">
      <div><dt>Interview status</dt><dd><span className="status">{caseLabels[caseStatus]}</span></dd></div>
      <div><dt>{published ? 'Published decision' : 'Saved decision'}</dt><dd>{decision ?? 'Pending'}</dd></div>
    </dl>
    {assessment ? <section className="result-assessment">
      <h4>Interviewer assessment</h4>
      <p>{assessment.feedback}</p>
      <p className="muted"><CampaignTime value={assessment.submittedAt} /></p>
    </section> : caseStatus === 'Scheduled' ? <p className="muted">Wait until the interview ends to save its result.</p>
      : caseStatus !== 'Absent' && <p className="muted">Assessment missing. The Executive can record how this case was handled.</p>}
    {!published && caseStatus !== 'Scheduled' && <form ref={form} onSubmit={event => { event.preventDefault(); onSave(); }}>
      <fieldset className="result-edit-fields" disabled={busy}>
        <legend>Edit outcome for {id}</legend>
        <ResultField id={id} name="decision" label="Final decision" value={changes.decision ?? decision ?? ''}
          error={fields?.decision} onChange={onChange}>
          {!decision && <option value="">Choose a decision</option>}
          <option>Pass</option><option>Fail</option>
        </ResultField>
        {!assessment && <ResultField id={id} name="caseStatus" label="Interview outcome"
          value={changes.caseStatus ?? (handled ? caseStatus : '')} error={fields?.caseStatus} onChange={onChange}>
          {!handled && <option value="">Choose an outcome</option>}
          <option>Attended</option><option>Absent</option>
        </ResultField>}
        <button className="button" type="submit" disabled={!Object.keys(changes).length}>
          {saving ? 'Saving…' : 'Save ' + id}
        </button>
      </fieldset>
    </form>}
    {failure && <p ref={error} role="alert" tabIndex={-1}>{failure.message}</p>}
    {saved && <p className="result-success" role="status">Saved for {id}.</p>}
  </li>;
}

function ResultsWorkspace({ source }) {
  const [update, setUpdate] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [pending, setPending] = useState(null);
  const [failure, setFailure] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const active = useRef(null);
  const publicationError = useRef(null);
  const publicationStatus = useRef(null);
  const summary = update?.source === source ? update.summary : source;
  const { items, total, revision, publishedAt } = summary;
  const changesFor = application => Object.fromEntries(Object.entries(drafts[application.applicationId] ?? {})
    .filter(([field, value]) => value && value !== application[field]));
  const hasEdits = items.some(application => Object.keys(changesFor(application)).length > 0);
  const allCasesReady = items.length > 0 && items.every(application => caseHandled(application.caseStatus) && application.decision);
  const canPublish = !refreshRequired && allCasesReady && !hasEdits;
  const busy = !!pending;
  const publishFailure = ['publish', 'refresh'].includes(failure?.action) ? failure.error : null;
  const reviewChanges = conflict?.latest ? changesSinceReview(conflict.previous, conflict.latest) : [];

  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if ((publishFailure || conflict) && !busy) publicationError.current?.focus();
  }, [busy, conflict, publishFailure]);
  useEffect(() => {
    if (update?.source === source && update.summary.publishedAt) publicationStatus.current?.focus();
  }, [source, update]);

  function change(application, field, value) {
    const id = application.applicationId;
    setDrafts(current => ({ ...current, [id]: { ...current[id], [field]: value } }));
    setSavedId(null);
  }

  async function write(application, refreshOnly = false) {
    if (active.current || busy || publishedAt) return;
    const id = application?.applicationId;
    const action = refreshOnly ? 'refresh' : id ?? 'publish';
    const changes = application ? changesFor(application) : null;
    if (id && (refreshRequired || application.caseStatus === 'Scheduled' || !Object.keys(changes).length)) return;
    if (!id && !refreshOnly && !canPublish) return;

    const controller = new AbortController();
    active.current = controller;
    setPending(action);
    setFailure(null);
    setSavedId(null);
    const { signal } = controller;

    async function refreshBoard(previous) {
      setRefreshRequired(true);
      try {
        const latest = await apiRequest('/api/results', { signal });
        signal.throwIfAborted();
        setUpdate({ source, summary: latest });
        if (previous) setConflict({ previous, latest });
        setRefreshRequired(false);
        return true;
      } catch (error) {
        if (!signal.aborted) setFailure({ action: 'refresh', error });
        return false;
      }
    }

    try {
      if (refreshOnly) {
        await refreshBoard(conflict?.previous);
        return;
      }
      const data = await apiRequest(id ? `/api/applications/${encodeURIComponent(id)}/result` : '/api/results/publication', {
        method: id ? 'PUT' : 'POST',
        body: changes ?? { revision },
        signal
      });
      signal.throwIfAborted();
      setConflict(null);
      if (id) {
        setDrafts(current => ({ ...current, [id]: {} }));
        if (await refreshBoard()) setSavedId(id);
      } else {
        setUpdate({ source, summary: data });
      }
    } catch (error) {
      if (signal.aborted) return;
      if (!id && error.code === 'STALE_REVISION') {
        setConflict({ previous: summary, latest: null });
        await refreshBoard(summary);
      } else {
        setFailure({ action, error });
        if (error.code === 'RESULTS_PUBLISHED') await refreshBoard();
      }
    } finally {
      active.current = null;
      if (!controller.signal.aborted) setPending(null);
    }
  }

  return <section className="panel executive-results">
    <h1>Results</h1>
    <p className="muted">{total} interview {total === 1 ? 'case' : 'cases'}</p>
    <section className="result-publication" aria-labelledby="result-publication-title">
      <h2 id="result-publication-title">Campaign publication</h2>
      {publishedAt ? <p className="result-success" ref={publicationStatus} tabIndex={-1} role="status">
        Published <CampaignTime value={publishedAt} />.
      </p> : <>
        <p>Results remain private until you publish them for the entire campaign.</p>
        {items.length > 0 && !allCasesReady && <p className="muted">Save a decision and record how each interview was handled before publishing.</p>}
        {refreshRequired && <p className="muted">Refresh the complete results board before continuing.</p>}
        {hasEdits && <p className="muted">Save your pending changes before publishing.</p>}
        <div className="actions">
          <button className="button primary" type="button" disabled={busy || !canPublish} onClick={() => write()}>
            {pending === 'publish' ? 'Publishing…' : 'Publish campaign results'}
          </button>
          <button className="button" type="button" disabled={busy || (hasEdits && !refreshRequired)} onClick={() => write(null, true)}>
            {pending === 'refresh' ? 'Refreshing…' : 'Refresh cases'}
          </button>
        </div>
      </>}
      {(conflict || publishFailure) && <div ref={publicationError} tabIndex={-1} role="alert">
        {conflict && <p>{publishedAt ? 'Results changed and were published in another tab.'
          : conflict.latest ? 'Results changed in another tab. Review the current results before publishing.'
          : 'Results changed in another tab. Refresh the board before publishing.'}</p>}
        {reviewChanges.length > 0 && <ul>
          {reviewChanges.map(change => <li key={change}>{change}</li>)}
        </ul>}
        {publishFailure && <p>{publishFailure.message}</p>}
        {Object.keys(publishFailure?.fields ?? {}).length > 0 && <ul>
          {Object.entries(publishFailure.fields).map(([field, message]) => {
            const applicationId = /^applications\.([^.]+)\./.exec(field)?.[1];
            return <li key={field}>{applicationId && <strong>{applicationId} · </strong>}{message}</li>;
          })}
        </ul>}
      </div>}
    </section>
    <section aria-labelledby="result-cases-title">
      <h2 id="result-cases-title">Interview cases</h2>
      {items.length ? <ul className="result-cases">{items.map(application => {
        const id = application.applicationId;
        return <ResultCase key={id} application={application} changes={changesFor(application)} published={!!publishedAt}
          busy={busy || refreshRequired} saving={pending === id} failure={failure?.action === id ? failure.error : null} saved={savedId === id}
          onChange={(field, value) => change(application, field, value)} onSave={() => write(application)} />;
      })}</ul> : <EmptyState message="Shortlisted interview cases appear here after the schedule is confirmed." />}
    </section>
  </section>;
}

export function ResultsPage() {
  const resource = useResource('/api/results');
  return <Resource title="Results" resource={resource}>{source =>
    <ResultsWorkspace source={source} />
  }</Resource>;
}
