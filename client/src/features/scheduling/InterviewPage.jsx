import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PageTitle, Resource, useResource } from '../../ui.jsx';
import { AssessmentSection } from './AssessmentSection.jsx';
import { InterviewCv } from './InterviewCv.jsx';
import './scheduling.css';

export function InterviewPage() {
  const { id } = useParams();
  return <InterviewRecord key={id} id={id} />;
}

function InterviewRecord({ id }) {
  const resource = useResource('/api/interviews/' + encodeURIComponent(id));
  const location = useLocation();
  // Appointments only exist after confirmation, so a 404 here usually means "not yet".
  // After sign-in, the shared Resource sends a missing record to the role home instead.
  if (resource.error?.status === 404 && !location.state?.afterSignIn) {
    return <section className="panel scheduling" aria-labelledby="interview-title">
      <PageTitle title="Interview not available" />
      <h1 id="interview-title">Interview not available</h1>
      <p>There is no interview at this address. Interviews are created when the Executive confirms the schedule.</p>
      <Link className="button" to="/interviewer/interviews">My interviews</Link>
    </section>;
  }
  return <Resource title="Interview details" resource={resource}>{interview =>
    <InterviewDetails read={interview} reload={resource.reload} />}
  </Resource>;
}

function InterviewDetails({ read, reload }) {
  // The latest interview the API sent: the page read, then the answer to the assessment.
  const [record, setRecord] = useState(read);
  const [lastRead, setLastRead] = useState(read);
  if (read !== lastRead) {
    setLastRead(read);
    setRecord(read);
  }
  return <section className="panel scheduling" aria-labelledby="interview-title">
    <h1 id="interview-title">Interview details</h1>
    <Link className="button" to="/interviewer/interviews">My interviews</Link>
    <dl className="interview-facts">
      <div><dt>Applicant</dt><dd>{record.applicantName}</dd></div>
      <div><dt>Position</dt><dd>{record.positionName}</dd></div>
      <div><dt>Application</dt><dd>{record.applicationId}</dd></div>
      <div><dt>Date</dt><dd>{record.date}</dd></div>
      <div><dt>Time</dt><dd>{record.start}–{record.end} (UTC+7)</dd></div>
      <div><dt>Room</dt><dd>{record.roomName}</dd></div>
    </dl>
    <InterviewCv applicationId={record.applicationId} />
    <AssessmentSection interview={record} onRecorded={setRecord} onReload={reload} />
  </section>;
}
