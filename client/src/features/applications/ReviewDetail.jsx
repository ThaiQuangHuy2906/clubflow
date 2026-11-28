import React, { useEffect, useRef, useState } from 'react';
import { apiRequest } from '../../api.js';
import { CampaignTime, ErrorState, LoadingState } from '../../ui.jsx';
import { trimReviewText, useReviewResource } from './review-data.js';

function ReviewCv({ path, application }) {
  const cv = useReviewResource(path + '/cv', 'blob');
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (cv.data?.type !== 'application/pdf') return;
    const url = URL.createObjectURL(cv.data);
    setPreview({ source: cv.data, url });
    return () => URL.revokeObjectURL(url);
  }, [cv.data]);

  let content = <LoadingState />;
  if (cv.error) {
    content = <ErrorState message={cv.error.message} onRetry={cv.reload} />;
  } else if (cv.data && cv.data.type !== 'application/pdf') {
    content = <ErrorState message="The server did not return a PDF CV." onRetry={cv.reload} />;
  } else if (preview && preview.source === cv.data) {
    content = <>
      <a className="button" href={preview.url} download={application.cvFileName || 'cv.pdf'}>Download CV PDF</a>
      <iframe title={'CV preview for ' + application.id} src={preview.url + '#view=FitH&toolbar=0'} />
    </>;
  }
  return <section className="review-cv" aria-label="CV">
    <h3>CV</h3>
    {content}
  </section>;
}

function reviewDraft(application) {
  return {
    status: application.status,
    privateNote: application.privateNote ?? '',
    applicantReason: application.applicantReason ?? ''
  };
}

