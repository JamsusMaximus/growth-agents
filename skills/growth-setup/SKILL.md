---
name: growth-setup
description: >
  Onboard a new user of growth-agents in the folder they opened. Two modes: rapid
  (five to ten minutes, about seven short turns: one opening turn, then the year,
  this quarter, how they lose a week, a first test, their work days, and this
  week and today) and full
  (up to an hour, a proper interview on goals and objectives where the folder
  does not already hold the answers).
  Looks for existing context first, picks a role profile, writes the mission,
  annual goals, quarter OKRs, derailers and a first planned experiment, then
  hands over to /standup. Triggers on "growth-setup", "set up growth-agents",
  "onboard me", "get started", "first run", "customise this for my role".
license: CC-BY-NC-4.0
---

# growth-setup

Turn the shipped templates into this person's operating system, in the folder they are in, without inventing a single fact about their business.

## Documentation is never data

`TEMPLATE.md`, `EXAMPLE*.md`, `README.md` and anything under the plugin's own folder are documentation. Read them for shape only. Never copy an example value into a live file. A `[placeholder]` left in a live file means "not set".

## Step 0 - Look before asking

**First, read their own house rules.** If the opened folder has a `CLAUDE.md` or `AGENTS.md`, read it before you write anything and obey its placement and naming rules. If it forbids new top-level folders, put the growth files under the folder it allows (for example a `growth/` folder inside `docs/`). Filenames and `window_end` stay ISO `YYYY-MM-DD` even if their rules prefer another date format, because the hook sorts and compares them; say so once.

**Then check the folder is somewhere they will open again.** If it is a home directory, `Downloads`, `Desktop` or a `Documents` root, say so in one line and offer to create `growth/` inside it and write there. If it is the growth-agents repo itself, say so and offer a separate folder: the repo is public and their goals do not belong in it. The hook reads the folder the agent is opened in, then its `growth/` subfolder, or wherever a `.growth-agents` pointer says, so the files have to live somewhere they will come back to.

**Whenever the live files go anywhere other than the opened folder** (you created `growth/`, or their rules forced a folder inside `docs/`), also write a file named `.growth-agents` in the opened folder whose first line is the relative path, for example `notes/growth`. The hook reads `$GROWTH_AGENTS_ROOT` first, then that file, so they can keep opening the same folder. If their own rules forbid new files in that folder, ask once before writing the pointer. If they say no, tell them the two alternatives: open the agent in the growth folder itself, or set `GROWTH_AGENTS_ROOT` to its path.

**Then check whether this is a re-run**, in the live folder (the opened folder, wherever `.growth-agents` points, or `growth/`). If `PROFILE.md` exists and `goals/MISSION.md` has a filled `mission:` line, this is a re-run, not a first run. Say so once and jump to "Re-running" at the end of this skill. If `PROFILE.md` says team and the person in front of you is not in its `people:` list, it is a team join instead: jump to "Joining a team" under "Re-running". Everything below assumes a first run.

Now scan. Cheap, read-only, and it decides how much you need to ask:

| Look for | Where | What it tells you |
|---|---|---|
| **The year**: a mission, an annual target, a vision doc | `README.md`, `docs/`, `mission*`, `vision*`, `annual*`, `goals*`, `strategy*`, Notion or Google Docs exports | the mission line, sometimes verbatim |
| **The quarter**: OKRs, a quarterly plan, a launch plan | `OKR*`, `okr*`, `okrs/`, `plan*`, `roadmap*`, `launch*`, `q1*`–`q4*` | the objectives and KRs |
| **The month and the week**: current priorities, sprint goals, a to-do list | `priorities*`, `sprint*`, `weekly*`, `this-week*`, `todo*`, `TODO.md`, `*calendar*`, `editorial*`, project-tracker exports | intentions and bets already in flight |
| **Experiments already running** | `experiments*`, `tests*`, `ab*`, analytics and project-tracker experiment lists | what the log should start with, and what is already past its window |
| What the business sells and to whom | `README.md`, landing-page copy, `pricing*`, `about*` | the mission's noun and the buyer |
| Numbers that already exist | spreadsheets, CSV exports, dashboards, a dated readout | baselines for KRs and experiments |
| Channels in play | `blog/`, `content/`, `newsletter*`, `seo*`, `ads*`, social exports | which hires matter |
| Existing rituals | `retro*`, `standup*`, `journal*`, `weekly*` | what to keep, what to replace |
| Tools connected | MCP servers available to you, `.env*` key NAMES (never values), `package.json` | the stack pages to point at, **and a place to look for every row above** |

