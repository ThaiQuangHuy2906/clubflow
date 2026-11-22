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


## 3. HUY-01 - actually sent on 2026-11-08

Branch: `pa2/huy-campaign`. Tool: Codex. Exact send time not recorded.
The following text was actually sent in this interaction and matches PROMPT 02
in the existing prompt pack; no other template is marked as sent.

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

Sources reused: the common contract, official PA2 rubric and final brief PDFs
read earlier in this session, current Source of Truth, AGENTS.md, shared CSS
and shared CSS contract. Original business description v1.1 remains unverified.

Implementation/checks: [HUY-01 task log](../ai-logs/huy.md).

## 4. HUY-01 validator correction - actually sent on 2026-11-08

Tool: Codex. Branch: `pa2/huy-campaign`. Exact send time not recorded.

```text
Lỗi ở bước Chạy W3C Nu cho index.html nè

Với cả bước 8 là sao? Tôi không hiểu?
```

The user attached a screenshot of W3C Nu File Upload results for index.html
(vnu 26.11.4). It shows one error: the required single-choice slot-duration
select lacks an empty first option. The screenshot is user-provided evidence;
it was not an assistant-run validator result. The assistant also explained
how to capture viewport/validator evidence and defer cross-page navigation
until review.html exists.

## 5. HUY-01 evidence review - actually sent on 2026-11-08

Tool: Codex. Branch: `pa2/huy-campaign`. Exact send time not recorded.

```text
OK. Tôi làm xong rồi: D:\TAI_LIEU_HCMUS_K24\Năm 3 - Kì 1\Phát triển ứng dụng web\TeamWork\PA2\ClubFlow-evidence , bạn xem đi.
```

The assistant read the three PNGs and the PDF from that actual folder. The
inspection outcome is appended to Huy's AI log; no application code was changed.

## PA#3

### R0

| Task | Owner | Tool | Actual branch and starting HEAD | Date |
|---|---|---|---|---|
| R0 | Thái Quang Huy · 24127177 | Codex | `main` · `481144ca32eaf1808f4b9c310f1c81af3ef723e2` | 23 November 2026 |

The local Codex session recorded receipt at 02:28:37 UTC+07:00. The sender's exact send time is unknown. The text below is the complete request delivered in the pasted-text attachment. It is one R0 submission containing 17 future task definitions. [R0 checks](../ai-logs/huy.md#r0)

~~~~text
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
~~~~

#### R0 follow-up

23 November 2026. Huy sent this request to Codex on `main` at `481144c`. The local session recorded receipt at 02:41:29 UTC+07:00. The original request follows. [R0 checks](../ai-logs/huy.md#r0)

~~~~text
Đây là follow-up của R0 về cách trình bày `brief.md`. Hãy dùng `git log --follow -- brief.md` để tìm và đọc **bản thư viện prompt khởi đầu của PA2**, rồi lấy bố cục thực tế của bản đó làm mẫu cho PA3.

Viết phần hướng dẫn bằng tiếng Anh. Đặt tiêu đề, một ví dụ gọi task và mục lục đủ 17 task ở đầu file. Nhóm theo giai đoạn và người phụ trách để mỗi thành viên tìm được ngay prompt của mình. Đặt hai bản ghi Task 0 và R0 trong các mục có thể thu gọn bằng `<details>`. Giữ nguyên từng byte của hai bản ghi, kể cả dấu escape, và chỉ giữ một bản đầy đủ của gói 17 prompt trong `brief.md`.

Kiểm tra Markdown Preview, các liên kết và nội dung nguyên văn trước/sau. Ghi nhận tin nhắn này là follow-up thật của R0 theo `AGENTS.md`. Dừng ở diff để Huy duyệt trước khi commit hoặc chạy T1.
~~~~
