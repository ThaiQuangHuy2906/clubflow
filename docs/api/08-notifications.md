# Applicant notifications · C11

## GET /api/notifications

Applicant, no parameters or body. Return `{items,total}` scoped to the caller before counting. Order by `createdAt` descending then ID ascending. An owner with no announcements receives `{"items":[],"total":0}`. Each result notice has a unique string `id` (`N-` plus the application ID for these fixtures), `applicationId`, `positionId`, `kind` (`resultPublished`), `result` (Pass or Fail), and `createdAt` equal to the first publication time. Link to the owner's application detail using its ID. A saved but unpublished decision is private. One campaign release produces one notice per eligible application, including two distinct notices when the student applied to two positions. The timestamp is shared. Retrying the release adds none. Screened-out and withdrawn applications receive no final-result notice. A separate screening-rejection notification remains an open question. Wrong roles get 403. The Applicant cannot request another owner's ID via a query (400 VALIDATION).

```http
GET /api/notifications
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "items": [
    {
      "id": "N-A01",
      "applicationId": "A01",
      "positionId": "content",
      "kind": "resultPublished",
      "result": "Pass",
      "createdAt": "2026-11-24T12:01:00+07:00"
    },
    {
      "id": "N-A02",
      "applicationId": "A02",
      "positionId": "comms",
      "kind": "resultPublished",
      "result": "Fail",
      "createdAt": "2026-11-24T12:01:00+07:00"
    }
  ],
  "total": 2
}
```

Student B owns no applications in the creation run. Releasing A01 and A02 for Student A leaves Student B's inbox empty and direct access to A02 forbidden.

```http
GET /api/notifications
Authorization: Bearer {{token:studentB}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[],"total":0}
```

```http
GET /api/applications/A02
Authorization: Bearer {{token:studentB}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Access denied.","fields":{}}}
```

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Aligned notification ownership, timestamps and retry counts with campaign-wide release.
