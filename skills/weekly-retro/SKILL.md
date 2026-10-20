---
name: weekly-retro
description: >
  Run the weekly retro (on the retro day, default Friday) against the quarter's OKRs. Reviews every experiment first and
  refuses to score the week while any is live past its window; then scores each KR
  0–100%, mines the week's standups for repeated slips, picks 2–3 bets for next week
  and stages the tasks. Every line is labelled observed, asked or unobserved. Writes
  retros/weekly/YYYY-MM-DD.md. Use when the user says "retro", "weekly retro",
  "Friday review", "reflect on my week", "score the week", or at the end of the
  working week.
license: CC-BY-NC-4.0
---

# Weekly retro

The retro runs on the person's `retro_day` (default Friday), and takes as long as it needs; a quiet week can take ten minutes. Files are dated by that day. Where this skill says "Friday" it means the retro day.

The retro is not a task triage. It answers one question: did this week move the key results, and if not, what pattern stopped it? Lead with the experiments and the scores. The friendly interview comes after, and serves the accountability rather than replacing it.

Be direct. The human set this up to be held to account, not flattered.

## Documentation is never data

Files named `TEMPLATE.md`, `EXAMPLE*.md` and `README.md`, and anything under the plugin's own folder, are documentation. Live files are the dated or slug-named files in the folder the user opened. Read documentation to learn the shape of a file, never as history: the example OKRs are not the current quarter, the example weekly is not last week, the example experiment is not the human's test. A `[placeholder]` left in a live file means "not set": ask for the value, never quote the placeholder, never borrow the example's.

## First run

If the folder you are in has no `goals/`, `retros/` or `experiments/` directories, say so and stop: the standup creates them. Point the user at `/growth-setup`. Never create or fill files on the user's behalf in a retro.

If the directories exist but the only OKR, monthly, weekly or experiment files are `TEMPLATE.md`, `EXAMPLE*.md` or `README.md`, or `goals/MISSION.md` still holds `[placeholder]` text, this is the first retro. Say so once.

Do not score against the example KRs, do not read the example bets as last week's, do not gate on the example experiment, and do not borrow the example derailer table from `goals/EXAMPLE-derailers.md`. Run the interview only (unless a stale experiment shuts the gate; see Step 1), every line `asked`, mark those ledger rows `n/a` with the note `first run`, and point at `goals/okrs/TEMPLATE.md` as the thing to fill before the next retro. Write the file with the sections that have content and say plainly which are empty. Do not present a number you did not get from the human or a source in this session. Confident history where there is none destroys every retro after it.

## Where the files live

Read `PROFILE.md` first: `cadence:` (the work days, default mon-fri), `retro_day:` (default fri) and, in team mode, `people:`. Live files may sit in a subfolder named by a `.growth-agents` pointer file or `$GROWTH_AGENTS_ROOT`; otherwise look in `./` and `./growth`. Read experiments there, and also one folder down (for example `clients/<name>/experiments/`), naming the folder in section 1 so the human knows which client or project each one belongs to.

## Files this skill reads and writes

| Reads | Why |
|---|---|
| `experiments/<slug>.md` (and `<folder>/experiments/<slug>.md` one level down), never `TEMPLATE.md`, `README.md`, the playbooks or `EXAMPLE-*.md` | Step 1, stale ones first |
| the current `goals/okrs/*.md`, never `TEMPLATE.md` or `EXAMPLE.md` | the KRs to score |
| this week's dated `retros/standups/YYYY-MM-DD.md` (team mode: `YYYY-MM-DD-<name>.md`, one per person) | verdicts, slips, coverage |
| the latest dated `retros/monthly/YYYY-MM.md`, never `EXAMPLE.md` | `## Intentions` the week inherits |
| the most recent dated `retros/weekly/YYYY-MM-DD.md`, never `EXAMPLE.md` | last week's bets, and the stale-item count |
| `goals/MISSION.md` | the year line and the annual goals |
| `goals/derailers.md` | the derailer table, for pattern-mining |

