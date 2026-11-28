import React, { useEffect, useRef, useState } from 'react';
import { apiRequest } from '../../api.js';
import { CampaignTime } from '../../ui.jsx';
import { Field } from './Field.jsx';
import { useExclusiveRequest } from './useExclusiveRequest.js';

const limit = 2000;
const length = value => [...value.trim()].length;

function validate(feedback) {
  if (!feedback.trim()) return 'Write your assessment.';
  if (length(feedback) > limit) return `Use ${limit.toLocaleString('en-GB')} characters or fewer.`;
  return '';
}

// The interview was changed by someone or something else; reloading shows why the form is closed.
const stateCodes = ['ALREADY_ASSESSED', 'CASE_ABSENT', 'RESULTS_PUBLISHED', 'INTERVIEW_NOT_ENDED'];

export function AssessmentSection({ interview, onRecorded, onReload }) {
  const [feedback, setFeedback] = useState('');
  const [tried, setTried] = useState(false);
  const [serverError, setServerError] = useState('');
  const [failure, setFailure] = useState(null);
  const [recorded, setRecorded] = useState(false);
  const [pending, run] = useExclusiveRequest();
  const input = useRef(null);
  const savedHeading = useRef(null);
  const error = serverError || (tried ? validate(feedback) : '');

  useEffect(() => { if (recorded && interview.assessment) savedHeading.current?.focus(); }, [recorded, interview.assessment]);

  function submit(event) {
    event.preventDefault();
    if (pending) return;
    setTried(true);
    if (validate(feedback)) {
      input.current.focus();
      return;
    }
    run('assess', async signal => {
      setFailure(null);
      setServerError('');
      try {
        const result = await apiRequest(`/api/interviews/${encodeURIComponent(interview.id)}/assessment`, {
          method: 'POST', body: { feedback: feedback.trim() }, signal
        });
        setRecorded(true);
        onRecorded(result);
      } catch (problem) {
        if (signal.aborted) return;
        if (problem.fields?.feedback) setServerError(problem.fields.feedback);
        setFailure({ message: problem.message, reload: stateCodes.includes(problem.code) });
      }
    });
  }

  if (interview.assessment) {
    return <section className="assessment" aria-labelledby="assessment-title">
      <h2 id="assessment-title" ref={savedHeading} tabIndex="-1">Your assessment</h2>
      {recorded && <p role="status" className="schedule-note confirmed-note">Assessment recorded. It cannot be changed.</p>}
      <p className="assessment-text">{interview.assessment.feedback}</p>
      <p className="field-help">Submitted <CampaignTime value={interview.assessment.submittedAt} /></p>
    </section>;
  }

  return <section className="assessment" aria-labelledby="assessment-title">
    <h2 id="assessment-title">Assessment</h2>
    {!interview.canAssess
      ? <p className="schedule-note">The assessment form opens after this interview ends ({interview.date} at {interview.end}, UTC+7).
        It stays closed if the applicant was recorded absent or final results have been published.</p>
      : <form noValidate onSubmit={submit} className="assessment-form">
        <Field id="assessment-feedback" label="Written assessment" error={error}
          help={`One assessment per interview, up to ${limit.toLocaleString('en-GB')} characters. Entered: ${length(feedback)}.`}>
          <textarea ref={input} rows="7" value={feedback} readOnly={!!pending}
            onChange={event => { setFeedback(event.target.value); setServerError(''); }} />
        </Field>
        <button type="submit" className="button primary" disabled={!!pending}>{pending ? 'Submitting…' : 'Submit assessment'}</button>
      </form>}
    {failure && <div className="schedule-failure">
      <p role="alert">{failure.message}</p>
      {failure.reload && <button type="button" className="button" onClick={() => { setFailure(null); onReload(); }}>Reload interview</button>}
    </div>}
  </section>;
}
