# Huy - actual assistant task log

## 2026-11-08 - HUY-SETUP on main

Tool: Codex in the local workspace; cached Playwright CLI 0.1.23 for browser
inspection, HeadlessChrome 157.0.0.0 on Windows. No project dependencies added.

Asked for: Apply the common ClubFlow PA#2 contract; the user selected
"HUY-SETUP: tạo css/styles.css và hợp đồng CSS chung trên main".
Exact prompts are recorded in [the prompt log](../ai-prompts/huy.md).

Kept: The implementation in this interaction uses plain local CSS, the six shared
spacing values, the Source of Truth's blue/neutral direction, system fonts,
mobile-first layouts, 44px minimum controls, visible keyboard focus, native form
and disclosure styles, explicit status treatments, and a table-only scroller.
The public API and HTML responsibilities are in
[the shared contract](../SHARED_CSS_CONTRACT.md). Huy's review is still pending;
this entry does not claim that the user accepted the generated changes.

Changed: The first temporary component fixture put two datetime-local inputs
inside a nested `.grid--two`. At 768px, its screenshot showed the time segments
clipped even though document overflow was false. The assistant added
`--field-min: 16rem` and `.grid--fields` using container-available space, changed
the fixture to that utility, and inspected the new screenshots. The contract
explains why viewport-based column counts are insufficient inside narrow panels.
No user repair prompt was sent; this was an assistant correction during QA.

Rejected: No user rejection was recorded. The assistant discarded the narrow
two-column date row for the shared-form example after visual inspection. It did
not manufacture a failed W3C result, a backend feature, a CV, or a user decision.

### Sources and initial repository observations

- Read `AGENTS.md`, `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md` and `brief.md`.
- Read the text of `../PA2-rubric-responsive-prototype.pdf` and
  `../ClubFlow-final-project-brief.pdf` with the installed Poppler `pdftotext`.
  These relative paths are from the repository root. The PDFs are outside the
  repository and were not copied into it.
- The Google Docs business description v1.1 link was inaccessible via the web
  tool. Supporting rules were read from Source of Truth; the original v1.1 was
  not independently reviewed in this interaction.
- `git status --porcelain=v1` was empty on `main` before editing. The root
  commit `c2cbe6f` includes `AGENTS.md`, Source of Truth and `brief.md`.
  The observed remote was `https://github.com/ThaiQuangHuy2906/clubflow.git`.
  These observations do not independently prove how the remote was created.

### Component verification actually performed

A temporary HTML component fixture and CLI configuration were created outside
the repository under `D:/Temp/clubflow-huy-setup-3hd7in_h/`. The fixture is not a
submission screen and contains only representative sample content. It loads the
working shared CSS through a local file URL. The browser context was configured
with `javaScriptEnabled: false` and `offline: true`; its page-script sentinel did
not run. No final-screen evidence is inferred from these component checks.

| Fixture width | clientWidth / scrollWidth | Horizontal overflow | Right overflow outside table wrapper | Minimum target height | Smallest text |
| --- | --- | --- | --- | --- | --- |
| 360 | 360 / 360 | false | `[]` | 44px | 16px |
| 768 | 768 / 768 | false | `[]` | 44px | 16px |
| 1280 | 1280 / 1280 | false | `[]` | 44px | 16px |

- Measured 10 rendered anchors/buttons/summaries at each width; none below 44px.
- The long Vietnamese name occupied two 24px lines at 360px, one at larger widths.
- The sample 1/2/3-column grid measured one, two and three columns respectively.
- The intentional table wrapper had client/scroll widths 326/768px at 360,
  718/768px at 768, and 1214/1214px at 1280. Its contents, and only those
  contents, were excluded from the right-edge overflow list.
- Captured and visually inspected full-page component screenshots at all three
  required widths after the form-grid correction. These are temporary component
  images, not `screenshots/index-*.png` or final submission evidence.
- Computed WCAG relative-luminance ratios for 18 documented token pairs from the
  browser's CSS custom property values. The lowest measured text ratio was
  6.1579:1 (primary on primary-soft). This is a numerical token check, not a
  DevTools Color Picker inspection or an audit of arbitrary page overrides.
- The browser accessibility snapshot exposed labeled landmarks, one h1, and
  names for all seven form controls in the representative markup. A snapshot
  inspection does not replace the final DevTools Accessibility check.
- Pressing Tab focused the skip link at top=16px with `:focus-visible` true and
  a 3px solid outline. The native details element opened after clicking its
  summary while the page-script sentinel remained blocked.
- Repeated the viewport measurements with `detailsOpen: true` at all three
  widths; overflow, minimum target and text measurements matched the table above.
  Pressing Enter on the summary closed it; the focused summary then had a 3px
  solid focus-visible outline. Keyboard scrolling of the table was not completed.
- Checked all four new files for valid UTF-8, trailing whitespace and a final
  newline. All 31 custom properties referenced through `var()` resolve. Static
  checks found no remote URL/import, asset dependency, `!important` or
  `overflow-x: hidden` in the shared CSS. Reviewed the new-file diffs for the
  stylesheet and contract. The existing tracked root documents matched HEAD
  after Git line-ending normalization; `git diff --check` reported no issue.

