# Never fabricate an identifier

**The rule.** Never invent, guess, or placeholder an ID, key, amount, email, path, or any value that will be passed to a tool, an API, or a script. If the value did not come from a verified source (a tool result, a file read, or the human), you do not have it: stop and obtain it.

**The incident.** On 1 June 2026, in a single session against an [accounting provider], the agent typed plausible-looking contact and invoice identifiers three times to keep momentum, and each time the write went to the wrong place or failed. The lesson written into the rule that day: plausible is worse than blank. Blank makes the human check. Plausible makes them trust a lie.

Cost class: a wrong write to a financial system, three times in one session.

**How the skills enforce it.** Any write to an external system reads the result back and reports only what the read-back says. Placeholders in this repo are made to look like placeholders (`£X`, `YOUR_API_KEY`), never like real values.

**A check you can add.** Every number in an output must appear in a source that the output cites. Run it as a final pass over any report: for each figure, name the file, tool result, or human answer it came from. A number with no source is deleted, not softened. Wire it into your review step as a single question, "where did each number come from?", and refuse to send until every one has an answer.

## Related

- [verified-fixed-or-not-closed.md](verified-fixed-or-not-closed.md) - evidence before closure
- [coverage-ledger.md](coverage-ledger.md) - sources named on every report
- [measurement-honesty.md](measurement-honesty.md) - inferred figures are quarantined, not quoted
- [../CLAUDE.md](../CLAUDE.md) - the standing rule
