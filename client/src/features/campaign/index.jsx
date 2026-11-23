import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { useAuth } from '../../auth.jsx';
import { CampaignTime, EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';

export function PublicCampaignPage() {
  const campaign = useResource('/api/campaign');
  const { user } = useAuth();
  return <Resource title="Recruitment campaign" resource={campaign}>{({ campaign: record, acceptingApplications }) => {
    if (!record) return <FeaturePage title="Recruitment campaign"><EmptyState message="No campaign has been published yet." /></FeaturePage>;
    return <div className="public-campaign">
      <header className="campaign-heading">
        <p className="overline">{record.hostClub}</p>
        <h1>{record.name}</h1>
        <p className="intro">{record.description}</p>
      </header>
      <div className="campaign-columns">
        <section className="panel position-panel"><h2>Positions</h2>
          {record.departments.length === 0 && <EmptyState message="No positions are listed." />}
          {record.departments.map(dept => <section className="department" key={dept.id}>
            <h3>{dept.name}</h3>
            {dept.positions.map(pos => <div className="position-row" key={pos.id}>
              <div><strong>{pos.name}</strong><p className="muted">{pos.description}</p></div>
              {acceptingApplications && (!user || user.role === 'Applicant') &&
                <Link className="button" aria-label={'Apply for ' + pos.name} to={'/apply/' + encodeURIComponent(pos.id)}>Apply</Link>}
            </div>)}
          </section>)}
        </section>
        <aside className="panel intake"><h2>Application window</h2>
          <p className={'status ' + (acceptingApplications ? 'open' : '')}>{acceptingApplications ? 'Open for applications' : 'Intake closed'}</p>
          <dl><dt>Opens</dt><dd><CampaignTime value={record.opensAt} /></dd><dt>Closes</dt><dd><CampaignTime value={record.closesAt} /></dd></dl>
          <p className="muted">{record.instructions}</p>
        </aside>
      </div>
    </div>;
  }}</Resource>;
}

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
