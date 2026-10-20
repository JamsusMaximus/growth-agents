# Coverage ledger

**The rule.** Every report ends with a ledger listing each source as checked, failed (three words why), or not applicable. A failed source is a result; a missing ledger line is a failed run.

**The incident.** On 11 and 12 August 2026, two consecutive morning standups skipped four of the mandatory sources: the inbox, the messaging inbox, the task list, and the meeting notes. Both runs reported as complete. The human caught both. Between them, those sources held owed replies, one over a week old, and follow-ups due that day. Nine days later the same shape recurred on a different pair of sources, and the human's instruction was to pull the revenue and pipeline sources every time.

Cost class: a missed lead and a missed deadline, invisible because nothing made coverage visible. Leanness had been applied to what was checked instead of to what was said.

**How the skills enforce it.** Every skill that produces a report (`standup`, `weekly-retro`, `monthly-retro`) has a fixed source list and a mandatory `## Coverage ledger` section. A source is marked checked only if it was queried this run, not carried forward from yesterday. If the agent reaches the write step and cannot honestly mark a source, it goes back and pulls it. The human should never be the mechanism that catches a skipped check.

If you're in a team: the ledger is what lets a second person trust a report they did not watch being made.

## Related

- [observed-asked-unobserved.md](observed-asked-unobserved.md) - the same discipline applied to each line, not just each source
- [measurement-honesty.md](measurement-honesty.md) - the coverage gate that refuses to score on thin data
- [../retros/standups/TEMPLATE.md](../retros/standups/TEMPLATE.md) - the ledger in its smallest form
- [../CLAUDE.md](../CLAUDE.md) - the standing rule