function ScreeningForm({ application, path, locked, onWritingChange, onSaved }) {
  const [saved, setSaved] = useState(application);
  const [draft, setDraft] = useState(() => reviewDraft(application));
  const [pending, setPending] = useState('');
  const [failure, setFailure] = useState(null);
  const [conflict, setConflict] = useState(null);
  const [success, setSuccess] = useState('');
  const [serverLocked, setServerLocked] = useState(false);
  const form = useRef(null);
  const alert = useRef(null);
  const conflictAlert = useRef(null);
  const active = useRef(null);
  const fields = failure?.fields ?? {};
  const refreshRequired = conflict?.latest === null;
  const readOnly = locked || saved.locked || serverLocked || refreshRequired;

  const changes = {};
  const note = trimReviewText(draft.privateNote);
  const reason = draft.status === 'Rejected' ? trimReviewText(draft.applicantReason) || null : null;
  if (draft.status !== saved.status) changes.status = draft.status;
  if (note !== (saved.privateNote ?? '')) changes.privateNote = note;
  if (reason !== (saved.applicantReason ?? null)) changes.applicantReason = reason;
  const changed = Object.keys(changes).length > 0;
  const publication = saved.publishedScreening;
  const publishedCurrent = publication?.status === saved.status && publication.applicantReason === saved.applicantReason;
  const canPublish = !refreshRequired && saved.status !== 'Submitted' && !publishedCurrent;

  useEffect(() => () => active.current?.abort(), []);
  useEffect(() => {
    if (pending) return;
    if (failure) {
      const invalid = form.current.querySelector('[aria-invalid="true"]:not(:disabled)');
      (invalid ?? alert.current)?.focus();
    } else if (conflict) {
      conflictAlert.current?.focus();
    }
  }, [conflict, failure, pending]);

  function draftField(name) {
    return {
      id: 'review-' + name,
      value: draft[name],
      onChange: event => {
        const value = event.target.value;
        setDraft(current => ({ ...current, [name]: value }));
        setSuccess('');
      },
      'aria-invalid': fields[name] ? true : undefined,
      'aria-describedby': fields[name] ? 'review-' + name + '-error' : undefined
    };
  }

  function fieldError(name) {
    return fields[name] && <p className="field-error" id={'review-' + name + '-error'}>{fields[name]}</p>;
  }

  async function write(action) {
    const saving = action === 'save';
    const refreshing = action === 'refresh';
    if (active.current || (refreshing ? !refreshRequired : saving ? readOnly || !changed : !canPublish)) return;
    setSuccess('');
    setFailure(null);
    if (saving) {
      const invalid = {};
      if ([...note].length > 2000) invalid.privateNote = 'Enter at most 2,000 characters.';
      if (reason && [...reason].length > 2000) invalid.applicantReason = 'Enter at most 2,000 characters.';
      if (Object.keys(invalid).length) {
        setFailure({ message: 'Check the highlighted fields.', fields: invalid });
        return;
      }
    }

    const controller = new AbortController();
    active.current = controller;
    onWritingChange(true);
    setPending(action);
    const { signal } = controller;

    async function refreshScreening(previous) {
      setConflict({ previous, latest: null });
      try {
        const latest = await apiRequest(path, { signal });
        signal.throwIfAborted();
        const nextDraft = reviewDraft(latest);
        for (const field of Object.keys(changes)) nextDraft[field] = draft[field];
        setSaved(latest);
        setDraft(nextDraft);
        setConflict({ previous, latest });
        onSaved();
      } catch (error) {
        if (!signal.aborted) setFailure({ message: error.message });
      }
    }

    try {
      if (refreshing) {
        await refreshScreening(conflict.previous);
        return;
      }
      const replacement = await apiRequest(path + (saving ? '/screening' : '/screening/publication'), {
        method: saving ? 'PATCH' : 'POST',
        body: saving ? changes : { revision: saved.revision },
        signal
      });
      signal.throwIfAborted();
      setSaved(replacement);
      if (saving || !changed) setDraft(reviewDraft(replacement));
      if (saving) onSaved();
      setConflict(null);
      setSuccess(saving ? 'Screening saved.' : 'Screening published to this applicant.');
    } catch (error) {
      if (signal.aborted) return;
      if (!saving && error.code === 'STALE_REVISION') await refreshScreening(saved);
      else {
        if (error.code === 'LOCKED') setServerLocked(true);
        setFailure({ message: error.message, fields: error.fields });
      }
    } finally {
      active.current = null;
      if (!controller.signal.aborted) {
        setPending('');
        onWritingChange(false);
      }
    }
  }

  return <section className="review-screening" aria-labelledby="review-screening-title">
    <h3 id="review-screening-title">Screening</h3>
    <dl className="review-screening-summary">
      <div><dt>Saved status</dt><dd>{saved.status}</dd></div>
      <div><dt>Published status</dt><dd>{publication?.status ?? 'Pending publication'}</dd></div>
      {saved.applicantReason && <div><dt>Saved applicant reason</dt><dd>{saved.applicantReason}</dd></div>}
      {publication?.applicantReason && <div><dt>Published applicant reason</dt><dd>{publication.applicantReason}</dd></div>}
    </dl>
    {(locked || saved.locked || serverLocked) && <p className="muted">The confirmed schedule locks screening edits.</p>}
    <form ref={form} noValidate onSubmit={event => { event.preventDefault(); write('save'); }}>
      <fieldset disabled={readOnly || !!pending}>
        <legend>Edit screening</legend>
        <div className="review-field">
          <label htmlFor="review-status">Decision</label>
          <select {...draftField('status')}>
            {saved.status === 'Submitted' && <option>Submitted</option>}
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>
          {fieldError('status')}
        </div>
        <div className="review-field">
          <label htmlFor="review-privateNote">Private Executive note</label>
          <textarea {...draftField('privateNote')} rows={4}
            aria-describedby={['review-note-hint', fields.privateNote && 'review-privateNote-error'].filter(Boolean).join(' ')} />
          <p className="muted" id="review-note-hint">Visible to Executives only. Up to 2,000 characters.</p>
          {fieldError('privateNote')}
        </div>
        {draft.status === 'Rejected' && <div className="review-field">
          <label htmlFor="review-applicantReason">Reason for the applicant (optional)</label>
          <textarea {...draftField('applicantReason')} rows={3}
            aria-describedby={['review-reason-hint', fields.applicantReason && 'review-applicantReason-error'].filter(Boolean).join(' ')} />
          <p className="muted" id="review-reason-hint">Visible to the applicant after publication. Up to 2,000 characters.</p>
          {fieldError('applicantReason')}
        </div>}
        <button type="submit" className="button primary" disabled={!changed}>
          {pending === 'save' ? 'Saving…' : 'Save screening'}
        </button>
      </fieldset>
    </form>
    <div className="review-publication">
      <p className="muted">Publication sends the saved decision and applicant reason to this applicant.</p>
      <button type="button" className="button" disabled={!!pending || !canPublish} onClick={() => write('publish')}>
        {pending === 'publish' ? 'Publishing…' : 'Publish saved screening'}
      </button>
    </div>
    {conflict && <div ref={conflictAlert} tabIndex={-1} role="alert">
      {conflict.latest ? <>
        <p>Screening changed in another tab. Review the current decision and reason before publishing.</p>
        <ul>
          <li>Status: {conflict.previous.status} → {conflict.latest.status}</li>
          <li>Applicant reason: {conflict.previous.applicantReason ?? 'None'} → {conflict.latest.applicantReason ?? 'None'}</li>
        </ul>
      </> : <>
        <p>Screening changed in another tab. Reload the current screening before publishing.</p>
        <button type="button" className="button" disabled={!!pending} onClick={() => write('refresh')}>
          {pending ? 'Reloading…' : 'Reload screening'}
        </button>
      </>}
    </div>}
    {failure && <p ref={alert} tabIndex={-1} role="alert">{failure.message}</p>}
    {success && <p className="review-success" role="status">{success}</p>}
  </section>;
}

export function ReviewDetail({ id, locked, writing, onWritingChange, onSaved, onClose }) {
  const path = '/api/applications/' + encodeURIComponent(id);
  const detail = useReviewResource(path);
  const heading = useRef(null);
  useEffect(() => heading.current?.focus(), []);

  return <aside className="panel review-detail" id="selected-application" aria-labelledby="review-detail-title">
    <header className="review-detail-header">
      <h2 id="review-detail-title" tabIndex={-1} ref={heading}>Application {id}</h2>
      <button type="button" className="button" onClick={onClose} disabled={writing}>Close details</button>
    </header>
    {detail.error && <ErrorState message={detail.error.message} onRetry={detail.reload} />}
    {!detail.error && !detail.data && <LoadingState />}
    {detail.data && <>
      <dl className="review-screening-summary">
        <div><dt>Applicant</dt><dd>{detail.data.studentName} · {detail.data.studentNumber}</dd></div>
        <div><dt>Position</dt><dd>{detail.data.positionName}</dd></div>
        <div><dt>Submitted</dt><dd><CampaignTime value={detail.data.submittedAt} /></dd></div>
      </dl>
      <section className="review-motivation">
        <h3>Motivation</h3>
        <p>{detail.data.motivation}</p>
      </section>
      <ReviewCv path={path} application={detail.data} />
      <ScreeningForm application={detail.data} path={path} locked={locked}
        onWritingChange={onWritingChange} onSaved={onSaved} />
    </>}
  </aside>;
}
