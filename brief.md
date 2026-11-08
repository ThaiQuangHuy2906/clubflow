# ClubFlow PA#2 — Assistant Brief and Actual-Prompt Register

**Course:** CSC13008 — Web Application Development · 24KTPM1 · 2026–2027  
**Deadline:** Monday, 2026-11-09 at 22:00 (Vietnam time)  
**Team:** 24127044 — Lê Nguyễn Quốc Học; 24127177 — Thái Quang Huy; 24127505 — Trần Hoàng Phúc  
**Maintainer / sole merger:** Thái Quang Huy (24127177)

> **IMPORTANT: this file is initially a READY-TO-SEND prompt pack, not evidence that any prompt has already been sent.** The PA#2 rubric defines `brief.md` as *what the team actually gave the assistant*. Before submission, copy the precise prompts actually sent (including modifications and follow-ups) to **Section B: Actual prompts sent**, in chronological order. Keep tool, person, date and the exact sent text. Remove unused draft prompts or clearly mark them `NOT SENT`; never present a draft as an actual interaction. Each developer should record their actual prompts promptly in `docs/ai-prompts/<owner>.md`; Huy consolidates them without fabricating history. If a prompt was sent with source files attached, name those files accurately. The generated templates below are not automatically counted as usage.

## A. Approved prompt library — use in this order

**Repository setup clarification (v1.3, team decision):** This project starts in a **brand-new, dedicated ClubFlow PA#2 repository** created by Huy. ClubFlow originates from the selected PA#1 proposal of another team; our PA#1 source/screens are not inherited. The course rubric says the same **team membership** continues, but does not explicitly mandate retaining the old PA#1 repository. The starter prompt pack is a draft until actually sent; only exact sent prompts count as rubric evidence. Huy initializes `main` with the rules file first, then creates shared CSS before the three page branches.

### PROMPT 00 — COMMON TEAM CONTRACT (send before each person's implementation prompt)

**Who sends:** Huy, Học and Phúc, each to their own coding assistant.  
**Suggested attachments/context:** `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`, `AGENTS.md`, `PA2-rubric-responsive-prototype.pdf`, `ClubFlow-final-project-brief.pdf`; optional ClubFlow business description v1.1.  
**Instruction:** send the following prompt *as written*, or edit it to match actual repository decisions and record the actual sent version.

