# CRM (Attio)

## What it is for

The pipeline: people, companies, deals, stages, and a note on every record saying what was sent to them and when. The weekly retro reads a probability-weighted forecast from it. The morning standup checks it for owed follow-ups. Every marketing send leaves a note here so the next person to open the record can see it.

## MCP, API or CLI

Prefer the MCP for single-record search, read and write; it knows the schema and handles paging. Use the API from a script only for aggregate work (pipeline totals, stage conversion), and paginate. Never hand-roll a list query in conversation; a truncated page looks like a small pipeline.

## Setup

1. Create a workspace and define the objects you need (people, companies, deals) and one list per pipeline.
2. Create an API key and store it as `ATTIO_API_KEY`.
3. Decide which object each list is parented to. Write it down; a person lookup on a company-parented list returns nothing.
4. Create a stage-weights file (stage name to probability) so the forecast is reproducible.
5. Register the webhook if you want CRM changes to fan out, and check the receiver's timeout.

## How this system uses it

The weekly retro pulls the pipeline with a weighted forecast and the open opportunities list. Every outbound nudge from the email tool writes a note on the person and the company. A script measures stage conversion for the retro.

## Quirks

- A list parented to companies returns zero entries for a person who is definitely in the pipeline. Match on the company, resolved by domain.
- A single page with a high limit still truncates silently on a large list. Paginate until a page comes back short.
- Currency attributes carry the amount in `currency_value`, not `value`. Reading `value` returns zero without error.
- Stage history is versioned with active-from and active-until. Measure conversion by entry into a stage, never by interval overlap.
- A webhook receiver on a 10-second serverless limit can time out on sequential CRM calls and still return 200, so the deal never moves and nothing retries. Make the update idempotent and re-run it from a fallback path.
- When a negative answer matters ("they are not in the pipeline"), run a positive control on a record you know is there.

## Related

- [../STACK.md](../STACK.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [../skills/morning-standup/SKILL.md](../skills/morning-standup/SKILL.md)
- [resend.md](resend.md)
- [../rules/README.md](../rules/README.md)
