import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth.jsx';
import { EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';
import { formatCampaignDeadline } from './campaignDeadline.js';
import './public-campaign.css';

function IntakeTime({ value }) {
  if (!value) return 'Not set';
  const { text, dateTime } = formatCampaignDeadline(value);
  return dateTime ? <time dateTime={dateTime}>{text}</time> : <data value={value}>{text}</data>;
}

function positionNameKey(name) {
  return name.normalize().trim().replace(/\s+/g, ' ').toLowerCase();
}

function CampaignPositions({ departments, canApply }) {
  const positions = departments.flatMap(department => department.positions);
  const nameCounts = new Map();
  for (const { name } of positions) {
    const key = positionNameKey(name);
    nameCounts.set(key, (nameCounts.get(key) ?? 0) + 1);
  }
  return <section className="panel position-panel">
    <h2>Positions ({positions.length})</h2>
    {departments.length === 0 && <EmptyState message="No positions are listed for this campaign." />}
    {departments.map(department => <section className="department" key={department.id}>
      <h3>{department.name || 'Unnamed department'}</h3>
      {department.positions.length === 0
        ? <EmptyState message="No positions are listed for this department." />
        : <ul className="position-list">
          {department.positions.map(position => <li className="position-row" key={position.id}>
            <div>
              <h4>{position.name || 'Unnamed position'}</h4>
              <p className="campaign-copy">{position.description}</p>
              <dl className="position-details">
                <div><dt>Quota</dt><dd>{position.quota || 'Not set'}</dd></div>
                <div><dt>Requirements</dt><dd className="campaign-copy">{position.requirements}</dd></div>
              </dl>
            </div>
            {canApply && <Link className="button" to={'/apply/' + encodeURIComponent(position.id)}
              aria-label={nameCounts.get(positionNameKey(position.name)) > 1
                ? `Apply for ${position.name}, ${department.name} (${position.id})`
                : 'Apply for ' + position.name}>Apply</Link>}
          </li>)}
        </ul>}
    </section>)}
  </section>;
}

export function PublicCampaignPage() {
  const resource = useResource('/api/campaign');
  const { user } = useAuth();
  const title = resource.data?.campaign?.name ?? 'Recruitment campaign';
  return <Resource title={title} resource={resource}>{({ campaign, acceptingApplications }) => {
    if (!campaign) return <FeaturePage title={title}>
      <EmptyState message="No campaign has been published yet. Check back here for recruitment dates and positions." />
    </FeaturePage>;

    return <CampaignDetails campaign={campaign} acceptingApplications={acceptingApplications}
      canApply={acceptingApplications && (!user || user.role === 'Applicant')} />;
  }}</Resource>;
}

export function CampaignDetails({ campaign, acceptingApplications, canApply = false }) {
  return <div className="public-campaign">
    <header className="campaign-heading">
      <p className="overline">{campaign.hostClub}</p>
      <h1>{campaign.name}</h1>
      <p className="intro campaign-copy">{campaign.description}</p>
    </header>
    <div className="campaign-columns">
      <aside className="panel intake" aria-labelledby="intake-heading">
        <h2 id="intake-heading">Application window</h2>
        {typeof acceptingApplications === 'boolean' && <p className={'status' + (acceptingApplications ? ' open' : '')}>
          {acceptingApplications ? 'Open for applications' : 'Intake closed'}
        </p>}
        <dl>
          <dt>Opens</dt><dd><IntakeTime value={campaign.opensAt} /></dd>
          <dt>Closes</dt><dd><IntakeTime value={campaign.closesAt} /></dd>
        </dl>
        <h3>How to apply</h3>
        <p className="muted campaign-copy">{campaign.instructions}</p>
      </aside>
      <CampaignPositions departments={campaign.departments} canApply={canApply} />
    </div>
  </div>;
}
