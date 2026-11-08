# ClubFlow PA#2 evidence

## Screen 1 - Create Recruitment Campaign

Evidence supplied by Huy on 2026-11-08 and inspected in this Codex session.
Files were copied unchanged from the team's local `ClubFlow-evidence` folder;
source and destination SHA-256 hashes match. The repository layout follows
the `screenshots/` and `checks/` directories in Source of Truth.

| Evidence | Observation |
| --- | --- |
| [Mobile screenshot](../screenshots/index-360.png) | Named viewport 360px; image is 720 x 16236 pixels. Sections stack in one column. |
| [Tablet screenshot](../screenshots/index-768.png) | Named viewport 768px; image is 1536 x 10844 pixels. Position cards use two columns. |
| [Desktop screenshot](../screenshots/index-1280.png) | Named viewport 1280px; image is 2560 x 7770 pixels. Form and summary sidebar appear side by side. |
| [W3C Nu result](validator-index.pdf) | User-run File Upload for index.html, vnu 26.11.5: no errors or warnings. Printed time: 2026-11-08 21:58, Vietnam time. |

The screenshot dimensions are consistent with 2x capture scaling. They do not
independently establish the CSS viewport width or devicePixelRatio setting.
No layout overlap or horizontal clipping was observed in these captured states.
Campaign and slot previews are closed in the three supplied screenshots.

## Scope and remaining checks

- These files document Screen 1 only. Review and scheduling evidence is pending.
- The assistant inspected the supplied W3C PDF; it did not run that upload.
- Screenshots do not prove JavaScript-disabled/offline configuration, overflow
  expressions, keyboard behavior, or DevTools Accessibility/contrast inspection.
- Earlier local browser checks and native-interaction observations are recorded
  separately in [Huy's actual AI log](../docs/ai-logs/huy.md).
- Main-flow navigation needs checking after review.html and schedule.html are
  integrated. Repeat affected checks and evidence if the final code changes.
- This is not a full accessibility conformance report or a self-assessment score.
