# Scheduling and confirmation · C8–C9

## GET /api/schedule

Executive, no parameters or body. Returns the saved view evaluated against current applications and setup. `state` is None, Draft or Confirmed. None has no persisted draft. `window` is the saved date/start/end, otherwise the configured window or null if setup is missing. `revision` starts at 0, increases by one on each successful schedule PUT and once on successful confirmation. Reads, previews, clock changes and refused writes leave it unchanged.

There is one row per currently shortlisted application, ordered by application ID. Each row contains its application, applicant and position IDs, display names, the applicant's `availableSlotIds` on the interview grid that are fully covered by that applicant's selected availability windows, the three selected IDs (nullable), a status and `issues`. Before generation, rows are Unassigned with NO_ASSIGNMENT. The five integer counts describe these rows, with total equal to the sum of Proposed, Conflict, Unassigned and Confirmed. C8 obtains selectable people, rooms and slot labels from [setup](03-setup.md).

Each issue contains `code`, `resourceId` (string or null) and the affected `applicationIds` in ascending order. Individual eligibility failures yield Unassigned. For a pair of individually valid assignments whose half-open intervals overlap, attach the same issue to **both** rows for each shared applicant, interviewer or room. Adjacent slots are disjoint. Valid non-overlapping choices are Proposed. Confirmed rows retain their choices and have status Confirmed.

| Issue code | Resource and meaning |
|---|---|
| NO_ASSIGNMENT | null. No choices supplied. |
| NO_QUALIFIED_INTERVIEWER | Position ID. No configured interviewer can serve that position. |
| NO_SHARED_TIME | Application ID. No slot in the window is fully available to applicant and a qualified interviewer. |
| NO_ROOM | null. No room is selected in setup. |
| NO_FREE_COMBINATION | Application ID. Eligible combinations exist but all have an occupied resource. |
| INVALID_SLOT / APPLICANT_UNAVAILABLE / INTERVIEWER_UNAVAILABLE | Slot / applicant / interviewer ID respectively. Slot is obsolete or outside the window, or its interval is unavailable. |
| UNQUALIFIED / ROOM_UNAVAILABLE | Interviewer / room ID. The chosen interviewer is ineligible or the room is no longer selected. |
| APPLICANT_OVERLAP / INTERVIEWER_OVERLAP / ROOM_OVERLAP | ID of the shared person or room. Both conflicting application IDs are present. |

## POST /api/schedule/draft

Executive, no parameters. Both actions are **previews**. Neither action writes the schedule. Return the same full view with `state: "Preview"` and the current saved revision. The Executive chooses a generation window within the current setup. Durations always come from C4. Each candidate slot must fit wholly inside the requested window.

| Required body field | Meaning |
|---|---|
| action | `generate` or `preview`. |
| window | Object with required `date,start,end` in the [setup formats](03-setup.md). Use the configured date, start before end and include at least one full club slot. |
| revision | Nonnegative integer matching the schedule revision. |
| assignments | Required for preview, absent for generate. One row per currently shortlisted ID, no extras or duplicates. Each row has `applicationId,slotId,interviewerId,roomId` only. IDs are strings; the last three must be either all null or all filled. |

Generation starts empty. Process shortlisted applications by submittedAt ascending (instants), then application ID ascending for equal instants. In that order, select the first free eligible combination by slot start, interviewer ID, then room ID (ascending). Reserve it for subsequent rows. If none fits, leave all three IDs null and return the first applicable generation issue in the order NO_QUALIFIED_INTERVIEWER, NO_SHARED_TIME, NO_ROOM, NO_FREE_COMBINATION. Preview re-evaluates the **entire** submitted set after Edit, Resolve or + Assign Slot. It retains well-formed but now ineligible choices for correction and reports the reason on that row. Known overlaps identify each affected pair and shared resource. Sending all-null choices clears a row. On preview, save and subsequent reads, evaluate a null triple against the other selected rows. Report the specific generation reason if no combination is possible, or NO_ASSIGNMENT when a valid choice is available.

400 VALIDATION for malformed IDs, partial triples, invalid window, or incorrect row membership (errors on `assignments.<applicationId>` or its field). A syntactically valid but unavailable or obsolete resource choice yields an Unassigned row. 409 SETUP_REQUIRED if setup is missing, 409 NO_SHORTLIST if no application is eligible, 409 STALE_REVISION if another write won, and 409 LOCKED after C9. Regeneration and editing stop at confirmation. These state and structural checks also apply to PUT.

```http
POST /api/schedule/draft
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "action": "generate",
  "revision": 0,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"}
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Preview",
  "revision": 0,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    }
  ],
  "counts": {"total":2,"proposed":2,"unassigned":0,"conflict":0,"confirmed":0}
}
```

## PUT /api/schedule

