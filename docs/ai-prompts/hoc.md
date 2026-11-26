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

### Huy review feedback (Task 2)

The user supplied a screenshot with this review note: `Review PR #2 — Hoc: bổ sung ô ghi chú và control Shortlist/Reject; bổ sung CV preview đọc được bằng HTML.` The user asked to apply the feedback.

### Final screenshot and handoff (Task 2)

Actual user prompt: `Rồi á, rename cho đúng format. Đánh giá lần cuối. Nếu ổn theo tiêu chí và ổn các phần tôi đã nói ổn thì commit, push và PR đi`

## PA#3

### A1 · C5 Applicant Submission

- Owner: Lê Nguyễn Quốc Học (24127044)
- Tool: Codex
- Date: 2026-11-24 (Asia/Ho_Chi_Minh). Exact send times unknown.
- Implementation branch: `pa3/hoc-applications`
- Invoked source: `brief.md`, A1 at commit `521f3a9cc83e302ac796680bb5feb7b464bed024`,
  blob `9ca5a5312b3cb14856ee8d487062008b6d6c4d32`.
- Execution evidence: [A1 log](../ai-logs/hoc.md#pa3).

#### Actual invocation

```text
Thực hiện A1 · C5 — Applicant Submission trong brief.md của ClubFlow PA#3. Owner là Lê Nguyễn Quốc Học (24127044). Dừng sau A1 để Học review.\

1\. Kiểm tra trước khi sửa\

Xác minh đúng repo ClubFlow, worktree sạch, nhánh pa3/hoc-applications và HEAD đúng SHA nền 521f3a9. Nếu sai, báo trạng thái thực tế và dừng trước khi sửa.\

Đọc AGENTS.md, PA3_PLAN.md mục C5, brief.md mục A1, hợp đồng GET /api/campaign trong docs/api/02-campaign.md và POST /api/applications trong docs/api/04-applications.md. Kiểm tra route và các export thực tế trong router.jsx, auth.jsx, api.js, ui.jsx và features/applications/index.jsx. Đọc rubric và final brief nếu có trong workspace, ghi rõ tài liệu nào thiếu.\

2\. Phạm vi chỉnh sửa\

Chỉ sửa client/src/features/applications/\*\*, docs/ai-prompts/hoc.md và docs/ai-logs/hoc.md. Giữ các export mà router đang dùng. Dùng React, CSS theo phạm vi feature và các tiện ích chung có sẵn. Giữ nguyên router, auth, API client, mock, hợp đồng API, dependencies và tài liệu gốc. Nếu thiếu phần dùng chung, ghi file hoặc API liên quan, tác động và cách tái hiện để Huy xử lý.\

3\. Triển khai ApplyPage tại /apply/:positionId\

\- Đọc vị trí, trạng thái nhận hồ sơ, profile và availabilityWindows từ GET /api/campaign với phiên Applicant. Điền sẵn năm trường. Họ tên, MSSV và khoa chỉ đọc. Email và điện thoại chỉnh được cho từng hồ sơ.\
\- Hiển thị các khung giờ API cung cấp và yêu cầu ít nhất ba ID khác nhau. Kiểm tra email, điện thoại, motivation không rỗng và tối đa 300 từ theo cách đếm trong hợp đồng. CV phải là PDF không rỗng, đúng đuôi, MIME và chữ ký %PDF-, tối đa 5.242.880 byte.\
\- Gọi POST /api/applications qua apiRequest và FormData. Gửi positionId, phone, email, motivation, cv và lặp availabilityWindowIds theo từng lựa chọn. Để trình duyệt đặt multipart boundary. Chỉ gửi các trường được liệt kê trong hợp đồng upload.\
\- Khi API trả created:false, mở /me/applications/:id bằng ID hồ sơ API trả về. Chặn hai lần gửi đồng thời. Hiển thị lỗi API cạnh trường tương ứng và giữ dữ liệu khi gửi thất bại, kể cả khi chiến dịch đóng sau lúc mở form.\
\- Xử lý loading, lỗi tải có Retry, vị trí không hợp lệ, chiến dịch chưa mở hoặc đã đóng và trường hợp thiếu khung giờ. Dùng label rõ ràng, nhóm lựa chọn có tên, thao tác được bằng bàn phím và hiển thị lỗi dễ tìm.\

4\. Kiểm thử và bàn giao\

\- Dùng mock và demo accounts trong FRONTEND.md. Trên luồng tạo chiến dịch từ trạng thái sạch, dùng Student A nộp Content rồi Communications. Kiểm tra hai ID riêng, đổi số điện thoại ở hồ sơ thứ hai và xác minh hồ sơ đầu cùng profile giữ số cũ. Nộp trùng một vị trí và xác minh mở đúng ID cũ.\
\- Kiểm tra hai so với ba khung giờ hợp lệ, khung không hợp lệ, PDF đúng giới hạn và vượt một byte, file không phải PDF, 300 và 301 từ, bấm gửi hai lần và quyền Applicant. Mở form khi còn hạn, cho Executive chuyển đồng hồ mock qua hạn rồi gửi từ phiên Applicant. Kiểm tra dữ liệu đã nhập còn nguyên.\
\- Chạy build và kiểm tra route ở 360, 768 và 1280 px. Ghi rõ lệnh, kết quả và mục chưa xác minh. Ghi nguyên văn prompt thực tế và revision của brief.md vào docs/ai-prompts/hoc.md. Ghi Tool, Asked for, Kept, Changed, Rejected và các kiểm tra thực tế vào docs/ai-logs/hoc.md.\
\- Cuối cùng, kiểm tra git status, git diff, git diff --cached và git diff -- docs/api mock. Báo danh sách file sửa, kết quả kiểm thử và việc còn vướng. Dừng ở working diff, không stage, commit, push, merge hoặc bắt đầu A2.
```

#### Actual branch-preparation follow-up

```text
Xác minh đúng repo ClubFlow, worktree sạch và SHA nền 521f3a9 đã có trong repo. Kiểm tra nhánh pa3/hoc-applications ở cả local và origin.\

\- Nếu chưa có nhánh ở cả hai nơi và các điều kiện còn lại đều đạt, tự tạo và chuyển sang nhánh từ đúng SHA nền bằng \`git switch -c pa3/hoc-applications 521f3a9\`. Không dừng để hỏi lại chỉ vì chưa có nhánh.\
\- Nếu nhánh đã có, dùng nhánh hiện có sau khi xác minh nó đúng SHA nền và chưa có thay đổi cần giữ. Nếu nhánh chỉ có trên origin, tạo nhánh local theo dõi nhánh đó sau khi xác minh. Không reset hoặc ghi đè nhánh có sẵn.\
\- Sau khi chuyển nhánh, xác minh lại repo, nhánh và HEAD rồi đồng bộ metadata theo AGENTS.md. Khi các kiểm tra đạt, đọc tài liệu đã liệt kê và triển khai A1 ngay. Dừng nếu sai repo, có thay đổi chưa lưu hoặc SHA không khớp.\

Quyền tạo và chuyển nhánh ở bước này chỉ để chuẩn bị A1. Sau khi triển khai và kiểm thử, dừng ở working diff để Học review. Không stage, commit, push, merge hoặc bắt đầu A2.
```

#### Actual review and commit follow-up

```text
nếu mọi thứ ổn thì commit A1, chuẩn bị làm phàn tiếp theo của Học
```

### A2 · C6 My Applications

- Owner: Lê Nguyễn Quốc Học (24127044)
- Tool: Codex
- Date: 2026-11-24 (Asia/Ho_Chi_Minh). Exact send time unknown.
- Branch and start: `pa3/hoc-applications` at `30bad3d4ca7df1d9839e83981af1bf8211876ec8`.
- Invoked source: `brief.md`, A2 at the starting commit above, last revised
  at `521f3a9cc83e302ac796680bb5feb7b464bed024`, blob `9ca5a5312b3cb14856ee8d487062008b6d6c4d32`.
- Execution evidence: [A2 log](../ai-logs/hoc.md#a2--c6-my-applications-2026-11-24).

#### Actual invocation

```text
Thực hiện A2 · C6 — My Applications trong brief.md của ClubFlow PA#3. Owner là Lê Nguyễn Quốc Học (24127044). Dừng sau A2 để Học review.

1. Xác minh checkpoint

Kiểm tra đúng repo ClubFlow, nhánh pa3/hoc-applications và worktree sạch sau commit A1 đã review. Ghi lại SHA đầu phiên. Nếu A1 vẫn còn trong working diff hoặc chưa có commit, báo trạng thái thực tế và dừng trước khi sửa.

Đọc AGENTS.md, brief.md mục A2, PA3_PLAN.md mục C6/C9/C11 và phần Applicant trong docs/api/04-applications.md. Kiểm tra router, auth, apiRequest và các UI helper hiện có.

2. Triển khai hai màn hình Applicant

- /me/applications — Hoàn thiện MyApplicationsPage. Dùng GET /api/applications để hiển thị tổng số hồ sơ và một mục cho mỗi hồ sơ, có vị trí, trạng thái và link tới trang chi tiết. A01 và A02 phải xuất hiện riêng.
- /me/applications/:id — Hoàn thiện MyApplicationPage. Dùng GET /api/applications/:id để hiển thị hồ sơ tương ứng. Trang phải mở được bằng URL trực tiếp, refresh và quay lại danh sách bằng link hoặc nút Back của trình duyệt.
- Dùng dữ liệu Applicant do API trả về. Hiển thị Submitted cho đến khi kết quả sàng lọc được công bố. Khi API trả Rejected, hiển thị “Rejected at CV screening” và lý do dành cho ứng viên nếu có. Hiển thị giờ và phòng phỏng vấn khi `interview` có giá trị. Hiển thị Pass/Fail của đúng hồ sơ khi `result` có giá trị sau đợt công bố chung toàn chiến dịch.
- Xử lý loading, lỗi có Retry, danh sách rỗng với tổng bằng 0, 403 và 404. Giữ role guard và dùng `apiRequest()` qua cơ chế dùng chung hiện có. Không hiển thị ghi chú nội bộ, đánh giá phỏng vấn hoặc dữ liệu của người khác. Công bố kết quả và thông báo thuộc A4.

3. Giữ phạm vi A2

Chỉ sửa client/src/features/applications/**, docs/ai-prompts/hoc.md và docs/ai-logs/hoc.md. Giữ nguyên hành vi nộp hồ sơ của A1 và các named export của router. Nếu thiếu interface chung hoặc API, báo Huy phần bị ảnh hưởng và cách tái hiện. Không sửa shared code, mock, hợp đồng API hoặc dependencies.

4. Kiểm thử và bàn giao

- Với Student A, mở trực tiếp A01 và A02, refresh, dùng Back và xác minh A03 bị từ chối. Kiểm tra thêm ID không tồn tại.
- Với mock thật, kiểm tra trạng thái trước và sau công bố sàng lọc, trước và sau xác nhận lịch, trước và sau công bố kết quả toàn chiến dịch. Xác minh hai hồ sơ của cùng một người hiển thị đúng hai kết quả riêng. Dùng các API Executive đã có để chuẩn bị trạng thái kiểm thử nếu các màn hình phụ thuộc còn là khung.
- Chạy build. Kiểm tra cả hai route ở 360, 768 và 1280 px, gồm điều hướng bàn phím, tên link rõ ràng và không cuộn ngang. Báo chính xác điều gì đã chạy và điều gì còn thiếu bằng chứng.
- Ghi nguyên văn tin nhắn thực tế và revision của brief.md vào docs/ai-prompts/hoc.md. Ghi các thay đổi và kiểm tra thực tế vào docs/ai-logs/hoc.md.
- Kiểm tra git status, git diff, git diff --cached và git diff -- docs/api mock. Báo file đã sửa, kết quả kiểm thử và vấn đề còn vướng. Để nguyên working diff cho Học review. Không stage, commit, push, merge hay bắt đầu A3.
```

#### Actual commit follow-up

```text
commit A2, chuẩn bin làm A3
```

### A3 · C7 Executive Application Review

- Owner: Lê Nguyễn Quốc Học (24127044)
- Tool: Codex
- Date: 2026-11-24 (Asia/Ho_Chi_Minh). Exact send time unknown.
- Branch and start: `pa3/hoc-applications` at `f5324a9c2306b5f460a46f47644d762513e8df25`.
- Invoked source: `brief.md`, A3 at the starting commit above, last revised
  at `521f3a9cc83e302ac796680bb5feb7b464bed024`, blob `9ca5a5312b3cb14856ee8d487062008b6d6c4d32`.
- Execution evidence: [A3 log](../ai-logs/hoc.md#a3--c7-executive-application-review-2026-11-24).

#### Actual invocation

```text
Thực hiện A3 · C7 — Executive Application Review trong brief.md của ClubFlow PA#3. Owner là Lê Nguyễn Quốc Học (24127044). Dừng sau A3 để Học review.

1. Xác minh đúng repo, nhánh pa3/hoc-applications và worktree sạch sau commit A2 đã review. Ghi lại SHA đầu phiên. Đọc AGENTS.md, brief.md mục A3, PA3_PLAN.md mục C7/C8, hợp đồng Executive trong docs/api/04-applications.md và các interface router, auth, API, UI hiện có.

2. Hoàn thiện ReviewPage tại /executive/applications. Dùng statistics từ API để hiển thị tổng số hồ sơ, số ứng viên duy nhất và số theo trạng thái của toàn chiến dịch. Dùng total riêng cho kết quả đã lọc. Làm tìm kiếm có debounce, hủy request cũ, lọc theo vị trí và trạng thái, sắp xếp và phân trang. Giữ các tham số trên URL khi đóng panel chi tiết.

3. Mở từng hồ sơ theo ID. Giữ danh sách và panel chi tiết dễ đọc bằng bàn phím và trên mobile. Hiển thị motivation và CV đọc được qua apiRequest với xác thực. Xuất CSV toàn bộ kết quả khớp bộ lọc và thứ tự hiện tại, bỏ tham số phân trang khỏi request xuất.

4. Tách hai thao tác lưu và công bố. PATCH /api/applications/:id/screening lưu Shortlisted/Rejected, ghi chú riêng và lý do dành cho ứng viên theo hợp đồng. POST /api/applications/:id/screening/publication công bố bản đã lưu của đúng hồ sơ. Khi lịch đã xác nhận, khóa chỉnh sửa screening; vẫn cho phép công bố review đã lưu theo hợp đồng. Chặn gửi lặp, giữ nội dung khi lỗi và cập nhật theo response hoặc tải lại một lần. Dùng statistics.shortlisted để mở link sang /executive/schedule, kể cả khi bộ lọc hiện tại không hiển thị hồ sơ shortlisted.

5. Kiểm thử với mock thật. Xác minh A01/A02 có quyết định độc lập, Applicant chỉ thấy kết quả đã công bố và không thấy ghi chú riêng. Kiểm tra thống kê qua nhiều trang, giữ bộ lọc khi đóng panel, nội dung CSV, CV đọc được, trạng thái khóa, lỗi/Retry, danh sách rỗng và điều hướng ở 360/768/1280 px. Chạy build và ghi rõ phần đã kiểm tra.

6. Chỉ sửa client/src/features/applications/** và hai file docs/ai-prompts/hoc.md, docs/ai-logs/hoc.md. Giữ hành vi A1/A2. Ghi nguyên văn prompt thực tế, revision của brief.md và kết quả kiểm thử. Kiểm tra diff, staged diff và git diff -- docs/api mock. Để working diff cho Học review. Không stage, commit, push, merge hay bắt đầu A4.
```

#### A3 review and next task request

```text
Đã hoàn thành A3 check và commit nếu được. Sau đó làm tiếp theo
```

### A4 · C11 Final Decisions and Notifications

- Owner: Lê Nguyễn Quốc Học (24127044)
- Tool: Codex
- Date: 2026-11-24 (Asia/Ho_Chi_Minh). Exact send time unknown.
- Branch and start: `pa3/hoc-applications` at `578dcbddc627873cf97e5be62ed3ead56474dffe`.
- Actual invocation: [A3 review and next task request](#a3-review-and-next-task-request).
  The requested next task after A3 was A4.
- Invoked source: `brief.md`, A4 at that starting commit, last revised
  at `521f3a9cc83e302ac796680bb5feb7b464bed024`, blob `9ca5a5312b3cb14856ee8d487062008b6d6c4d32`.
  The release scope follows `PA3_PLAN.md` C11 and the versioned results contract.
- Execution evidence: [A4 log](../ai-logs/hoc.md#a4--c11-final-decisions-and-notifications-2026-11-24).

#### A4 review and handoff request

```text
commit lại, nếu ổn và Học không còn task thì handoff và tạo PR
```

### PR #4 review fixes · C7 and C11

- Owner: Lê Nguyễn Quốc Học (24127044)
- Tool: Codex
- Date: 2026-11-26 (Asia/Ho_Chi_Minh). Exact send time unknown.
- Branch: `pa3/hoc-applications`, updated from `aea32f5` with `origin/main` at `e3e8ad3`.
- Reference: [PR #4 review](https://github.com/ThaiQuangHuy2906/clubflow/pull/4),
  C7 and C11 in `brief.md` at `80db1d0`, blob `9ca5a5312b3cb14856ee8d487062008b6d6c4d32`,
  and the reviewed publication contracts on `main` after PR #5.
- Execution evidence: [PR #4 review fixes](../ai-logs/hoc.md#pr-4-review-fixes--c7-and-c11-2026-11-26).

#### Actual invocation

```text
Cập nhật nhánh pa3/hoc-applications từ main rồi sửa cả 3 lỗi Huy yêu cầu trên PR #4, làm phân trang trước. Test lại 2 ca công bố trên hai tab, nếu ổn thì commit, push lên PR cũ và nhờ Huy review lại.
```
