# Principles

One rule per file. Every rule cites the incident that created it: the date, the line the human said, and what it cost. A rule with no incident is an opinion, and opinions do not get a file here.

The corollary: **an incident-derived rule is never proposed for removal.** It can be sharpened, merged, or given a better enforcement, but the self-improvement prompt in `reference/self-improvement-prompt.md` may not suggest dropping it. The incident already happened once. The rule exists so it does not happen twice.

When the agent refuses something or halts, it cites one of these files. Read that file, then decide.

## The rules

| Rule | Group | One line |
|---|---|---|
| [coverage-ledger](coverage-ledger.md) | Honesty | Every report lists each source as checked, failed, or not applicable. Never silently skip one. |
| [observed-asked-unobserved](observed-asked-unobserved.md) | Honesty | Every retro line carries one of three evidence labels. Reconstructed means unknown. |
| [verified-fixed-or-not-closed](verified-fixed-or-not-closed.md) | Honesty | A finding ends as fixed, rejected, or deferred, with evidence. "Noted" closes nothing. |
| [never-fabricate-an-identifier](never-fabricate-an-identifier.md) | Honesty | No invented IDs, numbers, or names. Blank beats plausible. |
| [prioritisation-rubric](prioritisation-rubric.md) | Measurement | Score every candidate on five axes before ranking any of them. |
| [prioritisation-pitfalls](prioritisation-pitfalls.md) | Measurement | Eight ways a ranking goes wrong, as a checklist. |
| [can-this-experiment-conclude](can-this-experiment-conclude.md) | Measurement | If it cannot reach a verdict inside its window, it is not an experiment yet. |
| [measurement-honesty](measurement-honesty.md) | Measurement | Trend not verdict, quarantine inferred metrics, thresholds before rates, refuse to score on thin data. |
| [growth-delivery-foundation](growth-delivery-foundation.md) | Measurement | Classify shipped work. Hold Growth to a number. |
| [how-to-work-with-me](how-to-work-with-me.md) | Working | Name your failure mode and give the agent standing permission to push back. |

## Adding a rule

Wait for an incident. Then write: the rule in two sentences, the incident (date, the human's line, the cost class), how the skills enforce it, and a Related list. Keep it under 250 words. Counts and durations are fine when they are about critics, rounds, files, days, or weeks. Never about customers or money.

## Related

- [CLAUDE.md](../CLAUDE.md) - the standing rules the agent runs under
- [GLOSSARY.md](../GLOSSARY.md) - the vocabulary these files use
- [reference/self-improvement-prompt.md](../reference/self-improvement-prompt.md) - bounded by the corollary above
- [skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md) - where most of these rules are enforced
