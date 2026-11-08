# Huy - actual assistant prompts

Date: 2026-11-08 (Asia/Saigon). Exact send times were not recorded.
Tool: Codex in the local workspace; client/model version not independently recorded.
Branch: `main`. Task: HUY-SETUP only.

## 1. Common team contract - actually sent

The text below matches the user message in this interaction and the PROMPT 00
code block in `brief.md`. It is recorded because it was actually sent, not because
it appeared in the draft prompt library. PROMPT 01 and the screen prompts were
not sent in this interaction.

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

Sources accessible in this interaction: `AGENTS.md`,
`PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`, `brief.md`, and the two official PDFs in the
parent PA2 directory. The linked business description v1.1 was inaccessible via
the web tool. Its rules were not independently verified against that document.

## 2. Task selection - actually answered by the user

Assistant's clarification:

```text
Bạn muốn thực hiện task nào trong lượt này? Repository hiện ở main, mới có tài liệu và chưa có CSS chung.
```

Exact user answer:

```text
HUY-SETUP: tạo css/styles.css và hợp đồng CSS chung trên main
```

The assistant announced the concrete scope before editing: `css/styles.css`,
`docs/SHARED_CSS_CONTRACT.md`, `docs/ai-prompts/huy.md` and `docs/ai-logs/huy.md`.
The three existing root documents were preserved. No screen, feature branch,
commit, push or merge was requested or performed.

Assistant implementation and checks: [actual setup log](../ai-logs/huy.md).
Huy's acceptance/rejection and any eventual commit are pending user review.

