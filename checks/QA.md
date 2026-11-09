# ClubFlow PA#2 — final integration QA

## Scope and provenance

Date: **09 Nov 2026 (Asia/Saigon)**. Application source: **`d0426d7`** on integrated `main`, after all three feature PRs and the footer correction. No HTML/CSS changed during this evidence/documentation task.

Assistant checks used installed Node 24.14.1, cached Playwright CLI 0.1.23 and Chrome 157 on Windows. Actual local pages opened through `file://` in an isolated headless context with **JavaScript disabled, offline=true, DPR 1**, viewport height 900px. A separate page-script sentinel stayed `blocked`. DevTools instrumentation can inspect the DOM despite disabled page scripts; no application script supplied content.

All nine submission screenshots were freshly captured in this run, replacing earlier captures so source and footer match. Default native disclosure states were retained; opened states were tested separately. Raw evidence: [viewport results](browser-results.json), [interactions and accessibility trees](interactions.json), [source/evidence hashes](source-manifest.json).

W3C results were **run by Huy through File upload**, printed to PDF and supplied by him. The assistant read/visually inspected those PDFs and rendered each unchanged result to PNG with Poppler at 150 dpi. This conversion is **not another validator run**. Earlier assistant Nu requests returned HTTP 403 and are not successful uploads.

## Nine default page/viewport checks

Each row also had one h1, no heading skips and no unlabeled input/select/textarea. Widths are CSS pixels; PNG widths match because DPR is 1.

| Page | Viewport | clientWidth / scrollWidth | Overflow | Right overflow outside tables | Min target | Min text | Full-page capture |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| Campaign | 360 | 360 / 360 | false | `[]` | 44px | 16px | [360 × 8132](../screenshots/index-360.png) |
| Campaign | 768 | 768 / 768 | false | `[]` | 44px | 16px | [768 × 5460](../screenshots/index-768.png) |
| Campaign | 1280 | 1280 / 1280 | false | `[]` | 44px | 16px | [1280 × 3892](../screenshots/index-1280.png) |
| Review | 360 | 360 / 360 | false | `[]` | 44px | 16px | [360 × 8765](../screenshots/review-360.png) |
| Review | 768 | 768 / 768 | false | `[]` | 44px | 16px | [768 × 6058](../screenshots/review-768.png) |
| Review | 1280 | 1280 / 1280 | false | `[]` | 44px | 16px | [1280 × 3670](../screenshots/review-1280.png) |
| Schedule | 360 | 360 / 360 | false | `[]` | 44px | 16px | [360 × 12900](../screenshots/schedule-360.png) |
| Schedule | 768 | 768 / 768 | false | `[]` | 44px | 16px | [768 × 8930](../screenshots/schedule-768.png) |
| Schedule | 1280 | 1280 / 1280 | false | `[]` | 44px | 16px | [1280 × 6876](../screenshots/schedule-1280.png) |

All nine full-page captures were visually inspected, including readable mobile crops. No unintended document clipping/panel overlap was observed. Long names/headings wrap. Textareas scroll internally by design. Schedule tables extend only inside labeled wrappers; their initial capture position does not show every column at once.

Computed visible text/control contrast had a minimum **6.15797:1** in every default view; no measured pair was below 4.5:1. Textless checkbox/radio glyphs were excluded from text-size measurement; ordinary inline prose links were exempt from standalone-target sizing. These initial measurements are browser calculations. The separate actual Color Picker follow-up is below; neither is a full conformance audit.

## Native interactions and opened states

The [raw record](interactions.json) contains 24 final checks, all true after a focused skip-link retest. The original over-specific assertion/result is retained.

- Tab reveals the campaign skip link with a 3px focus outline. Enter reaches `#main`, aligns main at viewport top and places the next Tab stop inside main. Chrome leaves activeElement as BODY because main is not focusable; requiring direct main focus was an incorrect initial test assumption.
- Enter opens the campaign preview with page scripts disabled. All disclosures were opened on each page; all nine additional page/width states had no document/out-of-wrapper right overflow.
- Native submission blocks quota 0 (`rangeUnderflow`), quota 1.5 (`stepMismatch`), empty name and empty duration (`valueMissing`). The relevant control receives focus without navigation. A valid check reloads the existing file with a query and restores sample values, confirming no save.
- Applications → Review → Continue → Schedule works. A02's note is editable but its decision controls remain disabled; its shared CV link reveals ST01's HTML sample even when A01 was closed. The scheduling query does not cause data generation/filtering.
- All five Edit/Assign links were clicked and matched their forms. Initial values: A01 09:00/I01/A; A02 09:20/I02/B; A03 09:00/I01/B; A04 09:40/I03/A; A05 unassigned.
- Interviewer availability accepts local edits while draft confirmation stays disabled. The mobile draft table wrapper accepts focus and ArrowRight scrolls it. Schedule → Review → Campaign back links work.
- The first 12 Tab stops per page were sampled with `:focus-visible` and 3px outlines. This is not an exhaustive keyboard traversal of every state/control.

