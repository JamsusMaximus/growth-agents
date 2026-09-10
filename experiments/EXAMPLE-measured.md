---
title: Checkout button copy
status: measured
kr: O2
primary_metric: checkout rate
baseline: 3.2%
window_end: 2026-07-19
---

# Checkout button copy

## Hypothesis

If we change the pricing-page button from a generic label to one that names what the visitor gets, then visitors who reach the pricing page will start checkout more often, measured as checkout rate moving from 3.2% to 4% or better, because the generic label makes the next step feel like a commitment rather than a delivery.

## Which KR it moves

O2. Checkout rate is the KR itself: the objective is to lift it from 3.2%.

## Audience

Every visitor to the pricing page, both arms, assigned on first request. Signed-in customers excluded: they already bought. Roughly 5,000 assigned visitors a week across both arms.

## Treatment

Control: the existing button label. Variant: a label that names the product and the outcome in five words. Nothing else on the page changes. Server-side assignment, sticky cookie, assignment event carrying the arm, per `ab-test-playbook.md`.

## Baseline snapshot

3.2% checkout rate over the four weeks before launch, from the assignment-gated report, taken 2026-06-27.

## Primary and secondary metric

- **Primary:** checkout rate, assigned visitors to checkout started.
- **Secondary:** purchase rate, so we can see whether extra checkouts finish. Bounce rate on the pricing page, in case the new label puts people off before they scroll.

## Window

2026-06-29 to 2026-07-19. Three weeks. At 5,000 a week the power check gives a minimum detectable lift of about 0.8 points, and the hypothesis needs 0.8. Tight, but it concludes.

## Confounders, stated honestly

A newsletter issue went out in week two with a plain link to the pricing page. It raised traffic to both arms equally, which the sticky cookie and plain-link rule were built for. No price change and no other page edits in the window.

## Kill criteria

Stop early if checkout rate in either arm falls below 2.4% for a full week, or if checkout errors appear in one arm and not the other.

## Status

- 2026-06-27 `planned`, baseline and metric filled.
- 2026-06-29 `live`.
- 2026-07-21 `measured`.

## Result

Variant 4.1%, control 3.2%, over roughly 7,500 assigned visitors per arm. Difference 0.9 points, above the 0.8 the power check required. Purchase rate moved in the same direction, smaller. Bounce rate flat.

## Learning

Naming the outcome on the button works, and the lift held through to purchase rather than only inflating checkout starts. The wider belief: the pricing page's job is to make the next step feel like receiving something, not signing something. Next test applies the same idea to the headline, which is a bigger change and easier to detect.

## Related

- [TEMPLATE.md](TEMPLATE.md)
- [power-check.md](power-check.md)
- [ab-test-playbook.md](ab-test-playbook.md)
- [EXAMPLE-live-stale.md](EXAMPLE-live-stale.md)
