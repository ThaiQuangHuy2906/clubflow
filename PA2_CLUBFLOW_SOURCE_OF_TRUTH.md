# PA#2 CLUBFLOW — SOURCE OF TRUTH

**CSC13008 · 24KTPM1 · HK1 2026–2027 · Responsive Prototype**  
**Nhóm:** 24127044 — Lê Nguyễn Quốc Học · 24127177 — Thái Quang Huy · 24127505 — Trần Hoàng Phúc  
**Hạn nộp:** **Thứ Hai, 09/11/2026, 22:00 (giờ Việt Nam)**  
**Giá trị:** 100 điểm PA#2, tương đương 3% điểm học phần.  
**Phiên bản tài liệu:** 1.3 · 08/11/2026 (HIỆU ĐÍNH: repository tên `clubflow` dùng xuyên suốt PA#2–PA#6; Huy quản lý merge)  
**Vai trò:** Tài liệu thống nhất yêu cầu, dữ liệu, kiến trúc, trách nhiệm, cách kiểm chứng và điều kiện nộp của nhóm. **Người duy trì và tích hợp: Thái Quang Huy (24127177).**

> **Đọc trước khi làm:** Không có tài liệu kế hoạch nào tự bảo đảm 100/100. Điểm cuối cùng do giảng viên chấm trên trang đang chạy, kiểm tra W3C và bằng chứng. Không đánh dấu “PASS”, không tự nhận đã triển khai chức năng, không chấm đủ điểm nếu chưa thực sự kiểm tra. File này **không thay thế** `brief.md`, `PROTOTYPE.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`.

---

## 0. Quy ước, nguồn và mức độ ưu tiên

Để không lẫn quy định chính thức với quyết định của nhóm, tài liệu sử dụng nhãn:

- **[R] RUBRIC — bắt buộc:** ghi trực tiếp trong `PA2-rubric-responsive-prototype.pdf` (7 trang).
- **[F] FINAL BRIEF — yêu cầu sản phẩm:** ghi trong `ClubFlow-final-project-brief.pdf` (10 trang).
- **[V] ĐẶC TẢ V1.1 — nghiệp vụ tham chiếu:** [ClubFlow_Business_Description-1.docx](https://docs.google.com/document/d/1SueZx8sCwqBbNR8FX459owfYSUx2iTMw/edit), bản “Đặc tả nghiệp vụ ClubFlow”, phiên bản 1.1.
- **[S] SLIDE/COURSE TEMPLATE — hướng dẫn hỗ trợ:** `CSC13008 Code That Waits (Copy) (PA2).md`, `AI-LOG(20261108-105345).md`, `SELF_ASSESSMENT_REPORT template(8).pdf`.
- **[T] TEAM DECISION — lựa chọn nội bộ:** chỉ là phương án nhóm đề xuất/chốt, **không phải yêu cầu bắt buộc của giảng viên**. Có thể đổi nếu cập nhật toàn bộ dữ liệu và bằng chứng liên quan.
- **[Q] QA/RECOMMENDATION — kiểm thử hoặc biện pháp phòng lỗi:** không được tự nhận giảng viên yêu cầu chính xác công cụ/command này nếu rubric không ghi vậy.

**Quy tắc xử lý khác biệt:** Đối với điểm, hạn nộp, chế độ chấm, tài liệu bàn giao, ưu tiên [R] trước slide [S]. Đối với tính năng ba màn hình và danh sách Fix these, ưu tiên [F]; [V] bổ sung chi tiết nghiệp vụ nếu không mâu thuẫn. Quyết định Product Owners được công bố chính thức có thể làm rõ phạm vi nghiệp vụ, nhưng không thay rubric/deadline/các đặc trưng màn hình PA#2 [F, mục 6]. **Không tự suy đoán rằng mọi quy tắc nghiệp vụ của sản phẩm hoàn chỉnh đều phải được lập trình có backend ngay trong PA#2.**

**Tình trạng xác minh nguồn:** Đã đối chiếu đầy đủ rubric và final brief do nhóm tải lên; đã đọc đặc tả v1.1 qua liên kết Google Docs. Link `drive.google.com/open?id=1BX2bYAWW2HS9bNyYMbyLW1J0fyvKtA2l` trong mô tả bài tập không truy xuất được qua kết nối Drive ở thời điểm biên soạn; nội dung chính được đối chiếu bằng **bản PDF final brief nhóm đã cung cấp**. Nếu giảng viên công bố bản mới hơn, phải so sánh lại trước khi nộp.

### 0.1. Làm rõ xuất xứ ClubFlow và chính sách repository [F/R/S/T]

- **[F, tr. 1]** ClubFlow là **đề tài final project chung của cả lớp**, được chọn từ đề xuất PA#1 của **Lâm Gia Hưng, Trịnh Khánh Linh và Văn Viết Minh Phú**. Đề xuất PA#1 riêng của từng nhóm **giữ nguyên điểm, không làm lại PA#1**. Vì vậy **PA#2 của nhóm Huy/Học/Phúc không phải triển khai tiếp sản phẩm PA#1 ban đầu của nhóm**, và tuyệt đối không mặc định có sẵn source code ClubFlow từ PA#1 của nhóm mình.
- **[R, tr. 7]** Rubric yêu cầu **cùng thành viên như PA#1** (nếu đổi thành viên phải báo giảng viên) và làm trong **team repository** với `.git`/commit history. Rubric **không nêu rõ bắt buộc repository phải là chính repository PA#1 cũ**. Do đó, câu “cùng nhóm PA#1” nói về **thành viên**, không tự động chứng minh yêu cầu giữ mã nguồn/lịch sử repository PA#1.
- **[S, slide Session 5]** Slide có câu “start PA#2 from your PA#1 screens” và nhắc `docs/pa1/`. Điều này **không hoàn toàn phù hợp** với việc final brief xác nhận đề tài chung ClubFlow được chọn từ PA#1 nhóm khác. **Không được tự ý sao chép màn hình PA#1 cũ không phải ClubFlow**, cũng không được lấy source PA#1 của nhóm thắng nếu chưa được phép.
- **[T, quyết định hiện tại do người dùng xác nhận]** Nhóm **tạo repository GitHub mới, trống, chuyên cho PA#2 ClubFlow** và khởi tạo `.git` từ đầu. Huy là người tạo/owner, setup baseline và merge 3 nhánh. **Không clone hay dùng lại repo PA#1 cũ**. Repo mới phải có commit đầu tiên chứa rules file rồi mới tạo CSS chung/ba screen, và nộp cả `.git`.
- **[Q, điểm cần kiểm chứng với thầy/Classroom khi có thông báo liên quan]** Nếu có một chỉ dẫn nộp bài cụ thể yêu cầu giữ lại *đúng URL hoặc history repository PA#1*, hướng dẫn đó cần được xác nhận và điều chỉnh trước khi nộp. Tài liệu được cung cấp hiện tại chưa khẳng định điều đó. Ghi rõ lựa chọn repo mới trong `PROTOTYPE.md` nếu thấy cần thiết.

### 0.2. Phạm vi của tài liệu

Tài liệu gồm: yêu cầu chấm điểm, checklist nghiệp vụ, dữ liệu mẫu nhất quán, phân công, chiến lược HTML/CSS, checklist kiểm thử, file bàn giao, Git, AI-LOG, báo cáo tự chấm, lịch làm việc, rủi ro và điều kiện “được phép nộp”. **Nội dung mẫu/đoạn lệnh ở đây không tự chứng minh sản phẩm đã hoàn thành.**

---

## 1. Điều kiện bắt buộc và cấu trúc điểm

### 1.1. Facts phải nhớ [R]

| Thuộc tính | Quy định |
|---|---|
| Nhóm | Tối đa 3 người; **cùng thành viên nhóm PA#1** theo rubric; nếu đổi thành viên, báo giảng viên trước khi bắt đầu. **Không đồng nghĩa phải có cùng chủ đề PA#1.** |
| Deadline | **09/11/2026 lúc 22:00** |
| Sản phẩm | **3 màn hình** theo thứ tự: Create Recruitment Campaign → Application Review → Interview Scheduling |
| Entry point | `index.html` là trang thứ nhất |
| Framework | **Static HTML/CSS hoặc React**; không được dùng JavaScript framework thứ ba |
| Dữ liệu | Placeholder thực tế, hợp với ClubFlow, không `lorem ipsum`; có ít nhất 1 mục dài để thử xuống dòng |
| Viewport | **360 px, 768 px, 1280 px**, mobile-first; không scroll ngang/cắt nội dung |
| HTML | Semantic, label input, đúng button/link, 0 W3C errors trên từng trang |
| Static được chấm | Mở các file trực tiếp trong thư mục; **JavaScript OFF** |
| React được chấm | Phục vụ bản `dist/` từ local server; **JavaScript ON, network ngoài bị chặn**; mở từng path trực tiếp |
| Bàn giao | 1 ZIP chứa **thư mục repository gốc kèm `.git/`**, không kèm `node_modules/` |
| Ngôn ngữ | `PROTOTYPE.md`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md` phải viết **tiếng Anh**; text giao diện có thể là tiếng Việt |
| Nộp | 1 thành viên dùng tài khoản `<StudentID>@student.hcmus.edu.vn`; được nộp lại trước hạn, **bản cuối** được chấm |

### 1.2. Rubric 100 điểm [R, tr. 3–6]

| # | Tiêu chí | Điểm tối đa | Mốc cần đạt để hướng đến tối đa |
|---|---|---:|---|
| 1 | Three linked screens | **20** | Đủ ba trang và tính năng của từng screen, liên kết đúng, không dính lỗi *Fix these* |
| 2 | Responsive | **25** | Cả 9 tổ hợp màn hình/kích thước không scroll/cắt/chồng; target 44px ở mobile, mục dài xuống dòng |
| 3 | Semantic, valid HTML | **20** | **0 W3C errors/3 trang**, landmarks/heading/label/link/button/alt đúng |
| 4 | Design you can check | **10** | Một spacing scale, body ≥16px, contrast text/button ≥4.5:1, ≤1 framework, không `!important` custom CSS, hierarchy rõ |
| 5 | Brief + rules | **10** | Prompt thật sự gửi AI có constraints + definition of done; rules file assistant đọc được và có never-list |
| 6 | AI-LOG.md | **10** | Một entry mỗi trang/nhiệm vụ, tool/request/Kept/Changed/Rejected, lỗi thực tế + phép check + cách xử lý |
| 7 | Git commit history | **5** | Commit đầu PA#2 có rules; tối thiểu 1 commit mỗi trang và 1 commit responsive pass, message rõ, tác giả thật |
| | **Tổng** | **100** | |

**[R] Các tiêu chí 1–3 được giảng viên chấm bằng mở trang trong browser, không chỉ đọc code.** Ảnh chụp, báo cáo tự chấm hoặc validator nhóm lưu không ghi đè kết quả giảng viên chạy thực tế.

### 1.3. Quy định self-score, phạt và deadline [R, tr. 6–7]

- Tên ZIP theo ID tăng dần, thêm dấu `_` rồi tổng điểm **nhóm thực sự tự chấm**. Nếu thật sự tự chấm 100: `24127044-24127177-24127505_100.zip`.
- `SELF_ASSESSMENT_REPORT.md`: 7 dòng, mỗi dòng có điểm tối đa, điểm tự nhận và **bằng chứng trỏ tới file/screenshot/check/commit**; có đoạn *What we did not manage*. Tổng trong báo cáo phải trùng tên ZIP. Nếu lệch, **bảng trong báo cáo có hiệu lực** [S: template]; tên ZIP sai không trừ trực tiếp nhưng có thể làm chậm kết quả [R].
- Không có `SELF_ASSESSMENT_REPORT.md`: **−10**, bỏ qua điểm trong tên ZIP.
- Chênh lệch **self-score − actual mark** trong ±10: không phạt; +11 đến +20: −3; +21 đến +30: −6; >+30: −10; self-score thấp hơn thực tế ≥21: −3. Dòng điểm tự nhận nhưng không có bằng chứng bị xem là tự nhận chưa chứng minh.
- Nộp trễ: **dưới 2 giờ: −20% tổng; 2–24 giờ: −50%; sau 24 giờ: không nhận**.
- Chuyển sang điểm học phần = `(mark / 100) × 3` điểm phần trăm. Mặc định mọi thành viên nhận cùng điểm trừ khi nhóm đề nghị chia điểm.

---

## 2. Quyết định kỹ thuật đã đề xuất [T] — Static HTML + CSS

**Phương án ưu tiên của nhóm:** ba file `index.html`, `review.html`, `schedule.html`, **một file CSS dùng chung `css/styles.css` và ba file CSS riêng theo trang** để hạn chế conflict giữa các feature branches; không dùng build tool, không CDN, không phụ thuộc JavaScript. Đây là lựa chọn **phòng rủi ro** trong thời gian ngắn, **không phải React bị cấm**.

- [R] Static: nội dung chính viết sẵn trong HTML; CSS dùng `<link rel="stylesheet" href="css/styles.css">` hoặc file CSS framework; trang phải đọc được khi tắt JS, mở bằng `file://` từ folder.
- [R] Nếu dùng Tailwind, **không** dùng Tailwind CDN `<script>`; CSS phải được build trước và commit. Nếu dùng Bootstrap, navbar collapse có JS không phù hợp với static JS-off trừ khi có fallback HTML/CSS. Đề xuất **plain CSS** để tránh các bẫy đó.
- [R] Navigation giữa trang bằng `<a href="review.html">`/`<a href="schedule.html">` hoặc submit của `<form action="...">`. **Không** dùng `href="#"`, `/review.html`, `review/` hoặc `button onclick="location.href=..."` cho main flow.
- [Q] Nên sử dụng `<details><summary>...</summary>...</details>` để mở/đóng khu vực giải thích hoặc preview không cần JS; sử dụng các thành phần semantic thích hợp cho cấu trúc trang.
- [Q] Không để một button trang trí vô nghĩa giả vờ “Save/Confirm thành công”. Hãy phân biệt rõ **màn hình/điều kiện được minh họa** với **hành vi đã được code thực thi**. Thể hiện đầy đủ các controls/tính năng trên screen, ghi thật trong `PROTOTYPE.md` những thao tác chưa nối; không làm mất nội dung khi JS tắt.
- [Q] Progressive enhancement bằng JS thuần **có thể** giúp demo filtering/validation nhưng không bắt buộc; nếu thêm, không được tạo nội dung thiết yếu chỉ bằng JS và vẫn phải test khi JS OFF.
- [R] React là lựa chọn thay thế hợp lệ, nhưng phải có **source + `dist/`**, route từng screen ghi trong `PROTOTYPE.md`, build sau thay đổi cuối, xem trực tiếp mỗi path khi offline. **Không trộn hai kiểu chấm.**

### 2.1. Cấu trúc repo mong muốn [R/T]

```text
clubflow/
├── .git/                              # BẮT BUỘC trong ZIP
├── AGENTS.md                          # Hoặc rules file hợp lệ mà assistant thật sự đọc
├── .gitignore
├── index.html                         # Screen 1
├── review.html                        # Screen 2
├── schedule.html                      # Screen 3
├── css/
│   ├── styles.css                    # CSS nền chung; Huy quản lý trên main
│   ├── campaign.css                  # CSS của Screen 1; Huy
│   ├── review.css                    # CSS của Screen 2; Học
│   └── schedule.css                  # CSS của Screen 3; Phúc
├── docs/
│   ├── ai-prompts/                   # Nhật ký prompt thật của từng nhánh (tùy chọn)
│   ├── ai-logs/                      # Entry AI-LOG thật theo nhánh (tùy chọn)
│   └── pa1/                          # TÙY CHỌN: tư liệu PA#1 của nhóm, nếu cần/được phép; không sao chép repo PA#1
├── assets/
│   └── sample-cv.pdf                  # CHỈ khi nút xem CV dẫn tới file có thật
├── screenshots/
│   ├── index-360.png
│   ├── index-768.png
│   ├── index-1280.png
│   ├── review-360.png
│   ├── review-768.png
│   ├── review-1280.png
│   ├── schedule-360.png
│   ├── schedule-768.png
│   └── schedule-1280.png
├── checks/
│   ├── validator-index.png            # Hoặc .txt
│   ├── validator-review.png           # Hoặc .txt
│   ├── validator-schedule.png         # Hoặc .txt
│   └── QA.md                          # Khuyến nghị bổ sung nhật ký test
├── brief.md
├── AI-LOG.md
├── PROTOTYPE.md
├── SELF_ASSESSMENT_REPORT.md
└── PA2_CLUBFLOW_SOURCE_OF_TRUTH.md    # File này, bổ sung tự nguyện
```

**Phân biệt:** [R] bắt buộc `pages`, `rules file`, `PROTOTYPE.md`, `screenshots/`, `checks/`, `brief.md`, `AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`, `.git/`. [S] slide còn nhắc `docs/pa1/`; nên giữ lại nếu đã có và không cần tạo dữ liệu giả. [T] `QA.md`, `docs/ai-prompts/`, `docs/ai-logs/`, CSS riêng từng màn hình, `assets/sample-cv.pdf` và file Source of Truth là **đề xuất bổ sung**, không phải đầu mục rubric bắt buộc. **Mặc dù có bốn file CSS, đây vẫn chỉ là một phương pháp plain CSS với cùng một design system, không phải bốn CSS frameworks.**

---

## 3. Ma trận tính năng ba screen: màn hình phải thể hiện gì [F/R]

### 3.1. Screen 1 — `index.html`: Create Recruitment Campaign

**Người dùng:** Executive của **một club**. **Mục tiêu:** chuẩn bị, lưu nháp, xem trước và công bố campaign; sau khi campaign nhận hồ sơ, mở trang Application Review [F, mục 3.2, 5].

| Yêu cầu truy vết brief | Cách hiển thị/kiểm tra trong prototype |
|---|---|
| Campaign name, host club, description | Input có label rõ ràng, giá trị mẫu hợp lý |
| Application opening/closing date/time | Dùng một timeline chung; đóng sau mở; hiển thị cảnh báo/điều kiện nếu sai |
| Application instructions | Nội dung hướng dẫn cụ thể, không `lorem ipsum` |
| Departments/positions | Mỗi position thuộc đúng một department |
| Quotas, job descriptions, requirements | Quota là số nguyên dương; mô tả/requirements nhìn thấy |
| Save as Draft | Control đúng tên/vai trò; nếu chỉ là mock, không tuyên bố đã lưu |
| Preview Campaign | Thể hiện nội dung ứng viên nhìn thấy bằng khu vực preview có thể đọc được khi JS OFF |
| Publish Campaign | Nêu required fields, date consistency; không “xuất bản thành công” khi dữ liệu sai |
| Move to Applications | Link **thật** `href="review.html"` cho cùng campaign và sau bước ứng viên nộp hồ sơ |
| Business reference [V] | Chuẩn bị slot để ứng viên chọn giờ rảnh; không cần bổ sung hẳn trang Applicant trong PA#2 |

**Nghiệm thu:** mở `index.html` JS-off vẫn thấy form, departments, positions, CTA/preview; không có route hỏng; không giả định bấm sang `review.html` đã tự tạo ra ứng viên hoặc shortlist ai [F, mục 3.1].

### 3.2. Screen 2 — `review.html`: Application Review

**Mục tiêu:** Executive duyệt **từng application**, không gộp các position của cùng một student [F, mục 3.2, 4, 5].

| Yêu cầu truy vết brief | Cách hiển thị/kiểm tra |
|---|---|
| Đúng screen title | `<title>`/`<h1>`/header không nhầm thành Campaign DRAFT MODE |
| Application list | Applicant, application ID, position, submitted time, CV status |
| Search and filters | Các input/controls có label; nếu chưa vận hành phải khai trong Not wired |
| Sorting and pagination | Có khu vực giao diện và số liệu rõ ràng; pagination không trỏ file không tồn tại |
| Application vs applicant statistics | 8 applications và 7 unique applicants trong fixture; số pending/shortlisted/rejected cộng đúng |
| Application details/drawer | CV, SOP/motivation, mốc thời gian, notes nội bộ, Shortlist/Reject |
| Review/Close | Mở và đóng chi tiết mà danh sách vẫn đọc được; mobile không che list |
| Decision independence | A01 và A02 cùng ứng viên nhưng là hai record/position khác nhau |
| Privacy [V/F] | CV screening notes chỉ dành cho Executive; không hiện `Verified Student` |
| Basic CSV export | Thể hiện control; nếu tải file, file phải có thật; nếu chưa làm thật, khai rõ |
| Continue scheduling | Link thật `href="schedule.html"`; chỉ 5 shortlisted thuộc đúng campaign được lên lịch |

**Nghiệm thu:** Screen 2 có đúng title, trạng thái tính đúng, chi tiết và list đều đọc được cả ba width; CV link (nếu có) trỏ tệp thật; không giả vờ search/filter/sort/export hoạt động nếu không hoạt động.

### 3.3. Screen 3 — `schedule.html`: Interview Scheduling

**Mục tiêu:** Executive chuẩn bị bản nháp lịch cho **Shortlisted applications**, kiểm tra xung đột, chỉnh sửa, lưu bản nháp và chỉ Confirm khi điều kiện hợp lệ [F, mục 3.2, 4, 5].

| Yêu cầu truy vết brief | Cách hiển thị/kiểm tra |
|---|---|
| Chỉ ứng viên Shortlisted | Chính xác A01–A05 từ fixture; không đưa A06–A08 vào danh sách |
| Settings | Interview date, time window, duration chung **15/20/30 phút** (fixture chọn 20) |
| Interviewer assignment and availability | Người phỏng vấn đủ điều kiện cho vị trí, giờ rảnh phù hợp |
| Rooms | Chọn trong phòng có sẵn, không trùng phòng cùng thời gian |
| Generate draft | Thể hiện đề xuất lịch; không nhận là đã thực thi thuật toán nếu chỉ là mock |
| Proposed / Unassigned / Conflict | Nhãn đúng; mỗi Unassigned có lý do; Conflict phải liên quan lịch khác **thật** |
| Edit / Resolve / + Assign Slot | Control và cách sử dụng được thể hiện; không nói đã cập nhật dữ liệu nếu chưa lập trình |
| Save Changes | Lưu **draft**, không đồng nghĩa xác nhận |
| Export timetable | Control; xuất thật phải có file hợp lệ |
| Approve & Confirm Schedule | Nêu check: đóng đơn, duyệt hết, mọi shortlisted có đúng 1 lịch hợp lệ, 0 Unassigned, 0 Conflict |
| Confirmed/read-only state | Có mô tả/preview trạng thái Confirmed, khóa edit/regenerate; không công bố kết quả Pass/Fail |

**Nghiệm thu:** tổng status khớp tổng dòng; banner Conflict trỏ tới ít nhất một lịch trùng giờ/người/phòng/ứng viên có thật; bản nháp đang conflict **không hiển thị việc Confirm thành công**; nếu làm state Confirmed mẫu phải phân biệt đó là **kịch bản sau khi xử lý**, không đồng thời với bản nháp chưa hợp lệ.

### 3.4. 8 lỗi *Fix these* phải loại bỏ — nguyên nghĩa [F, tr. 5–6]

| ID | Lỗi phải tránh | Tiêu chí chốt |
|---|---|---|
| FX-01 | **Dates do not fit together**: ngày đóng của screen 1/2 và ngày interview screen 3 mâu thuẫn | Một timeline nhất quán; interview sau closing |
| FX-02 | **Screen 2 has wrong title**: top bar còn `Create Recruitment Campaign · DRAFT MODE` | Tiêu đề đúng `Application Review` |
| FX-03 | **Drawer covers most of list** | Cả application list và detail đều đọc được mọi width |
| FX-04 | **Counts on screen 3 do not add up** | Tổng Proposed + Conflict + Unassigned bằng số records của draft |
| FX-05 | **Conflict is not a conflict** | Chỉ ra **cặp records bị ảnh hưởng** và đúng ràng buộc vi phạm |
| FX-06 | **Applicants and interviewers overlap** | Không dùng cùng một người với hai vai trò trong fixture |
| FX-07 | **“Verified” contradicts scope** | Không claim xác minh trường/credentials/attachments (ngoài scope) |
| FX-08 | **Footer contains template text** | Xóa `© 2025 ClubFlow`, Privacy Policy, Terms of Service, Support Center mẫu |

**Mỗi mục FX-01…08 phải có trạng thái QA PASS/FAIL.** Không đánh giá qua cảm giác hoặc chỉ xem ảnh; kiểm dữ liệu thực tế trong HTML.

---

## 4. Quy tắc nghiệp vụ cần giữ đúng [F/V] và giới hạn của PA#2

**Vai trò [F]:** Executive điều hành; Applicant chỉ thấy hồ sơ/lịch/kết quả của chính mình; Interviewer chỉ thấy hồ sơ/lịch được phân công; ghi chú vòng CV chỉ Executive xem. Phiên bản học kỳ: một club, một campaign active, **một ngày phỏng vấn/campaign**. Không xây university SSO, university verification, đăng ký tài khoản tự phục vụ, nhiều CLB cùng lúc, AI CV ranking, phòng động, ứng dụng di động riêng [F, mục 4].

### 4.1. Checklist BR-01…BR-14 từ đặc tả v1.1 [V]

| Quy tắc | Ý nghĩa cần nhất quán trên UI/dữ liệu mẫu |
|---|---|
| BR-01 | Publish phải có các trường bắt buộc, opening < closing, ≥1 position, quota mỗi position là số nguyên dương; lỗi không làm mất dữ liệu hợp lệ |
| BR-02 | Published có thể hiện trước giờ mở; chỉ nhận hồ sơ từ thời điểm mở đến **trước thời điểm đóng**; draft không công khai |
| BR-03 | Quota là dự kiến tuyển, không tự dừng nhận đơn khi đạt quota |
| BR-04 | Không xóa position có application mà làm mất liên kết; phải chặn và giải thích |
| BR-05 | Khóa application: applicant + campaign + position; một người được nộp nhiều position, không trùng cùng position |
| BR-06 | Tổng application là số hồ sơ; tổng applicant là số sinh viên **khác nhau** |
| BR-07 | Shortlist/Reject chỉ tác động đúng application; scheduling chỉ nhận Shortlisted cùng campaign |
| BR-08 | Shortlisted ≠ Confirmed interview ≠ final Pass |
| BR-09 | CSV theo phạm vi lọc và quyền xuất; không lộ CV/notes vượt quyền |
| BR-10 | Mỗi application tối đa một interview, một interviewer; nằm trọn time window + mutual availability |
| BR-11 | Hai interview bị xung đột nếu giao thời gian và cùng **applicant** (kể cả position khác), interviewer **hoặc** room. Hai buổi liền kề được phép |
| BR-12 | Unassigned vẫn là Shortlisted, có lý do, không tự Reject |
| BR-13 | Chỉ Confirm khi đóng đơn, review tất cả, mỗi Shortlisted có đúng một lịch hợp lệ, 0 Unassigned và 0 Conflict; nếu 0 shortlisted thì bỏ bước confirm lịch |
| BR-14 | Sau Confirm: campaign configuration, nội dung application đã nộp, quyết định CV và schedule read-only; đánh giá/final result ở giai đoạn sau |

**[R/F] Chú ý phân tầng:** PA#2 yêu cầu **prototype ba màn hình** thể hiện các chức năng và nghiệp vụ; không bắt buộc xây toàn bộ backend/PDF upload/login/notification. Không được lấy lý do “prototype” để bỏ hẳn vùng/tính năng của ba screen [F]; nhưng cũng không được nói những thao tác lưu, lọc, phát hiện conflict hay xác nhận đã vận hành đầy đủ khi mới là static illustration [Q].

---

## 5. Bộ dữ liệu chuẩn của nhóm (CANONICAL FIXTURE) [T]

**MỤC ĐÍCH:** Giúp ba người làm độc lập nhưng số liệu và timeline trên ba màn hình nhất quán. **Toàn bộ giá trị dưới đây là dữ liệu giả lập do nhóm đề xuất, không phải dữ liệu bắt buộc của brief.** Nếu nhóm đổi, hãy cập nhật **tất cả** vị trí trong HTML, screenshots, test và PROTOTYPE.

### 5.1. Campaign và timeline

| Thuộc tính | Giá trị chuẩn |
|---|---|
| Campaign ID | `CF-2026-01` |
| Campaign | `Tuyển thành viên CLB Sáng tạo 2026` |
| Club | `CLB Sáng tạo Sinh viên` |
| Applications open | **15/11/2026, 08:00** |
| Applications close | **20/11/2026, 23:59** |
| Review stage | **21–22/11/2026** |
| Interview date | **24/11/2026** (một ngày) |
| Interview time window | **09:00–12:00** |
| Common interview slot | **20 phút** |
| Existing rooms | `Phòng A`, `Phòng B`, `Phòng C` |
| Executive | Người dùng đang đăng nhập giả lập ở cả ba screen |

**Giải thích tính thời gian:** Ba trang mô tả **các giai đoạn liên tiếp** của cùng campaign, không phải ba trạng thái backend đồng thời ở một thời điểm. `index.html` minh họa bước chuẩn bị/công bố; `review.html` minh họa sau khi đã có submissions; `schedule.html` minh họa sau khi đóng đơn và duyệt CV. Bấm chuyển trang **không** tự tạo submissions hoặc quyết định xét tuyển [F, mục 3.1]. Chọn các mốc tương lai so với ngày biên soạn giúp Screen 1 không vô lý vì đang yêu cầu công bố một campaign đã đóng.

### 5.2. Departments, positions, quotas

| Department | Position | Quota | Gợi ý description/requirements |
|---|---|---:|---|
| Nội dung | Biên tập nội dung | 3 | Viết và biên tập bài, kỹ năng storytelling |
| Truyền thông | Truyền thông số | 2 | Lên nội dung fanpage, kế hoạch truyền thông |
| Sự kiện | Điều phối sự kiện | 2 | Điều phối nhân sự, logistic và sự kiện |
| Thiết kế | Thiết kế truyền thông | 2 | Thiết kế poster, thành thạo công cụ phù hợp |

**Quota ≠ số hồ sơ, số shortlisted hay số đã trúng tuyển** [V: BR-03]. Nhóm có thể dùng tên ngắn “Nội dung”, “Truyền thông”, “Sự kiện”, “Thiết kế” trong bảng nếu có bảng ánh xạ đầy đủ.

### 5.3. Danh sách hồ sơ — 8 applications / 7 applicants

| Application ID | Applicant (mã ứng viên) | Position | Submitted (2026) | CV status |
|---|---|---|---|---|
| A01 | Nguyễn Thị Minh Anh Phương Thảo (`ST01`) | Nội dung | 15/11 10:15 | Shortlisted |
| A02 | Nguyễn Thị Minh Anh Phương Thảo (`ST01`) | Truyền thông | 15/11 10:32 | Shortlisted |
| A03 | Trần Hồng Ngọc (`ST02`) | Sự kiện | 17/11 10:10 | Shortlisted |
| A04 | Lê Bảo Trâm (`ST03`) | Thiết kế | 18/11 12:40 | Shortlisted |
| A05 | Phạm Quốc Bảo (`ST04`) | Nội dung | 19/11 20:15 | Shortlisted |
| A06 | Võ Hoàng Long (`ST05`) | Thiết kế | 16/11 11:21 | Rejected |
| A07 | Đặng Thanh Tuyền (`ST06`) | Sự kiện | 18/11 09:30 | Rejected |
| A08 | Bùi Nhật Khánh (`ST07`) | Truyền thông | 20/11 22:05 | Rejected |

**Phép đối chiếu bắt buộc:**

```text
Total applications = 8
Unique applicants  = 7  (ST01 có 2 applications)
Pending Review     = 0
Shortlisted        = 5  (A01..A05)
Rejected           = 3  (A06..A08)
Check              = 0 + 5 + 3 = 8
Scheduling input   = {A01, A02, A03, A04, A05}
```

Tên ứng viên ST01 cố ý đủ dài để kiểm thử wrap trên mobile. Mỗi ứng viên cần thông tin/SOP giả lập hợp lý; không dùng dữ liệu sinh viên thật, CV thật hoặc ghi chú nhạy cảm.

### 5.4. Interviewers và availability — không trùng với applicants

| Interviewer | Được phân công cho position | Availability ngày 24/11 |
|---|---|---|
| Trịnh Ngọc Hà (`I01`) | Nội dung; Sự kiện | 09:00–10:00 |
| Đỗ Quang Kiên (`I02`) | Truyền thông | 09:00–10:00 |
| Lê Thanh Tùng (`I03`) | Thiết kế | 09:00–10:20 |

**Applicant availability:** ST01 09:00–10:00; ST02 09:00–10:00; ST03 09:20–10:20; ST04 11:00–12:00. **Rooms A/B/C** có thể dùng 09:00–12:00 (không cần tự tạo phòng mới). Các giờ là một phần dữ liệu mock được định nghĩa để minh họa được Conflict/Unassigned.

### 5.5. Trạng thái DRAFT cố ý chưa hợp lệ — 5 scheduling records

| Application | Start–end | Interviewer | Room | Status | Giải thích |
|---|---|---|---|---|---|
| A01 (ST01) | 09:00–09:20 | I01 | A | **Conflict** | I01 trùng với A03 |
| A02 (ST01) | 09:20–09:40 | I02 | B | **Proposed** | Cùng ST01 với A01 nhưng **liền kề**, không trùng giờ |
| A03 (ST02) | 09:00–09:20 | I01 | B | **Conflict** | I01 cùng lúc ở A01 và A03 |
| A04 (ST03) | 09:40–10:00 | I03 | A | **Proposed** | Hợp lệ, không trùng người/phòng |
| A05 (ST04) | — | — | — | **Unassigned** | ST04 chỉ rảnh 11:00–12:00; I01 phụ trách Nội dung chỉ rảnh 09:00–10:00 |

**Draft counters chuẩn: `2 Proposed + 2 Conflict + 1 Unassigned = 5 rows`.** A01/A03 đều đánh dấu Conflict vì cả hai có cùng interviewer vào đúng cùng khoảng thời gian. Không được đổi về mẫu “3 Proposed + 1 Conflict + 1 Unassigned” của kế hoạch ban đầu; mẫu cũ không thể hiện đối xứng hai lịch bị ảnh hưởng một cách rõ ràng.

**Nút `Approve & Confirm` ở draft này phải bị chặn.** Cần báo tên A01, A03 và A05 cần xử lý; không dùng banner nêu “overlap” vô căn cứ. Các số liệu Screen 2 và Screen 3 phải khớp: 5 Shortlisted dẫn đến đúng 5 scheduling records.

### 5.6. Kịch bản *sau khi sửa* — chỉ để minh họa trạng thái Confirmed

Đây là **một trạng thái khác** sau chỉnh sửa, không trộn vào bảng Draft chưa giải quyết. Thay đổi thực hiện:

1. Dời A03 sang **09:40–10:00**, I01, phòng B (ST02/I01 đều rảnh, phòng B lúc đó trống).
2. Mở rộng availability của I01 cho ngày đó để có thêm **11:00–12:00**; gán A05 **11:00–11:20**, I01, phòng A (ST04 rảnh, phòng A trống).
3. Giữ A01 09:00–09:20 phòng A; A02 09:20–09:40 phòng B; A04 09:40–10:00 phòng A.
4. Kiểm tra application period đã kết thúc và **8/8 application** đã review.
5. Nếu mọi điều kiện hợp lệ: trạng thái **5 Confirmed / 0 Unassigned / 0 Conflict**, schedule + campaign configuration + applications read-only; **không** có final Pass/Fail tại đây.

Chỉ hiển thị kịch bản Confirmed này dưới nhãn rõ ràng như “After resolution (illustrative state)”. Không có backend nên **không tuyên bố thao tác thực sự đã lưu/duyệt/khóa** nếu chỉ là bảng minh họa.

---

## 6. Phân công mới: đúng 1 TASK triển khai / 1 FEATURE BRANCH, Huy là sole integrator [T]

> **QUYẾT ĐỊNH NHÓM v1.1:** Huy và Học **đổi vai so với bản 1.0**. Huy thiết lập repository, rules, `brief.md`, design system, làm **Screen 1** và **tự tay merge mọi feature branch vào nhánh chính**. Học làm **Screen 2** và kiểm W3C. Phúc vẫn làm **Screen 3** và kiểm responsive. **Không ai ngoài Huy được merge/push trực tiếp lên nhánh chính trong giai đoạn PA#2.** Đây là quy trình nội bộ, không phải luật về người merge của rubric.

### 6.1. Bảng OWNERSHIP — MỖI NGƯỜI MỘT FEATURE TASK / MỘT NHÁNH

| Người | Một feature task duy nhất trên nhánh riêng | Feature branch chuẩn | File được sửa trong feature branch | Kiểm thử/phối hợp |
|---|---|---|---|---|
| **Thái Quang Huy — 24127177** | **TASK HUY-01: Create Recruitment Campaign** | `pa2/huy-campaign` | `index.html`, `css/campaign.css`, nhật ký prompt/AI riêng của Huy | **Ngoài feature task:** setup repo + common CSS trên `main`; review & merge cả ba nhánh; tích hợp `brief.md`, `AI-LOG.md`, docs, final ZIP và nộp |
| **Lê Nguyễn Quốc Học — 24127044** | **TASK HOC-01: Application Review** | `pa2/hoc-review` | `review.html`, `css/review.css`, nhật ký prompt/AI riêng của Học | Kiểm semantic, W3C cả 3 trang; gửi evidence cho Huy; review chéo Screen 1 |
| **Trần Hoàng Phúc — 24127505** | **TASK PHUC-01: Interview Scheduling** | `pa2/phuc-schedule` | `schedule.html`, `css/schedule.css`, nhật ký prompt/AI riêng của Phúc | Test responsive 9 viewport, chụp 9 screenshots; kiểm conflict/timeline; review chéo Screen 2 |

**Phân biệt hai loại việc:** *Một TASK trên một FEATURE BRANCH* nghĩa là mỗi người chỉ triển khai **một màn hình** trên đúng nhánh của mình. Huy có thêm **nhiệm vụ hạ tầng/tích hợp** trên `main` trước/sau vòng làm feature; không mở thêm một feature branch thứ tư cho setup/merge. Học/Phúc vẫn có trách nhiệm QA chéo, nhưng **không tự merge**.

### 6.2. Hợp đồng ownership chống merge conflict

1. **Trên `main` trong REPO PA#2 MỚI trước khi chia nhánh (Huy):** tạo repository GitHub trống, `git init -b main`; **commit đầu tiên chứa** `AGENTS.md`, `brief.md`, `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md` (và `.gitignore` nếu cần); sau đó tạo/commit `css/styles.css` (tokens, typography, buttons, layout utilities). Đây là lịch sử Git PA#2 **mới từ số 0**, không chuyển/sao chép lịch sử PA#1 cũ.
2. **Sau khi cả ba cùng tách từ `main` đã push:** từng người chỉ sửa HTML và **CSS riêng** của mình. Mỗi trang link **hai CSS file** theo thứ tự: `css/styles.css` trước, `css/<page>.css` sau. **Không người nào chỉnh `css/styles.css` trên feature branch.** Mọi thay đổi shared CSS được đề xuất cho Huy, rồi Huy làm trên `main` sau tích hợp hoặc phát hành baseline mới có thông báo rõ.
3. Huy là **owner duy nhất** của root `brief.md`, `AI-LOG.md`, `PROTOTYPE.md`, `SELF_ASSESSMENT_REPORT.md` khi tích hợp. Trước khi gửi AI, từng người phải đọc prompt trong `brief.md`, thực sự gửi prompt đó (đã thay placeholder) và chép bản **đã gửi thật** ngay vào `docs/ai-prompts/<owner>.md`; ghi entry thật ngay vào `docs/ai-logs/<owner>.md`. Những file hỗ trợ này thuộc nhánh từng người; Huy tổng hợp **không bịa/sửa nghĩa** vào root sau merge.
4. Không đưa secret, dữ liệu sinh viên thật, hoặc mẫu code/classmate work vào AI prompt. Không dùng `href="#"` làm main flow. Không sửa file của hai bạn khác khi chưa được Huy duyệt.
5. **Freeze trước merge:** mỗi thành viên commit, push, `git status` sạch, gửi Huy tên nhánh + commit hash + test thật + những điểm còn hạn chế. Huy đọc diff/QA trước khi merge.

### 6.3. Git: Huy TẠO REPOSITORY CLUBFLOW PA#2 MỚI TỪ ĐẦU (trên `main`)

**Đọc trước:** Repo PA#2 là **repository mới, độc lập**, không phải repo PA#1 của nhóm. Giữ đúng ba thành viên theo quy định về nhóm; không clone PA#1 cũ và không copy `.git` từ nơi khác. Chọn tên repo gợi ý `clubflow` (GitHub có thể dùng tên duy nhất trong tài khoản); lưu URL GitHub **thật** sau khi tạo.

**Bước 1 — Huy tạo remote GitHub trống trên giao diện GitHub [T/Q]:** vào GitHub → **New repository** → Owner là tài khoản Huy/nhóm có quyền phù hợp → Repository name: `clubflow` (hoặc tên chính thức nhóm chọn) → chọn Public/Private phù hợp cách thầy yêu cầu nhận bài → **KHÔNG tick** “Add a README”, **KHÔNG chọn** `.gitignore` template hoặc License lúc tạo. Bấm Create repository. Ghi lại **HTTPS clone URL** của chính repo mới, dạng `https://github.com/<ACTUAL_OWNER>/<ACTUAL_REPO>.git`. Không dán nguyên dấu `<...>` vào lệnh.

**Bước 2 — Tạo thư mục local mới, không đặt lồng trong repository khác.** Dưới đây là lệnh cho **Git Bash / macOS / Linux shell** (Windows PowerShell có thể dùng lệnh tương đương). Tạo `clubflow/` mới và copy 3 tài liệu đã cập nhật vào root **trước commit đầu**:

```bash
mkdir clubflow
cd clubflow
# COPY các file có sẵn vào thư mục hiện tại:
# AGENTS.md, brief.md, PA2_CLUBFLOW_SOURCE_OF_TRUTH.md
# Có thể dùng File Explorer/Finder hoặc VS Code; xem bằng ls -la trước khi tiếp tục.
ls -la

git init -b main
git config user.name "Thái Quang Huy"
git config user.email "24127177@student.hcmus.edu.vn"  # thay nếu email Git thực khác

git status
git add AGENTS.md brief.md PA2_CLUBFLOW_SOURCE_OF_TRUTH.md
git commit -m "docs: establish ClubFlow PA2 rules and source of truth"
```

**Bước 3 — Kết nối remote TRỐNG rồi push `main`:**

```bash
git remote add origin https://github.com/<ACTUAL_OWNER>/<ACTUAL_REPO>.git
# Thay URL trên bằng HTTPS URL thực mà GitHub đã cho.
git remote -v
git push -u origin main
```

**Bước 4 — Thiết lập shared CSS trên `main` TRƯỚC khi chia branch:** Huy thực sự gửi PROMPT 00 + PROMPT 01 trong `brief.md` cho assistant, tạo `css/styles.css` có design tokens và shared components đã xem diff. Nếu tạo `.gitignore`, hãy loại trừ `node_modules`, `.env`/secrets nhưng **không** ignore `screenshots/`, `checks/`, `dist/` (nếu chọn React) hoặc các tài liệu nộp. `.git` không đưa vào `.gitignore`: Git quản lý thư mục metadata này bên ngoài danh sách tracked files và ZIP vẫn phải chứa nó.

```bash
# Sau khi css/styles.css ĐÃ thực sự tồn tại:
git diff -- css/styles.css
git status
git add css/styles.css
# Nếu thực sự tạo .gitignore, có thể git add .gitignore riêng.
git commit -m "style: establish shared mobile-first design system"
git push origin main
```

**Bước 5 — Mời Học và Phúc tham gia:** trong GitHub → repository Settings → Collaborators/Access (giao diện có thể đổi tên) → mời đúng GitHub accounts của Học và Phúc với quyền đủ để push feature branches → yêu cầu họ chấp nhận lời mời. Không cần đưa password, token hoặc khóa cá nhân cho bất kỳ ai/AI.

**Bước 6 — Thông báo “baseline ready”** và gửi Học/Phúc URL repo **thật**, branch `main`, commit hash CSS baseline, cùng ba tài liệu/rules. Học và Phúc **clone repo PA#2 MỚI này** trước khi tạo nhánh. Nếu Git báo xác thực, dùng cơ chế xác thực GitHub hợp lệ (browser/Git Credential Manager/SSH đã cấu hình), **không dán token vào chat hoặc brief**.

```bash
# Kiểm tra trên máy Huy sau baseline:
git branch --show-current       # main
git status                      # sạch
git log --oneline -3            # có commit rules đầu tiên, sau đó CSS
git remote -v                   # URL repo ClubFlow PA#2 mới
```

**Chú ý:** Nếu vô tình tạo remote GitHub đã có README/commit sẵn, lịch sử đầu sẽ khác; cách dễ nhất khi chưa ai làm là tạo lại **remote trống** đúng các bước thay vì force push hoặc lịch sử không liên quan. Không dùng `git reset --hard`, không force push và không copy `.git` của repository cũ.

### 6.4. Ba người tách nhánh từ cùng baseline TRONG REPO PA#2 MỚI, không tạo chồng chéo

**Huy (trong repo của Huy):**

```bash
git switch main
git pull --ff-only origin main
git switch -c pa2/huy-campaign
# Chỉ sửa index.html, css/campaign.css và log cá nhân.
git add index.html css/campaign.css docs/ai-prompts/huy.md docs/ai-logs/huy.md
git commit -m "feat: implement recruitment campaign screen"
git push -u origin pa2/huy-campaign
```

**Học (trên máy riêng của Học):** nếu chưa clone, chạy `git clone <REAL_CLUBFLOW_PA2_REPO_URL>` và `cd clubflow` **một lần** trước các lệnh dưới. Không clone repository PA#1 cũ.

```bash
git config user.name "Lê Nguyễn Quốc Học"
git config user.email "24127044@student.hcmus.edu.vn"
git switch main
git pull --ff-only origin main
git switch -c pa2/hoc-review
# Chỉ sửa review.html, css/review.css và log cá nhân.
git add review.html css/review.css docs/ai-prompts/hoc.md docs/ai-logs/hoc.md
git commit -m "feat: implement application review screen"
git push -u origin pa2/hoc-review
```

**Phúc (trên máy riêng của Phúc):** nếu chưa clone, chạy `git clone <REAL_CLUBFLOW_PA2_REPO_URL>` và `cd clubflow` **một lần** trước các lệnh dưới. Không clone repository PA#1 cũ.

```bash
git config user.name "Trần Hoàng Phúc"
git config user.email "24127505@student.hcmus.edu.vn"
git switch main
git pull --ff-only origin main
git switch -c pa2/phuc-schedule
# Chỉ sửa schedule.html, css/schedule.css và log cá nhân.
git add schedule.html css/schedule.css docs/ai-prompts/phuc.md docs/ai-logs/phuc.md
git commit -m "feat: implement interview scheduling screen"
git push -u origin pa2/phuc-schedule
```

**Lưu ý commands:** các lệnh `git add docs/...` chỉ chạy sau khi thành viên **đã tạo các file nhật ký tương ứng** (nếu không sẽ báo pathspec). Nếu dùng VS Code/IDE để tạo branch thay vì CLI, giữ đúng nhánh, file ownership, commit messages và người thực hiện.

### 6.5. Huy MERGE TOÀN BỘ NHÁNH — một chiều vào `main`

**Điều kiện trước merge:** Huy đã nhận 3 thông báo hoàn thành; mỗi nhánh đã được push; diff không có sửa ngoài ownership; chưa có conflict W3C/viewport nghiêm trọng chưa báo; `main` working tree sạch. **Huy là người thực thi cả ba lệnh merge.**

```bash
# TRÊN MÁY HUY; không chạy ở feature branch có thay đổi chưa commit.
git status
git fetch origin --prune
git switch main
git pull --ff-only origin main

git merge --no-ff origin/pa2/huy-campaign -m "merge: add campaign screen from Huy"
git merge --no-ff origin/pa2/hoc-review -m "merge: add application review screen from Hoc"
git merge --no-ff origin/pa2/phuc-schedule -m "merge: add interview scheduling screen from Phuc"

git status
git log --oneline --decorate -12
git push origin main
```

`--no-ff` giúp giữ rõ 3 nhánh và commit gốc của từng người; **không squash** nếu muốn lưu bằng chứng ai làm gì. Git giữ tác giả commit tính năng của Học/Phúc dù Huy là người tạo merge commits. Khi review được code và dùng `git log --format='%h %an %s'` kiểm tác giả thật.

**Nếu phát sinh merge conflict:** dừng tại lệnh đang conflict, chạy `git status`; đọc từng phần `<<<<<<<`, `=======`, `>>>>>>>`, đối chiếu Source of Truth và file ownership rồi quyết định; sửa xong `git add <files>` và `git commit`. Nếu chưa rõ cách sửa, `git merge --abort` để quay lại trạng thái trước merge và hỏi người sở hữu file. **Không** `git reset --hard`, `git push --force`, hoặc chọn toàn bộ “ours/theirs” chỉ để hết báo conflict.

### 6.6. Huy tích hợp, nghiệm thu và đóng gói **sau merge**, trên `main`

1. Kiểm ba HTML đều load `css/styles.css` rồi CSS page tương ứng; nav `index.html → review.html → schedule.html` và ngược lại không hỏng; tất cả đều mở bằng `file://` khi JS OFF.
2. Tổng hợp nguyên văn prompt thật theo thời gian từ `docs/ai-prompts/*.md` vào phần **Actual prompts sent** trong root `brief.md` (giữ tool/người/ngày và đúng bản đã gửi). Không coi các template chưa gửi là bằng chứng. Tổng hợp log thực từ `docs/ai-logs/*.md` vào `AI-LOG.md`. Trong `PROTOTYPE.md`, giải thích việc PA#2 là **ClubFlow classwide project**, trong khi PA#1 trước đây của nhóm có thể là đề xuất khác; nêu lựa chọn repo PA#2 mới nếu cần minh bạch.
3. Huy cùng Học/Phúc kiểm 9 viewport, 3 W3C upload, accessibility, 8 Fix these, fixture và CSS contrast. Học đưa validator evidence, Phúc đưa 9 screenshots; Huy xác nhận khớp bản `main` cuối.
4. Huy hoàn thiện `PROTOTYPE.md`, `checks/QA.md`, `SELF_ASSESSMENT_REPORT.md`; tự chấm **sau** khi có evidence, không tự ghi 100 ngay.
5. **Responsive pass là commit riêng** trên `main` sau khi đã tích hợp và sửa lỗi thật: `git commit -m "fix: verify and refine all three responsive screens"` (chỉ thực hiện khi có diff/responsive fix thực sự; nếu không có chỉnh sửa nào, commit test evidence như `test: document responsive pass at three widths`).
6. Kiểm lại `git status`, `git log`, `.git` và đủ 9 screenshot/3 validator reports; ZIP thư mục repo đã hoàn thành; giải nén kiểm thử; **Huy là người nộp đại diện nhóm** nếu đã thống nhất trong nhóm, đúng tài khoản HCMUS, trước deadline.

### 6.7. Checkpoint handoff chuẩn từ Học / Phúc tới Huy

```text
TASK ID: HOC-01 | PHUC-01
Owner:
Branch:
Last commit hash:
Files changed:
Screens/features completed:
Tested widths (JS disabled):
W3C validation result (only if actually run):
Known limitations / Not wired:
Actual AI prompts log path:
Actual AI-LOG entry path:
Ready for Huy to review and merge: YES / NO
```

**Quy tắc chung:** chủ sở hữu **không phải người duy nhất kiểm thử**. Mỗi người tự test screen của mình ở ba widths, thành viên khác review chéo. Tất cả phải hiểu code và nghiệp vụ; không chỉ Huy mới được xem diff. Rubric chấm commit history thật, browser behavior thật, và chứng cứ thật — không thưởng thêm điểm riêng chỉ vì dùng nhiều branch.

---

## 7. Design system và HTML contract [R/T]

### 7.1. Style contract

- [T] Chọn **plain CSS**; 4 stylesheet local (1 shared `css/styles.css` + 3 page-specific CSS; **mỗi trang chỉ load shared + CSS riêng**); font hệ thống, không remote dependency.
- [T] CSS spacing scale dùng `4/8/12/16/24/32 px` tương đương `0.25/0.5/0.75/1/1.5/2 rem`; mọi người tái sử dụng custom properties.
- [R] Body text **≥16px**, body/button text contrast **≥4.5:1**; **không** có `!important` trong custom CSS, không load framework thứ hai.
- [R] Buttons và links đứng độc lập cao **≥44px ở 360px** (link nằm trong câu văn được miễn); không chỉ dựa vào padding mặc định framework.
- [T] CSS mobile-first: base 360px, `@media (min-width: 48rem)` ~768px, `@media (min-width: 80rem)` ~1280px. Đây là **breakpoints được nhóm chọn**, ba width là kích thước **bắt buộc phải test** [R].
- [R] Không có sideways scroll, chữ chồng/cắt. Được phép bảng cuộn **trong wrapper của chính bảng**, không được che lỗi toàn trang bằng `overflow-x: hidden` trên `html`/`body`/wrapper.
- [T] Chủ đạo màu xanh/trung tính; màu trạng thái phụ trợ; mỗi screen có một vùng/CTA quan trọng nhất. Tên/class CSS do nhóm tự chọn.

**CSS mẫu minh họa, phải review sau khi AI tạo ra:**

```css
:root {
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem;
  --space-4: 1rem; --space-6: 1.5rem; --space-8: 2rem;
  --text: #0f172a; --muted: #475569;
  --primary: #1d4ed8; --bg: #f8fafc; --surface: #ffffff;
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font: 400 1rem/1.5 system-ui, sans-serif;
       color: var(--text); background: var(--bg); }
img { max-width: 100%; height: auto; }
a.button, button { min-height: 44px; }
.long-item { overflow-wrap: anywhere; }
@media (min-width: 48rem) { /* tablet layout */ }
@media (min-width: 80rem) { /* laptop layout */ }
```

**Chú ý:** Màu `--primary` không tự bảo đảm 4.5:1 trên mọi background; phải kiểm tra text/surface trong DevTools. `min-height` không làm text không tương phản. Không làm mọi `a` thành button 44px khi đó là inline link trong đoạn văn.

### 7.2. Semantic HTML contract

- Mỗi trang có `<!DOCTYPE html>`, `<html lang="vi">` nếu UI tiếng Việt, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<title>` đúng màn hình và hai `<link rel="stylesheet">`: `css/styles.css` **trước**, `css/campaign.css`/`css/review.css`/`css/schedule.css` **sau** tùy trang.
- Có các landmarks khi phù hợp: `<header>`, `<nav aria-label="...">`, `<main>`, `<footer>`; **một `<h1>`**, không skip heading level tùy tiện.
- Mọi input có **visible `<label for="id">`**; click label focus đúng input. Placeholder không thay label.
- `<a href="...">` cho điều hướng/tải tài liệu; `<button>` cho action; submit form có `action="..."` nếu chủ đích điều hướng. Không dùng `<div onclick>`.
- Ảnh có `alt` đúng (hoặc `alt=""` nếu thuần trang trí); icon-only controls cần accessible name, icon không thay văn bản status.
- Chỉ dùng link CV/CSV/assets khi file/URL có thật trong môi trường chấm. Không trỏ tới `#`, file thiếu, `javascript:` hay endpoint chưa tồn tại.
- **0 W3C errors** qua [W3C Nu Validator](https://validator.w3.org/nu/) cho từng trang. HTML “valid” chưa chắc “semantic”: phải kiểm thêm Accessibility pane.

---

## 8. Definition of Done / test protocol — không được bỏ qua [R/Q]

### 8.1. Ma trận 9 trường hợp bắt buộc

| Page | 360 | 768 | 1280 |
|---|---|---|---|
| `index.html` | □ | □ | □ |
| `review.html` | □ | □ | □ |
| `schedule.html` | □ | □ | □ |

**Quy trình cho mỗi ô (static):** mở file trực tiếp trong browser → DevTools (`F12`) → `Ctrl+Shift+P` → **Disable JavaScript** → reload → Device Toolbar chọn width → kiểm viewport/overflow/content → bấm mọi link cần test → kiểm màu/target/text → chụp **full-size screenshot**. Cần thử **không có Internet** để xác định không lệ thuộc CDN/remote fonts [Q].

### 8.2. Các biểu thức Console có trong rubric [R, tr. 4]

**Horizontal overflow (phải `false`):**

```js
document.documentElement.scrollWidth > document.documentElement.clientWidth
```

**Viewport thật (phải bằng 360/768/1280 đang test):**

```js
document.documentElement.clientWidth
```

**Phần tử vượt mép phải (mục tiêu `[]`; bảng scroll trong wrapper là ngoại lệ hợp lệ):**

```js
[...document.querySelectorAll('body *')].filter(e =>
  e.getBoundingClientRect().right > document.documentElement.clientWidth
)
```

Đừng dùng `overflow-x:hidden` để làm test thứ nhất báo `false` trong khi test thứ ba còn phần tử tràn. Ngay cả khi hai Console checks pass vẫn phải nhìn bằng mắt, vì có thể chồng nhau/chiều dọc bị cắt.

**Heuristic phụ kiểm link/button dưới 44px** (không phải script rubric; kiểm thủ công các inline links được miễn):

```js
[...document.querySelectorAll('a, button')]
  .filter(el => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.height < 44;
  })
  .map(el => ({text: el.textContent.trim().slice(0, 45), height: el.getBoundingClientRect().height}));
```

### 8.3. Bộ kiểm thử nghiệm thu đề xuất [Q]

| Mã | Test | Điều kiện PASS |
|---|---|---|
| NAV-01 | Mở cả 3 HTML bằng `file://` | Có nội dung, CSS load, không lỗi file phụ |
| NAV-02 | Link index → review → schedule, link quay lại | Mở đúng file; không `#`, không 404/file listing |
| OFF-01 | JS disabled reload | Tất cả nội dung chính, trạng thái và mẫu dữ liệu vẫn hiện |
| RSP-01…09 | Ba trang × ba widths | Scroll check false, viewport đúng, không clipping/overlap |
| TAP-01 | Button/standalone link ở 360px | ≥44px; có focus/hover rõ |
| TXT-01 | Tên ST01 và title dài | Wrap, không ép rộng viewport |
| SEM-01 | Headings/landmarks/labels/alt | Đúng HTML semantics và Accessibility pane |
| VAL-01…03 | W3C File Upload từng HTML | **0 errors** và lưu result trong `checks/` |
| DES-01 | CSS scale/typography/contrast | Body ≥16px, text/button ≥4.5:1, không custom `!important` |
| BUS-01 | Timeline | 15–20/11 submissions, 21–22/11 review, 24/11 interview |
| BUS-02 | Counts | 8 applications, 7 people, 5 shortlisted, 3 rejected |
| BUS-03 | Draft scheduling | 2 Proposed + 2 Conflict + 1 Unassigned = 5 |
| BUS-04 | Conflict | A01 và A03 tranh cùng I01 lúc 09:00–09:20; A02 không trùng ST01 |
| BUS-05 | Confirm gate | Draft chưa giải quyết không thể Confirm hợp lệ |
| BUS-06 | Roles/permissions | Không trùng applicant với interviewer; internal notes không công khai |
| FX-01…08 | 8 lỗi brief | Từng lỗi được xác nhận không còn |
| FILE-01 | Resources | Không có link vào asset không tồn tại |
| EVI-01 | Screenshots/validators | 9 screenshots + 3 validator reports khớp bản cuối |

**[Q] Sau mọi thay đổi cuối lên HTML/CSS**: chạy lại test bị ảnh hưởng, chụp lại ảnh bị ảnh hưởng, cập nhật bằng chứng. Không lưu ảnh đẹp từ phiên bản cũ.

### 8.4. W3C [R, tr. 2, 4]

1. Vào https://validator.w3.org/nu/ → **File Upload** `index.html` → đạt 0 errors → lưu `checks/validator-index.png` hoặc `.txt`.
2. Lặp lại `review.html` và `schedule.html`.
3. Warning được phép theo rubric, nhưng kiểm xem warning có báo vấn đề thực không.
4. DevTools **Elements → Accessibility**: kiểm accessible names, heading outline, label association; Color Picker: contrast body/button ≥4.5:1.
5. **Nếu chọn React thay static:** không upload `dist/index.html` trống rồi xem đó là bằng chứng; lấy `outerHTML` của `<html>` đã render cho từng screen, thêm `<!DOCTYPE html>` và dùng Text Input theo rubric.

### 8.5. Screenshots chính xác [R, tr. 2]

```text
screenshots/index-360.png
screenshots/index-768.png
screenshots/index-1280.png
screenshots/review-360.png
screenshots/review-768.png
screenshots/review-1280.png
screenshots/schedule-360.png
screenshots/schedule-768.png
screenshots/schedule-1280.png
```

Chọn width trong Device Toolbar → menu ba chấm → **Capture full size screenshot**; static **JS OFF**. Tên `<page>` là basename file HTML không có `.html`. **Chỉ chụp ảnh sau khi bản HTML/CSS tương ứng đã qua kiểm tra.**

### 8.6. `checks/QA.md` gợi ý ghi bằng chứng [Q]

```markdown
# PA2 Browser QA (verified on YYYY-MM-DD)

| Page | Width | JS | scrollWidth>clientWidth | clientWidth | Right overflow | Tap/visual | Result |
|---|---:|---|---|---:|---|---|---|
| index.html | 360 | Off | false | 360 | [] | Pass | PASS |
...

## Business checks
- FX-01: PASS — same closing and interview timeline in all pages.
- FX-05: PASS — A01 and A03 share interviewer I01 at 09:00–09:20.
...

## Accessibility / validation
- index.html: 0 W3C errors — checks/validator-index.png
...

## Open issues
- [Write real limitations; never invent passing evidence.]
```

**Lưu ý:** Mẫu dòng `PASS` ở trên chỉ là *format*, không phải phép kiểm đã chạy. Phải thay bằng kết quả quan sát thật.

---

## 9. Assistant workflow: brief, rules, AI-LOG [R/S]

### 9.1. Thứ tự làm việc với AI

**Theo phân vai v1.1:** Huy quản lý `brief.md` chung; Huy/Học/Phúc dùng lần lượt TASK HUY-01/HOC-01/PHUC-01 và các prompt riêng trong file đó. `brief.md` ban đầu là **prompt pack sẵn để gửi**, chưa phải bằng chứng rằng đã gửi. Sau khi gửi thật, ghi prompt đã gửi nguyên văn theo thời gian; loại bỏ hoặc đánh dấu không sử dụng đối với template chưa gửi trước khi nộp. Huy tổng hợp và kiểm đúng nguồn từ từng branch.

1. Đặt **rules file thật** (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules` hoặc `.github/copilot-instructions.md`) ở root; **assistant thực tế sử dụng** file này. Chọn đúng loại theo công cụ nhóm dùng.
2. Trước khi tạo code, gửi assistant **source documents** và constraints đã chốt; giữ lại **nguyên văn prompt thực sự đã gửi** trong `brief.md` theo thứ tự. **Không viết `brief.md` đẹp sau cùng như thể đã gửi prompt đó.**
3. Yêu cầu từng task rõ: file được sửa, kết quả mong đợi, dữ liệu fixture, constraints, cách test, giới hạn không đổi file khác.
4. `git diff` và browser/W3C/accessibility để kiểm; đối chiếu từng requirement. Bác bỏ đề xuất không đúng (ví dụ che overflow bằng `overflow-x:hidden`, invent dependency, `href="#"` trên main flow).
5. Ghi AI-LOG **ngay sau task**, nêu Tool, Asked for, Kept, Changed, Rejected. Nếu không có lỗi, ghi các test đã chạy. Không tạo lỗi giả để “đủ log”.
6. Giữ commit liên kết được với những gì log kể. Mỗi thành viên có thể bị hỏi giải thích bất kỳ đoạn code AI đã viết [R, tr. 7; S AI-LOG].

### 9.2. Contract của `brief.md` [R, tiêu chí 5]

Prompt(s) thật phải chứa tối thiểu:

- ClubFlow 3 screens, cùng campaign và timeline, Fix these, expected behavior/trạng thái.
- Chọn **static + plain CSS** và spacing scale thống nhất (hoặc quyết định thực tế nếu đổi).
- Mobile-first và width **360/768/1280**, không fixed page width, không overflow hidden che lỗi.
- Không new dependency, không framework JS ngoài React (nhóm đã chọn static), không CDN asset cho bản offline.
- Semantic landmarks, một `<h1>`, visible labels, button vs anchor, alt, 44px targets, contrast.
- Relative links và không dùng `onclick` cho navigation.
- Definition of done: 9 size cases, JS OFF, W3C 0 errors, Accessibility pane, checks/screenshots, kiểm link.

Sử dụng **`brief.md` đi kèm Source of Truth v1.3**, gồm prompt dùng chung, setup của Huy, ba prompt task theo một nhánh/người, prompt cross-review và merge QA. Chỉ các prompt **thực sự gửi** mới được đưa vào phần actual log trước nộp; nội dung đã sửa so với template phải lưu đúng như đã gửi. Không cần nhồi toàn bộ Source of Truth vào một prompt duy nhất; có thể đính kèm file Source of Truth/brief/rubric/final brief nếu assistant hỗ trợ đọc file.

### 9.3. AI-LOG entry format [S/R]

```markdown
## YYYY-MM-DD — <page or task>
Tool: <actual tool>
Asked for: <the actual task given>
Kept: <what was accepted>
Changed: <actual change and evidence>
Rejected: <actual suggestion rejected, why, and which check caught it>
```

**Điểm 9–10/10 AI-LOG [R]:** Ít nhất một entry có lỗi AI **thực sự xảy ra**, phép test thấy lỗi (width/W3C/Accessibility...), yêu cầu khắc phục và có thể đối chiếu commit. Nếu không lỗi thực sự, **không bịa**: nêu checks thật; rubric vẫn cho phép log trung thực nhưng có thể ít chi tiết hơn để đạt dải tối đa. `Tool: none` là hợp lệ cho việc làm không dùng AI.

---

## 10. Bốn tệp Markdown bắt buộc bằng tiếng Anh [R]

### 10.1. `PROTOTYPE.md` — đủ 6 phần theo rubric

1. **Team** — mỗi thành viên full name + student ID.
2. **How to open** — static: “open `index.html`”, có cần network không (nên không), có cần server không (static không).
3. **Screens** — **mỗi trang một dòng**: file, ClubFlow screen gốc, người dùng làm gì, link trong trang mở trang nào (không chỉ link next).
4. **Your design choices** — điểm khác với brief/screenshot và **vì sao**; thay đổi thực tế, không giả định.
5. **Not wired yet** — các controls ngoài main flow/chưa hiện thực: search, settings, logout..., và ranh giới hành vi mock. Không khai “fully functional” nếu chỉ HTML.
6. **CSS** — framework/plain CSS, spacing scale, breakpoints (ghi đúng CSS thực tế).

**Đề xuất phần bổ sung:** note thống nhất timeline, ứng dụng dữ liệu mẫu và cross-reference `checks/QA.md`, không thay thế 6 phần bắt buộc.

### 10.2. `brief.md` — prompt thực đã gửi

- Không phải bản tóm tắt hồi tố; chép các yêu cầu đã gửi assistant theo thứ tự.
- Có định nghĩa đạt (Definition of Done) cụ thể và constraints tương ứng mục 9.2.

### 10.3. `AI-LOG.md` — log thực tế

- Một entry trên mỗi task/page AI làm; Tool, Asked for, Kept, Changed, Rejected.
- Gắn với checks và commits; không bịa lỗi hoặc kết quả pass.

### 10.4. `SELF_ASSESSMENT_REPORT.md` — đúng rubric PA#2

**Mẫu cấu trúc; điểm tự nhận để trống cho đến khi test xong:**

```markdown
# Self-assessment — PA#2

Submitted by:
- 24127044 — Lê Nguyễn Quốc Học
- 24127177 — Thái Quang Huy
- 24127505 — Trần Hoàng Phúc

Total we claim: [TOTAL] / 100

| Criterion | Max | We claim | Evidence |
|---|---:|---:|---|
| Three linked screens | 20 | [ ] | index.html; review.html; schedule.html; PROTOTYPE.md |
| Responsive | 25 | [ ] | screenshots/; checks/QA.md |
| Semantic, valid HTML | 20 | [ ] | checks/validator-index.png; validator-review.png; validator-schedule.png |
| Design you can check | 10 | [ ] | css/styles.css; css/campaign.css; css/review.css; css/schedule.css; screenshots/ |
| Brief and rules file | 10 | [ ] | brief.md; AGENTS.md |
| AI-LOG.md | 10 | [ ] | AI-LOG.md; relevant commits |
| Commit history | 5 | [ ] | .git/; git log --oneline |

## What We Did Not Manage
[Only actual limitations.]

## What We Would Do Differently
[Actual lessons learned.]
```

**Phải sửa mọi placeholder `[ ]` và câu trong dấu `[...]` trước khi nộp.** Nếu rules file thực tế là `CLAUDE.md`, thay `AGENTS.md` trong evidence. Không điền 100 chỉ vì mục tiêu là 100. Có thể bổ sung file/line/commit hash/test name cụ thể để bằng chứng vững hơn.

---

## 11. Lịch triển khai ưu tiên và các mốc quyết định [T]

| Thời điểm đề xuất (ICT) | Cả nhóm làm gì | Chủ trì |
|---|---|---|
| **CN 08/11, 18:00–19:00** | Đọc nguồn; Huy chốt stack/fixture, tạo rules + prompt pack + shared CSS trên `main` và push baseline | **Huy** |
| **CN 19:00–22:00** | Huy Screen 1 trên `pa2/huy-campaign`; Học Screen 2 trên `pa2/hoc-review`; Phúc Screen 3 trên `pa2/phuc-schedule`; cập nhật prompt/log thật | **Từng người** |
| **CN 22:00–23:00** | Huy review diff và merge từng feature branch vào `main` bằng `--no-ff`; kiểm đường dẫn/CSS | **Huy** |
| **T2 09/11, 08:00–11:00** | Hoàn thành 3 màn hình và sửa thiếu tính năng | Từng người |
| **T2 11:00–14:00** | Chạy 9 viewport; Học kiểm W3C/Accessibility; Phúc kiểm responsive/Fix these; Huy tích hợp kết quả | **Huy chủ trì, Học + Phúc QA** |
| **T2 14:00–17:00** | Chụp 9 ảnh/validator evidence; hoàn thiện docs và AI-LOG | Cả nhóm |
| **T2 17:00–19:00** | Review chéo; sửa lỗi và chạy lại tests | Cả nhóm |
| **T2 19:00–20:30** | Huy đối chiếu self-score/evidence, kiểm 3 merges + Git, đóng ZIP và giải nén chạy thử; Học/Phúc audit chéo | **Huy** |
| **Mục tiêu trước 21:00 ngày 09/11** | Huy nộp ZIP, xác nhận đúng tài khoản và file (nếu nhóm ủy quyền Huy) | **Huy** |

Đây là lịch **đề xuất**, không phải lịch được giảng viên quy định. Nếu thiếu thời gian: ưu tiên **đủ ba screen → không Fix these → responsive/W3C → evidence/docs/Git → polish**, không thêm animation/trang phụ để đổi lấy rủi ro trễ. **Deadline cứng là 22:00**.

---

## 12. Kiểm tra ZIP, nộp bài và audit sau giải nén [R/Q]

### 12.1. Tên và nội dung

- ID tăng dần: `24127044-24127177-24127505`.
- Tên ZIP: `24127044-24127177-24127505_<TOTAL>.zip`; `<TOTAL>` = tổng **thực tự chấm** trong báo cáo. Ví dụ `_100.zip` **chỉ khi** self-assessment đủ 100 có chứng cứ.
- ZIP bao **thư mục repository** (không chỉ nội dung file rời), có `.git/`, source, rules, screenshots 9 file, checks 3 reports, bốn Markdown bắt buộc. **Không** dùng GitHub Download ZIP hoặc `git archive` vì mất `.git`.
- Không đưa `node_modules/`, `.env`, API keys, tài liệu cá nhân/sinh viên thật, output tạm hoặc secrets vào ZIP.

### 12.2. Nén từ thư mục cha trên macOS/Linux [Q]

```bash
# Chạy khi terminal đang ở thư mục CHA của repository.
# Thay 100 bằng tổng tự chấm thật, và sửa tên thư mục repo cho khớp.
TOTAL=100
REPO=YOUR_REPO_FOLDER
ZIP="24127044-24127177-24127505_${TOTAL}.zip"
zip -r "$ZIP" "$REPO" -x '*/node_modules/*' '*/.env' '*/.env.*'
unzip -l "$ZIP"
```

**Bash lưu ý:** `TOTAL=100` chỉ minh họa cú pháp, **không phải khuyến nghị tự chấm 100 khi chưa đủ chứng cứ**. Đổi thành điểm thực tế; `REPO` phải trùng tên folder có `.git`. Nếu dùng Windows/7-Zip, bật hiển thị hidden files và kiểm ZIP thực sự có `.git`.

### 12.3. Audit trước khi Turn in [Q]

1. Giải nén vào **một folder khác** và kiểm `.git/HEAD`, `.git/objects`, `git log --oneline` hoạt động.
2. Mở `index.html`, `review.html`, `schedule.html` **từ folder đã giải nén**, không dùng dev server và không cần Internet; test main flow JS OFF.
3. Kiểm đúng 9 screenshots đúng basename/size, 3 W3C results, 4 docs English, rules file, CSS/assets.
4. Đối chiếu TOTAL trong báo cáo với tên ZIP; xác nhận evidence từng dòng tồn tại.
5. Nộp từ tài khoản `<StudentID>@student.hcmus.edu.vn` của một thành viên, kiểm trạng thái nộp/receipt trong Classroom. Nếu sửa và nộp lại, **bản cuối trước hạn** mới được tính [R].

---

## 13. Final release gate — chỉ được kết luận “đã sẵn sàng” khi tất cả PASS

### A. Product/flow

- [ ] Ba file HTML là đúng các screen; `index.html` mở đầu.
- [ ] Mọi main-flow anchor/form action trỏ **đúng file tồn tại**, relative path; cả 3 mở file trực tiếp thành công.
- [ ] Screen 1 đầy đủ campaign, positions, quota, requirements, Draft/Preview/Publish, hướng đến Applications.
- [ ] Screen 2 đầy đủ list/stats/search/filter/sort/pagination/detail/CV/SOP/notes/decision/export, hướng đến Schedule.
- [ ] Screen 3 đầy đủ configuration, availability, proposed/unassigned/conflict, edit/resolve/assign/export/approval conditions, Confirmed-read-only illustration.
- [ ] **FX-01…FX-08: PASS**, có kiểm tra dữ liệu cụ thể.
- [ ] Không có claim thao tác mock đã thực thi backend, không còn link giả.

### B. Visual/browser

- [ ] Mỗi screen chạy JS OFF với đủ nội dung, không Internet.
- [ ] 9 trường hợp 360/768/1280: no horizontal overflow, `clientWidth` đúng, không che/cắt/chồng.
- [ ] Mobile target ≥44px, text đọc được, mục tên dài tự xuống dòng.
- [ ] 9 screenshots **full-page** khớp code cuối.

### C. Semantics/design

- [ ] 3 W3C reports **0 errors**, lưu trong `checks/`.
- [ ] Landmarks, 1 `<h1>`/page, heading order, visible label, alt, button/link đúng.
- [ ] Accessibility pane và contrast ≥4.5:1 đã kiểm.
- [ ] 1 spacing scale, body ≥16px, ≤1 framework, custom CSS không `!important`.

### D. Process/evidence

- [ ] Rules file đọc được và assistant đã sử dụng.
- [ ] `brief.md` đúng lời nhờ AI và có đủ constraints + acceptance criteria.
- [ ] `AI-LOG.md` ghi task thật, Changed/Rejected và test; không bịa.
- [ ] Git history đủ rules/ba page/responsive commits, tên người commit đúng; Huy đã merge cả `pa2/huy-campaign`, `pa2/hoc-review`, `pa2/phuc-schedule` vào `main` và kiểm commit author.
- [ ] `PROTOTYPE.md` đầy đủ 6 mục; `SELF_ASSESSMENT_REPORT.md` đủ 7 dòng/điểm/bằng chứng, có What We Did Not Manage.
- [ ] Tên ZIP đúng IDs, TOTAL = tự chấm, giải nén thử được, có `.git`, đúng 1 ZIP nộp đúng tài khoản trước deadline.

**Release decision:** Nếu có một mục thuộc [R] hoặc [F] chưa PASS, ghi nó vào phần *What We Did Not Manage*, sửa nếu còn thời gian và **tự chấm trung thực**. Không được dùng file này để thay thế kiểm thử thực tế.

---

## 14. Những điểm dễ hiểu nhầm đã được chuẩn hóa

1. **Static được phép, React cũng được phép [R].** Slide Session 5 chủ yếu nói static; rubric PDF chính thức cho phép cả React kèm `dist/`.
2. **`docs/pa1/` là slide nhắc tới [S], không ở danh sách root bắt buộc của rubric PDF [R].** Giữ nếu có; không tự ghi nó là căn cứ mất điểm 100% khi thiếu.
3. **Ảnh màn hình PDF là điểm xuất phát, không phải pixel-perfect target [F/R].** Quan trọng tính năng/logic, không copy lỗi.
4. **Static prototype và chức năng backend là hai mức khác nhau.** Có các controls và business states đúng; ghi rõ những thứ chưa wired, đừng tự nhận đã làm API/database. Nếu muốn hành động demo, JavaScript có thể bổ sung nhưng **không phụ thuộc JS để hiển thị nội dung** [R].
5. **Không nhầm application với applicant.** 8 applications có thể thuộc 7 applicants (ST01 ứng tuyển 2 vị trí).
6. **Không nhầm mọi row liên quan conflict với row Proposed hợp lệ.** Fixture mới đánh dấu cả A01 và A03 Conflict; tổng 2+2+1 = 5.
7. **Không lấy `href="#"` làm nút điều hướng.** Same-page anchor như `href="#application-A01"` (có target tồn tại) có thể dùng cho nội dung tại chỗ, **không** thay main-flow route.
8. **HTML native `required` không tự chứng minh đã kiểm được mọi business rule.** Ví dụ so sánh hai ngày, cảnh báo custom và lưu dữ liệu cần xử lý riêng nếu nhóm khẳng định chúng hoạt động.
9. **Không dùng mock “Confirmed” song song như trạng thái thực của draft còn Conflict/Unassigned.** Có thể dùng bảng thứ hai tách biệt với nhãn “after resolution illustration”.
10. **Tên ZIP phải khớp tự chấm chứ không khớp mục tiêu.** Muốn `_100` cần đủ bằng chứng 100/100; khai sai có honesty adjustment.
11. **Huy là người tích hợp, nhưng không lấy authorship của Học và Phúc.** Merge giữ tác giả commit gốc; không squash/thay người viết nếu muốn lịch sử minh bạch.
12. **`brief.md` chứa prompt soạn sẵn chưa có nghĩa đã gửi.** Rubric chấm prompt thật; phải điền nhật ký actual prompts trung thực sau mỗi lần dùng, chứ không nộp prompt library chưa sử dụng như thể đã sử dụng.

---

## 15. Chỉ mục nguồn để đối chiếu nhanh

| Nguồn | Phần cần xem |
|---|---|
| `PA2-rubric-responsive-prototype.pdf` | Tr. 1–2: build/submission; tr. 2–3: PROTOTYPE & rubric; tr. 3–6: 7 tiêu chí; tr. 6–7: ZIP/late/honesty |
| `ClubFlow-final-project-brief.pdf` | Tr. 2–4: Executive flow, conditions & exception; tr. 4–5: scope; tr. 5–6: Fix these; tr. 6–8: 3 screens & wireframes; tr. 9–10: product owners |
| `ClubFlow_Business_Description-1.docx` (Google Docs link ở mục 0) | Các mục 3–5, BR-01…BR-14, vai trò/giới hạn dữ liệu |
| `CSC13008 Code That Waits (Copy) (PA2).md` | Session 5, phần PA#2, DevTools JS OFF, viewport & screenshots |
| `AI-LOG(20261108-105345).md` | Entry format; khai AI trung thực; Changed/Rejected |
| `SELF_ASSESSMENT_REPORT template(8).pdf` | Các phần evidence, *What I did not manage*, honesty adjustment (template có ví dụ IA#1; **đổi sang 7 tiêu chí PA#2**) |

**Quy định cập nhật Source of Truth:** Nếu nhóm đổi fixture/stack/file paths hoặc giảng viên công bố clarification chính thức, thêm ngày, người quyết định, lý do và danh sách file bị ảnh hưởng; đồng bộ HTML, CSS, test, screenshots, brief/AI-LOG và PROTOTYPE. Không sửa văn bản [R]/[F] để hợp thức hóa sản phẩm thiếu tính năng.

---

### Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | 08/11/2026 | Tổng hợp rubric + final brief + business v1.1 + course templates; chuẩn hóa dữ liệu mẫu, xung đột và cơ chế nghiệm thu. |
| 1.1 | 08/11/2026 | Đổi vai Huy/Học: Huy setup, Screen 1 và merge; Học Screen 2; Phúc Screen 3. Chốt đúng 1 task/1 feature branch, CSS tách quyền sở hữu, handoff/merge protocol và liên kết với `brief.md`. |
| 1.2 | 08/11/2026 | Làm rõ ClubFlow được chọn từ PA#1 nhóm khác; nhóm Huy/Học/Phúc tạo GitHub repository PA#2 **mới từ đầu**. Thay lệnh clone repo PA#1 bằng tạo remote trống, `git init -b main`, commit rules đầu tiên, push baseline, mời collaborators, chia ba nhánh và Huy merge. Phân biệt *same team* với *same repository*, ghi nhận khác biệt giữa slide và final brief. |
| 1.3 | 08/11/2026 | Cập nhật tên repository mới thành `clubflow` (không gắn với riêng PA#2) để tiếp tục dùng ở PA#3–PA#6; giữ nguyên ba nhánh `pa2/...` và quy trình Huy merge. |
