# Growth, Delivery, Foundation

**The rule.** Every piece of shipped work is classified by intent: Growth (acquires, converts, or captures revenue from someone who has not paid), Delivery (serves people who have already paid), or Foundation (reliability, security, tooling, enables both, sells nothing). Every Growth item is then held to a measured number, and a Growth item with no number is the finding.

**The incident.** The July 2026 monthly retro asked "did the build drive growth?" and, for the first time, answered it by classifying every merged change for the month rather than from memory. In the first half of the month four changes in five served people who had already paid, which was the right allocation while paying customers were being served. In the second half Growth work tripled. Then the harder table: of the Growth mechanisms that shipped, one had a measured outcome, several were live with nothing recorded against them, and one existed only to make the next month's table possible. That gap, not the ratio, was the finding.

Cost class: a month of building with no way to say whether it sold anything, until the classification was done.

**How the skills enforce it.** `monthly-retro` produces the classification table and the per-mechanism outcome table every month. A Growth row whose outcome column is empty is carried to the next month's intentions as an open question. Delivery and Foundation are not held to a number, which is the point of separating them.

If you're in a team: classify at merge time with a label. Doing it at month end from memory is how the ratio gets flattered.

## Related

- [prioritisation-rubric.md](prioritisation-rubric.md) - the same anchor applied before the work
- [measurement-honesty.md](measurement-honesty.md) - what counts as a measured outcome
- [../retros/monthly/TEMPLATE.md](../retros/monthly/TEMPLATE.md) - the two tables
- [../retros/compounding-ledger.md](../retros/compounding-ledger.md) - where measured Growth rows accumulate