```text
You are helping our CSC13008 PA#2 team build ClubFlow, a three-screen responsive recruitment-management prototype. ClubFlow was selected from ANOTHER team's PA#1 as the common final project; our prior PA#1 screens and repository are NOT a starting codebase. Huy creates a NEW ClubFlow PA#2 repository with new Git history, a first rules-file commit and shared CSS baseline before branching; do not clone or migrate PA#1 source or history. Before editing code, read the attached PA#2 rubric, ClubFlow final project brief, PA2_CLUBFLOW_SOURCE_OF_TRUTH.md, and AGENTS.md if accessible. If any source cannot be read, say so; do not pretend it was reviewed. Treat the grading rubric as the authority for deliverables and browser checks, the final project brief as the authority for the three screens and its eight Fix these problems, and the business description v1.1 as supporting business detail. If these disagree, surface the issue instead of guessing.

TEAM AND OWNERSHIP
- 24127177 — Thái Quang Huy: repository setup, rules, shared CSS, Screen 1 on pa2/huy-campaign, and sole reviewer/merger of every feature branch into main.
- 24127044 — Lê Nguyễn Quốc Học: Screen 2 only on pa2/hoc-review.
- 24127505 — Trần Hoàng Phúc: Screen 3 only on pa2/phuc-schedule.
- Exactly one screen implementation task per feature branch; no one except Huy merges/pushes to main. Do not touch another member's HTML/CSS or shared css/styles.css from a feature branch.

STACK AND RUNTIME
- STATIC semantic HTML5 + plain CSS3; no React for this PA#2 team plan, no new dependencies, no build step, no Tailwind CDN script, no remote assets, fonts or CDN. Use system fonts.
- All essential application content, sample records, states and controls must be present in HTML and visible when JavaScript is DISABLED. Do not render essential content with JS. Do not use a JS-based router or onclick for navigation.
- Entry point index.html. Other screens: review.html and schedule.html. Use file-relative anchors such as href="review.html", not /review.html, review/, href="#" or invented files. All in-flow links and form actions must lead to files that really exist. Use a link for navigation and a button for an action. A button cannot masquerade as a working backend operation.
- All three HTML pages load css/styles.css first and their own page CSS second: css/campaign.css, css/review.css or css/schedule.css. Reuse the shared tokens. Never add a second CSS framework.

RESPONSIVE / DESIGN
- Mobile-first at 360px, 768px and 1280px. Use fluid grids, minmax(0,1fr), wrapping and safe word breaking; no fixed page widths, no horizontal scroll, no clipped or overlapping content. Do NOT use overflow-x:hidden to conceal broken layout. A table may scroll within its own deliberate table wrapper only.
- Every independent link and button is at least 44px high at 360px; ordinary inline links are exempt. Body text is at least 16px. Body text and button text contrast is at least 4.5:1. Use a consistent spacing scale of 4/8/12/16/24/32px. No !important in custom CSS.
- At least one long Vietnamese applicant name/title must wrap naturally. Give each page one clear primary visual focus.

SEMANTIC / ACCESSIBILITY
- Include <!DOCTYPE html>, lang="vi" or the actual UI language, meta charset="UTF-8" and meta name="viewport" content="width=device-width, initial-scale=1".
- Correct header/nav/main/footer landmarks, exactly one h1 per page, no skipped heading level, visible associated labels for all inputs, real accessible buttons/links, semantic lists/tables/headings, alt attributes on images (or alt="" for decoration), and appropriate names for icon-only controls.
- The W3C Nu validator must report ZERO HTML ERRORS for all three final pages. Accessibility must be inspected in browser, not assumed from valid HTML.

CANONICAL CAMPAIGN / BUSINESS FIXTURE (sample data, not a requirement of the professor)
- Campaign CF-2026-01: "Tuyển thành viên CLB Sáng tạo 2026", host "CLB Sáng tạo Sinh viên".
- Opens 2026-11-15 08:00; closes 2026-11-20 23:59; CV review 2026-11-21 to 2026-11-22; interview on 2026-11-24, 09:00-12:00, 20-minute common slots, Rooms A/B/C.
- Departments/positions/quotas: Nội dung / Biên tập nội dung / 3; Truyền thông / Truyền thông số / 2; Sự kiện / Điều phối sự kiện / 2; Thiết kế / Thiết kế truyền thông / 2.
- 8 application records, 7 distinct students. A01 and A02 are two independent applications for different positions made by the same student, ST01 Nguyễn Thị Minh Anh Phương Thảo.
- Application statuses: A01-A05 Shortlisted; A06-A08 Rejected; 0 Pending. Counters: 8 total applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending.
- Only A01-A05 are eligible for scheduling. Draft statuses must be exactly 2 Proposed, 2 Conflict, 1 Unassigned = 5. A01 and A03 both conflict because interviewer I01 is assigned to both at 09:00-09:20. A02 belongs to the same applicant as A01 but starts at 09:20, so it does not overlap. A05 is Unassigned because the applicant is available 11:00-12:00 while qualified interviewer I01 is initially available 09:00-10:00.
- Shortlisted means CV screening passed, not final admission; Proposed means draft, not confirmed. No schedule confirmation with conflict/unassigned. Confirmation is NOT announcement of recruitment results.
- The three screens are successive illustrative stages, not a live backend. Moving from index to review does NOT itself create applicants or approve CVs.

AVOID THE EIGHT OFFICIAL FIX THESE PROBLEMS
1. Contradictory dates across three screens.
2. Wrong Screen 2 title (must be Application Review).
3. Candidate details/drawer covering most of the list.
4. Scheduling counters not adding up to the scheduling records.
5. False conflict badges without real people/time/room overlap.
6. Using the same sample person as applicant and interviewer.
7. False claims of student/attachment verification outside scope.
8. Generic template footer such as outdated copyright, Privacy Policy, Terms of Service or Support Center.

STATIC-PROTOTYPE HONESTY
- Include the features and meaningful controls/states expected in the three screens, using usable native-HTML interactions where feasible (for example details/summary), but never claim persistent saving, automatic filtering, publication, schedule-generation, CSV export, validation across fields or backend authorization is implemented if it is merely illustrated.
- Do not add buttons that link to nonexistent resources, make empty href links, or simulate a successful confirmation while conflicts exist. Clearly document unimplemented actions and out-of-flow controls in PROTOTYPE.md, rather than suggesting they really work.

HOW DONE WILL BE VERIFIED
1. Open each HTML file directly from the folder, offline, with JavaScript disabled.
2. At each width 360, 768, 1280 run document.documentElement.scrollWidth > document.documentElement.clientWidth; it must be false. Check clientWidth is exactly the selected width, and that right-overflow elements list is empty (except deliberate table wrappers).
3. Visually inspect all nine page/width combinations, the 44px tap targets, headings, labels and the long name.
4. Use the W3C Nu validator File upload on EACH HTML file and save evidence, requiring 0 errors.
5. Inspect DevTools Accessibility and color contrast; verify main-flow links and all referenced assets.
6. Preserve actual prompts, decisions, test observations, Git authors and commits. Do not say a check passed unless it really ran.

Respond initially with: (a) a short requirement-to-element mapping; (b) files you propose to change; (c) assumptions/unimplemented behavior. Then implement only the specified task. After implementation show a precise diff summary and a manual verification plan. Never invent test results or tool calls you did not perform.
```