**A connected tool is a source, not just a pointer.** Before you ask anything, search the connected tools for each level and report what they hold. An `.env` key name or a config file is only a pointer: it yields no number.

Report what you found in plain words, one short line each for **your goal for the year, this quarter's plan, this month and week, tests already running**: "found in `<file>`", "out of date (`<file>`, from <when>)" or "not found". Then one line on the business and one on the numbers. `stale` and `absent` are your words for reasoning, not theirs. Never say a folder "looks like" something; quote it or say it is not there.

**`stale` means a file dated before its own period** (a quarterly file from a previous quarter, a weekly note over a week old). Quote it, treat the level as absent for every step that follows, and never carry its numbers or baselines forward.

**Then send the opening turn: one message, numbered, every ask with a default, answerable in one reply.** It carries (1) where the missing items live, naming only the ones not found; (2) rapid or full (Step 1); (3) which description sounds like their job (Step 2), only if the scan does not settle it; (4) the folder offer above, only if it applies. The first ask reads like:

> "Your goal for the year, this quarter's plan, any tests you are already running, and the numbers behind them: are any of these written down somewhere else, say a doc, a spreadsheet or a project tool, or are they in your head?"

Ask about the levels Step 4 writes (the year, the quarter, experiments) and about the numbers, which are the likeliest to have a home that is not a level at all. Report month and week as found, stale or absent and move on; the retros own those files, and an answer about them goes to question 8 as a candidate ritual, not into a file.

If a connected tool holds them, read them and cite the tool, the page and the date. If they exist but the tool is not connected, ask for a paste or an export and treat it like a file. A paste that is not already the shape you asked for (a task list where objectives were asked for) is evidence for the interview, never text to copy into a live file; say so. Only when the answer is "nowhere" does the interview write them from scratch. There is a fourth answer worth naming: "sort of, in an informal file". Treat it as "nowhere" for the plan itself, and take the file to question 8 as a candidate ritual rather than dropping it.

One more thing to watch in the scan: **matches inside a subfolder that repeats per named entity** (`clients/*/`, `accounts/*/`, `portfolios/*/`) belong to that entity, not to the person who opened the folder. Report them that way and say so.

## Step 1 - Mode

Ask once:

> **Rapid** (five to ten minutes, about seven short turns): I take what I found, then ask about your year, this quarter, how you usually lose a week, a first test, which days you work, and this week and today. You finish with today's plan on screen.
> **Full** (up to an hour): I interview you properly on the year, the objectives and how you lose a week, and only skip a question when the folder already answers it.

Default to rapid if they do not choose. Steps 1 and 2 are asked inside the opening turn from Step 0, not as turns of their own. In rapid mode the turns are: the opening turn (where things live, mode, profile if needed, folder offer if needed); question 1 with 2 (and the year-end options inside it); question 4; question 6; question 7; the work-days half of question 9; question 10. About seven. The only extra turn is the end date of a test that is already running with none (Step 4). Nothing else: no further fallbacks or follow-ups. Every other short answer in rapid mode is written as given. Full asks until every file below can be written without a guess, and stops when it can.

## Step 2 - Role profile

One question, multiple choice, skipped if Step 0 makes it obvious (say why):

