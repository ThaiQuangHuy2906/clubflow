import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { Denied, EmptyState, FeaturePage, LoadingState, Resource, useResource } from '../../ui.jsx';
import { SetupFields } from './InterviewSetupFields.jsx';
import { interviewForm, prepareInterviewSetup, setupFieldErrors } from './interviewSetupForm.js';
import './campaign-editor.css';
import './interview-setup.css';

const setupPath = '/api/campaign/setup';
const title = 'Interview setup';

function SetupEditor({ initial, draftClose, refreshCampaign }) {
  const [snapshot, setSnapshot] = useState(initial);
  const [form, setForm] = useState(() => interviewForm(initial.settings));
  const [errors, setErrors] = useState({});
  const [failure, setFailure] = useState('');
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState('');
  const [availabilityConflict, setAvailabilityConflict] = useState(false);
  const [denied, setDenied] = useState(false);
  const active = useRef(null);
  const focusTarget = useRef(null);
  useEffect(() => () => active.current?.abort(), []);
  useLayoutEffect(() => {
    if (!focusTarget.current || pending) return;
    const target = document.getElementById(focusTarget.current) ?? document.getElementById('setup-feedback');
    focusTarget.current = null;
    target?.focus();
  });

  function edit(next, path, removedPrefix, focus) {
    setForm(next);
    setErrors(previous => Object.fromEntries(Object.entries(previous).filter(([key]) =>
      key !== path && !(removedPrefix && key.startsWith(removedPrefix)))));
    setNotice('');
    if (!availabilityConflict) setFailure('');
    focusTarget.current = focus;
  }

  async function update(reloadFrozen = false) {
    if (snapshot.locked || active.current || (!reloadFrozen && availabilityConflict)) return;
    let body;
    if (!reloadFrozen) {
      const prepared = prepareInterviewSetup(form, snapshot.catalog, draftClose);
      if (Object.keys(prepared.errors).length) {
        setNotice('');
        setErrors(prepared.errors);
        setFailure('Check the highlighted fields.');
        focusTarget.current = Object.keys(prepared.errors)[0];
        return;
      }
      body = prepared.body;
    }

    const controller = new AbortController();
    active.current = controller;
    setFailure('');
    setNotice('');
    setErrors({});
    setPending(reloadFrozen ? 'Loading saved windows…' : 'Saving interview setup…');
    try {
      const saved = await apiRequest(setupPath, { method: reloadFrozen ? 'GET' : 'PUT', body, signal: controller.signal });
      if (controller.signal.aborted) return;
      const next = interviewForm(saved.settings);
      setSnapshot(saved);
      if (reloadFrozen && !saved.locked) {
        const { date, start, end, availabilityWindows } = next;
        setForm(current => ({ ...current, date, start, end, availabilityWindows }));
        setNotice('Saved dates and applicant windows loaded. Review and save your remaining changes.');
      } else {
        setForm(next);
        setNotice(reloadFrozen ? 'Confirmed interview setup loaded.' : 'Interview setup saved.');
      }
      setAvailabilityConflict(false);
      focusTarget.current = 'setup-feedback';
      if (!reloadFrozen) refreshCampaign();
    } catch (error) {
      if (controller.signal.aborted) return;
      if (error.status === 403) setDenied(true);
      if (error.code === 'LOCKED') setSnapshot(current => ({ ...current, locked: true }));
      if (error.code === 'AVAILABILITY_LOCKED') setAvailabilityConflict(true);
      const mapped = setupFieldErrors(error.fields ?? {}, form);
      setErrors(mapped);
      setFailure(error.message);
      focusTarget.current = Object.keys(mapped)[0] ?? 'setup-feedback';
    } finally {
      if (!controller.signal.aborted) setPending('');
      if (active.current === controller) active.current = null;
    }
  }

  if (denied) return <Denied />;
  const { settings, catalog, locked, availabilityLocked, slots, availabilityWindows } = snapshot;
  return <div className="campaign-editor interview-setup">
    <header className="editor-header">
      <h1>Interview setup</h1>
      {settings ? <div className="editor-summary">
        <p>{slots.length} saved interview slots · {availabilityWindows.length} offered windows</p>
        <Link className="button" to="/executive/schedule">Interview schedule</Link>
      </div> : <EmptyState message="Interview availability has not been configured yet." />}
      {locked ? <p className="setup-lock">The schedule is confirmed. Interview setup is read-only.</p>
        : availabilityLocked && <p className="setup-lock">The date, day bounds and applicant windows are locked because applications have been submitted.</p>}
    </header>
    <form aria-label="Interview configuration" noValidate onSubmit={event => { event.preventDefault(); update(); }}>
      <fieldset className="editor-inputs" disabled={!!pending || locked}>
        <legend className="editor-sr-only">Interview configuration</legend>
        <SetupFields form={form} catalog={catalog} availabilityLocked={availabilityLocked || availabilityConflict}
          errors={errors} edit={edit} />
      </fieldset>
      <div className="panel editor-actions" id="setup-feedback" tabIndex={-1}>
        {failure && <p role="alert">{failure}</p>}
        {(pending || notice) && <p role="status">{pending || notice}</p>}
        <div className="actions">
          <button className="button primary" type="submit" disabled={!!pending || locked || availabilityConflict}>Save interview setup</button>
          {availabilityConflict && !locked && <button className="button" type="button" disabled={!!pending} onClick={() => update(true)}>
            Load saved dates and applicant windows
          </button>}
        </div>
      </div>
    </form>
  </div>;
}

export function InterviewSetupPage() {
  const setup = useResource(setupPath);
  const { campaignDraft } = useOutletContext();
  return <Resource title={title} resource={setup}>{initial => {
    if (!initial.settings && campaignDraft.data === undefined && campaignDraft.refreshing) {
      return <FeaturePage title={title}><LoadingState /></FeaturePage>;
    }
    if (!initial.settings && campaignDraft.data?.draft === null) return <FeaturePage title={title}>
      <EmptyState message="Save a campaign before configuring interview availability." />
      <Link className="button" to="/executive/campaign">Campaign editor</Link>
    </FeaturePage>;
    return <SetupEditor initial={initial} refreshCampaign={campaignDraft.reload}
      draftClose={campaignDraft.data?.published ? undefined : campaignDraft.data?.draft?.closesAt} />;
  }}</Resource>;
}
