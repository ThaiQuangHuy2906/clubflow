# Final decisions and campaign publication · C11

## GET /api/results

Executive, no parameters or body. Return `{items,total,revision,publishedAt}`. The campaign publication timestamp is null until release. Before C9 return an empty list. After C9 return one row per shortlisted application, ordered by application ID, including future, missing-assessment and absent cases. Screened-out and withdrawn applications are outside the final-decision set. This contract adds no withdrawal action.

Each row has `applicationId,positionId,positionName,applicantName,interviewId,caseStatus,assessment,decision`. Assessment is the assigned interviewer's actual `{feedback,submittedAt}` or null. Decision is null, Pass or Fail. Interpret the case independently of the decision:

| caseStatus | Executive view |
|---|---|
| Scheduled | The confirmed interview has yet to end. |
| NeedsReview | The interview has ended, no assessment exists and the Executive has not recorded how the case was handled. Flag it for review. |
| Attended | A written assessment exists, or the Executive confirmed attendance and handled the case without feedback. Show “Assessment missing” when assessment is null. |
| Absent | The Executive confirmed absence and handled the case. Show absence explicitly; the assessment stays null. |

On the creation run, A01 has an assessment and A02 needs review.

```http
GET /api/results
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "applicationId": "A01",
      "positionId": "content",
      "positionName": "Content",
      "applicantName": "Student A",
      "interviewId": "IV-A01",
      "caseStatus": "Attended",
      "assessment": {
        "feedback": "Clear writing and relevant examples.",
        "submittedAt": "2026-11-24T12:01:00+07:00"
      },
      "decision": null
    },
    {
      "applicationId": "A02",
      "positionId": "comms",
      "positionName": "Communications",
      "applicantName": "Student A",
      "interviewId": "IV-A02",
      "caseStatus": "NeedsReview",
      "assessment": null,
      "decision": null
    }
  ],
  "total": 2,
  "revision": 3,
  "publishedAt": null
}
```

## PUT /api/applications/:id/result

Executive. Application ID in path, no query. Send a JSON object with at least one of `decision` (Pass or Fail) and `caseStatus` (Attended or Absent). Omitted fields retain their values. A decision alone never acknowledges an unhandled interview. Sending a case status is the Executive's explicit confirmation that they processed the case. It never creates or edits interviewer feedback. Both fields may be saved together or separately. Validate and apply atomically, returning the updated row. Corrections are possible until campaign publication. Save even when assessment is null. The owner sees no final decision or notification yet.

Return 400 VALIDATION for unknown/empty/invalid fields, 404 NOT_FOUND for an unknown application, 409 RESULT_NOT_READY if the application lacks a confirmed ended eligible interview (including rejected or withdrawn records), 409 CASE_CONFLICT for Absent with an existing assessment, or 409 RESULTS_PUBLISHED after release. Check eligibility, time, assessment and publication state on the server.

```http
PUT /api/applications/A01/result
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"decision":"Pass"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "applicationId": "A01",
  "positionId": "content",
  "positionName": "Content",
  "applicantName": "Student A",
  "interviewId": "IV-A01",
  "caseStatus": "Attended",
  "assessment": {
    "feedback": "Clear writing and relevant examples.",
    "submittedAt": "2026-11-24T12:01:00+07:00"
  },
  "decision": "Pass"
}
```

## POST /api/results/publication

Executive, no path/query parameters. Send the required JSON field `revision` from the reviewed GET summary. It is a nonnegative safe integer starting at zero for the campaign. It advances once per change to the set of cases or their displayed status, assessment, handling or decision. Unchanged saves and publication preserve it. After a row PUT, re-read the complete summary and present it with its revision before release. Never attach a freshly read revision to older displayed rows. Missing, malformed and extra fields return 400 VALIDATION. Compare the revision atomically with release, including retries. A mismatch returns 409 STALE_REVISION without changing the publication timestamp or notifications. Re-read the summary and require explicit review before resubmitting. This action covers the whole active campaign. An application ID or subset in the body returns 400 VALIDATION. Return 409 NO_FINAL_RESULTS if there are no shortlisted applications. Otherwise verify the current campaign has a confirmed schedule, every shortlisted application has a final decision and every required interview has ended and is handled (Attended or Absent). A missing assessment alone is allowed. No final Pass/Fail is required for a rejected or withdrawn application. On failure return 409 PUBLICATION_BLOCKED. Put campaign-level blockers under `schedule` and record-specific blockers under `applications.<id>.decision` and `applications.<id>.caseStatus`. Return all outstanding blockers. No decision becomes visible and no notice is emitted on failure.