| Profile | Mission shape | Objectives lean on | Hires that matter most | Stack pages to read first |
|---|---|---|---|---|
| **Solo operator / founder** | revenue, ARR or MRR by a date | conversion, list, product | all cadence roles; product lead; ghostwriter and editor | payments, analytics, email list |
| **Growth lead (team)** | one growth number the team owns | conversion, activation, channel volume | cadence roles; critic bench; SEO analyst | analytics, CRM, project tracker |
| **Product marketing** | launches that move pipeline | launch cadence, message tests, enablement adoption | product lead (`/prd`); ghostwriter (`/copywriting-hooks`, `/linkedin-post`); editor (`/tone-of-voice`, `/humanizer`); critic bench (`/multi-agent-refine`); cadence roles | analytics, CRM, email |
| **SEO / backlinks** | referring domains and rankings for a keyword set | links per month, keywords into the top ten, content that earns links | SEO analyst (`/seo-audit`); ghostwriter (`/copywriting-hooks`) for outreach and link-worthy pieces; cadence roles. No hire sends outreach; that behaviour KR is theirs alone, say so in `PROFILE.md` | SEO data, scraping, site analytics |
| **Content / creator** | audience and owned list | publish cadence, list growth, one channel to win | cadence roles; ghostwriter (`/linkedin-post`); editor. Then by channel: video researcher (`/youtube-package`, `/vidiq-competitive`) for video, SEO analyst (`/seo-audit`) for a blog | email list first, then video data or SEO data to match the channel |
| **Other** | ask them to describe the job in one sentence, then map to the nearest profile and say which. If the number they own is retention, expansion or renewals rather than acquisition, say so in `PROFILE.md` and drop the acquisition hires | the number they are measured on | cadence roles; critic bench; editor | CRM, payments, product analytics |

Two rules for reading that table. **A hire only matters if the channel exists**: the folder and the interview say which, so name the ones that apply and drop the rest in `PROFILE.md` rather than listing all of them. **A stack page that does not exist is said, not implied**: if a tool they named has no page in `stack/`, write "no page yet: `<tool>`" in `PROFILE.md` and say its numbers are typed in by hand until there is one.

The profile changes emphasis, never the system: every profile gets the cascade, the experiment log, the rules and the harness.

## Step 3 - The interview

Ask in this order. In rapid mode, ask only the starred questions and fill the rest with "not set" placeholders that look like placeholders. In full mode, ask them all, one at a time, multiple choice where the answer space is known, and skip any the folder already answers (quote the source when you skip).

