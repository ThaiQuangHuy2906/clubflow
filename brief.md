# ClubFlow PA#2 — actual assistant prompts

## Provenance and ordering

This file consolidates the available messages actually supplied to the assistants, preserving the quoted prompt text from the branch owners' records. It is not a newly written implementation brief presented as an old conversation. English context surrounds original-language quotations; Vietnamese prompts remain verbatim rather than being replaced with a translation falsely labeled original text.

Messages within each developer's record retain their recorded order. Exact send times and a reliable total order across parallel developer threads were not recorded, so no cross-thread chronology is invented. Huy's setup preceded the screen work; review/fixes and final integration followed it. Per-thread dates below are those recorded in the source files; later Phúc review feedback occurred after the initial 08 Nov task.

Sources: [Huy](docs/ai-prompts/huy.md), [Học](docs/ai-prompts/hoc.md), [Phúc](docs/ai-prompts/phuc.md), and the subsequent Huy messages available in this integration conversation. [AI-LOG.md](AI-LOG.md) maps requests, errors, checks and outcomes. Original developer files remain unchanged.

**Known gaps:** Phúc's first pasted assignment/rubric and fourth pasted log template were abbreviated in his original record; omitted material cannot be reconstructed verbatim. His record also omits short status follow-ups. Học's review feedback was transcribed from a screenshot and some evidence follow-ups were condensed, not preserved as a complete transcript. These portions are labeled as such below. Do not count an abbreviated quotation or the reference library as a complete exact sent message.

On 09 Nov 2026 Huy confirmed that complete original conversations are no longer available. This consolidation therefore preserves the available records and their explicit gaps; it does not reconstruct omitted messages from templates or later code.

## Available recorded prompts — Huy (08 Nov 2026)

The following source record is reproduced with only Markdown heading depth and relative documentation links adjusted. Text inside fenced prompt blocks is unchanged.

### Huy - actual assistant prompts

Date: 2026-11-08 (Asia/Saigon). Exact send times were not recorded.
Tool: Codex in the local workspace; client/model version not independently recorded.
Branch: `main`. Task: HUY-SETUP only.

#### 1. Common team contract - actually sent

The text below matches the user message in this interaction and the PROMPT 00
code block in `brief.md`. It is recorded because it was actually sent, not because
it appeared in the draft prompt library. PROMPT 01 and the screen prompts were
not sent in this interaction.

```text
You are helping our CSC13008 PA#2 team build ClubFlow, a three-screen responsive recruitment-management prototype. ClubFlow was selected from ANOTHER team's PA#1 as the common final project; our prior PA#1 screens and repository are NOT a starting codebase. Huy creates a NEW ClubFlow PA#2 repository with new Git history, a first rules-file commit and shared CSS baseline before branching; do not clone or migrate PA#1 source or history. Before editing code, read the attached PA#2 rubric, ClubFlow final project brief, PA2_CLUBFLOW_SOURCE_OF_TRUTH.md, and AGENTS.md if accessible. If any source cannot be read, say so; do not pretend it was reviewed. Treat the grading rubric as the authority for deliverables and browser checks, the final project brief as the authority for the three screens and its eight Fix these problems, and the business description v1.1 as supporting business detail. If these disagree, surface the issue instead of guessing.

TEAM AND OWNERSHIP
- 24127177 — Thái Quang Huy: repository setup, rules, shared CSS, Screen 1 on pa2/huy-campaign, and sole reviewer/merger of every feature branch into main.
- 24127044 — Lê Nguyễn Quốc Học: Screen 2 only on pa2/hoc-review.
- 24127505 — Trần Hoàng Phúc: Screen 3 only on pa2/phuc-schedule.
- Exactly one screen implementation task per feature branch; no one except Huy merges/pushes to main. Do not touch another member's HTML/CSS or shared css/styles.css from a feature branch.

STACK AND RUNTIME
- STATIC semantic HTML5 + plain CSS3; no React for this PA#2 team plan, no new dependencies, no build step, no Tailwind CDN script, no remote assets, fonts or CDN. Use system fonts.
- All essential application content, sample records, states and controls must be present in HTML and visible when JavaScript is DISABLED. Do not render essential content with JS. Do not use a JS-based router or onclick for navigation.
- Entry point index.html. Other screens: review.html and schedule.html. Use file-relative anchors such as href="review.html", not /review.html, review/, href="#" or invented files. All in-flow links and form actions must lead to files that really exist. Use a link for navigation and a button for an action. A button cannot masquerade as a working backend operation.
- All three HTML pages load css/styles.css first and their own page CSS second: css/campaign.css, css/review.css or css/schedule.css. Reuse the shared tokens. Never add a second CSS framework.

RESPONSIVE / DESIGN
- Mobile-first at 360px, 768px and 1280px. Use fluid grids, minmax(0,1fr), wrapping and safe word breaking; no fixed page widths, no horizontal scroll, no clipped or overlapping content. Do NOT use overflow-x:hidden to conceal broken layout. A table may scroll within its own deliberate table wrapper only.
- Every independent link and button is at least 44px high at 360px; ordinary inline links are exempt. Body text is at least 16px. Body text and button text contrast is at least 4.5:1. Use a consistent spacing scale of 4/8/12/16/24/32px. No !important in custom CSS.
- At least one long Vietnamese applicant name/title must wrap naturally. Give each page one clear primary visual focus.

SEMANTIC / ACCESSIBILITY
- Include <!DOCTYPE html>, lang="vi" or the actual UI language, meta charset="UTF-8" and meta name="viewport" content="width=device-width, initial-scale=1".
- Correct header/nav/main/footer landmarks, exactly one h1 per page, no skipped heading level, visible associated labels for all inputs, real accessible buttons/links, semantic lists/tables/headings, alt attributes on images (or alt="" for decoration), and appropriate names for icon-only controls.
- The W3C Nu validator must report ZERO HTML ERRORS for all three final pages. Accessibility must be inspected in browser, not assumed from valid HTML.

CANONICAL CAMPAIGN / BUSINESS FIXTURE (sample data, not a requirement of the professor)
- Campaign CF-2026-01: "Tuyển thành viên CLB Sáng tạo 2026", host "CLB Sáng tạo Sinh viên".
- Opens 2026-11-15 08:00; closes 2026-11-20 23:59; CV review 2026-11-21 to 2026-11-22; interview on 2026-11-24, 09:00-12:00, 20-minute common slots, Rooms A/B/C.
- Departments/positions/quotas: Nội dung / Biên tập nội dung / 3; Truyền thông / Truyền thông số / 2; Sự kiện / Điều phối sự kiện / 2; Thiết kế / Thiết kế truyền thông / 2.
- 8 application records, 7 distinct students. A01 and A02 are two independent applications for different positions made by the same student, ST01 Nguyễn Thị Minh Anh Phương Thảo.
- Application statuses: A01-A05 Shortlisted; A06-A08 Rejected; 0 Pending. Counters: 8 total applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending.
- Only A01-A05 are eligible for scheduling. Draft statuses must be exactly 2 Proposed, 2 Conflict, 1 Unassigned = 5. A01 and A03 both conflict because interviewer I01 is assigned to both at 09:00-09:20. A02 belongs to the same applicant as A01 but starts at 09:20, so it does not overlap. A05 is Unassigned because the applicant is available 11:00-12:00 while qualified interviewer I01 is initially available 09:00-10:00.
- Shortlisted means CV screening passed, not final admission; Proposed means draft, not confirmed. No schedule confirmation with conflict/unassigned. Confirmation is NOT announcement of recruitment results.
- The three screens are successive illustrative stages, not a live backend. Moving from index to review does NOT itself create applicants or approve CVs.

AVOID THE EIGHT OFFICIAL FIX THESE PROBLEMS
1. Contradictory dates across three screens.
2. Wrong Screen 2 title (must be Application Review).
3. Candidate details/drawer covering most of the list.
4. Scheduling counters not adding up to the scheduling records.
5. False conflict badges without real people/time/room overlap.
6. Using the same sample person as applicant and interviewer.
7. False claims of student/attachment verification outside scope.
8. Generic template footer such as outdated copyright, Privacy Policy, Terms of Service or Support Center.

STATIC-PROTOTYPE HONESTY
- Include the features and meaningful controls/states expected in the three screens, using usable native-HTML interactions where feasible (for example details/summary), but never claim persistent saving, automatic filtering, publication, schedule-generation, CSV export, validation across fields or backend authorization is implemented if it is merely illustrated.
- Do not add buttons that link to nonexistent resources, make empty href links, or simulate a successful confirmation while conflicts exist. Clearly document unimplemented actions and out-of-flow controls in PROTOTYPE.md, rather than suggesting they really work.

HOW DONE WILL BE VERIFIED
1. Open each HTML file directly from the folder, offline, with JavaScript disabled.
2. At each width 360, 768, 1280 run document.documentElement.scrollWidth > document.documentElement.clientWidth; it must be false. Check clientWidth is exactly the selected width, and that right-overflow elements list is empty (except deliberate table wrappers).
3. Visually inspect all nine page/width combinations, the 44px tap targets, headings, labels and the long name.
4. Use the W3C Nu validator File upload on EACH HTML file and save evidence, requiring 0 errors.
5. Inspect DevTools Accessibility and color contrast; verify main-flow links and all referenced assets.
6. Preserve actual prompts, decisions, test observations, Git authors and commits. Do not say a check passed unless it really ran.

Respond initially with: (a) a short requirement-to-element mapping; (b) files you propose to change; (c) assumptions/unimplemented behavior. Then implement only the specified task. After implementation show a precise diff summary and a manual verification plan. Never invent test results or tool calls you did not perform.
```

