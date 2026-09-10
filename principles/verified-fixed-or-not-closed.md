# Verified fixed, or not closed

**The rule.** Every finding from a review ends in exactly one of three states, each with evidence: FIXED (quote the command or test output that proves it), REJECTED (say why), or DEFERRED (written into a durable file, never only into chat). "Queued", "noted" and "I'll fold that in" close nothing.

**The incident.** On 1 August 2026, a multi-round bug hunt with several critic subagents returned a findings list. Two real bugs were labelled "queued" in the summary and never fixed. They surfaced only when the human asked: "did you fix everything your own subagents found?" The same day, a "CI green" claim was made from a stale run while the workflow file was invalid and nothing had run at all.

Cost class: a wrong recommendation. The work was declared done, and it was not.

**How the skills enforce it.** Before any review round is declared complete, the agent re-reads the original findings list, not its memory of what felt handled, and states the end state of every item. Deferred items go into the experiment file, the weekly retro, or a task, with a date. When checking a build, the agent confirms the run belongs to the exact head commit and that the required checks are present, because an absent check reads as "no failures" rather than red.

The human should never have to ask whether the findings were fixed.

## Related

- [never-fabricate-an-identifier.md](never-fabricate-an-identifier.md) - the same standard applied to values
- [coverage-ledger.md](coverage-ledger.md) - the same standard applied to sources
- [../reference/self-improvement-prompt.md](../reference/self-improvement-prompt.md) - suggestions from the audit go through the same three states
- [../CLAUDE.md](../CLAUDE.md) - the standing rule