### PROMPT 01 — HUY: REPOSITORY SETUP AND SHARED DESIGN SYSTEM (on `main`, before branching)

**Who sends:** Thái Quang Huy only.  
**Where:** New, empty ClubFlow PA#2 repository created by Huy; first commit has `AGENTS.md`/`brief.md`/Source of Truth on `main`, then shared CSS before branching.  
**This is a foundation/setup activity, NOT a fourth feature branch or a second screen task.**

```text
I am Thái Quang Huy (24127177), responsible for repository setup, integration and all merges. ClubFlow is the CLASSWIDE final project selected from ANOTHER team's PA#1 proposal. Our team's old PA#1 project/repository is NOT the source for these screens. I will create a BRAND-NEW, EMPTY GitHub repository for ClubFlow PA#2, initialize a NEW .git history and maintain main. The team membership stays the same as PA#1 unless the lecturer has authorized a change. Read the COMMON TEAM CONTRACT, AGENTS.md and the updated Source of Truth v1.3.

Task: establish a reliable static HTML/CSS shared foundation BEFORE creating the three independent feature branches. Do not clone, migrate or reuse our old PA#1 repository, and do not copy the winning team's PA#1 source code. First verify the new repository's first commit contains the rules file; then work on main only after I confirm the working tree is clean. Do NOT fabricate any Git commands' results.

Files to prepare/review:
- AGENTS.md: project rules/never-list for the assistants, stack, shared tokens, file ownership, review criteria.
- brief.md and PA2_CLUBFLOW_SOURCE_OF_TRUTH.md: preserve the supplied content; do not pretend template prompts were sent.
- css/styles.css: provide design tokens and baseline utility/components only, including spacing scale 4/8/12/16/24/32px, legible colors, system fonts, 16px minimum body text, 44px independent link/button targets, keyboard focus styles, fluid containers, responsive utilities, min-width:0 for grid children, and overflow-safe text. No !important, no fixed page width, no overflow-x:hidden to hide defects.
- Safe .gitignore only if needed; exclude node_modules and secrets, but never ignore required screenshots/checks/docs. The final ZIP must preserve the NEW repository's .git directory and full history.

Strict ownership contract: all feature pages will load css/styles.css then a separate page CSS. Huy's screen will own index.html + css/campaign.css; Học owns review.html + css/review.css; Phúc owns schedule.html + css/schedule.css. Do not create or implement any screen at this setup stage. Do not introduce npm, external fonts, JS dependencies or a framework.

Output: a file-level plan; exact shared CSS design contract listing tokens/class names all three page owners can reuse; changes/diff summary; checks that can be performed without claiming unrun W3C or browser tests. Suggest meaningful Git commit boundaries: rules/brief first, shared styles second. Do not run git push, git reset or git merge without my explicit instruction.
```

