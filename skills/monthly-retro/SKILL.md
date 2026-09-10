---
name: monthly-retro
description: >
  Close the month against the mission line. Asks "what kind of month was that?" before
  showing a single number, then lays out the facts, checks whether the year line moved,
  scores the month's intentions against standup coverage, admits new rows to the
  compounding ledger under a strict test, and sets 2–3 intentions the weekly retro
  inherits. Refuses to record a figure from a stale input. Writes
  retros/monthly/YYYY-MM.md. Use when the user says "monthly retro", "close out the
  month", "month-end review", "how did the month go", or on the last working day of
  the month.
license: CC-BY-NC-4.0
---

# Monthly retro

The weekly retro scores key results. The monthly retro asks a different question: is the year line in `goals/MISSION.md` closer than it was a month ago, and did the month's intentions cause that or merely coincide with it? It sets intentions, never tasks. Tasks belong to the weekly.

**Which month.** A run closes the previous calendar month unless the human names another. Say which month you are closing in the first line of the session, and date the file by it (`retros/monthly/YYYY-MM.md`).

## Documentation is never data

Files named `TEMPLATE.md`, `EXAMPLE*.md` and `README.md`, and anything under the plugin's own folder, are documentation. Live files are the dated or slug-named files in the folder the user opened. Read documentation to learn the shape of a file, never as history: `retros/monthly/EXAMPLE.md` is not last month, `goals/okrs/EXAMPLE.md` is not the current quarter, `goals/EXAMPLE-MISSION.md` is not the human's mission, and `experiments/EXAMPLE-live-stale.md` is a demo of the chase, not the human's test. Rows in `retros/compounding-ledger.md` marked `(example)` are not the human's assets. A `[placeholder]` left in a live file means "not set": ask for the value, never quote the placeholder, never borrow the example's.

## First run

If the folder you are in has no `goals/`, `retros/` or `experiments/` directories, say so and stop: the standup creates them. Point the user at `/standup`.

If `goals/MISSION.md` still holds `[one number]` or `[one date]` on its `mission:` line, or the only weekly, standup, OKR and experiment files are documentation, this is a first run. Say so once. The mission is not set, so section 3 is `NOT CLOSED` with the reason `mission not set`, section 5 reads "derailers not yet named" and points at `goals/derailers.md`, and no figure is asked for. Never invent a mission line and never borrow the example mission's number as the one to ask about. Everything else runs: the pre-read, the facts that exist, the reflections and the intentions are exactly what a first month needs.

## Files this skill reads and writes

| Reads | Why |
|---|---|
| `goals/MISSION.md` | the mission line |
| the current `goals/okrs/*.md`, never `TEMPLATE.md` or `EXAMPLE.md` | objectives, for the drift check |
| this month's dated `retros/weekly/YYYY-MM-DD.md` | KR scores, coverage counts, slips |
| this month's dated `retros/standups/YYYY-MM-DD.md` | coverage, for the gate |
| the previous dated `retros/monthly/YYYY-MM.md`, never `EXAMPLE.md` | last month's `## Intentions` and the figure it recorded |
| `retros/compounding-ledger.md`, ignoring rows marked `(example)` | what already exists |
| `experiments/<slug>.md`, never `TEMPLATE.md`, `README.md`, the playbooks or `EXAMPLE-*.md` | anything `live` past `window_end` |
| the metric source for the mission number | the month-end figure |

Writes `retros/monthly/YYYY-MM.md` from `retros/monthly/TEMPLATE.md`. Its sections, in the template's order: header (run date, exposure, standup coverage), 1. Pre-read, 2. Facts, 3. Is the year line closer, 4. Compounding ledger, 5. Derailers, `## Intentions` (a numbered list of 2–3 items, which the session-start hook reads; the list starts on the line after the heading with nothing between them), the coverage ledger. Appends to `retros/compounding-ledger.md`; never deletes a row.

**Do not re-pull what the weeklies already computed.** KR scores, slips and coverage were worked out every Friday. Read the first in-month weekly for the baseline and the last for the close. The only fresh pull this session earns is the mission number at month end.

## Step 0 - The uncontaminated question (before any number)

Ask exactly one question before the human sees a single figure, and capture the answer verbatim under section 1:

> "Before I show you anything: what kind of month was it, and what is the one thing about it you would rather not say?"

Seeing the data first anchors the account to it. This line preserves an independent read, and the gap between it and the facts is the most reliable source of insight the ritual produces. Do not react to the answer, do not discuss it, do not follow up. Take it and move on. The autopilot detector in Step 6 does not apply here.

## Step 1 - Freshness gate and degraded mode

Three inputs feed the year-line verdict, and any one of them stale fires the gate:

- a live experiment `live` past its `window_end` (example files do not count)
- a week in the month with no weekly retro
- the mission number not read this month (check the date on its source), or the mission not set

