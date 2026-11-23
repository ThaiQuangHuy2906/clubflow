# Sign-in · C2

## POST /api/auth/login

Public. No path or query parameters. Send a JSON object with required `email` (valid address, at most 254 characters, case-insensitive lookup) and `password` (1–128 characters, exact case and spaces). A successful 200 returns an opaque token and `user` with `id`, `name` and `role` (`Executive`, `Applicant` or `Interviewer`). The client restores this session after reload. On sign-out it discards the local session and private data.

Missing or malformed fields return 400 VALIDATION. A validly formed pair that does not match one account returns 401 UNAUTHENTICATED with message `Invalid email or password.` and empty fields. Login works in all four mock modes. Reading or issuing a session leaves demo time, IDs and eligibility for the creation walkthrough unchanged.

These public course fixtures are the account mapping for the walkthrough. T2 publishes them in the root Demo accounts table. The mock accepts a role-bound token across restarts.

| Name in examples | Role | User ID | E-mail | Password |
|---|---|---|---|---|
| exec | Executive | U-E | exec@clubflow.test | exec-demo |
| studentA | Applicant | U-A | studenta@clubflow.test | studenta-demo |
| studentB | Applicant | U-B | studentb@clubflow.test | studentb-demo |
| int-content | Interviewer | I01 | content@clubflow.test | content-demo |
| int-comms | Interviewer | I02 | comms@clubflow.test | comms-demo |

```http
POST /api/auth/login
Content-Type: application/json

{"email":"studenta@clubflow.test","password":"studenta-demo"}
```

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"token":"…","user":{"id":"U-A","name":"Student A","role":"Applicant"}}
```

A wrong password leaves the creation walkthrough available.

```http
POST /api/auth/login
Content-Type: application/json

{"email":"studenta@clubflow.test","password":"incorrect"}
```

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{"error":{"code":"UNAUTHENTICATED","message":"Invalid email or password.","fields":{}}}
```

## Changes

Initial T1 proposal for team review, 2026-11-23.

2026-11-23 — Added the already-seeded second applicant as a sign-in fixture so owner isolation of the campaign release can be checked.
