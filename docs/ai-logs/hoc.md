# Học — actual assistant task log

## 2026-11-08 — HOC-01 on `pa2/hoc-review`

Tool: Codex in the local workspace; exact model/version not independently recorded.

Asked for: Create the requested Application Review screen on Học's feature branch,
using the eight specified applications and changing only `review.html`,
`css/review.css`, and Học's own prompt/AI logs. The exact prompt is recorded in
[`ai-prompts/hoc.md`](../ai-prompts/hoc.md). Huy's later PR feedback asked for
an Executive note field, Shortlist/Reject controls, and a CV preview readable in
HTML.

Kept: Plain semantic HTML/CSS, the shared stylesheet API and tokens, native
`details`/`summary`, explicit static-prototype labels, per-application decisions,
the required campaign dates and canonical counts. A01 and A02 remain separate
application records for one student and distinct positions. No JavaScript or
external asset was added. Huy's requested controls remain visibly disabled in
this static prototype; the HTML CV is explicitly illustrative and not an actual
attachment.

Changed: Created the review screen and its page stylesheet, plus this task log
and the actual-prompt record. Search/filter/sort/export/pagination controls are
disabled and described as illustrative; the list and sample details remain
available as HTML. CVs are described as unavailable local files with a
non-downloadable preview state. Executive-only notes are marked as sample data;
the page states that it does not enforce role access. The scheduling handoff
passes only A01–A05. In the follow-up QA pass, removed an `aria-label` from a
generic preview `div`; its visible heading already names the preview and avoids
an unnecessary ARIA name on a generic container. Set the document title to the
exact string `Application Review`. For Huy's review feedback, replaced the
placeholder CV box with a readable semantic HTML sample for ST01, added eight
labeled sample note textareas with unsaved behavior explained, and added a
disabled Shortlist/Reject control pair for each application with its recorded
state shown. Updated the footer route note because `index.html` arrived when
`main` was merged into this branch; `schedule.html` is still absent.

Rejected: No user rejection was recorded. No CV file, live backend behavior,
verification claim, or passing validator/accessibility result was invented.

### Sources and repository observations

- Read `AGENTS.md`, `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`,
  `docs/SHARED_CSS_CONTRACT.md`, `css/styles.css`, and the available
  `brief.md` prompt pack.
- The official PA#2 rubric PDF and ClubFlow final-brief PDF were not found in the
  project folder tree, and were not reviewed in this task. `PROMPT 00` and
  `PROMPT 03` in `brief.md` were read.
- No CV files were present in the repository file inventory. The motivation
  statements and Executive-only notes are clearly illustrative sample content.
- The sibling routes `index.html` and `schedule.html` are not present on this
  branch's starting baseline. Required relative links are included for Huy's
  and Phúc's later screen integration; those destinations still need checking
  after merge.

### Actual errors and checks

- The Git metadata helper was run before and after branch creation, and again
  after the user's requested Codex restart. Each attempt failed with
  `App Server exited before responding`; synchronization of this chat's stored
  Git metadata is therefore not claimed.
- Initial `git switch -c pa2/hoc-review` was blocked because `.git` was
  read-only in the sandbox. The user had explicitly requested the branch; the
  operation then succeeded with the reviewed elevated command. The branch was
  created at `39ad2e5` in the verified checkout
  `D:\Projects\School Project\clubflow`.
- Browser opening of the requested `file://` page was blocked by the browser
  URL policy, which disallowed the protocol and prohibited trying another
  browser surface or a workaround. The assistant therefore performed no
  viewport browser measurements, visual inspection, JavaScript-off browser
  check, or DevTools Accessibility review.
- Navigating to the official W3C Nu validator reached its Cloudflare
  “Performing security verification” page rather than the validator form. No
  challenge was attempted or bypassed; the assistant did not upload HTML, and
  has no validator result from its own attempt.