Sources accessible in this interaction: `AGENTS.md`,
`PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`, `brief.md`, and the two official PDFs in the
parent PA2 directory. The linked business description v1.1 was inaccessible via
the web tool. Its rules were not independently verified against that document.

#### 2. Task selection - actually answered by the user

Assistant's clarification:

```text
Bạn muốn thực hiện task nào trong lượt này? Repository hiện ở main, mới có tài liệu và chưa có CSS chung.
```

Exact user answer:

```text
HUY-SETUP: tạo css/styles.css và hợp đồng CSS chung trên main
```

The assistant announced the concrete scope before editing: `css/styles.css`,
`docs/SHARED_CSS_CONTRACT.md`, `docs/ai-prompts/huy.md` and `docs/ai-logs/huy.md`.
The three existing root documents were preserved. No screen, feature branch,
commit, push or merge was requested or performed.

Assistant implementation and checks: [actual setup log](docs/ai-logs/huy.md).
Huy's acceptance/rejection and any eventual commit are pending user review.


#### 3. HUY-01 - actually sent on 2026-11-08

Branch: `pa2/huy-campaign`. Tool: Codex. Exact send time not recorded.
The following text was actually sent in this interaction and matches PROMPT 02
in the existing prompt pack; no other template is marked as sent.

```text
I am Huy implementing ONLY TASK HUY-01 (Create Recruitment Campaign) on pa2/huy-campaign. Use the COMMON TEAM CONTRACT, the rubric and final brief. Do not modify files outside index.html, css/campaign.css or my own per-branch prompt/AI logs. Read and reuse the existing css/styles.css tokens, but do NOT edit that shared file.

Build a polished, coherent, mobile-first static page for a signed-in Club Executive managing the campaign CF-2026-01. It must be page 1 and use real file-relative navigation to review.html. Include:
- Correct document title, semantic landmarks, one h1, a visible step indicator for the 3-screen main flow, and a strong primary action hierarchy.
- Campaign name "Tuyển thành viên CLB Sáng tạo 2026", host "CLB Sáng tạo Sinh viên", useful descriptive copy, opening 2026-11-15 08:00 and closing 2026-11-20 23:59, and realistic application instructions.
- Department and position setup for the FOUR canonical positions (Nội dung/3, Truyền thông/2, Sự kiện/2, Thiết kế/2), with job descriptions and requirements for EACH, and quotas as positive integers. Every input must have a visible associated label.
- An interview availability preview/configuration appropriate to the business reference: interview date 2026-11-24, 09:00-12:00, common slot duration 20 minutes, and available rooms A/B/C; do not imply dynamic room creation.
- Visible Save as Draft, Preview Campaign and Publish Campaign controls or previews. Expose the required-field/date-order/position/quota validation criteria and a clear invalid-input state. Use native HTML required/min/step/date inputs and a no-JS preview via details/summary if appropriate; do not claim business-rule validation or persistence is implemented unless it is.
- A real, accessible main-flow link "Applications" with href="review.html" for navigating to Screen 2. Explain in page copy that sample applications are a later-stage fixture after publication/submissions; navigation does not create them.

HTML must work from file:// with JavaScript disabled. Load css/styles.css THEN css/campaign.css. The long Vietnamese campaign title or position description must wrap at 360px. At 360px stack into one column; at 768/1280 adapt layout without overlap/cutoff. Buttons/standalone links >=44px. No broken routes, fake CV links, lorem ipsum or generic template footer.

Deliver exactly index.html and css/campaign.css; include requirement-to-element mapping, diff summary, and explicit browser/W3C test steps. Identify any native-HTML prototype limitation honestly. Never claim checks passed without running them. Do not push or merge; I will handle Git commands separately.
```

Sources reused: the common contract, official PA2 rubric and final brief PDFs
read earlier in this session, current Source of Truth, AGENTS.md, shared CSS
and shared CSS contract. Original business description v1.1 remains unverified.

Implementation/checks: [HUY-01 task log](docs/ai-logs/huy.md).

#### 4. HUY-01 validator correction - actually sent on 2026-11-08

Tool: Codex. Branch: `pa2/huy-campaign`. Exact send time not recorded.

```text
Lỗi ở bước Chạy W3C Nu cho index.html nè

Với cả bước 8 là sao? Tôi không hiểu?
```

The user attached a screenshot of W3C Nu File Upload results for index.html
(vnu 26.11.4). It shows one error: the required single-choice slot-duration
select lacks an empty first option. The screenshot is user-provided evidence;
it was not an assistant-run validator result. The assistant also explained
how to capture viewport/validator evidence and defer cross-page navigation
until review.html exists.

#### 5. HUY-01 evidence review - actually sent on 2026-11-08

Tool: Codex. Branch: `pa2/huy-campaign`. Exact send time not recorded.

```text
OK. Tôi làm xong rồi: D:\TAI_LIEU_HCMUS_K24\Năm 3 - Kì 1\Phát triển ứng dụng web\TeamWork\PA2\ClubFlow-evidence , bạn xem đi.
```

The assistant read the three PNGs and the PDF from that actual folder. The
inspection outcome is appended to Huy's AI log; no application code was changed.

## Available recorded prompts — Học — initial task and continuation, 08 Nov; handoff 09 Nov

### Học — actual assistant prompts

Date: 2026-11-08 (Asia/Saigon). Exact send time was not recorded.
Tool: Codex in the local workspace; model/version not independently recorded.
Branch: `pa2/hoc-review`. Task: HOC-01 only.

#### 1. HOC-01 Application Review — actually sent

The prompt below was supplied by the user in this interaction. The official rubric
and ClubFlow final-brief PDFs were not present in the workspace or its parent
folder, so they could not be attached/read here. `brief.md` is the team's prompt
pack, not a substitute for those PDFs.

