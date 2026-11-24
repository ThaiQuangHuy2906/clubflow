import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';

export { PublicCampaignPage } from './PublicCampaignPage.jsx';

export function CampaignEditorPage() {
  const { campaignDraft } = useOutletContext();
  return <Resource title="Campaign editor" resource={campaignDraft}>{({ draft, published, locked }) =>
    <FeaturePage title="Campaign editor" note="The campaign editing form will be added with the campaign feature.">
      {draft ? <><h2>{draft.name || 'Untitled campaign'}</h2><p>{locked ? 'Campaign locked' : published ? 'Campaign published' : 'Draft campaign'}</p></>
        : <EmptyState message="Create a campaign draft to begin recruitment." />}
    </FeaturePage>}</Resource>;
}

export function InterviewSetupPage() {
  const setup = useResource('/api/campaign/setup');
  const { campaignDraft } = useOutletContext();
  return <Resource title="Interview setup" resource={setup}>{({ settings }) =>
    <FeaturePage title="Interview setup" note="Configuration editing will be added with the campaign feature.">
      {settings ? <p>Interview date <strong>{settings.date}</strong> · {settings.start}–{settings.end} (UTC+7)</p>
        : <EmptyState message={campaignDraft.data?.draft === null
          ? 'Save a campaign before configuring interview availability.'
          : 'Interview availability has not been configured yet.'} />}
    </FeaturePage>}</Resource>;
}
