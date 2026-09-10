# Measurement honesty

**The rule.** A number is reported with its trend, its sample size, and its provenance, or not at all. When the data is too thin to score, the report says so and refuses.

- **Trend, not verdict.** Trailing rate, direction against the prior period, projected date at that rate. Never a permanent red cross.
- **Quarantine inferred metrics.** A figure derived from movement in another figure stays in its own column and is never totalled as if measured.
- **Sample threshold before quoting a rate.** Below the threshold the row carries a low-confidence flag and no median.
- **Position history.** A search position alone says nothing. Keep the history, report the move.
- **No extrapolation before six data points.** Fewer than six weeks of a series is a list, not a trend.
- **Pre-registered decision rules.** Write the kill and continue criteria before the data arrives.
- **Degraded mode.** A stale source makes the headline `NOT CLOSED` with the date of the last good input. No delta, no percentage, nothing carried into a blank cell.
- **Coverage gate on scoring.** Below half coverage, "it never happened" is not an available verdict. Below about a third, score nothing.

**The incident.** On 19 July 2026 a weekly audience digest was found to have printed "off track" every week for months, because the rate required for the year target dwarfed the actual rate. It printed red in weeks the rate was climbing. Nobody read it any more.

Cost class: a wrong recommendation, weekly, for the whole run.

**How the skills enforce it.** `weekly-retro` and `monthly-retro` carry the degraded mode and the coverage gate as hard stops. The experiment template has a decision-rules field that must be filled before `live`.

## Related

- [can-this-experiment-conclude.md](can-this-experiment-conclude.md) - the check before the window opens
- [observed-asked-unobserved.md](observed-asked-unobserved.md) - why thin coverage biases the sample
- [never-fabricate-an-identifier.md](never-fabricate-an-identifier.md) - every number has a source
- [../experiments/power-check.md](../experiments/power-check.md) - thresholds, worked