## Semantics and resources

Chrome's full accessibility tree was inspected with disclosures open: header/navigation/main/footer landmarks are exposed and no unnamed inspected button/textbox/searchbox/combobox/checkbox/radio was found. Names/roles are saved in `interactions.json`. That first run used CDP rather than the pane UI. The actual DevTools follow-up below closes that evidence gap; historical Học user-reported checks remain separately recorded.

Source checks found no duplicate IDs, missing local link/asset/form/fragment targets, unresolved CSS variables, scripts, event attributes, external runtime URLs/imports, `!important` or hidden horizontal overflow. Stylesheet order is shared-first, page-second. Campaign/review/schedule have 26/12/48 input/select/textarea controls, all associated with labels. The pages have no image elements, so no page image lacks alt text.

## DevTools Accessibility and Color Picker follow-up — 09 Nov 2026

Huy asked the assistant to perform the remaining inspection. The assistant operated the **actual bundled Chrome DevTools frontend** through the installed Playwright browser library. The CLI does not expose the separate DevTools target, so the existing library was used directly; no project package was added. A separate tooling context enabled the DevTools UI scripts and connected over loopback to the inspected app context. Application pages stayed at `file://`, JavaScript disabled, offline, 1280 × 900; DevTools captures are 1600 × 1100. This is assistant-operated UI inspection, not a claim that Huy manually clicked the panels.

All native disclosures were opened for control inspection. The application files remain unchanged. Full pane text, selected DOM selectors, HTML hashes, Chrome-supplied backgrounds and actual picker readings are in [devtools-inspection.json](devtools-inspection.json).

| Page | Accessibility selections | Default Color Picker samples | Lowest displayed ratio | Accessibility UI | Color Picker UI |
| --- | ---: | ---: | ---: | --- | --- |
| Campaign | 43 | 13 | 6.15:1 | [Campaign name](accessibility-index.png) | [Active step](contrast-index.png) |
| Review | 39 | 13 | 6.15:1 | [A01 note](accessibility-review.png) | [Active navigation](contrast-review.png) |
| Schedule | 62 | 14 | 6.15:1 | [A01 start time](accessibility-schedule.png) | [Active navigation](contrast-schedule.png) |

- **Accessibility:** 144 actual pane selections cover the page landmarks, h1–h3 and all 86 visible input/select/textarea controls across opened states. Named fields matched their visible labels; heading names and landmark roles were inspected. Earlier full-tree/outline checks cover the remaining structure. Some native date/time/select nodes omit a `Required` line in this Chrome pane; this is recorded without claiming that line appeared. Their HTML attributes and native validity are separate evidence.
- **Contrast:** all 40 accepted default-state samples displayed at least 4.5:1, including body/muted text, button/link text and status colors. Each displayed ratio was cross-checked against its actual foreground and Chrome-reported background, allowing 0.025 for display rounding. The displayed 6.15:1 corresponds to the earlier computed minimum 6.15797:1; this is not a regression. An AAA failure icon at 7.0 does not invalidate the required 4.5:1 check.
- **Limits:** these are default palette samples, not a claim of exhaustive state coverage, screen-reader testing or full WCAG conformance. Additional forced-hover probes sometimes left a stale picker background ratio despite changed computed colors; they are retained as diagnostics and **excluded from acceptance**. Failed internal refresh attempts are tooling errors, not application failures. No application color was changed to obtain a pass.
- **Artifacts:** all six real DevTools PNGs were visually inspected. No composed/fabricated DevTools screenshots were used. No fresh W3C run was needed because HTML/CSS did not change.

## W3C Nu File Upload results

| Page | Printed time (ICT) | Checker | Result | Submission PNG | Unchanged PDF |
| --- | --- | --- | --- | --- | --- |
| index.html | 08 Nov 2026 21:58 | vnu 26.11.5 | 0 errors / 0 warnings | [index](validator-index.png) | [PDF](validator-index.pdf) |
| review.html | 09 Nov 2026 13:09, after footer fix | vnu 26.11.9 | 0 errors / 0 warnings | [review](validator-review.png) | [PDF](validator-review.pdf) |
| schedule.html | 09 Nov 2026 13:02 | vnu 26.11.9 | 0 errors / 0 warnings | [schedule](validator-schedule.png) | [PDF](validator-schedule.pdf) |

Huy supplied these as checks of the corresponding final files. PDFs name each upload but embed no source hash. The manifest identifies files inspected now; it cannot cryptographically prove earlier uploaded contents. Index source remains unchanged from its checked implementation; review's latest result follows the footer change; schedule is unchanged since the reviewed revision.

