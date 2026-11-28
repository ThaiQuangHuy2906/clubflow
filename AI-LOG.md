# ClubFlow PA#2 — consolidated AI log

This English integration log consolidates existing task records and the final QA session. Original records remain in [Huy's log](docs/ai-logs/huy.md), [Học's log](docs/ai-logs/hoc.md) and [Phúc's log](docs/ai-logs/phuc.md). Their historical “not yet integrated” statements describe earlier stages; final status is in [QA](checks/QA.md). Available actual prompts and transcript gaps are in [brief.md](brief.md). Missing conversations, tests, commits and authors have not been reconstructed.

## 2026-11-08 — HUY-SETUP: shared foundation

**Tool:** Codex, PowerShell/Python, cached Playwright CLI 0.1.23 and Chrome. Exact Codex model/version not independently recorded.

**Asked for:** Create shared CSS and its contract on `main` before screen branches, under the common contract. [Actual prompts, entries 1–2](docs/ai-prompts/huy.md).

**Kept:** Plain local CSS, six spacing tokens, system fonts, native controls, 44px targets, focus outlines, fluid grids and table-only scrolling.

**Changed:** Created `css/styles.css` and its contract. At 768px a temporary fixture's two datetime-local fields lost their time segments in a narrow nested grid, although document overflow was false. Visual inspection caught this. Added container-aware `.grid--fields` and `--field-min: 16rem`, then inspected corrected captures. Details are in Huy's original log; commit `39ad2e5`.

**Rejected:** The narrow two-column native-date arrangement. No user rejection was recorded. Component checks were not presented as final three-screen evidence.

## 2026-11-08 — HUY-01: Create Recruitment Campaign

**Tool:** Codex and local browser tools.

**Asked for:** Only Screen 1 and Huy's branch logs, using shared CSS and the four-position fixture. [Actual prompts, entries 3–5](docs/ai-prompts/huy.md).

**Kept:** Native required/min/step constraints and previews, disabled Save/Publish, relative Applications link and canonical dates/quotas.

**Changed:** Created the screen. Huy's W3C File Upload screenshot exposed a real assistant error: the required duration select lacked an empty first option. Added `<option value="">Chọn thời lượng</option>` while preserving `required` and selected 20 minutes. Retested native `valueMissing`; Huy later supplied a successful File Upload result. Native validity and a generic parser had not detected the HTML conformance defect. Screen commit `c9c2f11`, merge `a5587fa`, initial evidence `c0b5867`.

**Rejected:** Removing `required` to suppress the error, fake publication/persistence and inventing a sibling page. Earlier HTTP 403 attempts were logged as blocked checks. The successful validator result is user-run evidence, not an assistant upload.

## 2026-11-08 to 2026-11-09 — HOC-01: Application Review

**Tool:** Codex as recorded by Học; exact version not recorded. Initial `file://`, original PDF and validator access were unavailable in his environment; source checks and user-provided results were distinguished.

**Asked for:** Implement Screen 2 on his branch, finish QA and address Huy's feedback. [Prompts](docs/ai-prompts/hoc.md), [original log](docs/ai-logs/hoc.md).

**Kept:** Eight applications/seven students, A01/A02 independence, 5/3/0 statuses, in-flow details, labels and shared-first CSS. Search/filter/sort/export/pagination remain disabled illustrations.

**Changed:** Initial screen `cb20354`. Huy found missing note/decision controls and no readable CV preview. Học added eight labeled textareas, disabled per-application Shortlist/Reject groups, an illustrative ST01 HTML CV and A02's link to it. Fixes/screenshots `f1dbff3`, handoff `5c88880`, Huy's PR #2 merge `4c90e73`.

**Rejected:** An unavailable-CV paragraph as a completed preview, recorded statuses as sufficient action controls, and claims that sample Executive notes enforce authorization. Học's log also records old-parser diagnostics and a CSS-token scan false alarm corrected as tooling issues, not product failures.

## 2026-11-08 to 2026-11-09 — PHUC-01: Interview Scheduling

**Tool:** Claude Code; Phúc records Claude Sonnet 5.5. This model metadata comes from his log and was not independently verified here. His tools included Playwright and Nu HTTP POST.

**Asked for:** Read the repo, implement his screen/branch, capture evidence, then fix Huy's review findings. Actual messages differ from unused PROMPT 04. [Prompts](docs/ai-prompts/phuc.md), [original log](docs/ai-logs/phuc.md).

**Kept:** Five shortlisted records, genuine A01/A03 overlap, A05 availability mismatch, blocked confirmation and separate resolved illustration.

**Changed:** Visual checks caught broken table/button words and a clipped dropdown label. Huy additionally reproduced Edit A01/A04 opening an A03 form and found missing interviewer configuration. Phúc added per-application fieldsets and labeled position/availability controls while retaining the draft. Commits `436dfaa`, `8c48d3d`, `63cda2d`, `e1fe272`, `941aa15`; Huy's PR #3 merge `fee77ae`.

**Rejected:** Essential table labels in CSS `attr()`, fake generation/export and JavaScript supplying essential forms. Phúc's log records that, at his request, Claude co-author trailers were removed from his own branch and it was force-pushed before merge. This integrator did not rewrite that history. His API checks are distinct from Huy's File Upload PDF used as final evidence.

## 2026-11-08 to 2026-11-09 — review and integration

**Tool:** Codex, GitHub CLI, browser automation and Poppler. Read the supplied official rubric/final-brief PDFs, repository rules, Source of Truth and CSS contract. The original linked business description v1.1 was inaccessible; supporting detail came from Source of Truth. Học/Phúc disclosed their own source-access limitations separately.

**Asked for:** Review both PRs and show findings; post the four approved findings as two request-changes reviews; inspect revisions and supplied validator evidence; remove the stale review footer after Huy merged/pulled.

**Kept:** Verified findings against code, the final brief and browser behavior. Static limitations were not converted into backend requirements. Only Huy's account submitted the authorized reviews; Huy performed the merges.

**Changed:** Posted [PR #2 review](https://github.com/ThaiQuangHuy2906/clubflow/pull/2#pullrequestreview-5818778907) and [PR #3 review](https://github.com/ThaiQuangHuy2906/clubflow/pull/3#pullrequestreview-5818778990). Verified all four fixes in `5c88880`/`941aa15`. Removed only the stale checkout sentence from the integrated review footer; Huy committed/pushed it and the supplied PDFs in `d0426d7`. His post-footer File Upload result is dated 09 Nov 2026 13:09 ICT.

**Rejected:** Treating zero validator errors as proof of feature completeness, presenting older results as reruns, and fabricating validation evidence. No assistant merge, push or history rewrite occurred in this integration work.

## 2026-11-09 — final evidence and English documents

**Tool:** Codex; installed Node 24.14.1, cached Playwright CLI 0.1.23/Chrome 157, Python/Pillow/BeautifulSoup and Poppler. No project dependency/build added.

**Asked for:** Huy requested Steps 2 and 3 after pushing Step 1: screenshots/QA evidence and root submission documents. Exact request is preserved in `brief.md`.

**Kept:** Application HTML/CSS at `d0426d7`, original member logs/authorship and unchanged supplied validator PDFs. Used actual local pages, offline, with JavaScript disabled; a page-script sentinel stayed `blocked`.

**Changed:** Recaptured nine full-page images at DPR 1 and 360/768/1280 CSS pixels. Rendered each existing File Upload PDF to PNG at 150 dpi, without claiming a new checker run. Saved viewport, interaction, accessibility-tree, fixture and hash observations in `checks/`. Wrote the three root reports, consolidated actual prompts and updated QA.

All nine default views and nine opened-disclosure states had exact widths and no document/out-of-wrapper right overflow. Default views measured standalone targets at least 44px, text at least 16px and computed visible-text contrast at least 6.15797:1. Native-form, keyboard, navigation and Chrome accessibility-tree checks actually ran; [QA](checks/QA.md) records coverage and limits.

An initial audit could not write metrics because `require()` is unavailable in the CLI sandbox; JSON transport was corrected and measurements rerun. A collector initially assumed `css/index.css`; it was corrected to `css/campaign.css`. The first skip-link assertion wrongly required non-focusable main to receive direct focus. A focused retest verified `#main`, main at viewport top and the next Tab inside main; the initial result remains in `checks/interactions.json`. An initial documentation patch was rejected for two operations on one path, made no change, and was reapplied as separate valid patches.

**Rejected:** Inventing Phúc's abbreviated pasted text or an unknown cross-member message order, calling PDF conversion a new validator run, claiming manual DevTools pane/Color Picker checks, and automatic 100/100 scoring. No commit/push/merge/ZIP was performed for this task. The proposed self-score remains for team review.

## 2026-11-09 — assistant-operated DevTools follow-up

**Tool:** Codex; installed Playwright browser library and bundled Chrome 157 DevTools. Temporary automation scripts stayed outside the repository; no dependency was added.

**Asked for:** Huy first requested detailed instructions for the two outstanding checks, then asked why the assistant had not performed them for him. The assistant proceeded with the inspection; actual messages are preserved in `brief.md`.

**Kept:** All application HTML/CSS, existing screenshots, original validator PDFs and authorship. App pages remained offline at direct file URLs with page JavaScript disabled. Only the separate DevTools tooling context executed scripts.

**Changed:** Opened the actual bundled DevTools frontend over a temporary loopback debugging connection. Inspected 144 Accessibility pane selections, including all 86 visible input/select/textarea controls, and 40 default-state Color Picker samples. Saved six actual UI screenshots and [raw observations](checks/devtools-inspection.json). Every accepted picker value was at least 6.15:1 and agreed with a foreground/background cross-check. Updated QA to remove the repeated user handoff and revised the proposed self-score from 93 to 95 after adding the missing evidence; team approval is still pending.

The first response incorrectly implied that the rubric did not name these tools; re-reading it showed that it does, and the assistant corrected that statement before editing. Automatic DevTools target screenshots initially failed, so a separate real bundled frontend was used. Some mixed-child text/input nodes yielded no background information; final default samples use nodes for which Chrome returned real backgrounds. An initial checker wrongly expected every native date/time/select node to show `Required: true`; the actual named roles and original observations are retained without claiming an absent pane property. Extra forced-hover probes exposed stale picker ratios; attempts to refresh internal pane APIs also failed. Those probes are diagnostics only, not application failures or accepted contrast checks.

**Rejected:** Requiring Huy to repeat work the assistant could perform, deleting the rubric's tool requirement, fabricating panel screenshots, counting stale/absent contrast readings as passes, or claiming screen-reader/full-WCAG coverage. No source changes, commit, push, merge or ZIP action occurred.

## 2026-11-09 — recheck the proposed score against evidence

**Tool:** Codex; read-only Git/source/document inspection and Poppler text extraction of the supplied rubric. Existing browser evidence was reused because application files had not changed.

**Asked for:** Huy asked whether the work could be brought to 100/100.

**Kept:** All measured results, application files, original prompt records and disclosed limitations. The unknown exact cross-thread send times were not treated as a grading requirement.

**Changed:** Rechecked the seven rubric criteria and removed three precautionary deductions that were not tied to an observed defect: linked screens 19→20, responsive 24→25, design 9→10. Revised the proposed total from 95 to 98 and kept the packaging suffix consistent. The remaining conservative two-point allowance concerns incomplete original prompt evidence in the Phúc/Học records; the rubric does not mandate that exact deduction. Asked Huy whether original conversations remain available for accurate reconciliation.

Huy subsequently answered “Không còn bản đầy đủ” (the complete records are no longer available). Updated `brief.md` and the self-assessment to close the source-availability question, preserving the abbreviated/transcribed records and gap labels. The proposed score remains 98; no missing text was reconstructed.

**Rejected:** Treating 95 as a fixed ceiling, inventing historical messages to fill `[...]`, changing checks or application behavior merely to justify a score, and automatically writing 100/100 without resolving the evidence gap. No new browser/W3C run, application edit, commit, push or ZIP operation was claimed or performed in this scoring follow-up.

## 2026-11-09 — team-approved submission release

**Tool:** Codex; Git, Python standard `zipfile`/hash libraries, existing Playwright CLI/Chrome and Pillow. No new project dependency.

**Asked for:** Huy confirmed that the team agrees on 98/100, requested commit/push to GitHub and packaging of the submission, then asked the assistant to continue. The actual authorization is in `brief.md`.

**Kept:** Original application files at `d0426d7`, member authorship/history, original prompt limitations and validator PDFs. Confirmed Huy's existing Git identity and aligned `main`/`origin/main` after fetch; no identity change, force-push or history rewrite.

**Changed:** Marked 98/100 as team-approved in the reports. Created a preflight repository ZIP including `.git`, extracted it separately and verified file equality/Git integrity. Ran the extracted pages offline with JavaScript disabled at all nine page/width combinations and exercised four forward/back navigation checks; all passed. Nine fresh captures were pixel-identical to the submission captures. Saved [preflight observations](checks/package-preflight.json) and updated [QA](checks/QA.md). Commit/push and final ZIP follow these recorded checks; their exact revision, archive hash and verification result are reported in the release handoff rather than predicted in this log.

Windows tar failed to resolve the Vietnamese parent path; standard Python ZIP creation succeeded. An initial `cssRules` read was blocked by file-URL origin restrictions; the corrected check confirmed stylesheet order/rendered styles and exact image equality instead. These tooling failures did not change the application or weaken the required layout checks.

**Rejected:** GitHub Download ZIP/`git archive` because they omit `.git`, packaging from a fresh clone, including unrelated temporary tools, silently overwriting an existing submission archive, and claiming student-account submission or a new W3C check. Final archive creation is outside the repository, followed by a fresh extraction check.

## PA#3

### 2026-11-23 — Task 0 · Planning and team setup

**Tool and request.** Codex. Inspect the course requirements, checker and PA2 repository. Plan C1–C11 for three branches and update only the four planning/evidence files. The actual request is in `brief.md`.

**Changed.** Created `PA3_PLAN.md` with routes, owners, shared interfaces, a proposed deterministic demo clock, contract-first gates and release checks. Replaced the PA2 rules in `AGENTS.md` and the PA2 brief with the exact Task 0 message, including its original Markdown escapes. Appended this entry to the PA2 log.

**Checks.** Read both supplied PDFs, the checker guide and script. Inspected the PA2 pages, CSS, prototype notes, rules, historical document structure and local Git history. Compared the brief character for character with the sent message, the original PA2 log bytes with `HEAD`, and the four supplied file hashes before/after. Checked C1–C11 ownership, local links, planned demo accounts/modes, Git status and the diff. Build, browser, W3C and live contract checks belong to later phases.

**Rejected and corrections.** No user rejection or corrective prompt. The first transcript reader encountered a Windows sharing error before writing. Codex switched to a shared read and verified exact equality. An editorial shortening pass also stopped on a missing text match before writing. Codex reapplied the identified sections and inspected the resulting plan. Huy's review and approval are pending.

### R0 — planning corrections and team prompt library

23 November 2026 · Thái Quang Huy · Codex · `main` at `481144c`. [Actual request](docs/ai-prompts/huy.md#r0) · [Member log and checks](docs/ai-logs/huy.md#r0)

- **Asked for.** Execute R0 and store the supplied future task definitions.
- **Kept.** The PA2 evidence, the existing Task 0 record and all 17 task texts in their supplied order.
- **Changed.** Corrected ownership, Git checkpoints and API/demo handoffs in the plan and rules. Appended the verbatim R0 submission to the brief and Huy's prompt record, and recorded this task in Huy's log.
- **Rejected and checks.** No user rejection or corrective prompt. A pre-write text check caught a stale edit target. Compared the installed requests to the attachment, verified all task IDs and preserved prefixes, and inspected the changed paths, index and contract/mock diff. Only R0 was invoked.

**R0 presentation follow-up · 23 November 2026.** Huy asked Codex to make the brief navigable using the initial PA2 library. Used `git log --follow -- brief.md` and read `c2cbe6f:brief.md` for the library-first layout and chronological prompt register. Added an English index and task invocations, collapsed both original records, and retained one full R0 package. Checked navigation and disclosures in VS Code Markdown Preview and compared the source payloads byte for byte. [Exact follow-up](docs/ai-prompts/huy.md#r0-follow-up) · [Checks](docs/ai-logs/huy.md#r0)

### T1 API contract

23 November 2026 · Thái Quang Huy · Codex · `main` · commit `7e4570e`. [Invocation](brief.md#t1-invocation) · [Member log](docs/ai-logs/huy.md#t1)

- **Asked for.** Specify the HTTP contract for C1–C11 so the mock and the three feature owners can implement the same behavior.
- **Kept and changed.** The contract preserves the three roles and both demo stories. The endpoint index and nine resource files define caller permissions, request and response examples, validation errors and the order of the walkthrough. [Contract index](docs/api/README.md)
- **Checks and approval.** Huy reported that all three members had approved the contract. The supplied checker's parsers matched all 89 request/response pairs across 10 files to the 27 indexed operations. Every operation had a successful example. T2 replayed those examples over HTTP. [Approval and static checks](docs/ai-logs/huy.md#t1-approval)

### T2 Mock server and contract verification

23 November 2026 · Thái Quang Huy · Codex · `main` · commit `90db813`. [Invocation and follow-ups](brief.md#t2-messages) · [Member log](docs/ai-logs/huy.md#t2)

- **Asked for.** Implement the approved contract in a stateful Node mock and exercise the seed and creation walkthroughs.
- **Kept and changed.** The server uses Node built-ins, five demo accounts and a deterministic clock. Added the seed, a readable sample CV and the account table. The review covered all four mock modes, scheduling conflicts, owner-only reads and retries of final publication. [Mock entry point](mock/server.mjs) · [Demo accounts](FRONTEND.md)
- **Detected and corrected.** An independent HTTP test showed that an interviewer's out-of-order availability left an eligible applicant unassigned. Sorting validated intervals fixed the assignment. A later file check found an unreadable PDF stand-in. The mock now serves a readable fixture for that case and preserves the bytes of valid uploads. [Reproductions and fixes](docs/ai-logs/huy.md#t2-follow-up--staged-mock-review)
- **Checks.** On a fresh normal mock, the final contract checker exited 0 with 89/89 examples, 27/27 operations and zero failures. Four notes covered two CSV exports and two CV downloads. Separate checks verified their contents and role permissions. [Pre-commit run](docs/ai-logs/huy.md#t2-approval)

### T3 Shared React scaffold

23 November 2026 · Thái Quang Huy · Codex · `main` · commit `a8d9745`. [Invocation and follow-ups](brief.md#t3-messages) · [Member log](docs/ai-logs/huy.md#t3)

- **Asked for.** Deliver the React/Vite baseline with working sign-in, protected navigation and shared API access for the feature branches.
- **Kept and changed.** Added 12 route patterns and 12 named page exports, shared authentication and request handling, Executive demo controls, and API proxies for dev and preview. The scaffold uses the existing API contract and PA2 visual conventions. Full feature forms and business workflows are assigned to the feature owners.
- **Detected and corrected.** In a two-session review, an Executive returning to the editor saw the old campaign name, clock and creation button after another session changed the campaign. Reloading the draft on route entry and after a conflict fixed the stale view. Seven targeted checks passed on the repaired staged build. [Review findings and checks](docs/ai-logs/huy.md#t3-follow-up--staged-scaffold-review)
- **Committed build.** Built directly from `a8d9745` and tested it in Chrome 157 on dev and production preview. All five demo accounts signed in on both. The suite passed 14 check groups and recorded 39 layout observations at 360, 768 and 1280 px with zero uncaught browser exceptions. The build emitted two React Router module-directive warnings. Huy's local run report is `D:/Temp/clubflow-t3-a8d9745-6c0a5b40/a8d9745-report.json`. [Verified scaffold commit](https://github.com/ThaiQuangHuy2906/clubflow/commit/a8d9745d5dff56d5c6766fb35845fb6a90f7bcda)

### H1 Public campaign

24 November 2026 · Thái Quang Huy · `pa3/huy-campaign` · `50a5620`. [Invocation and follow-ups](brief.md#h1-invocation-and-follow-ups) · [Member log](docs/ai-logs/huy.md#h1)

- **Tool and request.** Codex with Git, Node, Vite and Chrome via Playwright. Show the published campaign and route visitors to the selected position after sign-in.
- **Kept and changed.** Kept the shared campaign read and Applicant guard. Grouped published positions by department and added their quotas, requirements and intake states.
- **Rejected and corrected.** The staged review found that sub-minute deadlines looked identical, Apply broke across lines at enlarged text sizes and duplicate position names had identical accessible link names. The follow-up requested a full review and repairs. The fixes retain timestamp precision, wrap the layout and disambiguate duplicate links.
- **Checks.** Three deadline unit tests, nine browser groups and targeted deadline, zoom and duplicate-name probes passed after the fixes. The build passed. The position links reached the C5 scaffold at this checkpoint.

### H2 Sign-in and role navigation

24 November 2026 · Thái Quang Huy · shared fix `25bcf2a` and campaign verification `6643d8e`, combined at `451ba85`. [Invocation and follow-ups](brief.md#h2-invocation-and-follow-ups) · [Member log](docs/ai-logs/huy.md#h2)

- **Tool and request.** Codex with Vite, Chrome and Python Playwright. Verify role navigation, protected return, authentication after refresh and account isolation.
- **Kept and changed.** Kept the shared session, role guards and API client. Fixed keyboard skip navigation, credential bounds and stale login errors while a request is pending. Extended the browser check to wait for the authenticated response, use a compatible preview host and enforce checks under optimized Python.
- **Rejected and corrected.** Keyboard navigation discarded a saved return path. Slow-response tests exposed feedback for edited credentials. A deliberately delayed 401 also exposed a premature pass in the initial browser runner. Huy requested repair of all six review findings.
- **Checks.** The integration rerun passed seven baseline groups, eight role-navigation outcomes on each of two preview configurations, and 18 layout observations at the three required widths. The deliberately broken cases failed as expected. [Repair and verification](docs/ai-logs/huy.md#h2-follow-up--repair-the-six-review-findings)

### H3 Campaign management

24 November 2026 · Thái Quang Huy · `pa3/huy-campaign` · `e8efdbe`. [Invocation and approval](brief.md#h3-invocation-and-follow-ups) · [Member log](docs/ai-logs/huy.md#h3)

- **Tool and request.** Codex with Node, Vite and Chrome via Playwright. Complete the Executive campaign editor and verify it before committing.
- **Kept and changed.** Kept the shared draft read, API contract, demo clock and public rendering. Added department and position editing, validation, saved drafts, preview of unsaved edits, publication and a read-only confirmed state.
- **Rejected and corrected.** A simulated 403 after saving initially left the editor visible. A fast 400 could also miss focus on the invalid field. The editor now shows the shared denial after a 403 and moves focus after the affected input is available.
- **Checks.** Eight unit tests and all three browser groups passed. The browser checks covered row removal, validation, draft reopening, preview, publication and denial. Supplemental checks covered retries, failed writes and the confirmed lock.

### H4 Interview setup

24–25 November 2026 · Thái Quang Huy · `pa3/huy-campaign` · `0a4b96d`. [Invocation and follow-ups](brief.md#h4-invocation-and-follow-ups) · [Member log](docs/ai-logs/huy.md#h4)

- **Tool and request.** Codex with Node, Vite and Chrome via Python Playwright. Complete the Executive setup, verify its scheduling API handoff and check the C8 browser workflow when available.
- **Kept and changed.** Kept server ownership of slots and saved settings. Added interviewer qualifications and availability, room selection, a shared duration and visible locks for the first submission and schedule confirmation.
- **Rejected and corrected.** Saving setup on the direct seed originally left the demo creation action enabled after the server had disabled it. The browser probe caught the discrepancy. Setup now refreshes the shared campaign after a successful save.
- **Checks.** Twelve campaign unit tests and four H4 browser groups passed. The scheduling API generated rows with the configured positions, room and interviewer at 15, 20 and 30 minutes. A separate temporary H4 and S1 build at `f057d1f` exercised C8 draft generation and reopened a draft saved through the API. That temporary S1 build had no Save Changes control. PR #7 later integrated C8–C10. [C8 handoff and follow-up](docs/ai-logs/huy.md#h4-follow-up--c8-browser-handoff)

### A1 Applicant submission

24 November 2026 · Lê Nguyễn Quốc Học · `pa3/hoc-applications` · `30bad3d`. [Invocation and follow-ups](brief.md#a1-invocation-and-follow-ups) · [Member log](docs/ai-logs/hoc.md#a1--c5-applicant-submission-2026-11-24)

- **Tool and request.** Codex with Git, Vite and headless Chrome via Playwright Core. Implement the position-specific application form and leave it for review.
- **Kept and changed.** Kept the Applicant guard and shared request helper. Added profile fields, availability, motivation, PDF validation and multipart submission with duplicate recovery and input retention after a failed request.
- **Rejected and corrected.** The first browser sessions timed out or used a port still occupied by the earlier attempt. A Retry probe also ran before the replacement mock was ready. Running both servers under the harness and waiting for readiness let the browser checks complete.
- **Checks.** The build and both Chrome runners passed. Student A created A01 and A02, resumed an existing record after a duplicate, and retained entered values after a real deadline refusal. The PDF, word-count and availability boundaries and the three required widths were checked.

### A2 My applications

24 November 2026 · Lê Nguyễn Quốc Học · `pa3/hoc-applications` · `f5324a9`. [Invocation and approval](brief.md#a2-invocation-and-follow-ups) · [Member log](docs/ai-logs/hoc.md#a2--c6-my-applications-2026-11-24)

- **Tool and request.** Codex, Vite and headless Chrome via Playwright Core. Complete the list and detail routes and exercise each visibility boundary.
- **Kept and changed.** Kept A1 and the shared route guards. Added distinct owned records, screening snapshots, confirmed interview details and each application's released decision.
- **Rejected and corrected.** The first layout probe matched the heading while the list was loading. The harness was changed to wait for the rendered records. A copied owner-name error in the prompt record was corrected against the original request.
- **Checks.** The build and Chrome walkthrough verified direct links, refresh, Back, 403 and 404, the four mock modes and the three widths. Schedule and assessment states were prepared through the API. Applicant views excluded private notes and assessments.

### A3 Executive application review

24 November 2026 · Lê Nguyễn Quốc Học · `pa3/hoc-applications` · `578dcbd`. [Invocation and next-task request](brief.md#a3-invocation-and-follow-ups) · [Member log](docs/ai-logs/hoc.md#a3--c7-executive-application-review-2026-11-24)

- **Tool and request.** Codex, Vite and Chrome via Playwright Core. Complete the review table, drawer, exports and screening workflow.
- **Kept and changed.** Kept A1/A2 and the documented application operations. Added campaign-wide statistics, URL filters and paging, authenticated downloads, separate screening save and publication controls and the link to the schedule.
- **Rejected and corrected.** The temporary review check initially compared the URL pathname with a query-bearing path. Corrected the test and reran the filters, downloads, keyboard focus and screening checks. The later two-tab and page-bound findings are recorded in the [initial PR review](#pr-4-initial-review).
- **Checks.** The build and Chrome review covered filter persistence, CSV contents, authenticated PDF, distinct A01/A02 decisions, owner-only release, no horizontal overflow at the three widths and the route handoff to C8.

### A4 Final decisions and notifications

24 November 2026 · Lê Nguyễn Quốc Học · `pa3/hoc-applications` · `aea32f5`. [Invocation and handoff](brief.md#a4-invocation-and-handoff) · [Member log](docs/ai-logs/hoc.md#a4--c11-final-decisions-and-notifications-2026-11-24)

- **Tool and request.** Codex, Vite and Chrome via Playwright Core. The actual A3 follow-up asked to continue with the next task. A4 implemented C11, then the user authorized the commit and PR handoff after review.
- **Kept and changed.** Kept the existing role gates and results API. Added the complete Executive board, per-application handling and decisions, campaign-wide release and owner-only links to released results.
- **Rejected and checks.** The original handoff build and Chrome tests passed the case-handling and visibility checks, including an absent case, two notices and a stable retry. Schedule confirmation and assessment data were prepared through the API. Huy later reproduced the stale-tab publication issue during the PR review.

### PR 4 initial review

25 November 2026 · Thái Quang Huy · reviewed `aea32f5`. Huy's prompt and log records reached `main` in PR #6. [Review messages](brief.md#pr-4-review-messages-from-huy) · [Member log](docs/ai-logs/huy.md#pr-4-application-review)

- **Tool and request.** Codex, a Vite production build and Chrome with a disposable mock. Review A1–A4 locally and document reproducible issues and the C8–C10 dependencies.
- **Kept and changed.** Reviewed the application screens in isolation, kept the source unchanged, and recorded reproduction steps and retest criteria for the team.
- **Rejected and checks.** Two Executive tabs demonstrated that C7 could display Shortlisted but publish Rejected and C11 could display Pass but publish Fail. A filtered list showed Page 2 of 1 after the last row on page 2 was reviewed. A later Học request explicitly ordered fixes and retests for all three issues. [GitHub review](https://github.com/ThaiQuangHuy2906/clubflow/pull/4#pullrequestreview-6044796865)

### PR 5 Publication revisions

25–26 November 2026 · Thái Quang Huy · PR head `9f733e0`, merged at `a74369d`. [PR #5](https://github.com/ThaiQuangHuy2906/clubflow/pull/5) · [Published self-review](https://github.com/ThaiQuangHuy2906/clubflow/pull/5#issuecomment-7168842674)

- **Tool and request evidence.** The published review records the Git diff, the Node regression tests, the contract checker and the API task triggered by the stale-publication findings. The exact assistant requests are outside the merged member records.
- **Kept and changed.** Added a per-application C7 revision and a campaign-wide C11 revision. Publication checks the displayed revision before updating the release. A stale request returns `409 STALE_REVISION` and preserves the existing snapshot or notifications.
- **Rejected and checks.** On Node 24.14.1 and a fresh normal demo mock, two publication regression tests and 94 of 94 examples across all 27 contract operations passed. A separate restart probe found that revisions can repeat after the in-memory mock resets. The tested protection applies within a single mock run. The PR #4 UI required the matching revision handling documented below.

### PR 4 review fixes

26 November 2026 · Lê Nguyễn Quốc Học · `pa3/hoc-applications` · `ecb1040`. [Repair request](brief.md#pr-4-repair-request-from-học) · [Member log](docs/ai-logs/hoc.md#pr-4-review-fixes--c7-and-c11-2026-11-26)

- **Tool and request.** Codex, Git, Vite, Node and Chrome. Update from `main`, repair the three PR findings and repeat the two-tab cases.
- **Kept and changed.** Kept the API and mock merged through PR #5. The list restores a valid page with the same query. C7 sends the displayed application revision and C11 refreshes the whole board after saving, then sends the displayed board revision. Both reload after a conflict and wait for another explicit Publish action.
- **Rejected and corrected.** The user requested these changes after the initial PR review. Chrome confirmed that stale status and reason changes return 409 without changing the Applicant snapshot. The stale results board returned 409 with no notices. A separate release succeeded and a repeat kept the timestamp and two notices. The list remained at page 1 after reload and showed an empty state after the last row.
- **Checks.** The production build and 14 Node tests passed at the PR head. The published approval and the merged-build rerun are recorded next. [Retest handoff](https://github.com/ThaiQuangHuy2906/clubflow/pull/4#issuecomment-7196292716)

### P1 Scheduling flow review

24 November 2026 · Trần Hoàng Phúc · `main` at `521f3a9`. [Recorded request](brief.md#p1--review-of-huys-gate-1-question) · [Member log](docs/ai-logs/phuc.md#p1--review-of-huys-gate-1-question)

- **Tool and request.** Claude Code. Review Huy’s proposed flow and demo runs against the rubric for C8–C10.
- **Kept and changed.** Drafted a reply identifying missing coverage of assigned interviews and CVs, assessments, the demo clock step, generation and export, Unassigned reasons and the confirmed read-only state. The repository stayed unchanged.
- **Rejected and checks.** Phúc recorded no rejected output. His fresh-mock API checks exercised overlaps, confirmation refusals and locks, role restrictions and assessment timing. The single unassigned-applicant gate and the contract checker were outside that run.

### P2 / S1 Draft schedule generation

24 November 2026 · Trần Hoàng Phúc · `pa3/phuc-scheduling` from `521f3a9` · implementation `f057d1f`. [Recorded request](brief.md#p2--s1-c8-draft-schedule-generation) · [Member log](docs/ai-logs/phuc.md#p2--s1-c8-draft-schedule-generation)

- **Tool and request.** Claude Code, Vite, Chrome via Playwright Core and W3C Nu. Continue with the rubric and Huy’s instructions. The invoked S1 block is recorded at `521f3a9`.
- **Kept and changed.** Used the approved schedule and setup endpoints for generation, row reasons, API counts and saved CSV export. Replaced the two-step Retry with one combined resource retry after the error-mode test timed out. Moved row reasons under the status after the desktop screenshot exposed clipping inside the scrollable table.
- **Rejected and checks.** The member log records validation before sending, one request on double-click, first-fit order, a 30-minute configuration change, no persistence from generation, CSV contents and slow, error and empty states. Shortlisting and the conflicting saved draft were prepared through the mock API. The submitted S1 HTML had zero W3C Nu errors and warnings.

### P3 S1 checkpoint handoff

Trần Hoàng Phúc · `pa3/phuc-scheduling` · `f057d1f`. [Recorded request and outcome](brief.md#p3--commit-and-push-s1)

- **Tool and request.** Claude Code. Check what is done and commit and push it without a co-author trailer.
- **Kept, changed and rejected.** The prompt record reports that S1 was committed and pushed. S2–S4 were still open at that checkpoint. The S1 commit has no co-author trailer. The prompt record supplies the handoff evidence and lists no separate test run for this request.

### P4 / S2 Schedule editing and conflict resolution

28 November 2026 · Trần Hoàng Phúc · invoked from `ac7690e` after merging `main` at `a824fa9` · implementation `078d055`. [Recorded request and follow-ups](brief.md#p4--pull-main-and-finish-the-remaining-scheduling-tasks) · [Member log](docs/ai-logs/phuc.md#p4--s2-c8-editing-conflicts-and-save-changes)

- **Tool and request.** Claude Code, Vite, Chrome via Playwright Core and W3C Nu. Pull and finish S2–S4, checkpoint each tested step and update the AI log.
- **Kept and changed.** Kept previews separate from the saved revision. Added Edit, Resolve, Assign Slot, row-specific validation and explicit Save Changes. A source read exposed duplicate React keys for multi-way conflicts. A browser width assertion and screenshot exposed clipped reasons at 1280 px. Phúc added application IDs to the keys and reduced cell padding.
- **Rejected and checks.** Phúc recorded no rejected output. Fresh-mock checks covered applicant, interviewer and room conflicts, three-way overlaps, Unassigned reasons, failed and stale saves, retry, reload and three widths. W3C Nu reported zero messages on the submitted conflict and editor states.

### P4 / S3 Schedule confirmation

28 November 2026 · Trần Hoàng Phúc · `pa3/phuc-scheduling` · `e9ed25c`. [Recorded request](brief.md#p4--pull-main-and-finish-the-remaining-scheduling-tasks) · [Member log](docs/ai-logs/phuc.md#p4--s3-c9-schedule-confirmation)

- **Tool and request.** Claude Code, Vite, Chrome via Playwright Core and W3C Nu. Add a saved-draft summary, display the server’s blockers and make a confirmed schedule read-only.
- **Kept and changed.** Used the saved revision for confirmation and displayed the affected IDs and reasons on refusal. Phúc corrected an ambiguous selector in the first browser run. The initial guard tracked generated previews and missed changes still in the assignment editor. P5 records the review finding and fix.
- **Rejected and checks.** Phúc recorded no rejected output. Separate mock cases exercised each confirmation gate, stale and repeated requests, focus, the persisted lock and Applicant appointment visibility. W3C Nu reported zero messages on the submitted confirmation states.

### P4 / S4 Interviewer workspace

28 November 2026 · Trần Hoàng Phúc · `pa3/phuc-scheduling` · `cb6f7b6`. [Recorded request](brief.md#p4--pull-main-and-finish-the-remaining-scheduling-tasks) · [Member log](docs/ai-logs/phuc.md#p4--s4-c10-interviewer-workspace)

- **Tool and request.** Claude Code, Vite, Chrome via Playwright Core and W3C Nu. Show assigned interviews and CVs, with one written assessment per completed interview.
- **Kept and changed.** Used the shared session, the API’s assessment availability and the recorded assessment returned by the server. A 360 px screenshot exposed clipping inside the embedded PDF viewer. Fit the preview to the available width and kept the open and download actions.
- **Rejected and checks.** Phúc recorded no rejected output. His checks covered assigned-only access, the PDF response, assessment timing and length, retained input on errors, one submission, assessment visibility in Results and loading, retry and empty states. W3C Nu reported zero messages on the submitted interviewer states.

### P5 C9 review and repair

28 November 2026 · Trần Hoàng Phúc · reported against `4c5a9e6` · fix `e4159e8` · PR head `82dfb7f`. [Recorded request and answers](brief.md#p5--review-finding-on-c9-confirmation-with-an-unapplied-edit) · [Member log](docs/ai-logs/phuc.md#p5--c9-fix-unapplied-edits-block-confirmation)

- **Tool and request.** Claude Code, Vite, Chrome via Playwright Core and W3C Nu. Reproduce Huy’s finding, block confirmation while an edit is pending, rerun the case and open a PR. Phúc also selected the `FRONTEND.md` update.
- **Kept and changed.** The original C9 check suite missed edits inside the still-open form. Huy reproduced confirmation locking the saved 09:20 slot while A02 showed an unapplied 09:40 selection. Phúc also reproduced losing a row edit on Save and confirming with changed generation settings. The page now tracks those inputs, blocks confirmation until changes are saved or discarded, and closes the open summary when changes are made.
- **Rejected and checks.** Phúc recorded no rejected output. His log records 29 focused regression checks, S2/S3/S4 reruns of 36/36, 36/36 and 45/45, and zero W3C Nu messages on the submitted blocked and confirmed states. The original S1 script was excluded from the rerun totals because it expected earlier headings and columns. His on-screen scheduling walkthrough reached the saved assessment in Results. Huy’s independent rerun below includes final publication.

### Merged build verification

- **Campaign · 26 November 2026.** PR #6 merged at `e3e8ad3`. On that revision, the Vite build, 14 Node tests and 94 contract examples passed. Chrome 158.0.8127.88 passed 9 H1, 8 H2, 3 H3 and 4 H4 check groups with the disposable mock from the same revision. H4 verifies the C8 API handoff. The post-merge harness used Node 24.14.1, Vite 8.3.8 and a fresh normal mock. Local run logs are in `D:/Temp/clubflow-pr6-merged-e3e8ad3-48b5a71a/`. [Campaign PR and review](https://github.com/ThaiQuangHuy2906/clubflow/pull/6#issuecomment-7169407914)
- **Applications · 28 November 2026.** Huy approved the verified `ecb1040` head and merged PR #4 at `bf11be8`. The Vite build, 14 Node tests and 94 contract examples passed again. Chrome 158.0.8127.88 passed eight check groups, including the three PR regressions and 12 layout observations across A1–A4 at 360, 768 and 1280 px. The application-side test used the schedule and assessment APIs to prepare the lifecycle states. The post-merge harness used Node 24.14.1, Vite 8.3.8 and a fresh normal mock. The local browser report is `D:/Temp/clubflow-pr4-merged-bf11be8-qa/report.json`. [Approval](https://github.com/ThaiQuangHuy2906/clubflow/pull/4#pullrequestreview-6091596055) · [Merge commit](https://github.com/ThaiQuangHuy2906/clubflow/commit/bf11be8643fd4cc13250998b7fd6b7e0c843d71b)
- **Scheduling and results · 28 November 2026.** Huy verified PR #7 at `82dfb7f`, then merged it at `5a8e234` with `a824fa9` as the first parent. On the merged revision, the Vite build, 14 Node tests and 94 of 94 API examples across 27 operations passed. Chrome 158.0.8127.88 with Node 24.14.1 and a fresh normal mock passed 12 functional check groups from C7 screening through C11 publication using on-screen controls. Separately, 12 layout checks covered the C8 conflict, C9 unsaved-edit blocker, C10 recorded assessment and C11 results at 360, 768 and 1280 px. Each checked state had one main heading and no horizontal page overflow. The C9 retest confirmed the new 09:40 slot only after Check and apply and Save Changes. C11 published A01 Pass and A02 Fail together and showed exactly two notices to their owner and zero to Student B. The local browser report is `D:/Temp/clubflow-pa3-merged-5a8e234-qa/integrated-report.json`. [PR #7](https://github.com/ThaiQuangHuy2906/clubflow/pull/7) · [Merge commit](https://github.com/ThaiQuangHuy2906/clubflow/commit/5a8e234aa889dbe9398c5d48d1dffe6fb645b80e)
- **Pending.** A single creation-to-release C1–C11 walkthrough, W3C Nu on the remaining main-screen states and final packaged-build verification remain open. [Routes and coverage](FRONTEND.md#routes)
