# ClubFlow PA3 pre-package QA

**Tested on 28 November 2026.** Source commit `edb3d2671f02b92c61e62d671a76602b69cebf9e`. Production build via `npm run build` and Vite preview, Chrome 158.0.8127.88 via Playwright, and a fresh `normal` mock with demo controls. The run preserved one mock process from creation through final release. Executive, both Applicants and both Interviewers used separate browser sessions. [Tested commit](https://github.com/ThaiQuangHuy2906/clubflow/commit/edb3d2671f02b92c61e62d671a76602b69cebf9e)

## Browser walkthrough

| Steps | Observed result |
| --- | --- |
| C1–C3, public campaign, sign-in and creation | The creation control reset the campaign. The public page showed the unpublished state. The Executive created two positions, saved and reopened the draft, previewed it, and published. The public page showed both positions and their requirements. The Applicant returned to the chosen Apply page after sign-in. |
| C4–C6, setup and applications | The Executive saved four offered windows, two interviewers, two rooms and a 20-minute duration. Submitting with two choices displayed a validation message and sent no application request. Three choices created A01 and froze the offered windows while leaving duration editable. A different position created A02 with a different phone. A duplicate Content submission returned A01 with its original phone. Student B saw only its own A03. |
| C7, screening | The Executive saved and separately published Shortlisted for A01 and A02 and Rejected for A03. The corresponding states appeared in the Applicant sessions. |
| C8–C9, scheduling and confirmation | Two applications for the same applicant overlapped despite different interviewers and rooms. The saved conflict blocked confirmation and identified both IDs. Resolving it allowed saving and CSV export. Changed editor inputs, an unsaved preview and changed generation inputs each blocked confirmation. After checking and saving A02’s change, confirmation kept the new 09:40 slot, locked the schedule and made both appointments visible to Student A. |
| C10, interviewer workspace | Each interviewer saw only their assignment. Cross-assignment detail access was denied. The assigned CV downloaded as a PDF. A01’s assessment was submitted once after the interview window and persisted after refresh. |
| C11, final release | The Executive recorded A01 as Pass and A02 as Fail with an Absent case. There were no final-result notices before publication. A single publication request released both decisions. Student A opened two distinct result notices. Student B received zero final-result notices. |

**Totals.** Production build passed. Chrome passed **18 functional check groups** and reported zero uncaught page errors. **12 layout observations** measured one main heading and no horizontal page overflow for the C8 conflict, C9 unsaved-edit blocker, C10 recorded assessment and C11 results, each at 360, 768 and 1280 px.

## W3C Nu on rendered HTML

W3C Nu Html Checker **26.11.28 (`a0cdb41`)** validated the document HTML captured from Chrome after React rendered each state. The local checker exited with status 0 and reported **0 errors and 7 warnings across 26 states**. [Nu Html Checker](https://validator.github.io/validator/)

| Warning | Occurrences | Rendered states |
| --- | ---: | --- |
| `aria-invalid` on the availability `fieldset`, whose implicit role is `group` | 2 | C5 form after submitting two choices, and after checking a third choice but before resubmitting |
| Explicit `role="list"` on `ul` | 5 | C7 review list and open drawer, C11 Executive results before and after publication, and C11 Applicant notifications after publication |

<details>
<summary>Rendered states checked</summary>

| Steps | Rendered states | Count |
| --- | --- | ---: |
| C1–C4 | Public unpublished and published, sign-in, campaign editor and preview, setup before and after the first application | 7 |
| C5–C6 | Pristine form, two-window submission error, third window selected before resubmission, submitted application detail, owner list before screening | 5 |
| C7 | Application review list and open review drawer | 2 |
| C8–C9 | Conflict preview, refused confirmation, confirmation blocked by an unapplied edit, confirmed schedule | 4 |
| C10 | Interviewer list before confirmation, assigned interview before the end, assessment form, recorded assessment | 4 |
| C11 | Results ready to publish, published Executive results, Applicant results with notifications, Applicant result detail | 4 |
| **Total** | | **26** |

</details>

## Evidence and remaining scope

Local raw artifacts from this run are in `D:/Temp/clubflow-pa3-release-qa-edb3d26/`. `release-report.json` records the browser assertions, routes and writes. `nu-report.json` records the result for each HTML state, and `nu-raw.json` contains the direct validator output. The captured documents are in `rendered-html/`, and the build output is recorded in `build.log`.

This pass covers the stated Chrome and mock scenario and the sampled HTML states. The Node tests and API contract example results cited in the [merged-build verification](../AI-LOG.md#merged-build-verification) come from the earlier checkpoint at `5a8e234`. Submission archive creation and verification from a fresh extraction remain pending.