On success atomically freeze decisions/case handling, set one server publication time, make each decision visible only to its owner on that application, and create one in-app notice per released application. Serialize release against review/assessment writes, competing publishes and retries. A retry returns the original published summary with the same timestamp and notices. Success returns the full GET summary.

A02 first lacks both a decision and a handled case. Saving its Fail decision without feedback is valid, but publication still awaits explicit case handling.

Read the full board after the change. The publication request below uses the revision returned by this read.

```http
GET /api/results
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "applicationId": "A01",
      "positionId": "content",
      "positionName": "Content",
      "applicantName": "Student A",
      "interviewId": "IV-A01",
      "caseStatus": "Attended",
      "assessment": {
        "feedback": "Clear writing and relevant examples.",
        "submittedAt": "2026-11-24T12:01:00+07:00"
      },
      "decision": "Pass"
    },
    {
      "applicationId": "A02",
      "positionId": "comms",
      "positionName": "Communications",
      "applicantName": "Student A",
      "interviewId": "IV-A02",
      "caseStatus": "NeedsReview",
      "assessment": null,
      "decision": null
    }
  ],
  "total": 2,
  "revision": 4,
  "publishedAt": null
}
```

```http
POST /api/results/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":4}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "PUBLICATION_BLOCKED",
    "message": "Resolve the outstanding campaign results.",
    "fields": {
      "applications.A02.decision": "Record a final decision.",
      "applications.A02.caseStatus": "Confirm how this interview was handled."
    }
  }
}
```

```http
PUT /api/applications/A02/result
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"decision":"Fail"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "applicationId": "A02",
  "positionId": "comms",
  "positionName": "Communications",
  "applicantName": "Student A",
  "interviewId": "IV-A02",
  "caseStatus": "NeedsReview",
  "assessment": null,
  "decision": "Fail"
}
```

Read the full board after the change. The publication request below uses the revision returned by this read.

```http
GET /api/results
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "applicationId": "A01",
      "positionId": "content",
      "positionName": "Content",
      "applicantName": "Student A",
      "interviewId": "IV-A01",
      "caseStatus": "Attended",
      "assessment": {
        "feedback": "Clear writing and relevant examples.",
        "submittedAt": "2026-11-24T12:01:00+07:00"
      },
      "decision": "Pass"
    },
    {
      "applicationId": "A02",
      "positionId": "comms",
      "positionName": "Communications",
      "applicantName": "Student A",
      "interviewId": "IV-A02",
      "caseStatus": "NeedsReview",
      "assessment": null,
      "decision": "Fail"
    }
  ],
  "total": 2,
  "revision": 5,
  "publishedAt": null
}
```

```http
POST /api/results/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":5}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "PUBLICATION_BLOCKED",
    "message": "Resolve the outstanding campaign results.",
    "fields": {"applications.A02.caseStatus":"Confirm how this interview was handled."}
  }
}
```

```http
GET /api/applications
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "id": "A01",
      "campaignId": "CF-2026-01",
      "positionId": "content",
      "positionName": "Content",
      "submittedAt": "2026-11-16T08:00:00+07:00",
      "status": "Shortlisted",
      "interview": {
        "id": "IV-A01",
        "date": "2026-11-24",
        "start": "09:00",
        "end": "09:20",
        "roomId": "R-A",
        "roomName": "Room A"
      },
      "result": null,
      "applicantReason": null
    },
    {
      "id": "A02",
      "campaignId": "CF-2026-01",
      "positionId": "comms",
      "positionName": "Communications",
      "submittedAt": "2026-11-16T08:00:00+07:00",
      "status": "Shortlisted",
      "interview": {
        "id": "IV-A02",
        "date": "2026-11-24",
        "start": "09:20",
        "end": "09:40",
        "roomId": "R-A",
        "roomName": "Room A"
      },
      "result": null,
      "applicantReason": null
    }
  ],
  "total": 2
}
```

```http
GET /api/notifications
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[],"total":0}
```

Confirm A02 was absent. Its Fail decision remains in place, with no assessment. Release both decisions and retry the same campaign action.

```http
PUT /api/applications/A02/result
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"caseStatus":"Absent"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "applicationId": "A02",
  "positionId": "comms",
  "positionName": "Communications",
  "applicantName": "Student A",
  "interviewId": "IV-A02",
  "caseStatus": "Absent",
  "assessment": null,
  "decision": "Fail"
}
```

A second tab still holds the previous revision. Its publication attempt preserves the owner-visible state.

```http
POST /api/results/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":5}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"STALE_REVISION","message":"Reload and review the current decisions before publishing.","fields":{}}}
```

After reviewing the current values, the Executive publishes the matching revision.

Read the full board after the change. The publication request below uses the revision returned by this read.

