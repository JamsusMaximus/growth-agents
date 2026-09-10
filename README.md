# growth-agents

**Most operating systems remember what you did. This one chases you until the experiment is measured or killed.**

- Open Claude Code: before you type a word, it tells you which experiment is overdue.
- Run `/weekly-retro`: it refuses to score the week until that experiment has a result or a written kill.
- Everything else in here exists to make that stick.

## The team

Each hire is a skill you invoke. Roles, never people. Full roster with what each reads and writes: [ROSTER.md](ROSTER.md).

| Role | Skill | When |
|---|---|---|
| Chief of staff | `/standup` | every working day |
| Head of growth | `/weekly-retro` | every Friday |
| The board | `/monthly-retro` | first week of the month |
| Critic bench | `/multi-agent-refine` | before anything ships |
| On call | `/seo-audit`, `/tone-of-voice`, `/linkedin-post`, `/copywriting-hooks`, `/humanizer`, `/youtube-package`, `/vidiq-competitive`, `/skill-iterator` | when you ask |

**The engine** (written for this repo): `morning-standup`, `weekly-retro`, `monthly-retro`, `multi-agent-refine`, `tone-of-voice`, `linkedin-post`.

**Installed alongside, credited:** `seo-audit` (Corey Haines, MIT, pinned at the version the scripts were written against), `copywriting-hooks` (samber, MIT), `humanizer` (blader, MIT), `youtube-package` and `vidiq-competitive` (re-authored here; need the vidIQ MCP), [`skill-iterator`](skills/skill-iterator/SKILL.md) (how to add a hire of your own; builds on Anthropic's skill-creator). The `/standup` alias lives in [commands/standup.md](commands/standup.md).

## What changes in your first month

| You get | How |
|---|---|
| **Experiments that finish** | Nothing goes `live` without a baseline, a metric and a window. No A/B test without a power check. Anything past its window is chased every session until it is measured or killed. |
| **Held to your goals daily** | Mission and annual goals → quarter OKRs → 2–3 bets a week → one thing that must be true by tonight. Next morning opens with the verdict. A slip that repeats becomes a bet, not a to-do. |
| **Claude does more** | The standup reads your calendar, tasks, inbox and experiments through the tools you connect. The critic bench runs 3–4 sceptical sub-agents before anything ships. Twelve skills, one plugin. |
| **A system that learns** | Every rule cites the incident that created it. A weekly prompt proposes edits to its own instructions; you say yes or no. |
| **No invented numbers** | Every report ends with a ledger of what was checked. Every retro line is `observed`, `asked` or `unobserved`. Readouts are yours to type; the agent makes sure you do. |

## The map

| Folder | What it is | Start with |
|---|---|---|
| `experiments/` | One folder, one template, one lifecycle: `planned → live → measured` or `killed`. The three rules the whole system enforces. | `experiments/README.md` |
| `goals/` | The year in one line plus the annual goals behind it; quarterly OKRs from behaviours you control; your derailers, the agent's coaching notes on how you lose a week. | `goals/MISSION.md` |
| `retros/` | Daily, weekly, monthly templates plus the compounding ledger: what now pays off with your hands off it. | `retros/weekly/TEMPLATE.md` |
| `principles/` | One file per rule, each with the incident that created it. | `principles/README.md` |
| `stack/` | Twenty-one tools, one page each: what for, MCP or API or CLI, setup, quirks. Vendor names live here and nowhere else. | `STACK.md` |
| `reference/` | The self-improvement prompt, path-scoped rules with the check that proves they load, a link checker. | `reference/README.md` |

## Install (2 minutes, inside Claude Code)

1. `/plugin marketplace add JamsusMaximus/growth-agents`
2. `/plugin install growth-agents@growth-agents`
3. Open Claude Code in the folder where your goals and experiments will live. The first session prints this from the example files:

```
Showing example files where you have no live ones yet. Run /standup to start.
Mission   2,000 people on the email list and £5,000/month from the digital product by 31 Dec
Quarter   O1 Grow the email list from 1,000 to 2,000 · O2 Lift the pricing page checkout rate from 3.2%
Month     No experiment stays `live` past its window. The weekly retro is not scored while one does.
Week      Second pricing test live by Tuesday, copy as it stands (KR2.1) · Publish Tuesday before opening the…
Today     Second pricing test is `live` with baseline, metric and window_end filled, copy as it stands
Stale     EXAMPLE-live-stale · 21 days over (example)
```

4. Type `/standup`. It creates `goals/`, `retros/` and `experiments/` from the templates and asks you one question: what must be true by tonight?

Prefer to clone? `git clone`, open the folder in Claude Code, and the same hook runs from `.claude/settings.json`.

## Can I use this at work?

Yes, for your own use and inside your team. CC BY-NC 4.0 on the original work here rules out reselling the templates; vendored skills keep their own MIT licences. See `LICENSES.md`.

## Next

v1.1: a readout adapter for one analytics tool, so the chase can also fetch the number.

Built by James McAulay, who teaches this at [agentaccelerator.ai](https://agentaccelerator.ai/?ref=growth-agents).

## Related

- [ROSTER.md](ROSTER.md) - the hires
- [GLOSSARY.md](GLOSSARY.md) - the fixed vocabulary every file uses
- [CLAUDE.md](CLAUDE.md) - the read order and the standing rules for the agent
- [experiments/README.md](experiments/README.md) - the spine that chases
- [principles/README.md](principles/README.md) - the rules and their incidents
