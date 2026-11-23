# Demo lifecycle · reproducible time and creation

## POST /api/demo/steps

Executive only in the demo profile. The Executive campaign read advertises the capability, server time and whether creation is available. No query/path parameters. Send one required string `action`. No caller-provided clock or campaign ID. Invalid actions or fields return 400 VALIDATION. Wrong role gives 403 FORBIDDEN. When the profile is disabled the operation returns 404 NOT_FOUND. A success returns `{action,serverTime,canBegin}`. All time checks for deadlines and interview completion use this same clock.

| Action | Preconditions and effect |
|---|---|
| beginCreation | Once per fresh process, before any successful business write or time advance. Atomically clear the seed campaign, configuration, applications, stored CV associations, schedule, assessments, decisions and notifications. Clear intake-window locks, published screening snapshots, interview handling and campaign release state. Keep all accounts and their five-field profiles, tokens and base room/interviewer catalogues. Reset ID counters, clock stays at its initial instant. Next campaign is CF-2026-01, first applications A01/A02. A second attempt or an attempt after a business write returns 409 CREATION_UNAVAILABLE. |
| pastClose | With a published campaign, target exactly one minute after its configured closing instant. In the demo timeline this is Nov 21 at 00:00 +07:00. |
| pastInterviews | With interview setup, target exactly one minute after the end of its configured window on the interview date. In the demo timeline this is Nov 24 at 12:01 +07:00. |

An advance changes only the clock and closes the one-shot creation option. Preserve all records, statuses and access restrictions. An equal target returns the same successful state (safe retry), an earlier one returns 409 CLOCK_BACKWARD, a missing prerequisite returns 409 CAMPAIGN_REQUIRED or SETUP_REQUIRED respectively. Check and update atomically. Reads, logins, previews, failed requests and ordinary business actions never advance time. A successful business write consumes creation eligibility. Fresh process restart intentionally restores the direct seed, including a pristine clock. Automatic sign-ins for checker tokens do not consume it.

The successful three actions run in [campaign](02-campaign.md), [schedule](05-schedule.md) and [interviews](06-interviews.md), at the point each is needed. This final request would move time backwards.

```http
POST /api/demo/steps
Authorization: Bearer {{token:exec}}
Content-Type: application/json

{"action":"pastClose"}
```

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": {"code":"CLOCK_BACKWARD","message":"The demo clock cannot move backwards.","fields":{}}
}
```

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Specified the new per-campaign state reset by the pristine creation walkthrough.