```text
I am Lê Nguyễn Quốc Học (24127044), implementing ONLY TASK HOC-01 (Application Review) on pa2/hoc-review. Read the COMMON TEAM CONTRACT, rubric, final brief, AGENTS.md, PA2_CLUBFLOW_SOURCE_OF_TRUTH.md, and the shared stylesheet. If a source is unavailable, say so. Change ONLY review.html, css/review.css, and my own prompt/AI logs. Do not change css/styles.css, another person's page, or root submission documents. Huy will review and merge my branch.

Create Screen 2, titled “Application Review” everywhere it appears. It belongs to campaign CF-2026-01: applications open 15–20 Nov 2026; review is 21–22 Nov 2026.

Use these eight independent application records:
A01: ST01 Nguyễn Thị Minh Anh Phương Thảo, Nội dung, 15 Nov 10:15, Shortlisted.
A02: ST01 Nguyễn Thị Minh Anh Phương Thảo, Truyền thông, 15 Nov 10:32, Shortlisted.
A03: ST02 Trần Hồng Ngọc, Sự kiện, 17 Nov 10:10, Shortlisted.
A04: ST03 Lê Bảo Trâm, Thiết kế, 18 Nov 12:40, Shortlisted.
A05: ST04 Phạm Quốc Bảo, Nội dung, 19 Nov 20:15, Shortlisted.
A06: ST05 Võ Hoàng Long, Thiết kế, 16 Nov 11:21, Rejected.
A07: ST06 Đặng Thanh Tuyền, Sự kiện, 18 Nov 09:30, Rejected.
A08: ST07 Bùi Nhật Khánh, Truyền thông, 20 Nov 22:05, Rejected.

Show accurate counters: 8 applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending. Keep A01 and A02 as separate applications and decisions.

Represent a readable application list with IDs, applicant names, positions, submission times, CV status and a review affordance. Include labeled search and status/position filters, sorting, pagination and CSV export affordances. Do not imply that controls work if they are only illustrative; document unwired behavior accurately.

Include an application detail area with CV information, a realistic motivation statement, review milestones, Executive-only notes, and Shortlist/Reject actions or decision states. Link to a CV only if a real file exists in the repository; otherwise show a clearly non-downloadable preview. Native details/summary or in-page anchors with real targets are suitable for a no-JavaScript prototype.

Distinguish total applications from unique applicants, and overall counts from filtered counts. Include real relative links: back to index.html and “Continue to Interview Scheduling” to schedule.html, referring only to the five shortlisted application IDs.

Load css/styles.css first, then css/review.css. At 1280px the list and detail may sit side by side; at 360px the detail must stack or expand without covering the list. Make ST01’s long name wrap naturally. Do not use a fixed-width drawer, overflow-x:hidden, inaccessible tables, unlabeled controls, fake verification labels, or invalid HTML.

Before editing, provide a short requirement-to-element mapping and exact file scope. After editing, report the diff, limitations, and a real validation checklist. Do not claim W3C or accessibility checks passed unless actually run. Do not merge the branch.
```

#### 2. HOC-01 continuation QA and handoff — actually sent

The following request was supplied by the user in a pasted-text attachment in
this interaction. It is recorded here verbatim so Huy can reconcile the task
prompt and the AI log. The attachments named in the prompt remained unavailable.

```text
Tiếp tục hoàn thiện HOC-01 — Application Review — trong checkout hiện tại cho tới khi nhánh sẵn sàng để Huy review và merge.

QUY TẮC TRƯỚC KHI LÀM
1. Dùng cwd/workspace hiện tại và chỉ định rõ workdir cho mọi lệnh.
2. Trước khi sửa, xác minh:
   - git rev-parse --show-toplevel
   - git rev-parse --path-format=absolute --git-dir
   - git rev-parse --path-format=absolute --git-common-dir
   - git branch --show-current
   - git rev-parse HEAD
   - git status --short --branch
3. Xác nhận checkout thuộc repository ClubFlow và đang ở `pa2/hoc-review`. Nếu root hoặc branch không đúng, dừng và báo lại; không tự chuyển branch.
4. Đọc AGENTS.md, PA2_CLUBFLOW_SOURCE_OF_TRUTH.md, docs/SHARED_CSS_CONTRACT.md, css/styles.css, PROMPT 00 và PROMPT 03 trong brief.md. Tìm rubric và ClubFlow final brief trong vị trí dự án cung cấp. Nếu không truy cập được tài liệu nào, nêu rõ, không giả vờ đã đọc.
5. Các file của Học có thể đang là untracked. Giữ nguyên nội dung hiện tại để review; không ghi đè hoặc xóa công việc chưa commit.

PHẠM VI
Chỉ được sửa:
- review.html
- css/review.css
- docs/ai-prompts/hoc.md
- docs/ai-logs/hoc.md

Không sửa index.html, schedule.html, css/styles.css, root docs, hoặc file của Huy/Phúc. Không merge vào main, không squash, không force-push, không nhận authorship của người khác.

YÊU CẦU SCREEN 2
Đối chiếu trang với brief và Source of Truth, gồm:

- Trang có tên “Application Review” nhất quán ở title, h1 và điều hướng.
- Nạp css/styles.css trước css/review.css; dùng đúng shared tokens và không thêm framework, dependency, JavaScript, CDN hay tài nguyên ngoài.
- Trang vẫn có đầy đủ nội dung khi JavaScript tắt và mở được trực tiếp bằng file://.
- Giữ nguyên fixture CF-2026-01:
  A01 — ST01 Nguyễn Thị Minh Anh Phương Thảo, Nội dung, 15 Nov 10:15, Shortlisted.
  A02 — ST01 Nguyễn Thị Minh Anh Phương Thảo, Truyền thông, 15 Nov 10:32, Shortlisted.
  A03 — ST02 Trần Hồng Ngọc, Sự kiện, 17 Nov 10:10, Shortlisted.
  A04 — ST03 Lê Bảo Trâm, Thiết kế, 18 Nov 12:40, Shortlisted.
  A05 — ST04 Phạm Quốc Bảo, Nội dung, 19 Nov 20:15, Shortlisted.
  A06 — ST05 Võ Hoàng Long, Thiết kế, 16 Nov 11:21, Rejected.
  A07 — ST06 Đặng Thanh Tuyền, Sự kiện, 18 Nov 09:30, Rejected.
  A08 — ST07 Bùi Nhật Khánh, Truyền thông, 20 Nov 22:05, Rejected.
- Counters phải là 8 applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending. A01/A02 phải là hai hồ sơ và quyết định riêng.
- Có danh sách hồ sơ dễ đọc, search/filter/sort/pagination/export affordances được gắn nhãn, và vùng chi tiết với trạng thái quyết định, motivation, mốc review, CV preview trung thực và ghi chú mẫu. Không tuyên bố chức năng tĩnh là chức năng backend đang chạy.
- Kiểm tra các liên kết “Review application” có giúp người dùng tới đúng chi tiết trong giao diện không-JS. Sửa nếu có vấn đề mà không thêm JavaScript hay liên kết giả.
- Có back link tương đối tới index.html và link tiếp tục tới schedule.html, chỉ chuyển A01–A05. Ghi nhận rằng đích còn phải kiểm tra sau khi Huy/Phúc tích hợp các trang.
- Không có nhãn xác minh sinh viên giả; ghi rõ ghi chú Executive chỉ là mẫu và trang không thực thi phân quyền.
- Responsive mobile-first ở 360, 768, 1280px; không scroll ngang, cắt nội dung, chồng lấp hoặc fixed drawer; tên dài phải tự xuống dòng; link/button độc lập đạt tối thiểu 44px ở mobile; body text tối thiểu 16px.
- HTML semantic: doctype, lang, charset, viewport, landmarks, đúng một h1, thứ tự heading hợp lệ, label nhìn thấy và liên kết nội bộ có đích thật.
- Không dùng overflow-x:hidden hoặc !important.

QA VÀ BẰNG CHỨNG
Chạy các kiểm tra cần thiết để đánh giá điều kiện “ready for merge”, vì đây là yêu cầu của người dùng. Không tạo test giả và không ghi PASS nếu chưa chạy thật.

1. Mở trang trực tiếp/offline, JavaScript tắt; kiểm tra 360, 768, 1280. Ghi lại clientWidth, scrollWidth, overflow và vấn đề nhìn thấy.
2. Chạy W3C Nu validator cho review.html và lưu/kê khai kết quả thực tế. Nếu validator hoặc mạng không khả dụng, ghi rõ là chưa xác minh.
3. Kiểm tra labels, landmarks, heading order, keyboard focus, disclosure, contrast và tất cả đường dẫn. Kiểm tra DevTools Accessibility nếu môi trường hỗ trợ; nếu không, ghi giới hạn.
4. Ghi các lỗi thực sự gặp, cách xử lý, giới hạn còn lại và các kiểm tra đã chạy vào docs/ai-logs/hoc.md. Không sửa root brief.md; giữ prompt thật trong docs/ai-prompts/hoc.md.
5. Chỉ sửa lỗi thuộc phạm vi Học. Sau sửa, chạy lại các kiểm tra bị ảnh hưởng và tổng hợp diff chính xác.

GIT VÀ HANDOFF
Khi QA đã đạt:
- Kiểm tra lại git status và diff, chỉ stage bốn file thuộc phạm vi Học.
- Không đổi branch. Trước Git mutation, đồng bộ metadata của chat hiện tại bằng helper theo AGENTS.md, dùng cwd/root thực tế đã xác minh; không trỏ helper sang chat khác.
- Tạo commit rõ ràng cho HOC-01 với authorship Git thật. Push chỉ lên `pa2/hoc-review`, không push main; không force-push.
- Nếu commit/push bị chặn hoặc remote chưa sẵn sàng, không tìm cách lách quyền. Giữ thay đổi an toàn và báo chính xác phần handoff còn thiếu.

KẾT THÚC
Báo cáo:
- trạng thái ready/not ready và lý do;
- file đã sửa;
- kết quả thật của từng QA check, gồm những gì chưa kiểm tra được;
- commit/branch/remote nếu đã tạo và push thành công;
- giới hạn còn lại để Huy tích hợp.

Không merge. Huy là người review và merge nhánh.
```

