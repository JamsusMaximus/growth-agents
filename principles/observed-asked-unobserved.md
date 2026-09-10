# Observed, asked, unobserved

**The rule.** Every line in a retro carries one of three labels: `observed` (a dated file or artefact exists), `asked` (the human answered in this session), or `unobserved` (reconstructed, so treat as unknown). There is no fourth label and nothing goes unlabelled.

**The incident.** In the week of 27–31 July 2026, standup coverage was two working days out of five. The weekly retro that followed was asked to close out the month's intentions: did each intention's trigger fire, did anyone notice, did the number move. With three days missing, the agent reconstructed them from the task list and the calendar and produced a fluent, confident account. Every line of it was fiction. The instruction that came out of it, now in the skill, is blunt: ask, do not reconstruct.

Cost class: a false finding written into the month record, which the next monthly retro would have scored as real. A wrong retro is worse than a thin one because the thin one still tells the truth about coverage.

**How the skills enforce it.** `weekly-retro` opens its month-close block with a coverage line, then labels every line inline. Recognition of a trigger is never inferred from outcomes; the skill asks "did you notice it at the time or only now?" `monthly-retro` reads only `observed` and `asked` lines when scoring mechanisms. Anything `unobserved` is reported as unscoreable, which is a finding about adherence, not about the intention.

## Related

- [coverage-ledger.md](coverage-ledger.md) - the source-level version of the same rule
- [measurement-honesty.md](measurement-honesty.md) - why silence on a thin sample is not evidence of absence
- [../GLOSSARY.md](../GLOSSARY.md) - the three labels, fixed
- [../retros/weekly/TEMPLATE.md](../retros/weekly/TEMPLATE.md) - where the labels appear
