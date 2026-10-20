# growth-agents for any coding agent

This file is for agents that are not Claude Code: Codex, Hermes, OpenClaw, or anything that can read files and run shell commands. Claude Code users get all of this from the plugin install.

## Two folders, never one

- **The plugin** is this repo, wherever it was cloned. Treat everything in it as documentation.
- **The work folder** is where the user's goals, experiments and retros live, for example `~/growth` or a folder inside `docs/` in their own repo. Never write the user's live files into this repo: it is public, and a pull would collide with them.

If the user opened this repo itself as their workspace, say so once and offer to create a separate work folder before doing anything else.

## At the start of every session

Run the briefing from the work folder and show its output before anything else:

```
cd <work folder> && bash <path to this repo>/hooks/session-start.sh
```

It reads only, never writes, and prints the mission, quarter, month, week, today and any experiment past its window. Outside Claude Code nothing runs it automatically, so it is your job to run it each session.

## Slash commands are skill files

Claude Code users type `/growth-setup` or `/standup`. When the user asks for one of these, read the matching file in this repo and follow it in the work folder:

| The user says | Read and follow |
|---|---|
| `/growth-setup`, "set me up" | `skills/growth-setup/SKILL.md` |
| `/standup`, "what should I do today" | `skills/morning-standup/SKILL.md` |
| `/weekly-retro` | `skills/weekly-retro/SKILL.md` |
| `/monthly-retro` | `skills/monthly-retro/SKILL.md` |
| any other `/<name>` | `skills/<name>/SKILL.md` |

## Translating Claude Code features

- Where a skill says `AskUserQuestion`, ask the same question in plain chat, with the options as a numbered list.
- Where a skill says to run subagents, run the steps one after another if you cannot run them in parallel.
- Where a skill says `$CLAUDE_PLUGIN_ROOT`, use the path to this repo.

## Which folder a path means

Paths to skills, rules, templates and examples (`skills/`, `rules/`, `experiments/TEMPLATE.md`, `GLOSSARY.md`) are in this repo. Paths to the user's own files (`goals/MISSION.md`, `goals/okrs/`, `retros/`, `experiments/<slug>.md`, `PROFILE.md`) are in the work folder. When a skill or `CLAUDE.md` names a live file, read and write it in the work folder.

## Rules

Read `CLAUDE.md` in this repo before acting. Its read order, the three experiment rules and the standing rules apply to you exactly as they do to Claude Code. The vocabulary is fixed in `GLOSSARY.md`.

## Related

- [CLAUDE.md](CLAUDE.md) - the read order and standing rules
- [README.md](README.md) - what this is and how to install it
- [GLOSSARY.md](GLOSSARY.md) - the fixed vocabulary
- [skills/growth-setup/SKILL.md](skills/growth-setup/SKILL.md) - the first thing to run
