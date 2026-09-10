---
name: growth-setup
description: >
  Onboard a new user of growth-agents in the folder they opened. Two modes: rapid
  (about five minutes, minimal input) and full (up to an hour, a proper interview
  on goals and objectives where the folder does not already hold the answers).
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

**First, check the folder is somewhere they will open again.** If it is a home directory, `Downloads`, `Desktop` or a `Documents` root, say so in one line and offer to create `growth/` inside it and write there. The hook reads whatever folder Claude Code is opened in, so the files have to live somewhere they will come back to.

**Then check whether this is a re-run.** If `goals/MISSION.md` has a filled `mission:` line and `goals/derailers.md` has no `[name it]` row, this is a re-run, not a first run. Say so once and jump to "Re-running" at the end of this skill. Everything below assumes a first run.

Now scan. Cheap, read-only, and it decides how much you need to ask:

| Look for | Where | What it tells you |
|---|---|---|
| **The year**: a mission, an annual target, a vision doc | `README.md`, `docs/`, `mission*`, `vision*`, `annual*`, `goals*`, `strategy*`, Notion or Google Docs exports | the mission line, sometimes verbatim |
| **The quarter**: OKRs, a quarterly plan, a launch plan | `OKR*`, `okrs/`, `plan*`, `roadmap*`, `launch*`, `q1*`–`q4*` | the objectives and KRs |
| **The month and the week**: current priorities, sprint goals, a to-do list | `priorities*`, `sprint*`, `weekly*`, `this-week*`, `todo*`, `TODO.md`, `*calendar*`, `editorial*`, project-tracker exports | intentions and bets already in flight |
| **Experiments already running** | `experiments*`, `tests*`, `ab*`, analytics and project-tracker experiment lists | what the log should start with, and what is already past its window |
| What the business sells and to whom | `README.md`, landing-page copy, `pricing*`, `about*` | the mission's noun and the buyer |
| Numbers that already exist | spreadsheets, CSV exports, dashboards, a dated readout | baselines for KRs and experiments |
| Channels in play | `blog/`, `content/`, `newsletter*`, `seo*`, `ads*`, social exports | which hires matter |
| Existing rituals | `retro*`, `standup*`, `journal*`, `weekly*` | what to keep, what to replace |
| Tools connected | MCP servers available to you, `.env*` key NAMES (never values), `package.json` | the stack pages to point at, **and a place to look for every row above** |

**A connected tool is a source, not just a pointer.** Before you ask anything, search the connected tools for each level and report what they hold. An `.env` key name or a config file is only a pointer: it yields no number.

Report what you found as one row per level, **year · quarter · month · week · experiments**, each `found (file)`, `stale (file, dated <when>)` or `absent`. Then the business and numbers rows. Never say a folder "looks like" something; quote it or say it is absent.

**`stale` means a file dated before its own period** (a quarterly file from a previous quarter, a weekly note over a week old). Quote it, treat the level as absent for every step that follows, and never carry its numbers or baselines forward.

**Then ask where the missing levels live, in one question, before asking for anything fresh.** Name every absent or stale level in that one question:

> "Your year goal, this quarter's objectives, any tests already running, and the numbers behind them: do any of these exist somewhere else (Asana, Notion, Google Docs, Linear, Jira, a dashboard, a spreadsheet), or are they in your head? Name the tool per level."

Ask about the levels Step 4 writes (the year, the quarter, experiments) and about the numbers, which are the likeliest to have a home that is not a level at all. Report month and week as found, stale or absent and move on; the retros own those files, and an answer about them goes to question 8 as a candidate ritual, not into a file.

If a connected tool holds them, read them and cite the tool, the page and the date. If they exist but the tool is not connected, ask for a paste or an export and treat it like a file. A paste that is not already the shape you asked for (a task list where objectives were asked for) is evidence for the interview, never text to copy into a live file; say so. Only when the answer is "nowhere" does the interview write them from scratch. There is a fourth answer worth naming: "sort of, in an informal file". Treat it as "nowhere" for the plan itself, and take the file to question 8 as a candidate ritual rather than dropping it.

One more thing to watch in the scan: **matches inside a subfolder that repeats per named entity** (`clients/*/`, `accounts/*/`, `portfolios/*/`) belong to that entity, not to the person who opened the folder. Report them that way and say so.

## Step 1 - Mode

Ask once:

