---
globs:
  - "experiments/*.md"
---

# Experiment files

Loads only when a file under `experiments/` is being edited.

- Never set `status: live` while `baseline` or `primary_metric` is blank. Fill both first or leave the status at `planned`.
- `window_end` is a date, not a duration. "3 weeks" is not a window; `2026-01-31` is.
- Moving a file from `live` to `measured` needs a result line in the body. A status change with no number is a kill, so mark it `killed`.
- A `killed` experiment keeps its file. Delete nothing; the retro reads the graveyard.

Copy this file to `.claude/rules/experiments.md`, link it from `CLAUDE.md`, then run `check-rules.sh`.

## Related

- [README.md](README.md): what path-scoped rules are and how to run the check
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md): the frontmatter this rule polices
- [../../GLOSSARY.md](../../GLOSSARY.md): the status enum
