import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';

export { ApplyPage } from './ApplyPage.jsx';

export function MyApplicationsPage() {
  const applications = useResource('/api/applications');
  return <Resource title="My applications" resource={applications}>{({ items }) =>
    <FeaturePage title="My applications">{items.length ? <ul className="record-list">{items.map(a =>
      <li key={a.id}><Link to={'/me/applications/' + encodeURIComponent(a.id)}>{a.positionName} · {a.id}</Link></li>)}</ul>
      : <EmptyState message="You have no applications yet." />}</FeaturePage>}</Resource>;
}

export function MyApplicationPage() {
  const { id } = useParams();
  const application = useResource('/api/applications/' + encodeURIComponent(id));
  return <Resource title="Application details" resource={application}>{a =>
    <FeaturePage title={a.positionName + ' application'} note="Full application tracking will be added with the applications feature.">
      <p>{a.id} · {a.status === 'Rejected' ? 'Rejected at CV screening' : a.status}</p>
      {a.applicantReason && <p>{a.applicantReason}</p>}
      <Link className="button" to="/me/applications">My applications</Link>
    </FeaturePage>}</Resource>;
}

export function ReviewPage() {
  const applications = useResource('/api/applications');
  return <Resource title="Application review" resource={applications}>{({ total }) =>
    <FeaturePage title="Application review" note="Screening and exports will be added with the applications feature.">
      {total ? <p>{total} applications received.</p> : <EmptyState message="No applications have been submitted." />}
    </FeaturePage>}</Resource>;
}

export function ResultsPage() {
  const results = useResource('/api/results');
  return <Resource title="Results" resource={results}>{({ items }) =>
    <FeaturePage title="Results" note="Decisions and publication will be added with the applications feature.">
      {items.length ? <p>{items.length} interview cases.</p> : <EmptyState message="No interview cases are available for final decisions. Shortlisted cases appear here after schedule confirmation." />}
    </FeaturePage>}</Resource>;
}