1. ★ **The year in one line.** A number and a date. If they cannot give a number: "What would make this year a clear win, in a sentence?" then ask what single count would prove it. This fallback runs in rapid mode too. Name the unit if it helps (revenue, customers, referring domains) but never the value. If fewer than sixteen weeks remain in the calendar year, offer both dates as the options inside question 1's own turn ("by 31 December this year, or next year?"), never as a turn of their own, and skip it when the folder already names the year; a 31 December mission written in September is a sixteen-week mission wearing a year's coat. If they pick next year, say that this quarter's OKRs serve the first steps towards it. The number comes from them or the line stays `[not set]`, brackets included, so the hook reads it as absent. If their own answer carries a hedge ("might be wrong by twenty per cent"), write the number clean and drop the hedge; the mission holds the line, not the caveat.
2. ★ **Why this number.** Two sentences: what hitting it makes possible, what missing it costs. In rapid mode, ask it in the same turn as question 1 ("...and in a sentence, why that number?").
3. **Annual goals.** Three to five, each with what "done" looks like on the last day of the year. Full mode pushes back once on any goal that is an activity rather than an outcome. If they still want it, write it as they asked and move on.
4. ★ **The quarter's objectives** (this quarter, or next quarter if fewer than four weeks remain in it; say which before you draft). Two to four, drafted by you from the annual goals and the profile, shown for editing. For each, one behaviour KR they control and one outcome KR. **Draft the shape, never the number**: "[count] demos a week" is a draft, "3 demos a week" is an invented target. Full mode asks "what could you do every week that makes this more likely?" until each objective has a behaviour. In full mode, in the same turn as the draft, also ask what they are dropping this quarter (the thing they keep steering toward that is not on the line) and which objective wins when two collide; the file has a row for each. In rapid mode, show the draft and ask only "anything to change? If you already know a target for either, say it"; write any target they give, leave the rest as the drafted shape, and write the Dropped and which-wins rows as `not set`. A steer that survives one pushback becomes a Dropped row, not a third objective, and that holds whether it came up when asked or unprompted halfway through the interview.
5. **Baselines.** For each outcome KR: do we have the number today? Read it from Step 0 if it is there, or from a connected tool if one holds it, and write the source beside it in the cell (tool or file, the date read, and the period it covers). A number counts when it has a source and a period. A number they type or paste in this session is `asked`: today is the date read and the period is as they state it. A number from an undated file is written with "period unknown" and its source; full mode asks once for the period, rapid mode does not. Never invent a period. Otherwise write `not read`, name the tool that holds it, and tell them the first standup will ask. **Never estimate, and never promote a remembered figure**: "it was about 8% in February" is quoted in the chat, never written into a baseline. The spelling is `not read` in the OKR table's Baseline column and `baseline: not read` in experiment frontmatter; the hook and the retro skills treat both as not set. Behaviour KRs with no observable source get `not read` too.
6. ★ **How you lose a week.** One derailer in rapid mode, up to three in full mode, each with the tell (something the agent can observe in their files) and the smallest recovery move. Full mode offers the three names from `goals/EXAMPLE-derailers.md` as a menu of names only, then asks for theirs in their words with their own tell and recovery move. Reusing an example's name is fine; the tell must be theirs. Never copy a row. Write only the derailers they actually named and delete the unused template rows: no `[name it]` row ever sits in a live file. If they skip, the table keeps its header and no rows, and the standup asks.
7. ★ **The first experiment.** One test that moves the most important objective. Hypothesis, audience, treatment, metric. **Aim for one that can go live today:** prefer a test they already run, or a change they can ship this week, and in the same question offer, as optional, the number it starts from and the date they will judge it. In rapid mode the turn reads like: "What is one thing you will change and see if it helps? If you have the starting number and a date to judge it, add them and it goes live today; if not, skip it and the standup asks later." Skipping costs nothing and is never questioned. If the starting number lives in a tool you cannot read ("it's in HubSpot", "about 25 last month"), ask them to open it now and paste last period's figure, saying it takes a minute and lets the test go live today; a pasted figure is `asked`, a remembered one stays in the chat. If they give both, write it `live` (a split test still needs the power check below). Otherwise baseline is `not read` and the window blank; the file stays `planned` until both are filled, and you say so. If it is a split test, the window length comes from the power check ([power-check.md](https://github.com/JamsusMaximus/growth-agents/blob/main/experiments/power-check.md), not copied into their folder), rather than asking them for one. Where the baseline and weekly traffic are known, run its arithmetic in the chat, show the numbers, and write the verdict into `power_check:` (for example `power_check: can conclude, detects 1.4 points in 3 weeks` or `power_check: cannot conclude in window`); where they are not, write `power_check: not run` and name the missing input. If they ask you to mark it `live` anyway, refuse once, name the two reads that would make it live, and do not raise it again. Setup never sets `live` on an A/B test whose verdict is `cannot conclude`.
8. **What already runs.** Full mode only: which of their existing rituals or tools to keep, and which the cascade replaces. Write the answer into `retros/compounding-ledger.md` under "Refused this month, reassess next", each row marked "candidate from /growth-setup" with today's date. Never under Live; the monthly retro decides admission.
9. **Team, solo, or portfolio, and which days do you work on growth?** In rapid mode this is one word and a list of days, written into `PROFILE.md` as the profile mode, `cadence:` (default `mon-fri`) and `retro_day:`, the last of those days (default `fri`). If they are in a team: one mission for the team, a `people:` list of names in `PROFILE.md`, **their own derailer rows only** (the table gets a `Who` column; derailers are personal, and `goals/derailers.md` forbids naming someone else's for them; write no rows for colleagues and say plainly that each colleague needs their own run), and record where the team already keeps tests. In team mode standups are `retros/standups/YYYY-MM-DD-<name>.md` and experiments carry an optional `owner:`. If they run several client or portfolio accounts under one practice, an agency or a freelance consultant: **the mission and the OKRs are about the practice** (clients retained, revenue, capacity) and never a client's growth number, and each account keeps its own `clients/<name>/experiments/` outside the cascade, noted once in `PROFILE.md`.

10. ★ **This week and today.** One turn, two asks, last question in both modes: "What one or two things would make this week a win?" (each tied to an objective; offer the first experiment as the default) and "What one thing must be true by the end of today, or of your next work session if today is done?" Accept a small answer; the point is a plan on screen before they leave.

Rules while interviewing: one question per turn, except questions 4 and 10, and 1 with 2 in rapid mode; offer a default with every question; accept "skip"; never restate a question they answered; never fill a blank with a plausible value. **Ask in plain words, not file vocabulary**: "your target for the quarter" rather than KR, "the number you are starting from" rather than baseline, "the date you will judge it" rather than window_end, "how you usually lose a week" rather than derailer, "this week's one or two priorities" rather than bets. Also: "something you do every week" and "the number you want to move" rather than behaviour KR and outcome KR; "the sign it is happening" rather than tell; "several clients" rather than portfolio; "what you will change and what you expect" rather than hypothesis and treatment; "whether the test gets enough traffic to give an answer" rather than power check; "big goals for the quarter" rather than objectives. This applies to everything the person reads, the Step 0 report included. Use the file terms only when you show a file. In full mode, an answer under about fifteen words to an open question gets one follow-up, once. An answer that runs long gets the part that answers the question written back in one line for confirmation; a steer buried inside it goes to the Dropped row, not to a new question.

## Step 4 - Write the files

Write into the live folder Step 0 settled (and the `.growth-agents` pointer if that is not the opened folder). Create the folders if absent, then write, in this order, from the templates in the plugin with all HTML comments and template instruction prose dropped. **That includes instruction sentences buried inside a section you otherwise filled in**, not just the comments at the top: an answered one goes, an unanswered one is replaced by an explicit open question. A template's own instructions must never sit in a live file. Keep the frontmatter, headings and tables; **rewrite each Related list so every link resolves inside the user's folder**, since the templates link to EXAMPLE files that exist only in the plugin.

- `goals/MISSION.md` with the `mission:` line first (the hook reads it)
- `goals/okrs/<year>-q<n>.md` with `| O1 | ... |` rows and the KR table. Keep each objective under about forty characters; the hook prints the first two on one line and trims at a hundred. **If fewer than four weeks remain in the calendar quarter and no live file exists for it, write next quarter's file and say so. If a live file for this quarter already exists, write next quarter's to `goals/okrs/next/` and say that the hook and the retros read the newest file in `goals/okrs/`, so it stays there until the quarter starts. Never overwrite a live quarter file.**
- `goals/derailers.md` with only the derailers they named, unused template rows deleted (a `Who` column in team mode). A table with at least one real row, for that person in team mode, is filled
- `experiments/<slug>.md` at `status: planned` for the first experiment. **Also write one file per test Step 0 found already running**, at `status: live` with its start date and `window_end` in `YYYY-MM-DD`. Never write `live` without one. If the source gives a start date and a duration ("runs 4 weeks"), compute the end date and say so in the file. If there is no end date at all, ask for it: this is the one follow-up rapid mode allows. If they still cannot name one, write it `planned` with a line saying it is already running since its start date and needs an end date, and the first standup asks. A test that is genuinely running stays `live` even with `baseline: not read`; that is the stated exception to rule 1, and the blank is chased. A running A/B test also gets the power check from question 7 and its `power_check:` verdict. Say which found tests you wrote. The hook reads only files, so a test with no file here is a test nothing will ever chase.
- `retros/weekly/<date>.md` holding only a `## Bets` list from question 10, dated by the most recent `retro_day` strictly before today, with `seeded_by: growth-setup` in its frontmatter so nobody mistakes it for a retro that ran. Keep each bet under about forty-five characters and put the KR and smallest version after it on the same line ("Ship the day-2 email - KR1.2, smallest version: ..."); the hook shows the text before the dash. The first weekly retro scores these bets.
- `retros/standups/<today>.md` (team mode: `<today>-<name>.md`) from the standup template with `must_be_true:` from question 10, `verdict: pending`, `protect:` from the derailer they named (or `not set`), and the previous-standup line reading "first standup, written at setup". Leave out the coverage ledger table; write the single line "Coverage: written at setup, no sources read." The next standup writes the full ledger. The next standup opens with a verdict on it.
- `retros/compounding-ledger.md` only if question 8 produced candidates
- `PROFILE.md`: the chosen profile and whether they are solo, team or portfolio; `cadence:`, the days they work on growth (for example `mon-fri` or `tue, sat`, default `mon-fri`); `retro_day:`, the last work day of their week (default `fri`); in team mode a `people:` list of names and whose turn is next; the hires that matter; the stack pages to read first; every tool they named that has no page in `stack/`; and one line listing each `not read` baseline with the tool that holds it. Ten lines or so. The first standup reads that last line.

Then run the hook **against their folder, never from the plugin**, from the folder they opened: in Claude Code, `bash "${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh"`; in any other agent, `bash <path to the cloned growth-agents>/hooks/session-start.sh`. Running it with the plugin as the working directory prints the shipped examples and tells the user to run setup again. Check the Mission line is theirs before you paste, then paste the output unedited, so they see their own mission. If the files went to a subfolder, say that the `.growth-agents` pointer means they can keep opening the same folder.

Week and Today now show their plan; Month reads "not set" until the first monthly retro; say so in one line. Finish with one line: **"Run `/standup` on your next work day. It opens with a verdict on today."**

Nothing is sent, posted, or written outside the folder. Beyond the seed bets and the first standup above, no retro or standup file is created; those are the skills' job.

## Coverage ledger

End with the sources checked in Step 0: each one `checked`, `absent`, or `failed (three words why)`. Never omit a row.

## Re-running

A re-run is a quarter boundary, not a fresh setup. Say so once, then skip the profile question and questions 1, 2, 6 and 7, quoting the live file for each. Ask where next quarter's objectives live, then ask question 4. Write only the quarter's OKR file and leave every other live file untouched.

Two things to check on the way through. List every `planned` or `live` experiment with its `kr:` beside the new objective table and ask which new id each one serves, then write back that one field and nothing else; an id that now points at a different objective is a silent mis-score every Friday. And take no baseline from the quarter that is ending: for a file written before its quarter begins, every outcome KR is `not read`, even where Step 0 found a dated readout.

Teams come in two shapes and the answer differs. **One shared repo** (one `derailers.md`, one `experiments/`): run it once, fill only the rows the person in front of you can answer for themselves, and say in `PROFILE.md`'s `people:` list whose turn is next. **A folder each**: run it once per person, and share `goals/MISSION.md` and `experiments/` between them.

**Joining a team.** Ask the person's name first, then compare it with `people:`. If `PROFILE.md` says team and they are not in `people:`, this is a join, not a re-run. Add them to `people:`, move "whose turn next" to the next person still to finish setup (or `none`), ask question 6 for their own derailer rows (their name in `Who`), and add any bets or experiments of their own with `owner:` set to them. Never overwrite `goals/MISSION.md`, the OKR file or anyone else's rows. Then run the hook as in Step 4.

## Related

- [../morning-standup/SKILL.md](../morning-standup/SKILL.md) - what runs the morning after setup
- [../../goals/MISSION.md](../../goals/MISSION.md) - the template this writes first
- [../../goals/derailers.md](../../goals/derailers.md) - the coaching instructions this fills
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md) - the first experiment's shape
- [../../ROSTER.md](../../ROSTER.md) - the hires each profile leans on