### PROMPT 02 — HUY-01: CREATE RECRUITMENT CAMPAIGN (branch `pa2/huy-campaign`)

**Who sends:** Thái Quang Huy.  
**Allowed feature files:** `index.html`, `css/campaign.css`, Huy's own prompt/AI logs.  
**Do not modify:** `review.html`, `schedule.html`, `css/styles.css`, root docs, or other person's file.

```text
I am Huy implementing ONLY TASK HUY-01 (Create Recruitment Campaign) on pa2/huy-campaign. Use the COMMON TEAM CONTRACT, the rubric and final brief. Do not modify files outside index.html, css/campaign.css or my own per-branch prompt/AI logs. Read and reuse the existing css/styles.css tokens, but do NOT edit that shared file.

Build a polished, coherent, mobile-first static page for a signed-in Club Executive managing the campaign CF-2026-01. It must be page 1 and use real file-relative navigation to review.html. Include:
- Correct document title, semantic landmarks, one h1, a visible step indicator for the 3-screen main flow, and a strong primary action hierarchy.
- Campaign name "Tuyển thành viên CLB Sáng tạo 2026", host "CLB Sáng tạo Sinh viên", useful descriptive copy, opening 2026-11-15 08:00 and closing 2026-11-20 23:59, and realistic application instructions.
- Department and position setup for the FOUR canonical positions (Nội dung/3, Truyền thông/2, Sự kiện/2, Thiết kế/2), with job descriptions and requirements for EACH, and quotas as positive integers. Every input must have a visible associated label.
- An interview availability preview/configuration appropriate to the business reference: interview date 2026-11-24, 09:00-12:00, common slot duration 20 minutes, and available rooms A/B/C; do not imply dynamic room creation.
- Visible Save as Draft, Preview Campaign and Publish Campaign controls or previews. Expose the required-field/date-order/position/quota validation criteria and a clear invalid-input state. Use native HTML required/min/step/date inputs and a no-JS preview via details/summary if appropriate; do not claim business-rule validation or persistence is implemented unless it is.
- A real, accessible main-flow link "Applications" with href="review.html" for navigating to Screen 2. Explain in page copy that sample applications are a later-stage fixture after publication/submissions; navigation does not create them.

HTML must work from file:// with JavaScript disabled. Load css/styles.css THEN css/campaign.css. The long Vietnamese campaign title or position description must wrap at 360px. At 360px stack into one column; at 768/1280 adapt layout without overlap/cutoff. Buttons/standalone links >=44px. No broken routes, fake CV links, lorem ipsum or generic template footer.

Deliver exactly index.html and css/campaign.css; include requirement-to-element mapping, diff summary, and explicit browser/W3C test steps. Identify any native-HTML prototype limitation honestly. Never claim checks passed without running them. Do not push or merge; I will handle Git commands separately.
```

### PROMPT 03 — HOC-01: APPLICATION REVIEW (branch `pa2/hoc-review`)

**Who sends:** Lê Nguyễn Quốc Học.  
**Allowed feature files:** `review.html`, `css/review.css`, Học's own prompt/AI logs.  
**Do not modify:** `index.html`, `schedule.html`, `css/styles.css`, root docs, other person's files.

