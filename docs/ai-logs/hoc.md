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
