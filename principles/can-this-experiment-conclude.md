# Can this experiment conclude?

**The rule.** Before anything goes `live`, answer one question: at the baseline rate and the traffic you actually have, can this reach a verdict inside its window? If not, it is a probe or a bet, and it is written up as one. It is not an experiment yet.

**The incident.** On 14 July 2026, a research pass on paid acquisition worked the numbers for a modest six-week test. At the expected cost per click and the baseline conversion rate, the budget bought a few hundred clicks and roughly a dozen leads. The write-up said it plainly: that spend cannot produce a statistically significant result. Not "probably won't". Cannot. What it could buy was a demand probe, with pre-registered kill criteria at week two and week six, and that is what it was reframed as.

Cost class: a wasted six weeks, avoided only because the check ran before the spend.

**How the skills enforce it.** `experiments/TEMPLATE.md` refuses `live` without a baseline and a metric, and `experiments/power-check.md` is the arithmetic: minimum detectable effect, sample per variant, weeks to reach it at current traffic. The weekly retro runs that check before it lets anything move to `live`, and the answer goes into the experiment file. If the honest answer is "it cannot conclude", the file stays `planned` and the decision rules go in before anything else does.

Do not judge on a bad week either. Conversions lag. The window is the window.

## Related

- [../experiments/power-check.md](../experiments/power-check.md) - the arithmetic
- [../experiments/ab-test-playbook.md](../experiments/ab-test-playbook.md) - running one that can conclude
- [measurement-honesty.md](measurement-honesty.md) - pre-registered decision rules
- [../experiments/TEMPLATE.md](../experiments/TEMPLATE.md) - the refusal to go live blank
