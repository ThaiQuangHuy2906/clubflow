# Applications · C5–C7 and personal C9/C11 reads

## POST /api/applications

Applicant, no parameters. Send `multipart/form-data`. The browser sets the boundary. Every part in the table is required. C5 obtains the five prefilled student values from the Applicant projection of `GET /api/campaign`. Render full name, student number and faculty as read-only. The server copies these three values from the authenticated account into the application at acceptance. Omit them from the upload; supplying `studentName`, `studentNumber` or `faculty` returns a field-specific 400. The two editable contacts are stored only on the new application. Neither an override nor a retry updates the account or another application. The server derives the applicant ID from the token and the campaign from the published snapshot. It assigns each successful new submission its own sequential ID (`A01`, `A02`, …) and server timestamp.

| Part | Type and limit |
|---|---|
| positionId | One currently published position ID. |
| phone | Contact phone as a string of 7–15 digits with an optional leading `+`. Prefill from the Applicant account. |
| email | Valid contact email up to 254 characters. Ownership stays with the signed-in account. |
| motivation | Nonblank text, at most 300 words. Split trimmed input at runs of Unicode whitespace. |
| availabilityWindowIds | Repeat once per choice. Require at least three different IDs from the offered windows on the current Applicant campaign projection. Reject unknown IDs and duplicates with a field error. Persist the selected intervals with the application. |
| cv | One nonempty PDF file, filename ending in .pdf (case-insensitive), MIME application/pdf, first bytes `%PDF-`, size at most 5 × 1,024 × 1,024 bytes inclusive. Validate on both client and server. The checker uploads a PDF-signature stand-in. |

400 VALIDATION addresses the part (including `cv`, `availabilityWindowIds`, `motivation`). 409 LOCKED after confirmation, 409 APPLICATIONS_CLOSED if unpublished, early or at/after close. The server checks time on receipt even if the form opened earlier. Failures keep input on the client and consume no ID. Within an open window, enforce uniqueness atomically on (campaign ID, authenticated applicant ID, position ID). An existing pair returns 200 with its original `id` and `created:false` so C5 can open it without changing its fields. A new application returns 201, `created:true`, and starts at Submitted. The first successful creation freezes the C4 date and offered windows in the same write. Failed and duplicate submissions preserve record counts and lock state.

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=content -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F availabilityWindowIds=W-2026-11-24_0940_1000 \
  -F "cv=@{{file:cv.pdf:5242881B}};type=application/pdf"
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION",
    "message": "Check the highlighted fields.",
    "fields": {"cv":"Upload a PDF no larger than 5 MB."}
  }
}
```

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=content -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F "cv=@{{file:cv.pdf:200KB}};type=application/pdf"
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION",
    "message": "Check the highlighted fields.",
    "fields": {"availabilityWindowIds":"Select at least three distinct offered windows."}
  }
}
```

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=content -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F availabilityWindowIds=W-2026-11-24_0940_1000 \
  -F "studentNumber=ST99" \
  -F "cv=@{{file:cv.pdf:200KB}};type=application/pdf"
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION",
    "message": "Check the highlighted fields.",
    "fields": {"studentNumber":"This field comes from your account."}
  }
}
```

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=content -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F "cv=@{{file:cv.pdf:200KB}};type=application/pdf"
```

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "error": {
    "code": "VALIDATION",
    "message": "Check the highlighted fields.",
    "fields": {"availabilityWindowIds":"Select at least three distinct offered windows."}
  }
}
```

```http
GET /api/campaign/setup
Authorization: Bearer {{token:exec}}
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

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=content -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F availabilityWindowIds=W-2026-11-24_0940_1000 \
  -F "cv=@{{file:cv.pdf:5MB}};type=application/pdf"
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":"A01","created":true}
```

The first accepted application freezes the offered windows. The Executive can still change the interview duration, and the Applicant sees the same windows. Restore 20 minutes for the walkthrough.

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
    {"start":"09:40","end":"10:00"}
  ]
}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {
    "code": "AVAILABILITY_LOCKED",
    "message": "Applicant availability is already in use.",
    "fields": {"availabilityWindows":"Keep the windows offered at first submission."}
  }
}
```