Writes one file: `retros/weekly/YYYY-MM-DD.md`, dated by the retro day it covers, using `retros/weekly/TEMPLATE.md`. Its sections, in the template's order: header (week, the month's intentions pasted in, capacity next week), 1. Experiments, 2. KR scoreboard, 3. Standup pattern-mining, `## Bets` (a numbered list of 2–3 items, which the session-start hook reads; the list starts on the line after the heading with nothing between them), 4. Staged tasks, the coverage ledger.

## Evidence labels (every line, no exceptions)

Every finding in the retro carries one of three labels, and there is no fourth:

- `observed` - a dated file or artefact exists and you read it this session
- `asked` - the human answered in this session
- `unobserved` - you could not see it and nobody told you; treat as unknown

**Ask, do not reconstruct.** If a standup is missing, the day is `unobserved`, not "probably fine". If a KR's number is not in a source, ask for it and label it `asked`. The rule is `rules/observed-asked-unobserved.md`.

## Step 1 - Experiments review (before anything else)

Open every file in `experiments/` except `TEMPLATE.md`, `README.md`, the playbooks (`ab-test-playbook.md`, `power-check.md`) and any file named `EXAMPLE-*.md`. The example files are documentation: `EXAMPLE-live-stale.md` is a demo of the chase, which the hook shows tagged `(example)`. It never shuts the scoring gate and you never ask for its readout. If no live experiment files exist, write "no live experiments yet" in section 1, leave the gate OPEN, and proceed. If the human wants an example file gone, they delete it.

Sort the live files by urgency:

1. `live` with `window_end` before today: **stale**. These go first.
2. `live` inside the window: report the days remaining and yesterday's primary metric if analytics are connected.
3. `planned`: check `baseline` and `primary_metric` are filled. A planned experiment with either blank is not allowed to go live, and you say so. **For an A/B test, run the power check before it may move to `live`:** do the arithmetic in `experiments/power-check.md` with the human's base rate and weekly traffic, show the numbers, and write the verdict into the file's `power_check:` field (for example `can conclude, detects 1.4 points in 3 weeks` or `cannot conclude in window`). On `cannot conclude`, refuse `live`; offer the options in `power-check.md` instead. Never write the verdict without showing the working.
4. `measured` and `killed` this week: read the result and the learning into the retro.

A `live` experiment with no `window_end`, or one not in `YYYY-MM-DD`, counts as unresolved too (the hook prints these as no window_end or unreadable). Ask for the end date and have the human write it into the file; until then the gate stays shut.

**For each stale experiment, stop.** Fill the section 1 table (slug, status, window end, days over) and show the human the file's `title`, `primary_metric` and `baseline`, then ask for one of two things:

- the readout: the human types the measured value and the result into the file (`## Result`, `## Learning`, a dated line under `## Status`, and `status: measured` in the frontmatter). The readout must carry its source (the tool or report, and the date it was read) and the sample size per arm, or say "n unknown" explicitly. A readout with no source stays `live` and the gate stays shut (`rules/measurement-honesty.md`)
- the kill: the human types one learning into the file (`## Learning`, `status: killed`)

Until every stale experiment is one or the other, **do not score the week.** Count them. In a team retro, list every stale experiment with its `owner:` (from the frontmatter); the owner is the person asked to type the readout, and one stale experiment still shuts scoring for everyone. Write `Scoring gate: SHUT` in section 1 with the count, and say plainly: "N experiments are past their window. I will score the week once each has a readout or a learning", with N as the count you made (or "One experiment is" when it is one).

**A SHUT gate still produces the file.** Write the retro file with section 1 (the gate and the stale list) filled, and leave sections 2 to 4 for after the readout. This also holds on the first retro: if there is a stale experiment, a SHUT gate and the section 1 write-up win over the interview-only path in First run. Do not extend the window on the human's behalf, do not mark it killed on their behalf, and do not carry it to next week's list as if that were a resolution. A late-discovered confounder ("the traffic was weird") goes under the file's Confounders section before the readout; it is not a reason to extend. The refusal is the point of this section (guidance for you; do not say that sentence to the human). `rules/measurement-honesty.md` explains why: an experiment that expires silently teaches you that windows are decorative.

