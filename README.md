# growth-agents

**Most operating systems remember what you did. This one chases you until the experiment is measured or killed.**

Install it, open Claude Code, and before you type a word it tells you which experiment is overdue. Run the weekly retro and it refuses to score your week until that experiment has a result or a written kill. That is the whole product. Everything else exists to make it stick.

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

## What changes in your first month

1. **You run experiments that can finish.** Nothing goes `live` without a baseline, a metric and a window written down. No A/B test without a power check that says it can conclude. Half-finished tests stop piling up because the system will not let you start one that way.
2. **You are held to your goals every day, not every quarter.** The year is one line with a number and a date. The quarter is two to four objectives with behaviours you control. The week picks two or three bets. Each morning asks for the one thing that must be true by tonight, and the next morning opens with a verdict on it. Slips that repeat become a bet, not a to-do.
3. **Claude does more of the work.** The standup reads your calendar, tasks and inbox through whatever you have connected, and your experiments folder always. The critic bench runs three or four sceptical sub-agents over anything before it ships and stops when a round comes back clean. Twelve skills cover the day, the week, the month, SEO, video research, copy, voice and the gate before you post.
4. **The system learns.** Every rule in `principles/` cites the incident that created it, and a weekly prompt proposes edits to its own instructions, applied only when you say yes.
5. **You stay honest.** Every report ends with a ledger of what was checked and what was not. Every retro line is labelled observed, asked or unobserved. No number gets invented.

Readouts are yours to type. The agent's job is to make sure you do.

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

## The map

| Folder | What it is | Start with |
|---|---|---|
| `experiments/` | One folder, one template, one lifecycle: `planned → live → measured` or `killed`. The three rules the whole system enforces. | `experiments/README.md` |
| `goals/` | The year in one line, your named derailers with a recovery move each, quarterly OKRs from behaviours you control. | `goals/MISSION.md` |
| `retros/` | Daily, weekly, monthly templates plus the compounding ledger: what now pays off with your hands off it. | `retros/weekly/TEMPLATE.md` |
| `principles/` | One file per rule, each with the incident that created it. | `principles/README.md` |
| `stack/` | Twenty-one tools, one page each: what for, MCP or API or CLI, setup, quirks. Vendor names live here and nowhere else. | `STACK.md` |
| `reference/` | The self-improvement prompt, path-scoped rules with the check that proves they load, a link checker. | `reference/README.md` |

## What this is not

Not a knowledge base. Not a dashboard. Not a course. Nothing in it sends email, posts, or writes outside your folder; the agent drafts and you send.

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
