# ClubFlow PA3 workspace audit

**Baseline.** GitHub and the local integration checkout matched at `a9b989303eb5f19d8a2cb539af5aefa3b1adc2a0`. The review covered the integrated PA3 source, mock, API examples, browser routes and submission documentation. PA2 files and other local branches were inspected for release relevance and retained as historical work. No packaging was performed.

## Findings and repair checklist

- [x] **P2 · A01 · Unapplied scheduling choices are lost on Generate Draft.** Phúc · `client/src/features/scheduling/SchedulePage.jsx` and `GenerateForm.jsx`. After saving a draft, change A02's slot to 09:40 and press Generate Draft without applying the edit. The browser sends a generation request, closes the editor and shows a regenerated row with the previous slot. The help text also says nothing is saved, although a changed duration is written to interview setup. Block generation during an unapplied row edit and describe the preview and duration saves accurately.
- [x] **P2 · A02 · The submission self-assessment is still for PA2.** Huy · `SELF_ASSESSMENT_REPORT.md`. The file identifies static screens, seven PA2 criteria and the old approved 98-point filename. PA3 requires the React evidence and nine criteria. Replace the submission document with the PA3 evidence and leave the claim and archive suffix pending the team's score decision.
- [x] **P3 · A03 · Begin creation stays enabled after a screening write.** Huy with Học · `client/src/router.jsx` and `ReviewPage.jsx`. In a fresh normal mock, save screening on A01. The enabled Demo controls action sends a request that returns `409 CREATION_UNAVAILABLE`. Refresh the shared draft lifecycle on screening save.
- [x] **P3 · A04 · Independent requests have identical Retry controls.** Huy · `client/src/router.jsx`, `ui.jsx` and `ReviewPage.jsx`. In error mode, the schedule page reports the mock error twice and exposes two buttons named Retry. Each button reloads its own resource. Keep separate retry paths with descriptive names for Demo controls and position options.
- [x] **P3 · A05 · Rendered HTML raises seven W3C Nu warnings.** Học · C5 uses `aria-invalid` on a fieldset, producing two warnings. Explicit list roles produce five warnings across C7 and C11. Keep field error focus and description, and preserve list semantics using native list markup and styling. Rerun the validator on browser-rendered HTML.
- [x] **P3 · A06 · Four resource links in the PA3 plan break in a clean checkout.** Huy · `PA3_PLAN.md`. The course PDFs, guide and checker are intentionally local files, absent from the repository. Identify the course-supplied files by name and give repository-relative links only to files available in the checkout.

## Baseline checks

- Node checks passed 14/14. The independent course checker accepted 94/94 examples across 27 operations on a fresh normal mock.
- The complete Chrome creation-to-release run passed 18 functional groups. The audit captured 26 HTML states and measured them at 360, 768 and 1280 px. No document-width overflow, skipped heading level or undersized standalone control was measured in those states. The schedule table can scroll inside its wrapper.
- Chrome reproduced the scheduling edit loss and stale demo control. The scheduling entry point showed loading in slow mode and an empty view in empty mode. Error mode reproduced the duplicate Retry labels.
- W3C Nu 26.11.28 reported zero errors and the seven warnings listed above.

## Verification after repairs

- **A01.** The focused [Playwright check](verify_schedule_generation.py) fails on the baseline and passes with the repair. The complete run also changed A02's slot, confirmed that requesting form submission sent no draft generation request, and retained the chosen slot. Reverting the edit re-enabled generation.
- **A02.** The [PA3 report](../SELF_ASSESSMENT_REPORT.md) maps evidence to all nine rubric rows. The maximum scores sum to 100. Every claim and the archive suffix remain pending team approval. The PA2 report is in Git at `481144c`.
- **A03.** Saving screening returned 200 and triggered a fresh campaign-draft GET. The response set `demo.canBegin` to false, and the browser disabled the action.
- **A04.** The schedule retains one Retry control and a separate Retry demo controls action. Chrome observed the matching API request for each. The review page also exposes a separately named Retry positions action. The slow and empty mock states were checked independently.
- **A05.** The availability group receives focus and exposes its hint and validation error to Chrome. Review, results and notifications are identifiable as native lists. W3C Nu 26.11.28 reported **0 errors and 0 warnings across 26 rendered states**.
- **A06.** The four missing Markdown link targets are replaced by course filenames and valid local guidance. The repository-relative Markdown target scan reported no missing files in tracked documents.

On the working tree based on `a9b9893`, Vite 8.3.8 built successfully with Node 24.14.1. Chrome 158.0.8127.88 passed **18 functional groups** with zero uncaught page errors and measured **78 state/width pairs** at 360, 768 and 1280 px. The checks found one main heading per state, no skipped heading levels, no page-width overflow and no undersized standalone controls in the inspected set. The schedule table scrolls inside its wrapper. The 14 Node tests and the 94 course examples across 27 operations passed again on the unchanged mock and API contract. Vite still prints the React Router module-directive notices seen in the earlier release build.

A separate direct-navigation pass recorded **54 observations** for the guest and all five demo accounts at the same widths, with non-loopback browser requests blocked. No request targeted a non-loopback host. The interviewer detail route showed its unavailable state in the fresh seed and its assigned state in the full workflow.

Local raw artifacts are in `D:/Temp/clubflow-workspace-audit-a9b9893/`: `build-fixed.log`, `release-report.json`, `modes-report.json`, `nu-report.json`, `direct-report.json`, `node-fixed.log`, `contract-fixed.log` and the before-and-after regression logs. Physical-device and extracted-archive checks remain pending.