Offer the repair first. For the mission number, show the human exactly which figure is needed, take it, label it `asked`; never carry a value forward into a blank. For a stale experiment, offer exactly two repairs: the readout as the numbers stand, or a kill with a learning, typed by the human. Extending `window_end` is not a repair; a late-discovered confounder goes under the file's Confounders section before the readout. If the human declines both, record that and continue. For a missing weekly, it stays missing; the days are `unobserved`.

If the repair does not happen, the session does not halt. Run in **degraded mode**:

- Section 3 reads `Verdict: NOT CLOSED`, with which input was stale and its date. No delta, no percentage of goal, no required run rate.
- Everything else runs normally. That is most of the value.
- No figure for the mission line is recorded in the file. It records `open as of <date>, pending <input>` and a checkbox to reopen the month. The next weekly retro surfaces that checkbox until it is ticked.

A stale figure recorded as the month's close corrupts next month's delta, which is worse than a gap. A stale month does not get a number it did not earn. The rule is `principles/measurement-honesty.md`.

## Step 2 - The facts (one screen)

Fill the section 2 table, every row labelled `observed`, `asked` or `unobserved`, with its source:

1. Things published, over the weeks in the month. The repo defines no posts folder, so this row is `observed` only if the human keeps dated files somewhere you can read; otherwise ask and label it `asked`.
2. Experiments measured or killed; experiments still `live` past `window_end`.
3. Standup `must_be_true` landed, over the days recorded.
4. Last month's intentions hit, over the number set, one row each. With no previous dated monthly, the row reads "none set".
5. The number the mission is in, with where it was read. "Not defined" if the mission is not set.