Executive, no parameters. Save Changes sends `{revision,window,assignments}`, with the same types as preview. The server rechecks the **current** shortlist, setup, both parties' availability, room selections, window and all overlaps. Persist the choices and window atomically, even when the draft has Conflict or Unassigned rows. Return the newly evaluated Draft with its next revision. Never accept client-supplied statuses, counts, reasons or lock flags. On failure the previous saved draft survives. GET includes newly shortlisted rows as Unassigned and omits rows that have since been rejected. A later setup change may invalidate a saved assignment even at the same schedule revision.

In the first saved draft the Executive assigns A02 to its Communications interviewer. Both have valid, non-overlapping assignments.

```http
PUT /api/schedule
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "revision": 0,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "assignments": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A"
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A"
    }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Draft",
  "revision": 1,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    }
  ],
  "counts": {"total":2,"proposed":2,"unassigned":0,"conflict":0,"confirmed":0}
}
```

```http
GET /api/schedule
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Draft",
  "revision": 1,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    }
  ],
  "counts": {"total":2,"proposed":2,"unassigned":0,"conflict":0,"confirmed":0}
}
```

## POST /api/schedule/confirmation

Executive, no parameters. The only body field is required `revision` (nonnegative integer for the saved draft being confirmed). Only submit after Save Changes, with no local edits outstanding. The server can confirm only persisted assignments. Reject malformed input (400 VALIDATION), a stale revision (409 STALE_REVISION), missing draft (409 DRAFT_REQUIRED), or an already-confirmed schedule (409 LOCKED).

Atomically re-read the campaign clock, all application statuses, saved rows and current C4 constraints. Test **all four** gates: (1) time at or after closesAt, (2) no Submitted applications, (3) exactly one individually eligible, fully available assignment for every shortlisted ID, (4) no shared applicant, interviewer or room overlaps. Any failure returns 409 CONFIRMATION_BLOCKED with `fields` identifying each reason. Use `deadline`, `applications.<id>.status` and `assignments.<id>`; combine multiple reasons for one key in a single message. List both row IDs and the shared resource in overlap errors. Refusal preserves the draft and keeps personal interview reads closed.

Success increments the revision, returns the Confirmed view and atomically creates one interview `IV-<applicationId>` per row. Campaign configuration, application writes including screening, and draft generation/edit/save are now locked. Applicant and assigned Interviewer schedule reads open immediately. Releasing a saved screening snapshot, assessment and final-result operations remain separate. Confirmation sends no final decisions or notifications.

**Open window only.** Both applications are reviewed and the saved draft is valid.

```http
POST /api/schedule/confirmation
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":1}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "CONFIRMATION_BLOCKED",
    "message": "The schedule cannot be confirmed.",
    "fields": {"deadline":"Applications are still open."}
  }
}
```

```http
POST /api/demo/steps
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"action":"pastClose"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"action":"pastClose","serverTime":"2026-11-21T00:00:00+07:00","canBegin":false}
```

