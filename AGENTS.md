# ClubFlow PA#2 — Team Assistant Rules

## Authority and scope
- Read `PA2_CLUBFLOW_SOURCE_OF_TRUTH.md` and the official PA#2 rubric and ClubFlow final brief before editing.
- The rubric governs grading/deliverables; the final brief governs the three screens and the eight Fix these issues; business description v1.1 provides supporting business rules.
- Do not claim you read a file that is inaccessible or performed a browser/W3C check that was not run.
- This is **PA#2 static responsive prototype**, not a persistent backend or the final complete system.

## Repository provenance and setup
- ClubFlow is the **classwide** final project selected from a **different PA#1 team's** proposal. Do not assume this group has existing ClubFlow source from its PA#1.
- Huy creates a **brand-new, initially empty ClubFlow PA#2 GitHub repository**, runs `git init -b main` locally, and makes the first commit containing this rules file before shared CSS/screen work begins.
- Do **not** clone, migrate, overwrite or copy `.git` from our old PA#1 repository. Do not copy the winning team's PA#1 source code.
- The rubric requires the **same PA#1 team membership** unless authorized otherwise; that does not by itself say the old repository URL/history must be reused. If the lecturer posts a conflicting repository rule, follow that verified course instruction and update Source of Truth.
- Invite Học and Phúc as collaborators to the new remote; they clone the new ClubFlow repository from `main` after Huy pushes the baseline, then create exactly one feature branch each.

## Technology
- Static semantic HTML5 + plain CSS3, no React in this team plan, no build step, no new dependencies, no CDN assets, no external web fonts.
- Essential content must be present in HTML and readable with JavaScript OFF and offline using `file://`.
- Use relative navigation: `index.html` -> `review.html` -> `schedule.html`; valid relative back links are allowed. Never use `href="#"`, root-relative `/review.html`, missing routes, or `onclick` for main-flow navigation.
- Link `css/styles.css` first and one page stylesheet second. All pages reuse the same design system.

## Branch/ownership contract
- `main` of the **new PA#2 repository**: only Huy initializes, makes the rules-first commit, sets up the shared CSS baseline, reviews/merges all three feature branches, maintains root submission docs and finalizes artifacts.
- `pa2/huy-campaign`: Huy's ONE feature task — `index.html`, `css/campaign.css` and Huy's own prompt/AI logs.
- `pa2/hoc-review`: Học's ONE feature task — `review.html`, `css/review.css` and Học's own logs.
- `pa2/phuc-schedule`: Phúc's ONE feature task — `schedule.html`, `css/schedule.css` and Phúc's own logs.
- Nobody except Huy merges or pushes to `main`. No feature branch edits `css/styles.css` or another teammate's page. No squashing away original feature authorship without an explicit team decision.

## Responsive and CSS
- Mobile-first; test 360px, 768px, 1280px. No horizontal scroll, content clipping/overlap, or fixed overall page width.
- No hiding overflow with `overflow-x:hidden`. Table-only scrolling wrappers are permitted when deliberate.
- Body text >=16px. Independent links/buttons >=44px high at 360px. Body/button text contrast >=4.5:1.
- Shared spacing scale: 4, 8, 12, 16, 24, 32px. Use variables/tokens, fluid grid, Flexbox, `minmax(0,1fr)`, `min-width:0`, `overflow-wrap` as necessary.
- No `!important` in custom CSS; no second CSS framework; system fonts; one clear primary focus per screen.

## HTML, accessibility and navigation
- Valid doctype, `lang`, UTF-8, viewport meta; proper header/nav/main/footer; exactly one h1 per page, no skipped heading levels.
- Visible associated labels for inputs; real buttons for actions and anchors for navigation; every image has suitable alt; accessible names for icon-only controls.
- Zero W3C errors required on **each** page; inspect DevTools Accessibility separately.
- Every link/form action must target an existing local file/route; never invent a missing CV, CSV or settings endpoint.

## Business invariants
- Campaign CF-2026-01: 15–20 Nov 2026 open/close, 21–22 Nov review, 24 Nov interview 09:00–12:00, 20-minute slots.
- 8 independent applications by 7 unique students; 5 Shortlisted, 3 Rejected, 0 Pending.
- A01/A02 belong to ST01 but apply to distinct positions and retain independent decisions.
- Scheduling: exactly 5 shortlisted applications, draft totals 2 Proposed + 2 Conflict + 1 Unassigned. A01/A03 are both in conflict because I01 overlaps at 09:00–09:20; A05 lacks a shared available slot.
- No same sample person is an applicant and interviewer. No false university verification claims.
- Do not confuse Shortlisted, Proposed, Confirmed or final Pass/Fail. Draft cannot be confirmed with conflict/unassigned; confirmation does not publish recruitment results.
- Avoid all 8 Fix these items in the official final brief.

## Assistant workflow and never-list
- Give a short requirement mapping and exact edit scope before editing. Show a precise diff summary and test plan after editing.
- Never silently touch files outside the assigned task, add a dependency, remove `.git`, force-push, rewrite teammate authorship or make undocumented business assumptions.
- Never manufacture test evidence, CV files, commits, prompt history, AI-LOG mistakes, or a full-credit self-score.
- `brief.md` starts as a **ready-to-send prompt pack**. Only actual sent prompts count for rubric evidence; each developer logs real prompts in their own branch for Huy to consolidate.
- Keep real `AI-LOG.md` entries with Tool, Asked for, Kept, Changed and Rejected. Record actual errors and checks, or honestly state none and which checks were run.

## Definition of done
- Each page opens offline, with JS disabled, in a direct file URL.
- At 360, 768, 1280: horizontal overflow expression returns `false`; `document.documentElement.clientWidth` matches the selected width; nothing extends beyond the right viewport edge except contained table wrappers; visual layout is usable.
- The official W3C Nu checker reports zero errors for each HTML file; labels/roles/headings/color contrast are checked; 9 screenshots and 3 validator results reflect the final code.
- Main-flow links, business fixtures and status counts are consistent; `PROTOTYPE.md`, AI-LOG, self-assessment, Git history and ZIP are evidence-backed.
