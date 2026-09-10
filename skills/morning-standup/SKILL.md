---
name: morning-standup
description: >
  Plan the day in one screen. Opens with a verdict on whether yesterday's must_be_true
  landed, checks every source (calendar, tasks, inbox, analytics, the experiments
  folder) and records what it could not reach, surfaces any experiment that is live past
  its window, then pins one thing that must be true by tonight and names the derailer
  the day has to resist. Writes retros/standups/YYYY-MM-DD.md.
  Use when the user says "standup", "morning standup", "plan my day", "what should I
  work on today", "/standup", or first thing on a working morning. "standup close" in
  the evening records the verdict.
license: CC-BY-NC-4.0
---

# Morning standup

The standup is the bottom of the cascade. The mission sets the year, the OKRs the quarter, the monthly retro the month's intentions, the weekly retro the week's bets. The standup asks the only question left: what must be true by tonight for this week's bets to survive?

It is short in what it says and complete in what it checks. Cut words, never sources.

## Documentation is never data

Files named `TEMPLATE.md`, `EXAMPLE*.md` and `README.md`, and anything under the plugin's own folder, are documentation. Live files are the dated or slug-named files in the folder the user opened. Read documentation to learn the shape of a file, never as history: the example week's bets, the example mission's derailers and the example standup's date belong to nobody. A `[placeholder]` left in a live file means "not set": ask for the value, never quote the placeholder, never borrow the example's. The hook applies the same rule (`hooks/session-start.sh`).

## First run

First-run mode fires when the folder you are in has no `goals/`, `retros/` or `experiments/` directories, **or** when those folders hold only `TEMPLATE.md`, `EXAMPLE*.md` and `README.md` files. Say so once ("only the plugin's templates and examples exist here, so this is a first run") and do not say it again during the session.

If the directories are missing, create them now from the plugin's templates before doing anything else: copy `goals/MISSION.md`, `goals/okrs/TEMPLATE.md`, `retros/*/TEMPLATE.md` and `experiments/TEMPLATE.md` from the plugin root (`$CLAUDE_PLUGIN_ROOT`, or this repo if you cloned it) into the same paths here. Tell the user which files you created and that the examples in the plugin show what filled-in ones look like. Do not fill anything in for them.

On a first run every file source in the coverage ledger reads `n/a` with the note `first run`. There is no yesterday, no bet and no derailer table to test against; the steps below say what to write in each place instead.

## Files this skill reads and writes

| Reads | Why |
|---|---|
| `goals/MISSION.md` | the derailer table, for the protect-against line |
| the current `goals/okrs/*.md`, never `TEMPLATE.md` or `EXAMPLE.md` | which objective wins when two collide |
| the latest dated `retros/monthly/YYYY-MM.md`, never `EXAMPLE.md` | `## Intentions`, the month's primary |
| the latest dated `retros/weekly/YYYY-MM-DD.md`, never `EXAMPLE.md` | `## Bets`, the week's 2–3 commitments |
| yesterday's dated `retros/standups/YYYY-MM-DD.md`, never `EXAMPLE.md` | `must_be_true` and `verdict` |
| `experiments/<slug>.md`, never `TEMPLATE.md`, `README.md` or `EXAMPLE-*.md` | anything `live` past `window_end` |

Writes one file: `retros/standups/YYYY-MM-DD.md`, using the frontmatter in `retros/standups/TEMPLATE.md`. Never edits a previous day's file except to fill its `verdict`.

If a file is absent, or the only file in a folder is documentation, say so on the line where it would have gone and carry on. Never synthesise a bet, an intention or a must_be_true from memory of what it probably was, and never from an example file.

## Step 1 - Yesterday's verdict (always first after the stale list)

Read yesterday's standup. Before asking anything about today, and directly under any stale-experiment line from Step 3, give one line:

```
Yesterday: "<must_be_true>" -> landed | slipped - <why, in a clause>
```

- If yesterday's file has `verdict: landed` or `verdict: slipped`, use it.
- If it says `pending`, work it out from the sources in Step 2 (a task completed, a calendar block that happened, a file that now exists). If you cannot tell, ask. Write the answer back into yesterday's `verdict:` field.
- If there is no dated file for yesterday, say "no standup yesterday" and go straight to Step 2. Do not reconstruct the missed day.