##### Task 2 follow-up evidence (condensed)

The user later supplied nine QA screenshots across three follow-ups and
confirmed the requested checks passed. The images show Nu vnu 26.11.5 reporting
no errors/warnings for `review.html`; `clientWidth`/`scrollWidth` 360/360,
768/768, 1200/1200 and 1280/1280 with overflow false; computed search name
`Search applications` / role `searchbox`; and h1 name `Application Review` /
role `heading` / level 1. The user also reported JavaScript-off, keyboard and
disclosure checks passed, and then confirmed the remaining checks were done.
These are user-provided results, not checks performed by the assistant.

Attached evidence filenames: `codex-clipboard-930bb04e-1c00-4aab-a03b-02b42194fdb0.png`,
`codex-clipboard-68ed486c-dfa9-4621-bc2f-13dac97a2a8a.png`,
`codex-clipboard-440f3edf-5271-4d02-80ff-9e7e7226e8ad.png`,
`codex-clipboard-07bd6315-0ac9-424a-84a6-e8d2eb74c711.png`,
`codex-clipboard-ac0b4cb7-6c9b-4da3-960b-51f63a417bfc.png`,
`codex-clipboard-cf0d6aa7-8b1f-41af-9c2f-a26220f7585d.png`,
`codex-clipboard-9be796b6-2089-422d-b38f-f283b0656233.png`,
`codex-clipboard-3181ae0b-aa49-4a67-8064-764d7259b879.png`,
`codex-clipboard-7f329158-43f4-4ca0-9b26-abe441c4648e.png`.

##### Huy review feedback (Task 2)

The user supplied a screenshot with this review note: `Review PR #2 — Hoc: bổ sung ô ghi chú và control Shortlist/Reject; bổ sung CV preview đọc được bằng HTML.` The user asked to apply the feedback.

##### Final screenshot and handoff (Task 2)

Actual user prompt: `Rồi á, rename cho đúng format. Đánh giá lần cuối. Nếu ổn theo tiêu chí và ổn các phần tôi đã nói ổn thì commit, push và PR đi`

## Available recorded prompts — Phúc — initial task 08 Nov; review fix 09 Nov

### Phúc - actual assistant prompts

Date: 2026-11-08 (Asia/Saigon). Exact send times were not recorded.
Tool: Claude Code (VS Code extension), model Claude Sonnet 5.5 (`claude-sonnet-5-5`).
Branch: `pa2/phuc-schedule`. Task: PHUC-01 (Interview Scheduling) only.

PROMPT 00 and PROMPT 04 from `brief.md` were **not** sent in this interaction. The
prompts below are the messages that were actually sent, in order. Messages are in
Vietnamese; each is followed by an English gloss. The repository rules file
`AGENTS.md` was loaded automatically by the tool as project instructions.

#### 1. First message - read the repo and list the work

Sent text (Vietnamese, with the course text pasted in; the long pasted assignment
text and rubric are abbreviated here with `[...]` and were not reworded):

```text
Bạn đọc repo hiện tại đi, tôi là Trần Hoàng PHúc, bạn xem coi có những việc gì cần phải làm, hình nhưu phải tạo 1 branch riêng để làm phần công việc của tôi đó. cần viếc AI-log,... các thứ

Này yêu cầu của thầy tôi, tôi gửi bạn xem sơ bộ để nắm thôi, trong repo có vẻ đã đầy đủ rồi, chỉ cần follow theo thôi "Project milestone, teams of up to 3 (your PA#1 team), 3% of the course, 100 points. [...]"

rubric của thầy tôi "[pasted official PA#2 rubric text: what you build, what you hand in, the seven scored criteria, submission and honesty adjustment]"
```

Gloss: read the repo, work out what must be done, I need my own branch, an AI-log and
the other deliverables; the lecturer's assignment text and the PA#2 rubric were
pasted for background.

Sources accessible: `AGENTS.md`, `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`, `brief.md`,
`docs/SHARED_CSS_CONTRACT.md`, Huy's logs. The two official PDFs and the Google Docs
business description were not available to the assistant; their content was only
known through the pasted rubric text and the Source of Truth.

#### 2. Second message - do all the work

```text
đây là môn sử dụng ai agent để coding, tôi cần bạn làm toàn bộ việc cho tôi luôn, bạn dùng playwright hay gì đó chụp screenshot giúp tôi luôn, nói chung làm hết việc giúp tôi, đầy đủ đúng quy trình commit đầy đủ, để tác giả là tôi nhé,
```

Gloss: this course is about using an AI agent to code; do the whole task, use
Playwright or similar for screenshots, follow the full commit process, author is me.

#### 3. Third message - git identity

```text
không cần phải chỉnh git config tên user gì đâu nha, để yên là được
```

Gloss: do not change the git user name/email configuration; leave it as it is.
The commits therefore use the already configured identity on this machine.

Assistant output: see [the actual task log](docs/ai-logs/phuc.md).

#### 4. Fourth message - AI-log format

Pasted the course's `AI-LOG.md` template (how to use, five rules, entry format, a filled
example, what a weak log looks like; text not reproduced here) with:

```text
AI log viết follow như này nè, ngắn gọn thôi
```

Gloss: write the AI log in this short format.

#### 5. Fifth message - push

