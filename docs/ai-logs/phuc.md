# Phúc - AI log

## 2026-11-08 — Interview Scheduling page (schedule.html, css/schedule.css)
Tool: Claude Code (Claude Sonnet 5.5). Prompts: [docs/ai-prompts/phuc.md](../ai-prompts/phuc.md).
Asked for: Read the repo, create my branch `pa2/phuc-schedule`, and build Screen 3 from the fixture in `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md` (A01–A05, I01–I03, draft 2 Proposed + 2 Conflict + 1 Unassigned, blocked confirm gate, separate resolved state). I did not send PROMPT 04 from `brief.md`.
Kept: The page structure and fixture (five-row draft, conflict notice naming A01/A03/A05 with the real I01 overlap at 09:00–09:20, disabled Approve & Confirm button, settings and edit forms, availability tables, "After resolution (illustrative state)" section); only real links (`index.html`, `review.html`, in-page anchors); CSS built on the shared tokens only.
Changed: At 1280px the full-page screenshot showed words broken mid-word in the draft table ("Confli/ct", "Phòn/g A", "Interview/er") because `body` has `overflow-wrap: anywhere`; the numeric checks still passed, so only the screenshot caught it. I had cells set to `overflow-wrap: normal` and badges to `nowrap`. A second screenshot then showed the Resolve button broken as "Resolv/e", so buttons and time/room cells got `nowrap`. At 360px the confirm checklist put each badge on its own line; changed it to a badge + text grid. All three fixes are in the first commits, not separate ones.
Rejected: Its idea of turning table rows into cards at 360px with CSS `attr()` labels (essential text would live in CSS) — the table scrolls inside its own wrapper instead. Making Generate Draft / Save Changes / Export Timetable look working — they stay plain buttons with a visible "not wired" note, and no CSV was invented.

## 2026-11-08 — Checks and screenshots for schedule.html
Tool: Claude Code running Playwright (Chromium 1248, outside the project) and the W3C Nu checker.
Asked for: Take the screenshots and check the page for me.
Kept: At 360/768/1280px, offline: `clientWidth` 360/768/1280, no horizontal overflow, right-edge overflow `[]` outside table wrappers, no link/button under 44px, smallest text 16px, no computed contrast below 4.5:1, one h1, no skipped heading, every input labelled. W3C Nu on `schedule.html`: 0 errors, 0 warnings (file POSTed to `validator.w3.org/nu`, not the File Upload form). Three `schedule-*.png` screenshots, JS off, full page.
Changed: Playwright's default browser was missing, so it used the already-installed Chromium by path. Measurements ran in a JS-enabled context and screenshots in a JS-off one; the page has no script, so the layout is the same.
Rejected: Nothing. Not done: DevTools Accessibility pane, Color Picker, keyboard Tab test, opening `index.html`/`review.html` from this page (not on my branch yet), and the six `index`/`review` screenshots (after Huy merges).