```http
PUT /api/campaign/setup
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "date": "2026-11-24",
  "start": "09:00",
  "end": "12:00",
  "durationMinutes": 30,
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
    "durationMinutes": 30,
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
    {"id":"2026-11-24_0900_0930","date":"2026-11-24","start":"09:00","end":"09:30"},
    {"id":"2026-11-24_0930_1000","date":"2026-11-24","start":"09:30","end":"10:00"},
    {"id":"2026-11-24_1000_1030","date":"2026-11-24","start":"10:00","end":"10:30"},
    {"id":"2026-11-24_1030_1100","date":"2026-11-24","start":"10:30","end":"11:00"},
    {"id":"2026-11-24_1100_1130","date":"2026-11-24","start":"11:00","end":"11:30"},
    {"id":"2026-11-24_1130_1200","date":"2026-11-24","start":"11:30","end":"12:00"}
  ],
  "locked": false,
  "availabilityWindows": [
    {"id":"W-2026-11-24_0900_0920","date":"2026-11-24","start":"09:00","end":"09:20"},
    {"id":"W-2026-11-24_0920_0940","date":"2026-11-24","start":"09:20","end":"09:40"},
    {"id":"W-2026-11-24_0940_1000","date":"2026-11-24","start":"09:40","end":"10:00"},
    {"id":"W-2026-11-24_1000_1200","date":"2026-11-24","start":"10:00","end":"12:00"}
  ],
  "availabilityLocked": true
}
```

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
  "availabilityLocked": true
}
```

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=content -F email=studenta@clubflow.test -F phone=0900000001 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F availabilityWindowIds=W-2026-11-24_0940_1000 \
  -F "cv=@{{file:cv.pdf:200KB}};type=application/pdf"
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id":"A01","created":false}
```

```sh
curl -i http://localhost:3001/api/applications \
  -H "Authorization: Bearer {{token:studentA}}" \
  -F positionId=comms -F email=studenta@clubflow.test -F phone=0900000099 \
  -F "motivation=I enjoy working with the club." \
  -F availabilityWindowIds=W-2026-11-24_0900_0920 \
  -F availabilityWindowIds=W-2026-11-24_0920_0940 \
  -F availabilityWindowIds=W-2026-11-24_0940_1000 \
  -F "cv=@{{file:cv.pdf:200KB}};type=application/pdf"
```

```http
HTTP/1.1 201 Created
Content-Type: application/json

{"id":"A02","created":true}
```

## GET /api/applications

Applicant or Executive. No body or path parameter. The Applicant receives only owned applications (all rows, ascending ID), as `{items,total}`, with no query parameters. Each row has `id,campaignId,positionId,positionName,submittedAt,status,applicantReason,interview,result`. Before a screening outcome is published, `status` is Submitted and `applicantReason` is null. Thereafter both reflect the published screening snapshot. For Rejected, show “Rejected at CV screening” on that application and display its applicant-facing reason if present. `interview` is null until C9 and then contains the owner's interview ID, date, start, end, room ID and room name. `result` is null until campaign-wide final publication and then `Pass` or `Fail`. Neither projection contains another application's result. An empty collection is a 200.

The Executive receives `{items,total,page,pageSize,statistics,locked}`. Executive rows contain `id,campaignId,positionId,positionName,submittedAt,status,interview,result,applicantId,studentName,studentNumber`. Here `status` is the current internal screening decision, including changes awaiting release. Statistics count **all campaign** applications and distinct applicant IDs before search/filter, split by the three screening statuses. `total` counts filtered applications before paging. C7 enables scheduling when `statistics.shortlisted > 0`. Client keeps filters/page when closing the drawer. No list includes private notes or assessments.

| Executive query | Accepted values and default |
|---|---|
| q | Trimmed text, 0–120 characters. Case-insensitive substring in application ID, student name/number or position name. Default empty. |
| status, positionId | Optional exact screening status and/or current position ID, combined with q by AND. |
| sort, order | `id` (default), `submittedAt`, `studentName` or `positionName`. `asc` (default) or `desc`. Compare text by Unicode code point, timestamps chronologically, break ties by ascending application ID. |
| page, pageSize | Positive decimal integers, defaults 1 and 20, maximum pageSize 100. Out-of-range page returns empty items and the real total. |

