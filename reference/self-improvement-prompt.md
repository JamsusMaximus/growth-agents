# Self-improvement prompt

Run this once a week, Friday morning, before the weekly retro. It audits how you have been using the workspace and proposes a short list of changes: skills to add, context to write down, files to tidy, one integration. Nothing is applied unless you say yes to that specific item.

Origin: written for a talk on scheduled agent tasks. The first runs on a thin workspace were patchy, and the prompt gained its substrate check so it says so instead of inventing suggestions.

## Rules the prompt enforces

| Rule | Why |
|---|---|
| Substrate check first | With no context file, no skills and under two weeks of history, the report has nothing to look at. It says so and stops. |
| Two suggestions per section, one for integrations | A long list gets skimmed and nothing gets approved. |
| Every suggestion ends with "want me to do this? (yes / no / later)" | One-tap approval. `later` is not `yes`. |
| Applied only on an explicit yes | Silence, "sounds good" and "interesting" apply nothing. |
| The self-modification proposal is plain English, never a diff | "Suggested change / What's there now / Why" so a human can judge it in ten seconds. |
| Never strip a guardrail you placed deliberately | A rule that reads as friction to the agent is usually there because of an incident. |
| Never propose removing a rule that cites an incident | The date and the quote are the evidence. Removing them removes the reason. |

## Where the output goes

The report is a dated file. Suggested location: `improvements/YYYY-MM-DD.md`, which the repo's gitignore already excludes. If the agent cannot write files, it prints the report and you paste it into your notes.

If you're in a team: one person owns the Friday run and brings the approved items to the weekly retro. Nobody else applies suggestions.

## The prompt

```
Weekly self-improvement run

READ THE WORKSPACE FIRST

Look at everything in this folder. Read CLAUDE.md if it exists. List the files
and folders. Look in .claude/ and skills/. Note any context files about me,
my role, my goals, my tools, my voice, or past decisions.

Tell me in 3-4 sentences what you found: how many skills exist, whether there
is a CLAUDE.md, and roughly how much context you have to work with. Use this
for the substrate check below. Do not ask me what you can see for yourself.

SUBSTRATE CHECK

Decide, from what you found plus one question to me:
- Have I been using this workspace for at least 2 weeks? (Ask me.)
- Are there at least 2-3 skills or saved prompts I use regularly? (Look.)
- Is there a context file the agent reads on every session? (Look.)

If two or more answers are no: say plainly that this run is most useful once
there is some substrate (a context file, a few skills, a few weeks of use).
Suggest running it again in about 3 weeks. If I want to push on anyway, do
the audit only and skip the report.

If most answers are yes: continue.

PHASE 1: AUDIT

Report back without asking anything:

1. Files and folders in the workspace. One sentence each on what is in it.
2. If you can read the context file: three bullets on the role it sets up.
3. Existing skills and saved prompts. One sentence each.
4. If you can see recent conversation history, scan the last 7-10 days for:
   - things I asked for more than once that are not a skill yet
   - topics I keep raising that are in no context file
   - tools I reference that are not connected
   - files I keep pointing you at that should be in default context

If you cannot see conversation history, say so and ask me to paste 5-10
recent prompts to analyse instead.

Show me what you found, then ask:
- "Does this look right? Anything I got wrong?"
- "Anything I missed that you expected me to spot?"

PHASE 2: THE REPORT

Produce a report with exactly four sections:

1. Skills I should add. Workflows you saw me run by hand more than once.
   Max 2.
2. Context gaps. Things I reference often that are in no context file.
   Max 2.
3. File tidies. Things to merge, split, rename or move. Max 2.
4. One integration idea. A tool that would replace something I keep doing
   the long way. Max 1.

Each suggestion: 2-3 sentences, plain language, ending with
"want me to do this? (yes / no / later)".

Skip a section rather than pad it. An empty section is a finding.

PHASE 3: ONE SELF-MODIFICATION PROPOSAL

At the end, propose ONE small change to my main context file or to this
prompt itself. Plain English, not diff syntax:

- "Suggested change: [what to change]"
- "What's there now: [the current line or paragraph, quoted]"
- "Why: [one sentence]"

Apply it only if I say yes. "Later" and silence mean no.

Never propose removing a guardrail, a rule that cites an incident, or a
line that names a date. If you think one of those is wrong, say why in the
report and leave the file alone.

PHASE 4: SAVE

Save the report as improvements/YYYY-MM-DD.md using today's date. If you
cannot write files, print it in full.

Then remind me of the five-minute review:
1. Open the report.
2. Skim the four sections. Approve the one suggestion that is obviously
   useful.
3. Reject the one that feels wrong. A wrong suggestion means this prompt
   needs an edit; say which line.
4. Approve or reject the self-modification proposal.
5. Done.

Be suspicious of:
- suggestions that sound clever but match nothing I actually do
- "add a skill for X" where I did X once
- self-modifications that would remove a guardrail I placed deliberately

If this is one of the first three runs and the report is thin, say so.
Runs three and four are where this starts paying off.
```

## Related

- [reference/README.md](README.md): the other reference scripts
- [reference/path-scoped-rules/README.md](path-scoped-rules/README.md): keep always-on context small so this audit has less to wade through
- [CLAUDE.md](../CLAUDE.md): the context file this prompt is allowed to propose one change to
- [skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md): run the retro after the approved items are applied
