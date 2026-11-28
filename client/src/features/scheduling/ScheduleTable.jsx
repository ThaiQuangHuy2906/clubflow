import React from 'react';
import { Link } from 'react-router-dom';
import { describeIssue, nameOf, slotLabel } from './scheduleText.js';

const actionLabels = { Conflict: 'Resolve', Unassigned: '+ Assign Slot' };

export const rowActionId = applicationId => 'row-action-' + applicationId;

export function Counts({ counts }) {
  const items = [['Total', counts.total], ['Proposed', counts.proposed], ['Conflict', counts.conflict],
    ['Unassigned', counts.unassigned], ['Confirmed', counts.confirmed]];
  return <dl className="schedule-counts">{items.map(([label, value]) =>
    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>;
}

export function ScheduleTable({ view, catalog, editable, busy, editingId, labelledBy, onEdit }) {
  if (view.rows.length === 0) {
    return <p className="state muted">No applications are shortlisted yet, so there is nothing to schedule.{' '}
      <Link to="/executive/applications">Open application review</Link> to shortlist candidates.</p>;
  }
  return <div className="table-scroll" role="region" aria-labelledby={labelledBy} tabIndex="0">
    <table className="schedule-table">
      <thead><tr><th scope="col">Application</th><th scope="col">Applicant and position</th>
        <th scope="col">Time</th><th scope="col">Interviewer</th><th scope="col">Room</th>
        <th scope="col">Status and reason</th></tr></thead>
      <tbody>{view.rows.map(row => <tr key={row.applicationId} className={editingId === row.applicationId ? 'editing' : undefined}>
        <th scope="row">
          <span className="row-id">{row.applicationId}</span>
          <button type="button" className="button row-action" id={rowActionId(row.applicationId)}
            disabled={!editable || busy} onClick={() => onEdit(row.applicationId)}>
            {actionLabels[row.status] ?? 'Edit'}<span className="visually-hidden"> {row.applicationId}</span>
          </button>
        </th>
        <td>{row.applicantName}<span className="cell-detail">{row.positionName}</span></td>
        <td className="nowrap">{row.slotId ? slotLabel(row.slotId) : '—'}</td>
        <td>{row.interviewerId ? nameOf(catalog.interviewers, row.interviewerId) : '—'}</td>
        <td className="nowrap">{row.roomId ? nameOf(catalog.rooms, row.roomId) : '—'}</td>
        <td className="status-cell"><span className={'badge badge-' + row.status.toLowerCase()}>{row.status}</span>
          {row.issues.length > 0 && <ul className="issue-list">{row.issues.map(issue =>
            <li key={issue.code + issue.resourceId + issue.applicationIds.join()}>{describeIssue(issue, row, view, catalog)}</li>)}</ul>}</td>
      </tr>)}</tbody>
    </table>
  </div>;
}
