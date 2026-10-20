---
name: morning-standup
description: >
  Plan the day in one screen. Opens with a verdict on whether the previous standup's must_be_true
  landed, checks every source (calendar, tasks, inbox, analytics, the experiments
  folder) and records what it could not reach, surfaces any experiment that is live past
  its window, then pins one thing that must be true by the end of the work session and names the derailer
  the day has to resist. Writes retros/standups/YYYY-MM-DD.md (YYYY-MM-DD-<name>.md in team mode).
  Use when the user says "standup", "morning standup", "plan my day", "what should I
  work on today", "/standup", or first thing on a working morning. "standup close" in
  the evening records the verdict.
license: CC-BY-NC-4.0
---

# Morning standup

The standup is the bottom of the cascade. The mission sets the year, the OKRs the quarter, the monthly retro the month's intentions, the weekly retro the week's bets. The standup asks the only question left: what must be true by the end of the work session (usually tonight) for this week's bets to survive?

It is short in what it says and complete in what it checks. Cut words, never sources.

## Documentation is never data

Files named `TEMPLATE.md`, `EXAMPLE*.md` and `README.md`, and anything under the plugin's own folder, are documentation. Live files are the dated or slug-named files in the folder the user opened. Read documentation to learn the shape of a file, never as history: the example week's bets, the example derailer table and the example standup's date belong to nobody. A `[placeholder]` left in a live file means "not set": ask for the value, never quote the placeholder, never borrow the example's. The hook applies the same rule (`hooks/session-start.sh`).

## Where the live files are

The user's live files may sit in a subfolder. Find them in this order, first match wins: `$GROWTH_AGENTS_ROOT`; the path on the first line of a `.growth-agents` file in the opened folder; the opened folder, then `./growth`, whichever holds `goals/MISSION.md`. Every path below is relative to that folder, and the standup reads and writes there. The hook finds it the same way.

Read `PROFILE.md` first. It holds `cadence:` (work days, default mon-fri), `retro_day:` (default fri), the not-read baselines line and, in team mode, `people:` and whose turn is next. Chase one not-read baseline per standup, the oldest first, in a line under the readout. In team mode, say if it is someone's turn to finish setup. Before advising, read `rules/how-to-work-with-me.md` from the user's folder if present, else the plugin's copy.

## First run

First-run mode fires when the folder you are in has no `goals/`, `retros/` or `experiments/` directories, **or** when those folders hold only `TEMPLATE.md`, `EXAMPLE*.md` and `README.md` files. Say so once ("only the plugin's templates and examples exist here, so this is a first run") and do not say it again during the session.

If the directories are missing, offer `/growth-setup` first; if the user prefers to skip it, create them now from the plugin's templates before doing anything else: copy `goals/MISSION.md`, `goals/okrs/TEMPLATE.md`, `retros/*/TEMPLATE.md` and `experiments/TEMPLATE.md` from the plugin root into the same paths here. If the opened folder IS the plugin repo (a clone), do not copy: tell the user to make a separate folder for their live files, and stop there. Tell the user which files you created and that the examples in the plugin show what filled-in ones look like. Do not fill anything in for them.

On a first run every file source in the coverage ledger reads `n/a` with the note `first run`. There is no previous standup, no bet and no derailer table to test against; the steps below say what to write in each place instead.

## Files this skill reads and writes