> **Rapid** (about five minutes): I take what I found, ask where anything missing lives, then five questions, and write the files for you to edit later.
> **Full** (up to an hour): I interview you properly on the year, the objectives and how you lose a week, and only skip a question when the folder already answers it.

Default to rapid if they do not choose. Rapid asks the mode question, the profile question if Step 0 does not settle it, the one where-does-it-live question, and the five starred questions, and nothing else: no follow-ups, and no fallbacks except the one built into question 1. Every other short answer in rapid mode is written as given. Full asks until every file below can be written without a guess, and stops when it can.

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

1. ★ **The year in one line.** A number and a date. If they cannot give a number: "What would make this year a clear win, in a sentence?" then ask what single count would prove it. This fallback runs in rapid mode too. Name the unit if it helps (revenue, customers, referring domains) but never the value. If fewer than sixteen weeks remain in the calendar year, ask whether the line is this 31 December or the next; a 31 December mission written in September is a sixteen-week mission wearing a year's coat. The number comes from them or the line stays `[not set]`, brackets included, so the hook reads it as absent. If their own answer carries a hedge ("might be wrong by twenty per cent"), write the number clean and drop the hedge; the mission holds the line, not the caveat.
2. ★ **Why this number.** Two sentences: what hitting it makes possible, what missing it costs.
3. **Annual goals.** Three to five, each with what "done" looks like on the last day of the year. Full mode pushes back once on any goal that is an activity rather than an outcome. If they still want it, write it as they asked and move on.
4. ★ **The quarter's objectives** (this quarter, or next quarter if fewer than four weeks remain in it; say which before you draft). Two to four, drafted by you from the annual goals and the profile, shown for editing. For each, one behaviour KR they control and one outcome KR. **Draft the shape, never the number**: "[count] demos a week" is a draft, "3 demos a week" is an invented target. Full mode asks "what could you do every week that makes this more likely?" until each objective has a behaviour. In the same turn as the draft, also ask what they are dropping this quarter (the thing they keep steering toward that is not on the line) and which objective wins when two collide; the file has a row for each. **This is the one turn that carries three asks.** A steer that survives one pushback becomes a Dropped row, not a third objective, and that holds whether it came up when asked or unprompted halfway through the interview.
5. **Baselines.** For each outcome KR: do we have the number today? Read it from Step 0 if it is there, or from a connected tool if one holds it, and write the source beside it in the cell (tool or file, and the date read). A number with no date is not read. Otherwise write `not read`, name the tool that holds it, and tell them the first standup will ask. **Never estimate, and never promote a remembered figure**: "it was about 8% in February" is quoted in the chat, never written into a baseline. The spelling is `not read` in the OKR table's Baseline column and `baseline: not read` in experiment frontmatter; the hook and the retro skills treat both as not set. Behaviour KRs with no observable source get `not read` too.
6. ★ **How you lose a week.** One derailer in rapid mode, up to three in full mode, each with the tell (something the agent can observe in their files) and the smallest recovery move. Full mode offers the three names from `goals/EXAMPLE-derailers.md` as a menu of names only, then asks for theirs in their words with their own tell and recovery move. Reusing an example's name is fine; the tell must be theirs. Never copy a row. A skipped derailer stays `[name it]`, and the standup asks.
7. ★ **The first experiment.** One test that moves the most important objective. Hypothesis, audience, treatment, metric. Baseline is `not read` and the window blank until they have them; the file stays `planned` until both are filled, and you say so. If it is a split test, say the window length comes from `experiments/power-check.md` and link it, rather than asking them for one. If they ask you to mark it `live` anyway, refuse once, name the two reads that would make it live, and do not raise it again.
8. **What already runs.** Full mode only: which of their existing rituals or tools to keep, and which the cascade replaces. Write the answer into `retros/compounding-ledger.md` under "Refused this month, reassess next", each row marked "candidate from /growth-setup" with today's date. Never under Live; the monthly retro decides admission.
9. **Team, solo, or portfolio.** In rapid mode this is one word written into `PROFILE.md`. If they are in a team: one mission for the team, **their own derailer table only** (derailers are personal, and `goals/derailers.md` forbids naming someone else's for them; leave the other rows blank and say plainly that each colleague needs their own run), and record where the team already keeps tests. If they run several client or portfolio accounts under one practice, an agency or a freelance consultant: **the mission and the OKRs are about the practice** (clients retained, revenue, capacity) and never a client's growth number, and each account keeps its own `clients/<name>/experiments/` outside the cascade, noted once in `PROFILE.md`.

Rules while interviewing: one question per turn, except question 4; offer a default with every question; accept "skip"; never restate a question they answered; never fill a blank with a plausible value. In full mode, an answer under about fifteen words to an open question gets one follow-up, once. An answer that runs long gets the part that answers the question written back in one line for confirmation; a steer buried inside it goes to the Dropped row, not to a new question.

## Step 4 - Write the files

Create the folders if absent, then write, in this order, from the templates in the plugin with all HTML comments and template instruction prose dropped. **That includes instruction sentences buried inside a section you otherwise filled in**, not just the comments at the top: an answered one goes, an unanswered one is replaced by an explicit open question. A template's own instructions must never sit in a live file. Keep the frontmatter, headings and tables; **rewrite each Related list so every link resolves inside the user's folder**, since the templates link to EXAMPLE files that exist only in the plugin.

- `goals/MISSION.md` with the `mission:` line first (the hook reads it)
- `goals/okrs/<year>-q<n>.md` with `| O1 | ... |` rows and the KR table. Keep each objective under about forty characters; the hook prints the first two on one line and trims at a hundred. **If fewer than four weeks remain in the calendar quarter and no live file exists for it, write next quarter's file and say so. If a live file for this quarter already exists, write next quarter's to `goals/okrs/next/` and say that the hook and the retros read the newest file in `goals/okrs/`, so it stays there until the quarter starts. Never overwrite a live quarter file.**
- `goals/derailers.md` with the derailer table filled
- `experiments/<slug>.md` at `status: planned` for the first experiment. **Also write one file per test Step 0 found already running**, at `status: live` with its start date and `window_end` as the source gives it, or `window_end:` blank and a line saying the source names none. Say which found tests you wrote. The hook reads only files, so a test with no file here is a test nothing will ever chase.
- `retros/compounding-ledger.md` only if question 8 produced candidates
- `PROFILE.md`: the chosen profile, the hires that matter, the stack pages to read first, every tool they named that has no page in `stack/`, and one line listing each `not read` baseline with the tool that holds it. Ten lines. The first standup reads that last line.

Then run the hook **against their folder, never from the plugin**: from the folder you just wrote into, run `bash "$CLAUDE_PLUGIN_ROOT/hooks/session-start.sh"`. The hook reads live files from the current directory, so running it with the plugin as the working directory prints the shipped examples and tells the user to run setup again. Check the Mission line is theirs before you paste, then paste the output unedited.

Month, Week and Today will still show example lines until the first retros run; say so in one line. Finish with one line: **"Run `/standup` tomorrow morning. It opens with a verdict on today."**

Nothing is sent, posted, or written outside the folder. No live file is created for a retro or a standup; those are the skills' job.

## Coverage ledger

End with the sources checked in Step 0: each one `checked`, `absent`, or `failed (three words why)`. Never omit a row.

## Re-running

A re-run is a quarter boundary, not a fresh setup. Say so once, then skip the profile question and questions 1, 2, 6 and 7, quoting the live file for each. Ask where next quarter's objectives live, then ask question 4. Write only the quarter's OKR file and leave every other live file untouched.

Two things to check on the way through. List every `planned` or `live` experiment with its `kr:` beside the new objective table and ask which new id each one serves, then write back that one field and nothing else; an id that now points at a different objective is a silent mis-score every Friday. And take no baseline from the quarter that is ending: for a file written before its quarter begins, every outcome KR is `not read`, even where Step 0 found a dated readout.

Teams come in two shapes and the answer differs. **One shared repo** (one `derailers.md`, one `experiments/`): run it once, fill only the rows the person in front of you can answer for themselves, and say in `PROFILE.md` which rows are still open and whose turn is next. **A folder each**: run it once per person, and share `goals/MISSION.md` and `experiments/` between them.

## Related

- [../morning-standup/SKILL.md](../morning-standup/SKILL.md) - what runs the morning after setup
- [../../goals/MISSION.md](../../goals/MISSION.md) - the template this writes first
- [../../goals/derailers.md](../../goals/derailers.md) - the coaching instructions this fills
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md) - the first experiment's shape
- [../../ROSTER.md](../../ROSTER.md) - the hires each profile leans on
