import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { apiRequest } from '../../api.js';
import { ErrorState, PageTitle, Resource } from '../../ui.jsx';
import { CampaignDetails } from './PublicCampaignPage.jsx';
import { CampaignFields, DepartmentFields } from './CampaignFields.jsx';
import { campaignForm, prepareCampaign, previewIntake } from './campaignForm.js';
import './campaign-editor.css';

function Editor({ snapshot, refreshing, readError, refresh, remember }) {
  const [changes, setChanges] = useState(null);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [failure, setFailure] = useState('');
  const [pending, setPending] = useState('');
  const [preview, setPreview] = useState(false);
  const active = useRef(null);
  const focusTarget = useRef(null);
  const values = changes ?? campaignForm(snapshot.draft);
  const busy = !!pending || refreshing;
  useEffect(() => () => active.current?.abort(), []);
  useLayoutEffect(() => {
    if (!focusTarget.current) return;
    const target = document.getElementById(focusTarget.current);
    if (target && !target.matches(':disabled')) {
      focusTarget.current = null;
      target.focus();
    }
  });

  function edit(next, path, { removed = false, focus } = {}) {
    setChanges(next);
    setErrors(previous => Object.fromEntries(Object.entries(previous).filter(([key]) =>
      key !== path && !(removed && key.startsWith(path + '.')))));
    setFailure('');
    setNotice('');
    if (focus) focusTarget.current = focus;
  }

  async function submit(event) {
    event.preventDefault();
    if (snapshot.locked || busy || active.current) return;
    const form = event.currentTarget;
    const publishing = event.nativeEvent.submitter?.value === 'publish';
    const { body, errors: invalid } = prepareCampaign(values, publishing);
    for (const control of form.elements) {
      if (control.validity?.badInput) invalid[control.name] = 'Complete this field or clear it.';
    }
    setErrors(invalid);
    setNotice('');
    setFailure('');
    if (Object.keys(invalid).length) {
      setFailure('Check the highlighted fields.');
      focusTarget.current = Object.keys(invalid)[0];
      return;
    }
    const controller = new AbortController();
    active.current = controller;
    setPending(publishing ? 'Publishing…' : 'Saving…');
    try {
      const saved = await apiRequest(publishing ? '/api/campaign/publication' : '/api/campaign/draft', {
        method: publishing ? 'POST' : 'PUT', body, signal: controller.signal
      });
      if (controller.signal.aborted) return;
      remember(saved);
      setChanges(null);
      setNotice(publishing ? 'Campaign published.' : 'Draft saved.');
      refresh();
    } catch (error) {
      if (controller.signal.aborted) return;
      setFailure(error.message);
      const fields = error.fields ?? {};
      setErrors(fields);
      focusTarget.current = Object.keys(fields)[0];
      if (error.code === 'LOCKED') {
        remember({ ...snapshot, locked: true });
        refresh();
      }
    } finally {
      if (!controller.signal.aborted) setPending('');
      active.current = null;
    }
  }

  if (preview) {
    const { body } = prepareCampaign(values, false);
    return <div className="campaign-editor">
      <PageTitle title="Campaign preview" />
      <div className="editor-preview-bar"><strong>Campaign preview</strong>
        <button id="back-to-editor" type="button" className="button" onClick={() => {
          setPreview(false);
          focusTarget.current = 'preview-campaign';
        }}>Back to editor</button></div>
      <CampaignDetails campaign={{ ...values, name: body.name || 'Untitled campaign', opensAt: body.opensAt, closesAt: body.closesAt }}
        acceptingApplications={previewIntake(body, snapshot)} />
    </div>;
  }

  return <div className="campaign-editor">
    <PageTitle title="Campaign editor" />
    <header className="editor-header">
      <h1>Campaign editor</h1>
      <div className="editor-summary">
        <div><h2>{snapshot.draft ? snapshot.draft.name || 'Untitled campaign' : 'New campaign'}</h2>
          <p className="muted">{snapshot.locked ? 'Schedule confirmed · Campaign locked' :
            snapshot.published ? 'Published version available' : snapshot.draft ? 'Saved draft · Unpublished' : 'No draft saved yet'}</p></div>
        {snapshot.published && <Link className="button" to="/executive/applications">Applications</Link>}
      </div>
    </header>
    {readError && <ErrorState message={readError.message} onRetry={refresh} />}
    <form aria-label="Campaign configuration" noValidate onSubmit={submit}>
      <fieldset className="editor-inputs" disabled={snapshot.locked || busy}>
        <legend className="editor-sr-only">Campaign configuration</legend>
        <CampaignFields values={values} errors={errors} edit={edit} />
        <DepartmentFields departments={values.departments} errors={errors}
          change={(departments, path, options) => edit({ ...values, departments }, path, options)} />
      </fieldset>
      <div className="panel editor-actions">
        {failure && <p role="alert">{failure}</p>}
        {(pending || notice) && <p role="status">{pending || notice}</p>}
        {snapshot.locked && <p>This campaign is read-only because the interview schedule is confirmed.</p>}
        <div className="actions">
          <button type="submit" value="save" className="button" disabled={snapshot.locked || busy}>Save as Draft</button>
          <button type="button" id="preview-campaign" className="button" disabled={busy} onClick={() => {
            setPreview(true);
            focusTarget.current = 'back-to-editor';
          }}>Preview Campaign</button>
          <button type="submit" value="publish" className="button primary" disabled={snapshot.locked || busy}>Publish Campaign</button>
        </div>
      </div>
    </form>
  </div>;
}

export function CampaignEditorPage() {
  const { campaignDraft } = useOutletContext();
  const [lastWrite, setLastWrite] = useState(null);
  // A successful write already returned the authoritative draft while the shared shell refreshes its controls.
  const status = campaignDraft.error?.status;
  const fallback = lastWrite && (campaignDraft.refreshing || status === 0 || status >= 500);
  const resource = fallback ? { ...campaignDraft, data: lastWrite, error: null } : campaignDraft;
  return <Resource title="Campaign editor" resource={resource}>{snapshot =>
    <Editor snapshot={snapshot} refreshing={campaignDraft.refreshing} readError={fallback ? campaignDraft.error : null}
      refresh={campaignDraft.reload} remember={setLastWrite} />}</Resource>;
}
