# CODEX_TO_HERMES

Project: C:\Users\ZEKUA\OneDrive\Documents\website
Last updated by Codex: 2026-06-13

## Summary of changes
- Fixed sticky-header anchor overlap with a small CSS-only offset.
- Added a shared `--anchor-offset` custom property.
- Added `scroll-padding-top` on `html` so in-page navigation accounts for the sticky header.
- Added `scroll-margin-top` to anchored sections and the internal `#reference` block.
- Added a mobile override that reduces the offset to `16px` because the topbar becomes `position: relative` under the existing mobile breakpoint.
- Did not change RFQ/mailto content, did not add a backend, and did not add PDFs.

## Files changed
- `styles.css`
- `.hermes-codex/CODEX_TO_HERMES.md`
- `preview-contact-anchor-desktop.png` was regenerated as a verification screenshot.
- `preview-contact-anchor-mobile.png` was regenerated as a verification screenshot.

## Verification performed
- Read required handoff files first:
  - `Get-Content -LiteralPath '.hermes-codex\HERMES_TO_CODEX.md'`
  - `Get-Content -LiteralPath '.hermes-codex\DECISIONS.md'`
  - `Get-Content -LiteralPath '.hermes-codex\TASKS.md'`
- Inspected current header/section anchor styles and anchor links:
  - `Get-Content -LiteralPath styles.css -TotalCount 220`
  - `Select-String -Path styles.css -Pattern 'topbar|sticky|fixed|section|scroll|@media' -Context 2,3`
  - `Select-String -Path index.html -Pattern '<section|id="contact"|topbar|href="#contact"' | Select-Object LineNumber,Line`
- Render-verified anchor behavior with bundled Playwright by clicking `a[href="#contact"]` from the loaded page and waiting for smooth scroll to settle.
- Desktop Playwright measurement after clicking `#contact`:
  - `headerPosition`: `sticky`
  - `headerBottom`: `85`
  - `contactTop`: `223.75`
  - `contactHeadingTop`: `363.359375`
  - `contactHeadingVisible`: `true`
  - `headingClearOfHeader`: `true`
- Mobile Playwright measurement after clicking `#contact`:
  - `headerPosition`: `relative`
  - `contactTop`: `32.40625`
  - `contactHeadingTop`: `148.40625`
  - `contactHeadingVisible`: `true`
  - `headingClearOfHeader`: `true`
- Regenerated and visually checked:
  - `preview-contact-anchor-desktop.png`
  - `preview-contact-anchor-mobile.png`
- Ran syntax/quality checks:
  - `node --check app.js`
  - `git diff --check`
  - Both passed with no output.
- Verified CSS offset locations:
  - `Select-String -Path styles.css -Pattern 'anchor-offset|scroll-padding-top|scroll-margin-top' | Select-Object LineNumber,Line`
  - Confirmed `--anchor-offset`, `scroll-padding-top`, section/hero/reference `scroll-margin-top`, and mobile override are present.
- Checked touched file status:
  - `git status --short styles.css preview-contact-anchor-desktop.png preview-contact-anchor-mobile.png .hermes-codex\CODEX_TO_HERMES.md`
  - Result: touched files are untracked in git, consistent with the broader project state.

## Open questions / risks
- The desktop contact anchor now clears the sticky header, but because `#contact` is near the lower part of the page, the exact top position can still vary with viewport height and available content below the section.
- The mobile header is not sticky under the existing breakpoint, so the mobile offset is intentionally small.
- The refreshed screenshots are verification artifacts; Hermes/user should decide whether preview PNGs belong in the eventual committed project.

## Suggested next task
- Do a small navigation polish pass: verify all in-page anchors (`#products`, `#reference`, `#applications`, `#quality`, `#contact`) land cleanly on desktop and mobile, then optionally add active-link styling or anchor-specific screenshots only if needed.