A landed day gets one line. A first-time slip gets one line. Where earlier dated standups exist, a repeat slip earns three: name the repeat, say whether a previous day's protect-against line predicted it, and say why it keeps slipping. A slip that repeats is the weekly retro's business (it becomes a systemic bet there), so the one-line reason goes on yesterday's verdict line in today's file, labelled `asked`, where the weekly's pattern-mining will find it. If the human reports a repeat that no file shows, record it labelled `asked` and say the file trail starts today.

**Gaps.** If the last dated standup is two or more working days old, acknowledge it in one line and move on. No inventory of missed days, no asking the human to account for the gap. A ritual that greets a return with a reckoning teaches you not to return. Declared leave is not a gap. The example standup's date is not a gap.

## Step 2 - The source check (mandatory, every run)

Check every source below, in one pass, before saying anything about today. A source may come back empty, stale or broken. That is a result, and you record it. What you may never do is not look.

| Slot | What to pull | What it is for |
|---|---|---|
| Calendar | today's events and free windows | can the day hold the one thing? |
| Tasks | due and overdue items | what is already promised |
| Inbox | anything unanswered that a real person is waiting on | owed replies |
| Analytics | yesterday's number for the primary metric of any `live` experiment the human owns, only if a tool is connected. Nothing in v1 reads analytics on its own (`experiments/README.md`) | early signal, never a verdict |
| Experiments folder | `status` and `window_end` of every live file | stale work |
| Standups folder | yesterday's file, and the gap length | Step 1 |
| Retro files | the week's `## Bets` and the month's `## Intentions` | what today must serve |
| Mission and OKRs | the derailer table; which objective wins | Steps 4 and 5 |

Each slot maps to whatever tool the user has connected. For every slot with nothing connected, ask one combined question ("calendar, anything due, anyone waiting on a reply, a number you are watching: anything I should know?") and label each answer `asked`. Never ask more than one question for the whole of Step 2, and do not stack the source question, the bet check and the derailer check into an interrogation.

Every source lands in the coverage ledger at the end of the file. This is the rule in `principles/coverage-ledger.md`: the ledger is the only thing standing between "I checked everything" and "I believed I checked everything". A source you read yesterday and are carrying forward counts as not checked.

## Step 3 - Stale experiments at the top

Any experiment with `status: live` and `window_end` before today goes above everything else in today's readout. Print the filename slug, not the title:

```
Stale: pricing-page-headline is <n> days past its window. Type the readout or kill it.
```

Do not lower its position because it is annoying. It stays at the top of every standup until the file reads `measured` or `killed`. The standup does not kill it and does not extend the window. The human types the readout into the experiment file, or types the learning and marks it killed. Readouts are typed by the human; the agent's job is to make sure that happens.

`experiments/EXAMPLE-live-stale.md` is a demo of this behaviour, not the human's experiment. The hook prints it tagged `(example)` so a new install can see what the chase looks like. The standup never asks for its readout. When the only stale file is an example, the stale line reads "no live experiments yet" and the run proceeds.

## Step 4 - One thing that must be true

Ask the core question, then at most two follow-ups:

> "By tonight, what is the one thing that must be true for this week's bets to be on track?"

Test the answer against the files:

- Does it serve one of this week's `## Bets`? If not, say which bet is being abandoned and ask whether that is a choice. If no dated weekly retro exists, write "no bets yet" on the Advances line and say the first weekly retro sets them. Never test the answer against `retros/weekly/EXAMPLE.md`.
- Is it an outcome, not an activity? "Draft sent to three people" is checkable tonight. "Work on the draft" is not.
- What is the smallest version that still counts? Write that down too. A derailer feeds on the gap between "not started" and "done properly".

One thing. If the human offers three, ask which one they would keep if the other two evaporated at 2pm.

## Step 5 - Protect against

Read the derailer table in `goals/MISSION.md`.

If any row still reads `[name it]`, the table is unfilled. Do not infer a derailer from the day and do not borrow one from `goals/EXAMPLE-MISSION.md`. Ask once, "how do you usually lose a day like this?", write the answer labelled `asked`, write the recovery move as "not defined; derailer table empty", and point at `goals/derailers.md` for next time. Never write `[name it]` into a live file.

