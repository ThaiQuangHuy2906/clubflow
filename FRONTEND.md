# ClubFlow PA3 Frontend

This guide describes the integrated frontend on `main` tested at `edb3d26`. The build includes Campaign (C1–C4), Applications (C5–C7 and C11), and Scheduling and Interviewer Workspace (C8–C10). [Scheduling integration in PR #7](https://github.com/ThaiQuangHuy2906/clubflow/pull/7)

## Team

| Member | Student ID | PA3 ownership |
|---|---|---|
| Thái Quang Huy | 24127177 | Shared client, contract and mock, Campaign (C1–C4), integration |
| Lê Nguyễn Quốc Học | 24127044 | Application submission and tracking, Executive screening, final results (C5–C7 and C11) |
| Trần Hoàng Phúc | 24127505 | Scheduling, confirmation and interviewer workspace (C8–C10) |

## How to run it

Use Node.js 20.19 or newer on Node 20, or Node.js 22.12 or newer. Run the mock from the repository root in one terminal.

```sh
node mock/server.mjs
```

In another terminal, start the frontend.

```sh
cd client
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. To test the production build, run the following from `client/` with the mock still running.

```sh
npm run build
npx vite preview --host 127.0.0.1 --port 4173 --strictPort
```

Open `http://127.0.0.1:4173`. Dev and preview proxy `/api` to the mock on port 3001. The mock defaults to `normal` and has demo controls enabled. For loading, Retry and empty-list checks, restart it with `MOCK_MODE=slow`, `error` or `empty` as needed. Set the environment variable before launching Node, for example `$env:MOCK_MODE = 'slow'` in PowerShell. Each mock restart restores the seeded records and clock.

## Demo accounts

| Name in examples | Role | E-mail | Password |
|---|---|---|---|
| exec | Executive | exec@clubflow.test | exec-demo |
| studentA | Applicant | studenta@clubflow.test | studenta-demo |
| studentB | Applicant | studentb@clubflow.test | studentb-demo |
| int-content | Interviewer | content@clubflow.test | content-demo |
| int-comms | Interviewer | comms@clubflow.test | comms-demo |


## Routes

Use a fresh normal mock for the seeded walkthrough. Executive workspace pages also read `GET /api/campaign/draft` in the shared shell. The Executive demo controls call `POST /api/demo/steps`. The [API contract](docs/api/README.md) defines permissions and the request examples.

| Browser path | Role and step | How to check it | API |
|---|---|---|---|
| `/` | Public · C1 | Open the campaign and confirm the dates, requirements and quotas. Select Apply for Content and sign in as `studentA` to reach `/apply/content`. | `GET /api/campaign` |
| `/sign-in` | All roles · C2 | Sign in with a demo account and check its role home. A visitor who opens an authorized protected link first returns there after sign-in. Sign out to switch roles. | `POST /api/auth/login` |
| `/executive/campaign` | Executive · C3 | Open the seeded draft as `exec`. In a separate fresh creation run, edit departments and positions, preview the form, save, reload and publish. Check that the public page shows the published version. | `GET /api/campaign/draft`, `PUT /api/campaign/draft`, `POST /api/campaign/publication` |
| `/executive/interview-setup` | Executive · C4 | Open as `exec`. The seeded applications have already frozen the offered windows. In a fresh creation run, publish a campaign, offer at least three windows, choose qualifications and rooms, save and reopen. The first accepted application freezes the offered windows, and confirmation locks the rest of the setup. | `GET /api/campaign/setup`, `PUT /api/campaign/setup` |
| `/apply/content` | Applicant · C5 | Sign in as `studentA` while intake is open. Select at least three offered windows, enter a motivation of up to 300 words, and attach a PDF up to 5 MiB. A valid duplicate submission on the direct seed opens A01. In a fresh creation run, submit Content and Communications to get two records. | `GET /api/campaign`, `POST /api/applications` |
| `/me/applications` | Applicant · C6, C11 | Sign in as `studentA` to see A01 and A02 as separate entries. The list shows final-result notices after campaign publication. | `GET /api/applications`, `GET /api/notifications` |
| `/me/applications/A01` | Applicant owner · C6, C11 | Open directly, refresh and return to the list. Sign in as `studentB` to check denial. Screening appears after its release, the interview time and room appear after C9, and the decision appears after C11 publication. | `GET /api/applications/A01` |
| `/executive/applications` | Executive · C7 | Open A01 in the review drawer. Search, filter and page, download the CV or filtered CSV, save a screening decision, then publish it separately. Check the Applicant view from a separate session. | `GET /api/campaign`, `GET /api/applications`, `GET /api/applications/export`, `GET /api/applications/A01`, `GET /api/applications/A01/cv`, `PATCH /api/applications/A01/screening`, `POST /api/applications/A01/screening/publication` |
| `/executive/schedule` | Executive · C8, C9 | Open as `exec`. Shortlist applications first. Generate a draft, change rows with **Edit**, **Resolve** or **+ Assign Slot**, then **Check and apply** and **Save Changes**. Export the saved table. **Approve & Confirm Schedule** stays disabled while any change is not in the saved draft. The server refuses confirmation and names each blocker until applications are closed, every application is screened and every shortlisted row is assigned without overlap. After confirmation the screen is read-only. | `GET /api/schedule`, `GET /api/campaign/setup`, `PUT /api/campaign/setup`, `POST /api/schedule/draft`, `PUT /api/schedule`, `GET /api/schedule/export`, `POST /api/schedule/confirmation` |
| `/interviewer/interviews` | Interviewer · C10 | Sign in as `int-content` or `int-comms`. Before C9 the list shows 0 and an explanation. After C9 it lists only the signed-in interviewer's interviews. | `GET /api/interviews` |
| `/interviewer/interviews/IV-A01` | Assigned Interviewer · C10 (after C9) | Created by confirming a schedule with A01. Sign in as the interviewer assigned to A01 in that schedule (`int-content` when A01 has the Content Interviewer). Before C9 the page says the interview is not available. After C9 it shows the appointment and the assigned CV. The assessment form opens after the interview ends and accepts one written assessment. Another interviewer is denied. | `GET /api/interviews/IV-A01`, `GET /api/applications/A01/cv`, `POST /api/interviews/IV-A01/assessment` |
| `/executive/results` | Executive · C11 | Open as `exec`. The board is empty before C9. After confirmation and the interview window, record missing handling and save decisions. Publish once for the campaign and verify the owner's notices. For the seeded end-to-end run, follow the C7–C11 walkthrough below. | `GET /api/results`, `PUT /api/applications/:id/result`, `POST /api/results/publication` |
| `/unknown-page` | All roles · route fallback | Open an unknown URL and follow View campaign back to `/`. | — |

For the creation walkthrough described in the [QA report](checks/PA3_RELEASE_QA.md), restart the normal mock, sign in as `exec` and choose **Begin creation walkthrough** under **Demo controls** before the first successful business write. Publish the campaign and save the interview setup before opening the Applicant form. Use another browser profile or a private window to compare published and private states in separate sessions. The Executive can advance the server clock past the close and past interviews without changing the existing records. See the [walkthrough and scheduling cases](PA3_PLAN.md#one-campaign-and-a-reproducible-walkthrough).

**Earlier integrated checks.** Campaign browser coverage comes from PR #6 and its merged build at `e3e8ad3`. On the merged `bf11be8` build, eight functional check groups passed in Chrome, including valid and duplicate applications, owner scope, filtered paging and stale publication from two Executive tabs. The run also recorded 12 passing layout checks across four screens at 360, 768 and 1280 px. On the same revision, 14 Node tests and 94 contract examples across 27 operations passed. The [merged-build log](AI-LOG.md#merged-build-verification) records the test scope.

### Seeded browser walkthrough (C7–C11)

1. In a fresh normal mock, sign in as `exec` and open **Application review**. Shortlist A01 and A02 and reject A03. Save and publish each screening outcome separately.
2. Follow **Continue to interview schedule** and generate a draft. Give A01 and A02 the same slot with different interviewers and rooms. Use **Check and apply** and **Save Changes**. The overlap should identify both applications. Use **Advance past close** in **Demo controls** and verify that confirmation is refused.
3. Resolve the overlap, save and export the draft, then change A02’s slot again. Verify that approval is disabled while the changed slot is unapplied. Use **Check and apply** and verify that approval stays disabled while the preview is unsaved. Use **Save Changes**, then confirm the schedule. Reopen as `studentA` to see both appointments.
4. Sign in separately as `int-content` and `int-comms`. Verify each sees only the assigned interview and can open its CV. After the Executive uses **Advance past interviews**, submit one assessment for A01 as `int-content`.
5. Open **Results** as `exec`. Save Pass for A01 and Fail for A02, with A02 marked Absent. Verify that `studentA` has no final-result notices before release. Use **Publish campaign results** once, then verify the two distinct notices and their decisions as `studentA`. Verify zero notices as `studentB`.

**Seeded walkthrough checks.** At `5a8e234`, Chrome with a fresh normal mock passed 12 functional check groups, including the C9 regression and the complete walkthrough above. A separate set of 12 layout checks measured one main heading and no horizontal page overflow across four states (C8 conflict, C9 blocked confirmation, C10 recorded assessment and C11 results) at 360, 768 and 1280 px. The Vite build, 14 Node tests and 94 of 94 API examples across 27 operations passed. [Merged-build verification](AI-LOG.md#merged-build-verification)

**Scheduling validation reported in PR #7.** Phúc’s log records the separate confirmation gates, assigned-only interviews and CVs, assessment cases and zero W3C Nu messages on the submitted scheduling and interviewer states. [Member log](docs/ai-logs/phuc.md#pa3)

### Creation-to-release verification (C1–C11)

At `edb3d26`, a production build and one uninterrupted Chrome walkthrough passed on a fresh normal mock. The run began with **Begin creation walkthrough**, published a new campaign, offered four availability windows and created A01 and A02 as separate applications with distinct contact records. It went through screening, schedule conflict resolution, confirmation, assessment and one final publication. Student A received A01 **Pass** and A02 **Fail** as two distinct notices. Student B received zero final-result notices.

The run passed **18 functional check groups**. Separately, **12 layout checks** covered the C8 conflict, C9 blocked confirmation, C10 recorded assessment and C11 results at 360, 768 and 1280 px. W3C Nu checked **26 rendered states** with **zero errors and seven warnings**. [Run scope and warnings](checks/PA3_RELEASE_QA.md)

## Product owner decisions

- The first reply confirmed first-fit order, UTC+7 deadlines and the freeze on the interview date and offered windows after the first accepted submission. [Product owner's first reply](https://www.facebook.com/groups/wad.fit.hcmus/posts/28572271735804960/?comment_id=28728568636841935&reply_comment_id=28731471893218276)
- The second reply clarified which profile fields are prefilled, the requirement to select at least three distinct offered windows, applicant-visible screening and the handling of missing assessments. It confirmed a single campaign-wide final release with each applicant seeing their own results. [Product owner's second reply](https://www.facebook.com/groups/wad.fit.hcmus/posts/28572271735804960/?comment_id=28742432092122256&reply_comment_id=28745446111820854)
- A separate in-app notification for screening rejection remains an open product decision. The implemented owner view shows the released screening outcome and its optional applicant-facing reason. Final release delivers the documented owner notices. [Decisions in the plan](PA3_PLAN.md#decisions-to-verify)

## Libraries

- **React and React DOM** manage views and their local form and request state.
- **React Router** uses browser history for direct routes, protected role navigation and sign-in return.
- **Vite** bundles the client locally and proxies relative API calls in development and preview.
- **Native HTML forms, Fetch and plain CSS** provide form controls, HTTP, downloads and scoped styling without extra libraries.

## Not done

- **No unsaved-change prompt on the schedule screen.** Leaving `/executive/schedule` drops edits that were not saved. The screen says so while a preview is shown.
- **Final packaged-build verification is pending.** The creation-to-release run and rendered HTML checks above used a local production build. The submission archive still needs creation and extraction verification.