### Tooling observations

- The first read used PowerShell's default text decoding; subsequent reads used
  explicit UTF-8. No existing file encoding was rewritten.
- The first fixture generated through a PowerShell-to-Python pipe lost Vietnamese
  accents. It was discarded for testing and replaced with a UTF-8 fixture before
  measuring the long name or inspecting the final component screenshots.
- Playwright CLI initially blocked `file://` navigation. Its documented
  `allowUnrestrictedFileAccess` option was enabled in the temporary test config
  to read the authorized local fixture and stylesheet. No project setting changed.
- Reading `CSSStyleSheet.cssRules` across separate local file URLs produced a
  browser SecurityError. That diagnostic was removed; computed styles and actual
  rendered dimensions were used instead.
- Successful CLI evaluation/action replies stalled in this JavaScript-disabled
  session despite actions occurring. Metrics were emitted through intentionally
  thrown `FOUNDATION_METRICS` / `KEYBOARD_METRICS` diagnostic messages, which
  returned the measured JSON. Those messages are instrumentation output, not
  stylesheet failures. The tool's exit status alone was not treated as a pass.
- One queued click used the stale `e91` reference and was rejected. A fresh
  snapshot supplied `f2e91` for the actual disclosure interaction. The named
  browser session was closed after measurements; queued follow-up commands then
  reported that the browser was closed. They are not counted as completed tests.

### Limits and remaining gates

No campaign, review or scheduling HTML was implemented. W3C Nu File Upload,
DevTools Accessibility/Color Picker, the nine final screen/width combinations,
business fixtures, cross-page links and final screenshots are not verified by
this setup task. Screen owners must perform those checks on their final HTML.
No persistence, filtering, publication, schedule generation, confirmation or
authorization is implemented by shared CSS.

The three existing root documents remain unchanged. No Git commit, push, merge,
collaborator invitation or feature branch was made. Root `brief.md` and
`AI-LOG.md` consolidation remains Huy's later integration task. No self-score is
claimed here.

## HUY-01 - Create Recruitment Campaign (2026-11-08)

Tool: Codex; local PowerShell/Python; cached Playwright CLI 0.1.23 with
HeadlessChrome 157.0.0.0. Branch observed: `pa2/huy-campaign`, based on shared
baseline `39ad2e5`. The worktree was initially clean. No Git command that writes
history, pushes or merges was performed. Huy's acceptance is pending review.

Asked for: implement only Screen 1 in `index.html` and `css/campaign.css`, reuse
the common CSS unchanged, preserve the canonical campaign, provide honest
native interactions and verification. The actual implementation prompt is
recorded in `../ai-prompts/huy.md`, entry 3.

Kept: semantic HTML, system fonts, existing shared tokens/components, four
positions with quotas 3/2/2/2, the canonical dates, native required/min/step
validation, details/summary previews, and the exact `review.html` navigation.

Changed: created the two screen files. The assistant added a visible Vietnamese
campaign title above the form so the campaign is identifiable with preview
closed, and removed a developer-facing branch/file note from the product UI.
The form uses the shared container-aware field grid to keep native date/time
controls usable. Page layout stacks at 360/768px, with a form/sidebar workspace
at 1280px; position cards become two columns from 768px.

Rejected: no user rejection was recorded. The assistant did not create a fake
review page, invent CV assets, make Save/Publish appear operational, claim
cross-field business validation, or change the shared stylesheet. No fictional
bug history or completed lecturer checks is recorded.

### Sources and integration dependency

- Read the repository rules, Source of Truth, shared stylesheet and shared CSS
  contract. The official PA2 rubric and ClubFlow final brief PDFs were read in
  the earlier setup interaction in this session and reused here.
- The original Google Docs business description v1.1 remained inaccessible;
  supporting rules came from Source of Truth, not an independent v1.1 review.
- `review.html` does not yet exist in this branch. The requested Applications
  anchor uses exactly `href="review.html"`; Huy must integrate Hoc's screen
  before the navigation gate can pass. Creating Hoc's file would exceed HUY-01.
- Root PROTOTYPE.md consolidation is outside this branch's allowed edit scope.
  The prototype limitations below are ready for Huy to consolidate later.

### Browser observations actually obtained

Opened the actual local `index.html` using a direct file URL with an isolated
Chromium context configured `javaScriptEnabled: false` and `offline: true`.
Temporary configs, scripts, snapshots and screenshots are under
`D:/Temp/clubflow-huy01-4ro_q8qv/`, outside the repository. These are HUY-01
working checks, not the final nine integrated submission screenshots.

| Width | clientWidth / scrollWidth | Horizontal overflow | Elements past right edge | Minimum link/button/summary height | Minimum rendered text |
| --- | --- | --- | --- | --- | --- |
| 360 | 360 / 360 | false | `[]` | 44px | 16px |
| 768 | 768 / 768 | false | `[]` | 44px | 16px |
| 1280 | 1280 / 1280 | false | `[]` | 44px | 16px |

- The overflow/target results were obtained with default disclosures and again
  with the campaign and slot previews open. The refined text measurement
  excludes textless checkbox inputs: the initial broad measurement included
  their UA font-size of 13.33px even though they render no text. Visible checkbox
  labels and actual text-bearing controls measured at least 16px. No CSS fix
  was inferred from that instrumentation false positive.