```text
I am Lê Nguyễn Quốc Học (24127044), implementing ONLY TASK HOC-01 (Application Review) on pa2/hoc-review. Read the COMMON TEAM CONTRACT, rubric, final brief and the shared stylesheet. Change ONLY review.html, css/review.css, and my own prompt/AI logs. Do not change css/styles.css or either teammate's page. Huy will merge my branch.

Create Screen 2, titled Application Review everywhere it appears (the <title>, h1, app header and navigation). It belongs to the same CF-2026-01 campaign (applications open 15 Nov and close 20 Nov 2026; review 21-22 Nov 2026), shown at the later review stage.

Use EXACTLY the following independent applications (submitted in the campaign window):
A01: ST01 Nguyễn Thị Minh Anh Phương Thảo, Nội dung, 15 Nov 10:15, Shortlisted.
A02: ST01 Nguyễn Thị Minh Anh Phương Thảo, Truyền thông, 15 Nov 10:32, Shortlisted.
A03: ST02 Trần Hồng Ngọc, Sự kiện, 17 Nov 10:10, Shortlisted.
A04: ST03 Lê Bảo Trâm, Thiết kế, 18 Nov 12:40, Shortlisted.
A05: ST04 Phạm Quốc Bảo, Nội dung, 19 Nov 20:15, Shortlisted.
A06: ST05 Võ Hoàng Long, Thiết kế, 16 Nov 11:21, Rejected.
A07: ST06 Đặng Thanh Tuyền, Sự kiện, 18 Nov 09:30, Rejected.
A08: ST07 Bùi Nhật Khánh, Truyền thông, 20 Nov 22:05, Rejected.
Counters: 8 applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending. A01 and A02 MUST remain distinct decisions/records; one student's decisions do not affect the other position.

Features to REPRESENT visibly in the static prototype:
- A readable application list including application ID, applicant, position, submission timestamp, CV-screening status, and a meaningful Review affordance.
- Labeled search and status/position filters; sorting, pagination and a basic CSV export affordance as described in the full ClubFlow brief. If an affordance is not interactive without backend/JS, do NOT pretend it is; note accurately in the Not wired documentation and provide realistic illustrative state.
- A meaningful application detail panel/drawer for a selected application including CV information, a realistic SOP/motivation statement, submission/review milestones, internal Executive-only notes, and Shortlist Candidate and Reject actions/decision states. If you link to a CV, link only to a real file checked into the repo; otherwise clearly represent a non-downloadable CV preview. Native details/summary or in-page anchors with real targets are acceptable for no-JS visibility.
- Explicitly distinguish total application count from unique applicant count, and overall counts from filtered counts.
- A real anchor "Continue to Interview Scheduling" href="schedule.html", referring to ONLY the five shortlisted application IDs; a real back link href="index.html".

Responsive specification: at 1280px list plus detail may be side by side, but at 360px the detail must stack/expand without covering the list. Long name ST01 must wrap rather than widen the page. Avoid any fixed-width drawer, overflow-x:hidden bandaid, inaccessible table, unlabeled controls, invalid HTML or fake student-verification labels.

Load css/styles.css THEN css/review.css. Deliver only review.html, css/review.css and my own logs. Return a requirement-to-element mapping, diff summary, genuine limitations, and an explicit validation checklist. Do not say W3C/Accessibility passed unless actually tested, and do not merge my branch.
```

### PROMPT 04 — PHUC-01: INTERVIEW SCHEDULING (branch `pa2/phuc-schedule`)

**Who sends:** Trần Hoàng Phúc.  
**Allowed feature files:** `schedule.html`, `css/schedule.css`, Phúc's own prompt/AI logs.  
**Do not modify:** `index.html`, `review.html`, `css/styles.css`, root docs, other person's files.