## Business fixture and eight Fix these items

| Item | Final observation |
| --- | --- |
| Dates | Applications 15 Nov 08:00–20 Nov 23:59; review 21–22 Nov; interview 24 Nov 2026 09:00–12:00, 20-minute slots. |
| Screen 2 title | Document title and h1 are Application Review. |
| Drawer/list | In-flow stacked details on mobile/tablet and side-by-side desktop columns; no covering drawer. |
| Counters | 8 applications / 7 names; 5 Shortlisted / 3 Rejected / 0 Pending. Five draft rows: 2 Proposed + 2 Conflict + 1 Unassigned. |
| Real conflict | A01/A03 share I01 at 09:00–09:20 in different rooms. A02 starts at 09:20, adjacent to A01. |
| People | Applicants and interviewers have distinct names/IDs. |
| Verification | HTML CV sample is labeled illustrative; no genuine attachment/university verification or implemented role authorization is claimed. |
| Footer | Campaign-specific prototype copy; no template legal/support links. Review's stale checkout sentence was removed in `d0426d7`. |

Quotas stay 3/2/2/2; the red invalid example is separate. A01/A02 belong to ST01 but remain independent records. A05's ST04 availability is 11:00–12:00 versus qualified I01's initial 09:00–10:00. The alternate resolution explicitly extends I01's availability and stays separate from the invalid draft. Shortlisted, Proposed and Confirmed are not final admission results.

## Reproduction and remaining release checks

1. Open `index.html` directly, disable JavaScript, disconnect the network and follow the three-screen flow/back links.
2. For each page at 360/768/1280, check exact `document.documentElement.clientWidth`; `document.documentElement.scrollWidth > document.documentElement.clientWidth` must be false. Inspect right-edge elements, excluding only contents of deliberate table wrappers.
3. Inspect long content, native controls, open disclosures, Tab/Enter and table arrow-key scrolling. Independent targets must remain at least 44px.
4. DevTools Elements → Accessibility and default-state Color Picker inspection is completed by the assistant, with evidence above. Huy may spot-check the saved observations; repeating the entire inspection is not an outstanding handoff task. Any changed colors or controls require an affected-state recheck.
5. If HTML changes, rerun affected File Upload validation and refresh its result/captures. Current PNGs are faithful PDF renditions, not new uploads.
6. The team approved 98/100 and authorized commit/push and packaging. The preflight ZIP/extraction checks below have run. The delivered archive is built after the release commit/push and reverified; its exact revision/hash and final extraction results are provided in the handoff. Student-account submission remains Huy's action.

## Team-approved release and ZIP preflight — 09 Nov 2026

Huy confirmed the team's 98/100 self-assessment and authorized the assistant to commit/push on `main` and package **`24127044-24127177-24127505_98.zip`**. No HTML/CSS changed. `git fetch origin` showed `main` and `origin/main` aligned before release; the configured author is Thái Quang Huy (24127177).

A repository-folder ZIP was created outside the repository and extracted to a new temporary directory. It included `.git/HEAD` and the complete existing history, without `node_modules`. Every extracted non-Git file matched the original bytes, and `git fsck --full` passed. [package-preflight.json](package-preflight.json) records the actual browser check of the extracted application:

- Chrome with direct file URLs, offline=true and JavaScript disabled; a separate page-script sentinel remained `blocked`.
- All nine page/width combinations had exact 360/768/1280 widths, no document/out-of-wrapper overflow, shared-first/page-second stylesheets, visible styled content and one h1.
- Campaign → Review → Schedule and both return links opened the corresponding extracted files.
- No HTTP(S) requests or page-script errors occurred. All nine fresh full-page captures were pixel-identical to the existing submission screenshots; the temporary duplicates are not added to the repository.

The final archive is created after the commit/push so it contains the final Git state. Final archive byte/hash comparison, extracted Git revision/status, integrity and browser checks are separate release verification, reported with the delivered ZIP. No W3C rerun is claimed: the application HTML remains identical to the validated source. The assistant does not submit to Classroom.

Packaging tooling notes: Windows `tar.exe` could not resolve the Vietnamese parent path, so Python's standard `zipfile` module was used. An initial attempt to inspect stylesheet `cssRules` was blocked by file-URL origin restrictions; the corrected browser check used loaded stylesheet URLs, rendered computed styles and exact screenshot comparison. Neither failed tooling attempt was counted as a pass.

## Instrumentation notes

Tagged diagnostic exceptions return JSON in this JavaScript-disabled CLI environment; they are not application failures or proof of success. Each result was inspected. An initial `require()` transport and an incorrect `index.css` collector assumption were corrected in temporary tooling. The skip-link assertion correction preserves the original result in the raw record. Temporary scripts/crops stayed outside the submission folder.