Readouts are typed by the human. If analytics are connected, offer the number you can see, labelled `observed`, so typing it is one line of work. Never write it into the file yourself. Once the human says the file is updated, read it back and only then score. The read-back also covers experiments closed since the last retro: a file already at `status: measured` whose `## Result` has no source or sample size (or explicit "n unknown") is not accepted. Name it in section 1, treat it as unresolved like a stale one, and ask for the source.

## Step 2 - Score every KR

For each row in the OKR file's key results table, give a score from 0 to 100% and one line of evidence with its label. Outcome KRs: progress from baseline to target, rounded to the nearest 5. Behaviour KRs: the share of required instances so far this quarter that happened. Put the arithmetic in the evidence line.

```
KR2.1  published every Tuesday      85%  observed: <n> of <n> weeks in the calendar
KR2.2  <target> on the list          40%  asked: list is at <n>, human's read of the dashboard
KR1.2  <target> lead → customer conversion   0%  observed: pricing-page-headline still live, <n> days left
```

Behaviour KRs are scored from the calendar and the standups. Outcome KRs are scored from the connected metric source or, failing that, from an `asked` number. A KR with no evidence at all scores `unobserved`, not 0% and not a guess. A metric no KR names (impressions, comments, reach) is recorded in the human's words and scores nothing. Score every KR, including the ones that are embarrassing.

Then one line per objective: on trajectory or drifting, and which derailer from `goals/derailers.md` it looks like. If that table still reads `[name it]`, say so and name no derailer; do not borrow the example table's. Stage "fill the derailer table" as a task.

## Step 3 - Last week's bets

Read last week's `## Bets` from the most recent dated weekly file. If none exists, ask what last week's bets were and label the answers `asked`. For each: landed, slipped, or dropped, with a label. Where the human defends a slip ("it'll pay off later", "I had good reasons"), do not take it at face value. Ask for the evidence, or pin a date and hold them to it next week.

## Step 4 - Mine the standups

Read every dated standup this week. Count:

