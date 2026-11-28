# ClubFlow PA3 self-assessment

## Team and basis

| Student ID | Name |
| --- | --- |
| 24127044 | Lê Nguyễn Quốc Học |
| 24127177 | Thái Quang Huy |
| 24127505 | Trần Hoàng Phúc |

**Team-approved self-assessment: 99/100.** The team approved the scores below on 28 November 2026. The PA2 assessment is available in Git at `481144c`.

This assessment uses the published creation-to-release run at `edb3d26` and the subsequent [workspace audit](checks/PA3_WORKSPACE_AUDIT.md), based on `a9b9893`. The [frontend guide](FRONTEND.md) contains the run instructions, role routes and test entry points.

## Nine rubric criteria

| Criterion | Maximum | Team claim | Evidence |
| --- | ---: | --- | --- |
| 1. Whole main flow in React | 25 | 25 | [C1–C11 QA](checks/PA3_RELEASE_QA.md) covers campaign creation, setup, application, screening, scheduling, assessment and one final publication through Vite preview. Separate owner results and notifications were verified. |
| 2. Routing, sign-in and shared state | 10 | 10 | [Routes and demo accounts](FRONTEND.md#routes) describe the three roles, direct URLs, return after sign-in and shared session. The audit opens the routes directly across all five demo accounts with browser requests restricted to localhost. The QA report records cross-role and owner checks. |
| 3. Data from the API with loading, error and empty states | 10 | 10 | [Mock run instructions](FRONTEND.md#how-to-run-it), [API documentation](docs/api/README.md) and the workspace audit show the source of displayed data and exercise loading, empty results and independent retries. |
| 4. Forms | 10 | 10 | The browser QA covers campaign and setup inputs, distinct application availability windows, screening, scheduling and results. The audit exercises validation focus and prevents a generation action from dropping an unapplied schedule choice. |
| 5. Contract and mock | 15 | 15 | [Endpoint docs and examples](docs/api/README.md) are checked in. Four mock modes are documented. The audit records the Node tests and the course contract checker results. |
| 6. Responsive, semantic and valid UI | 5 | 5 | The workspace audit records Chrome measurements at 360, 768 and 1280 px and W3C Nu results for browser-rendered states. |
| 7. Brief and assistant rules | 10 | 10 | [Brief and sent prompts](brief.md) and [assistant rules](AGENTS.md) document the API, design and review boundaries, and preserve recorded team messages, including the [six verbatim prompts for PR #5](brief.md#publication-api-evidence-from-pr-5). |
| 8. AI log | 10 | 10 | [Consolidated log](AI-LOG.md#pa3) and linked member logs record prompts, changes, decisions and verification. |
| 9. Commit history | 5 | 4 | The contract (`7e4570e`), mock (`90db813`) and React scaffold (`a8d9745`) have separate commits. The [T2](docs/ai-logs/huy.md#t2-follow-up--staged-mock-review) and [T3](docs/ai-logs/huy.md#t3-follow-up--staged-scaffold-review) reviews and repairs took place in the staged changes before the respective implementation commits, so those follow-ups have no separate checkpoints. |
| **Total** | **100** | **99** | The approved total is used in the archive filename. |

## What we did not manage

The schedule page still lacks a leave-page prompt for edits that have not been saved. A separate screening rejection notification remains an open product decision. Chrome and the disposable mock provide the browser evidence. Physical-device checks and verification of the final extracted submission archive remain pending.

## What we would do differently

Test destructive actions while a form contains unapplied edits, add failure-mode checks alongside the happy path, and update the self-assessment when the rubric changes.

## Packaging

After the team approves the final revision, build the client and package a standalone repository folder with the real hidden `.git/` directory and built `client/dist/`. Exclude every `node_modules/` folder and name the archive `24127044-24127177-24127505_99.zip`. Extract it to a fresh location and verify the tree, build, Git history and score against the filename.
