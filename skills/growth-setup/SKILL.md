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

Scan the current folder before the first question. Cheap, read-only, and it decides how much you need to ask:

| Look for | Where | What it tells you |
|---|---|---|
| **The year**: a mission, an annual target, a vision doc | `README.md`, `docs/`, `mission*`, `vision*`, `annual*`, `goals*`, `strategy*`, Notion or Google Docs exports | the mission line, sometimes verbatim |
| **The quarter**: OKRs, a quarterly plan, a launch plan | `OKR*`, `okrs/`, `plan*`, `roadmap*`, `launch*`, `q1*`–`q4*` | the objectives and KRs |
| **The month and the week**: current priorities, sprint goals, a to-do list | `priorities*`, `sprint*`, `weekly*`, `this-week*`, `todo*`, `TODO.md`, project-tracker exports | intentions and bets already in flight |
| **Experiments already running** | `experiments*`, `tests*`, `ab*`, analytics experiment lists | what the log should start with, and what is already past its window |
| What the business sells and to whom | `README.md`, landing-page copy, `pricing*`, `about*` | the mission's noun and the buyer |
| Numbers that already exist | spreadsheets, CSV exports, dashboards, a dated readout; analytics or payments config only says where to look | baselines for KRs and experiments; a config file alone yields no number, so write `baseline: not read` and name the tool |
| Channels in play | `blog/`, `content/`, `newsletter*`, `seo*`, `ads*`, social exports | which hires matter |
| Existing rituals | `retro*`, `standup*`, `journal*`, `weekly*` | what to keep, what to replace |
| Tools connected | MCP servers available to you, `.env*` key NAMES (never values), `package.json` | the stack pages to point at |

Report what you found as one row per level, **year · quarter · month · week · experiments**, each `found (file)` or `absent`, then the business and numbers rows. Never say a folder "looks like" something; quote it or say it is absent. A file dated a previous year or quarter is a prompt, not an answer: quote it, ask what changed, and never carry its numbers or baselines forward.

**Then, for every level marked absent, ask where it lives before asking for it fresh:** "Your quarter goals: do they exist somewhere else (Asana, Notion, Google Docs, Linear, Jira, a spreadsheet), or are they in your head?" If a connected tool holds them, read them from there and cite it. If they exist but the tool is not connected, ask for a paste or an export and treat it like a file. Only when the answer is "nowhere" does the interview write them from scratch.

## Step 1 - Mode

Ask once:

> **Rapid** (about five minutes): I take what I found, ask five questions, write the files, you edit them later.
> **Full** (up to an hour): I interview you properly on the year, the objectives and how you lose a week, and only skip a question when the folder already answers it.

Default to rapid if they do not choose. Rapid asks the mode question, the profile question if Step 0 does not settle it, the where-does-it-live question for absent levels, and the five starred questions, and nothing else: no follow-ups, no fallbacks; a short answer in rapid mode is written as given. Full asks until every file below can be written without a guess, and stops when it can.

## Step 2 - Role profile

One question, multiple choice, skipped if Step 0 makes it obvious (say why):

| Profile | Mission shape | Objectives lean on | Hires that matter most | Stack pages to read first |
|---|---|---|---|---|
| **Solo operator / founder** | revenue or ARR by a date | conversion, list, product | all cadence roles; product lead; ghostwriter and editor | payments, analytics, email list |
| **Growth lead (team)** | one growth number the team owns | conversion, activation, channel volume | cadence roles; critic bench; SEO analyst | analytics, CRM |
| **Product marketing** | launches that move pipeline | launch cadence, message tests, enablement adoption | product lead (`/prd`); ghostwriter (`/copywriting-hooks`, `/linkedin-post`); editor (`/tone-of-voice`, `/humanizer`); critic bench (`/multi-agent-refine`); cadence roles | analytics, CRM, email |
| **SEO / backlinks** | referring domains and rankings for a keyword set | links per month, keywords into the top ten, content that earns links | SEO analyst (`/seo-audit`); ghostwriter (`/copywriting-hooks`) for outreach and link-worthy pieces; cadence roles. No hire sends outreach; that behaviour KR is theirs alone, say so in `PROFILE.md` | SEO data, analytics (search console), scraping |
| **Content / creator** | audience and owned list | publish cadence, list growth, one channel to win | video researcher (`/youtube-package`, `/vidiq-competitive`); ghostwriter (`/linkedin-post`); cadence roles | video data, email list |
| **Other** | ask them to describe the job in one sentence, then map to the nearest profile and say which | | | |