400 VALIDATION for unsupported filters, sort, bounds or Applicant query parameters.

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
      "status": "Submitted",
      "interview": null,
      "result": null,
      "applicantReason": null
    },
    {
      "id": "A02",
      "campaignId": "CF-2026-01",
      "positionId": "comms",
      "positionName": "Communications",
      "submittedAt": "2026-11-16T08:00:00+07:00",
      "status": "Submitted",
      "interview": null,
      "result": null,
      "applicantReason": null
    }
  ],
  "total": 2
}
```

```http
GET /api/applications?q=Student&status=Submitted&positionId=content&sort=id&order=asc&page=1&pageSize=1
Authorization: Bearer {{token:exec}}
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
      "status": "Submitted",
      "interview": null,
      "result": null,
      "applicantId": "U-A",
      "studentName": "Student A",
      "studentNumber": "ST01"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 1,
  "statistics": {"applications":2,"applicants":1,"submitted":2,"shortlisted":0,"rejected":0},
  "locked": false
}
```

## GET /api/applications/export

Executive. No body. Same `q,status,positionId,sort,order` as the list, same 400s. Pagination parameters are invalid. Return all matching rows in list order as UTF-8 CSV, one header row even if empty. Columns in order are `applicationId,applicantId,studentName,studentNumber,positionId,positionName,submittedAt,status`. Use CRLF records, double embedded quotes and quote fields containing a comma, quote or newline. Spreadsheet formula-leading user text is escaped with a leading apostrophe. Keep notes and CV contents private.

```http
GET /api/applications/export?status=Submitted&sort=id
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="applications.csv"
```

## GET /api/applications/:id

Applicant owner or Executive, no query/body. `id` is an application ID. The detail extends the row with `studentName,studentNumber,faculty,email,phone,motivation,availabilityWindowIds,cvFileName`. The Executive detail also contains `revision,applicantId,privateNote,locked`, the editable `applicantReason` and `publishedScreening` (null or the last released status/reason snapshot). Returned availability IDs identify the original offered windows. Contact fields are the values saved for that application. The Applicant projection excludes all note and assessment fields, including after publication. Interviewers use their own [interview detail](06-interviews.md). 403 for another owner's known ID or a disallowed role, 404 for a missing ID.

```http
GET /api/applications/A01
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "A01",
  "campaignId": "CF-2026-01",
  "positionId": "content",
  "positionName": "Content",
  "submittedAt": "2026-11-16T08:00:00+07:00",
  "status": "Submitted",
  "interview": null,
  "result": null,
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000001",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf"
}
```

```http
GET /api/applications/A01
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "A01",
  "campaignId": "CF-2026-01",
  "positionId": "content",
  "positionName": "Content",
  "submittedAt": "2026-11-16T08:00:00+07:00",
  "status": "Submitted",
  "interview": null,
  "result": null,
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000001",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "",
  "revision": 0,
  "publishedScreening": null,
  "locked": false
}
```

```http
GET /api/applications/A99
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{"error":{"code":"NOT_FOUND","message":"Application not found.","fields":{}}}
```

## GET /api/applications/:id/cv

No query/body. Executive or Applicant owner may download this CV. An Interviewer needs a confirmed interview for this exact application assigned to their own ID. Two applications from the same student are independent grants. 403 for unassigned, pre-confirmation or other-owner access, 404 if the application is missing. A successful download has `Content-Type: application/pdf` and an attachment filename. The mock serves a readable local PDF, including for checker stand-ins. T2 checks the file bytes, actual PDF rendering and both allowed and denied audiences separately.

```http
GET /api/applications/A01/cv
Authorization: Bearer {{token:exec}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="cv.pdf"
```

```http
GET /api/applications/A01/cv
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Access denied.","fields":{}}}
```

## PATCH /api/applications/:id/screening

Executive, no query. Send at least one of `status` (Shortlisted or Rejected), `privateNote` (0–2,000 characters, empty clears) and `applicantReason` (null or 1–2,000 characters for a Rejected outcome). Unspecified fields retain their values. Switching to Shortlisted clears the applicant reason. Private notes are independent and can never supply a default reason. Validate and update the internal review for this ID only. A status change updates scheduling eligibility immediately. Only the separate publication action makes the new status and reason visible to the Applicant. Return the authoritative Executive detail. 400 VALIDATION for an empty/invalid patch or reason on a non-rejected screening, 404 NOT_FOUND for unknown ID and 409 LOCKED after C9.

```http
PATCH /api/applications/A01/screening
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"privateNote":"Writing sample reviewed.","status":"Shortlisted"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "A01",
  "campaignId": "CF-2026-01",
  "positionId": "content",
  "positionName": "Content",
  "submittedAt": "2026-11-16T08:00:00+07:00",
  "status": "Shortlisted",
  "interview": null,
  "result": null,
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000001",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "Writing sample reviewed.",
  "revision": 1,
  "publishedScreening": null,
  "locked": false
}
```

```http
PATCH /api/applications/A02/screening
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{
  "status": "Rejected",
  "applicantReason": "The outreach sample was missing.",
  "privateNote": "Internal second review requested."
}
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
  "status": "Rejected",
  "interview": null,
  "result": null,
  "applicantReason": "The outreach sample was missing.",
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000099",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "Internal second review requested.",
  "revision": 1,
  "publishedScreening": null,
  "locked": false
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
  "status": "Submitted",
  "interview": null,
  "result": null,
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

