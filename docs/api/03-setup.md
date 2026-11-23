# Interview setup · C4, C5 and C8

## GET /api/campaign/setup

Executive, no parameters or body. Returns `{settings,catalog,availabilityWindows,slots,availabilityLocked,locked}`. Before the first setup, `settings` is null and both arrays are empty. `availabilityLocked` tracks the first accepted application. `locked` tracks schedule confirmation. The direct seed starts with availabilityLocked true. Creation starts with both flags false. The interviewer and room catalogues exist even in the creation walkthrough. `catalog.positions` lists published position IDs/names, or draft positions if no version is published, or an empty list before creation. The three catalogues contain `{id,name}` records. Only the Executive can see the staff and room choices. C5 reads [the Applicant projection](02-campaign.md) instead.

```http
GET /api/campaign/setup
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "settings": null,
  "catalog": {
    "positions": [
      {"id":"content","name":"Content"},
      {"id":"comms","name":"Communications"},
      {"id":"events","name":"Events"}
    ],
    "rooms": [{"id":"R-A","name":"Room A"},{"id":"R-B","name":"Room B"},{"id":"R-C","name":"Room C"}],
    "interviewers": [
      {"id":"I01","name":"Content Interviewer"},
      {"id":"I02","name":"Communications Interviewer"}
    ]
  },
  "slots": [],
  "locked": false,
  "availabilityWindows": [],
  "availabilityLocked": false
}
```

## PUT /api/campaign/setup

Executive. No parameters. Replace the whole configuration and return the same shape as GET. All keys below are required. Only existing catalogue IDs are accepted. Empty interviewer, availability and room selections are valid and can produce Unassigned rows.

| Field | Type and constraints |
|---|---|
| date, start, end | One calendar date and two same-day times (minute precision). Start precedes end. The window starts after the campaign closes and fits at least one full slot. |
| availabilityWindows | Required array of at least three distinct, non-overlapping `{start,end}` intervals on the interview date within the bounds above. Times have minute precision, start before end. The server returns them in ascending start order with stable IDs `W-YYYY-MM-DD_HHmm_HHmm`. |
| durationMinutes | Integer, exactly 15, 20 or 30. One value applies to the whole campaign. |
| roomIds | Array of distinct existing room IDs. All selected rooms are available throughout the window, subject to reservations by other interviews. |
| interviewers | Array of distinct records with `id`, `positionIds` and `availability`. Omitted interviewers have no assignments or availability. |
| id, positionIds | Interviewer ID and a nonempty array of distinct current position IDs. One interviewer may serve multiple positions. |
| availability | Array of non-overlapping `{start,end}` intervals on `date`, inside the window, with start before end. Empty means unavailable. |

The first accepted application atomically freezes the interview date, setup start/end bounds and advertised interval set. A failed upload does not freeze them. Later PUTs may resend the same intervals in any order. Any addition, deletion, move or date/bounds change returns 409 AVAILABILITY_LOCKED, with messages on the affected fields. If C9 has confirmed, 409 LOCKED takes precedence. Serialize intake and setup writes so a submission can never refer to replaced windows.

C8 uses a separate interview slot grid. Starting at the setup start time, step by the common duration and drop any trailing partial interval. Slot IDs are `YYYY-MM-DD_HHmm_HHmm`. A slot is eligible only if its entire span fits inside the union of that applicant's selected windows (merge adjacent intervals), the generation window and qualified interviewer availability. Before C9 the Executive may change the common 15/20/30-minute duration, interviewer qualifications/availability and room selections, or narrow the draft generation window and move assignments. These operations preserve the frozen Applicant windows and IDs. Revalidate saved assignments on reads, preview, save and confirmation.