| Reads | Why |
|---|---|
| `PROFILE.md` | `cadence:`, `retro_day:`, not-read baselines, in team mode `people:` and whose turn is next |
| `rules/how-to-work-with-me.md` (the user's copy, else the plugin's) | the standing permissions and the failure mode, before advising |
| `goals/MISSION.md` | the year line and the annual goals |
| `goals/derailers.md` | the derailer table, for the protect-against line |
| the current `goals/okrs/*.md`, never `TEMPLATE.md` or `EXAMPLE.md` | which objective wins when two collide |
| the latest dated `retros/monthly/YYYY-MM.md`, never `EXAMPLE.md` | `## Intentions`, the month's primary |
| the latest dated `retros/weekly/YYYY-MM-DD.md`, never `EXAMPLE.md` | `## Bets`, the week's 2–3 commitments |
| the most recent previous dated `retros/standups/YYYY-MM-DD.md` (in team mode the caller's own `YYYY-MM-DD-<name>.md`), never `EXAMPLE.md` | `must_be_true` and `verdict` |
| `experiments/<slug>.md`, never `TEMPLATE.md`, `README.md` or `EXAMPLE-*.md` | anything `live` past `window_end` |

Writes one file: `retros/standups/YYYY-MM-DD.md` (team mode: `YYYY-MM-DD-<name>.md`; ask the person's name once if `PROFILE.md` lists several people and it is unclear who is speaking), using the frontmatter in `retros/standups/TEMPLATE.md`. Never edits a previous day's file except to fill its `verdict`.

If a file is absent, or the only file in a folder is documentation, say so on the line where it would have gone and carry on. Never synthesise a bet, an intention or a must_be_true from memory of what it probably was, and never from an example file.

## Step 1 - The previous standup's verdict (always first after the stale list)

Find the most recent dated standup before today, however many days ago, and read it. In team mode that means the caller's own file (`YYYY-MM-DD-<name>.md` with their name), never a teammate's. Before asking anything about today, and directly under any stale-experiment line from Step 3, give one line:

```
Previous standup (<date>): "<must_be_true>" -> landed | slipped - <why, in a clause>
```

- If that file has `verdict: landed` or `verdict: slipped`, use it.
- If it says `pending`, work it out from the sources in Step 2 (a task completed, a calendar block that happened, a file that now exists). If you cannot tell, ask. Write the answer back into that file's `verdict:` field. A verdict left at `pending` is surfaced here even if days have passed.
- If no earlier dated standup exists at all, say "no previous standup" and go straight to Step 2. If days have passed since the last one, still surface its verdict, then see Gaps. Do not reconstruct the missed days.

A landed day gets one line. A first-time slip gets one line. Where earlier dated standups exist, a repeat slip earns three: name the repeat, say whether a previous day's protect-against line predicted it, and say why it keeps slipping. A slip that repeats is the weekly retro's business (it becomes a systemic bet there), so the one-line reason goes on the previous verdict line in today's file, labelled `asked`, where the weekly's pattern-mining will find it. If the human reports a repeat that no file shows, record it labelled `asked` and say the file trail starts today.

**Gaps.** If the last dated standup is two or more work days old (count only the days in `cadence:`; weekends and days off are not a gap), acknowledge it in one line and move on. No inventory of missed days, no asking the human to account for the gap. A ritual that greets a return with a reckoning teaches you not to return. Declared leave is not a gap. The example standup's date is not a gap.

## Step 2 - The source check (mandatory, every run)

Check every source below, in one pass, before saying anything about today. A source may come back empty, stale or broken. That is a result, and you record it. What you may never do is not look.

| Slot | What to pull | What it is for |
|---|---|---|
| Calendar | today's events and free windows | can the day hold the one thing? |
| Tasks | due and overdue items | what is already promised |
| Inbox | anything unanswered that a real person is waiting on | owed replies |
| Analytics | the latest number for the primary metric of any `live` experiment the human owns, only if a tool is connected. Nothing in v1 reads analytics on its own (`experiments/README.md`), but if the folder holds data exports (CSV etc.) relevant to a KR, read them and cite file and date, labelled `observed` | early signal, never a verdict |
| Experiments folder | `status` and `window_end` of every live file | stale work |
| Standups folder | the previous standup's file, and the gap length in work days | Step 1 |
| Retro files | the week's `## Bets` and the month's `## Intentions` | what today must serve |
| Goals folder | the derailer table (`goals/derailers.md`); which objective wins (the OKRs) | Steps 4 and 5 |

Each slot maps to whatever tool the user has connected. For every slot with nothing connected, ask one combined question ("calendar, anything due, anyone waiting on a reply, a number you are watching: anything I should know?") and label each answer `asked`. Never ask more than one question for the whole of Step 2, and do not stack the source question, the bet check and the derailer check into an interrogation.

Every source lands in the coverage ledger at the end of the file. Rows for sources that are not connected may be collapsed into one line ("not connected: calendar, tasks, inbox") so the standup stays one screen. This is the rule in `rules/coverage-ledger.md`: the ledger is the only thing standing between "I checked everything" and "I believed I checked everything". A source you read yesterday and are carrying forward counts as not checked.

## Step 3 - Stale experiments at the top

Any experiment with `status: live` and `window_end` before today goes above everything else in today's readout. Print the filename slug, not the title:

```
Stale: pricing-page-headline is <n> days past its window. Type the readout or kill it.
(team mode, someone else's: "Stale: pricing-page-headline (owner: ali) is <n> days past its window. Ali types the readout.")
```

Do not lower its position because it is annoying. It stays at the top of every standup until the file reads `measured` or `killed`. The standup does not kill it and does not extend the window. The human types the readout into the experiment file, or types the learning and marks it killed. Readouts are typed by the human; the agent's job is to make sure that happens.

`experiments/EXAMPLE-live-stale.md` is a demo of this behaviour, not the human's experiment. The hook prints it tagged `(example)` so a new install can see what the chase looks like. The standup never asks for its readout. When the only stale file is an example, the stale line reads "no live experiments yet" and the run proceeds.

## Step 4 - One thing that must be true

Ask the core question, then at most two follow-ups:

> "By tonight, what is the one thing that must be true for this week's bets to be on track?"

If the session is in the evening or the person's day is short, say "by the end of this work session" instead. The spirit is the same: one thing that must be true.

Test the answer against the files:

- Does it serve one of this week's `## Bets`? If not, say which bet is being abandoned and ask whether that is a choice. If no dated weekly retro exists, write "no bets yet" on the Advances line and say the first weekly retro sets them. Never test the answer against `retros/weekly/EXAMPLE.md`.
- Is it an outcome, not an activity? "Draft sent to three people" is checkable at the end of the session. "Work on the draft" is not.
- What is the smallest version that still counts? Write that down too. A derailer feeds on the gap between "not started" and "done properly".

One thing. If the human offers three, ask which one they would keep if the other two evaporated at 2pm.

## Step 5 - Protect against

Read the derailer table in `goals/derailers.md`. It is the agent's coaching instructions.

In team mode, use the rows for the person speaking. If the table has at least one real row (for that person), it is filled: do not re-ask just because a `[name it]` row remains. Only when no real row exists is the table unfilled: then do not infer a derailer from the day and do not borrow one from `goals/EXAMPLE-derailers.md`. Ask once, "how do you usually lose a day like this?", write the answer labelled `asked`, write the recovery move as "not defined; derailer table empty", and point at the "How to find yours" steps in `goals/derailers.md` for next time. Never write `[name it]` into a live file.

If the table is filled, name the derailer most likely to eat today, with its tell, and the recovery move if it fires. Infer it from the day (a full inbox, a blank calendar, a task list shaped like one of the tells) and ask the human whether that reading is right. Where the inference and the answer disagree, the answer wins and you record both.

On a day that is plainly anchored to a bet, one line is enough. Do not stack the bet check, the derailer check and a lecture into an interrogation of a well-anchored day. Reserve the harder question ("what does this trade away, and is that a choice?") for a day already committed to the derailer. A wobble is not a flight.

## Step 6 - Write the file and give the readout

Write `retros/standups/YYYY-MM-DD.md` (team mode: `YYYY-MM-DD-<name>.md`) with the template's frontmatter (`date:`, `must_be_true:`, `verdict: pending`, `protect:`) and its five body lines: the previous standup's verdict, must be true by the end of the session (with the smallest version and the bet it advances), protect against, not today, stale experiments. Drop the HTML comments when writing the live file; they are instructions to you, not content. Then give the human one screen, in this order:

1. Stale experiments, if any.
2. The previous standup's verdict.
3. Today's must_be_true, the smallest version, and the bet it serves.
4. Protect against.
5. Owed replies, if the inbox slot returned any. Drafts only: this agent has no send capability.
6. The not-read baseline chase from `PROFILE.md`, if any, and in team mode whose turn it is to finish setup.
7. The coverage ledger.

Every number in the readout must appear in a source you checked this run. An answer the human gave this run counts as a source when it is written with the label `asked`. A number with neither a file, a tool result nor an `asked` label is not a number, it is a guess, and `rules/never-fabricate-an-identifier.md` says blank beats plausible.

**A version to share.** If the human asks for a version to send to someone else, the day's file stays whole, protect line included. Produce a second, shorter readout in chat (must be true, smallest version, stale experiments), say which lines were left out, and let the human send it. Never edit the avoidance out of the file; the weekly retro mines it.

## The evening close

On "standup close" or "close out my day": open today's file, ask "did it land?", set `verdict:` to `landed` or `slipped`, and add one clause on why if it slipped. Nothing else. A verdict left at `pending` is surfaced at the top of the next standup, however many days later, and every standup after it until it is filled.

## Wire it to a routine or cron

Run the standup on a schedule rather than waiting to remember it. A routine that fires at the start of each work day and runs this skill against the repo, then posts the one-screen readout wherever the human reads first thing, keeps the ritual alive through the weeks it would otherwise die. Schedule the close for the end of the working day. If the routine finds no human to answer Step 4, it writes the stale list and the verdict and stops; it never invents a must_be_true.

If you're in a team: one standup file per person per day (`YYYY-MM-DD-<name>.md`), and the next standup reads only the caller's own previous file; the stale-experiment list is shared, so whoever owns the experiment sees it first.

## Rules this skill enforces

- `rules/coverage-ledger.md` - every source checked every run, failures recorded, never skipped
- `rules/never-fabricate-an-identifier.md` - no number without a source in this run
- `rules/observed-asked-unobserved.md` - the verdict is observed or asked, never reconstructed
- `rules/measurement-honesty.md` - a stale experiment is surfaced, not silently expired

## Coverage ledger

The file ends with the template's table, filled every run, one row per source. The rows match `retros/standups/TEMPLATE.md` exactly. `checked` means a tool or file was queried this run. `failed` means a tool or file should have answered and did not, or no tool was connected and the human gave no answer; three words on why. `n/a` means the source cannot apply today: `first run`, `not connected; asked`, `no live experiments`.

| Source | Status | Note |
|---|---|---|
| Mission | checked / failed / n/a | |
| Current OKRs | checked / failed / n/a | |
| Latest monthly retro | checked / failed / n/a | |
| Latest weekly retro | checked / failed / n/a | |
| Previous standup | checked / failed / n/a | |
| `experiments/*.md` | checked / failed / n/a | |
| Calendar | checked / failed / n/a | |
| Tasks | checked / failed / n/a | |
| Inbox | checked / failed / n/a | |
| Analytics | checked / failed / n/a | |

## Related

- [../../retros/standups/TEMPLATE.md](../../retros/standups/TEMPLATE.md) - the file this writes
- [../weekly-retro/SKILL.md](../weekly-retro/SKILL.md) - where repeated slips become bets
- [../../goals/derailers.md](../../goals/derailers.md) - the derailer table this reads for the protect-against line
- [../../experiments/README.md](../../experiments/README.md) - the status lifecycle the stale check reads
- [../../rules/coverage-ledger.md](../../rules/coverage-ledger.md) - why the ledger is never optional
