import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';

export { PublicCampaignPage } from './PublicCampaignPage.jsx';
export { CampaignEditorPage } from './CampaignEditorPage.jsx';

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