- Captured and inspected full-page screenshots at all three widths, plus
  readable crops of the mobile page and larger viewport headers. The opened
  campaign title wraps to two lines at 360px. There was no observed layout
  overlap or horizontal clipping; textareas retain native internal scrolling.
- Ten rendered anchors/buttons/summaries were measured at each width; none
  was shorter than 44px. All 26 input/select/textarea controls have associated
  visible labels. The page has one h1 and zero script elements.
- Computed foreground/background relative luminance for visible text yielded
  a minimum ratio of 6.15797:1; none was below 4.5:1. This is a computed browser
  measurement, not a completed DevTools Color Picker inspection.
- The browser accessibility snapshot exposed header/main/navigation/aside/footer,
  named controls, disabled Save/Publish buttons and the invalid quota example.
  This is not the separate final DevTools Accessibility inspection.
- Native form submission blocked quota 0 (`rangeUnderflow`), quota 1.5
  (`stepMismatch`), and an empty campaign name (`valueMissing`). Focus moved
  respectively to the quota/name control, with no navigation on invalid input.
- Valid native submission reopened the same existing HTML file with a query
  and `#native-check`; the original sample name returned, confirming no save.
- Native disclosures opened with JavaScript disabled. Enter opened Preview
  Campaign. Tab focused the visible skip link with `:focus-visible` true and
  a 3px outline.

### Validation, static checks and limits

- W3C Nu's official File Upload page returned HTTP 403 / challenge before its
  upload UI was accessible. A separate POST of the actual HTML to its JSON API
  also returned HTTP 403. No upload result or zero-error W3C claim is available.
  Repeat File Upload on the final `index.html` and save the real result.
- Local HTMLParser checks found 44 unique IDs, one h1, no skipped heading level,
  labels on every form field, existing internal fragment targets, and the
  required stylesheet order. This parser check is not W3C conformance validation.
- Both stylesheets exist. The only missing linked target is `review.html`, the
  integration dependency above. All 21 custom properties used by campaign CSS
  resolve in shared CSS. No scripts, external assets, event-handler attributes,
  CSS import, `!important`, or hidden horizontal overflow were introduced.
- UTF-8, final newline and trailing-whitespace checks ran on the new screen
  files and prompt log. `git diff --check` reported no whitespace error.
  Shared CSS, shared contract, AGENTS.md, Source of Truth and brief.md matched
  HEAD. The final diff remains for Huy to review and commit separately.
- Playwright metric/interaction scripts intentionally throw tagged diagnostic
  messages to return measured JSON in this JS-disabled CLI environment. Their
  exit status 1 is instrumentation, not itself a page failure or a passing gate.
- One attempted log patch used an unmatched context and made no change; the
  append was retried against the actual final line. No implementation defect
  was discovered by the recorded native-interaction checks.

Save as Draft and Publish Campaign are native disabled controls with a visible
reason. Preview, timeline, quota totals and slots show the original fixture;
they do not recalculate after edits. The invalid example is a separate static
illustration outside the main form, not a live error manager. Native required,
min and step constraints work; date ordering, room suitability and other
cross-field/business checks are documented criteria only. Valid form submission
reloads sample values and persists nothing. No applications, CV approvals,
interviewer assignments, publication or backend authorization are created.

Remaining gates: W3C Nu zero-error evidence, final DevTools Accessibility and
contrast inspection, link navigation after Hoc's page is integrated, and the
team's complete nine-view/three-validator submission evidence. Only the two
screen files and Huy's own prompt/log files were changed for this task.

## HUY-01 follow-up - W3C required-select error (2026-11-08)

Tool: Codex, systematic-debugging skill, local PowerShell, cached Playwright CLI.
Asked for: address the reported W3C problem and clarify the evidence-capture
instructions. The actual prompt is in ../ai-prompts/huy.md, entry 4.

Observed failure: the user's W3C Nu File Upload screenshot for index.html
(vnu 26.11.4) shows one error at original line 187. The required, single-choice
slot-duration select started with option value="15", with no empty placeholder
option. The current source matched that failure. WHATWG's select-element
requirements confirm that this control needs a placeholder label option.
The earlier local validity and HTMLParser checks did not detect this conformance
defect; they were never W3C zero-error evidence.

Changed: added exactly one option as the first child of that select:
`<option value="">Chọn thời lượng</option>` in index.html. No CSS was changed.
Kept: required validation, the canonical selected value of 20 minutes, and the
existing other choices. Rejected: no user rejection was recorded; required was
not removed to suppress the reported error.

Focused verification actually run: opened the local file offline with JavaScript
disabled in the existing temporary browser configuration. The first option's
value was empty, the selected value remained "20", and both select and form
were valid. Selecting the empty option and submitting produced valueMissing,
focused slot-duration and did not navigate. Restoring "20" made the form valid.
At the configured 360px viewport, horizontal overflow remained false. The metric
script emitted its results through an intentional tagged diagnostic exception,
as in the earlier CLI checks. No new screenshot or broad UI audit is claimed.

