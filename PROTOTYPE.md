# ClubFlow — PA#2 responsive prototype

## 1. Team

| Student ID | Full name | Responsibility |
| --- | --- | --- |
| 24127044 | Lê Nguyễn Quốc Học | Application Review; `pa2/hoc-review` |
| 24127177 | Thái Quang Huy | Repository, rules, shared CSS, Create Recruitment Campaign, sole reviewer/integrator; `pa2/huy-campaign` and `main` |
| 24127505 | Trần Hoàng Phúc | Interview Scheduling; `pa2/phuc-schedule` |

ClubFlow is the classwide project selected from another PA#1 team's proposal. This team's PA#2 implementation uses a new ClubFlow repository; our original PA#1 screens/history are not the starting codebase. Team membership remains the same.

## 2. How to open it

Open **`index.html`** directly in a browser. Keep the HTML files and `css/` in their relative locations. No server, network connection, installation, JavaScript, build step or account is needed. The signed-in Executive is an illustrative persona, not implemented authentication.

All essential content is HTML; CSS and fonts are local/system resources. The screens are successive sample stages, not a live workflow with shared state. Navigation does not publish a campaign, create applications, approve CVs or generate schedules. For the tested environment and limits, see [QA](checks/QA.md).

## 3. Screens and navigation

| File | ClubFlow screen | What the Executive does | Link destinations |
| --- | --- | --- | --- |
| [index.html](index.html) | Create Recruitment Campaign | Edit sample fields, inspect four positions/quotas, open previews, try native validation, inspect an invalid-quota example and proceed to applications. | Brand: `index.html`; skip/step: `#main`, `#campaign-details`; native form: existing `index.html#native-check`; Applications: `review.html`. |
| [review.html](review.html) | Application Review | Inspect 8 applications by 7 students, expand details and notes, read ST01's sample HTML CV and inspect independent recorded decisions. | Header/workflow/back: `index.html`, `review.html`, `schedule.html`; Review: `#detail-A01` through `#detail-A08`; A02 CV: `#cv-preview-A01`; Continue/workflow: `schedule.html?applications=A01%2CA02%2CA03%2CA04%2CA05`; skip: `#main`. |
| [schedule.html](schedule.html) | Interview Scheduling | Inspect the five-record draft and reasons, edit illustrative interviewer/assignment fields, inspect blocked confirmation and a separate resolved-state example. | Header/workflow/back: `index.html`, `review.html`, `schedule.html`; Edit/Assign: matching `#edit-A01` through `#edit-A05`; Resolve: `#after-resolution`; skip: `#main`. |

The scheduling query documents eligible IDs but is not parsed; the five records already exist in HTML. Review anchors reach a native disclosure; activate its summary to expand it if closed.

## 4. Our design choices

- Shared blue/neutral tokens, text status badges and campaign-specific footers connect the pages without copying a template.
- Campaign setup is the focus of Screen 1, with a blue Preview disclosure. Its timeline/preview/publication/next-step area becomes a desktop sidebar; position cards gain columns when space permits.
- Screen 2 uses in-flow cards/disclosures instead of a covering drawer. The list and details stack at 360/768px and sit side by side at 1280px. Continue to Interview Scheduling is the main action.
- Screen 3 prioritizes the draft conflict explanation and Resolve action. Semantic tables scroll inside labeled keyboard-focusable wrappers; configuration and edit forms stack on mobile and gain columns on larger screens.
- Long Vietnamese content wraps. Textareas keep native internal scrolling. No fixed overall page width or hidden horizontal overflow conceals content.
- Invalid draft and after-resolution examples are separately labeled. The alternate Confirmed illustration is never presented as the result of clicking the blocked draft confirmation button.

## 5. Not wired yet and native limitations

