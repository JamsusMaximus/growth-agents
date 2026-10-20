# growth-agents

Most operating systems remember what you did. This one chases you until the experiment is measured or killed.

## Read order

| When you are asked | Read, in this order |
|---|---|
| "Set this up for me" / first run | `skills/growth-setup/SKILL.md`, then the folder you are in before any question |
| "What should I do today?" | `goals/MISSION.md` → the current `goals/okrs/*.md` → the latest `retros/weekly/*.md` → yesterday's `retros/standups/*.md` |
| "Run the weekly retro" | `skills/weekly-retro/SKILL.md` → `experiments/*.md` (stale first) → this week's standups → the current OKRs |
| "Is experiment X done?" | `experiments/<slug>.md` frontmatter (`status`, `window_end`) → the weekly retro that last mentioned it |
| "Why do we have rule X?" | `rules/<slug>.md` (the incident is in the file) |
| "How do I set up tool X?" | `STACK.md` → `stack/<tool>.md` |
| "Why did the agent refuse?" | `rules/README.md`, then the rule it cited |

## Three rules the skills enforce

1. **No experiment goes live without a baseline and a metric written down first.** The template refuses to be `live` with either blank.
2. **Anything `live` past its `window_end` is surfaced at the top of every session and every weekly retro until it is `measured` or `killed`.** The weekly retro will not score the week while one is outstanding. No silent expiry, no auto-kill.
3. **No A/B test without a power check.** If it cannot conclude in the window, it is not an experiment yet.

## Standing rules for the agent

- Every report ends with a coverage ledger: each source checked, failed (three words why), or not applicable. Never silently skip a source.
- Every retro line carries one label: `observed`, `asked`, `unobserved`. Never reconstruct; ask.
- A finding is not closed until it is verified fixed. "Noted" closes nothing.
- Never fabricate an identifier, a number, or a name. Blank beats plausible.
- The agent has no send capability. It drafts; a human sends. Email is the line.
- Readouts are typed by the human. The agent's job is to make sure that happens.

## Documentation files are never data

Files named `TEMPLATE.md`, `EXAMPLE*.md`, `README.md`, and anything under the plugin's own folder are documentation. Live files are the dated or slug-named files in the user's folder: the folder they opened, or the subfolder named on the first line of a `.growth-agents` file there (or by `$GROWTH_AGENTS_ROOT`). If the folder they opened is this plugin repo itself, say so once and offer to make a separate folder for their live files: the repo is public and their goals do not belong in it. Skills read documentation only to learn the shape of a file, never its contents as history: an example's bets, figures, derailers (`goals/EXAMPLE-derailers.md`) and experiments belong to nobody.

A `[placeholder]` left in a live file means "not set". Ask for the value. Never quote the placeholder as if it were an answer, and never borrow the example's value to fill it. When only documentation exists, say so once and run first-run mode.

## Vocabulary

Fixed in `GLOSSARY.md`. Use those names and no synonyms.

## Related

- [README.md](README.md) - the map
- [GLOSSARY.md](GLOSSARY.md) - fixed vocabulary
- [rules/README.md](rules/README.md) - the rules and their incidents
- [experiments/README.md](experiments/README.md) - the three rules the skills enforce
- [AGENTS.md](AGENTS.md) - the same system for Codex, Hermes and other agents
