import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CampaignTime, EmptyState, ErrorState, LoadingState, Resource, useResource } from '../../ui.jsx';
import './my-applications.css';

function InterviewSlot({ interview }) {
  const { date, start, end, roomName } = interview;
  return <>
    <time dateTime={date}>{date}</time> · <span className="application-time-range">
      <time dateTime={start}>{start}</time>–<time dateTime={end}>{end}</time>
    </span> (UTC+7)
    <span className="application-room">{roomName}</span>
  </>;
}

function ApplicationProgress({ application, showPending = false }) {
  const { status, applicantReason, interview, result } = application;
  const rejected = status === 'Rejected';
  const showUnreleased = showPending && !rejected;
  return <dl className="application-progress">
    <div>
      <dt>Screening status</dt>
      <dd>
        <span className="status" data-screening={status}>{rejected ? 'Rejected at CV screening' : status}</span>
        {rejected && applicantReason && <p className="application-reason">{applicantReason}</p>}
      </dd>
    </div>
    {(interview || showUnreleased) && <div>
      <dt>Interview</dt>
      <dd>{interview ? <InterviewSlot interview={interview} /> : 'Awaiting schedule confirmation.'}</dd>
    </div>}
    {(result || showUnreleased) && <div>
      <dt>Final result</dt>
      <dd>{result ? <strong data-result={result}>{result}</strong> : 'Awaiting final results publication.'}</dd>
    </div>}
  </dl>;
}

function ApplicationNotifications({ applications }) {
  const { data, error, reload } = useResource('/api/notifications');
  const positions = new Map(applications.map(application => [application.id, application.positionName]));
  return <section className="application-notifications" aria-labelledby="application-notifications-title">
    <h2 id="application-notifications-title">Notifications</h2>
    {error && <ErrorState message={error.message} onRetry={reload} />}
    {!error && !data && <LoadingState />}
    {data && (data.items.length ? <ul className="record-list">
      {data.items.map(notice => <li key={notice.id}>
        <Link to={'/me/applications/' + encodeURIComponent(notice.applicationId)}>
          Final result for {positions.get(notice.applicationId) ?? notice.applicationId} · {notice.result}
        </Link>
        <p className="muted"><CampaignTime value={notice.createdAt} /></p>
      </li>)}
    </ul> : <EmptyState message="You have no notifications yet." />)}
  </section>;
}

export function MyApplicationsPage() {
  const applications = useResource('/api/applications');
  return <Resource title="My applications" resource={applications}>{({ items, total }) =>
    <section className="panel my-applications">
      <h1>My applications</h1>
      <p className="muted">{total} {total === 1 ? 'application' : 'applications'}</p>
      {items.length ? <ul className="record-list application-records">
        {items.map(application => <li key={application.id}>
          <h2>
            <Link to={'/me/applications/' + encodeURIComponent(application.id)}>
              {application.positionName} · {application.id}
            </Link>
          </h2>
          <ApplicationProgress application={application} />
        </li>)}
      </ul> : <EmptyState message="You have no applications yet." />}
      <ApplicationNotifications applications={items} />
    </section>}
  </Resource>;
}

export function MyApplicationPage() {
  const { id } = useParams();
  const resource = useResource('/api/applications/' + encodeURIComponent(id));
  const title = resource.data ? resource.data.positionName + ' application' : 'Application details';
  return <Resource title={title} resource={resource}>{application =>
    <section className="panel my-applications">
      <header>
        <h1>{title}</h1>
        <p className="muted">Application {application.id}</p>
      </header>
      <ApplicationProgress application={application} showPending />
      <section className="application-submission">
        <h2>Submitted information</h2>
        <dl className="application-snapshot">
          <div><dt>Submitted on</dt><dd><CampaignTime value={application.submittedAt} /></dd></div>
          <div><dt>Full name</dt><dd>{application.studentName}</dd></div>
          <div><dt>Student number</dt><dd>{application.studentNumber}</dd></div>
          <div><dt>Faculty</dt><dd>{application.faculty}</dd></div>
          <div><dt>Email address</dt><dd>{application.email}</dd></div>
          <div><dt>Phone number</dt><dd>{application.phone}</dd></div>
          <div><dt>CV file</dt><dd>{application.cvFileName}</dd></div>
          <div className="application-motivation"><dt>Motivation</dt><dd>{application.motivation}</dd></div>
        </dl>
      </section>
      <Link className="button" to="/me/applications">Back to my applications</Link>
    </section>}
  </Resource>;
}
