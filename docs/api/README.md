# ClubFlow API contract

This review draft covers C1–C11 for one club, one active campaign and one interview date. All client paths are relative to `/api`. The numbered resources define the wire format for the PA3 mock and the PA4 server.

## Endpoint index

| Method | Path | Allowed caller | Resource |
|---|---|---|---|
| POST | `/api/auth/login` | Public | [01-auth](01-auth.md) |
| GET | `/api/campaign` | Public (Applicant projection with token) | [02-campaign](02-campaign.md) |
| GET | `/api/campaign/draft` | Executive | [02-campaign](02-campaign.md) |
| PUT | `/api/campaign/draft` | Executive | [02-campaign](02-campaign.md) |
| POST | `/api/campaign/publication` | Executive | [02-campaign](02-campaign.md) |
| GET | `/api/campaign/setup` | Executive | [03-setup](03-setup.md) |
| PUT | `/api/campaign/setup` | Executive | [03-setup](03-setup.md) |
| POST | `/api/applications` | Applicant | [04-applications](04-applications.md) |
| GET | `/api/applications` | Applicant, Executive | [04-applications](04-applications.md) |
| GET | `/api/applications/export` | Executive | [04-applications](04-applications.md) |
| GET | `/api/applications/:id` | Applicant (owner), Executive | [04-applications](04-applications.md) |
| GET | `/api/applications/:id/cv` | Applicant (owner), Interviewer (assigned after confirmation), Executive | [04-applications](04-applications.md) |
| PATCH | `/api/applications/:id/screening` | Executive | [04-applications](04-applications.md) |
| POST | `/api/applications/:id/screening/publication` | Executive | [04-applications](04-applications.md) |
| GET | `/api/schedule` | Executive | [05-schedule](05-schedule.md) |
| POST | `/api/schedule/draft` | Executive | [05-schedule](05-schedule.md) |
| PUT | `/api/schedule` | Executive | [05-schedule](05-schedule.md) |
| GET | `/api/schedule/export` | Executive | [05-schedule](05-schedule.md) |
| POST | `/api/schedule/confirmation` | Executive | [05-schedule](05-schedule.md) |
| GET | `/api/interviews` | Interviewer | [06-interviews](06-interviews.md) |
| GET | `/api/interviews/:id` | Interviewer (assigned) | [06-interviews](06-interviews.md) |
| POST | `/api/interviews/:id/assessment` | Interviewer (assigned) | [06-interviews](06-interviews.md) |
| GET | `/api/results` | Executive | [07-results](07-results.md) |
| PUT | `/api/applications/:id/result` | Executive | [07-results](07-results.md) |
| POST | `/api/results/publication` | Executive | [07-results](07-results.md) |
| GET | `/api/notifications` | Applicant | [08-notifications](08-notifications.md) |
| POST | `/api/demo/steps` | Executive (demo profile) | [09-demo](09-demo.md) |

## Requests and errors

Send `Authorization: Bearer <token>` on authenticated requests, including file downloads. The session establishes identity and role. Never accept either from a submitted form. On the public campaign read, omitting the header selects the public projection. Supplying an invalid token returns 401. Scope every lookup and export on the server.

Bodies and replies are UTF-8 JSON unless marked multipart, PDF or CSV. GET has no body. An action marked empty accepts `{}` or no body. Only documented path/query/body fields are accepted. A write validates the whole request before it changes anything. Trim human-entered text except passwords. String limits count Unicode code points after trimming. IDs are case-sensitive strings. Campaign row IDs are client-chosen, stable slugs matching `[a-z][a-z0-9-]{0,39}`. Other resource IDs are opaque values returned by the API. Dates use `YYYY-MM-DD`, times `HH:mm`, and instants include seconds and UTC offset. The demo uses UTC+07:00. All interviews occupy half-open intervals: ending at 09:20 permits another to start at 09:20.

Every error uses `{"error":{"code":"…","message":"…","fields":{}}}`. All three keys are required. `fields` maps a string to one human-readable message per invalid field or affected record. For arrays, address a row by its stable ID, e.g. `departments.media.positions.content.quota` or `assignments.A01.roomId`. A malformed or duplicate row ID uses the submitted zero-based index. Use `body` for malformed JSON or a non-object, the parameter name for a query error. A business conflict may carry record-specific details. Validation and state errors preserve all prior state.

| Status | Meaning and scope |
|---|---|
| 200 / 201 | Successful read/action or application/assessment creation as shown in the resource. |
| 400 VALIDATION | Malformed input, unexpected field or invalid value. Return all independently detectable field errors. |
| 401 UNAUTHENTICATED | Credentials rejected at login, or required token missing, invalid or expired. |
| 403 FORBIDDEN | Invalid role or a known ID outside the caller's permitted records. Return the same generic message and no private fields. |
| 404 NOT_FOUND | Unknown route or ID, including an interview that has not been created by confirmation. Singleton empty states are specified per resource. |
| 409 | Valid request conflicts with current state. Resource sections name the codes. LOCKED covers writes to confirmed configuration, applications and schedule. |
| 500 MOCK_ERROR | In error mode every request except login returns this error with message `The mock is in error mode.` and empty fields before any mutation. |

