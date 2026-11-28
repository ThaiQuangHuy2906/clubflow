import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api.js';
import { ErrorState, LoadingState } from '../../ui.jsx';

// The CV needs the signed-in session, so it is fetched as a blob and shown from a local object URL.
export function InterviewCv({ applicationId }) {
  const [attempt, setAttempt] = useState(0);
  const [cv, setCv] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    let url;
    setCv({});
    apiRequest(`/api/applications/${encodeURIComponent(applicationId)}/cv`, { responseType: 'blob', signal: controller.signal }).then(
      blob => {
        if (controller.signal.aborted) return;
        if (blob.type !== 'application/pdf') {
          setCv({ error: 'The server did not return a PDF CV.' });
          return;
        }
        url = URL.createObjectURL(blob);
        setCv({ url });
      },
      error => { if (!controller.signal.aborted) setCv({ error: error.message }); }
    );
    return () => {
      controller.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [applicationId, attempt]);

  return <section className="interview-cv" aria-labelledby="cv-title">
    <h2 id="cv-title">CV</h2>
    {cv.error ? <ErrorState message={cv.error} onRetry={() => setAttempt(n => n + 1)} />
      : !cv.url ? <LoadingState />
        : <>
          <div className="actions">
            <a className="button" href={cv.url} target="_blank" rel="noopener">Open CV in a new tab</a>
            <a className="button" href={cv.url} download={`cv-${applicationId}.pdf`}>Download CV PDF</a>
          </div>
          <iframe title={'CV of application ' + applicationId} src={cv.url + '#view=FitH&toolbar=0&navpanes=0'} />
        </>}
  </section>;
}
