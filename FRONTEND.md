# ClubFlow PA3 Frontend

This guide describes `main` at `a824fa9`, which includes Campaign (C1–C4) and Applications (C5–C7 and C11), together with the scheduling and interviewer feature (C8–C10) from `pa3/phuc-scheduling`. The verification notes below name the build each check ran on.

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
| `/executive/results` | Executive · C11 | Open as `exec`. The board is empty before C9. After confirmation and the interview window, record missing handling and save decisions. Publish once for the campaign and verify the owner's notices. The C8–C10 states can be prepared on the schedule and interviewer screens. | `GET /api/results`, `PUT /api/applications/:id/result`, `POST /api/results/publication` |
| `/unknown-page` | All roles · route fallback | Open an unknown URL and follow View campaign back to `/`. | — |

For a separate creation walkthrough, restart the normal mock, sign in as `exec` and choose **Begin creation walkthrough** under **Demo controls** before the first successful business write. Publish the campaign and save the interview setup before opening the Applicant form. Use another browser profile or a private window to compare published and private states in separate sessions. The Executive can advance the server clock past the close and past interviews without changing the existing records. See the [walkthrough and scheduling cases](PA3_PLAN.md#one-campaign-and-a-reproducible-walkthrough).

**Verification on this checkpoint.** Campaign browser coverage comes from PR #6 and its merged build at `e3e8ad3`. On the merged `bf11be8` build, eight functional check groups passed in Chrome, including valid and duplicate applications, owner scope, filtered paging and stale publication from two Executive tabs. The run also recorded 12 passing layout checks across four screens at 360, 768 and 1280 px. On the same revision, 14 Node tests and 94 contract examples across 27 operations passed. The [merged-build log](AI-LOG.md#merged-build-verification) records the test scope.

**Scheduling checks (C8–C10).** On `pa3/phuc-scheduling`, which contains `main` at `a824fa9`, local Chrome checks covered draft editing and saving, each confirmation blocker on its own, the read-only confirmed state, assigned-only interviews and CVs, and assessments. One walk went from application review to the assessment appearing in Results and both appointments appearing for Student A, using on-screen controls. The tested screens passed layout checks at 360, 768 and 1280 px, and W3C Nu reported no errors on the rendered states that were submitted. The 14 Node tests passed. The [scheduling log](docs/ai-logs/phuc.md) records the scope and the corrections.

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
- **Full C1–C11 browser walkthrough is pending.** The walk with the scheduling screens covered C7 to the assessment in Results and the appointments in C6. It did not repeat C1–C5 or save and publish final results through the UI on the same run.
- **Final release QA is pending.** The checks above cover the stated local Chrome and mock scenarios. The contract checker on the merged build, W3C Nu on the remaining main screens and the final packaged-build verification are still open.