```text
I am Trần Hoàng Phúc (24127505), implementing ONLY TASK PHUC-01 (Interview Scheduling) on pa2/phuc-schedule. Read the COMMON TEAM CONTRACT, rubric, final brief and shared CSS. Change only schedule.html, css/schedule.css and my own per-branch logs. Huy alone reviews/merges. Do not modify shared styles.css or the other pages.

This is Screen 3 for the SAME ClubFlow campaign CF-2026-01. Application deadline: 2026-11-20 23:59, CV decisions all finished on 2026-11-22, interview date 2026-11-24 only; time window 09:00-12:00; one 20-minute duration for every session. Show the duration options 15/20/30 min as the product allows, but show 20 min as this fixture's chosen value. Rooms A/B/C are pre-existing. The 8 campaign applications include ONLY these five shortlisted IDs eligible for scheduling: A01, A02, A03, A04, A05. Never schedule rejected A06-A08.

Interviewers and qualifications:
I01 Trịnh Ngọc Hà: Nội dung and Sự kiện, initially available 09:00-10:00.
I02 Đỗ Quang Kiên: Truyền thông, available 09:00-10:00.
I03 Lê Thanh Tùng: Thiết kế, available 09:00-10:20.
Applicants' availability:
ST01 (A01 and A02): 09:00-10:00.
ST02 (A03): 09:00-10:00.
ST03 (A04): 09:20-10:20.
ST04 (A05): 11:00-12:00.
Rooms A/B/C available 09:00-12:00.

Display ONE clearly labeled invalid DRAFT schedule with EXACTLY five rows:
A01 | ST01 | 09:00-09:20 | I01 | A | CONFLICT — I01 simultaneous with A03.
A02 | ST01 | 09:20-09:40 | I02 | B | PROPOSED — adjacent to A01, so not overlapping for ST01.
A03 | ST02 | 09:00-09:20 | I01 | B | CONFLICT — I01 simultaneous with A01.
A04 | ST03 | 09:40-10:00 | I03 | A | PROPOSED.
A05 | ST04 | no slot | none | none | UNASSIGNED — ST04 only free at 11:00-12:00, qualified I01 initially free only at 09:00-10:00.
Counters must add to FIVE: Proposed=2, Conflict=2, Unassigned=1. A01 and A03 are both flagged as affected by the real conflict. Do not invent a conflict on A02 (adjacent ST01 sessions are allowed).

Represent the scheduling controls and conditions: choose day/time window/duration, interviewer-to-position assignments, availability and room selection, Generate Draft, Save Changes (draft only), Edit, Resolve, + Assign Slot, Export Timetable, and an Approve & Confirm Schedule gate. For THIS draft, the gate must be BLOCKED and list A01/A03/A05 as needing attention. Display reasons for Unassigned/Conflict; do NOT announce final recruitment Pass/Fail here.

Optional separated explanatory illustration AFTER resolution (never intermixed with draft): move A03 to 09:40-10:00 with I01 in Room B; additionally make I01 available 11:00-12:00 and give A05 11:00-11:20 Room A; keep other rows as above. Only after application closing + 8/8 decisions + 5 valid distinct assignments and 0 conflicts/unassigned may the alternate state be Confirmed and read-only. Clearly label it as a different illustrative state. If native HTML cannot implement scheduling/persistence, disclose this honestly.

Page structure: correct title/h1, semantic header/nav/main/footer, accessible controls/labels, native HTML content readable without JS, clear visually prioritized conflict resolution area, no fixed page width, no overlap at 360/768/1280, 44px independent tap targets. Load css/styles.css THEN css/schedule.css. Include real href="review.html" back link and other real in-flow links only. No fake routes or outdated footer.

Deliver only schedule.html, css/schedule.css and my own logs. Return requirement mapping, evidence-needed checklist, diff summary, and known limitations. Do not assert browser/W3C success if unrun and do not merge anything.
```

### PROMPT 05 — HUY: INTEGRATION AND CROSS-SCREEN REVIEW (after receiving all branches)

**Who sends:** Huy after reading each branch's diff and handoff.  
**Important:** the assistant can review and suggest changes; only Huy actually runs the merges and verifies the result.

```text
I am Huy, the sole integrator. The branches pa2/huy-campaign, pa2/hoc-review and pa2/phuc-schedule have been pushed. I will perform and verify the actual merges myself. Help REVIEW, not guess or invent command results.

Compare each branch's changed-file list against its ownership contract; examine the real git diff/commits I supply. Flag unauthorized edits, inconsistent campaign timeline, broken relative links, wrong stylesheets, missing controls, invalid or misleading mock behavior, accessibility risks, and violations of any of the eight Fix these items. Confirm whether all three pages display the exact shared fixture: one campaign, 8 applications/7 distinct students, 5 shortlisted, draft scheduling 2 Proposed + 2 Conflict + 1 Unassigned, A01 and A03 sharing I01 at 09:00-09:20. Inspect Huy/Học/Phúc commit authors and messages, without proposing a history rewrite.

Give me (1) blockers before merge, (2) suggested fixes by owner and file, (3) a safe merge order using git merge --no-ff with no squash or force push, (4) tests to run on integrated main. Never report that a branch merged or a test passed unless I provide actual output showing it.
```

### PROMPT 06 — SHARED RESPONSIVE / W3C / ACCESSIBILITY REPAIR (send only for a real observed failure)