- A first local `lxml` parse mistakenly used its XML parser and failed on the
  valid HTML5 `header` element. Retrying with its HTML parser produced 91
  `HTML_UNKNOWN_TAG` diagnostics for HTML5 semantic elements such as `header`,
  `nav`, `main`, `section`, `details` and `time`; this older parser is not an
  HTML5 validator, so those diagnostics were discarded as validation evidence.
  Its separate structural counts found 4/4 labeled form controls, one `h1`, no
  duplicate IDs, no broken in-page fragment targets, and no skipped heading
  levels.
- Static source checks confirmed eight list cards (5 Shortlisted, 3 Rejected),
  the explicit Pending=0 counter, shared CSS loaded first, no `overflow-x:hidden`
  or `!important`, and no trailing whitespace. These checks do not establish
  rendered layout, tap-target sizes, color contrast, or W3C conformance.
- A first CSS-variable scan only recognized hexadecimal properties and
  incorrectly flagged spacing/radius tokens. Re-running it against all custom
  property declarations found 15 referenced variables and no unresolved names.
  A source-token contrast calculation for shared text/status/button pairs ranged
  from 6.61:1 to 17.85:1; this is not a rendered-page or DevTools contrast audit.
- The final static tree check found 4/4 labeled form controls, one `h1`, no
  duplicate IDs, no broken in-page fragments, and no skipped heading levels.
  The required page anchors to `index.html` and `schedule.html` remain unresolved
  in this branch because those sibling files are not present yet.
- The user supplied nine screenshots. They show a Nu HTML Checker result for
  `review.html` with vnu 26.11.5 reporting “No errors or warnings to show,” and
  Console measurements of `clientWidth`/`scrollWidth` 360/360, 768/768 and
  1200/1200, all with overflow `false`. These are user-provided results, not
  measurements run by the assistant. The 1200px screenshot did not substitute
  for the required 1280px viewport.
- A subsequent user screenshot shows the page open from `file://` at 1280px and
  Console values `clientWidth: 1280`, `scrollWidth: 1280`, `overflow: false`.
  The DevTools sidebar shows no console errors or warnings. This is user-supplied
  evidence, not a browser run by the assistant. The three required widths now
  have screenshot evidence of no horizontal overflow, but the image does not
  show JavaScript disabled, keyboard traversal/disclosure operation, or the
  DevTools Accessibility panel.
- The user then reported JavaScript-off and keyboard/disclosure checks passed.
  Their latest Elements-panel screenshot shows the `application-search` label's
  `for` value matching the selected input's `id`; it does not show the computed
  accessible name in the Accessibility pane.
- A subsequent user screenshot shows the Accessibility pane for that search
  input: computed Name `Search applications`, Role `searchbox`, and Disabled
  `true`. This verifies the computed accessible name for this control; the
  disabled state is intentional for the illustrative static controls.
- A further user screenshot shows the h1 with computed Name `Application
  Review`, Role `heading`, Level `1` in the Accessibility pane.
- The user subsequently confirmed that the remaining requested checks passed,
  including landmarks, contrast and target sizes. These are user-reported results;
  the assistant did not independently run the browser checks.
- Before staging, the required current-chat metadata helper was run again with
  the verified cwd/root. It failed with `App Server exited before responding`.
  Per the handoff instructions, no staging, commit or push was attempted; no
  metadata synchronization success is claimed.
- After the user again authorized commit and push, the helper was retried with
  the same verified cwd/root and failed with the same App Server error. The
  assistant therefore left the Git index, commit history and remote unchanged.
- The nine earlier user-supplied screenshots are logged as evidence above and
  in `ai-prompts/hoc.md`. The final updated screen screenshots are documented
  below.
- Remaining integration check: confirm sibling routes `index.html` and
  `schedule.html` after Huy and Phúc integrate their pages. `index.html` is now
  present on this branch following the merge from `main`; `schedule.html` is not.
