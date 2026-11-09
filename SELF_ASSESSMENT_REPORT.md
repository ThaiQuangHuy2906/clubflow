# ClubFlow — PA#2 self-assessment

## Team and basis

| Student ID | Name |
| --- | --- |
| 24127044 | Lê Nguyễn Quốc Học |
| 24127177 | Thái Quang Huy |
| 24127505 | Trần Hoàng Phúc |

**Team-approved self-assessment: 98 / 100.** Huy confirmed the team's agreement on 09 Nov 2026 and authorized the assistant to commit, push and package the submission. Rechecking the rubric removed three unsupported precautionary deductions from the earlier 95-point proposal. The remaining estimate reflects incomplete original prompt evidence. This is a self-assessment, not an awarded mark, automated guarantee or accessibility certification. The estimates are judgments against rubric bands, not claims of prescribed exact deductions.

Application source tested: `d0426d7`. Actual results/provenance are in [QA](checks/QA.md); static versus unwired behavior is in [PROTOTYPE.md](PROTOTYPE.md).

## Seven rubric criteria

| Criterion | Maximum | We claim | Evidence and assessment |
| --- | ---: | ---: | --- |
| 1. Three linked screens | 20 | 20 | [Campaign](index.html), [review](review.html), [schedule](schedule.html), [screen mapping](PROTOTYPE.md), [navigation/edit checks](checks/interactions.json). Main flow works offline with JavaScript off; four review findings were fixed and all eight Fix these items are addressed in [QA](checks/QA.md). Static controls/states illustrate the required Executive flow. The readable CV feature is demonstrated with ST01's shared sample; backend actions and absent attachments are honestly documented. No additional confirmed feature defect was identified in this follow-up. |
| 2. Responsive at 360/768/1280px | 25 | 25 | Nine current captures linked in [QA](checks/QA.md), [viewport metrics](checks/browser-results.json), [opened-state checks](checks/interactions.json). Exact widths, no document/out-of-wrapper overflow, 44px targets, wrapping long text and no observed panel overlap; the layout adapts at the prescribed widths. Observed results support the full claim for this criterion. Chrome-only coverage remains a disclosed testing limit. |
| 3. Semantic, valid HTML | 20 | 20 | Zero errors/warnings in user-run File Upload [index](checks/validator-index.png), [review](checks/validator-review.png), [schedule](checks/validator-schedule.png). [Browser/AX checks](checks/interactions.json), [source checks](checks/source-manifest.json): one h1/page, no skips, labeled fields, no duplicate IDs or missing local targets, no unnamed inspected controls. [Actual Accessibility pane inspection](checks/devtools-inspection.json) adds 144 selections covering landmarks, h1–h3 and all 86 visible form fields; screenshots and limits are linked in [QA](checks/QA.md). |
| 4. Design you can check | 10 | 10 | [Shared CSS](css/styles.css), [contract](docs/SHARED_CSS_CONTRACT.md), page CSS and nine captures. Shared spacing, system fonts, minimum measured text 16px; no framework/import/`!important`/hidden horizontal overflow. Each page has a defined primary focus described in [PROTOTYPE.md](PROTOTYPE.md). [Actual Color Picker inspection](checks/devtools-inspection.json): 40 accepted default-state samples, minimum displayed 6.15:1; computed minimum 6.15797:1. The CSS recheck found spacing declarations consistently using the shared scale, including two literal 1.5rem list indents equal to 24px. Stale forced-hover diagnostics are excluded. |
| 5. Brief and rules file | 10 | 8 | [Actual available prompts](brief.md), [rules](AGENTS.md), original [Huy](docs/ai-prompts/huy.md), [Học](docs/ai-prompts/hoc.md), [Phúc](docs/ai-prompts/phuc.md) records. The actual common contract contains the required constraints and checks. Source completeness remains weaker: Phúc's pasted assignment/template text is abbreviated, and portions of Học's feedback/evidence follow-ups were transcribed or condensed. On 09 Nov 2026 Huy confirmed that complete original conversations are no longer available. The available source records and explicit gap labels are retained. Two points are conservatively reserved for these disclosed provenance gaps; the rubric does not prescribe that exact deduction. Per-thread order is preserved; unknown exact cross-thread times are not used as a deduction. |
| 6. AI-LOG.md | 10 | 10 | [Consolidated log](AI-LOG.md) and original member logs contain distinct task/page entries with Tool, Asked for, Kept, Changed and Rejected. Genuine errors include the required-select W3C failure and A03-only edit mismatch, with checks/corrections linked to source commits. No invented rejection or pass. |
| 7. Commit history | 5 | 5 | Repository `.git`; rules-first `c2cbe6f`; shared CSS `39ad2e5`; campaign `c9c2f11`; review `cb20354`/`f1dbff3`; scheduling content/style `436dfaa`/`8c48d3d`; fixes `63cda2d`/`e1fe272`; merges `a5587fa`, `fee77ae`, `4c90e73`; footer/evidence `d0426d7`. [Inspected history](checks/source-manifest.json). Feature authorship remains visible; the final ZIP must include `.git`. |
| **Total** | **100** | **98** | **20 + 25 + 20 + 10 + 8 + 10 + 5 = 98** |

## What We Did Not Manage

- Actual Accessibility pane and default-state Color Picker inspection is now documented. These samples and the separate keyboard/tree checks are not a full WCAG/screen-reader audit. Stale picker results during extra forced-hover probes are retained as diagnostics rather than claimed as successful state checks.
- Only Chrome 157 on this desktop was exercised, not other engines, physical devices, locale variants or all input combinations.
- Static controls do not implement persistence, publication, filtering, file upload/download, decision updates, scheduling algorithms, export, authorization or cross-field business validation. Native affordances and sample states illustrate the workflow; no backend is claimed.
- Phúc's complete pasted assignment/template text cannot be recovered from the original abbreviated record; portions of Học's feedback/evidence follow-ups are also transcribed or condensed. Huy confirmed on 09 Nov 2026 that complete original conversations are no longer available. Existing records remain labeled as incomplete; no omitted prompt text or exact cross-member message times were invented.
- The original linked business description v1.1 was inaccessible to the integrator; the supplied official rubric/final-brief PDFs and Source of Truth were used. Other assistants' source-access limits remain in their logs.
- Validator PDFs name the file but do not embed its uploaded source hash. The current manifest identifies inspected files, not cryptographic proof of the earlier upload contents.
- Huy approved the team's 98-point self-assessment and authorized commit/push, ZIP creation with `.git` and extraction verification. Actual packaging checks are recorded in [QA](checks/QA.md). Student-account submission remains Huy's action; the assistant does not claim to have submitted the assignment.

## What We Would Do Differently

Run W3C during initial implementation: native validity and a generic parser missed the required-select conformance rule. Check what each Edit link displays, not only whether its target exists. Inspect native controls at readable scale because numeric overflow checks missed clipped date/dropdown segments. Preserve complete prompts and attachments when sent, and gather actual accessibility/contrast UI evidence before self-scoring. Cross-check asynchronous DevTools readings before accepting a changed-state result.

## Packaging

The team-approved submission filename is **`24127044-24127177-24127505_98.zip`**. If scores change, update the table, total and filename together. Package the working project folder with its hidden `.git`, exclude unrelated temporary tooling and `node_modules`, then verify all three pages from a fresh extraction. GitHub Download ZIP and `git archive` omit `.git`.
