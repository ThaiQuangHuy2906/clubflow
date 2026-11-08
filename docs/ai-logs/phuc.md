# Phúc - actual assistant task log

## 2026-11-08 - PHUC-01: Interview Scheduling on `pa2/phuc-schedule`

Tool: Claude Code (VS Code extension), Claude Sonnet 5.5; Playwright (package from
the local npx cache, not added to the project) driving an already-installed
Chromium 1248 for measurements and screenshots; W3C Nu checker at
`https://validator.w3.org/nu/` for HTML validation. No project dependency added.
Exact prompts are in [the prompt log](../ai-prompts/phuc.md).

Asked for: Read the repository and work out the tasks, create the personal branch,
then do the whole PHUC-01 task: `schedule.html`, `css/schedule.css`, screenshots,
commits and these two logs. The prompt did not include the PROMPT 04 text; the
assistant took the fixture (A01–A05, I01–I03, draft 2 Proposed + 2 Conflict + 1
Unassigned, resolved illustrative state) from `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md` and
`brief.md`.

Kept:
- `schedule.html`: static semantic page (header, steps nav, main, footer, one h1,
  h2 per section, h3 only inside sections). Draft table with exactly five rows;
  conflict notice naming A01, A03 and A05 and the real I01 overlap at 09:00–09:20;
  counters 2 + 2 + 1 = 5; settings form (date, window, 15/20/30 with 20 checked,
  rooms A/B/C); edit form; interviewer and applicant availability tables;
  Approve & Confirm gate with a native `disabled` button and the failing checks;
  separate section "After resolution (illustrative state)" with 5 Confirmed.
- Only real links: `index.html`, `review.html`, `schedule.html` and in-page anchors
  whose targets exist (`#main`, `#edit-slot`, `#after-resolution`). Edit, Resolve and
  + Assign Slot are anchor buttons to those targets; Generate Draft, Save Changes and
  Export Timetable are plain buttons and the page says they are not wired.
- `css/schedule.css` uses only the shared tokens (spacing 4–32px), no `!important`,
  no `overflow-x: hidden`. The two data tables scroll only inside `.table-scroll`.
- Footer states the prototype and sample-data context; no template footer text.

Changed (problems the assistant's own first version had, found by checks):
1. At 1280px the screenshot showed words broken mid-word in the draft table
   ("Confli/ct", "Propo/sed", "Phòn/g A", "Interview/er"). Cause: `body` sets
   `overflow-wrap: anywhere`, which lets table auto-layout shrink columns to almost
   nothing. Caught by looking at the full-page screenshot, not by the numeric checks
   (they all passed). Fix: table cells use `overflow-wrap: normal` in
   `css/schedule.css`, and badges are `white-space: nowrap`.
2. After fix 1 the second screenshot showed the "Resolve" button broken as
   "Resolv/e" in the narrow actions column. Fix: `.row-actions .button` uses
   `white-space: nowrap`; time and room cells got a `.no-wrap` class so
   "09:00–09:20" and "Phòng A" stay on one line.
3. At 360px the Approve & Confirm checklist put each status badge on its own line
   above its text. Changed `.gate-list li` to a two-column grid (badge + text).
These three fixes were made before the first commit, so they are recorded here and
not as separate commits.

Rejected:
- The assistant considered rendering each table row as a stacked card at 360px with
  CSS `attr()` labels. Rejected: it would put essential content in CSS. The draft
  table scrolls inside its own wrapper instead (292px visible of 896px at 360px).
- The assistant considered making Generate Draft, Save Changes and Export Timetable
  look functional. Rejected per `AGENTS.md`: they stay plain buttons with a visible
  "chưa nối" note, and Approve & Confirm is natively disabled. No CSV or other file
  was invented.
- Screenshots and validator output were not added to this branch (`screenshots/` and
  `checks/` are root deliverables for Huy's integration on `main`); they are kept
  outside the repository for now.

### Checks actually run (on the final CSS/HTML of this branch)

Playwright with Chromium 1248, `file://` URL, offline context. Screenshots were
captured in a context with JavaScript disabled. The numeric measurements ran in a
second, JavaScript-enabled offline context on the same file; `schedule.html`
contains no script, so layout is identical.

| Width | clientWidth | scrollWidth > clientWidth | Right-edge overflow outside table wrapper | Links/buttons under 44px | Smallest text |
| --- | --- | --- | --- | --- | --- |
| 360 | 360 | false | `[]` | none | 16px |
| 768 | 768 | false | `[]` | none | 16px |
| 1280 | 1280 | false | `[]` | none | 16px |

- Table wrappers (client/scroll width): draft and resolved tables 292/896 at 360,
  668/896 at 768, 1164/1164 at 1280; availability tables 292/384, 325/384, 573/573.
- Landmarks: header 1, nav 1, main 1, footer 1; exactly one h1; no skipped heading
  level; every input/select has an associated visible label (`input.labels` check).
- All 13 `href` values: no `#`, every in-page anchor target exists. `index.html` and
  `review.html` are not on this branch yet (Huy's and Học's branches), so those
  cross-page links could not be opened here and must be re-tested after the merge.
- Contrast: a script computed text/background ratios for every text element; none
  below 4.5:1 (3:1 for large text). This is a computed check, not the DevTools Color
  Picker.
- W3C Nu checker: the file was POSTed to `https://validator.w3.org/nu/?out=json`
  with `Content-Type: text/html; charset=utf-8` (not the File Upload form). Result:
  0 errors, 0 warnings, 0 info messages. The raw JSON response was saved. The same
  endpoint reported a warning for a deliberately minimal test document, which
  confirms the call returns messages when there are any.
- Full-page screenshots at 360/768/1280 were reviewed by eye (conflict notice,
  counters, draft table, gate, forms, resolved state) after each fix above.

### Not done / limits

- DevTools Accessibility pane, DevTools Color Picker and manual keyboard (Tab)
  testing were not performed.
- The nine final screenshots (`index`/`review`/`schedule` × 3 widths) and the three
  `checks/validator-*` files depend on the other two pages and the merged `main`.
  Only the three `schedule` screenshots and one validator result exist so far.
- Not wired: Generate Draft, Save Changes, Export Timetable, the form controls (no
  data is saved or computed), and Approve & Confirm (disabled by design). The
  resolved state is a static illustration, not a result of any scheduling logic.
- Cross-page fixture consistency with `index.html`/`review.html` (dates, 8/7/5/3/0
  counts) was written from the Source of Truth but not compared with their final
  files.
- No self-score is claimed here.