If the table is filled, name the derailer most likely to eat today, with its tell, and the recovery move if it fires. Infer it from the day (a full inbox, a blank calendar, a task list shaped like one of the tells) and ask the human whether that reading is right. Where the inference and the answer disagree, the answer wins and you record both.

On a day that is plainly anchored to a bet, one line is enough. Do not stack the bet check, the derailer check and a lecture into an interrogation of a well-anchored day. Reserve the harder question ("what does this trade away, and is that a choice?") for a day already committed to the derailer. A wobble is not a flight.

## Step 6 - Write the file and give the readout

Write `retros/standups/YYYY-MM-DD.md` with the template's frontmatter (`date:`, `must_be_true:`, `verdict: pending`, `protect:`) and its five body lines: yesterday's verdict, must be true by tonight (with the smallest version and the bet it advances), protect against, not today, stale experiments. Drop the HTML comments when writing the live file; they are instructions to you, not content. Then give the human one screen, in this order:

1. Stale experiments, if any.
2. Yesterday's verdict.
3. Today's must_be_true, the smallest version, and the bet it serves.
4. Protect against.
5. Owed replies, if the inbox slot returned any. Drafts only: this agent has no send capability.
6. The coverage ledger.

Every number in the readout must appear in a source you checked this run. An answer the human gave this run counts as a source when it is written with the label `asked`. A number with neither a file, a tool result nor an `asked` label is not a number, it is a guess, and `principles/never-fabricate-an-identifier.md` says blank beats plausible.

**A version to share.** If the human asks for a version to send to someone else, the day's file stays whole, protect line included. Produce a second, shorter readout in chat (must be true, smallest version, stale experiments), say which lines were left out, and let the human send it. Never edit the avoidance out of the file; the weekly retro mines it.

## The evening close

On "standup close" or "close out my day": open today's file, ask "did it land?", set `verdict:` to `landed` or `slipped`, and add one clause on why if it slipped. Nothing else. A verdict left at `pending` is surfaced at the top of tomorrow's standup and every standup after it until it is filled.

## Wire it to a routine or cron

Run the standup on a schedule rather than waiting to remember it. A routine that fires at the start of each working day and runs this skill against the repo, then posts the one-screen readout wherever the human reads first thing, keeps the ritual alive through the weeks it would otherwise die. Schedule the close for the end of the working day. If the routine finds no human to answer Step 4, it writes the stale list and the verdict and stops; it never invents a must_be_true.

If you're in a team: one standup file per person, and the stale-experiment list is shared, so whoever owns the experiment sees it first.

## Principles this skill enforces

- `principles/coverage-ledger.md` - every source checked every run, failures recorded, never skipped
- `principles/never-fabricate-an-identifier.md` - no number without a source in this run
- `principles/observed-asked-unobserved.md` - the verdict is observed or asked, never reconstructed
- `principles/measurement-honesty.md` - a stale experiment is surfaced, not silently expired

## Coverage ledger

The file ends with the template's table, filled every run, one row per source. The rows match `retros/standups/TEMPLATE.md` exactly. `checked` means a tool or file was queried this run. `failed` means a tool or file should have answered and did not, or no tool was connected and the human gave no answer; three words on why. `n/a` means the source cannot apply today: `first run`, `not connected; asked`, `no live experiments`.

| Source | Status | Note |
|---|---|---|
| Mission | checked / failed / n/a | |
| Current OKRs | checked / failed / n/a | |
| Latest monthly retro | checked / failed / n/a | |
| Latest weekly retro | checked / failed / n/a | |
| Yesterday's standup | checked / failed / n/a | |
| `experiments/*.md` | checked / failed / n/a | |
| Calendar | checked / failed / n/a | |
| Tasks | checked / failed / n/a | |
| Inbox | checked / failed / n/a | |
| Analytics | checked / failed / n/a | |

## Related

- [../../retros/standups/TEMPLATE.md](../../retros/standups/TEMPLATE.md) - the file this writes
- [../weekly-retro/SKILL.md](../weekly-retro/SKILL.md) - where repeated slips become bets
- [../../goals/MISSION.md](../../goals/MISSION.md) - the derailer table
- [../../experiments/README.md](../../experiments/README.md) - the status lifecycle the stale check reads
- [../../principles/coverage-ledger.md](../../principles/coverage-ledger.md) - why the ledger is never optional
