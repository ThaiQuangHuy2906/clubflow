// Display helpers for the C8 schedule view. All data comes from GET /api/schedule and GET /api/campaign/setup.

const slotPattern = /^(\d{4}-\d{2}-\d{2})_(\d{2})(\d{2})_(\d{2})(\d{2})$/;

export function slotLabel(slotId) {
  const match = slotPattern.exec(slotId ?? '');
  return match ? `${match[2]}:${match[3]}–${match[4]}:${match[5]}` : slotId ?? '';
}

export function nameOf(list, id) {
  return list?.find(item => item.id === id)?.name ?? id;
}

const minutes = value => {
  const [h, m] = value.split(':').map(Number);
  return h * 60 + m;
};

// Same grid as the setup contract: start at the setup start, step by the duration, drop a trailing partial slot.
export function windowFitsSlot(settings, durationMinutes, start, end) {
  const from = minutes(start), to = minutes(end);
  for (let s = minutes(settings.start); s + durationMinutes <= minutes(settings.end); s += durationMinutes) {
    if (s >= from && s + durationMinutes <= to) return true;
  }
  return false;
}

export function describeIssue(issue, row, view, catalog) {
  const others = issue.applicationIds.filter(id => id !== row.applicationId).join(', ');
  const interviewer = nameOf(catalog.interviewers, issue.resourceId);
  const room = nameOf(catalog.rooms, issue.resourceId);
  switch (issue.code) {
    case 'NO_ASSIGNMENT': return 'No interview slot is assigned yet.';
    case 'NO_QUALIFIED_INTERVIEWER': return `No interviewer is qualified for ${nameOf(catalog.positions, issue.resourceId)}.`;
    case 'NO_SHARED_TIME': return 'No slot in the window suits both the applicant and a qualified interviewer.';
    case 'NO_ROOM': return 'No room is selected in interview setup.';
    case 'NO_FREE_COMBINATION': return 'Every suitable slot, interviewer and room is already taken.';
    case 'INVALID_SLOT': return `Slot ${slotLabel(issue.resourceId)} is outside the window or no longer exists.`;
    case 'APPLICANT_UNAVAILABLE': return 'The applicant did not select this time.';
    case 'INTERVIEWER_UNAVAILABLE': return `${interviewer} is not available at this time.`;
    case 'UNQUALIFIED': return `${interviewer} is not qualified for this position.`;
    case 'ROOM_UNAVAILABLE': return `${room} is no longer selected in interview setup.`;
    case 'APPLICANT_OVERLAP': {
      const applicant = view.rows.find(r => r.applicantId === issue.resourceId)?.applicantName ?? issue.resourceId;
      return `Overlaps ${others}: same applicant (${applicant}).`;
    }
    case 'INTERVIEWER_OVERLAP': return `Overlaps ${others}: same interviewer (${interviewer}).`;
    case 'ROOM_OVERLAP': return `Overlaps ${others}: same room (${room}).`;
    default: return issue.code;
  }
}