```text
ok vậy giờ bạn commit push đi
```

Gloss: ok, commit and push now.

#### 6. Sixth message - Huy's review feedback

Sent with two screenshots (VS Code showing Huy's Codex summary of "Request changes" on
PRs #2 and #3; GitHub branch page showing `claude` as a co-author):

```text
Huy feedback nè, bạn xem thử coi sai gì vậy, và sửa lại giúp tôi, chỉnh AI log nếu cần, đồng thời sao trên repo lại có claude, tôi muosn để tác giả là tôi thôi, đè lên lại đi.
```

Gloss: here is Huy's feedback; find what is wrong and fix it, update the AI log if
needed, and I want only me as author (not Claude) — overwrite the branch.

Short status/clarification questions between these messages (what is left to do,
screenshots, where evidence is stored) are not reproduced.

## Huy — subsequent review and integration requests

Tool: Codex in this workspace. Exact send times were not retained. The messages below are quoted from the available user conversation in their order; they are not copies of an unused template. The earlier review request preceded the 09 Nov merge and final evidence work. Prompt text is preserved in Vietnamese; the English labels describe its purpose. These are task-relevant excerpts, not a claim to reproduce every status exchange or IDE context block.

### Review both PRs and show the findings before posting

```text
Bạn review cho tôi đi. Sau đó cho tôi xem để tôi duyệt cái review đó.
```

### Accept four findings and request evidence inspection

```text
Tôi duyệt 4 điểm review đó. Tôi đã gửi 2 file review.html và schedule.html vào để check rồi, bằng chứng có trong checks ấy, bạn xem thử nhé. Giờ làm gì tiếp?
```

### Rename the supplied evidence

```text
À bạn nhớ đổi tên lại 2 file cái trong folder checks nhé.
```

### Authorize the two GitHub request-changes reviews

```text
Bạn làm giúp tôi 2 cái request changes đó đi.
```

### Review revised PRs

```text
OK. Tôi thấy Phúc và Học đã sửa rồi á. Bạn review đi, xem OK chưa?
```

### Fix the review footer after Huy merged and pulled

```text
Tôi pull về rồi, bạn sửa cái đoạn footer đó đi.
```

### Inspect the refreshed post-footer validator evidence

```text
Ok. Tôi cập nhật bằng chứng rồi nhé. Giờ làm gì tiếp?
```

### Complete final evidence and submission documents

```text
Tôi đã push lên main ở Bước 1 rồi, giờ Bước 2 và Bước 3 bạn làm cho tôi đi.
```

At this point Step 2 meant final screenshots, PNG/TXT validator evidence and QA consolidation; Step 3 meant the English PROTOTYPE, AI-LOG and self-assessment documents plus actual-prompt reconciliation. It did not authorize an assistant commit, push, merge or submission ZIP. This clarification describes the already supplied task context, not additional text supposedly inside the quoted prompt.

### Ask for step-by-step DevTools instructions

```text
1. Mục DevTools Accessibility và Color Picker đó là làm gì vậy? Hướng dẫn chi tiết, step-by-step.
```

### Ask the assistant to perform the DevTools inspection

```text
Tại sao bạn không làm cái mục này hộ tôi
```

The assistant then operated the actual DevTools frontend and recorded its observations. These are the actual follow-up messages; no user-performed panel clicks are inferred from them.

### Ask whether the work can reach full marks

```text
Không làm nó lên 100/100 điểm được à?
```

The assistant rechecked the rubric and existing evidence, removed unsupported precautionary deductions and requested complete original conversations for the remaining prompt-provenance gaps. No full-credit result or reconstructed message was invented.

### Clarify whether the missing original conversations are available

The assistant asked whether Học and Phúc still held the original conversations for the portions abbreviated or summarized in this file. Huy's recorded answer through the clarification tool was:

```text
Không còn bản đầy đủ
```

This confirms the source-availability limit. It does not supply the omitted prompt text.

### Approve 98/100 and authorize commit, push and submission ZIP

```text
Ok. Nhóm tôi thống nhất 98/100 điểm, bạn commit và push lên github cho tôi và đóng ZIP cho tôi những thứ cần nộp luôn nhé
```

This request authorizes committing/pushing the final artifacts on Huy's `main` and creating/verifying the submission ZIP with `.git`. It does not authorize student-account submission on Classroom.

The user then asked the assistant to continue:

```text
Tiếp tục
```

## Reference appendix — original prompt library, not usage evidence

The following library was prepared before implementation and is retained as reference. Its presence proves no prompt was sent. Some templates match actual quotations above; others, explicitly including Phúc's PROMPT 04, were not sent as written. Unused placeholders in this appendix are template syntax, not unfinished actual-message records or QA evidence. The old empty-entry form has been removed.

#### A. Approved prompt library — use in this order

**Repository setup clarification (v1.3, team decision):** This project starts in a **brand-new, dedicated ClubFlow PA#2 repository** created by Huy. ClubFlow originates from the selected PA#1 proposal of another team; our PA#1 source/screens are not inherited. The course rubric says the same **team membership** continues, but does not explicitly mandate retaining the old PA#1 repository. The starter prompt pack is a draft until actually sent; only exact sent prompts count as rubric evidence. Huy initializes `main` with the rules file first, then creates shared CSS before the three page branches.

##### PROMPT 00 — COMMON TEAM CONTRACT (send before each person's implementation prompt)

**Who sends:** Huy, Học and Phúc, each to their own coding assistant.  
**Suggested attachments/context:** `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md`, `AGENTS.md`, `PA2-rubric-responsive-prototype.pdf`, `ClubFlow-final-project-brief.pdf`; optional ClubFlow business description v1.1.  
**Instruction:** send the following prompt *as written*, or edit it to match actual repository decisions and record the actual sent version.

```text
You are helping our CSC13008 PA#2 team build ClubFlow, a three-screen responsive recruitment-management prototype. ClubFlow was selected from ANOTHER team's PA#1 as the common final project; our prior PA#1 screens and repository are NOT a starting codebase. Huy creates a NEW ClubFlow PA#2 repository with new Git history, a first rules-file commit and shared CSS baseline before branching; do not clone or migrate PA#1 source or history. Before editing code, read the attached PA#2 rubric, ClubFlow final project brief, PA2_CLUBFLOW_SOURCE_OF_TRUTH.md, and AGENTS.md if accessible. If any source cannot be read, say so; do not pretend it was reviewed. Treat the grading rubric as the authority for deliverables and browser checks, the final project brief as the authority for the three screens and its eight Fix these problems, and the business description v1.1 as supporting business detail. If these disagree, surface the issue instead of guessing.

TEAM AND OWNERSHIP
- 24127177 — Thái Quang Huy: repository setup, rules, shared CSS, Screen 1 on pa2/huy-campaign, and sole reviewer/merger of every feature branch into main.
- 24127044 — Lê Nguyễn Quốc Học: Screen 2 only on pa2/hoc-review.
- 24127505 — Trần Hoàng Phúc: Screen 3 only on pa2/phuc-schedule.
- Exactly one screen implementation task per feature branch; no one except Huy merges/pushes to main. Do not touch another member's HTML/CSS or shared css/styles.css from a feature branch.

STACK AND RUNTIME
- STATIC semantic HTML5 + plain CSS3; no React for this PA#2 team plan, no new dependencies, no build step, no Tailwind CDN script, no remote assets, fonts or CDN. Use system fonts.
- All essential application content, sample records, states and controls must be present in HTML and visible when JavaScript is DISABLED. Do not render essential content with JS. Do not use a JS-based router or onclick for navigation.
- Entry point index.html. Other screens: review.html and schedule.html. Use file-relative anchors such as href="review.html", not /review.html, review/, href="#" or invented files. All in-flow links and form actions must lead to files that really exist. Use a link for navigation and a button for an action. A button cannot masquerade as a working backend operation.
- All three HTML pages load css/styles.css first and their own page CSS second: css/campaign.css, css/review.css or css/schedule.css. Reuse the shared tokens. Never add a second CSS framework.

RESPONSIVE / DESIGN
- Mobile-first at 360px, 768px and 1280px. Use fluid grids, minmax(0,1fr), wrapping and safe word breaking; no fixed page widths, no horizontal scroll, no clipped or overlapping content. Do NOT use overflow-x:hidden to conceal broken layout. A table may scroll within its own deliberate table wrapper only.
- Every independent link and button is at least 44px high at 360px; ordinary inline links are exempt. Body text is at least 16px. Body text and button text contrast is at least 4.5:1. Use a consistent spacing scale of 4/8/12/16/24/32px. No !important in custom CSS.
- At least one long Vietnamese applicant name/title must wrap naturally. Give each page one clear primary visual focus.

SEMANTIC / ACCESSIBILITY
- Include <!DOCTYPE html>, lang="vi" or the actual UI language, meta charset="UTF-8" and meta name="viewport" content="width=device-width, initial-scale=1".
- Correct header/nav/main/footer landmarks, exactly one h1 per page, no skipped heading level, visible associated labels for all inputs, real accessible buttons/links, semantic lists/tables/headings, alt attributes on images (or alt="" for decoration), and appropriate names for icon-only controls.
- The W3C Nu validator must report ZERO HTML ERRORS for all three final pages. Accessibility must be inspected in browser, not assumed from valid HTML.

CANONICAL CAMPAIGN / BUSINESS FIXTURE (sample data, not a requirement of the professor)
- Campaign CF-2026-01: "Tuyển thành viên CLB Sáng tạo 2026", host "CLB Sáng tạo Sinh viên".
- Opens 2026-11-15 08:00; closes 2026-11-20 23:59; CV review 2026-11-21 to 2026-11-22; interview on 2026-11-24, 09:00-12:00, 20-minute common slots, Rooms A/B/C.
- Departments/positions/quotas: Nội dung / Biên tập nội dung / 3; Truyền thông / Truyền thông số / 2; Sự kiện / Điều phối sự kiện / 2; Thiết kế / Thiết kế truyền thông / 2.
- 8 application records, 7 distinct students. A01 and A02 are two independent applications for different positions made by the same student, ST01 Nguyễn Thị Minh Anh Phương Thảo.
- Application statuses: A01-A05 Shortlisted; A06-A08 Rejected; 0 Pending. Counters: 8 total applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending.
- Only A01-A05 are eligible for scheduling. Draft statuses must be exactly 2 Proposed, 2 Conflict, 1 Unassigned = 5. A01 and A03 both conflict because interviewer I01 is assigned to both at 09:00-09:20. A02 belongs to the same applicant as A01 but starts at 09:20, so it does not overlap. A05 is Unassigned because the applicant is available 11:00-12:00 while qualified interviewer I01 is initially available 09:00-10:00.
- Shortlisted means CV screening passed, not final admission; Proposed means draft, not confirmed. No schedule confirmation with conflict/unassigned. Confirmation is NOT announcement of recruitment results.
- The three screens are successive illustrative stages, not a live backend. Moving from index to review does NOT itself create applicants or approve CVs.

AVOID THE EIGHT OFFICIAL FIX THESE PROBLEMS
1. Contradictory dates across three screens.
2. Wrong Screen 2 title (must be Application Review).
3. Candidate details/drawer covering most of the list.
4. Scheduling counters not adding up to the scheduling records.
5. False conflict badges without real people/time/room overlap.
6. Using the same sample person as applicant and interviewer.
7. False claims of student/attachment verification outside scope.
8. Generic template footer such as outdated copyright, Privacy Policy, Terms of Service or Support Center.

STATIC-PROTOTYPE HONESTY
- Include the features and meaningful controls/states expected in the three screens, using usable native-HTML interactions where feasible (for example details/summary), but never claim persistent saving, automatic filtering, publication, schedule-generation, CSV export, validation across fields or backend authorization is implemented if it is merely illustrated.
- Do not add buttons that link to nonexistent resources, make empty href links, or simulate a successful confirmation while conflicts exist. Clearly document unimplemented actions and out-of-flow controls in PROTOTYPE.md, rather than suggesting they really work.

HOW DONE WILL BE VERIFIED
1. Open each HTML file directly from the folder, offline, with JavaScript disabled.
2. At each width 360, 768, 1280 run document.documentElement.scrollWidth > document.documentElement.clientWidth; it must be false. Check clientWidth is exactly the selected width, and that right-overflow elements list is empty (except deliberate table wrappers).
3. Visually inspect all nine page/width combinations, the 44px tap targets, headings, labels and the long name.
4. Use the W3C Nu validator File upload on EACH HTML file and save evidence, requiring 0 errors.
5. Inspect DevTools Accessibility and color contrast; verify main-flow links and all referenced assets.
6. Preserve actual prompts, decisions, test observations, Git authors and commits. Do not say a check passed unless it really ran.

Respond initially with: (a) a short requirement-to-element mapping; (b) files you propose to change; (c) assumptions/unimplemented behavior. Then implement only the specified task. After implementation show a precise diff summary and a manual verification plan. Never invent test results or tool calls you did not perform.
```

##### PROMPT 01 — HUY: REPOSITORY SETUP AND SHARED DESIGN SYSTEM (on `main`, before branching)

**Who sends:** Thái Quang Huy only.  
**Where:** New, empty ClubFlow PA#2 repository created by Huy; first commit has `AGENTS.md`/`brief.md`/Source of Truth on `main`, then shared CSS before branching.  
**This is a foundation/setup activity, NOT a fourth feature branch or a second screen task.**

```text
I am Thái Quang Huy (24127177), responsible for repository setup, integration and all merges. ClubFlow is the CLASSWIDE final project selected from ANOTHER team's PA#1 proposal. Our team's old PA#1 project/repository is NOT the source for these screens. I will create a BRAND-NEW, EMPTY GitHub repository for ClubFlow PA#2, initialize a NEW .git history and maintain main. The team membership stays the same as PA#1 unless the lecturer has authorized a change. Read the COMMON TEAM CONTRACT, AGENTS.md and the updated Source of Truth v1.3.

Task: establish a reliable static HTML/CSS shared foundation BEFORE creating the three independent feature branches. Do not clone, migrate or reuse our old PA#1 repository, and do not copy the winning team's PA#1 source code. First verify the new repository's first commit contains the rules file; then work on main only after I confirm the working tree is clean. Do NOT fabricate any Git commands' results.

Files to prepare/review:
- AGENTS.md: project rules/never-list for the assistants, stack, shared tokens, file ownership, review criteria.
- brief.md and PA2_CLUBFLOW_SOURCE_OF_TRUTH.md: preserve the supplied content; do not pretend template prompts were sent.
- css/styles.css: provide design tokens and baseline utility/components only, including spacing scale 4/8/12/16/24/32px, legible colors, system fonts, 16px minimum body text, 44px independent link/button targets, keyboard focus styles, fluid containers, responsive utilities, min-width:0 for grid children, and overflow-safe text. No !important, no fixed page width, no overflow-x:hidden to hide defects.
- Safe .gitignore only if needed; exclude node_modules and secrets, but never ignore required screenshots/checks/docs. The final ZIP must preserve the NEW repository's .git directory and full history.

Strict ownership contract: all feature pages will load css/styles.css then a separate page CSS. Huy's screen will own index.html + css/campaign.css; Học owns review.html + css/review.css; Phúc owns schedule.html + css/schedule.css. Do not create or implement any screen at this setup stage. Do not introduce npm, external fonts, JS dependencies or a framework.

Output: a file-level plan; exact shared CSS design contract listing tokens/class names all three page owners can reuse; changes/diff summary; checks that can be performed without claiming unrun W3C or browser tests. Suggest meaningful Git commit boundaries: rules/brief first, shared styles second. Do not run git push, git reset or git merge without my explicit instruction.
```

##### PROMPT 02 — HUY-01: CREATE RECRUITMENT CAMPAIGN (branch `pa2/huy-campaign`)

**Who sends:** Thái Quang Huy.  
**Allowed feature files:** `index.html`, `css/campaign.css`, Huy's own prompt/AI logs.  
**Do not modify:** `review.html`, `schedule.html`, `css/styles.css`, root docs, or other person's file.

```text
I am Huy implementing ONLY TASK HUY-01 (Create Recruitment Campaign) on pa2/huy-campaign. Use the COMMON TEAM CONTRACT, the rubric and final brief. Do not modify files outside index.html, css/campaign.css or my own per-branch prompt/AI logs. Read and reuse the existing css/styles.css tokens, but do NOT edit that shared file.

Build a polished, coherent, mobile-first static page for a signed-in Club Executive managing the campaign CF-2026-01. It must be page 1 and use real file-relative navigation to review.html. Include:
- Correct document title, semantic landmarks, one h1, a visible step indicator for the 3-screen main flow, and a strong primary action hierarchy.
- Campaign name "Tuyển thành viên CLB Sáng tạo 2026", host "CLB Sáng tạo Sinh viên", useful descriptive copy, opening 2026-11-15 08:00 and closing 2026-11-20 23:59, and realistic application instructions.
- Department and position setup for the FOUR canonical positions (Nội dung/3, Truyền thông/2, Sự kiện/2, Thiết kế/2), with job descriptions and requirements for EACH, and quotas as positive integers. Every input must have a visible associated label.
- An interview availability preview/configuration appropriate to the business reference: interview date 2026-11-24, 09:00-12:00, common slot duration 20 minutes, and available rooms A/B/C; do not imply dynamic room creation.
- Visible Save as Draft, Preview Campaign and Publish Campaign controls or previews. Expose the required-field/date-order/position/quota validation criteria and a clear invalid-input state. Use native HTML required/min/step/date inputs and a no-JS preview via details/summary if appropriate; do not claim business-rule validation or persistence is implemented unless it is.
- A real, accessible main-flow link "Applications" with href="review.html" for navigating to Screen 2. Explain in page copy that sample applications are a later-stage fixture after publication/submissions; navigation does not create them.

HTML must work from file:// with JavaScript disabled. Load css/styles.css THEN css/campaign.css. The long Vietnamese campaign title or position description must wrap at 360px. At 360px stack into one column; at 768/1280 adapt layout without overlap/cutoff. Buttons/standalone links >=44px. No broken routes, fake CV links, lorem ipsum or generic template footer.

Deliver exactly index.html and css/campaign.css; include requirement-to-element mapping, diff summary, and explicit browser/W3C test steps. Identify any native-HTML prototype limitation honestly. Never claim checks passed without running them. Do not push or merge; I will handle Git commands separately.
```

##### PROMPT 03 — HOC-01: APPLICATION REVIEW (branch `pa2/hoc-review`)

**Who sends:** Lê Nguyễn Quốc Học.  
**Allowed feature files:** `review.html`, `css/review.css`, Học's own prompt/AI logs.  
**Do not modify:** `index.html`, `schedule.html`, `css/styles.css`, root docs, other person's files.

```text
I am Lê Nguyễn Quốc Học (24127044), implementing ONLY TASK HOC-01 (Application Review) on pa2/hoc-review. Read the COMMON TEAM CONTRACT, rubric, final brief and the shared stylesheet. Change ONLY review.html, css/review.css, and my own prompt/AI logs. Do not change css/styles.css or either teammate's page. Huy will merge my branch.

Create Screen 2, titled Application Review everywhere it appears (the <title>, h1, app header and navigation). It belongs to the same CF-2026-01 campaign (applications open 15 Nov and close 20 Nov 2026; review 21-22 Nov 2026), shown at the later review stage.

Use EXACTLY the following independent applications (submitted in the campaign window):
A01: ST01 Nguyễn Thị Minh Anh Phương Thảo, Nội dung, 15 Nov 10:15, Shortlisted.
A02: ST01 Nguyễn Thị Minh Anh Phương Thảo, Truyền thông, 15 Nov 10:32, Shortlisted.
A03: ST02 Trần Hồng Ngọc, Sự kiện, 17 Nov 10:10, Shortlisted.
A04: ST03 Lê Bảo Trâm, Thiết kế, 18 Nov 12:40, Shortlisted.
A05: ST04 Phạm Quốc Bảo, Nội dung, 19 Nov 20:15, Shortlisted.
A06: ST05 Võ Hoàng Long, Thiết kế, 16 Nov 11:21, Rejected.
A07: ST06 Đặng Thanh Tuyền, Sự kiện, 18 Nov 09:30, Rejected.
A08: ST07 Bùi Nhật Khánh, Truyền thông, 20 Nov 22:05, Rejected.
Counters: 8 applications, 7 unique applicants, 5 Shortlisted, 3 Rejected, 0 Pending. A01 and A02 MUST remain distinct decisions/records; one student's decisions do not affect the other position.

Features to REPRESENT visibly in the static prototype:
- A readable application list including application ID, applicant, position, submission timestamp, CV-screening status, and a meaningful Review affordance.
- Labeled search and status/position filters; sorting, pagination and a basic CSV export affordance as described in the full ClubFlow brief. If an affordance is not interactive without backend/JS, do NOT pretend it is; note accurately in the Not wired documentation and provide realistic illustrative state.
- A meaningful application detail panel/drawer for a selected application including CV information, a realistic SOP/motivation statement, submission/review milestones, internal Executive-only notes, and Shortlist Candidate and Reject actions/decision states. If you link to a CV, link only to a real file checked into the repo; otherwise clearly represent a non-downloadable CV preview. Native details/summary or in-page anchors with real targets are acceptable for no-JS visibility.
- Explicitly distinguish total application count from unique applicant count, and overall counts from filtered counts.
- A real anchor "Continue to Interview Scheduling" href="schedule.html", referring to ONLY the five shortlisted application IDs; a real back link href="index.html".

Responsive specification: at 1280px list plus detail may be side by side, but at 360px the detail must stack/expand without covering the list. Long name ST01 must wrap rather than widen the page. Avoid any fixed-width drawer, overflow-x:hidden bandaid, inaccessible table, unlabeled controls, invalid HTML or fake student-verification labels.

Load css/styles.css THEN css/review.css. Deliver only review.html, css/review.css and my own logs. Return a requirement-to-element mapping, diff summary, genuine limitations, and an explicit validation checklist. Do not say W3C/Accessibility passed unless actually tested, and do not merge my branch.
```

##### PROMPT 04 — PHUC-01: INTERVIEW SCHEDULING (branch `pa2/phuc-schedule`)

**Who sends:** Trần Hoàng Phúc.  
**Allowed feature files:** `schedule.html`, `css/schedule.css`, Phúc's own prompt/AI logs.  
**Do not modify:** `index.html`, `review.html`, `css/styles.css`, root docs, other person's files.

```text
I am Trần Hoàng Phúc (24127505), implementing ONLY TASK PHUC-01 (Interview Scheduling) on pa2/phuc-schedule. Read the COMMON TEAM CONTRACT, rubric, final brief and shared CSS. Change only schedule.html, css/schedule.css and my own per-branch logs. Huy alone reviews/merges. Do not modify shared styles.css or the other pages.

This is Screen 3 for the SAME ClubFlow campaign CF-2026-01. Application deadline: 2026-11-20 23:59, CV decisions all finished on 2026-11-22, interview date 2026-11-24 only; time window 09:00-12:00; one 20-minute duration for every session. Show the duration options 15/20/30 min as the product allows, but show 20 min as this fixture's chosen value. Rooms A/B/C are pre-existing. The 8 campaign applications include ONLY these five shortlisted IDs eligible for scheduling: A01, A02, A03, A04, A05. Never schedule rejected A06-A08.

Interviewers and qualifications:
I01 Trịnh Ngọc Hà: Nội dung and Sự kiện, initially available 09:00-10:00.
I02 Đỗ Quang Kiên: Truyền thông, available 09:00-10:00.
I03 Lê Thanh Tùng: Thiết kế, available 09:00-10:20.
Applicants' availability:
ST01 (A01 and A02): 09:00-10:00.
ST02 (A03): 09:00-10:00.
ST03 (A04): 09:20-10:20.
ST04 (A05): 11:00-12:00.
Rooms A/B/C available 09:00-12:00.

Display ONE clearly labeled invalid DRAFT schedule with EXACTLY five rows:
A01 | ST01 | 09:00-09:20 | I01 | A | CONFLICT — I01 simultaneous with A03.
A02 | ST01 | 09:20-09:40 | I02 | B | PROPOSED — adjacent to A01, so not overlapping for ST01.
A03 | ST02 | 09:00-09:20 | I01 | B | CONFLICT — I01 simultaneous with A01.
A04 | ST03 | 09:40-10:00 | I03 | A | PROPOSED.
A05 | ST04 | no slot | none | none | UNASSIGNED — ST04 only free at 11:00-12:00, qualified I01 initially free only at 09:00-10:00.
Counters must add to FIVE: Proposed=2, Conflict=2, Unassigned=1. A01 and A03 are both flagged as affected by the real conflict. Do not invent a conflict on A02 (adjacent ST01 sessions are allowed).

Represent the scheduling controls and conditions: choose day/time window/duration, interviewer-to-position assignments, availability and room selection, Generate Draft, Save Changes (draft only), Edit, Resolve, + Assign Slot, Export Timetable, and an Approve & Confirm Schedule gate. For THIS draft, the gate must be BLOCKED and list A01/A03/A05 as needing attention. Display reasons for Unassigned/Conflict; do NOT announce final recruitment Pass/Fail here.

Optional separated explanatory illustration AFTER resolution (never intermixed with draft): move A03 to 09:40-10:00 with I01 in Room B; additionally make I01 available 11:00-12:00 and give A05 11:00-11:20 Room A; keep other rows as above. Only after application closing + 8/8 decisions + 5 valid distinct assignments and 0 conflicts/unassigned may the alternate state be Confirmed and read-only. Clearly label it as a different illustrative state. If native HTML cannot implement scheduling/persistence, disclose this honestly.

Page structure: correct title/h1, semantic header/nav/main/footer, accessible controls/labels, native HTML content readable without JS, clear visually prioritized conflict resolution area, no fixed page width, no overlap at 360/768/1280, 44px independent tap targets. Load css/styles.css THEN css/schedule.css. Include real href="review.html" back link and other real in-flow links only. No fake routes or outdated footer.

Deliver only schedule.html, css/schedule.css and my own logs. Return requirement mapping, evidence-needed checklist, diff summary, and known limitations. Do not assert browser/W3C success if unrun and do not merge anything.
```

##### PROMPT 05 — HUY: INTEGRATION AND CROSS-SCREEN REVIEW (after receiving all branches)

**Who sends:** Huy after reading each branch's diff and handoff.  
**Important:** the assistant can review and suggest changes; only Huy actually runs the merges and verifies the result.

```text
I am Huy, the sole integrator. The branches pa2/huy-campaign, pa2/hoc-review and pa2/phuc-schedule have been pushed. I will perform and verify the actual merges myself. Help REVIEW, not guess or invent command results.

Compare each branch's changed-file list against its ownership contract; examine the real git diff/commits I supply. Flag unauthorized edits, inconsistent campaign timeline, broken relative links, wrong stylesheets, missing controls, invalid or misleading mock behavior, accessibility risks, and violations of any of the eight Fix these items. Confirm whether all three pages display the exact shared fixture: one campaign, 8 applications/7 distinct students, 5 shortlisted, draft scheduling 2 Proposed + 2 Conflict + 1 Unassigned, A01 and A03 sharing I01 at 09:00-09:20. Inspect Huy/Học/Phúc commit authors and messages, without proposing a history rewrite.

Give me (1) blockers before merge, (2) suggested fixes by owner and file, (3) a safe merge order using git merge --no-ff with no squash or force push, (4) tests to run on integrated main. Never report that a branch merged or a test passed unless I provide actual output showing it.
```

##### PROMPT 06 — SHARED RESPONSIVE / W3C / ACCESSIBILITY REPAIR (send only for a real observed failure)

**Who sends:** the person responsible for the observed issue; Huy coordinates any shared-CSS fix.  
**Instruction:** replace each `[ACTUAL ...]` placeholder using a real test observation; never fabricate the test result.

```text
We observed a REAL bug while testing ClubFlow:
- Page and current branch: [ACTUAL PAGE AND BRANCH]
- Viewport: [360, 768, or 1280 pixels]
- JavaScript state: disabled (static grading mode)
- Actual failed check and output: [PASTE CONSOLE RESULT, W3C ERROR, ACCESSIBILITY ISSUE OR SCREENSHOT DESCRIPTION]
- Expected result from the rubric: [EXACT EXPECTED CONDITION]

Find the smallest root-cause correction. Preserve the shared CSS scale, semantic HTML and existing navigation. Do not introduce new dependencies, fixed page widths, !important or overflow-x:hidden to hide the bug. Change ONLY the owning page HTML/CSS unless Huy has explicitly approved a common-CSS change on main. Show the exact edited selectors/elements and explain why they fix the observed issue; give a targeted retest plan. Do NOT claim the fix was verified until we rerun the same check.
```

##### PROMPT 07 — HUY: FINAL RELEASE AUDIT (after merge and evidence collection)

**Who sends:** Huy once all three pages exist on main.  
**Instruction:** supply the real files and checks; assistant must report missing evidence, not invent it.

```text
Act as an adversarial reviewer of our PA#2 submission, using the attached official rubric and ClubFlow brief. I am Huy and have merged all three feature branches into main. Analyze the current repository and actual QA evidence; do not infer passing results from intentions or screenshots alone.

Audit each of the seven rubric criteria and all eight Fix these issues. Confirm these required artifacts exist and are accurate: three HTML pages; four local CSS files (shared plus one page CSS each); the root rules file; PROTOTYPE.md with six required sections; brief.md containing prompts actually sent; AI-LOG.md with genuine per-task entries and verifiable Changed/Rejected evidence; checks/ with three current zero-error W3C results; screenshots/ with nine full-page images at 360, 768, 1280px with JS disabled; SELF_ASSESSMENT_REPORT.md with seven evidence-backed criterion rows; and meaningful Git history with original authors and all three merges.

Check that three HTML pages can be opened from the extracted directory without a server, that main-flow links are relative and point to existing files, and no external runtime resources are needed. The draft with two conflicts and one unassigned must not pretend to be confirmed. Verify filenames and submission format 24127044-24127177-24127505_<ACTUAL_SELF_SCORE>.zip and preserve .git while excluding node_modules and secrets.

Return a strict PASS / FAIL / NOT VERIFIED table for each criterion. Quote concrete file paths/lines/evidence. List blocking fixes and do not suggest claiming 100/100 without proof. The actual self-score must reflect real checks, not this prompt's intent.
```