Remaining gate: upload the updated index.html to W3C Nu again. The screenshot
proves the prior version failed; no post-fix W3C zero-error result has been
obtained in this follow-up. Save a real result after rerunning. Other pending
integration/accessibility gates from HUY-01 remain unchanged. No commit, push
or merge was performed.

## HUY-01 - review of user-supplied evidence (2026-11-08)

Tool: Codex, local Python/Pillow and Poppler pdfinfo/pdftotext/pdftoppm.
Asked for: inspect the completed evidence folder `../ClubFlow-evidence/`.
The actual prompt is recorded in ../ai-prompts/huy.md, entry 5.

Observed files: index-360.png (720 x 16236 image pixels), index-768.png
(1536 x 10844), index-1280.png (2560 x 7770), and index-w3c.pdf (one A4 page).
The image widths are twice the named CSS viewport widths, consistent with
2x screenshot scaling; image dimensions alone do not establish clientWidth
or the browser devicePixelRatio setting.

Read the PDF text and visually inspected its rendered page. It identifies
index.html, vnu 26.11.5, Check by file upload, and explicitly states:
"Document checking completed. No errors or warnings to show."
Its printed time is 2026-11-08 21:58 local time. This is now user-supplied
evidence of a successful W3C check: zero errors and warnings for the uploaded
index.html. It supersedes the earlier pending W3C gate for Screen 1. The
assistant did not itself upload the file or rerun the remote checker this turn.

Viewed all three full-page screenshots and readable inspection crops. The
mobile screen stacks its sections; the tablet screen has two-column position
cards; the desktop screen has the form and summary sidebar. No actionable
layout overlap or horizontal clipping was observed in the captured states.
Canonical dates, quotas 3/2/2/2, 20-minute duration and rooms A/B/C are visible.
The numeric zero in the red card is the labeled illustrative invalid state,
not a replacement campaign quota. Previews are closed in these user images.

Kept: all user-supplied originals unchanged. Changed: only appended this actual
observation and its prompt to Huy's own logs. No HTML/CSS changes were needed.
Rejected: no user rejection or additional defect was observed or invented.
Inspection copies were created outside the repository under
`D:/Temp/clubflow-evidence-review-20261108/`.

Limits: screenshots/PDF do not independently establish offline/JS-disabled
configuration, exact CSS viewport metrics, keyboard interaction, or completed
DevTools Accessibility/contrast inspection. Earlier assistant browser checks
remain separate evidence; these static files are not a new runtime check.
Cross-page navigation still awaits review.html integration. No commit, push or
merge was performed. The team's other screens and full submission remain
outside this Screen 1 evidence review.

## PA#3

### R0