Then the header: exposure (working days less leave and illness, `asked`) and standup coverage (days with a standup over working days, from the weeklies' ledgers). Then one line: where the pre-read and the facts disagree. That gap is usually the finding.

Slips that repeated across two or more weeklies go in as facts with dates. No diagnosis here; the weeklies did that. The monthly's contribution is the month-shaped consequence: the trajectory gap, the direction of the objective, the decision the calendar is about to force. Test: if a sentence would have been equally true in any single weekly, cut it.

Stop after the facts. Wait for the human's reaction before going on. Their first unprompted response to the numbers is the best input the rest of the session will get.

## Step 3 - The year-line check

Section 3. Two questions, every month, answered against `goals/MISSION.md`:

- Is the line closer, and by how much of what it needed to be? One sentence of arithmetic: needed per month from here, delivered this month, verdict closer / flat / further. No trajectory extrapolation until six monthly points exist; with fewer, the required run rate is the honest version.
- Is the current set of bets still the fastest path to the line, or has the month quietly re-aimed you at something more comfortable? Standing still counts as drift.

If an interim milestone is off track, compute what would have to be true (gap, days left, rate now demanded) and put the choice to the human: hold the date and name what closes the gap, re-date and state the new rate the new date demands, or drop it and say what replaces it. Record the answer verbatim. Do not decide for them. Re-dating is the comfortable option; say so when they pick it.

## Step 4 - Derailers and last month's intentions, under the coverage gate

Section 5: for each of the three derailers in `goals/MISSION.md`, one verdict: `fired`, `did not fire`, or `unobserved`, from the standups' protect-against lines and the weeklies' pattern-mining. If the table still reads `[name it]`, section 5 reads "derailers not yet named" with a pointer to `goals/derailers.md`, and nothing else: no `[name it]` in the file, no verdicts borrowed from the example table. If the human's own account this session names a derailer firing, record it as `fired (asked)` with their words. It is admissible evidence, labelled, and does not need a standup to exist; below 60% coverage it is often the only evidence there is.

Then, for each of last month's intentions that carried a trigger ("if X happens, do Y"), score the mechanism the same way: `fired`, `occurred and was missed`, or `unobserved`.

**The coverage gate.** The days without a standup are not random. They are the busy, interrupted days, which is exactly when a derailer fires. So silence over-represents trigger occurrences, and reading silence as "it never happened" rewrites a correctly specified trigger into a worse one using the worst data in the system.

Below 60% standup coverage, "did not fire" and "the trigger never occurred" are not available verdicts. Only `fired`, `occurred and was missed` and `unobserved`. Say: "at N% coverage the sample is biased toward the calm days, so silence is not evidence of absence." Carry the trigger unchanged. The absence of evidence is recorded as `unobserved`, never as a clean month.

A failed mechanism is one of three things, and the wrong diagnosis re-ships the failure: the trigger was described wrongly (rewrite it, observable this time); the trigger was right and the response too big (shrink it); the trigger was right and the owner was absent (a design fault, so re-time or delegate it, and do not reword a good trigger).

## Step 5 - The compounding ledger

Section 4. Ask: what now exists that did not a month ago and keeps working with the human's hands off it?

**Admission test, applied strictly:** a row qualifies only if it produced something this month without the human touching it, and you can name the evidence (a sequence that sent itself, a page that converted, a post that brought a subscriber). Builds and activities do not qualify until they have produced. Cap the live list around fifteen rows; past that the test is being applied loosely.

If nothing qualifies, write exactly that and stop. An empty month on the ledger is a finding about operating versus making, not a section to write around. Append qualifying rows to `retros/compounding-ledger.md` with the month; a dead row gets a strikethrough and a date, never a deletion. Rows marked `(example)` in the shipped ledger are documentation: never ask the human whether their welcome sequence produced, and never count the example toward the cap. The human may delete the example rows once a real row exists.

## Step 6 - Reflections

Four questions, one at a time. Two are fixed, two rotate so the ritual does not go on autopilot by month three:

Fixed: "What did you get better at this month?" (capability, not output) and "Where does the feeling from Step 0 disagree with the facts, and which is right?"

Rotate two from: what you would not do again; what you protected and whether it was worth it; the decision you have been avoiding; what a named observer would say the month was for.

**Autopilot detector:** an answer under about fifteen words, or one that restates last month's, gets one follow-up. Once. Then move on. Interrogation kills the ritual faster than a shallow answer does. The detector does not apply to Step 0, which gets no follow-up under any answer. Where a worry is corroborated by the facts, promote it into an intention; never reassure it away.

## Step 7 - Intentions for next month (2–3, never tasks)

Write them under `## Intentions` as a numbered list starting on the line after the heading, with no prose between the heading and item 1, one primary first, up to two supporting. Each states an outcome and a period, and at least one carries a trigger ("if X, then Y") and a person who will notice if it slips.

**Ask for the person by name.** Do not supply one. "Nobody, I work alone" is an allowed answer, written into the intention as `no one will notice (asked: works alone)`. A person the human did not name does not go in the file.

**Tasks are banned here.** "Fix the checkout flow" is a task. Do not reject it; excavate it. Ask "if that were done on the 1st, what is different by the 31st?" and "what does it cost you right now?" The second answer is usually the intention. Offer wording, let the human overrule, hand the task to the weekly.

An intention that failed because it was already false mid-month does not carry forward unchanged; name what it becomes. Dropping one is a valid output. Set the intentions for the usable weeks the calendar actually leaves, not a notional full month.

## Step 8 - Write the file

Write `retros/monthly/YYYY-MM.md` from the template, every section in the template's order and nothing invented. Drop the HTML comments when writing the live file; they are instructions to you, not content, and `EXAMPLE.md` shows the written shape. Keep `## Intentions` immediately followed by its numbered list. The reflections are not a section of the file; their answers land in the pre-read gap line, the derailer verdicts and the intentions. In degraded mode, no mission figure and the reopen checkbox.

**A version to share.** If the human asks for a version to send to someone else, the private file keeps every line, the pre-read included. Write a second file, `retros/monthly/YYYY-MM-shared.md`, state which lines were left out so the human can check, and let the human send it. Never soften the private file.

## Wire it to a routine or cron

Schedule a routine for the last working day of each month that runs Step 1 and Step 2 against the repo and posts the facts. It must not ask Step 0 on the human's behalf and must not write intentions; both need a human in the session. A routine that finds a stale mission source posts the NOT CLOSED line and the reopen checkbox and stops.

If you're in a team: one monthly file for the team, one Step 0 answer per person captured before anyone sees the facts, and one owner per intention.

## Principles this skill enforces

- `principles/measurement-honesty.md` - degraded mode, no stale close
- `principles/coverage-ledger.md` - the coverage gate reads the weeklies' ledgers
- `principles/observed-asked-unobserved.md` - every fact labelled
- `principles/never-fabricate-an-identifier.md` - no figure without a dated source
- `principles/verified-fixed-or-not-closed.md` - a reopened month stays open until the figure lands

## Coverage ledger

The file ends with this table, whose rows match `retros/monthly/TEMPLATE.md` exactly. `checked` means read this session. `failed` carries three words on why. `n/a` for a source that cannot apply, including `first run`.

| Source | Status | Note |
|---|---|---|
| Weekly retros this month | checked / failed / n/a | n of n present |
| Standups this month | checked / failed / n/a | n of n working days |
| `experiments/*.md` | checked / failed / n/a | |
| Mission number | checked / failed / n/a | dated |
| Calendar (exposure) | checked / failed / n/a | asked |
| Last month's retro | checked / failed / n/a | |
| Compounding ledger | checked / failed / n/a | |

## Related

- [../../retros/monthly/TEMPLATE.md](../../retros/monthly/TEMPLATE.md) - the file this writes
- [../../retros/compounding-ledger.md](../../retros/compounding-ledger.md) - the ledger Step 5 appends to
- [../../goals/MISSION.md](../../goals/MISSION.md) - the line Step 3 checks
- [../weekly-retro/SKILL.md](../weekly-retro/SKILL.md) - inherits the intentions
- [../../principles/measurement-honesty.md](../../principles/measurement-honesty.md) - why a stale close is refused
