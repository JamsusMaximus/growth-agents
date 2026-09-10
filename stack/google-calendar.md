# Google Calendar

The reality check. The standup and the weekly retro read the calendar to answer one question: does the week have room for the bets you just wrote down? A bet with no block is a wish.

## Who calls it

- `skills/morning-standup/SKILL.md` reads today, to check the `must_be_true` fits around fixed commitments.
- `skills/weekly-retro/SKILL.md` reads the week gone (what happened) and the week ahead (where the bets land).

The agent reads. It never creates, moves or deletes an event unless you ask for that specific event in the session.

## MCP, API or CLI

Prefer the MCP connector: read-only questions ("what is on Thursday", "find a free 90-minute block") need no code. A Google Workspace CLI is the route for creating your own blocks from a script. The REST API is only for a sync job, which this system does not need.

## Setup

1. Add the Google Calendar connector in Claude Code and complete the OAuth flow.
2. Confirm the agent can list your calendars and read one event.
3. If you use a booking tool, keep it separate. It owns availability; the calendar owns your blocks.

## How James uses it

The standup checks the day can hold the one thing that must be true. The retro compares the week's bets with the blocks that existed for them and names any bet that had no time reserved.

## Quirks

- **Two tools, two jobs.** "Create a block for me" is the calendar. "Open availability so someone can book" is the booking tool. Mixing them double-books.
- **Events synced in from another system** should be read at their source, not through the connector. The copy lags.
- **State the timezone** in every event the agent drafts. `[UNVERIFIED]` whether the connector defaults to the account timezone or UTC in every client.
- If you're in a team: read only your own calendar by default and log shared ones as "not applicable" in the coverage ledger.

## Related

- [STACK.md](../STACK.md)
- [Morning standup skill](../skills/morning-standup/SKILL.md)
- [Weekly retro skill](../skills/weekly-retro/SKILL.md)
- [Standup template](../retros/standups/TEMPLATE.md)
