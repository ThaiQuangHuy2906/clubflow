# ClubFlow PA3 — Team prompt library and actual-prompt register

**CSC13008 · Web Application Development · 24KTPM1**
**Deadline** · 30 November 2026, 22:00 (Vietnam time)
**Maintainer and sole merger** · Thái Quang Huy (24127177)

## A. Proposed implementation prompts — NOT YET EXECUTED

**Example invocation** · `Execute A1 from brief.md on pa3/hoc-applications.`

Select a task to copy its invocation and check its starting condition. To read the full prompt, open this file in the editor and enter the first source line in **Go to Line** (Ctrl+G). Record the actual message, task ID and source revision in the owner's evidence files. [Actual prompts sent](#b-actual-prompts-sent) · [Team plan](PA3_PLAN.md)

| Phase                   | Owner                  | Task index                                                                                                                                                              |
| ----------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Shared baseline         | Thái Quang Huy        | [T1 · API contract](#t1) · [T2 · Mock and contract verification](#t2) · [T3 · Shared React scaffold](#t3)                                                             |
| Campaign                | Thái Quang Huy        | [H1 · Public campaign](#h1) · [H2 · Authentication and role navigation](#h2) · [H3 · Campaign management](#h3) · [H4 · Interview configuration](#h4)                 |
| Applications            | Lê Nguyễn Quốc Học | [A1 · Applicant submission](#a1) · [A2 · My applications](#a2) · [A3 · Executive application review](#a3) · [A4 · Final decisions and notifications](#a4)            |
| Scheduling              | Trần Hoàng Phúc     | [S1 · Draft schedule generation](#s1) · [S2 · Schedule editing and conflict resolution](#s2) · [S3 · Schedule confirmation](#s3) · [S4 · Interviewer workspace](#s4) |
| Integration and release | Thái Quang Huy        | [I1 · PR review and integration](#i1) · [I2 · Final QA and packaging](#i2)                                                                                             |

### Shared baseline · Thái Quang Huy

24127177 · `main`

#### T1

**API contract.** Start after Huy reviews and commits R0.

`Execute T1 from brief.md on main.` · Source lines 740–749

#### T2

**Mock and contract verification.** Start from the reviewed contract commit.

`Execute T2 from brief.md on main.` · Source lines 751–760

#### T3

**Shared React scaffold.** Start after the separate contract and mock commits and a successful full checker run.

`Execute T3 from brief.md on main.` · Source lines 762–770

### Campaign · Thái Quang Huy

24127177 · `pa3/huy-campaign`

#### H1

**Public campaign.** Start from the verified shared baseline.

`Execute H1 from brief.md on pa3/huy-campaign.` · Source lines 772–780

#### H2

**Authentication and role navigation.** Verify the working shared session after H1.

`Execute H2 from brief.md on pa3/huy-campaign.` · Source lines 782–790

#### H3

**Campaign management.** After H2, exercise the pristine creation scenario.

`Execute H3 from brief.md on pa3/huy-campaign.` · Source lines 792–800

#### H4

**Interview configuration.** After H3, connect the saved setup to scheduling.

`Execute H4 from brief.md on pa3/huy-campaign.` · Source lines 802–810

### Applications · Lê Nguyễn Quốc Học

24127044 · `pa3/hoc-applications`

#### A1

**Applicant submission.** Start from the verified baseline with an Applicant-authorized source for club slots.

`Execute A1 from brief.md on pa3/hoc-applications.` · Source lines 812–820

#### A2

**My applications.** After A1, check the two applications owned by Student A.

`Execute A2 from brief.md on pa3/hoc-applications.` · Source lines 822–830

#### A3

**Executive application review.** After A2, review and screen each application independently.

`Execute A3 from brief.md on pa3/hoc-applications.` · Source lines 832–840

#### A4

**Final decisions and notifications.** After A3, publish each decision and verify its notification.

`Execute A4 from brief.md on pa3/hoc-applications.` · Source lines 842–850

### Scheduling · Trần Hoàng Phúc

24127505 · `pa3/phuc-scheduling`

#### S1

**Draft schedule generation.** Start from the verified baseline and the C4 setup contract.

`Execute S1 from brief.md on pa3/phuc-scheduling.` · Source lines 852–860

#### S2

**Schedule editing and conflict resolution.** After S1, distinguish draft edits from the saved schedule.

`Execute S2 from brief.md on pa3/phuc-scheduling.` · Source lines 862–870

#### S3

**Schedule confirmation.** After S2, exercise the four independent confirmation gates.

`Execute S3 from brief.md on pa3/phuc-scheduling.` · Source lines 872–880

#### S4

**Interviewer workspace.** After S3, verify assignment, CV access and assessment eligibility.

`Execute S4 from brief.md on pa3/phuc-scheduling.` · Source lines 882–890

### Integration and release · Thái Quang Huy

24127177 · `main`

#### I1

**PR review and integration.** Inspect the exact baseline and PR heads. Consolidate evidence on integrated main after Huy merges.

`Execute I1 from brief.md on main.` · Source lines 892–901

#### I2

**Final QA and packaging.** Start on clean main after I1 and all three verified merges. Archive creation requires separate authorization.

`Execute I2 from brief.md on main.` · Source lines 903–916

## B. Actual prompts sent

Huy submitted the two requests below in order on 23 November 2026. Expand either record to read the original wording. The follow-up below belongs to R0.

<details>
<summary>Task 0 · Planning and team setup (as displayed in chat)</summary>

```text
# ClubFlow PA3 — Task 0: Planning & Team Setup

You are the technical architect and planning assistant for our ClubFlow PA3 project.

**Repository:** https://github.com/ThaiQuangHuy2906/clubflow

**Scope: PLANNING ONLY. Do not implement application code yet.**

Your objective is to produce a concise, rubric-compliant development plan that allows three team members to work independently on separate Git branches, with Huy responsible for architecture, code review, integration, merging, and final QA.

Prioritize correctness, simplicity, clear file ownership, minimal merge conflicts, and minimal documentation overhead.

## 1. Inspect the official requirements and existing repository

Read these four supplied files from the local workspace:

- `course-materials/PA3-rubric-react-front-end.pdf`
- `course-materials/ClubFlow-final-project-brief.pdf`
- `course-materials/contract-check-README.md`
- `tools/contract-check.mjs`

If filenames differ, locate the corresponding files before proceeding.

The PA3 rubric is authoritative for PA3 grading and deliverables. The final project brief defines the business flow, scope, and Fix these requirements. The contract-check documentation and script define the automated API contract verification behavior.

Do not modify these supplied files.

If any file is missing or cannot be read, report the limitation explicitly. Do not invent requirements or claim to have inspected inaccessible content.

Inspect the existing PA2 repository, especially:

- `index.html`, `review.html`, `schedule.html`
- Existing CSS files and shared design patterns
- `PROTOTYPE.md`
- `AGENTS.md`
- `brief.md`
- `AI-LOG.md`
- Current Git structure and history

Identify which PA2 designs and styles can be reused when migrating to React.

Preserve the existing PA2 Git history. Avoid unnecessarily reading or duplicating large historical documents.

## 2. Team responsibilities and branch ownership

The team has three members, unchanged from PA2.

### Huy — Thái Quang Huy (24127177)

- Team leader and technical architect.
- Owns shared infrastructure, authentication, and C1–C4.
- Reviews and integrates all pull requests.
- Performs final integration testing, QA, and submission preparation.
- Is the only person authorized to merge into `main`.

Branch: `pa3/huy-campaign`

Feature folder:
`client/src/features/campaign/**`

### Học — Lê Nguyễn Quốc Học (24127044)

- Owns C5–C7 and C11.
- Applicant submission and application tracking.
- Executive application review.
- Executive final decisions and result publishing.
- Applicant results and notifications.

Branch: `pa3/hoc-applications`

Feature folder:
`client/src/features/applications/**`

### Phúc — Trần Hoàng Phúc (24127505)

- Owns C8–C10.
- Schedule generation, editing, conflict resolution, and confirmation.
- Interviewer dashboard, assigned CV access, and assessments.

Branch: `pa3/phuc-scheduling`

Feature folder:
`client/src/features/scheduling/**`

### Shared ownership

Huy controls shared infrastructure, including:

- React Router configuration and route guards
- Authentication context and session handling
- Shared API client and API conventions
- Shared layouts and reusable UI components
- Global styles and design tokens
- Vite configuration and dependencies
- `docs/api/**`
- `mock/**`

Each member should primarily modify files inside their assigned feature folder.

Feature-specific components and styles belong inside that feature folder unless explicitly approved as shared.

No member may modify another member's feature, shared infrastructure, API contract, or mock server without approval.

Design the architecture to minimize shared-file edits during parallel development.

## 3. Architecture and contract-first workflow

Plan a simple React application using:

- React + Vite under `client/`
- React Router
- Shared authentication context and hook
- Role-based routes and navigation
- One shared API request layer
- Relative `/api` requests only
- Vite `server.proxy` and `preview.proxy`
- Plain CSS or one approved CSS framework
- Reusable components only where useful

Avoid unnecessary dependencies, abstractions, configuration, and directories.

### Mandatory implementation order

The plan must follow this sequence:

1. All three members review the proposed API design.
2. Write `docs/api/` and commit the contract before implementing code that uses it.
3. Implement `mock/server.mjs` and `mock/data/` using Node.js built-in modules only, then commit the mock separately.
4. Prepare the required Demo accounts table in `FRONTEND.md`.
5. Run the supplied contract checker against a freshly started mock and inspect all FAIL and NOTE output.
6. Create the React/Vite shared scaffold, including the router, authentication, API client, common layouts, and feature entry-point placeholders.
7. Commit the scaffold separately and verify that its production build succeeds.
8. Create the three feature branches from the same approved `main` commit.
9. Implement the assigned features independently.
10. Huy reviews PRs, merges approved changes, and performs integration QA.

**Do not create the three feature branches before the shared baseline is ready.**

### Contract requirements

Plan an API contract that includes:

- `docs/api/README.md` with base path, authentication, consistent error shape, status codes, and complete endpoint table.
- Resource-specific contract files documenting roles, parameters, request field types, required fields, limits, success responses, and applicable errors.
- At least one runnable request/response example per endpoint.
- Correct example execution order, accounting for state changes.
- `Authorization: Bearer {{token:<name>}}` where required, with names matching the Demo accounts table in `FRONTEND.md`.
- A `## Changes` section for approved changes after frontend implementation begins.

The checker must have zero FAIL results. Review NOTE output for inaccurate examples.

Plan a clear location for recording later approved mock changes without creating unnecessary Markdown files.

### Mock requirements

The mock must:

- Run with `node mock/server.mjs`, without npm dependencies.
- Use port 3001 by default, configurable through `PORT`.
- Load deterministic seed data from `mock/data/`.
- Keep changes in memory and reset on restart.
- Implement `normal`, `slow`, `error`, and `empty` modes exactly as the rubric specifies.
- Provide tokens that remain valid across mock restarts.
- Respect role-specific access.
- Match the documented endpoint responses.
- Log method, path, and status for each request.
- Support every required flow state.

The frontend must never depend on undocumented API behavior.

PA4 must be able to replace the mock with Express without changing frontend API calls.

## 4. Plan all C1–C11 steps

Ensure every required step has a clear owner, route, API dependency, and acceptance criteria.

Cover:

- C1: Public campaign and sign-in requirement to apply.
- C2: Demo sign-in, role-specific home, sign-out.
- C3: Campaign draft, preview, dynamic position rows, validation, publication.
- C4: Interviewer assignments, availability, rooms, and slot duration.
- C5: Application submission, PDF <= 5 MB, motivation <= 300 words, availability, duplicate and closed-campaign handling.
- C6: Applicant's own applications, statuses, confirmed schedule, and results.
- C7: Application review, statistics, search, filter, sort, pagination, CSV export, readable drawer, notes, independent decisions.
- C8: Draft scheduling, Proposed/Unassigned/Conflict states, editing, resolution, saving, export.
- C9: Validated schedule confirmation, blocked conflicts/unassigned applications, read-only confirmed state.
- C10: Interviewer's assigned interviews, permitted CV access, one assessment per interview.
- C11: Executive Pass/Fail decisions, publication, applicant result viewing, and in-app notifications.

Preserve the official Student A example:

- A01: Content application.
- A02: Communications application.
- Both belong to the same applicant.
- They must remain independent throughout screening, scheduling, assessment, and final decisions.
- Their interviews must not overlap.

Use one coherent campaign timeline.

Explicitly resolve the demo lifecycle problem:

- Applications can be submitted while the campaign is open.
- Schedule confirmation is allowed only after applications close and all required conditions are met.
- The workflow must remain testable and deterministic.
- Do not bypass business validation merely to make the demo work.

Respect the brief's one-club, one-active-campaign, and one-interview-date scope.

Identify genuine product-owner decisions that require verification. Do not invent decisions or citations. Plan to document any relied-upon product-owner answers with links in `FRONTEND.md`.

## 5. Prevent integration and merge conflicts

Design the shared scaffold before splitting branches.

Define:

1. Exact browser routes and role permissions.
2. Feature entry-point exports.
3. Authentication context and hook interface.
4. Shared API client interface.
5. API response and error conventions.
6. Shared loading, error/retry, and empty-state conventions.
7. Feature-specific component and CSS conventions.
8. Ownership of cross-feature actions.
9. A process for requesting new endpoints, routes, shared components, or dependencies.

All required routes should be registered in the shared scaffold before branching.

Each feature developer should be able to implement their screens inside their assigned folder without editing the central router.

Missing shared functionality must be proposed to Huy, approved, and integrated into the shared baseline before teammates depend on it.

Cross-feature workflows must use the shared contract and API state, not direct imports of another member's internal components or hardcoded business data.

## 6. Minimal documentation

Create **only one new planning Markdown file**:

`PA3_PLAN.md`

It must be the single source of truth for project coordination, containing:

1. Concise architecture and PA2 migration strategy.
2. Proposed folder structure and shared interfaces.
3. C1–C11 ownership and task matrix.
4. Exact file ownership boundaries.
5. Dependencies and acceptance criteria.
6. Contract-first implementation phases.
7. Git branch and PR workflow.
8. Integration and QA checklist.
9. Internal milestones and deadlines.
10. Key risks and unresolved decisions.

Use compact tables, checklists, and actionable tasks. Do not reproduce the entire rubric.

### Update `AGENTS.md`

Replace outdated PA2 static-prototype instructions with concise PA3-wide assistant rules.

Include:

- Respect feature and shared-file ownership.
- Treat `docs/api/` as the API source of truth.
- Never invent undocumented endpoints.
- Stop and report a missing endpoint rather than silently adding one.
- Never change `docs/api/` or `mock/` during feature implementation without explicit authorization.
- Use relative `/api` paths only.
- Do not hardcode API-owned business data.
- Implement loading, error/retry, and empty states.
- Follow the agreed router, auth, API, and CSS conventions.
- Do not add dependencies without approval.
- Preserve semantic HTML, accessibility, and responsive behavior.
- Do not fabricate tests, AI logs, Git history, or review evidence.
- Review actual changes and tests before reporting completion.

Keep `AGENTS.md` short. Reference `PA3_PLAN.md` for detailed responsibilities instead of copying it.

### Update `brief.md`

The PA3 rubric requires `brief.md` to contain the instructions actually given to the assistant, not a retrospective summary.

Replace the PA2 brief with the actual PA3 task instructions supplied so far, beginning with this planning prompt, preserving their wording and order.

Do not invent previous prompts or claim future prompts have already been given.

If the exact original prompt cannot be recovered, state this limitation rather than reconstructing it as a supposed verbatim record.

The PA2 version must remain available through Git history.

Plan to append future real implementation prompts in order.

### Update `AI-LOG.md`

Preserve every existing PA2 entry.

Add a `## PA#3` heading and a truthful entry for this planning task.

Each PA3 task entry should identify:

- Tool and actual request.
- Changed: what the assistant actually changed.
- Checks: what was actually inspected or tested.
- Rejected: changes rejected, if any, and why.
- Corrective instructions, if applicable.

For the full milestone, aim to document at least two genuine assistant mistakes or rejected changes, including the check that detected each and the corrective prompt. Never manufacture mistakes to satisfy the rubric.

Do not claim Huy reviewed or approved this task before he actually does.

### Documentation restrictions

Do not create separate:

- `ARCHITECTURE.md`
- `OWNERSHIP.md`
- `TASKS.md`
- `QA_CHECKLIST.md`
- `WORKFLOW.md`
- Additional summary or planning files

Do not create `FRONTEND.md`, `SELF_ASSESSMENT_REPORT.md`, or `docs/api/*.md` during this planning-only task.

Plan their creation at the appropriate later stages.

Keep all required submission documentation in English.

## 7. Git workflow and quality control

Plan a simple, reviewable Git workflow.

Require:

- Preservation of PA2 commit history.
- Contract committed before mock and frontend API usage.
- Separate meaningful contract, mock, and scaffold commits.
- A clean Git checkpoint before each assistant implementation request.
- Meaningful commits for each step or coherent group of steps.
- Each member using their own Git name and email.
- Development on separate feature branches.
- No direct feature pushes to `main`.
- Huy as the sole reviewer and merger.
- PR review before integration.
- Review of `git diff -- docs/api mock` after assistant implementation tasks.
- Approved contract/mock changes documented in the appropriate `## Changes` section.
- No fabricated or retrospectively reconstructed commit history.

Include practical commands and procedures for:

1. Creating the three branches from the shared baseline.
2. Committing and pushing feature work.
3. Updating a branch from `main`.
4. Opening and reviewing PRs.
5. Handling shared changes and merge conflicts.
6. Merging approved work.
7. Running post-merge integration checks.

Avoid unnecessarily complicated Git workflows for this three-person team.

## 8. QA and grading requirements

Include a concise QA checklist mapped to the rubric.

Plan to verify:

### Main flow and access

- Every C1–C11 step through the app's own links and buttons.
- Correct role-based home screens and access restrictions.
- At least four demo accounts: `exec`, `studentA`, `int-content`, `int-comms`.
- A01 and A02 remaining independent.
- Sign-in redirect back to the originally requested protected route.
- Sign-out clearing authentication state.
- Direct navigation and refresh for every documented route.
- A not-found screen for unknown routes.
- Informative states for routes requiring a later workflow stage.

### API and forms

- All displayed main-flow business data loaded from the API.
- Correct shared state updates without page reloads.
- Loading states under `slow`.
- Retry behavior under `error`.
- Empty lists and zero counts under `empty`.
- No unnecessary repeated requests while loading.
- Debounced or cancellable API-backed search where relevant.
- Field-level validation and API 400 error mapping.
- Preservation of form values after errors.
- Prevention of double submission.
- PDF, motivation, duplicate application, and campaign deadline constraints.

### Scheduling and results

- Valid real conflicts involving applicants, interviewers, or rooms.
- Unassigned applications with understandable reasons.
- Confirmation blocked until all required conditions are satisfied.
- Read-only confirmed campaign/schedule behavior.
- Interviewers accessing only their assigned applications and CVs.
- Applicants accessing only their own applications and results.
- Internal screening notes hidden from Applicants and Interviewers.
- Final Pass/Fail results and in-app notifications.

### UI quality

- Responsive behavior at 360, 768, and 1280 px.
- No unwanted horizontal page scrolling.
- Readable application list and review drawer.
- Buttons and standalone links meeting mobile target-size requirements.
- Semantic landmarks, one `<h1>` per screen, appropriate heading hierarchy, and visible input labels.
- Zero W3C validation errors on rendered main-screen HTML.
- No Fix these issues from the official brief.

### Build and submission

- `npm run build` succeeds.
- `client/dist/` reflects the final code.
- `npx vite preview` works with the mock through `preview.proxy`.
- The production build works without external runtime network dependencies.
- All four mock modes are checked.
- Contract checker runs against a freshly started mock and reports zero FAIL.
- `FRONTEND.md` contains the required team, run instructions, demo accounts, routes, product-owner decisions, libraries, and Not done sections.
- `AI-LOG.md`, `brief.md`, `AGENTS.md`, and `SELF_ASSESSMENT_REPORT.md` satisfy the rubric.
- Git history supports the claimed implementation process.
- The submission ZIP includes `.git/` and `client/dist/`, excludes all `node_modules/`, and contains the repository folder itself.
- The self-assessment uses evidence for every criterion, and the ZIP filename matches its total.

## 9. Timeline

Final deadline:

**Monday, November 30, 2026, 22:00 — Asia/Ho_Chi_Minh.**

Propose the following internal schedule, adjusting only if a dependency requires it:

- November 23: Planning and architecture approval.
- November 24: API contract, mock, and contract verification.
- November 25: Shared React scaffold, baseline verification, and branch creation.
- November 26–28: Independent feature implementation.
- November 28 evening: Feature-completion target.
- November 29: Integration, end-to-end tests, and fixes.
- November 30: Final QA, build, documentation, ZIP verification, and submission.

Reserve November 29–30 primarily for integration and finalization, not initial feature implementation.

## 10. Strict execution boundaries

For this task, you may only create or modify these four Markdown files:

- `PA3_PLAN.md`
- `AGENTS.md`
- `brief.md`
- `AI-LOG.md`

Do not:

- Implement React application code.
- Create API contracts or mock server code.
- Create feature folders or placeholder pages yet.
- Install dependencies.
- Change package or Vite configuration.
- Modify existing PA2 HTML/CSS.
- Modify official reference materials or the checker.
- Create Git branches.
- Commit, push, merge, or open pull requests.
- Create additional Markdown documents.

This is a planning task, not the implementation phase.

Preserve unrelated pre-existing workspace changes. Do not overwrite them.

### Final self-check

Before responding, inspect the actual workspace diff and verify:

- Only the four authorized Markdown files were changed by this task.
- Every C1–C11 step has a responsible owner.
- Feature file boundaries are clear.
- Shared interfaces are planned sufficiently for independent implementation.
- API contract and mock precede frontend integration in the plan.
- The mock lifecycle can support the required scenarios without violating business rules.
- Demo accounts, direct routes, all four mock modes, and contract verification are covered.
- No unsupported assumptions or invented decisions are presented as facts.
- AI logs and Git evidence remain truthful.

If an unresolved issue exists, record it briefly in `PA3_PLAN.md`. Do not create an additional file.

## 11. Final response

After completing the planning task, provide:

1. **Architecture:** Brief overview of the proposed structure.
2. **Ownership:** Compact matrix for Huy, Học, and Phúc.
3. **Changes:** Exact files created or modified.
4. **Risks:** Important unresolved dependencies or decisions.
5. **Review:** What Huy should verify before approval.
6. **Commit:** A suggested Git commit message (do not commit).
7. **Next task:** A concise suggested prompt for Task 1 — API Contract only.

Do not automatically start Task 1.

**Stop after planning. Huy must review and approve the plan before implementation begins.**
```

</details>

<details>
<summary>R0 · Planning corrections and team prompt library</summary>

```text
# ClubFlow PA3 — Execute R0 and install the complete team prompt library

I am Thái Quang Huy, team lead for ClubFlow, CSC13008. Work in my existing repository, preserving its PA2 Git history. The deadline is November 30, 2026 at 22:00 in Asia/Ho_Chi_Minh.

EXECUTE R0 ONLY IN THIS INTERACTION.

This message already contains the complete text of all 17 future tasks. The blocks between BEGIN PROPOSED LIBRARY and END PROPOSED LIBRARY are reference material for you to store in brief.md. Receiving them today authorizes only the R0 documentation work. It does not authorize T1, T2, T3, feature implementation, branch creation, commits, pushes, merges or packaging.

Do not ask me to paste the prompt package again. Do not assume you can see my ChatGPT Work conversation.

================================================================
R0 — TASK 0 CORRECTIONS AND PA3 EVIDENCE SETUP
================================================================

1. Owner and starting point

Owner: Thái Quang Huy, 24127177. Check that I have already selected main. Inspect HEAD, git status --short, staged changes, unstaged changes and untracked files. If another branch is selected, tell me which one and stop before editing. If the four Task 0 files contain uncommitted work, identify and preserve it. Do not reset, stash, discard, stage or commit anyone’s work.

Read the current PA3_PLAN.md, AGENTS.md, brief.md and AI-LOG.md. Inspect the six existing PA2 member files under docs/ai-prompts/ and docs/ai-logs/. Read the available course rubric, ClubFlow final brief, contract-check guide and checker source. Locate equivalent filenames if necessary. Treat the rubric as the grading authority, the final brief as the business authority and the checker code as the authority for automated examples. Record any source you genuinely cannot inspect.

2. Authorized R0 writes

You may edit only:
- PA3_PLAN.md
- AGENTS.md
- brief.md
- AI-LOG.md
- docs/ai-prompts/huy.md
- docs/ai-logs/huy.md

Read Học’s and Phúc’s existing records without editing them. They will append their own PA3 sections on their first tasks. Preserve all existing PA2 entries. Preserve the actual Task 0 prompt already recorded in brief.md verbatim, including its original Markdown escapes. This is a newly authorized documentation task. Keep the original four-file scope of Task 0 historically accurate.

3. Apply these planning corrections where the current documents still need them

- Give each member write access to their own feature folder and their own two evidence files. Huy owns shared infrastructure, contract, mock and root evidence. Only Huy performs merges into main.
- Huy: client/src/features/campaign/**, docs/ai-prompts/huy.md, docs/ai-logs/huy.md.
- Học: client/src/features/applications/**, docs/ai-prompts/hoc.md, docs/ai-logs/hoc.md.
- Phúc: client/src/features/scheduling/**, docs/ai-prompts/phuc.md, docs/ai-logs/phuc.md.
- Update the Git staging guidance so each member includes their own evidence files with their feature changes. Consolidate root evidence after the verified shared baseline and after approved feature merges. Avoid simultaneous edits to Huy’s evidence files on main and his campaign branch.
- In the T1 handoff, require an Applicant-authorized source of club slot IDs for C5 that agrees with C4/C8. Distinguish C8 edit/conflict preview from Save Changes. Require the server to recheck saved assignments and confirmation. Make adding and removing department and position rows explicit in C3.
- For checker endpoint tables, put literal routes before overlapping parameter routes of the same method. In particular, GET /api/applications/export must precede GET /api/applications/:id if both are adopted. The checker credits the first matching row.
- Keep the proposed two-run demo. Use the default seed for direct routes, A01/A02 and the other applicant’s A03. On a separate fresh run, allow one Executive-only start-from-creation action before business writes. Preserve the accounts and catalogues needed for setup, reset the creation IDs deterministically, and create A01 then A02 through real submissions. Sign-in and reads must not consume that opportunity. Advancing the server clock must preserve records, move forward only and never waive a business rule.
- Test the same-applicant overlap with A01/A02. Use a different applicant such as A03 to isolate room and interviewer overlaps. Test each of the four C9 refusal conditions while the other conditions are satisfied.
- T3 supplies working shared auth and all route exports before the split. H2 verifies C2 and completes campaign-owned navigation. A demonstrated shared defect goes through Huy’s shared-change process.
- Keep genuinely unresolved product-owner behavior open. Record a decision in FRONTEND.md later only if the team actually has the relevant source link. Do not invent an answer.

4. Install the complete prompt library

In root brief.md, preserve the existing actual Task 0 prompt. Add this actual R0 request and a clearly identifiable section titled “Proposed implementation prompts — NOT YET EXECUTED”.

Use the exact 17 task blocks supplied below. Keep their IDs, wording and order. Make each task easy to find by ID. You may add an index or headings outside the quoted source. The bounded library inside the verbatim R0 message can serve as the proposed library, so the same large package need not appear twice in brief.md.

A later user may say “Chạy T1 theo brief.md trên main” or “Execute A1 from brief.md”. That authorizes only the named task, subject to its branch and approval gates. At that time:
- Record the exact short message the user genuinely sent.
- Identify the task block actually loaded by task ID, brief.md path and the Git revision used.
- Preserve any genuine modifications or corrective follow-ups verbatim.
- Do not claim the user pasted the long task block a second time.
- If the user actually sends a modified long prompt, record that submitted version.

5. Record real evidence

In docs/ai-prompts/huy.md append a clearly separated PA3 entry for R0. Preserve this entire received message as one actual R0 submission with its embedded reference package. Record task ID, owner, tool, actual branch, date and send time only if known. Mark missing transcript evidence and request the original instead of reconstructing it.

In docs/ai-logs/huy.md append one R0 entry with Tool, Asked for, Kept, Changed, Rejected and checks actually performed. Identify any check that caught an error. If nothing was rejected, say so truthfully and name the checks. Link to the prompt record.

In root AI-LOG.md preserve the PA2 entries above ## PA#3. Preserve the existing Task 0 entry. Consolidate R0 once. The 17 proposed tasks receive no execution entries today.

At release, root brief.md must faithfully show the real messages and the instructions they referenced. Remove any redundant active draft index once it is no longer needed. Preserve the historical R0 message and its clearly labeled reference payload. Unknown send times or cross-branch ordering must remain explicitly unknown.

6. Verify and stop

Inspect all changed paths, staged and unstaged diffs, new files and git diff -- docs/api mock. Compare the original PA2 log portion and Task 0 prompt before and after. Verify that the six PA2 member files survive, only the authorized paths changed through R0, and brief.md contains exactly these 17 future IDs:

T1 T2 T3 H1 H2 H3 H4 A1 A2 A3 A4 S1 S2 S3 S4 I1 I2

Report changed files, actual checks, missing evidence, decisions for Huy and the suggested commit message “docs: align PA3 planning and install team prompt library”. Stop for my review. Do not implement PA3 code or take a Git write action.

======================== BEGIN PROPOSED LIBRARY ========================
STATUS OF ALL 17 BLOCKS AT INSTALLATION: NOT YET EXECUTED

-------------------- T1 — API CONTRACT --------------------

1. Owner — Thái Quang Huy. Write the English API contract for C1–C11.
2. Start — Use clean, already-selected main after Huy has reviewed and committed R0. Record HEAD. Read AGENTS.md, PA3_PLAN.md, official rubric, final brief, checker guide and checker source. Inspect existing contracts and shared interfaces.
3. Writes — Only docs/api/**, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Huy consolidates root evidence at checkpoints. Stop before mock or frontend implementation.
4. Implement — Write docs/api/README.md with /api, Bearer auth, one error shape, statuses and every endpoint’s method, path, allowed roles and resource file. Put overlapping literal routes first. Write one ordered file per resource. Specify caller, path/query, body types, required fields, limits, success and applicable field-level 400, 401, 403, 404, 409 and mode-induced 500. End every file including README with ## Changes. Document the date/what/why policy for later approved contract and mock changes.
   Trace public campaign, auth, draft/publication, setup catalogues, safe Applicant slots, multipart applications, duplicate existing ID, scoped list/detail/CV, statistics, filters, export, private notes, screening, schedule generation/edit/save/confirmation, interviewer eligibility/assessment, per-application decisions and notifications. Specify role projections, locking and the approved demo lifecycle. Preserve A01/A02 independence. Escalate unresolved policy.
5. Check — Give every endpoint a concrete http request followed by its http answer. Use a successful JSON POST login example with email/password. Use Authorization: Bearer {{token:<name>}} with the planned Demo accounts names. Use checker-supported sh curl -F for multipart. For PDF/CSV document status/headers with no example body and plan a separate content check. Trace README first, then files alphabetically, top to bottom, on one fresh normal process. Account for automatic sign-ins, writes, clock changes and deterministic IDs. The checker does not substitute arbitrary earlier response IDs. Compare table and examples in both directions. Report static checks as static.
6. Evidence — In docs/ai-prompts/huy.md record the exact invocation and real follow-ups, task/owner/tool/branch/date, known send times only, and the source revision of any invoked library block. Mark gaps and ask for originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect status, staged/unstaged diffs, new files and git diff -- docs/api mock. Report coverage, decisions and gaps. Suggest “docs: specify the ClubFlow PA3 API contract”. All three members review. Huy makes a separate contract commit before T2. Do not switch branches, commit, push or merge.

-------------------- T2 — MOCK SERVER AND CONTRACT VERIFICATION --------------------

1. Owner — Thái Quang Huy. Implement the approved contract mock.
2. Start — Use clean main after the reviewed T1 contract commit. Record HEAD. Read AGENTS.md, PA3_PLAN.md, the committed docs/api examples, checker/guide and existing shared interfaces.
3. Writes — Only mock/server.mjs, mock/data/**, the Demo accounts section of FRONTEND.md, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Use Node built-ins only. A contract amendment requires Huy’s separate approval and recorded change.
4. Implement — node mock/server.mjs, PORT default 3001, deterministic seeds, in-memory writes, reset on restart, one method/path/status line per request. Provide stable role-bound tokens that survive restart. Add the English Demo accounts table with Name in examples, Role, E-mail or User name, Password, including exec, studentA, int-content and int-comms.
   Implement normal about 150 ms, slow about 2 s, error as a shaped 500 for every request except sign-in, and empty as recursively empty lists with zero list-derived totals while singleton records still resolve. Enforce the approved roles, privacy projections, PDF/motivation limits, deadlines, schedule rules, confirmation locks, assigned completed-interview assessments and publication notifications. Serve readable authorized demo PDFs. Implement both approved demo stories with collision-free IDs, one-shot pristine creation and forward-only clock. Reads and logins must preserve pristine state.
5. Check — Before every full checker run restart the normal mock. From root run node tools/contract-check.mjs --base http://localhost:3001. Report actual examples, endpoint coverage, exit code and every FAIL/NOTE with disposition. Correct mock defects against the contract. Also exercise four modes, token reuse after restart, closed/duplicate submissions, all four C9 gates, locked writes, private records, early/duplicate assessment and repeated publication. Open the PDF and inspect CSV content, MIME and audience. Separate these results from checker output.
6. Evidence — Record exact T2 invocation/follow-ups and their source revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks, including failed runs.
7. Finish — Inspect status, staged/unstaged diffs and git diff -- docs/api mock. Report changed files, commands, results and open issues. Suggest “feat: implement and verify the stateful ClubFlow mock”. Huy makes the separate mock checkpoint. Do not switch branches, commit, push or merge.

-------------------- T3 — SHARED REACT/VITE SCAFFOLD --------------------

1. Owner — Thái Quang Huy. Deliver the shared baseline.
2. Start — Use clean main after separate contract/mock commits, working demo accounts and successful full T2 verification. Record HEAD. Read AGENTS.md, PA3_PLAN.md route/export matrix, approved docs/api and existing shared interfaces.
3. Writes — Agreed client/ Vite entry/config, packages and lockfile, shared src files, and the three feature index placeholders. Build output may be generated under client/dist/. Write docs/ai-prompts/huy.md and docs/ai-logs/huy.md. At this checkpoint Huy may consolidate actual T1–T3 in root brief.md and AI-LOG.md. Use the approved React/Vite/React Router/plain CSS stack.
4. Implement — Register every planned route, named export, role home, link, access-denied view, early-stage message and unknown-route fallback. Implement a working single e-mail/text input, password and submit sign-in. Restore the one session context before guards run. Preserve authorized local return paths including query/fragment, distinguish 401/403, and clear private state on sign-out. Implement the agreed auth hook and relative /api client with Bearer, JSON, FormData, authenticated PDF/CSV blobs, cancellation and field errors. Supply shared loading, Retry and empty components, semantic layouts, CSS conventions and both server.proxy and preview.proxy for /api to http://localhost:3001. Expose approved Executive demo controls in the agreed location. Leave complete feature flows to the owners.
5. Check — In client/ run npm ci, exercise npm run dev, run npm run build, then test that dist with npx vite preview. Check both proxies, all exports and routes, every demo login, protected return, wrong role, direct load, refresh, Back, sign-out and unknown path. Smoke-test data states and the shell at 360/768/1280. Identify placeholders honestly.
6. Evidence — Record exact T3 invocation/follow-ups and invoked revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Request originals for gaps. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/detected errors.
7. Finish — Inspect all diffs including staged work and git diff -- docs/api mock. Report actual shared exports, routes, commands and gaps. Suggest “feat: establish shared React routing and API baseline”. Huy commits, verifies that exact SHA and publishes it as the baseline. Do not create/switch branches, commit, push or merge.

-------------------- H1 — C1 PUBLIC CAMPAIGN --------------------

1. Owner — Thái Quang Huy.
2. Start — Verify clean pa3/huy-campaign starts at the approved baseline SHA. Read AGENTS.md, PA3_PLAN.md C1, approved docs/api and actual router/auth/API/UI exports.
3. Writes — Only client/src/features/campaign/**, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Huy handles root evidence at checkpoints. Keep existing dependencies. Report missing shared/contract support.
4. Implement — Fetch the published campaign through the shared relative /api client. Render description, dates, instructions, departments, positions, quotas, descriptions and requirements. Give the screen its own title. Link Apply to the selected protected position route so a Visitor signs in and returns there. Provide a useful unpublished/empty state and keep draft data private.
5. Check — Seeded and unpublished campaign, two position links, direct load, refresh, Back, Visitor-to-Applicant return, slow loading, error/Retry, empty state and semantic layout at 360/768/1280. Identify any C5 destination still represented by a placeholder.
6. Evidence — Append exact H1 invocation/follow-ups and invoked revision to docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect status, staged/unstaged diffs and git diff -- docs/api mock. Report paths, results and gaps. Suggest “feat: display published campaign and position links”. Do not switch branches, commit, push or merge.

-------------------- H2 — C2 AUTHENTICATION AND ROLE NAVIGATION --------------------

1. Owner — Thái Quang Huy.
2. Start — Use clean pa3/huy-campaign after reviewed H1. Read AGENTS.md, PA3_PLAN.md C2, approved auth contract and actual T3 auth/router/API interfaces. Exercise the baseline first.
3. Writes — Only client/src/features/campaign/**, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Route a demonstrated shared auth/router defect to Huy’s separate shared-change checkpoint. Root evidence is Huy-controlled. Keep existing dependencies.
4. Implement — Complete campaign-owned navigation using the existing single session context and API-issued identity. Verify sign-in/out, role homes, authorized protected return, forbidden-role behavior and session restoration. Use relative /api. Keep form labels, inline errors, retained input, pending-submit protection and responsive navigation. If T3 already implements a behavior correctly, retain and test it.
5. Check — Sign in as exec, studentA, int-content and int-comms. Test invalid credentials, protected deep link with query, refresh, Back, wrong role, invalid session, sign-out and account switch. Verify Bearer on authenticated requests and absence of prior-account data.
6. Evidence — Record exact H2 invocation/follow-ups and invoked revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect status, staged/unstaged diffs and git diff -- docs/api mock. Report verified behavior, changes and unresolved shared defects. Suggest “test: verify role sign-in and protected navigation”, adjusted if feature code changed. Do not switch branches, commit, push or merge.

-------------------- H3 — C3 CAMPAIGN MANAGEMENT --------------------

1. Owner — Thái Quang Huy.
2. Start — Use clean pa3/huy-campaign after reviewed H2. Read AGENTS.md, PA3_PLAN.md C3/lifecycle, approved docs/api and actual shared interfaces.
3. Writes — Only client/src/features/campaign/**, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Keep root evidence for Huy’s checkpoints. Use approved dependencies and report missing interfaces.
4. Implement — Build the Executive form for campaign name, host club, description, opening/closing dates, instructions and dynamic departments/positions with quotas, descriptions and requirements. Add/remove either row type without losing unrelated values/errors. Save as Draft, reopen persisted data, preview current form values and publish valid data via relative /api. Apply the appropriate draft/publication rules, map field errors, retain inputs and block duplicate submits. Respect the C9 lock and link to review for the same campaign.
5. Check — Use the approved pristine story. Test missing nested fields, impossible dates, row removal, save/reopen, preview and publish. Verify the public view reflects API state and publishing creates no applications. Check double-submit, loading/Retry/empty, read-only state and three widths.
6. Evidence — Record exact H3 invocation/follow-ups and invoked revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Label gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report files, scenario results and gaps. Suggest “feat: manage campaign drafts, preview and publication”. Do not switch branches, commit, push or merge.

-------------------- H4 — C4 INTERVIEW CONFIGURATION --------------------

1. Owner — Thái Quang Huy.
2. Start — Use clean pa3/huy-campaign after reviewed H3. Read AGENTS.md, PA3_PLAN.md C4/C8, approved docs/api and actual auth/API/UI/feature exports.
3. Writes — Only client/src/features/campaign/**, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Root evidence is Huy-controlled. Keep existing dependencies and report missing contract/shared support.
4. Implement — Build the Executive setup form from the documented relative /api catalogue. Assign interviewers to one or more positions, enter availability on the campaign’s one interview date, select existing rooms and set one common 15/20/30-minute duration. Save and reopen authoritative settings. Honor the approved behavior when duration changes and when the schedule is confirmed. Preserve labels, field errors, entered values, pending protection and loading/Retry/empty states.
5. Check — Multiple qualifications, invalid/valid availability, chosen rooms, each duration, save/reopen, role denial and confirmed lock. Read the resulting slot, room, position and interviewer IDs through C8’s documented operation. Test three widths and distinguish an API handoff from an integrated UI test.
6. Evidence — Record exact H4 invocation/follow-ups and invoked revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report changed files, handoff evidence and gaps. Suggest “feat: configure campaign interviewers, availability and rooms”. Do not switch branches, commit, push or merge.

-------------------- A1 — C5 APPLICANT SUBMISSION --------------------

1. Owner — Lê Nguyễn Quốc Học, 24127044.
2. Start — Verify clean pa3/hoc-applications starts at the approved baseline SHA. Read AGENTS.md, PA3_PLAN.md C5, approved docs/api and actual protected route, upload client, auth and UI interfaces.
3. Writes — Only client/src/features/applications/**, docs/ai-prompts/hoc.md and docs/ai-logs/hoc.md. Huy owns shared files and both root evidence files. Keep existing dependencies and report missing fields/operations.
4. Implement — Build the labeled form with student information, selected position, PDF CV, motivation and available club slots from the Applicant-authorized API. Before sending reject non-PDF, files over 5 MB and statements over 300 words. Use shared relative /api FormData with browser-generated boundary. Map field errors, retain valid input and prevent duplicate writes. A duplicate opens the existing returned application ID. A closed-campaign error keeps the populated form on screen.
5. Check — In pristine creation submit Content then Communications as Student A and verify separate A01/A02. Repeat a position and open its existing record. Test the exact size limit, one byte over, non-PDF, 300/301 words, unavailable slots, and an unused position whose form is opened before closure and submitted afterward. Check request count, role, data states and three widths.
6. Evidence — Record exact A1 invocation/follow-ups and invoked revision in docs/ai-prompts/hoc.md with owner/tool/branch/date and known times only. Label gaps and request originals. Link docs/ai-logs/hoc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report files, tested limits and gaps. Suggest “feat: submit validated per-position applications”. Do not switch branches, commit, push or merge.

-------------------- A2 — C6 MY APPLICATIONS --------------------

1. Owner — Lê Nguyễn Quốc Học.
2. Start — Use clean pa3/hoc-applications after reviewed A1. Read AGENTS.md, PA3_PLAN.md C6/C9/C11, approved docs/api role projections and actual auth/router/API/UI exports.
3. Writes — Only client/src/features/applications/**, docs/ai-prompts/hoc.md and docs/ai-logs/hoc.md. Huy owns shared files and root evidence. Keep dependencies and report missing interfaces.
4. Implement — Load the signed-in Applicant’s list and directly addressable detail via relative /api. Show one row per application, position and screening status. Show personal interview time/room only after confirmation and an individual result only after publication. Keep A01/A02 independent and internal notes private. Provide informative early, loading, Retry, empty, forbidden and missing states.
5. Check — As Student A open A01/A02 directly, refresh and use Back. Check denial for seeded A03. Exercise screening statuses, before/after confirmation and before/after publication. Verify a private sibling result stays hidden, empty counts are zero and layouts work at three widths. A4 owns publication and notifications.
6. Evidence — Record exact A2 invocation/follow-ups and invoked revision in docs/ai-prompts/hoc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/hoc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report paths, ownership/stage checks and gaps. Suggest “feat: show applicant-owned applications and confirmed schedules”. Do not switch branches, commit, push or merge.

-------------------- A3 — C7 EXECUTIVE APPLICATION REVIEW --------------------

1. Owner — Lê Nguyễn Quốc Học.
2. Start — Use clean pa3/hoc-applications after reviewed A2. Read AGENTS.md, PA3_PLAN.md C7/C8, approved review/list/CV/export contracts and actual shared exports.
3. Writes — Only client/src/features/applications/**, docs/ai-prompts/hoc.md and docs/ai-logs/hoc.md. Huy owns shared files and root evidence. Keep existing dependencies and report missing operations.
4. Implement — Show API-derived application and distinct-applicant statistics. Implement search/filter/sort/pagination and full filtered CSV export. Keep filter/page state when the drawer closes. Keep the list and drawer readable with the CV and motivation statement. Use authenticated relative /api downloads. Add private Executive notes and per-application Shortlist Candidate/Reject. Update from the authoritative response or one refetch. Link to C8 when the campaign has at least one shortlisted application. Respect the confirmed lock, field errors and pending writes.
5. Check — Counts across pages, debounced/cancelled search, preserved filters, actual CSV contents, readable CV, note privacy and independent screening of A01/A02. Check C8 eligibility, slow/error/Retry/empty modes, keyboard operation and drawer/list readability at all three widths.
6. Evidence — Record exact A3 invocation/follow-ups and invoked revision in docs/ai-prompts/hoc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/hoc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report paths, handoff, tests and gaps. Suggest “feat: review and screen individual campaign applications”. Do not switch branches, commit, push or merge.

-------------------- A4 — C11 FINAL DECISIONS AND NOTIFICATIONS --------------------

1. Owner — Lê Nguyễn Quốc Học.
2. Start — Use clean pa3/hoc-applications after reviewed A3. Read AGENTS.md, PA3_PLAN.md C6/C10/C11, approved docs/api, verified product decisions and actual shared interfaces.
3. Writes — Only client/src/features/applications/**, docs/ai-prompts/hoc.md and docs/ai-logs/hoc.md. Huy owns shared files and root evidence. Keep dependencies and report missing policy or operations.
4. Implement — Load eligible applications and authorized assessment information on the Executive results route. Save Pass/Fail per application through shared relative /api. Keep a saved decision private until explicitly published. Reuse A2’s Applicant list/detail for results and show the owner’s in-app notifications. Use server publication state so retries and double-clicks do not duplicate notifications. Preserve role guards, form errors, pending protection and loading/Retry/empty.
5. Check — Save different outcomes for A01/A02. Publish only A01, inspect both details and notifications, retry publication, then publish A02. Verify exactly one notification per publication and no cross-applicant disclosure. Test direct routes, refresh and three widths. Identify API-only checks pending C10 integration.
6. Evidence — Record exact A4 invocation/follow-ups and invoked revision in docs/ai-prompts/hoc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/hoc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report files, publication observations and gaps. Suggest “feat: publish per-application results and notifications”. Do not switch branches, commit, push or merge.

-------------------- S1 — C8 DRAFT SCHEDULE GENERATION --------------------

1. Owner — Trần Hoàng Phúc, 24127505.
2. Start — Verify clean pa3/phuc-scheduling starts at the approved baseline SHA. Read AGENTS.md, PA3_PLAN.md C4/C7/C8, approved docs/api and actual scheduling/auth/API/UI interfaces.
3. Writes — Only client/src/features/scheduling/**, docs/ai-prompts/phuc.md and docs/ai-logs/phuc.md. Huy owns shared files and root evidence. Keep dependencies and report missing operations.
4. Implement — Build the Executive generation form for the single interview date, time window and common 15/20/30-minute duration. Read actual C4 qualifications, availability and rooms through the shared relative /api client. Use the approved setup operation when duration changes. Generate a draft for shortlisted applications using the agreed first available slot/interviewer/room order. Render Proposed, Unassigned with reason and genuine Conflict naming the overlap. Show correct totals and export the represented schedule.
5. Check — No shortlisted records, valid generation, unavailable qualification/time/room and a real conflict created through the approved fixture or edit operation. Verify totals, exclusion of rejected applications and CSV contents. Test validation, double-submit, loading/Retry/empty and a locally scrollable table at three widths. S2 owns Edit/Resolve/Assign/Save.
6. Evidence — Record exact S1 invocation/follow-ups and invoked revision in docs/ai-prompts/phuc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/phuc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report files, observed states/export and gaps. Suggest “feat: generate and export shortlisted interview drafts”. Do not switch branches, commit, push or merge.

-------------------- S2 — C8 SCHEDULE EDITING AND CONFLICT RESOLUTION --------------------

1. Owner — Trần Hoàng Phúc.
2. Start — Use clean pa3/phuc-scheduling after reviewed S1. Read AGENTS.md, PA3_PLAN.md C8/demo scenarios, approved docs/api preview/save rules and actual shared/scheduling interfaces.
3. Writes — Only client/src/features/scheduling/**, docs/ai-prompts/phuc.md and docs/ai-logs/phuc.md. Huy owns shared files, contract, mock and root evidence. Keep dependencies and report missing support.
4. Implement — Add Edit, Resolve and + Assign Slot for the selected application. Use API-owned people, qualifications, availability, rooms, duration and window. Recheck after each edit through the approved preview design. Identify both affected interviews and the shared applicant, interviewer or room. Explain an unassignable row. Keep unsaved edits separate from Save Changes. Persist via the documented relative /api operation and display the server-revalidated draft. Preserve failed input, inline errors, pending protection and the confirmed lock.
5. Check — Put A01/A02 in the same interval with different qualified interviewers and rooms. Verify the applicant conflict on both, then move one to an adjacent nonoverlapping interval. Use A03 or another distinct applicant to isolate an interviewer collision and a room collision separately. Test unavailable combinations, repair, save/reopen, failed save, data states and three widths.
6. Evidence — Record exact S2 invocation/follow-ups and invoked revision in docs/ai-prompts/phuc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/phuc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report changed files, separate collision results and gaps. Suggest “feat: edit and resolve interview slot conflicts”. Do not switch branches, commit, push or merge.

-------------------- S3 — C9 SCHEDULE CONFIRMATION --------------------

1. Owner — Trần Hoàng Phúc.
2. Start — Use clean pa3/phuc-scheduling after reviewed S2. Read AGENTS.md, PA3_PLAN.md C9/lifecycle, approved confirmation/lock contract and actual shared interfaces.
3. Writes — Only client/src/features/scheduling/**, docs/ai-prompts/phuc.md and docs/ai-logs/phuc.md. Huy owns shared files and root evidence. Keep dependencies. Send cross-owner defects to Huy.
4. Implement — Summarize the saved draft and explain blockers. Confirmation requires applications closed, every application reviewed, one qualified available assignment for every shortlisted application and no applicant/interviewer/room conflict. Identify offending IDs where applicable. Use the server’s decision through relative /api. Handle unsaved edits and prevent double confirmation. Show Confirmed and disable assignment, editing and regeneration. Keep the confirmed schedule viewable while assessment and final decisions proceed separately.
5. Check — Isolate each of the four refusal conditions with the other three satisfied. Record the actual reason/IDs. Repair and save the draft, confirm, refresh and exercise the documented locked writes. Verify personal schedules become visible to the correct roles and confirmation publishes no result. Test loading/Retry/empty, accessible summary and three widths. Identify API-only cross-feature observations.
6. Evidence — Record exact S3 invocation/follow-ups and invoked revision in docs/ai-prompts/phuc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/phuc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report files, each gate, lock checks and gaps. Suggest “feat: enforce schedule confirmation and read-only state”. Do not switch branches, commit, push or merge.

-------------------- S4 — C10 INTERVIEWER WORKSPACE --------------------

1. Owner — Trần Hoàng Phúc.
2. Start — Use clean pa3/phuc-scheduling after reviewed S3. Read AGENTS.md, PA3_PLAN.md C10/C11, approved interview/CV/assessment contract, verified field decisions and actual shared exports.
3. Writes — Only client/src/features/scheduling/**, docs/ai-prompts/phuc.md and docs/ai-logs/phuc.md. Huy owns shared files and root evidence. Keep dependencies and report missing policy or operations.
4. Implement — Build the Interviewer home and direct interview detail using authenticated relative /api. Show only the signed-in interviewer’s confirmed assignments and authorized CVs. Provide an informative pre-confirmation state. Keep screening notes private. Offer the approved labeled assessment form for an assigned, completed interview. Map field errors, retain input, prevent double submit and show the recorded assessment.
5. Check — Use int-content and int-comms. Verify assigned list/detail/readable CV, denial for another interviewer’s ID/CV, early assessment refusal, success after that interview ends and duplicate refusal. Confirm the assessment attaches to the application C11 reads. Exercise refresh, Back, loading/Retry/empty and three widths.
6. Evidence — Record exact S4 invocation/follow-ups and invoked revision in docs/ai-prompts/phuc.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/phuc.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection.
7. Finish — Inspect staged/unstaged diffs and git diff -- docs/api mock. Report changed files, tested roles/eligibility and gaps. Suggest “feat: add assigned interviewer workspace and assessments”. Do not switch branches, commit, push or merge.

-------------------- I1 — PR REVIEW, INTEGRATION AND EVIDENCE CONSOLIDATION --------------------

1. Owner — Thái Quang Huy. Only Huy authorizes and performs merges into main.
2. Start — Read AGENTS.md, PA3_PLAN.md Git/handoffs, approved docs/api, actual shared exports and all member evidence. Verify the frozen baseline, branch ancestry, each exact PR head and current main. Use refs or checkouts already selected by Huy.
3. Writes — Review feature code read-only. On Huy’s integrated main write only brief.md, AI-LOG.md, docs/ai-prompts/huy.md and docs/ai-logs/huy.md. Feature owners fix their own work. Integrate Huy’s campaign records before adding further Huy entries on main.
4. Review — Compare each PR with the baseline. Inspect ownership, dependency/shared changes, undocumented operations, contract/mock drift, hardcoded data, relative /api, auth/privacy, state behavior, forms and responsive semantics. Compare member records with actual diffs. Give each finding a revision, file, observed behavior and reproduction/check. Recheck the latest head after corrections. Prepare findings for Huy without posting or merging.
   After Huy performs a merge, verify its real SHA, build on updated main and test the available C1→C5, C4/C7→C8, C9→C6/C10 and C10→C11→Applicant handoffs. Repeat the complete flow after the last merge. Distinguish integrated UI evidence from branch/API-only checks.
5. Consolidate — At approved checkpoints append real invocations and genuine corrections to root brief.md. Under ## PA#3 in root AI-LOG.md maintain one factual entry per actual task. Link member records, preserve PA2, retain known conversation order and disclose uncertain cross-branch ordering. Verify approved contract/mock changes have dated ## Changes entries. Refer to library blocks precisely when the user invoked a task by ID.
6. Evidence — Record exact I1 invocation/follow-ups and invoked revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Label gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and actual checks/error detection. Update the same I1 task entry as real merges occur.
7. Finish — Inspect PR/merge diffs, status, staged/unstaged changes and git diff -- docs/api mock. Report reviewed SHAs, observed merges, findings, fixes and gaps. Suggest “docs: consolidate reviewed PA3 features and evidence”. Do not post reviews, switch branches, commit, push or merge on Huy’s behalf.

-------------------- I2 — FINAL QA, SELF-ASSESSMENT AND PACKAGING --------------------

1. Owner — Thái Quang Huy. Verify the actual release.
2. Start — Use clean main after I1 and all three verified merges. Record HEAD. Read AGENTS.md, PA3_PLAN.md release checks, official rubric/final brief, approved docs/api, checker/guide, actual interfaces, templates, existing SELF_ASSESSMENT_REPORT.md and member evidence.
3. Writes — Required English release documents FRONTEND.md, brief.md, AI-LOG.md, SELF_ASSESSMENT_REPORT.md, Huy’s docs/ai-prompts/huy.md and docs/ai-logs/huy.md, and generated client/dist/. Return source defects to their owners and verify the corrected revision. Add no dependencies or separate planning documents.
4. Verify the product — In client/ run npm ci, check npm run dev and run npm run build after the final source change. Serve that exact dist with npx vite preview and the mock through preview.proxy. Exercise the app with external runtime network blocked. Walk C1–C11 through the app’s own links/buttons using the four demo accounts, the direct seed and the pristine creation story.
   Check A01/A02 independence, duplicate and closed applications, private notes, filters, authorized readable CV and CSV, three genuine conflict types, four C9 blockers, read-only confirmation, completed assigned assessments, per-application publication and nonduplicated notifications. Exercise normal, slow, error and empty. Verify request counts/debounce, loading, same-tab Retry after a normal restart, nested empty lists, available singleton records and zero totals.
   Direct-open and refresh every documented route at 360/768/1280. Check stage-specific messages, unknown routes, role return/denial, Back, sign-out, linked field errors, retained input and double-submit. Verify standalone targets at least 44 px tall at 360, no page overflow, table-only scrolling, readable drawer/list, landmarks, titles, headings, labels and keyboard access. Check all eight Fix these items. Run W3C Nu on rendered HTML from the main screens and record real results.
   Restart the normal mock and run the full checker. Record examples, endpoint coverage, exit, FAIL and NOTE details. Separately check file contents, role access, contract coverage of browser requests and dated ## Changes. Inspect git log --graph --all and path history for contract before mock before consumers, step checkpoints and actual authorship.
5. Verify the submission — Complete FRONTEND.md sections Team, How to run it, Demo accounts, Routes, Product owner decisions, Libraries, Not done. Use concrete seeded route paths, roles, C-steps, endpoints and stage requirements. Cite actual product-owner links only.
   Reconcile root brief.md with actual messages and invoked task revisions. Preserve Task 0 and the historically labeled R0 package. Keep one factual AI log entry per actual PA3 task and preserve PA2 above it. Update the existing SELF_ASSESSMENT_REPORT.md with names/IDs, nine actual PA3 criteria and maxima 25/10/10/10/15/5/10/10/5, claimed marks and concrete evidence per row, total, “What I did not manage” and “What I would do differently”. Obtain the team’s real score decision.
   Only when Huy explicitly authorizes creating and inspecting the archive, package the repository folder itself outside the repository as 24127044-24127177-24127505_<actual-total>.zip. Include hidden .git/, final client/dist/, source, mock, contract, rules and required documents. Exclude every node_modules/. Inspect entries, extract separately, verify history and run the extracted build against the mock. Compare the filename total with the report. Leave submission to the designated student.
6. Evidence — Record exact I2 invocation/follow-ups and invoked revision in docs/ai-prompts/huy.md with owner/tool/branch/date and known times only. Mark gaps and request originals. Link docs/ai-logs/huy.md with Tool, Asked for, Kept, Changed, Rejected and real checks/detected errors. Consolidate I2 in root evidence. Put final archive checks performed after the document freeze in the release handoff.
7. Finish — Inspect status, final build revision, staged/unstaged diffs and git diff -- docs/api mock. Report observed QA results, evidence, score status, incomplete work and archive status. Suggest “chore: finalize verified PA3 build and submission evidence”. Do not switch branches, commit, push, merge or submit.

========================= END PROPOSED LIBRARY =========================

For this interaction, return to the R0 instructions at the top. Complete the documentation setup, verify that all 17 future task blocks are present, report the R0 diff and stop for Huy’s review.
```

</details>

### R0 follow-up — presentation of the team brief

[Member prompt record](docs/ai-prompts/huy.md#r0-follow-up) · [Member log](docs/ai-logs/huy.md#r0) · [Root log](AI-LOG.md)

```text
Đây là follow-up của R0 về cách trình bày `brief.md`. Hãy dùng `git log --follow -- brief.md` để tìm và đọc **bản thư viện prompt khởi đầu của PA2**, rồi lấy bố cục thực tế của bản đó làm mẫu cho PA3.

Viết phần hướng dẫn bằng tiếng Anh. Đặt tiêu đề, một ví dụ gọi task và mục lục đủ 17 task ở đầu file. Nhóm theo giai đoạn và người phụ trách để mỗi thành viên tìm được ngay prompt của mình. Đặt hai bản ghi Task 0 và R0 trong các mục có thể thu gọn bằng `<details>`. Giữ nguyên từng byte của hai bản ghi, kể cả dấu escape, và chỉ giữ một bản đầy đủ của gói 17 prompt trong `brief.md`.

Kiểm tra Markdown Preview, các liên kết và nội dung nguyên văn trước/sau. Ghi nhận tin nhắn này là follow-up thật của R0 theo `AGENTS.md`. Dừng ở diff để Huy duyệt trước khi commit hoặc chạy T1.
```
