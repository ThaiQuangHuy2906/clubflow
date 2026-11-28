import React, { useState } from 'react';
import { apiRequest } from '../../api.js';
import { saveBlob } from './download.js';
import { useExclusiveRequest } from './useExclusiveRequest.js';

export function ExportButton({ unsaved }) {
  const [pending, run] = useExclusiveRequest();
  const [failure, setFailure] = useState(null);

  function download() {
    run('export', async signal => {
      setFailure(null);
      try {
        saveBlob(await apiRequest('/api/schedule/export', { responseType: 'blob', signal }), 'schedule.csv');
      } catch (error) {
        if (!signal.aborted) setFailure(error.message);
      }
    });
  }

  return <div className="schedule-export">
    <p className="field-help" id="export-help">{unsaved
      ? 'Save or discard your changes before exporting: the file contains the saved schedule.'
      : 'The export contains the saved schedule.'}</p>
    <button type="button" className="button" onClick={download} disabled={unsaved || !!pending}
      aria-describedby="export-help">{pending ? 'Exporting…' : 'Export CSV'}</button>
    {failure && <p role="alert">{failure}</p>}
  </div>;
}
