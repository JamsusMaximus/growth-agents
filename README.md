# growth-agents

**Most operating systems remember what you did. This one chases you until the experiment is measured or killed.**

A planning system for Claude Code: templates for the year, quarter, month, week and day, and the agent skills that run the ritual. Every time you open a session the agent lists every experiment past its window before you type a word. The weekly retro will not score the week until each one is marked measured or killed. Readouts are yours to type; the agent's job is to make sure you do.

It is the operating system one person runs an online business on, with the data taken out and the templates left in: a goal cascade from the year down to today, an experiment log with three rules, the principles the agents are held to, the tools they call, and the skills that do the work.

## Install

You need [Claude Code](https://claude.com/claude-code). Both lines below are typed into a Claude Code session, not a shell.

```
/plugin marketplace add JamsusMaximus/growth-agents
/plugin install growth-agents@growth-agents
```

These are typed inside Claude Code. Then open Claude Code in the folder where you want your goals, retros and experiments to live. Before you have written anything, the hook prints this from the example files:

```
Showing example files where you have no live ones yet. Run /standup to start.
Mission   2,000 people on the email list and £5,000/month from the digital product by 31 Dec
Quarter   O1 Grow the email list from 1,000 to 2,000 · O2 Lift the pricing page checkout rate from 3.2%
Month     No experiment stays `live` past its window. The weekly retro is not scored while one does.
Week      Second pricing test live by Tuesday, copy as it stands (KR2.1) · Publish Tuesday before opening the…
Today     Second pricing test is `live` with baseline, metric and window_end filled, copy as it stands
Stale     EXAMPLE-live-stale · 21 days over (example)
```

Run `/standup`: it creates the folders from the templates, and the example lines give way to yours one file at a time. Prefer to clone? `git clone`, open the folder in Claude Code, and the same hook runs from `.claude/settings.json`; skills load from `skills/`. Other tools: copy `skills/` to wherever yours reads skills from (untested outside Claude Code).

## The map

| Folder | What it is | Start with |
|---|---|---|
| `experiments/` | One folder, one template, one lifecycle: `planned → live → measured` or `killed`. Three rules: baseline and metric before live; anything live past its window is surfaced every session and every retro until resolved; no A/B without a power check. | `experiments/README.md` |
| `goals/` | The year in one line with a number and a date, your named derailers, and quarterly OKRs built from behaviours you control. | `goals/MISSION.md` |
| `retros/` | Monthly (altitude, tasks banned), weekly (score the KRs, chase the experiments, pick two or three bets), daily (one thing that must be true by tonight). Each level inherits from the one above and reports back up. | `retros/weekly/TEMPLATE.md` |
| `principles/` | One file per rule, and every rule cites the incident that created it. The agent tells you what it did not check. No number without a sample size. Permission to push back. | `principles/README.md` |
| `skills/` | The team. Roles and cadences below. | [ROSTER.md](ROSTER.md) |
| `stack/` | Twenty-one tools, one page each: what for, MCP or API or CLI, setup, quirks. Vendor names live here and nowhere else. | `STACK.md` |
| `reference/` | What makes it a learning system: a weekly prompt that proposes edits to its own instructions (applied only on a yes), path-scoped rules with the check that proves they still load, and a link checker. | `reference/README.md` |

## The team

**The engine** (written for this repo): `morning-standup`, `weekly-retro`, `monthly-retro`, `multi-agent-refine`, `tone-of-voice`, `linkedin-post`.

**Installed alongside, credited:** `seo-audit` (Corey Haines, MIT, pinned at the version the scripts were written against), `copywriting-hooks` (samber, MIT), `humanizer` (blader, MIT), `youtube-package` and `vidiq-competitive` (re-authored here; need the vidIQ MCP), [`skill-iterator`](skills/skill-iterator/SKILL.md) (how to add a hire of your own; builds on Anthropic's skill-creator).

Full roster with cadences, what each reads and what it holds you to: [ROSTER.md](ROSTER.md). The `/standup` alias lives in [commands/standup.md](commands/standup.md).

## What this is not

Not a knowledge base. Not a dashboard. Not a course. Nothing in it sends email, posts, or writes outside this folder; the agent drafts and a human sends. In v1 every readout is typed by you.

## Can I use this at work?

Yes for your own use and inside your own team. The licence is CC BY-NC 4.0 for the original work here, which rules out reselling the templates; vendored skills keep their own MIT licences. See `LICENSES.md`.

## Roadmap

v1.1: a readout adapter for one analytics tool, so the chase can also fetch.

---

Built by James McAulay, who teaches this at [agentaccelerator.ai](https://agentaccelerator.ai/?ref=growth-agents).

## Related

- [ROSTER.md](ROSTER.md) - the hires
- [GLOSSARY.md](GLOSSARY.md) - the fixed vocabulary every file uses
- [CLAUDE.md](CLAUDE.md) - the read order and the standing rules for the agent
- [experiments/README.md](experiments/README.md) - the spine that chases
- [principles/README.md](principles/README.md) - the rules and their incidents