- After Huy's new PR feedback was applied, static source checks found eight
  labeled note textareas, eight disabled decision groups with two buttons each,
  one semantic HTML CV sample for ST01, 8 application cards with the expected
  5/3 statuses, one h1, no duplicate IDs, no broken fragment links, no heading
  skips, no scripts/external assets, and no forbidden CSS patterns. An initial
  ad-hoc checker command had a malformed regex; it was rerun with string checks.
  Browser rendering and W3C Nu were not rerun after these feedback changes, so
  the older user screenshots do not verify this updated version.

## Final screenshot and handoff (2026-11-09)

Tool: PowerShell for safe file renames; Git CLI for repository checks; GitHub
connector for PR lookup. The user captured the screenshots in the local browser
after the feedback changes, then asked that they be renamed and the branch
reviewed for handoff.

Asked for: Rename the three screenshots to the repository's required review
viewport names, perform a final criteria review, and commit, push, and update
the existing PR if the result is ready.

Kept: The user-provided full-page captures match the final review page visually.
Their PNG dimensions are 720x16384 (360px viewport at 2x), 1536x12118 (768px
viewport at 2x), and 2560x7360 (1280px viewport at 2x). User-reported Nu,
JavaScript-off, keyboard/disclosure, accessibility, contrast, target-size, and
overflow checks are not represented as assistant-run checks; Nu and interactive
checks were not rerun by the assistant after Huy's feedback changes.

Changed: Renamed the user-captured files to `screenshots/review-360.png`,
`screenshots/review-768.png`, and `screenshots/review-1280.png`; visually
inspected all three. `git diff --check` reported no whitespace errors.
The first sandbox staging attempt could not create `.git/index.lock`; staging
the same explicitly scoped file list succeeded on the approved elevated retry.

Rejected: No W3C result or accessibility check was invented. The official
rubric and final-project brief PDFs were not present in this checkout; this
review used `AGENTS.md`, `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`, `brief.md`, and the
user-supplied team contract. The required chat metadata helper failed with
`App Server exited before responding`; the verified terminal checkout is the
expected repository and `pa2/hoc-review` branch, but metadata sync is not
claimed. The existing PR targets `main`; `schedule.html` remains a sibling-task
integration dependency and is absent from this checkout.

Handoff result: commit `f1dbff3` was pushed to `origin/pa2/hoc-review`. Existing
PR #2 was updated with the summary and QA limits, attached to this Codex task,
and a review was requested from repository owner `ThaiQuangHuy2906`. The PR
remains open and was reported mergeable; it was not merged.

## PA#3

### A1 · C5 Applicant Submission (2026-11-24)

