import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { describeIssue } from './scheduleText.js';

// Turns the field keys of a refused confirmation into readable blockers. The server decides what blocks.
function blockerText(key, message, record, catalog) {
  const [kind, id] = key.split('.');
  if (kind === 'deadline') return { label: 'Application window', text: message };
  if (kind === 'applications') return { label: id + ' screening', text: message };
  const row = kind === 'assignments' && record.rows.find(r => r.applicationId === id);
  if (!row || !row.issues.length) return { label: id ?? key, text: message };
  return { label: id + ' assignment', text: row.issues.map(issue => describeIssue(issue, row, record, catalog)).join(' ') };
}

function Summary({ record }) {
  const { counts, window: draft } = record;
  const attention = record.rows.filter(row => row.status !== 'Proposed');
  return <>
    <dl className="confirm-summary">
      <div><dt>Saved draft</dt><dd>Revision {record.revision}</dd></div>
      <div><dt>Interview window</dt><dd>{draft.date} · {draft.start}–{draft.end} (UTC+7)</dd></div>
      <div><dt>Shortlisted applications</dt><dd>{counts.total}</dd></div>
      <div><dt>Proposed</dt><dd>{counts.proposed}</dd></div>
      <div><dt>Conflict</dt><dd>{counts.conflict}</dd></div>
      <div><dt>Unassigned</dt><dd>{counts.unassigned}</dd></div>
    </dl>
    {attention.length > 0 && <p>Needs attention: {attention.map(row => `${row.applicationId} (${row.status})`).join(', ')}.</p>}
    <p className="field-help">Confirmation succeeds only when applications are closed, every application has been screened,
      every shortlisted application has a qualified and available assignment, and no applicant, interviewer or room overlaps.
      It then locks the campaign, the screening decisions and this schedule. It does not publish any result.</p>
  </>;
}

export function ConfirmPanel({ record, catalog, locked, pendingChanges, busy, confirming, run, onConfirmed, onRefused }) {
  const [reviewing, setReviewing] = useState(false);
  const [refusal, setRefusal] = useState(null);
  const summaryHeading = useRef(null);
  const refusalBox = useRef(null);
  const openButton = useRef(null);
  // `pendingChanges` explains any edit that is not in the saved draft. The server only sees the saved draft.
  const ready = !locked && !pendingChanges && record.state === 'Draft' && record.rows.length > 0;

  useEffect(() => { if (reviewing) summaryHeading.current?.focus(); }, [reviewing]);
  useEffect(() => { if (refusal) refusalBox.current?.focus(); }, [refusal?.id]);

  const reason = locked ? 'The schedule is already confirmed.'
    : pendingChanges ? pendingChanges
      : record.rows.length === 0 ? 'Shortlist at least one application first.'
        : record.state !== 'Draft' ? 'Generate a draft and save it first.'
          : 'Review the summary before confirming.';

  function confirm() {
    if (!ready) return;
    run('confirm', async signal => {
      setRefusal(null);
      try {
        const result = await apiRequest('/api/schedule/confirmation', {
          method: 'POST', body: { revision: record.revision }, signal
        });
        setReviewing(false);
        onConfirmed(result);
      } catch (error) {
        if (signal.aborted) return;
        setRefusal({ id: Date.now(), message: error.message, fields: Object.entries(error.fields ?? {}) });
        onRefused(error);
      }
    });
  }

  const blockers = refusal?.fields.map(([key, message]) => ({ key, ...blockerText(key, message, record, catalog) }));

  return <section className="schedule-confirm" aria-labelledby="confirm-title">
    <h2 id="confirm-title" tabIndex="-1">Confirmation</h2>
    {locked
      ? <p><span className="badge badge-confirmed">Confirmed</span> Interviewers and applicants can now see their appointments.</p>
      : null}
    <p id="confirm-help" className="field-help">{reason}</p>
    <div className="actions">
      <button ref={openButton} type="button" className="button primary" aria-describedby="confirm-help"
        aria-expanded={reviewing && ready} disabled={!ready || busy}
        onClick={() => { setRefusal(null); setReviewing(true); }}>Approve &amp; Confirm Schedule</button>
    </div>
    {reviewing && ready && <div className="confirm-box">
      <h3 ref={summaryHeading} tabIndex="-1">Summary before confirmation</h3>
      <Summary record={record} />
      <div className="actions">
        <button type="button" className="button primary" disabled={busy} onClick={confirm}>
          {confirming ? 'Confirming…' : 'Confirm schedule'}
        </button>
        <button type="button" className="button" disabled={busy}
          onClick={() => { setReviewing(false); setRefusal(null); openButton.current.focus(); }}>Cancel</button>
      </div>
    </div>}
    {refusal && <div ref={refusalBox} tabIndex="-1" className="confirm-refusal" role="alert">
      <p><strong>{refusal.message}</strong></p>
      {blockers.length > 0 && <ul className="issue-list">{blockers.map(b =>
        <li key={b.key}><strong>{b.label}:</strong> {b.text}</li>)}</ul>}
      {blockers.some(b => b.key.startsWith('applications.')) &&
        <p><Link to="/executive/applications">Open application review</Link> to finish screening.</p>}
    </div>}
  </section>;
}