## POST /api/applications/:id/screening/publication

Executive. Application ID in path, no query, required JSON body with the nonnegative safe integer `revision` from the reviewed Executive detail or screening PATCH response. The revision starts at zero per application and increases once when its internal status or applicant-facing reason changes. Private-note edits, unchanged saves, publication and edits to siblings preserve it. Validate the body before acting. A missing, invalid or extra field returns 400 VALIDATION. Atomically compare the supplied revision before copying. A mismatch returns 409 STALE_REVISION and preserves the previous owner-visible snapshot. Reload the detail and require the Executive to review and publish again. Copy the internal Shortlisted or Rejected status and its optional applicant-facing reason into the public-to-owner screening snapshot. Retrying the same revision preserves the published status and reason. The response contains the current Executive detail, including private-note edits made after publication. The internal note is never copied. Before publication the owner continues to see Submitted or the previous released snapshot. Return 404 NOT_FOUND for a missing ID, 409 SCREENING_PENDING if still Submitted. Publishing a completed review may occur after C9: it changes visibility only. The separate question of a notification for CV rejection remains open. This draft requires the on-screen status and optional reason; the two public replies give no additional screening notification rule.

In the creation walkthrough the Executive releases both outcomes. A02’s owner sees the public reason. A second review then shortlists A02. The owner sees the revision only after it too is released.

```http
POST /api/applications/A01/screening/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":1}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "A01",
  "campaignId": "CF-2026-01",
  "positionId": "content",
  "positionName": "Content",
  "submittedAt": "2026-11-16T08:00:00+07:00",
  "status": "Shortlisted",
  "interview": null,
  "result": null,
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000001",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "Writing sample reviewed.",
  "revision": 1,
  "publishedScreening": {"status":"Shortlisted","applicantReason":null},
  "locked": false
}
```

```http
POST /api/applications/A02/screening/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":1}
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
  "status": "Rejected",
  "interview": null,
  "result": null,
  "applicantReason": "The outreach sample was missing.",
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000099",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "Internal second review requested.",
  "revision": 1,
  "publishedScreening": {"status":"Rejected","applicantReason":"The outreach sample was missing."},
  "locked": false
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
  "status": "Rejected",
  "interview": null,
  "result": null,
  "applicantReason": "The outreach sample was missing.",
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

```http
PATCH /api/applications/A02/screening
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"status":"Shortlisted"}
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
  "interview": null,
  "result": null,
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000099",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "Internal second review requested.",
  "revision": 2,
  "publishedScreening": {"status":"Rejected","applicantReason":"The outreach sample was missing."},
  "locked": false
}
```

A second tab still holds the previous revision. Its publication attempt preserves the owner-visible state.

```http
POST /api/applications/A02/screening/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":1}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{"error":{"code":"STALE_REVISION","message":"Reload and review the current decisions before publishing.","fields":{}}}
```

After reviewing the current values, the Executive publishes the matching revision.

```http
POST /api/applications/A02/screening/publication
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"revision":2}
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
  "interview": null,
  "result": null,
  "applicantReason": null,
  "studentName": "Student A",
  "studentNumber": "ST01",
  "faculty": "Information Technology",
  "email": "studenta@clubflow.test",
  "phone": "0900000099",
  "motivation": "I enjoy working with the club.",
  "availabilityWindowIds": ["W-2026-11-24_0900_0920","W-2026-11-24_0920_0940","W-2026-11-24_0940_1000"],
  "cvFileName": "cv.pdf",
  "applicantId": "U-A",
  "privateNote": "Internal second review requested.",
  "revision": 2,
  "publishedScreening": {"status":"Shortlisted","applicantReason":null},
  "locked": false
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
  "interview": null,
  "result": null,
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

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Added account-derived identity, per-application contacts, three-window validation and separate release of applicant-facing screening outcomes. The examples exercise both sides of the intake lock and the private-note boundary.

2026-11-25 — Added per-application revision checks to screening publication after the PR #4 review.

2026-11-25 — Clarified which screening fields remain stable when retrying after a private-note edit.
