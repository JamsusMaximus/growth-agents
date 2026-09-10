---
title: Checkout button copy
status: measured
kr: O1
primary_metric: lead → customer conversion
baseline: 10%
window_end: 2026-07-19
---

# Checkout button copy

## Hypothesis

If we change the pricing-page button from a generic label to one that names what the buyer gets, then leads who reach the pricing page will become customers more often, measured as lead → customer conversion moving from 10% to 12% or better, because the generic label makes the next step feel like a commitment rather than a delivery.

## Which KR it moves

O1. Lead → customer conversion is the KR itself: the objective is to lift it from 10% to 20%.

## Audience

Every lead who reaches the pricing page, both arms, assigned on first request. Existing customers excluded: they already bought. Roughly 5,000 assigned leads a week across both arms.

## Treatment

Control: the existing button label. Variant: a label that names the product and the outcome in five words. Nothing else on the page changes. Server-side assignment, sticky cookie, assignment event carrying the arm, per `ab-test-playbook.md`.

## Baseline snapshot

10.0% lead → customer conversion over the four weeks before launch, from the assignment-gated report, taken 2026-06-27.

## Primary and secondary metric

- **Primary:** lead → customer conversion, assigned leads to completed purchase.
- **Secondary:** checkout starts, so we can see whether the label moves people into checkout or only through it. Bounce rate on the pricing page, in case the new label puts people off before they scroll.

## Window

2026-06-29 to 2026-07-19. Three weeks. At 5,000 a week the power check gives a minimum detectable lift of about 1.4 points, and the hypothesis needs 2. It concludes with room to spare.

## Confounders, stated honestly

A newsletter issue went out in week two with a plain link to the pricing page. It raised traffic to both arms equally, which the sticky cookie and plain-link rule were built for. No price change and no other page edits in the window.

## Kill criteria

Stop early if conversion in either arm falls below 7.5% for a full week, or if checkout errors appear in one arm and not the other.

## Status

- 2026-06-27 `planned`, baseline and metric filled.
- 2026-06-29 `live`.
- 2026-07-21 `measured`.

## Result

Variant 12.4%, control 10.0%, over roughly 7,500 assigned leads per arm. Difference 2.4 points, above the 1.4 the power check required and above the 2 the hypothesis asked for. Checkout starts moved in the same direction, larger. Bounce rate flat.

## Learning

Naming the outcome on the button works, and the lift held through to purchase rather than only inflating checkout starts. The wider belief: the pricing page's job is to make the next step feel like receiving something, not signing something. Next test applies the same idea to the headline, which is a bigger change and easier to detect.

## Related

- [TEMPLATE.md](TEMPLATE.md)
- [power-check.md](power-check.md)
- [ab-test-playbook.md](ab-test-playbook.md)
- [EXAMPLE-live-stale.md](EXAMPLE-live-stale.md)
