# ClubFlow shared CSS contract

Owner: Thái Quang Huy (24127177), maintained on `main`.
Scope: HUY-SETUP, shared foundation only. This document describes the implemented
CSS API, not completed screens or backend functionality.

## Loading and ownership

Every page loads `css/styles.css` first and exactly its own stylesheet second:

| Feature branch | Page | Second stylesheet | Owner |
| --- | --- | --- | --- |
| `pa2/huy-campaign` | `index.html` | `css/campaign.css` | Huy |
| `pa2/hoc-review` | `review.html` | `css/review.css` | Học |
| `pa2/phuc-schedule` | `schedule.html` | `css/schedule.css` | Phúc |

Feature branches consume these tokens and classes; propose shared changes to Huy.
Use page classes for screen-specific layout. Do not redefine shared classes or
tokens globally in a page stylesheet. Shared rules provide appearance and layout;
HTML authors remain responsible for semantics, content, state and real links.
There are no runtime dependencies, remote assets, fonts, scripts or build commands.

## Visual direction and tokens

Use a blue primary action, neutral surfaces, explicit status text and system fonts.
Each screen chooses one primary focus. Preserve body/control text at 16px or above.
The root font follows the user's default; rem measurements below assume 16px.

| Tokens | Values / intended use |
| --- | --- |
| `--space-1`, `--space-2`, `--space-3` | 0.25 / 0.5 / 0.75rem = 4 / 8 / 12px |
| `--space-4`, `--space-6`, `--space-8` | 1 / 1.5 / 2rem = 16 / 24 / 32px |
| `--text`, `--muted` | `#0f172a`, `#475569`; body and secondary text |
| `--bg`, `--surface` | `#f8fafc`, `#ffffff`; page and panels |
| `--primary`, `--primary-hover`, `--primary-soft` | `#1d4ed8`, `#1e40af`, `#eff6ff` |
| `--border`, `--control-border` | `#cbd5e1` for separation, `#64748b` for controls |
| `--success`, `--success-soft` | `#166534`, `#f0fdf4` |
| `--warning`, `--warning-soft` | `#854d0e`, `#fffbeb` |
| `--danger`, `--danger-soft` | `#991b1b`, `#fef2f2` |
| `--neutral`, `--neutral-soft` | `#334155`, `#f1f5f9` |
| `--focus` | `#0f172a`; 3px outline with a white separation ring |
| `--font-sans` | system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |
| `--radius-sm`, `--radius-md`, `--radius-pill` | 0.5rem, 0.75rem, 999px; geometry, not spacing |
| `--target-min` | 2.75rem = 44px minimum control height |
| `--content-max` | 80rem ceiling on a full-width fluid container |
| `--field-min` | 16rem preferred minimum form column width; can shrink to 100% in a narrower container |

Use spacing tokens for margins, padding and gaps. Borders, focus outlines, text
sizes, line heights, target sizes and radii have separate purposes. Do not use
`--border` as text. Status colors belong on their matching soft surface or white;
primary buttons use white on primary blue. Check any new pairing in the browser.

## Layout and shell classes

| Class | Contract |
| --- | --- |
| `.container` | Full available width up to 80rem; centered; horizontal padding 16 / 24 / 32px at the three layouts |
| `.stack` | Vertical flex layout with a 16px gap |
| `.cluster` | Wrapping flex row, centered items, 12px gap |
| `.grid` | One column using `minmax(0, 1fr)`, 16px gap |
| `.grid--two` | With `.grid`, two equal columns from 48rem |
| `.grid--three` | With `.grid`, three equal columns from 80rem; combine with `.grid--two` for a 1 / 2 / 3 progression |
| `.grid--fields` | With `.grid`, fit as many columns as the container permits at a preferred minimum of 16rem each; use for date/time fields inside panels |
| `.actions` | Wrapping 12px action group; buttons and `.button` links fill the row below 48rem, intrinsic width above |
| `.app-header` | White header with bottom border and 16px block padding |
| `.brand` | 20px bold product name; if linked, also use `.button` or another 44px link class |
| `.app-nav` | Use on `nav`, with a `ul` of `li` anchors; wrapping links with 44px minimum height |
| `.steps` | Use on an ordered list inside labeled `nav`; one column, three from 48rem; link or `.step-label` in each item |
| `.step-label` | Noninteractive step text with the same dimensions as step links |
| `.page-heading` | 24px block padding around the page title/intro |
| `.panel`, `.panel-header` | Bordered white surface; padding 16px, then 24px from 48rem; optional header bottom margin 16px |
| `.text-muted`, `.field-help` | Secondary text, same inherited readable text size |
| `.stat-value` | 28px bold number with tabular digits; supply a visible text label |
| `.page-footer` | 32px top margin, 24px block padding, separator, secondary text |
| `.skip-link` | Use with `.button` and an existing main ID; appears on keyboard focus |

All direct children of the layout utilities can shrink. Long text wraps naturally;
`overflow-wrap: anywhere` prevents an unbroken identifier from widening the page.
Use real landmarks, one h1, an unbroken heading hierarchy, labeled navigation,
`aria-current="page"` for the current page and `aria-current="step"` for its step.
Keep step numbers in the HTML. CSS must not supply essential content.

The two/three-column utilities respond to the viewport. Nested panels may have
less space: use `.grid--fields` or a single `.grid` for form rows there. In the
setup fixture, two datetime-local inputs in a nested `.grid--two` clipped their
time segments at 768px despite no document overflow. The container-aware form
grid keeps those fields on separate rows until both fit. Inspect native controls
visually; bounding-box checks alone cannot detect their internal text clipping.

