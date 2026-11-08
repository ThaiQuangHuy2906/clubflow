# Học — actual assistant task log

## 2026-11-08 — HOC-01 on `pa2/hoc-review`

Tool: Codex in the local workspace; exact model/version not independently recorded.

Asked for: Create the requested Application Review screen on Học's feature branch,
using the eight specified applications and changing only `review.html`,
`css/review.css`, and Học's own prompt/AI logs. The exact prompt is recorded in
[`ai-prompts/hoc.md`](../ai-prompts/hoc.md).

Kept: Plain semantic HTML/CSS, the shared stylesheet API and tokens, native
`details`/`summary`, explicit static-prototype labels, per-application decisions,
the required campaign dates and canonical counts. A01 and A02 remain separate
application records for one student and distinct positions. No JavaScript or
external asset was added.

Changed: Created the review screen and its page stylesheet, plus this task log
and the actual-prompt record. Search/filter/sort/export/pagination controls are
disabled and described as illustrative; the list and sample details remain
available as HTML. CVs are described as unavailable local files with a
non-downloadable preview state. Executive-only notes are marked as sample data;
the page states that it does not enforce role access. The scheduling handoff
passes only A01–A05. In the follow-up QA pass, removed an `aria-label` from a
generic preview `div`; its visible heading already names the preview and avoids
an unnecessary ARIA name on a generic container. Set the document title to the
exact string `Application Review`.

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
- No screenshots were captured by the assistant; the nine user-supplied images
  are logged as evidence above and in `ai-prompts/hoc.md`.
- Remaining integration check: confirm sibling routes `index.html` and
  `schedule.html` after Huy and Phúc integrate their pages.