- cadence days with a standup and cadence days without (this is the week's coverage, and the monthly retro needs it). Days outside the person's `cadence:` are not unobserved; leave them out of the count
- verdicts: landed, slipped, pending
- what slipped, and whether the same thing slipped more than once this week or appeared in last week's slips

**A slip that repeats is not a task to re-triage. It is a systemic bet.** If "film the video" slipped three times, next week's bet is not "film the video" again. It is whatever removes the reason it keeps slipping: the smallest version, a different window, a person who will be disappointed. Name the derailer it matches. This is the mechanism the whole repo exists to run, so do not soften it.

A standup left at `verdict: pending` is a slip in disguise. Ask which it was and fill it.

## Step 5 - The interview

Now, and only now, ask one at a time and push for specifics:

1. Biggest win, and which KR it moved.
2. What drained you.
3. What you avoided.
4. What is genuinely stuck.
5. Honestly, how do you feel about progress on the mission line?
6. How many hours does next week actually have for bet work? (This is the capacity line in the header, labelled `asked`.)

The interview is not a section of the file. Its answers land as evidence and labels in sections 2 and 3 and in the bets. When an answer matches a pattern you already found in Step 4, tie it back on the spot. Answers may be rambling; extract the essence and ask when a phrase is ambiguous. Never lift a messy phrase straight into a bet.

Then play it back as six bullets, one per question, and ask what is wrong. Only write the file after the human has confirmed.

## Step 6 - Pick 2–3 bets and stage the tasks

Braindump everything on the table for next week. Score each item with the rubric in `rules/prioritisation-rubric.md`: which KR it moves, quantified where possible, time to impact, reversibility. Then output:

- **Bets**: 2–3, each naming the KR it moves and the smallest version that counts, with a checkable condition for the next retro day ("three outreach messages sent by Wednesday", not "do outreach"). These are the numbered list under `## Bets`, starting on the line after the heading.
- **Dropped**: in the readout, with the reason "does not move a KR". Be willing to say most of the list is busywork. One line under the bets list records what was dropped, so next week can refuse it when it creeps back.

At least one bet must serve the month's primary intention from the latest dated monthly retro. If none does, say so and ask whether the intention is being abandoned. If no dated monthly retro exists, say "no intentions yet" in the header and skip the check.

Draft one task per bet under section 4, Staged tasks, with the first action as the task name. **Never auto-create them.** The human confirms the list; only then, if a task tool is connected, create them and record the ids the tool returns. An id you did not get from the tool does not go in the file.

## Step 7 - The stale-item forcing function

Before writing, compare this retro's bets, blockers and "still stuck" items against the last two dated weekly files. **Anything appearing in three consecutive retros without progress, or that the human says has slipped three times when no files show it (label it `asked` and note that the file trail starts this week), gets one of exactly three fates, chosen by the human in this session:**

- a deadline, written into the bet with a date
- a drop, written under Dropped with the reason
- an owner, if you're in a team, named in the bet

"Carry forward" is not a fourth option. Carry forward is theatre: it lets an item feel alive while it costs a line every retro and moves nothing. Say it once, in one sentence, then ask which of the three it is.

## Step 8 - Write the file

Write `retros/weekly/YYYY-MM-DD.md` from the template, every section in the template's order and nothing invented. Drop the HTML comments when writing the live file; they are instructions to you, not content. Keep `## Bets` immediately followed by its numbered list. Last week's bets go in section 3 alongside the standup table, one line each with a label.

Every number in the file appears in a source you read this session or in an `asked` line. Never fill a thin section with plausible content the human did not say. If it is thin, it is thin.

End with the one connection nudge, if a source was missing: usually the metric source or the calendar.

## A version to share

If the human asks for a version to send to someone else, keep the private file whole, labels and avoidance included. Write a second file, `retros/weekly/YYYY-MM-DD-shared.md`, with a "parked" list in place of Dropped and a section for the human's asks. Before handing it over, list which sections and lines were left out so the human can check. The human sends; you do not.

## Wire it to a routine or cron

Schedule this for the retro day. A routine that runs Step 1 and Step 2 on that morning and posts the stale list plus the draft scores means the human arrives at the retro with the hard part already on the table. The interview and the bets still need a human in the session; the routine stops at Step 4 and says so.

If you're in a team: one retro file for the team, with a bets list per person (the session-start hook reads the first two bets). Each KR has one owner who scores it, and each bet has one owner. A bet with two owners has none.

## Rules this skill enforces

- `rules/measurement-honesty.md` - no scoring while an experiment is stale
- `rules/observed-asked-unobserved.md` - every line labelled, ask before reconstructing
- `rules/prioritisation-rubric.md` and `rules/prioritisation-pitfalls.md` - how bets are chosen
- `rules/coverage-ledger.md` - every source recorded
- `rules/never-fabricate-an-identifier.md` - task ids and numbers come from a source or stay blank

## Coverage ledger

The file ends with this table, whose rows match `retros/weekly/TEMPLATE.md` exactly. `checked` means read this session. `failed` carries three words on why. `n/a` for a source that cannot apply this week, including `first run`.

| Source | Status | Note |
|---|---|---|
| `experiments/*.md` | checked / failed / n/a | |
| This week's standups | checked / failed / n/a | n of the cadence days present |
| Current OKRs | checked / failed / n/a | |
| Latest monthly retro | checked / failed / n/a | |
| Last week's retro | checked / failed / n/a | |
| Calendar (capacity) | checked / failed / n/a | asked, not read |
| Tasks | checked / failed / n/a | |
| Metric source | checked / failed / n/a | |

## Related

- [../../retros/weekly/TEMPLATE.md](../../retros/weekly/TEMPLATE.md) - the file this writes
- [../../experiments/README.md](../../experiments/README.md) - the status lifecycle and frontmatter Step 1 parses
- [../morning-standup/SKILL.md](../morning-standup/SKILL.md) - where the slips come from
- [../monthly-retro/SKILL.md](../monthly-retro/SKILL.md) - where the intentions come from
- [tests/personas.md](tests/personas.md) - six test personas: the ways a human games the retro, to run the skill against
