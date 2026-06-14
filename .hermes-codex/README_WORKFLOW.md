# Hermes + Codex Desktop workflow

This project is set up for async collaboration between Hermes and Codex Desktop.

## Files

- .hermes-codex/HERMES_TO_CODEX.md â€” Hermes writes instructions for Codex.
- .hermes-codex/CODEX_TO_HERMES.md â€” Codex writes its response for Hermes.
- .hermes-codex/DECISIONS.md â€” Durable project decisions both agents should respect.
- .hermes-codex/TASKS.md â€” Shared lightweight task board.
- .hermes-codex/prompts/CODEX_START_PROMPT.md â€” Prompt to paste into Codex Desktop.
- START_CODEX_DESKTOP.cmd â€” Opens Codex Desktop in this project and copies the start prompt to the clipboard.

## Normal loop

1. Hermes updates .hermes-codex/HERMES_TO_CODEX.md.
2. Run START_CODEX_DESKTOP.cmd, or run hc-pair open from this project.
3. Paste the copied prompt into Codex Desktop.
4. Codex reads HERMES_TO_CODEX.md, works, and writes CODEX_TO_HERMES.md.
5. Hermes reads CODEX_TO_HERMES.md, checks git diff/files/tests/screenshots, then writes the next handoff.

## Commands

From any project folder:

    hc-pair init
    hc-pair open
    hc-pair status
    hc-pair next --task "Your next Codex task"

Or specify a path:

    hc-pair init "C:\Users\ZEKUA\OneDrive\Documents\website"
    hc-pair open "C:\Users\ZEKUA\OneDrive\Documents\website"
