# Học — actual assistant prompts

Date: 2026-11-08 (Asia/Saigon). Exact send time was not recorded.
Tool: Codex in the local workspace; model/version not independently recorded.
Branch: `pa2/hoc-review`. Task: HOC-01 only.

## 1. HOC-01 Application Review — actually sent

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

## 2. HOC-01 continuation QA and handoff — actually sent

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

### Task 2 follow-up evidence (condensed)

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