The shared 400/401/403/404/500 rules apply to every operation for which that condition is possible, including binary endpoints (errors are JSON). Check authentication and role before returning resource data. Enforce scope before validation or mutation of an existing record. No private screening notes in Applicant/Interviewer projections, exports for those audiences, or error messages. Confirmed interviews, pending decisions and publication are distinct states.

## Reproducing the two stories

**Direct routes.** On restart in normal mode the clock reads 2026-11-16 08:00 +07:00. The campaign below is published, with Content, Communications and Events. Applications open Nov 15 08:00, close Nov 20 23:59, review is planned for Nov 21–22, and interviews run Nov 24 09:00–12:00. Review may start during intake. Student A (`U-A`) owns submitted A01 Content and A02 Communications. A second student (`U-B`) owns submitted A03 Content. All three selected the first three advertised windows, covering 09:00–10:00. The intake date and window catalogue are already frozen. On this seed A03 was submitted at 07:50 and A01/A02 at 08:00 on Nov 16. With all three shortlisted, first-fit processes A03, A01, A02. The creation run below starts with no applications. Both interviewers are qualified for Content and Communications and available throughout the window. Rooms A/B/C are selected. The catalogue IDs appear in [setup](03-setup.md). The next application is A04. No saved schedule, interviews, assessments, final decisions or notifications exist. Direct routes may show the appropriate prerequisite until their stage.

**Creation walkthrough.** The checker reads this file first, then 01–09 in filename order, without restarting. Its automatic named logins and the following seed reads leave the one-shot creation action available. In 02 an Executive begins creation, saves and corrects a draft, then publishes. In 03 the Executive configures four availability windows. In 04 Student A uses account defaults, selects three windows for each submission and overrides a contact on A02. The first valid application freezes the advertised windows. The Executive publishes screening outcomes separately from internal notes. In 05 the Executive saves a draft, receives an early refusal, advances past close, diagnoses and repairs incomplete and conflicting drafts, then confirms. In 06 only A01 receives written feedback after interview end. In 07 the Executive saves both decisions, handles A02 as absent and publishes the campaign once. In 08 the owner reads two notices after a repeated publication request. In 09 a backward step fails. Names in token placeholders correspond to the [demo accounts](01-auth.md). No example depends on substituting an ID from an earlier answer.

**Runtime acceptance for T2.** Start `node mock/server.mjs` in a fresh normal process, then run `node tools/contract-check.mjs --base http://localhost:3001` from the root with T2's `FRONTEND.md` account table. Inspect every NOTE. PDF/CSV examples intentionally specify headers and no answer body. Check the actual MIME, filename, readable PDF and complete CSV contents and access scope separately. `normal` delays about 150 ms, `slow` 2 s. `empty` returns existing singletons but empties every array recursively and zeros all list-derived counts. `error` uses the 500 above. Modes preserve role checks in normal/slow/empty. A restart restores the direct seed and does not invalidate demo tokens.

The Executive first checks that the demo control is available on the direct seed.

```http
GET /api/campaign/draft
Authorization: Bearer {{token:exec}}
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
  "demo": {"enabled":true,"canBegin":true}
}
```

Student A opens an existing application belonging to someone else.

```http
GET /api/applications/A03
Authorization: Bearer {{token:studentA}}
```

```http
HTTP/1.1 403 Forbidden
Content-Type: application/json

{"error":{"code":"FORBIDDEN","message":"Access denied.","fields":{}}}
```

The Interviewer home is reachable before confirmation.

```http
GET /api/interviews
Authorization: Bearer {{token:int-content}}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[],"total":0,"confirmed":false,"serverTime":"2026-11-16T08:00:00+07:00"}
```

## Review and change control

All three members review this proposal. Huy commits the reviewed contract before mock work starts. For each later approved change to `docs/api/` or `mock/`, record the date, what changed and why under the affected resource's final `Changes` heading. Use this index for shared or mock-only changes and name the mock path. Commit contract amendments before changing the mock or consumers. The public rulings govern intake locks, first-fit, screening visibility, written assessments and campaign-wide final publication. Whether CV rejection needs its own notification is still open. [Scheduling and assessment ruling](https://www.facebook.com/groups/wad.fit.hcmus/posts/28572271735804960/?comment_id=28728568636841935&reply_comment_id=28731471893218276) · [Intake, screening and final-results ruling](https://www.facebook.com/groups/wad.fit.hcmus/posts/28572271735804960/?comment_id=28742432092122256&reply_comment_id=28745446111820854)

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Revised the endpoint index, direct fixtures and ordered walkthrough to match the two public product-owner replies.