**Who sends:** the person responsible for the observed issue; Huy coordinates any shared-CSS fix.  
**Instruction:** replace each `[ACTUAL ...]` placeholder using a real test observation; never fabricate the test result.

```text
We observed a REAL bug while testing ClubFlow:
- Page and current branch: [ACTUAL PAGE AND BRANCH]
- Viewport: [360, 768, or 1280 pixels]
- JavaScript state: disabled (static grading mode)
- Actual failed check and output: [PASTE CONSOLE RESULT, W3C ERROR, ACCESSIBILITY ISSUE OR SCREENSHOT DESCRIPTION]
- Expected result from the rubric: [EXACT EXPECTED CONDITION]

Find the smallest root-cause correction. Preserve the shared CSS scale, semantic HTML and existing navigation. Do not introduce new dependencies, fixed page widths, !important or overflow-x:hidden to hide the bug. Change ONLY the owning page HTML/CSS unless Huy has explicitly approved a common-CSS change on main. Show the exact edited selectors/elements and explain why they fix the observed issue; give a targeted retest plan. Do NOT claim the fix was verified until we rerun the same check.
```

### PROMPT 07 — HUY: FINAL RELEASE AUDIT (after merge and evidence collection)

**Who sends:** Huy once all three pages exist on main.  
**Instruction:** supply the real files and checks; assistant must report missing evidence, not invent it.

```text
Act as an adversarial reviewer of our PA#2 submission, using the attached official rubric and ClubFlow brief. I am Huy and have merged all three feature branches into main. Analyze the current repository and actual QA evidence; do not infer passing results from intentions or screenshots alone.

Audit each of the seven rubric criteria and all eight Fix these issues. Confirm these required artifacts exist and are accurate: three HTML pages; four local CSS files (shared plus one page CSS each); the root rules file; PROTOTYPE.md with six required sections; brief.md containing prompts actually sent; AI-LOG.md with genuine per-task entries and verifiable Changed/Rejected evidence; checks/ with three current zero-error W3C results; screenshots/ with nine full-page images at 360, 768, 1280px with JS disabled; SELF_ASSESSMENT_REPORT.md with seven evidence-backed criterion rows; and meaningful Git history with original authors and all three merges.

Check that three HTML pages can be opened from the extracted directory without a server, that main-flow links are relative and point to existing files, and no external runtime resources are needed. The draft with two conflicts and one unassigned must not pretend to be confirmed. Verify filenames and submission format 24127044-24127177-24127505_<ACTUAL_SELF_SCORE>.zip and preserve .git while excluding node_modules and secrets.

Return a strict PASS / FAIL / NOT VERIFIED table for each criterion. Quote concrete file paths/lines/evidence. List blocking fixes and do not suggest claiming 100/100 without proof. The actual self-score must reflect real checks, not this prompt's intent.
```

## B. Actual prompts sent — CHRONOLOGICAL RECORD (required before submission)

> **Initially EMPTY.** The team has not asserted that the prompts in Section A were actually used. After each assistant interaction, record the REAL sent text in this section or in the branch owner's `docs/ai-prompts/<owner>.md` immediately, then have Huy consolidate it here verbatim before submission. Only entries that actually happened belong here. If using unchanged PROMPT 00 etc., it is still safest to paste the exact text of the sent prompt (rather than merely saying "used PROMPT 00") so the grader can see what was given.

### Entry template — DUPLICATE ONLY WHEN A REAL PROMPT HAS BEEN SENT

```text
Date/time (ICT): YYYY-MM-DD HH:MM
Sender: Huy / Học / Phúc
Tool: name and version if known
Branch: pa2/...
Purpose: ...
Sources attached and actually accessible: ...
Exact text sent (including any modified parts):
[PASTE THE REAL USER PROMPT HERE]
Assistant output accepted/revised/rejected: link to AI-LOG.md entry and commit if applicable
```

**Before final submission:** (1) sort actual entries in order sent, (2) keep any follow-up repair prompts, (3) remove the dummy entry template from the final submission copy, (4) remove or clearly mark all unsent prompts in Section A, (5) ensure the content matches the AI-LOG.md and Git diff/commits. This file must remain **in English**.