The profile changes emphasis, never the system: every profile gets the cascade, the experiment log, the rules and the harness.

## Step 3 - The interview

Ask in this order. In rapid mode, ask only the starred questions and fill the rest with "not set" placeholders that look like placeholders. In full mode, ask them all, one at a time, multiple choice where the answer space is known, and skip any the folder already answers (quote the source when you skip).

1. ★ **The year in one line.** A number and a date. If they cannot give a number: "What would make this year a clear win, in a sentence?" then ask what single count would prove it. Name the unit if it helps (revenue, customers, referring domains) but never the value. The number comes from them or the line stays `not set`.
2. ★ **Why this number.** Two sentences: what hitting it makes possible, what missing it costs.
3. **Annual goals.** Three to five, each with what "done" looks like on the last day of the year. Full mode pushes back on any goal that is an activity rather than an outcome.
4. ★ **This quarter's objectives.** Two to four, drafted by you from the annual goals and the profile, shown for editing. For each, one behaviour KR they control and one outcome KR. Full mode asks "what could you do every week that makes this more likely?" until each objective has a behaviour. Also ask what they are dropping this quarter (the thing they keep steering toward that is not on the line) and which objective wins when two collide; the file has a row for each. A steer that survives one pushback becomes a Dropped row, not a fourth question.
5. **Baselines.** For each outcome KR: do we have the number today? Read it from Step 0 if it is there; otherwise write `baseline: not read` and tell them the first standup will ask for it. Never estimate. `baseline: not read` is the one spelling, in the OKR table and in experiment frontmatter alike; the hook and the retro skills treat it as not set.
6. ★ **How you lose a week.** One derailer in rapid mode, up to three in full mode, each with the tell (something the agent can observe in their files) and the smallest recovery move. Full mode offers the three names from `goals/EXAMPLE-derailers.md` as a menu of names only, then asks for theirs in their words with their own tell and recovery move. Never copy a row.
7. ★ **The first experiment.** One test that moves the most important objective. Hypothesis, audience, treatment, metric. Baseline is `not read` and the window blank until they have them; the file stays `planned` until both are filled, and you say so.
8. **What already runs.** Full mode only: which of their existing rituals or tools to keep, and which the cascade replaces. Write the answer into `retros/compounding-ledger.md` as candidates, not admissions.
9. **Team or solo.** If they are in a team: one mission for the team, one derailer table per person, and point `experiments/` at wherever the team already keeps tests.

Rules while interviewing: one question per turn; offer a default with every question; accept "skip"; never restate a question they answered; never fill a blank with a plausible value. In full mode, an answer under about fifteen words to an open question gets one follow-up, once.

## Step 4 - Write the files

Create the folders if absent, then write, in this order, from the templates in the plugin with all HTML comments and template instruction prose dropped; keep the frontmatter, headings, tables and the Related list:

- `goals/MISSION.md` with the `mission:` line first (the hook reads it)
- `goals/okrs/<year>-q<n>.md` with `| O1 | ... |` rows and the KR table. If fewer than four weeks remain in the calendar quarter, write next quarter's file and say so
- `goals/derailers.md` with the derailer table filled
- `experiments/<slug>.md` at `status: planned`
- `retros/compounding-ledger.md` only if Step 8 produced candidates
- `PROFILE.md`: the chosen profile, the hires that matter, the stack pages to read first, in ten lines

Then run `hooks/session-start.sh` from the plugin root and paste its output unedited. Month, Week and Today will still show example lines until the first retros run; say so in one line. Finish with one line: **"Run `/standup` tomorrow morning. It opens with a verdict on today."**

Nothing is sent, posted, or written outside the folder. No live file is created for a retro or a standup; those are the skills' job.

## Coverage ledger

End with the sources checked in Step 0: each one `checked`, `absent`, or `failed (three words why)`. Never omit a row.

## Wire it to a routine

Run once. If they want a re-run each quarter, the quarter's OKR file is the only thing to regenerate; say so rather than re-running the whole setup.

If you're in a team: run it once per person in their own folder; share `goals/MISSION.md` and `experiments/`.

## Related

- [../morning-standup/SKILL.md](../morning-standup/SKILL.md) - what runs the morning after setup
- [../../goals/MISSION.md](../../goals/MISSION.md) - the template this writes first
- [../../goals/derailers.md](../../goals/derailers.md) - the coaching instructions this fills
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md) - the first experiment's shape
- [../../ROSTER.md](../../ROSTER.md) - the hires each profile leans on
