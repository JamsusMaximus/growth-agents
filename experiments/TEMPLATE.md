---
title: [Short name for the experiment]
status: planned       # planned | live | measured | killed
kr: [O1]              # which key result this moves
primary_metric: [one metric, e.g. lead → customer conversion]
baseline: [the number you are starting from, e.g. 10%]
window_end: [YYYY-MM-DD]
---

<!--
This file refuses to be `live` with `baseline` or `primary_metric` blank.
If either still reads as a placeholder, status stays `planned`. The weekly
retro checks this and will not accept a `live` file with a blank baseline.
No baseline means no experiment, only an activity.
-->

# [Title]

## Hypothesis

If we [change], then [audience] will [behaviour], measured as [primary metric] moving from [baseline] to [target], because [the reason you believe it].

## Which KR it moves

[O1 / the key result by name]. One line on the link: how does this metric moving change the KR number?

## Audience

Who sees the treatment. Who is excluded and why. Rough size per week.

## Treatment

What actually changes. Be concrete enough that someone else could set it up from this section alone. If it is a split test, name the control and the variant.

## Baseline snapshot

The number as it stands today, where it came from, and the date you took it. Take it before anything changes. This is the line that gets copied into `baseline:` above.

## Primary and secondary metric

- **Primary:** the one number that decides the result. Fixed now, never changed after the fact.
- **Secondary:** one or two numbers you will report alongside it. They explain; they do not decide.

## Window

Start date, end date, and the reason for the length. For a split test the length comes from `power-check.md`, not from a guess. The end date is the line that gets copied into `window_end:` above.

## Confounders, stated honestly

What else is happening in the window that could move the metric. A launch, a price change, a newsletter, a holiday. If attribution is not clean, say so now and say what you will treat as the best proxy.

## Kill criteria

Written before results. What would make you stop early: a broken funnel, a drop in the primary metric beyond [X], a confounder that makes the readout meaningless.

## Status

`planned` until baseline, metric and window are all filled. Then `live`. Then `measured` or `killed`. The date of each change, one line each.

## Result

Blank until the window closes. Then: primary metric, control and variant, the size of the difference, and whether the power check said it could conclude. Numbers, not adjectives.

## Learning

One paragraph. What you now believe that you did not believe before. Required for `measured` and for `killed`. A killed experiment without a learning is not killed, it is abandoned.

## Related

- [README.md](README.md)
- [power-check.md](power-check.md)
- [ab-test-playbook.md](ab-test-playbook.md)
- [../goals/okrs/TEMPLATE.md](../goals/okrs/TEMPLATE.md)