| Area | Native behavior present | Deferred or illustrated behavior |
| --- | --- | --- |
| Campaign fields | Editable fields, `required`, quota `min="1"`/`step="1"`, native date/time inputs. Invalid native checks block submission; a valid check reloads the existing file with a query. | No saving, cross-field date/room/position validation, dynamic positions or recalculation. Reload restores sample values. The separate red quota example is not a live error manager. |
| Save / Publish | Disabled buttons and visible explanation. | No draft persistence or publication. Applications only navigates to later-stage sample data. |
| Campaign/slot previews | Keyboard/mouse `details`/`summary` work with JavaScript off. | Preview, nine sample slots and timeline do not update after field edits. |
| Review tools | All eight records remain readable. | Search, filters, sort, pagination and CSV export are disabled illustrations; no data changes or file downloads. |
| CVs | A clearly illustrative HTML CV for ST01; A01/A02 share that student's example. | No genuine PDF/download or verification. Other students have no applicant-specific CV preview. |
| Notes / decisions | Labeled note fields can be edited locally. Each application has its recorded status and disabled Shortlist/Reject controls. | No saved notes or decision/counter updates. Executive-only labels do not enforce access control. |
| Interview setup / edits | Native room/duration inputs, interviewer-position checkboxes, availability windows and matching per-application edit forms. | Generate Draft, Save Interviewer Settings, Save Changes and Export Timetable are unwired `type="button"` controls with explanations. No persistence, algorithm, conflict recalculation or export. Rooms A/B/C already exist; no dynamic room creation. |
| Confirmation | Invalid draft confirmation is disabled with reasons. The alternate resolved example shows read-only/disabled action states. | No confirmation transaction or persistent lock. The alternate table is prewritten, not an interactive bypass. Confirmation is not final Pass/Fail publication. |
| Other services | The Executive's three-screen sample flow. | No applicant submission/results screen, interviewer assessment, notifications, login/logout, authorization or backend. No fake routes/resources for these services. |

## 6. CSS

Plain CSS3; no framework, dependency, remote asset/font or build. Each page loads [shared CSS](css/styles.css) first, then its own [campaign](css/campaign.css), [review](css/review.css) or [schedule](css/schedule.css) stylesheet.

The spacing scale is 4/8/12/16/24/32px through `--space-1/2/3/4/6/8`, expressed in rem. Breakpoints are mobile first at `min-width: 48rem` and `80rem` (768/1280px at the default 16px root size). The container is fluid with an 80rem ceiling, not a fixed page width. `.grid--fields` sizes native fields to the available panel space. Typography, borders, radii and targets have separate tokens. See the [shared contract](docs/SHARED_CSS_CONTRACT.md).

## Shared sample campaign

CF-2026-01: “Tuyển thành viên CLB Sáng tạo 2026”, hosted by “CLB Sáng tạo Sinh viên”. Times are Vietnam time (UTC+07:00).

| Stage | Fixture |
| --- | --- |
| Applications | 15 Nov 2026 08:00 through 20 Nov 2026 23:59 |
| CV review | 21–22 Nov 2026 |
| Interviews | 24 Nov 2026, 09:00–12:00, common 20-minute duration, Rooms A/B/C |
| Positions / quotas | Nội dung / Biên tập nội dung / 3; Truyền thông / Truyền thông số / 2; Sự kiện / Điều phối sự kiện / 2; Thiết kế / Thiết kế truyền thông / 2 |
| Applications | 8 applications, 7 students, 5 Shortlisted, 3 Rejected, 0 Pending |
| Draft | 2 Proposed + 2 Conflict + 1 Unassigned = 5 |

A01/A02 belong to ST01 Nguyễn Thị Minh Anh Phương Thảo but are separate position applications. A01/A03 conflict because I01 interviews both at 09:00–09:20. A02 starts at 09:20 and is adjacent, not overlapping. A05 is Unassigned because ST04 is free 11:00–12:00 while qualified I01 is initially free only 09:00–10:00. Applicants and interviewers are distinct people.

The separate resolution example moves A03 to 09:40–10:00, explicitly extends I01's availability to include 11:00–12:00 and assigns A05 at 11:00–11:20. Its five Confirmed rows are an alternate illustration. Shortlisted means CV screening passed; neither Shortlisted nor Confirmed means final admission.

## Evidence and release status

See [QA](checks/QA.md), [actual prompts](brief.md), [AI log](AI-LOG.md) and [self-assessment](SELF_ASSESSMENT_REPORT.md). Final browser evidence references application source at `d0426d7`. These documentation/evidence changes do not alter HTML/CSS. Huy confirmed the team's 98/100 self-assessment on 09 Nov 2026 and authorized the assistant to commit/push the artifacts and package the repository with `.git`. Packaging/extraction observations are recorded in QA; actual delivered revision/archive details accompany the final handoff. Student-account submission remains Huy's action.
