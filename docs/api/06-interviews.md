# Assigned interviews and assessments · C10

## GET /api/interviews

Interviewer, no parameters or body. Return `{items,total,confirmed,serverTime}` for the caller only, sorted by date, start then ID. Before C9 there are no interviews (see the [seed read](README.md#reproducing-the-two-stories)). Each row contains `id,applicationId,applicantName,positionId,positionName,date,start,end,roomId,roomName,interviewerId,canAssess,assessment`. After confirmation, authorization follows the assigned interviewer ID for that application, including on direct detail and CV URLs. `canAssess` becomes true when server time reaches that interview's end and no assessment exists, the case is not marked Absent, and final results are unpublished. `assessment` is null until the caller submits, then contains `feedback,submittedAt`. Use `applicationId` for the authenticated [CV download](04-applications.md). Private screening notes, unassigned CVs, Executive decisions and other assessments are outside this projection.

```http
GET /api/interviews
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "id": "IV-A01",
      "applicationId": "A01",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "date": "2026-11-24",
      "start": "09:00",
      "end": "09:20",
      "roomId": "R-A",
      "roomName": "Room A",
      "interviewerId": "I01",
      "canAssess": false,
      "assessment": null
    }
  ],
  "total": 1,
  "confirmed": true,
  "serverTime": "2026-11-21T00:00:00+07:00"
}
```

## GET /api/interviews/:id

Interviewer assigned to the specified interview ID, no query/body. Return the same single row as the list. 404 NOT_FOUND for an unknown ID or before the appointment is created. 403 FORBIDDEN for another interviewer's appointment. Neither response discloses applicant details.

```http
GET /api/interviews/IV-A01
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "IV-A01",
  "applicationId": "A01",
  "applicantName": "Student A",
  "positionId": "content",
  "positionName": "Content",
  "date": "2026-11-24",
  "start": "09:00",
  "end": "09:20",
  "roomId": "R-A",
  "roomName": "Room A",
  "interviewerId": "I01",
  "canAssess": false,
  "assessment": null
}
```

```http
GET /api/interviews/IV-A02
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Access denied.","fields":{}}}
```

```http
GET /api/applications/A01/cv
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="cv.pdf"
```

```http
GET /api/applications/A02/cv
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Access denied.","fields":{}}}
```

The Executive cannot record a final decision before this interview ends. After the end, an assessment is optional.

```http
PUT /api/applications/A01/result
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"decision":"Pass"}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "RESULT_NOT_READY",
    "message": "Wait until the confirmed interview ends.",
    "fields": {}
  }
}
```

## POST /api/interviews/:id/assessment

Assigned Interviewer, no query. For one completed confirmed interview send `{feedback}`, a nonblank written assessment up to 2,000 characters. Written feedback satisfies C10. A score or a Pass/Fail recommendation is optional in the product-owner ruling; this contract uses the text-only form. Only the Executive decides the final outcome. The response is the updated interview.

400 VALIDATION for missing, blank, overlong, or additional fields. 403 FORBIDDEN for a different assignee, 404 NOT_FOUND before C9 or for unknown ID. 409 INTERVIEW_NOT_ENDED before the individual end instant, 409 ALREADY_ASSESSED after a successful submission. For an unassessed interview, return 409 CASE_ABSENT if marked absent or 409 RESULTS_PUBLISHED if the campaign's final results have been released. A successful assessment records an attended, handled case for the Executive. Concurrent submissions can create only one assessment. The author and time come from the session and server clock. A success returns 201 and `canAssess:false`. Executive C11 subsequently reads this assessment through `/results`.

```http
POST /api/interviews/IV-A01/assessment
Authorization: Bearer {{token:int-content}}
Content-Type: application/json

{"feedback":"Clear writing and relevant examples."}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"INTERVIEW_NOT_ENDED","message":"The interview has not ended.","fields":{}}}
```

```http
POST /api/demo/steps
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"action":"pastInterviews"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"action":"pastInterviews","serverTime":"2026-11-24T12:01:00+07:00","canBegin":false}
```

```http
POST /api/interviews/IV-A01/assessment
Authorization: Bearer {{token:int-content}}
Content-Type: application/json

{"feedback":"Clear writing and relevant examples."}
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "IV-A01",
  "applicationId": "A01",
  "applicantName": "Student A",
  "positionId": "content",
  "positionName": "Content",
  "date": "2026-11-24",
  "start": "09:00",
  "end": "09:20",
  "roomId": "R-A",
  "roomName": "Room A",
  "interviewerId": "I01",
  "canAssess": false,
  "assessment": {
    "feedback": "Clear writing and relevant examples.",
    "submittedAt": "2026-11-24T12:01:00+07:00"
  }
}
```

```http
POST /api/interviews/IV-A01/assessment
Authorization: Bearer {{token:int-content}}
Content-Type: application/json

{"feedback":"Clear writing and relevant examples."}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"ALREADY_ASSESSED","message":"An assessment already exists.","fields":{}}}
```

A02 deliberately remains without feedback. Its assigned Interviewer can see the ended interview, and the Executive will handle the case in C11.

```http
GET /api/interviews/IV-A02
Authorization: Bearer {{token:int-comms}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "IV-A02",
  "applicationId": "A02",
  "applicantName": "Student A",
  "positionId": "comms",
  "positionName": "Communications",
  "date": "2026-11-24",
  "start": "09:20",
  "end": "09:40",
  "roomId": "R-A",
  "roomName": "Room A",
  "interviewerId": "I02",
  "canAssess": true,
  "assessment": null
}
```

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Confirmed the written-only assessment and exercised a second ended interview with missing feedback.