A form opened earlier may still submit. The deadline check applies to the unused Events position, leaving both previous applications intact.

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=events -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F availabilityWindowIds=W-2026-11-24_0940_1000 \
  -F "cv=@{{file:cv.pdf:200KB}};type=application/pdf"
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"APPLICATIONS_CLOSED","message":"Applications are closed.","fields":{}}}
```

**Unassigned only.** Save a cleared row, then confirm the saved revision.

```http
PUT /api/schedule
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "revision": 1,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "assignments": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A"
    },
    {"applicationId":"A02","slotId":null,"interviewerId":null,"roomId":null}
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Draft",
  "revision": 2,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": null,
      "interviewerId": null,
      "roomId": null,
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Unassigned",
      "issues": [{"code":"NO_ASSIGNMENT","resourceId":null,"applicationIds":["A02"]}]
    }
  ],
  "counts": {"total":2,"proposed":1,"unassigned":1,"conflict":0,"confirmed":0}
}
```

```http
POST /api/schedule/confirmation
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":2}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "CONFIRMATION_BLOCKED",
    "message": "The schedule cannot be confirmed.",
    "fields": {"assignments.A02":"A02 has no assignment."}
  }
}
```

**Applicant overlap only.** For the same student use the same time with different qualified interviewers and different rooms. Preview flags both IDs. GET immediately afterwards still returns the previously saved, unassigned A02. Only PUT changes that draft.

```http
POST /api/schedule/draft
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "action": "preview",
  "revision": 2,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "assignments": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A"
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I02",
      "roomId": "R-B"
    }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Preview",
  "revision": 2,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Conflict",
      "issues": [{"code":"APPLICANT_OVERLAP","resourceId":"U-A","applicationIds":["A01","A02"]}]
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I02",
      "roomId": "R-B",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Conflict",
      "issues": [{"code":"APPLICANT_OVERLAP","resourceId":"U-A","applicationIds":["A01","A02"]}]
    }
  ],
  "counts": {"total":2,"proposed":0,"unassigned":0,"conflict":2,"confirmed":0}
}
```

```http
GET /api/schedule
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Draft",
  "revision": 2,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": null,
      "interviewerId": null,
      "roomId": null,
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Unassigned",
      "issues": [{"code":"NO_ASSIGNMENT","resourceId":null,"applicationIds":["A02"]}]
    }
  ],
  "counts": {"total":2,"proposed":1,"unassigned":1,"conflict":0,"confirmed":0}
}
```

```http
PUT /api/schedule
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "revision": 2,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "assignments": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A"
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I02",
      "roomId": "R-B"
    }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Draft",
  "revision": 3,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Conflict",
      "issues": [{"code":"APPLICANT_OVERLAP","resourceId":"U-A","applicationIds":["A01","A02"]}]
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I02",
      "roomId": "R-B",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Conflict",
      "issues": [{"code":"APPLICANT_OVERLAP","resourceId":"U-A","applicationIds":["A01","A02"]}]
    }
  ],
  "counts": {"total":2,"proposed":0,"unassigned":0,"conflict":2,"confirmed":0}
}
```

```http
POST /api/schedule/confirmation
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":3}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "CONFIRMATION_BLOCKED",
    "message": "The schedule cannot be confirmed.",
    "fields": {
      "assignments.A01": "A01 and A02 overlap for applicant U-A.",
      "assignments.A02": "A01 and A02 overlap for applicant U-A."
    }
  }
}
```

**Repair.** Move A02 to 09:20–09:40. Preview and save now agree, then confirmation can expose the two appointments.

```http
POST /api/schedule/draft
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "action": "preview",
  "revision": 3,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "assignments": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A"
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A"
    }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Preview",
  "revision": 3,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    }
  ],
  "counts": {"total":2,"proposed":2,"unassigned":0,"conflict":0,"confirmed":0}
}
```

```http
PUT /api/schedule
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "revision": 3,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "assignments": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A"
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A"
    }
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Draft",
  "revision": 4,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Proposed",
      "issues": []
    }
  ],
  "counts": {"total":2,"proposed":2,"unassigned":0,"conflict":0,"confirmed":0}
}
```

```http
POST /api/schedule/confirmation
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":4}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "state": "Confirmed",
  "revision": 5,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"},
  "rows": [
    {
      "applicationId": "A01",
      "slotId": "2026-11-24_0900_0920",
      "interviewerId": "I01",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "content",
      "positionName": "Content",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Confirmed",
      "issues": []
    },
    {
      "applicationId": "A02",
      "slotId": "2026-11-24_0920_0940",
      "interviewerId": "I02",
      "roomId": "R-A",
      "applicantId": "U-A",
      "applicantName": "Student A",
      "positionId": "comms",
      "positionName": "Communications",
      "availableSlotIds": ["2026-11-24_0900_0920","2026-11-24_0920_0940","2026-11-24_0940_1000"],
      "status": "Confirmed",
      "issues": []
    }
  ],
  "counts": {"total":2,"proposed":0,"unassigned":0,"conflict":0,"confirmed":2}
}
```

```http
POST /api/schedule/draft
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "action": "generate",
  "revision": 5,
  "window": {"date":"2026-11-24","start":"09:00","end":"12:00"}
}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"LOCKED","message":"The confirmed campaign is read-only.","fields":{}}}
```

## GET /api/schedule/export

Executive, no parameters or body. Download the current GET view (including recalculated statuses), ordered by application ID, as UTF-8 CSV. For export of unsaved edits, save the represented draft first. CSV quoting and text escaping follow [applications export](04-applications.md). Columns in order are `applicationId,applicantName,positionName,date,start,end,interviewerId,roomId,status,reasons`. Use empty cells for missing values and join issue descriptions, including affected IDs, with a vertical bar. With no rows, return the header only.

```http
GET /api/schedule/export
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="schedule.csv"
```

## Independent checks on the direct seed

For a separate order check, shortlist all three direct-seed applications and generate. A03 was submitted first and receives 09:00/I01/R-A, followed by tied A01 then A02. Check ties and choices independently of the table display order.

On a separate fresh normal process, shortlist A01/A02, keep A03 Submitted, save a valid conflict-free two-row draft and advance past close. Confirmation must return only `applications.A03.status` with message `A03 still needs screening.` Review A03 and ensure its newly required assignment is validated even against an older saved draft.

To isolate the two other overlaps, shortlist A01 and A03 (different applicants, both Content), reject A02, and give A01/A03 the same slot. For interviewer overlap only, select I01 for both, R-A and R-B. For room overlap only, select I01 and I02, both in R-A. Preview each variant, save, then confirm after close. Require both IDs, the specific shared resource and no unrelated overlap. Remove shared availability to exercise NO_SHARED_TIME, then restore C4 settings to recover. Use fresh runs for independent changes that would otherwise require moving the clock backwards.

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Specified submission-time first-fit with an ID tie-break, and matched slot eligibility and deadline examples to the frozen availability windows.