```http
GET /api/results
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "applicationId": "A01",
      "positionId": "content",
      "positionName": "Content",
      "applicantName": "Student A",
      "interviewId": "IV-A01",
      "caseStatus": "Attended",
      "assessment": {
        "feedback": "Clear writing and relevant examples.",
        "submittedAt": "2026-11-24T12:01:00+07:00"
      },
      "decision": "Pass"
    },
    {
      "applicationId": "A02",
      "positionId": "comms",
      "positionName": "Communications",
      "applicantName": "Student A",
      "interviewId": "IV-A02",
      "caseStatus": "Absent",
      "assessment": null,
      "decision": "Fail"
    }
  ],
  "total": 2,
  "revision": 6,
  "publishedAt": null
}
```

```http
POST /api/results/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":6}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "applicationId": "A01",
      "positionId": "content",
      "positionName": "Content",
      "applicantName": "Student A",
      "interviewId": "IV-A01",
      "caseStatus": "Attended",
      "assessment": {
        "feedback": "Clear writing and relevant examples.",
        "submittedAt": "2026-11-24T12:01:00+07:00"
      },
      "decision": "Pass"
    },
    {
      "applicationId": "A02",
      "positionId": "comms",
      "positionName": "Communications",
      "applicantName": "Student A",
      "interviewId": "IV-A02",
      "caseStatus": "Absent",
      "assessment": null,
      "decision": "Fail"
    }
  ],
  "total": 2,
  "revision": 6,
  "publishedAt": "2026-11-24T12:01:00+07:00"
}
```

```http
POST /api/results/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":6}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "applicationId": "A01",
      "positionId": "content",
      "positionName": "Content",
      "applicantName": "Student A",
      "interviewId": "IV-A01",
      "caseStatus": "Attended",
      "assessment": {
        "feedback": "Clear writing and relevant examples.",
        "submittedAt": "2026-11-24T12:01:00+07:00"
      },
      "decision": "Pass"
    },
    {
      "applicationId": "A02",
      "positionId": "comms",
      "positionName": "Communications",
      "applicantName": "Student A",
      "interviewId": "IV-A02",
      "caseStatus": "Absent",
      "assessment": null,
      "decision": "Fail"
    }
  ],
  "total": 2,
  "revision": 6,
  "publishedAt": "2026-11-24T12:01:00+07:00"
}
```

```http
GET /api/applications
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "id": "A01",
      "campaignId": "CF-2026-01",
      "positionId": "content",
      "positionName": "Content",
      "submittedAt": "2026-11-16T08:00:00+07:00",
      "status": "Shortlisted",
      "interview": {
        "id": "IV-A01",
        "date": "2026-11-24",
        "start": "09:00",
        "end": "09:20",
        "roomId": "R-A",
        "roomName": "Room A"
      },
      "result": "Pass",
      "applicantReason": null
    },
    {
      "id": "A02",
      "campaignId": "CF-2026-01",
      "positionId": "comms",
      "positionName": "Communications",
      "submittedAt": "2026-11-16T08:00:00+07:00",
      "status": "Shortlisted",
      "interview": {
        "id": "IV-A02",
        "date": "2026-11-24",
        "start": "09:20",
        "end": "09:40",
        "roomId": "R-A",
        "roomName": "Room A"
      },
      "result": "Fail",
      "applicantReason": null
    }
  ],
  "total": 2
}
```

```http
GET /api/applications/A02
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "A02",
  "campaignId": "CF-2026-01",
  "positionId": "comms",
  "positionName": "Communications",
  "submittedAt": "2026-11-16T08:00:00+07:00",
  "status": "Shortlisted",
  "interview": {
    "id": "IV-A02",
    "date": "2026-11-24",
    "start": "09:20",
    "end": "09:40",
    "roomId": "R-A",
    "roomName": "Room A"
  },
  "result": "Fail",
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000099",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf"
}
```

### Independent acceptance on the direct seed

Reject and release A03 at screening and shortlist A01/A02. After C9, leave an ended, attended case without feedback. Mark it Attended as Executive and save its decision. With the other case handled but its decision still null, verify the release identifies the missing decision only. Complete the second decision and publish. A03 requires no final decision and receives no final-result notice. If withdrawn records are present, apply the same exclusion. Check an unrelated Applicant cannot read these decisions or notices. Repeat with simultaneous publication requests and a retry. Each owner's visibility and all notice counts must reflect a single completed release.

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Replaced per-application release with an atomic campaign release and separated the decision, actual assessment and explicit interview-case handling.

2026-11-25 — Added campaign-wide publication revision checks. Retrying the successfully published revision returns the original summary.

2026-11-25 — Added the complete Executive reads used to review revisions 4, 5 and 6 before attempting publication.