400 VALIDATION identifies the invalid field, e.g. `durationMinutes` or `interviewers.I01.availability.0.end`. 409 CAMPAIGN_REQUIRED if no draft or published campaign exists, 409 LOCKED after confirmation. Reads and writes also follow the [common errors](README.md#requests-and-errors).

```http
PUT /api/campaign/setup
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "date": "2026-11-24",
  "start": "09:00",
  "end": "12:00",
  "durationMinutes": 20,
  "roomIds": ["R-A","R-B","R-C"],
  "interviewers": [
    {
      "id": "I01",
      "positionIds": ["content","comms"],
      "availability": [{"start":"09:00","end":"12:00"}]
    },
    {
      "id": "I02",
      "positionIds": ["comms","content"],
      "availability": [{"start":"09:00","end":"12:00"}]
    }
  ],
  "availabilityWindows": [
    {"start":"09:00","end":"09:20"},
    {"start":"09:20","end":"09:40"},
    {"start":"09:40","end":"10:00"},
    {"start":"10:00","end":"12:00"}
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "settings": {
    "date": "2026-11-24",
    "start": "09:00",
    "end": "12:00",
    "durationMinutes": 20,
    "roomIds": ["R-A","R-B","R-C"],
    "interviewers": [
      {
        "id": "I01",
        "positionIds": ["content","comms"],
        "availability": [{"start":"09:00","end":"12:00"}]
      },
      {
        "id": "I02",
        "positionIds": ["comms","content"],
        "availability": [{"start":"09:00","end":"12:00"}]
      }
    ],
    "availabilityWindows": [
      {"start":"09:00","end":"09:20"},
      {"start":"09:20","end":"09:40"},
      {"start":"09:40","end":"10:00"},
      {"start":"10:00","end":"12:00"}
    ]
  },
  "catalog": {
    "positions": [
      {"id":"content","name":"Content"},
      {"id":"comms","name":"Communications"},
      {"id":"events","name":"Events"}
    ],
    "rooms": [{"id":"R-A","name":"Room A"},{"id":"R-B","name":"Room B"},{"id":"R-C","name":"Room C"}],
    "interviewers": [
      {"id":"I01","name":"Content Interviewer"},
      {"id":"I02","name":"Communications Interviewer"}
    ]
  },
  "slots": [
    {"id":"2026-11-24_0900_0920","date":"2026-11-24","start":"09:00","end":"09:20"},
    {"id":"2026-11-24_0920_0940","date":"2026-11-24","start":"09:20","end":"09:40"},
    {"id":"2026-11-24_0940_1000","date":"2026-11-24","start":"09:40","end":"10:00"},
    {"id":"2026-11-24_1000_1020","date":"2026-11-24","start":"10:00","end":"10:20"},
    {"id":"2026-11-24_1020_1040","date":"2026-11-24","start":"10:20","end":"10:40"},
    {"id":"2026-11-24_1040_1100","date":"2026-11-24","start":"10:40","end":"11:00"},
    {"id":"2026-11-24_1100_1120","date":"2026-11-24","start":"11:00","end":"11:20"},
    {"id":"2026-11-24_1120_1140","date":"2026-11-24","start":"11:20","end":"11:40"},
    {"id":"2026-11-24_1140_1200","date":"2026-11-24","start":"11:40","end":"12:00"}
  ],
  "locked": false,
  "availabilityWindows": [
    {"id":"W-2026-11-24_0900_0920","date":"2026-11-24","start":"09:00","end":"09:20"},
    {"id":"W-2026-11-24_0920_0940","date":"2026-11-24","start":"09:20","end":"09:40"},
    {"id":"W-2026-11-24_0940_1000","date":"2026-11-24","start":"09:40","end":"10:00"},
    {"id":"W-2026-11-24_1000_1200","date":"2026-11-24","start":"10:00","end":"12:00"}
  ],
  "availabilityLocked": false
}
```

### Applicant checks the published choices

This read is the handoff from C4 to C5. The first three window IDs are submitted in [applications](04-applications.md).

```http
GET /api/campaign
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "campaign": {
    "id": "CF-2026-01",
    "name": "Creative Club Recruitment 2026",
    "hostClub": "Student Creative Club",
    "description": "Join the club for the autumn term.",
    "opensAt": "2026-11-15T08:00:00+07:00",
    "closesAt": "2026-11-20T23:59:00+07:00",
    "instructions": "Choose a position and attach a PDF CV.",
    "departments": [
      {
        "id": "media",
        "name": "Media",
        "positions": [
          {
            "id": "content",
            "name": "Content",
            "quota": 3,
            "description": "Write club stories.",
            "requirements": "Writing sample"
          },
          {
            "id": "comms",
            "name": "Communications",
            "quota": 2,
            "description": "Plan club outreach.",
            "requirements": "Teamwork"
          }
        ]
      },
      {
        "id": "operations",
        "name": "Operations",
        "positions": [
          {
            "id": "events",
            "name": "Events",
            "quota": 2,
            "description": "Coordinate club events.",
            "requirements": "Planning"
          }
        ]
      }
    ]
  },
  "acceptingApplications": true,
  "profile": {
    "studentName": "Student A",
    "studentNumber": "ST01",
    "faculty": "Information Technology",
    "email": "studenta@clubflow.test",
    "phone": "0900000001"
  },
  "availabilityWindows": [
    {"id":"W-2026-11-24_0900_0920","date":"2026-11-24","start":"09:00","end":"09:20"},
    {"id":"W-2026-11-24_0920_0940","date":"2026-11-24","start":"09:20","end":"09:40"},
    {"id":"W-2026-11-24_0940_1000","date":"2026-11-24","start":"09:40","end":"10:00"},
    {"id":"W-2026-11-24_1000_1200","date":"2026-11-24","start":"10:00","end":"12:00"}
  ]
}
```

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Separated offered availability from interview duration and specified the atomic first-submission lock.
