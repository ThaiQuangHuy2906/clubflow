import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { EmptyState, FeaturePage, Resource, useResource } from '../../ui.jsx';

export { SchedulePage } from './SchedulePage.jsx';

export function MyInterviewsPage() {
  const interviews = useResource('/api/interviews');
  return <Resource title="My interviews" resource={interviews}>{({ items, confirmed }) =>
    <FeaturePage title="My interviews">{items.length ? <ul className="record-list">{items.map(i =>
      <li key={i.id}><Link to={'/interviewer/interviews/' + encodeURIComponent(i.id)}>{i.applicantName} · {i.start} · {i.id}</Link></li>)}</ul>
      : <EmptyState message={confirmed ? 'No interviews are assigned to you.' : 'Your assignments will appear after schedule confirmation.'} />}
    </FeaturePage>}</Resource>;
}

export function InterviewPage() {
  const { id } = useParams();
  const interview = useResource('/api/interviews/' + encodeURIComponent(id));
  return <Resource title="Interview details" resource={interview}>{i =>
    <FeaturePage title="Interview details" note="Assessment submission will be added with the scheduling feature.">
      <h2>{i.applicantName}</h2><p>{i.positionName} · {i.date} · {i.start}–{i.end} (UTC+7) · {i.roomName}</p>
      <Link className="button" to="/interviewer/interviews">My interviews</Link>
    </FeaturePage>}</Resource>;
}