Breakpoints are `@media (min-width: 48rem)` and `@media (min-width: 80rem)`.
They correspond to 768px and 1280px at the default font setting. They are layout
choices; the required test viewport widths remain exactly 360, 768 and 1280px.

## Controls and disclosure

| Class / element | Contract |
| --- | --- |
| `button`, `.button` | Wrapped centered text, 44px minimum height, visible border; `.button` is for an anchor with a real destination |
| `.button--primary` | White on blue; one main action per screen |
| `.button--danger` | Dark red text on white; destructive action illustration |
| `button:disabled` | Muted text on neutral background, no opacity reduction; real native disabled state |
| `.field` | One-column grid with 8px gaps for label/control/help/error |
| `fieldset`, `legend` | Group related controls; legend supplements individual labels |
| Text-like `input`, `select`, `textarea` | Full fluid width, inherited font, 44px minimum height; textarea resizes vertically |
| `.choice` | Checkbox/radio plus associated visible label in a flexible row |
| `.field-error`, `[aria-invalid="true"]` | Error text and red control border; associate explanation with `aria-describedby` |
| `details`, `summary`, `.disclosure-body` | Native no-JS disclosure; keep summary visible, body padded, no overlay |

Example of a field (illustrative documentation, not a campaign screen):

```html
<div class="field">
  <label for="campaign-name">Tên chiến dịch</label>
  <input id="campaign-name" name="campaign-name" type="text" required
         aria-describedby="campaign-name-help">
  <p id="campaign-name-help" class="field-help">Nhập tên hiển thị cho ứng viên.</p>
</div>
```

For an actual error, add `aria-invalid="true"`, a visible specific `.field-error`
with its own ID, and that ID to `aria-describedby`. CSS does not implement
validation across fields. Do not show every untouched required input as an error.
The baseline styles text/search/email/date/time/datetime-local/number inputs,
selects, textareas and `.choice` checkbox/radio controls. Other input types need
the owning page's review. Use `button` for action controls rather than input buttons.

Focus-visible outlines apply to anchors, buttons, inputs, selects, textareas,
summaries and focusable regions. Do not remove them. Native disabled only applies
to actual controls: adding a disabled-looking class or `aria-disabled` to a link
does not prevent navigation. For unavailable routes, use noninteractive text.
Every other standalone link needs `.button`, navigation styling or a page-owned
44px treatment; ordinary inline prose links retain native inline dimensions.

## Statuses, messages and tables

| Class | Intended appearance |
| --- | --- |
| `.badge` | Neutral bordered text badge |
| `.badge--info` | Blue / light blue |
| `.badge--success` | Green / light green |
| `.badge--warning` | Brown / light amber |
| `.badge--danger` | Dark red / light red |
| `.notice` | Blue-tinted message with a thicker start border |
| `.notice--warning`, `.notice--danger` | Amber or red message |
| `.table-scroll` | The only shared horizontal scrolling region; wraps one semantic table |

Always include the status name and a reason where needed. Color does not decide
whether an application is Shortlisted, Proposed, Conflict, Unassigned or Confirmed.
The page owns the fixture, counters and confirmation gate. CSS implements none of
these business decisions. Use headings for static notices; reserve live-region
roles for actual updates rather than decorative static banners.

For a table that needs horizontal scrolling, use a labeled, keyboard-focusable
wrapper and a real caption, headers and `scope` attributes. If needed, set the
table's own minimum width in page CSS; do not widen the wrapper or the document.

```html
<div class="table-scroll" tabindex="0" role="region" aria-label="Hồ sơ ứng tuyển">
  <table>
    <caption>Hồ sơ của chiến dịch CF-2026-01</caption>
    <thead><tr><th scope="col">Mã hồ sơ</th><th scope="col">Trạng thái</th></tr></thead>
    <tbody><tr><th scope="row">A01</th><td>Shortlisted</td></tr></tbody>
  </table>
</div>
```

Do not use `overflow-x: hidden`, fixed overall page widths, nowrap on essential
copy, `!important`, remote assets or frameworks. The foundation adds no motion.
Do not add a generic copyright/legal/support footer. Use a truthful campaign or
prototype context relevant to the screen.

## Handoff verification

The setup's temporary component checks are recorded in `ai-logs/huy.md`. They are
not the nine final screenshots or the three official HTML validator results.
No screen HTML is created by this task. After Huy reviews and commits the shared
baseline, all three feature branches must start from that baseline. Suggested
next commit boundary: `style: establish shared mobile-first design system`.
This setup does not commit, push, invite collaborators or create feature branches.

For every completed page, its owner must:

1. Open the file directly offline with JavaScript disabled. Check every linked
   local file and the shared-first stylesheet order.
2. At 360, 768 and 1280px, verify `clientWidth`, horizontal overflow, right-edge
   bounds and usable layout. Exempt only contents of deliberate table scrollers.
3. Check long Vietnamese content, all standalone targets, keyboard focus, opened
   disclosures, visible labels, heading order and actual foreground/background pairs.
4. Run W3C Nu File Upload on the final HTML and save the result; inspect DevTools
   Accessibility and contrast separately. A component check does not replace this.
5. Record real evidence and limitations; preserve the canonical counts/timeline
   and ownership contract. Huy integrates the final English submission documents.
