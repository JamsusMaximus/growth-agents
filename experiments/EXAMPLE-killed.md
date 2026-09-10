---
title: Welcome sequence v2
status: killed
kr: O1
primary_metric: reply rate to email 3
baseline: 1.5%
window_end: 2026-08-07
---

# Welcome sequence v2

## Hypothesis

If we rewrite the five-email welcome sequence so that email 3 asks one direct question, then new subscribers will reply more often, measured as reply rate to email 3 moving from 1.5% to 4%, because a question that is easy to answer gets answered and a reply is the strongest early signal that a subscriber will later buy.

## Which KR it moves

O1. Replies are the behaviour we control on the way to the list-growth KR.

## Audience

Every new subscriber from the sign-up date onward. Existing subscribers excluded: they already had v1. Around 60 new subscribers a week, which is why this is a before-and-after comparison and not a split test. The power check said a split at that volume could not conclude inside a quarter.

## Treatment

Replace the five-email sequence. Email 3 ends with a single question about what the subscriber is trying to do this month. Emails 1, 2, 4 and 5 rewritten for tone but with the same offers in the same places.

## Baseline snapshot

1.5% reply rate to email 3 across the eight weeks before the switch, from the email tool's reply tracking, taken 2026-06-26.

## Primary and secondary metric

- **Primary:** reply rate to email 3.
- **Secondary:** unsubscribe rate across the sequence. Click rate on email 5's offer.

## Window

2026-06-29 to 2026-08-07. Six weeks, to get enough subscribers through email 3 for the rate to mean anything.

## Confounders, stated honestly

Before-and-after, so anything that changes who signs up in the window changes the comparison. Two guest appearances were planned for July and would bring a different audience. Stated as a known weakness; the best proxy is to compare replies from subscribers who arrived through the usual channels only.

## Kill criteria

Stop early if unsubscribe rate across the sequence more than doubles, or if the reply-tracking integration breaks for more than three days.

## Status

- 2026-06-26 `planned`.
- 2026-06-29 `live`.
- 2026-07-24 `killed`.

## Result

Partial. Through week four the reply rate to email 3 was 1.8% on roughly 200 subscribers, no real movement. Unsubscribe rate across the sequence had risen from 4% to 9% by week three and was still climbing, which hit the kill criterion. Stopped and v1 restored.

## Learning

The question in email 3 was fine. The tone rewrite of the other four emails was the problem: warmer copy read as longer copy, and subscribers who signed up for something practical left. Separate the variables next time. One email changes, the rest stay, and the unsubscribe rate is the primary metric for any tone change, not a secondary one.

## Related

- [TEMPLATE.md](TEMPLATE.md)
- [power-check.md](power-check.md)
- [README.md](README.md)
- [EXAMPLE-measured.md](EXAMPLE-measured.md)
