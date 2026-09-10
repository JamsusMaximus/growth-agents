---
title: Pricing page headline
status: live
kr: O1
primary_metric: lead → customer conversion
baseline: 10%
window_end: 2026-08-20
---

# Pricing page headline

This is the file the session-start hook and the weekly retro chase. It is `live`, its `window_end` has passed, and it has no result. Every session prints it on the `Stale` line. The weekly retro will not score the week until the readout below is typed and the status changes to `measured`, or it is `killed` with a learning.

## Hypothesis

If we replace the pricing-page headline with one that names the outcome the buyer gets in the first week, then leads who reach the page will become customers more often, measured as lead → customer conversion moving from 10% to 12% or better, because the checkout-button test showed that naming the outcome moves this audience and the headline is the bigger lever.

## Which KR it moves

O1. Same KR as the button test: more customers from the same leads.

## Audience

Every lead who reaches the pricing page, both arms, assigned server-side. Existing customers excluded. Roughly 5,000 assigned a week.

## Treatment

Control: the existing headline. Variant: one sentence that names what changes for the buyer in week one. Button copy stays on the winning label from the previous test in both arms. Nothing else changes.

## Baseline snapshot

10.0% lead → customer conversion, the pre-test figure this quarter's KR is scored from, taken 2026-07-28. The button test's own lift is carried in both arms, so it does not confound the headline.

## Primary and secondary metric

- **Primary:** lead → customer conversion, assigned leads to completed purchase.
- **Secondary:** checkout starts. Scroll depth past the headline.

## Window

2026-07-30 to 2026-08-20. Three weeks, same power check as the button test: about 1.4 points detectable at 5,000 a week.

## Confounders, stated honestly

None known at launch. Anything that lands in the window goes here before the readout, not after.

## Kill criteria

Stop early if conversion in either arm falls below 7.5% for a full week, or if the variant headline is cut off on small screens.

## Status

- 2026-07-28 `planned`.
- 2026-07-30 `live`.

## Result

_Not yet typed. The window closed on 2026-08-20._

## Learning

_Blank until the result is typed._

## Related

- [README.md](README.md)
- [EXAMPLE-measured.md](EXAMPLE-measured.md)
- [TEMPLATE.md](TEMPLATE.md)
- [../retros/weekly/TEMPLATE.md](../retros/weekly/TEMPLATE.md)