23 November 2026 · Thái Quang Huy (24127177) · `main` at `481144c`. [Actual request](../ai-prompts/huy.md#r0)

- **Tool.** Codex, read-only Git inspection, PDF text extraction and local byte comparisons.
- **Asked for.** Correct Task 0 planning, establish per-member evidence ownership, and install the supplied 17-task library. Only R0 was invoked.
- **Kept.** All six PA2 member records, Task 0's original four-file scope, prompt and log entry, and the four untracked course/checker inputs.
- **Changed.** Updated the plan and team rules for ownership, staging, evidence consolidation, T3/H2 responsibilities, Applicant slot IDs, schedule preview/save/confirmation, checker order and the two demo runs. Appended the entire R0 request to the root brief and Huy's prompt record, and added one R0 entry to each designated log.
- **Rejected.** No user rejection or corrective follow-up. A pre-write text-match check caught a stale replacement target. A combined write command was also rejected before execution. Codex used smaller, scoped edits and verified their results.
- **Checks.** Inspected HEAD, branch, staged and unstaged changes, untracked files, the four Task 0 documents, all six PA2 member files, both course PDFs and the checker guide/source. Confirmed the checker credits the first matching table row. Compared both copies of the attachment byte for byte, checked the 17 task headings and their order, and verified Task 0 and PA2 prefixes against the intake snapshot. Compared changed paths, index and refs, and inspected `git diff -- docs/api mock`. Huy's review is pending.

**Presentation follow-up · 23 November 2026 · Codex on `main` at `481144c`.** Huy requested the original PA2 library layout and a usable PA3 index. [Exact follow-up](../ai-prompts/huy.md#r0-follow-up)

- **Changed.** Adapted the title, course details, Section A prompt library by owner and Section B chronological register from `c2cbe6f:brief.md`. Added 17 task links with copyable invocations and exact source-line ranges. Wrapped the original Task 0 and R0 texts in separate disclosures.
- **Kept.** Both received texts including Markdown escapes, the original task order and a single complete R0 package in the root brief. Logged the request as a continuation of R0.
- **Rejected and checked.** A preview trial using text-fragment links did not reliably reveal text in the closed R0 record. Replaced them with native heading links. In an isolated VS Code Markdown Preview, activated all 17 task links and toggled both disclosures. Checked the local document links, source ranges and original SHA-256 hashes against the files.

### T1

23 November 2026 · Thái Quang Huy (24127177) · `main` · clean starting checkpoint `143d8526516ed592adcdbce4e3b6a7f2531233e2`. [Actual invocation and follow-ups](../ai-prompts/huy.md#t1) · [Contract index and walkthrough](../api/README.md)

- **Tool.** Codex, PowerShell, Git, Poppler text extraction and Node v24.14.1. Read the rubric and final brief, team plan and task block, checker guide and local checker source.
- **Asked for.** Draft the English C1–C11 contract for team review.
- **Kept.** The two agreed demo stories, the three roles, the named accounts, the shared API error format, existing PA2 evidence and the contract-before-mock checkpoint.
- **Changed.** Added an endpoint index and nine ordered resource files. Specified the Applicant-safe club slot grid, multipart limits and duplicate IDs, private note/CV projections, read-only preview, revalidated save and confirmation, assigned assessments, and atomic publication of one decision and notification per application. The draft proposes a text feedback field for the runnable example. Any prescribed assessment fields and extra screening-rejection notification remain product-owner questions.
- **Rejected.** One multi-file documentation patch was rejected before writing because it listed the same target twice. Grouping its hunks by file succeeded. No product-owner answer, user rejection of an API field or team review was recorded.
- **Static checks.** Using the supplied checker's actual Markdown, HTTP, curl, answer and endpoint-table parsers without its network runner, parsed 68 request/answer pairs in 10 files. All 26 index rows matched examples, all 26 had a successful example, and every example matched a row using first-match order. Checked JSON and error shape, five generated multipart uploads, four PDF/CSV answer blocks, four named tokens, first successful sign-in, local contract links and each final Changes section.
- **Sequence checks.** Static assertions traced README-first seed reads, pristine creation, failed nested quota and publication, shared slot IDs, the 5,242,880-byte boundary and one byte over, A01/A02 creation and duplicate ownership. Checked preview versus saved revisions, the open-window, unassigned and applicant-overlap refusal examples, adjacent repaired slots, confirmation at revision 5, early/duplicate assessments, private A02 and one owner notification after repeating A01 publication. The independent pending-A03 and interviewer-only/room-only scenarios are specified for T2. These checks compared the documents, without sending requests.
- **Diff and handoff.** Reviewed the new files and the two append-only evidence changes against the starting checkpoint, the staged index and `git diff -- docs/api mock`. T1 has no mock, frontend, build or live checker result. T2 owns HTTP replay, all four modes, independent refusal cases and actual binary/CSV content and access checks. All three team members review before Huy's separate contract commit.

#### T1 follow-up — product-owner rulings

23 November 2026 · Thái Quang Huy (24127177) · Codex on `main`. [Technical request excerpts](../ai-prompts/huy.md#t1-follow-up--product-owner-rulings)

- **Tool and checkpoint.** Read the two expanded replies in the browser snapshot from the preceding Facebook inspection and matched the full reply IDs to Huy’s links. A fresh web fetch was throttled. Compared HEAD `143d852` and the previous staged T1 tree `1d3ac7f76d5a7d2c77b609d5cfe09c9d23e19a94` (12 paths). The worktree matched the index at intake with no additional untracked paths. This is a continuation of T1.
- **Asked for.** Apply both product-owner replies to the contract, checker examples, walkthrough and acceptance criteria. [Scheduling and assessment](https://www.facebook.com/groups/wad.fit.hcmus/posts/28572271735804960/?comment_id=28728568636841935&reply_comment_id=28731471893218276) · [Application and result rules](https://www.facebook.com/groups/wad.fit.hcmus/posts/28572271735804960/?comment_id=28742432092122256&reply_comment_id=28745446111820854)
- **Kept.** The one-campaign timeline, two independent applications for Student A, read-only schedule previews, C9 gates, assigned-only interviews, PDF and motivation limits and the separate contract-before-mock checkpoint.
- **Changed.** Bound five profile fields to the Applicant projection and split the frozen offered windows from the adjustable interview grid. Added explicit screening release and separate public reason, chronological first-fit, missing/absent case handling and one campaign final release with per-application decisions and notices. Added a login for the existing second Applicant to exercise inbox isolation. Updated the owner handoffs, demo and QA in the plan. Whether CV rejection separately requires a notification remains open.
- **Rejected / detected.** The prior proposal required an assessment and allowed independent final publication. Both contradicted the public rulings. A pre-write guard initially flagged the existing literal section signs in the plan; it was narrowed to detect newly introduced markers. A static assertion expected the duplicate-window request before the identity-spoof request. Inspection of the actual multipart blocks showed the reverse order; corrected the assertion and reran the checks.
- **Static checks.** Node v24.14.1 used the supplied checker's parsers in README-first, filename and example order, with its HTTP runner disabled. Parsed 89 paired examples across 10 contract files, covering 27/27 unique index rows in first-match order, each with a success example. Every example matched an index row. Verified JSON/errors, 8 multipart uploads, 4 binary/CSV answer blocks, five named accounts, role projections, document links and final Changes headings.
- **Sequence checks.** Checked two-window, duplicate-window and spoofed-identity rejections before A01, account contacts versus A02's override, and unchanged offered IDs through the successful 20→30→20-minute duration edits. Compared pre/post screening projections and the private note. Traced preview/save revisions and C9 refusals, A01 assessment, A02 absent with null assessment, two blocked releases, one successful release and an identical retry. The documented inbox counts are 0 then 2 for Student A and 0 for Student B. Checked the direct-seed time/ID ordering independently of the schedule table display order.
- **Review and remaining checks.** Huy reviews the account projection, lock and atomic release; Học reviews form/read-only identity, screening privacy and owner results; Phúc reviews first-fit, interval coverage and case handling with Học. Live request/response parity, concurrent writes, real account isolation, four modes, actual file contents and independent direct-seed scenarios remain T2 checks. No live mock, T2, commit or push.

#### T1 approval

23 November 2026. Huy reported that all three members had approved the contract and authorized the local T1 commit on `main`. The final staged diff covered the 10 API contract files, the team plan and Huy's two evidence files. The static parser check found 89 paired examples covering all 27 indexed endpoints, each with a success example. `git diff --cached --check` passed. HTTP replay remains a T2 check. [Commit instruction](../ai-prompts/huy.md#t1-approval)

### T2

23 November 2026 · Thái Quang Huy (24127177) · Codex on `main`. Started from clean T1 commit `7e4570ee409f045d3672740864bb993e57fc3b1a`. [Exact invocation and library revision](../ai-prompts/huy.md#t2) · [Approved contract](../api/README.md)

- **Tool.** Node v24.14.1, PowerShell, Git, the supplied contract checker and Poppler. The mock uses only Node built-ins and local fixtures.
- **Asked for.** Implement the reviewed API, run the creation walkthrough on fresh processes, and verify the direct seed, privacy, scheduling and final publication through HTTP.
- **Kept.** The 27 T1 operations, five named accounts, deterministic seed and clock, frozen Applicant windows, separate screening release and campaign-wide final publication. A separate rejection notification remains an open product-owner question.
- **Changed.** Added `mock/server.mjs`, the seed and readable sample CV under `mock/data/`, and the Demo accounts table in `FRONTEND.md`. The server validates each write against current state after decoding the request. A restart restores the seed and the five demo sessions still work.
- **Rejected / detected.** Independent requests initially exposed two defects. Deleting frozen windows down to two returned 400 instead of 409, and a qualified interviewer's out-of-order availability produced a false Unassigned row. The mock now checks the freeze before validating the new window count and stores validated availability in time order. Two additional probes exposed a dropped connection after an oversized upload and an ambiguous validation key on the second copy of a schedule row. The mock now drains oversized requests with bounded buffering and identifies a duplicate by its submitted index. All four cases passed on the final source.
- **Official checker.** Each of three full runs started a fresh normal mock on port 3001. The first two used the optional JSON report flag. The final command was `node tools/contract-check.mjs --base http://localhost:3001`. Each run answered 89/89 examples, covered 27/27 indexed operations, exited 0 and reported zero FAIL lines. Each produced the same four NOTE lines for examples with headers and no expected body. The request sequence exercised creation, the 5 MiB inclusive CV boundary, rejection one byte over, screening snapshots, confirmation, assessments and release.
- **Four NOTE dispositions.** The Executive applications export (`04-applications.md:633`) returned the expected eight columns and all three sorted seed rows across a one-row list page. The Executive schedule export (`05-schedule.md:760`) returned the expected ten columns and both confirmed assignments. Checked CRLF, UTF-8 MIME, attachment names, CSV quoting and formula-leading text. Applicants and Interviewers could not export either CSV. For the Executive CV (`04-applications.md:728`) and the assigned Interviewer CV (`06-interviews.md:82`), checked the PDF MIME, filename and bytes against the fixture. Downloaded the file, opened its one-page A4 render and extracted readable text. Poppler reported a local Symbol display-font warning while rendering. The owner could also download the CV, while an unrelated Applicant and an unassigned Interviewer received 403.
- **Independent HTTP checks.** The two local test scripts passed 22/22 and 4/4 scenarios on fresh processes. Tested all four C9 gates in isolation, each of the three overlap resources, all four generation failure reasons, recovery after setup edits, stale revisions, chronological first-fit and the time tie-break. Also verified closed and simultaneous duplicate submissions, private contacts and feedback, confirmed write locks, early and duplicate assessments, an absent case with a null assessment, and two simultaneous publication requests yielding exactly two notices for Student A and zero for Student B. Stale writes and refusals preserved saved state.
- **Modes and restart.** Reused tokens issued by a previous process. One Executive `GET /api/campaign/draft` on loopback took 162 ms in normal mode and 2,008 ms in slow mode. Error mode returned the shaped 500 and still allowed sign-in. Empty mode retained singleton identity and role checks, emptied nested lists and zeroed list-derived counts. Restart restored all three seed applications, the initial clock and one-shot creation eligibility.
- **Verification artifacts.** Local QA directory `D:/Temp/clubflow-t2-8ba67f4a/` holds the last official transcript (`checker-3.txt`), before-fix results, both independent runners (`verify.mjs`, `additional.mjs`), final reports (`independent-final.json`, `additional-final.json`), request logs, both CSV downloads and the rendered CV. The runners use the repository root as their working directory. The mock passed `node --check mock/server.mjs`. Browser integration belongs to the scaffold and feature tasks. Huy reviews the staged mock before making the separate T2 checkpoint.

#### T2 follow-up — staged mock review

23 November 2026 · Thái Quang Huy (24127177) · Codex on `main`. Reviewed the six staged T2 files against T1 commit `7e4570ee409f045d3672740864bb993e57fc3b1a`. The initial staged server blob was `cd2cd3e90404196d443851f7758a32e1ea656fec`. [Review and repair requests](../ai-prompts/huy.md#t2-follow-up--staged-mock-review)

- **Tool and scope.** Used Git, Node v24.14.1, the supplied checker, independent localhost HTTP clients, qpdf and Poppler. Compared the endpoint index with registrations in both directions and the five sign-in accounts with the published table. The repair touched the mock server and Huy's two evidence files.
- **Asked for.** Review the staged mock against T1, repair verified issues, rerun the checks and stop at the staged diff.
- **Rejected / reproduced.** Seven observations differed from expected behavior before editing. C3 rejected browser-generated ISO timestamps. C5 accepted a 301-word motivation with Unicode NEXT LINE separators and an email with an invalid domain label. C7 omitted invalid filter fields when the same request included an unknown parameter. Public sign-in refused valid credentials with an obsolete bearer. CV downloads lost Vietnamese filename characters, and an accepted signature-only stand-in with an EOF marker returned 200 with an unreadable 32-byte file. Poppler could not find its cross-reference table.
- **Changed.** The mock handles fractional instants during validation, comparisons and clock advances. It counts Unicode word separators and validates email domain labels. Query and body validators collect errors before writes. Public sign-in uses the submitted credentials. Downloads include the original UTF-8 filename when needed and use the readable fixture for signature-only stand-ins without a cross-reference table or stream. This check distinguishes demo placeholders and does not verify every page in arbitrary uploaded PDFs.
- **Kept and verified.** Known valid PDF 1.3 and 1.5 uploads with different cross-reference formats round-tripped byte for byte and passed qpdf checks. Read the replacement PDF with Poppler, extracted its text and inspected the rendered page. Poppler emitted the same local Symbol font warning. Verified invalid requests preserve the last saved state, a stale bearer still fails on protected reads, concurrent first intake and setup replacement cannot both win, and manual attendance without feedback permits release only after every required decision.
- **Results.** Both the review baseline and final run started a fresh normal process on port 3001. Each `node tools/contract-check.mjs --base http://localhost:3001` run with the optional JSON report returned 89/89 examples, 27/27 endpoints, exit 0 and zero FAIL lines. The four expected notes were the two CV downloads and two CSV exports documented above. The final independent runs passed the 26 earlier scenarios, all 17 review probes and nine additional boundary cases. `node --check mock/server.mjs` also passed.
- **Local reports.** The before-fix report is `D:/Temp/clubflow-t2-review-62aab885/findings.json`. In its `after/` directory, `summary.json` indexes the counts, `official-final.json` lists every checker response, and `findings.json`, `boundary-checks.json`, `independent-final.json` and `additional-final.json` record the separate HTTP checks. Browser and frontend integration remain for T3 and the feature tasks.

#### T2 approval

23 November 2026. Huy authorized the local T2 commit on `main`. The staged diff contained the six reviewed T2 files. Before committing, Codex ran `node --check mock/server.mjs` and the contract checker against a fresh normal mock on port 3001. The checker exited 0 with 89/89 examples, 27/27 endpoints and the four previously reviewed PDF/CSV notes. [Commit instruction](../ai-prompts/huy.md#t2-approval)

### T3

23 November 2026 · Thái Quang Huy (24127177) · Codex on `main`. Started at clean T2 commit `90db813fb29c6a43fd93dcdf4eeed763f26487e3`. [Exact invocation and library revision](../ai-prompts/huy.md#t3)

- **Tool.** Git, Node v24.14.1, npm 11.11.0, Vite 8.3.8, React/React DOM 19.3.1 and React Router DOM 7.18.6. Used Playwright CLI for a screen snapshot and Python Playwright with local Chrome 157.0.8103.79 for repeatable browser checks. Browser tools ran outside the client package.
- **Asked for.** Deliver the shared routing, authentication, transport, shell, demo controls and feature entry points on the approved mock. Stop at the staged diff.
- **Kept.** The PA2 system font, colour and spacing conventions, visible keyboard focus and 44 px controls. The API contract, mock and PA2 files stayed at their previous revisions. Both Vite proxies forward relative API calls to port 3001.
- **Changed.** Registered all 12 planned route patterns and named page exports, role homes, record links, a denial view and the unknown-route fallback. Added the shared `useAuth()`, `apiRequest()`, `ApiError`, `LoadingState`, `ErrorState` and `EmptyState`. Restored sessions before guards, retained authorized local return paths and cancelled abandoned requests. Added all three Executive demo actions with server time and capability checks. The feature entries read actual records and show prerequisites. Campaign editing, applications, screening, schedule mutations, assessments and final decisions remain with the feature owners.
- **Rejected / detected.** The first browser run timed out after signing out from Executive home. Clearing the synchronous session store could activate the protected-route redirect before the router completed navigation. Opted out of deferred browser-router transitions and reran the sign-out, Back, expired-session and re-login checks. A CLI snapshot also exposed an unnecessary favicon request returning 404. The final entry explicitly suppresses that request. The Executive header was shortened after inspecting the 360 px render.
- **Install and build.** Pinned the four direct packages and generated the npm lockfile. Ran `npm ci --no-fund`, `npm run dev`, `npm run build` and `npx --no-install vite preview` from `client/`. Dev and preview both served direct browser routes and forwarded real API requests. The build succeeded with two bundler warnings about React Router's module-level `use client` directives. The built browser app passed the preview tests. Its JS asset is `index-DmOu4xad.js` (SHA-256 `883c14e25cddfd30ab37306aa9f3d27542db8de3fbbe56436e1ce29f6a74d558`).
- **Browser and API checks.** Signed in all five demo accounts on both dev and preview. Verified field errors and retained inputs, double-submit protection, refresh, Back, sign-out, local return with search and fragment, and fallbacks for a wrong role, another owner's record and an external destination. Verified 401 reauthentication, 403 denial, 404 display, confirmed interview links and assigned-only access. Exercised real JSON, FormData, authenticated PDF/CSV blobs, structured errors, aborts and rejected non-API paths. Switched the mock between normal, slow, error and empty, retried in the same authenticated tab after restart, exercised the demo-disabled profile and checked all three demo actions, including a blocked backward step.
- **Layout and local artifacts.** The final suite passed 14 check groups with zero uncaught browser exceptions. Direct-loaded 12 planned routes plus the fallback at 360, 768 and 1280 px (39 observations), checking one h1 and horizontal overflow. Inspected the rendered UI, tested the expanded Executive controls at 360 px and a 200% root font size. Three additional preview checks covered the keyboard skip link, an unreadable stored session, leaving sign-in during a slow response and local-only asset delivery. Reports and screenshots are under `D:/Temp/clubflow-t3-b8833b6d/` in `final-report.json`, `offline-report.json` and `final-*.png`.
- **Handoff.** The generated preview is in `client/dist/`. Huy reviews the staged source and separately commits the scaffold. Build and verify the exact committed SHA before publishing the shared baseline and splitting branches. Root evidence consolidation belongs at that verified checkpoint.

#### T3 follow-up — staged scaffold review

23 November 2026 · Thái Quang Huy (24127177) · Codex on `main` at `90db813fb29c6a43fd93dcdf4eeed763f26487e3`. [Review and repair requests](../ai-prompts/huy.md#t3-follow-up--staged-scaffold-review)

- **Tool and scope.** Inspected the staged scaffold against the T3 brief, route matrix and API contracts. Used Git, Node v24.14.1, npm 11.11.0, Vite 8.3.8 and Playwright with Chrome 157.0.8103.79. Exported the index to a temporary directory to install and build the staged sources independently.
- **Asked for.** Perform a strict review, repair reproduced T3 defects, rerun verification and stop at the staged diff.
- **Rejected / detected.** A second Executive session renamed the draft and advanced the clock to 21 November. Returning to Campaign editor in the first session still showed the old name, 16 November and an enabled creation button, even after the server refused it with HTTP 409. A successful keyboard clock action left focus on the document body. C4 asked the Executive to save an already saved campaign. After all candidates were screened out and the draft schedule was confirmed, C8 and C11 instructed the Executive to shortlist or confirm again. Direct sign-in with a trailing slash and access-denied screens showed the wrong tab title. When a local HTTP connection closed during a successful response body, the blob read threw a raw TypeError and the JSON read reported an invalid response with status 200.
- **Changed.** Resource reads revalidate on route entry. The demo controls refresh the server state after a conflict and keep keyboard focus on the summary. The empty views describe missing interview setup, confirmed schedules with zero assignments and empty results. The active screen supplies the document title. Interrupted JSON and blob transfers report the shared network ApiError.
- **Kept and verified.** The 12 contracted routes, 12 page exports, wildcard fallback and both Vite proxies passed. Ran `npm ci --offline --no-audit --no-fund` and `npm run build` from staged sources. Ran dev and production preview against the mock. Both the original and repaired snapshots passed 14 check groups (including all five sign-ins and the four mock modes), 39 layout observations at 360/768/1280 px and three supplemental checks, including local-only runtime assets. The repaired build also passed seven targeted groups covering the issues above, with zero uncaught browser exceptions. Checked that a stale creation attempt sends one POST, reads the draft once, and disables the action. The build produced the same two React Router module-directive warnings seen at the initial T3 checkpoint.
- **Local evidence.** `D:/Temp/clubflow-t3-review-812bc7a493/` contains the original findings (`findings.json`, `empty-case.json`, `body.json`). Its `after/` directory holds `review-report.json`, `offline-report.json`, `targeted-report.json`, the interrupted-transfer and empty-schedule observations, and build output. The independently built JS and the workspace build were byte-identical by SHA-256 (`index-4gKBfMVt.js`, `dd7c14acf79deade0de83ec246c194e9d9b8f1c254927ed2d84191941bdf9f1f`). The full feature workflows remain with their owners after the scaffold checkpoint.

#### T3 approval

23 November 2026. Huy authorized the local T3 commit on `main`. Before committing, Codex verified that the Git blobs for all 14 staged client files matched the snapshot used for the successful scaffold review. The staged diff also contained Huy's two evidence files and passed `git diff --cached --check`. [Commit instruction](../ai-prompts/huy.md#t3-approval)
