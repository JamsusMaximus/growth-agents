# Experiments

The spine that holds you to account. Every bet you make on growth is a file in this folder, and the file has to end one of two ways: measured, or killed with a written learning. Nothing else counts as finished.

## The three rules

1. **No experiment goes live without a baseline and a metric written down first.** The template refuses to be `live` with either blank. If you cannot write the number you are starting from, you are not ready to start.
2. **Anything `live` past its `window_end` is surfaced at the top of every session and every weekly retro until it is `measured` or `killed`.** The weekly retro will not score the week while one is outstanding. No silent expiry. No auto-kill.
3. **No A/B test without a power check.** If it cannot conclude in the window, it is not an experiment yet. The weekly retro runs the arithmetic in `power-check.md` before an A/B test may go `live`, and the verdict goes in `power_check:`.

## Why rule 2 exists

The author left an experiment at `live` for ten weeks with no result. The set-up was careful, the baseline was written down, the metric was fixed up front. Then the window closed, nobody looked, and the file sat there looking finished. Ten weeks of a bet nobody could learn from. Rule 2 is the mechanism that stops it happening again: the file cannot go quiet, because the hook and the retro keep saying its name.

## Status lifecycle

| Status | Meaning | Leaves it when |
|---|---|---|
| `planned` | Written up, not yet running. Baseline and metric may still be blank. | You set the baseline, the metric and a `window_end`, then flip to `live`. |
| `live` | Running. Baseline and metric are filled. | `window_end` arrives and you type the readout (`measured`), or you stop early with a learning (`killed`). |
| `measured` | Readout typed, result and learning filled. | Never. It is a record now. |
| `killed` | Stopped before a clean readout. Learning filled, result may be partial. | Never. |

There is no `paused`. A paused experiment is a live one you are not looking at, which is exactly the state rule 2 exists to prevent. Kill it and re-plan.

## Frontmatter schema

Copied from `GLOSSARY.md`. Every file in this folder carries these fields; `owner` and `power_check` are optional (team mode, and A/B tests respectively). `kr` holds the key result id (KR1.1) or the objective id (O1).

```yaml
---
title: Pricing page headline
status: live          # planned | live | measured | killed
kr: O1                # which key result this moves
primary_metric: lead → customer conversion
baseline: 10%
window_end: 2026-08-20   # YYYY-MM-DD, or the hook reports it unreadable
owner: Sam            # optional, team mode
power_check: can conclude, detects 1.4 points in 3 weeks   # A/B tests only
---
```

`status` and `window_end` are what the hook and the retro skills need to find stale work: `live` with a `window_end` before today, or `live` with no readable `window_end`.

## What v1 does and does not do

Readouts are yours to type; the agent's job is to make sure you do. Nothing in this repo reads your analytics, pulls a conversion rate, or decides an experiment won. You open the file, look at your numbers, write the result and the learning, and change the status. The agent chases you until that happens.

## How stale work gets found

- **The session-start hook** (`hooks/session-start.sh`) reads every file in this folder except the template and this README. Any file with `status: live` and a `window_end` before today is printed on the `Stale` line, with the slug and the number of days over. It prints every session until the status changes.
- **The weekly retro** reads the same files, stale first, before it reads anything else. While one is outstanding it will not score the week. It asks for the readout, or the kill and its learning, and only then carries on.

Both read the frontmatter and nothing else, so the two fields that matter are `status` and `window_end`. Keep them accurate.

## Files here

| File | What it is for |
|---|---|
| `TEMPLATE.md` | Copy to `<slug>.md` for every new experiment |
| `ab-test-playbook.md` | How to run a split test that measures what it claims to |
| `power-check.md` | Whether your test can conclude in the window, before you start |
| `EXAMPLE-measured.md` | A finished experiment with a readout |
| `EXAMPLE-killed.md` | A stopped experiment with a written learning |
| `EXAMPLE-live-stale.md` | The one the hook and the weekly retro chase |

If you're in a team: point `experiments/` at your team's shared folder (a symlink works) so the hook and the retro read the same files everyone else does.

## Related

- [TEMPLATE.md](TEMPLATE.md)
- [power-check.md](power-check.md)
- [ab-test-playbook.md](ab-test-playbook.md)
- [../GLOSSARY.md](../GLOSSARY.md)
- [../retros/weekly/TEMPLATE.md](../retros/weekly/TEMPLATE.md)
