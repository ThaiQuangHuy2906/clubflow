# Campaign · C1, C3 and the C5 slot catalogue

## POST /api/demo/steps · creation prerequisite

The initial Executive read of `/campaign/draft` on the direct seed advertises `demo.enabled=true` and `demo.canBegin=true`. The first write here selects the other approved story. It preserves accounts, interviewer/room catalogues and the starting clock. See [demo lifecycle](09-demo.md).

```http
POST /api/demo/steps
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"action":"beginCreation"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"action":"beginCreation","serverTime":"2026-11-16T08:00:00+07:00","canBegin":false}
```

## GET /api/campaign

Public, no parameters or body. Returns `{campaign,acceptingApplications}`. `campaign` is null before publication. Otherwise it contains the published campaign ID and the fields below. `acceptingApplications` is true only for a published, unlocked campaign whose server time lies in `[opensAt, closesAt)`. An authenticated Applicant also receives `profile` and `availabilityWindows`. The profile comes from the caller’s account and contains `studentName,studentNumber,faculty,email,phone` even before publication. C5 pre-fills all five. The advertised windows are safe `{id,date,start,end}` records from C4, or an empty list without a published campaign and setup. C8 generates interview slots within the intervals selected by the Applicant. Public, Executive and Interviewer reads omit both Applicant-only keys. Personalised responses must not be shared by caches. Other callers see the public projection. Drafts, interviewer qualifications, personal availability, notes and assignments are private. Reads after the deadline still show the published campaign.

```http
GET /api/campaign
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"campaign":null,"acceptingApplications":false}
```

## GET /api/campaign/draft

Executive, no parameters or body. Returns `{campaignId,draft,published,locked,serverTime,demo}`. `published` means a published snapshot exists, even if the draft has since changed. The first save or publication creates the singleton with ID `CF-2026-01`. Before that, ID and draft are null. `serverTime` is authoritative. `demo` has booleans `enabled` and `canBegin`. Outside the demo profile both are false. A confirmed campaign remains readable.

```http
GET /api/campaign/draft
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "campaignId": null,
  "draft": null,
  "published": false,
  "locked": false,
  "serverTime": "2026-11-16T08:00:00+07:00",
  "demo": {"enabled":true,"canBegin":false}
}
```

## PUT /api/campaign/draft

Executive. No parameters. Send the entire editable campaign object. Both draft and publication require the following keys and types. Save as Draft accepts empty text, empty row lists, blank dates and null quota for unfinished values. Nonblank values must have the correct format and respect the bounds below. When both dates are present, opening must precede closing. Saving changes only the editable version. Preview Campaign renders the current form locally with the public field selection.

| Field | Type, limits and publication requirement |
|---|---|
| name, hostClub | Strings of 1–120 characters on publication. |
| description, instructions | Strings of 1–2,000 characters on publication. |
| opensAt, closesAt | ISO 8601 timestamps with explicit offset and seconds, both required on publication. Close must precede any configured interview window. For date-only close input, send 00:00 on the following calendar day in UTC+07:00. Intake stops at the exact closing instant. |
| departments | Array of up to 30 departments, at least one for publication. |
| departments[].id, name | Stable slug and string up to 100 characters. ID required even in drafts. Name required on publication. |
| departments[].positions | Array of up to 50 positions in that department, at least one on publication. |
| positions[].id, name | Stable slug unique across this campaign and name up to 100 characters. ID required even in drafts. Name required on publication. |
| positions[].quota | Integer 1–999 when set, required on publication. This is a vacancy target. Intake accepts more applications than the target. |
| positions[].description, requirements | Strings up to 2,000 characters each, nonempty on publication. |

A new row ID adds a department or position, a retained ID edits it, and omission removes that row and its children from this version. Department IDs are unique in the campaign. Return 400 VALIDATION for incorrect structure, duplicate IDs, invalid dates or out-of-range fields. Return 409 IN_USE if publication would remove a position referenced by a submission or saved setup. A draft may omit published rows while being edited. Return 409 LOCKED after confirmation for both writes. A failure changes neither snapshot. Successful draft save returns the full Executive envelope shown by GET.

```http
PUT /api/campaign/draft
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "name": "",
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
        },
        {
          "id": "temporary",
          "name": "Temporary position",
          "quota": 1,
          "description": "",
          "requirements": ""
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
    },
    {"id":"temporary-team","name":"Temporary department","positions":[]}
  ]
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "campaignId": "CF-2026-01",
  "draft": {
    "name": "",
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
          },
          {
            "id": "temporary",
            "name": "Temporary position",
            "quota": 1,
            "description": "",
            "requirements": ""
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
      },
      {"id":"temporary-team","name":"Temporary department","positions":[]}
    ]
  },
  "published": false,
  "locked": false,
  "serverTime": "2026-11-16T08:00:00+07:00",
  "demo": {"enabled":true,"canBegin":false}
}
```

A zero quota fails even a draft save. The error path follows the row ID through removals and reordering. The earlier saved version is still available.

```http
PUT /api/campaign/draft
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
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
          "quota": 0,
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
}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION",
    "message": "Check the highlighted fields.",
    "fields": {"departments.media.positions.content.quota":"Enter a whole number from 1 to 999."}
  }
}
```

## POST /api/campaign/publication

Executive. No parameters. The body is the current form with the same structure as PUT. Validate the full submitted version, including all publication-only requirements. Atomically store it as both the editable and the public snapshot, returning the same Executive envelope. This also supports publishing directly from the form without first saving. The first attempt below removes the temporary department and position, but still lacks a name. The saved draft remains intact. The second attempt fixes the name and publishes the reduced row set.

```http
POST /api/campaign/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "name": "",
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
}
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION",
    "message": "Check the highlighted fields.",
    "fields": {"name":"Enter the campaign name."}
  }
}
```

```http
POST /api/campaign/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
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
}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "campaignId": "CF-2026-01",
  "draft": {
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
  "published": true,
  "locked": false,
  "serverTime": "2026-11-16T08:00:00+07:00",
  "demo": {"enabled":true,"canBegin":false}
}
```

```http
GET /api/campaign
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
  "acceptingApplications": true
}
```

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Defined the account-bound prefill and offered-window projection used by C5.