Tool: Codex with Git, PowerShell, Node.js, npm, Vite and Playwright Core driving
headless Chrome 157. The A1 request and branch-preparation follow-up are in the
[verbatim prompt record](../ai-prompts/hoc.md#pa3).

Asked for: Implement and verify the Applicant submission at
`/apply/:positionId` from the approved ClubFlow baseline. Leave the working
diff for Lê Nguyễn Quốc Học (24127044) to review after A1.

Kept: The existing Applicant route guard, shared session and API client,
resource states, named applications exports and all PA2 evidence. Used the
published position, profile, intake flag and windows from the Applicant
campaign projection.

Changed: Added the position form, feature CSS, field and file validation,
multipart upload, in-flight submit guard and ID-based redirect for new and
duplicate responses. Inline API errors preserve the form, including the
selected CV. Appended the literal messages and source revision to the prompt
record. Added local branch `pa3/hoc-applications` from
`521f3a9cc83e302ac796680bb5feb7b464bed024` under the user's follow-up authorization.

Rejected: None from the user. The first browser run timed out with separately
started local servers. The first same-process retry encountered the mock port
already in use. Stopped the test processes from the first attempt and ran both
servers as children of the browser harness. An early Retry check clicked
before the replacement mock was listening and got a 502. The final check
waited for the mock API before clicking Retry, then verified recovery.

#### Actual checks

- Verified the Git root, Git directory, common directory, clean index and
  worktree, and full baseline SHA. The original request stopped on `main`.
  On follow-up, the local branch list and a live `git ls-remote --heads origin`
  lookup confirmed the feature branch was absent. Used a per-command
  `safe.directory` because Git reported different directory ownership.
  The Git metadata helper confirmed the original metadata, then reported
  `metadata_updated: true` and `metadata_matches: true` after the switch.
- Read `AGENTS.md`, the relevant sections of `PA3_PLAN.md` and `brief.md`,
  the campaign and application contracts, the setup/demo contracts needed
  for the walkthrough, the scaffold interfaces and the `FRONTEND.md` accounts.
- From `client/`, `npm.cmd ci --no-audit --no-fund` and
  `npm.cmd run build` exited 0. The final Vite build transformed 31 modules
  and emitted two module-level `"use client"` warnings from React Router.
- Ran `node check-a1.cjs` and `node check-a1-states.cjs` from the repository
  root using temporary Playwright scripts, with `node mock/server.mjs` on
  port 3001 and Vite `preview --host 127.0.0.1 --port 4174 --strictPort`
  serving the final production build. Both harnesses exited 0.
- In a fresh normal mock, Executive used the shell to begin creation. The
  harness published the campaign and configured windows through the Executive
  API because the baseline editor and setup screens are scaffolds. Student A
  submitted Content (201, A01) and Communications (201, A02) in Chrome.
  The A02 phone override left A01 and the campaign profile unchanged.
  Repeating Content returned 200 with `created:false`, opened A01 and
  preserved both the original A01 details and the total of two records.
- Verified the browser multipart boundary and the six allowed part names,
  with a separate part for each of the three selected window IDs.
  Two windows, an unoffered ID, malformed contacts, blank motivation,
  301 Unicode-whitespace-separated words and invalid CVs were refused
  before POST. CV cases included an extra byte, empty file, wrong extension,
  wrong MIME, wrong signature and a text file. Three windows, a 300-word
  motivation and a 5,242,880-byte PDF were accepted together. Two rapid
  button clicks produced one browser POST.
- An Executive window change after the Applicant opened the form produced a
  real 400 on `availabilityWindowIds`. The message appeared at the group and
  preserved contacts, motivation, file and selections. The failed POST
  consumed no ID and left availability unlocked. The first valid POST froze
  the windows. For the unused Events position, advancing the clock in
  a separate Executive session caused a real 409 `APPLICATIONS_CLOSED`.
  The focused alert and all entered values, including the CV and selected
  windows, remained on the form. Reload showed the closed campaign state.
- Verified visitor sign-in return, the Executive and Interviewer UI denials
  and POST 403 responses, prepublication, future opening, missing windows,
  invalid position and empty projection. A real mock 500 showed Retry, and
  switching the mock to slow mode let the same tab show Loading and recover
  with one additional GET. No outside-network requests or uncaught page
  errors were observed in the core walkthrough.
- Direct-loaded `/apply/content` at 360, 768 and 1280 px. Viewport and
  document scroll widths matched (360/360, 768/768, 1280/1280). Checked one
  h1, control labels, form/tap target geometry of at least 44 px and keyboard
  selection with Tab/Space. Checked focus and description associations on
  validation errors. Inspected screenshots and kept each time range together
  on narrower columns, then rebuilt and reran the browser checks.

#### Handoff and verification limits

- The course PDFs `course-materials/PA3-rubric-react-front-end.pdf` and
  `course-materials/ClubFlow-final-project-brief.pdf` were absent from this
  workspace. The linked checker guide and `tools/contract-check.mjs` were
  also absent. The full course checker, W3C Nu, other browsers and the
  integrated Executive editor/setup UI were outside the checks performed.
- The Applicant `GET /api/campaign` contract in `docs/api/02-campaign.md`
  returns the schedule and a single intake flag. Publish with an opening
  after the mock clock, then advance past closing and repeat the Applicant
  GET to see `acceptingApplications:false` in both cases. The page displays
  the opening and closing times alongside one unavailable state. Distinct
  early/closed labels would need an authoritative phase or clock in the
  Applicant projection from Huy.
- Inspected `git status`, `git diff`, the two new-file diffs,
  `git diff --cached`, `git diff -- docs/api mock` and whitespace checks.
  The index and contract/mock diffs were empty. The A1 handoff is the
  working diff on the feature branch for Học's review.

#### Review and commit follow-up (2026-11-24)

The user authorized a local A1 commit after verification. Codex reviewed the
full working diff against `521f3a9`, including both new files. The diff stayed
within the applications feature and Học's two evidence files. The configured
Git identity matched the author of Học's earlier review commit `f1dbff3`.

`npm.cmd run build` and both temporary Chrome checks, `node check-a1.cjs` and
`node check-a1-states.cjs`, exited 0 again. The build retained the two
React Router directive warnings. The browser checks repeated the pristine
submission and duplicate flow, input limits, failed-request retention,
role checks, all four mock modes and the three viewport widths. The source
and verification limits above still apply.

Self-review verdict: READY for the authorized local commit. The follow-up
added this record and the verbatim request. A2 remains a separate invocation.

### A2 · C6 My Applications (2026-11-24)

Tool: Codex with PowerShell, Git, npm, Vite and Playwright Core driving headless
Chrome 157. [Verbatim A2 request and brief revision](../ai-prompts/hoc.md#a2--c6-my-applications)

Asked for: Complete the signed-in Applicant's application list and detail
screens, verify each publication boundary on the mock and leave the working
diff for Lê Nguyễn Quốc Học (24127044) to review.

Kept: The A1 submission code and all five named exports. The existing Applicant
route guard, session, relative API client and shared resource UI still handle
access, loading, Retry, forbidden and missing records.

Changed: Added the API total, a separate linked record for each owned
application, published screening status and applicant reason, confirmed interview
time and room, and the released decision on the corresponding record. The
detail route also shows its saved submission information and a link back
to the list. Added responsive CSS scoped to the two Applicant screens.

Rejected: None from the user. The first layout test matched the list heading in
its loading state and measured before the records were rendered. The harness
now waits for the loaded list panel before checking layout and visibility.
The recorded prompt was compared with the actual request and a copy error in
the owner's name was corrected.

#### Actual checks

- Verified repository root, Git directory, common directory and a clean
  `pa3/hoc-applications` at the reviewed A1 commit
  `30bad3d4ca7df1d9839e83981af1bf8211876ec8`. Read `AGENTS.md`, the A2 block,
  C6/C9/C11, the Applicant application contracts and the current router,
  auth, API client and UI helpers. Read the schedule, assessment and results
  operations used for the mock lifecycle.
- Ran `npm.cmd run build` from `client/`. Exit 0, with the same two
  React Router module-level directive warnings seen at A1. Ran temporary
  `node check-a2.cjs`, `node check-a1.cjs` and
  `node check-a1-states.cjs` from the root. They used the final Vite preview
  build on loopback port 4174 and the real `node mock/server.mjs` on port
  3001. All three exited 0 on the final run.
- Student A opened A01 and A02 directly, refreshed both, returned via the page
  link and browser Back, and saw two separate records and the API total of
  two. Signed-in A03 showed Access denied (HTTP 403). A99 showed Record not
  found (HTTP 404). Student B's list contained A03 only and its read of A01
  returned 403. The Executive browser received the existing role denial on
  both routes before any application GET.
- Verified Submitted and hidden reasons before screening publication.
  Published Shortlisted for A01 and Rejected with a public reason for A02.
  Both list and detail showed the corresponding values. A saved change to
  Shortlisted on A02 stayed private until the next screening release.
- Created and saved a draft schedule via the Executive API. No draft time or
  room appeared for either record. After advancing the mock clock and
  confirming the schedule, both screens showed the distinct confirmed
  assignments (A01 09:00–09:20 in Room A, A02 09:20–09:40 in Room B, UTC+7).
- Saved a real interviewer assessment for A01 and its Pass decision, then
  observed a blocked campaign release while A02 was unresolved. A01's saved
  decision stayed hidden. After recording A02 Fail and handling the case,
  both results still stayed hidden until campaign publication. After release,
  the list and each direct detail showed A01 Pass and A02 Fail separately.
  Private note and assessment markers stayed out of the Applicant views and
  those fields were absent from the Applicant API details.
- Both routes handled real HTTP 500 responses with Retry. After restarting
  the mock in slow mode, each tab displayed Loading and recovered after
  one additional GET. Empty mode rendered 0 applications with an empty list,
  while A01's detail still resolved.
- At 360, 768 and 1280 px, both pages matched document and viewport widths.
  Checked one h1, named main links at least 44 px tall, Tab/Enter in both
  directions and visible focus. Inspected the six screenshots. Observed no
  uncaught page errors or browser requests outside the local preview in the
  normal A2 walkthrough.

#### Verification limits and handoff

- Used the documented Executive and Interviewer APIs to prepare lifecycle
  states because the dependent screens are scaffolds at this checkpoint.
  The test checks the Applicant UI against those real API transitions.
- The course PDFs and full checker remain absent in the workspace. This run
  used Chrome and the targeted mock tests. W3C Nu and other browsers were
  outside the checks performed.
- Inspected `git status`, the tracked and new-file diffs, `git diff --cached`,
  `git diff -- docs/api mock` and whitespace checks. A1's two form files,
  the staged diff and the API/mock diff were unchanged. Left A2 as a working
  diff for Học's review.

#### Commit follow-up (2026-11-24)

The user authorized a local A2 commit. Verified the full A2 working diff and
confirmed the configured author matched the A1 commit. `npm.cmd run build`
and `node check-a2.cjs` both exited 0 again. The build emitted the same two
React Router warnings. The Chrome run repeated ownership and navigation,
screening publication, schedule confirmation, campaign results publication,
four mock modes and keyboard/layout checks at all three widths. Recorded
the verbatim follow-up with A2.

### A3 · C7 Executive Application Review (2026-11-24)

Tool: Codex with PowerShell, Git, npm, Vite and Playwright Core driving headless
Chrome 157. [Verbatim A3 request and brief revision](../ai-prompts/hoc.md#a3--c7-executive-application-review)

Asked for: Complete the Executive review route, verify the filtering,
downloads, screening and publication behavior against the mock, and leave
the working diff for Lê Nguyễn Quốc Học (24127044) to review.

Kept: The Executive role guard, shared session and API client, router exports
and the A1/A2 source. Used the Executive projections and documented paths.

Changed: Added campaign statistics and a separately counted, searchable
and paginated list, with filters in the URL and independent request
lifetimes for the list, positions and selected application. Added an
in-flow detail panel with motivation, authenticated inline CV and PDF
download, and the full filtered, sorted CSV download. Added separate save
and publication actions, private notes and public reasons, field errors,
in-flight guards, a confirmed-schedule lock, and the C8 link driven by the
campaign-wide shortlisted count.

Rejected: None from the user. A first browser check got an empty byte
buffer from Playwright's response-body accessor for the CV. The final
check compared the actual downloaded PDF with the mock fixture and inspected
Chrome's rendered preview. Full-page screenshot capture with the PDF viewer
open timed out. The final layout check measured the live DOM with the viewer
present and captured the PDF preview separately.

#### Actual checks

- Verified the root, Git directory, common directory, clean branch and
  reviewed A2 checkpoint `f5324a9c2306b5f460a46f47644d762513e8df25`.
  Read `AGENTS.md`, the A3 block, C7/C8, the Executive list/export/detail/CV
  and screening contracts, and the actual shared router, session, API client
  and UI interfaces.
- Ran `npm.cmd run build` from `client/`. The final build exited 0 and
  emitted the two existing React Router directive warnings. From the repo
  root ran temporary `node check-a3.cjs`, `node check-a2.cjs`,
  `node check-a1.cjs` and `node check-a1-states.cjs` in that order against
  the final build. The scripts served Vite preview on loopback port 4174
  and the real `node mock/server.mjs` on port 3001. All exited 0.
- On the direct seed, campaign totals stayed at three applications and
  two distinct applicants across pages and filters. Tested position and
  screening filters, sort field and direction, URL state and pagination.
  Opening and closing A01 preserved the filtered page and exact URL with
  no new list GET. Slow mode verified debounce on rapid typing,
  cancellation of an in-flight query and fresh results for the final term.
- Downloaded the actual CSV using Bearer auth. With only one row visible
  on the filtered page, the CSV contained both matching Content records
  in descending order (A03, A01). The request omitted page and pageSize.
  Verified the exact header and exclusion of private note/reason fields.
  The authenticated CV request returned a PDF, Chrome rendered the readable
  mock CV in the panel, and the saved file matched the original PDF bytes.
- Saved Shortlisted on A01 and Rejected with a separate public reason on A02.
  Verified A01/A02 independence in the Executive and Applicant responses.
  An overlong private note gave a focused field error before a request.
  Rapid repeated clicks produced one PATCH and one POST for their respective
  actions. A successful PATCH applied the returned detail and caused one
  list refresh. The C8 link appeared even when the current filter excluded
  A01. The Applicant saw the saved outcomes only after each publication
  and did not receive or display any private note.
- Confirmed the schedule using the documented mock API. One open tab
  learned the lock via a list refresh and kept Save disabled during a
  subsequent still-loading query, preserving its draft. A second open
  tab received HTTP 409 on a stale PATCH and kept the typed note.
  Publication remained enabled and released only A02's saved status and
  public reason. Reopening the panel after confirmation showed it locked.
- Verified real 500/Retry recovery for the list, detail and position
  catalogue. Empty mode showed all five stats and filtered total at zero,
  no application rows, and a downloadable header-only CSV.
- At 360, 768 and 1280 px, checked one main h1, no horizontal scroll or
  protruding controls, controls at least 44 px tall, Tab/Enter to open and
  close, and focus restoration. The mobile panel stayed in flow and
  the desktop panel sat beside the list. No uncaught page errors occurred
  in the normal Executive walkthrough.

#### Verification limits and handoff

- Used the documented C8/C9 APIs to prepare the confirmed schedule.
  The scheduling screen is still a scaffold at this checkpoint.
  Browser evidence covers Chrome. W3C Nu, other browser engines and the
  unavailable course checker were outside this run.
- Inspected `git status`, the tracked and new-file diffs, `git diff --cached`,
  `git diff -- docs/api mock` and whitespace checks. The staged and
  contract/mock diffs were empty. Left A3 as a working diff for Học.

#### Independent review before commit

The user authorized committing A3 if it passed review and continuing with A4.
On the A2 checkpoint, Codex reviewed the entire A3 working diff, matched the
recorded A3 prompt against the message received and ran a fresh Vite production
build plus Chrome against a normal mock. One temporary check initially
compared the URL pathname to a path with query parameters. After correcting
the check, the run passed campaign and filtered counts, pagination, query
and focus restoration, authenticated PDF response, full filtered CSV contents,
360/768/1280 px layout, separate screening save and publication, A01/A02
isolation, private-note exclusion and the scheduling link. The course checker
was unavailable.

Verdict: READY for the authorized local commit. The follow-up records the
independent review. A4 starts from the resulting clean checkpoint.

### A4 · C11 Final Decisions and Notifications (2026-11-24)

Tool: Codex with PowerShell, Git, Node.js, Vite and Chrome routed through
the Chrome DevTools Protocol. [Actual request and brief revision](../ai-prompts/hoc.md#a4--c11-final-decisions-and-notifications)

Asked for: Review and commit A3 if it passes, then continue with the next
Applications task, A4. Started A4 from clean A3 commit `578dcbd`.

Kept: The Executive and Applicant route guards, shared authenticated API
transport and A2's per-application result projection. Used campaign-wide
publication from the approved C11 plan and contract. The older A4 test text
describes one release per application and was superseded by those sources.

Changed: The Executive results route loads interview cases, shows authorized
assessment feedback and saves Pass/Fail and case handling independently per
application. It protects local drafts and pending requests, maps validation
messages, and shows the recorded release time after a single campaign action.
The Applicant list now loads owner-scoped notifications with links to the
corresponding records and independent loading, empty and Retry states.

Rejected: None from the user. An initial test that tried to install an
isolated notification failure on a new document timed out. The final harness
injected the single HTTP 500 in the existing page before navigating away and
back. This reproduced the failure and let a Retry request reach the real mock.

#### Actual checks

- Reviewed `AGENTS.md`, A4 and C6/C10/C11, the results, interview and
  notification contracts and the current router, API, shared UI and A2 screens.
  `npm.cmd run build` succeeded, with the existing React Router directive
  warnings. The final Chrome checks also built and served the final sources
  using Vite preview and a fresh loopback mock.
- Verified empty results before confirmation, scheduled cases with no edit
  controls, and real 409 responses for early writes. Prepared C8/C9 through
  the Executive API and submitted A01's assessment through the assigned
  Interviewer API. Verified A02's missing assessment and both Attended
  without feedback and Absent handling. Confirmed rejected A03 was excluded.
- Saved A01 Pass and A02 Fail in Chrome. A saved decision without recorded
  case handling left publication disabled, and the mock identified A02 in its
  publication blocker. Both saved decisions and notices stayed private before
  release. Rapid repeated clicks sent one save or publication request.
- Published the campaign in Chrome, checked focus moved to the publication
  status, and verified forms were closed to edits. Repeated publication via the
  mock API, which returned the same timestamp and yielded exactly two owner
  notices. Student A opened the linked records with the correct results and
  no assessment feedback. Student B saw no notices and the Applicant role
  was denied the Executive results route.
- At 360, 768 and 1280 px, checked one h1, matching viewport and document
  widths, and controls at least 44 px high on Executive results and Applicant
  notifications. A simulated per-request notifications HTTP 500 left the
  application list visible, and Retry recovered against the live mock.
- Reran the targeted A1, A2 and A3 Chrome checks against the final A4 build.
  All three exited zero. Reviewed staged and working diffs, new source files
  and the diff for `docs/api` and `mock`.

#### Verification limits and handoff

- The scheduling and assessment setup steps were exercised through their
  contracted APIs, pending integrated C8–C10 UI checks. The course PDFs and
  checker remain absent. W3C Nu and other browser engines were not run.
- A4 is a working diff on `pa3/hoc-applications` for Học's review.

#### Review before commit and handoff

The user authorized committing and opening the handoff PR once Học's assigned
work was complete. Compared the branch with the live `origin/main` baseline
(`521f3a9`), confirmed A1–A3 were committed and reviewed the remaining A4 diff
against C11. Reran the production build and Chrome A4 walkthrough on a fresh
mock. It passed case handling, privacy before release, stable retry and two
owner-only notices, authorization, the three viewport checks and isolated
notification error recovery. The final source and mock contract were unchanged
by this review.

Verdict: READY for the Applications handoff. A1–A4 cover Học's assigned
C5–C7 and C11. Review and integrated C8–C10 browser checks remain with the team.
