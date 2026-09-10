# Todoist

## What it is for

The task list, and the standup's evidence of what actually happened yesterday. Completed tasks since yesterday morning say whether the `must_be_true` landed; overdue plus due-today says whether today can hold the next one. The weekly retro stages next week's bets as tasks so they are chased, not remembered.

## MCP, API or CLI

MCP. The connector's tools cover find, complete, reschedule and create, and they carry the guidance a script would have to reimplement. Use the API only for a bulk import. There is no CLI worth having.

## Setup

1. Install the connector and authorise it.
2. Create one project per pipeline that produces an artefact (for example, a content pipeline where one card is one post) and route everything meta to the inbox.
3. Decide the label or filter the standup reads for "due today" and write it into the standup skill's source list.
4. Give every bet from the weekly retro a due date on the day you mean to do it, not the Friday it is reviewed.

## How this system uses it

The morning standup reads yesterday's completions and today's overdue and due tasks, then compares them with the retro's bets to name the day's likely flight into building. The weekly retro writes next week's bets as dated tasks. A missed bet shows up as an overdue task the next morning, which is the point.

## Quirks

- To move a task to another date use the reschedule tool, never a full update. A full update replaces the whole due string and destroys recurrence.
- Never send a task's existing project, section or parent id back in an update. It is treated as a move.
- "What did I complete" needs the activity query with your own user id. Without it the answer covers every collaborator.
- An empty collaborator lookup means the person shares no project with you, not that they do not exist.
- A task with no due date is invisible to the standup. Everything the retro commits to gets a date.

## Related

- [../STACK.md](../STACK.md)
- [../skills/morning-standup/SKILL.md](../skills/morning-standup/SKILL.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [google-calendar.md](google-calendar.md)
- [granola.md](granola.md)
