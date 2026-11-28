import React from 'react';
import { Link } from 'react-router-dom';
import { CampaignTime, EmptyState, Resource, useResource } from '../../ui.jsx';
import './scheduling.css';

export const interviewPath = id => '/interviewer/interviews/' + encodeURIComponent(id);

export function assessmentState(interview) {
  if (interview.assessment) return { label: 'Assessment recorded', tone: 'confirmed' };
  if (interview.canAssess) return { label: 'Ready for assessment', tone: 'proposed' };
  return { label: 'Assessment not open', tone: 'unassigned' };
}

export function MyInterviewsPage() {
  const interviews = useResource('/api/interviews');
  return <Resource title="My interviews" resource={interviews}>{({ items, total, confirmed, serverTime }) =>
    <section className="panel scheduling" aria-labelledby="interviews-title">
      <h1 id="interviews-title">My interviews</h1>
      <p>Assigned interviews: <strong>{total}</strong></p>
      {serverTime && <p className="field-help">Server time <CampaignTime value={serverTime} /></p>}
      {items.length === 0
        ? <EmptyState message={confirmed ? 'No interviews are assigned to you.'
          : 'Your assignments will appear after the Executive confirms the schedule.'} />
        : <ul className="interview-list">{items.map(interview => {
          const state = assessmentState(interview);
          return <li key={interview.id}>
            <h2>{interview.applicantName} · {interview.positionName}</h2>
            <dl className="interview-facts">
              <div><dt>Application</dt><dd>{interview.applicationId}</dd></div>
              <div><dt>Date</dt><dd>{interview.date}</dd></div>
              <div><dt>Time</dt><dd>{interview.start}–{interview.end} (UTC+7)</dd></div>
              <div><dt>Room</dt><dd>{interview.roomName}</dd></div>
            </dl>
            <p><span className={'badge badge-' + state.tone}>{state.label}</span></p>
            <Link className="button" to={interviewPath(interview.id)}>
              Open interview<span className="visually-hidden"> {interview.id}</span>
            </Link>
          </li>;
        })}</ul>}
    </section>}
  </Resource>;
}
