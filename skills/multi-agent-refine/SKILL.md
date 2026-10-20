---
name: multi-agent-refine
description: >
  Take a piece of work and make it genuinely solid by running it through several
  critic subagents from different angles, iterating until it holds up. Works on
  anything - a PRD, plan, strategy, email, piece of copy, or a decision. Does a quick
  brief-check first so the critics judge against the right bar, spins up task-adaptive
  critics in parallel, and loops (max 3 rounds, stopping early when a round is clean).
  Asks up front whether to refine autonomously or with your input each round. Use when
  the user says "refine this", "multi-agent-refine", "pressure-test this", "make this
  solid", "tear this apart", or is about to finalise a substantial deliverable.
license: CC-BY-NC-4.0
---

# /multi-agent-refine

Make any piece of work solid by putting it under adversarial pressure from several
angles at once, repeated until it survives. Not one polish pass - multiple critics
genuinely trying to break it, then fixing what they find, then doing it again.

**Severity, used throughout (so "solid" is executable):**
- **HIGH** = would actually fail, mislead, or harm if shipped as-is.
- **MED** = a real weakness worth fixing.
- **LOW** = nitpick / taste. Don't spend rounds on these.
A round is **clean** when it surfaces no new HIGH or MED. That's the stop signal.

## Step 0 - Quick brief-check + mode

1. Ask 1-2 quick questions so the critics judge against the right bar: what is this
   for and who's it for, and what would make it "solid"? **If the user can't articulate
   the bar, don't stall - infer a sensible one, state it in one line, and proceed.**
   (Building from scratch rather than handing you a draft? Interview a bit more first.)
2. One-line preview, then ask the mode: *"I'll run ~4 critics from different angles,
   fix what they find, and repeat up to 3 times. Want me to do that autonomously, or
   check in with you each round?"* If they choose input, use AskUserQuestion between rounds.

## Step 1 - Pick the critics (task-adaptive, genuinely distinct)

Choose the lenses most relevant to THIS work - **3-4 critics** (never more than 5, and
never run more than ~8 calls total across all rounds, to stay under your harness's subagent cap).
Examples:
- **PRD / plan / spec:** feasibility, scope & over-build, what's-missing, devil's-advocate
- **copy / email:** clarity, voice, what-a-sceptic-reads-into-it
- **strategy / decision:** strongest counter-argument, second-order effects, "what makes this fail"

Make the lenses genuinely different from each other - these are the same model wearing
different hats, so distinct, specific framings (not five flavours of "is it good?") are
what produce real coverage. Always include a **"what's missing / what would a sharp
critic say"** lens. **Only if the work rests on external facts** (tech behaviour,
prices, claims), add a **fact-check critic** (a web research tool).

## Step 2 - Run the critics in parallel (explicit instruction)

Invoke them explicitly - some harnesses only run subagents in parallel when told to. Say, in
effect: *"Spin up N subagents in parallel; give each one the work, the bar from Step 0,
and ONE lens; have each return its findings."* Tell each critic to genuinely try to
break the work and **default to sceptical** - a critic that says "looks good" without
hunting has failed. Each returns: concrete problems tagged HIGH/MED/LOW, and "solid on
my axis: yes/no".

## Step 3 - Synthesise (keep every real issue)

Merge the critiques: dedupe, and **keep every HIGH and MED** - only drop LOW nitpicks.
Lead with anything two+ critics agreed on. Don't quietly bury a HIGH because it's
inconvenient to fix.
- **Autonomous mode:** fix the HIGH/MED issues, show a short "what I changed and why".
- **Input mode:** show the findings, ask (AskUserQuestion) which to act on, then fix.

## Step 4 - Loop until solid (max 3 rounds, cost-aware)

Re-critique the revised work - but **only re-check the issues that were fixed plus
anything new the changes introduced**, with fewer critics (1-2) on later rounds, not a
full fresh panel. **Stop when a round is clean (no new HIGH/MED), or after 3 rounds.**
If round 1 is already clean, say "this is already solid" and stop - don't manufacture
issues. If it's still not solid at the cap, say so plainly and name what's still weak.

## Step 5 - Close

Hand back the refined work plus one line on what got stronger and anything still worth
watching.
If the work is prose a human will read, run the humanizer skill in this plugin on it last.

## Notes

- **Honest cost:** this spends real tokens (several subagents per round). Keep it for
  things worth getting right; the brief-check + 3-4 critics + early-exit keep it bounded.
- **Same-model caveat:** the critics are one model in different hats, so this is
  perspective-diversity, not true independence. Genuinely distinct, sceptical lenses are
  what make it useful rather than theatre.

## Provenance

- **Author:** James McAulay. Licence CC BY-NC 4.0, see the repo `LICENSE`.
- **First published** in [JamsusMaximus/agent-foundations-starter](https://github.com/JamsusMaximus/agent-foundations-starter). This repo is now the canonical copy; the starter will link here.
- See `EXAMPLE.md` in this folder for a worked run where the critics invalidated the premise rather than polishing the draft.

## Related

- [EXAMPLE.md](EXAMPLE.md): the critics-killed-the-premise case
- [humanizer](../humanizer/SKILL.md): the last pass on prose after a refine
- [verified-fixed-or-not-closed](../../rules/verified-fixed-or-not-closed.md): why every HIGH and MED gets an end state
- [Licences](../../LICENSES.md): licence index
