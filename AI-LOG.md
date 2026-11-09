# ClubFlow PA#2 — consolidated AI log

This English integration log consolidates existing task records and the final QA session. Original records remain in [Huy's log](docs/ai-logs/huy.md), [Học's log](docs/ai-logs/hoc.md) and [Phúc's log](docs/ai-logs/phuc.md). Their historical “not yet integrated” statements describe earlier stages; final status is in [QA](checks/QA.md). Available actual prompts and transcript gaps are in [brief.md](brief.md). Missing conversations, tests, commits and authors have not been reconstructed.

## 2026-11-08 — HUY-SETUP: shared foundation

**Tool:** Codex, PowerShell/Python, cached Playwright CLI 0.1.23 and Chrome. Exact Codex model/version not independently recorded.

**Asked for:** Create shared CSS and its contract on `main` before screen branches, under the common contract. [Actual prompts, entries 1–2](docs/ai-prompts/huy.md).

**Kept:** Plain local CSS, six spacing tokens, system fonts, native controls, 44px targets, focus outlines, fluid grids and table-only scrolling.

**Changed:** Created `css/styles.css` and its contract. At 768px a temporary fixture's two datetime-local fields lost their time segments in a narrow nested grid, although document overflow was false. Visual inspection caught this. Added container-aware `.grid--fields` and `--field-min: 16rem`, then inspected corrected captures. Details are in Huy's original log; commit `39ad2e5`.

**Rejected:** The narrow two-column native-date arrangement. No user rejection was recorded. Component checks were not presented as final three-screen evidence.

## 2026-11-08 — HUY-01: Create Recruitment Campaign

**Tool:** Codex and local browser tools.

**Asked for:** Only Screen 1 and Huy's branch logs, using shared CSS and the four-position fixture. [Actual prompts, entries 3–5](docs/ai-prompts/huy.md).

**Kept:** Native required/min/step constraints and previews, disabled Save/Publish, relative Applications link and canonical dates/quotas.

**Changed:** Created the screen. Huy's W3C File Upload screenshot exposed a real assistant error: the required duration select lacked an empty first option. Added `<option value="">Chọn thời lượng</option>` while preserving `required` and selected 20 minutes. Retested native `valueMissing`; Huy later supplied a successful File Upload result. Native validity and a generic parser had not detected the HTML conformance defect. Screen commit `c9c2f11`, merge `a5587fa`, initial evidence `c0b5867`.

**Rejected:** Removing `required` to suppress the error, fake publication/persistence and inventing a sibling page. Earlier HTTP 403 attempts were logged as blocked checks. The successful validator result is user-run evidence, not an assistant upload.

## 2026-11-08 to 2026-11-09 — HOC-01: Application Review

**Tool:** Codex as recorded by Học; exact version not recorded. Initial `file://`, original PDF and validator access were unavailable in his environment; source checks and user-provided results were distinguished.

**Asked for:** Implement Screen 2 on his branch, finish QA and address Huy's feedback. [Prompts](docs/ai-prompts/hoc.md), [original log](docs/ai-logs/hoc.md).

**Kept:** Eight applications/seven students, A01/A02 independence, 5/3/0 statuses, in-flow details, labels and shared-first CSS. Search/filter/sort/export/pagination remain disabled illustrations.

**Changed:** Initial screen `cb20354`. Huy found missing note/decision controls and no readable CV preview. Học added eight labeled textareas, disabled per-application Shortlist/Reject groups, an illustrative ST01 HTML CV and A02's link to it. Fixes/screenshots `f1dbff3`, handoff `5c88880`, Huy's PR #2 merge `4c90e73`.

**Rejected:** An unavailable-CV paragraph as a completed preview, recorded statuses as sufficient action controls, and claims that sample Executive notes enforce authorization. Học's log also records old-parser diagnostics and a CSS-token scan false alarm corrected as tooling issues, not product failures.

## 2026-11-08 to 2026-11-09 — PHUC-01: Interview Scheduling

**Tool:** Claude Code; Phúc records Claude Sonnet 5.5. This model metadata comes from his log and was not independently verified here. His tools included Playwright and Nu HTTP POST.

**Asked for:** Read the repo, implement his screen/branch, capture evidence, then fix Huy's review findings. Actual messages differ from unused PROMPT 04. [Prompts](docs/ai-prompts/phuc.md), [original log](docs/ai-logs/phuc.md).

**Kept:** Five shortlisted records, genuine A01/A03 overlap, A05 availability mismatch, blocked confirmation and separate resolved illustration.

**Changed:** Visual checks caught broken table/button words and a clipped dropdown label. Huy additionally reproduced Edit A01/A04 opening an A03 form and found missing interviewer configuration. Phúc added per-application fieldsets and labeled position/availability controls while retaining the draft. Commits `436dfaa`, `8c48d3d`, `63cda2d`, `e1fe272`, `941aa15`; Huy's PR #3 merge `fee77ae`.

**Rejected:** Essential table labels in CSS `attr()`, fake generation/export and JavaScript supplying essential forms. Phúc's log records that, at his request, Claude co-author trailers were removed from his own branch and it was force-pushed before merge. This integrator did not rewrite that history. His API checks are distinct from Huy's File Upload PDF used as final evidence.

## 2026-11-08 to 2026-11-09 — review and integration

**Tool:** Codex, GitHub CLI, browser automation and Poppler. Read the supplied official rubric/final-brief PDFs, repository rules, Source of Truth and CSS contract. The original linked business description v1.1 was inaccessible; supporting detail came from Source of Truth. Học/Phúc disclosed their own source-access limitations separately.

**Asked for:** Review both PRs and show findings; post the four approved findings as two request-changes reviews; inspect revisions and supplied validator evidence; remove the stale review footer after Huy merged/pulled.

**Kept:** Verified findings against code, the final brief and browser behavior. Static limitations were not converted into backend requirements. Only Huy's account submitted the authorized reviews; Huy performed the merges.

**Changed:** Posted [PR #2 review](https://github.com/ThaiQuangHuy2906/clubflow/pull/2#pullrequestreview-5818778907) and [PR #3 review](https://github.com/ThaiQuangHuy2906/clubflow/pull/3#pullrequestreview-5818778990). Verified all four fixes in `5c88880`/`941aa15`. Removed only the stale checkout sentence from the integrated review footer; Huy committed/pushed it and the supplied PDFs in `d0426d7`. His post-footer File Upload result is dated 09 Nov 2026 13:09 ICT.

**Rejected:** Treating zero validator errors as proof of feature completeness, presenting older results as reruns, and fabricating validation evidence. No assistant merge, push or history rewrite occurred in this integration work.

## 2026-11-09 — final evidence and English documents

**Tool:** Codex; installed Node 24.14.1, cached Playwright CLI 0.1.23/Chrome 157, Python/Pillow/BeautifulSoup and Poppler. No project dependency/build added.

**Asked for:** Huy requested Steps 2 and 3 after pushing Step 1: screenshots/QA evidence and root submission documents. Exact request is preserved in `brief.md`.

**Kept:** Application HTML/CSS at `d0426d7`, original member logs/authorship and unchanged supplied validator PDFs. Used actual local pages, offline, with JavaScript disabled; a page-script sentinel stayed `blocked`.

**Changed:** Recaptured nine full-page images at DPR 1 and 360/768/1280 CSS pixels. Rendered each existing File Upload PDF to PNG at 150 dpi, without claiming a new checker run. Saved viewport, interaction, accessibility-tree, fixture and hash observations in `checks/`. Wrote the three root reports, consolidated actual prompts and updated QA.

All nine default views and nine opened-disclosure states had exact widths and no document/out-of-wrapper right overflow. Default views measured standalone targets at least 44px, text at least 16px and computed visible-text contrast at least 6.15797:1. Native-form, keyboard, navigation and Chrome accessibility-tree checks actually ran; [QA](checks/QA.md) records coverage and limits.

An initial audit could not write metrics because `require()` is unavailable in the CLI sandbox; JSON transport was corrected and measurements rerun. A collector initially assumed `css/index.css`; it was corrected to `css/campaign.css`. The first skip-link assertion wrongly required non-focusable main to receive direct focus. A focused retest verified `#main`, main at viewport top and the next Tab inside main; the initial result remains in `checks/interactions.json`. An initial documentation patch was rejected for two operations on one path, made no change, and was reapplied as separate valid patches.

**Rejected:** Inventing Phúc's abbreviated pasted text or an unknown cross-member message order, calling PDF conversion a new validator run, claiming manual DevTools pane/Color Picker checks, and automatic 100/100 scoring. No commit/push/merge/ZIP was performed for this task. The proposed self-score remains for team review.

## 2026-11-09 — assistant-operated DevTools follow-up

**Tool:** Codex; installed Playwright browser library and bundled Chrome 157 DevTools. Temporary automation scripts stayed outside the repository; no dependency was added.

**Asked for:** Huy first requested detailed instructions for the two outstanding checks, then asked why the assistant had not performed them for him. The assistant proceeded with the inspection; actual messages are preserved in `brief.md`.

**Kept:** All application HTML/CSS, existing screenshots, original validator PDFs and authorship. App pages remained offline at direct file URLs with page JavaScript disabled. Only the separate DevTools tooling context executed scripts.

**Changed:** Opened the actual bundled DevTools frontend over a temporary loopback debugging connection. Inspected 144 Accessibility pane selections, including all 86 visible input/select/textarea controls, and 40 default-state Color Picker samples. Saved six actual UI screenshots and [raw observations](checks/devtools-inspection.json). Every accepted picker value was at least 6.15:1 and agreed with a foreground/background cross-check. Updated QA to remove the repeated user handoff and revised the proposed self-score from 93 to 95 after adding the missing evidence; team approval is still pending.

The first response incorrectly implied that the rubric did not name these tools; re-reading it showed that it does, and the assistant corrected that statement before editing. Automatic DevTools target screenshots initially failed, so a separate real bundled frontend was used. Some mixed-child text/input nodes yielded no background information; final default samples use nodes for which Chrome returned real backgrounds. An initial checker wrongly expected every native date/time/select node to show `Required: true`; the actual named roles and original observations are retained without claiming an absent pane property. Extra forced-hover probes exposed stale picker ratios; attempts to refresh internal pane APIs also failed. Those probes are diagnostics only, not application failures or accepted contrast checks.

**Rejected:** Requiring Huy to repeat work the assistant could perform, deleting the rubric's tool requirement, fabricating panel screenshots, counting stale/absent contrast readings as passes, or claiming screen-reader/full-WCAG coverage. No source changes, commit, push, merge or ZIP action occurred.

## 2026-11-09 — recheck the proposed score against evidence

**Tool:** Codex; read-only Git/source/document inspection and Poppler text extraction of the supplied rubric. Existing browser evidence was reused because application files had not changed.

**Asked for:** Huy asked whether the work could be brought to 100/100.

**Kept:** All measured results, application files, original prompt records and disclosed limitations. The unknown exact cross-thread send times were not treated as a grading requirement.

**Changed:** Rechecked the seven rubric criteria and removed three precautionary deductions that were not tied to an observed defect: linked screens 19→20, responsive 24→25, design 9→10. Revised the proposed total from 95 to 98 and kept the packaging suffix consistent. The remaining conservative two-point allowance concerns incomplete original prompt evidence in the Phúc/Học records; the rubric does not mandate that exact deduction. Asked Huy whether original conversations remain available for accurate reconciliation.

Huy subsequently answered “Không còn bản đầy đủ” (the complete records are no longer available). Updated `brief.md` and the self-assessment to close the source-availability question, preserving the abbreviated/transcribed records and gap labels. The proposed score remains 98; no missing text was reconstructed.

**Rejected:** Treating 95 as a fixed ceiling, inventing historical messages to fill `[...]`, changing checks or application behavior merely to justify a score, and automatically writing 100/100 without resolving the evidence gap. No new browser/W3C run, application edit, commit, push or ZIP operation was claimed or performed in this scoring follow-up.

## 2026-11-09 — team-approved submission release

**Tool:** Codex; Git, Python standard `zipfile`/hash libraries, existing Playwright CLI/Chrome and Pillow. No new project dependency.

**Asked for:** Huy confirmed that the team agrees on 98/100, requested commit/push to GitHub and packaging of the submission, then asked the assistant to continue. The actual authorization is in `brief.md`.

**Kept:** Original application files at `d0426d7`, member authorship/history, original prompt limitations and validator PDFs. Confirmed Huy's existing Git identity and aligned `main`/`origin/main` after fetch; no identity change, force-push or history rewrite.

**Changed:** Marked 98/100 as team-approved in the reports. Created a preflight repository ZIP including `.git`, extracted it separately and verified file equality/Git integrity. Ran the extracted pages offline with JavaScript disabled at all nine page/width combinations and exercised four forward/back navigation checks; all passed. Nine fresh captures were pixel-identical to the submission captures. Saved [preflight observations](checks/package-preflight.json) and updated [QA](checks/QA.md). Commit/push and final ZIP follow these recorded checks; their exact revision, archive hash and verification result are reported in the release handoff rather than predicted in this log.

Windows tar failed to resolve the Vietnamese parent path; standard Python ZIP creation succeeded. An initial `cssRules` read was blocked by file-URL origin restrictions; the corrected check confirmed stylesheet order/rendered styles and exact image equality instead. These tooling failures did not change the application or weaken the required layout checks.

**Rejected:** GitHub Download ZIP/`git archive` because they omit `.git`, packaging from a fresh clone, including unrelated temporary tools, silently overwriting an existing submission archive, and claiming student-account submission or a new W3C check. Final archive creation is outside the repository, followed by a fresh extraction check.
