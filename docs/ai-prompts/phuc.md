# Phúc - actual assistant prompts

Date: 2026-11-08 (Asia/Saigon). Exact send times were not recorded.
Tool: Claude Code (VS Code extension), model Claude Sonnet 5.5 (`claude-sonnet-5-5`).
Branch: `pa2/phuc-schedule`. Task: PHUC-01 (Interview Scheduling) only.

PROMPT 00 and PROMPT 04 from `brief.md` were **not** sent in this interaction. The
prompts below are the messages that were actually sent, in order. Messages are in
Vietnamese; each is followed by an English gloss. The repository rules file
`AGENTS.md` was loaded automatically by the tool as project instructions.

## 1. First message - read the repo and list the work

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

## 2. Second message - do all the work

```text
đây là môn sử dụng ai agent để coding, tôi cần bạn làm toàn bộ việc cho tôi luôn, bạn dùng playwright hay gì đó chụp screenshot giúp tôi luôn, nói chung làm hết việc giúp tôi, đầy đủ đúng quy trình commit đầy đủ, để tác giả là tôi nhé,
```

Gloss: this course is about using an AI agent to code; do the whole task, use
Playwright or similar for screenshots, follow the full commit process, author is me.

## 3. Third message - git identity

```text
không cần phải chỉnh git config tên user gì đâu nha, để yên là được
```

Gloss: do not change the git user name/email configuration; leave it as it is.
The commits therefore use the already configured identity on this machine.

Assistant output: see [the actual task log](../ai-logs/phuc.md).
