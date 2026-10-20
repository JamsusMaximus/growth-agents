# Glossary

Fixed vocabulary. Every file in this repo uses these names and no synonyms.

## Files and folders

| Thing | Path | Notes |
|---|---|---|
| Mission | `goals/MISSION.md` | The year in one line, then the annual goals in detail. Nothing else. |
| Derailers | `goals/derailers.md` | The agent's coaching instructions: three named failure modes, each with a tell and a recovery move. Example: `goals/EXAMPLE-derailers.md`. |
| Quarter OKRs | `goals/okrs/<year>-q<n>.md` | Template: `goals/okrs/TEMPLATE.md`. Example: `goals/okrs/EXAMPLE.md`. |
| Monthly retro | `retros/monthly/<year>-<mm>.md` | Template and example alongside. |
| Weekly retro | `retros/weekly/<yyyy-mm-dd>.md` | Dated by the `retro_day` it covers (Friday by default). |
| Standup | `retros/standups/<yyyy-mm-dd>.md` | One per work day in your `cadence`. In team mode `<yyyy-mm-dd>-<name>.md`, one per person. |
| Compounding ledger | `retros/compounding-ledger.md` | Never delete a row. |
| Experiment | `experiments/<slug>.md` | Template: `experiments/TEMPLATE.md`. Examples: `EXAMPLE-*.md`. |
| Rule | `rules/<slug>.md` | One rule per file. |
| Skill | `skills/<name>/SKILL.md` | One folder per skill. |
| Tool page | `stack/<tool>.md` | One per tool in `STACK.md`. |
| Profile | `PROFILE.md` | Written by `/growth-setup`: role, `cadence` (the days you work on growth), `retro_day`, in a team `people` and whose turn is next, baselines not yet read, stack pages to read first. |
| Pointer | `.growth-agents` | Optional. One line naming the subfolder that holds your live files, such as `notes/growth`. Setup writes it; the hook reads it. |

Dated files (`YYYY-MM-DD.md`) are ignored by git in this repo so your live files never get committed by accident. Templates and examples are the only dated-looking files that ship.

## Fields

| Field | Meaning | Where |
|---|---|---|
| `mission` | The year goal in one line | MISSION.md |
| `derailer` | A named failure mode with a recovery move | derailers.md |
| `objective` | A quarter-level outcome (O1, O2 ...) | OKRs |
| `kr` | A key result (KR1.1); prefer behaviours you control. An experiment's `kr:` names the KR or objective (O1) it moves | OKRs, experiments |
| `owner` | Who types the readout for an experiment; team mode | experiments |
| `power_check` | The verdict of the power check: can conclude (and what it detects) or cannot conclude in window | experiments |
| `intention` | A month-level commitment the weekly inherits (2–3 per month) | monthly retro |
| `bet` | A week-level commitment (2–3 per week) | weekly retro |
| `must_be_true` | The one thing that must be true by tonight | standup |
| `verdict` | Whether yesterday's `must_be_true` landed: `landed` or `slipped` | standup |
| `protect` | The flight-into-building the day must resist | standup |
| `coverage ledger` | The list of sources checked, failed, or not applicable, on every report | standup, retros |

## Experiment frontmatter

```yaml
---
title: Pricing page headline
status: live          # planned | live | measured | killed
kr: O1                # which key result this moves
primary_metric: lead → customer conversion
baseline: 10%
window_end: 2026-08-20
---
```

`status` is the only field the hook and the retro skills need to find stale work: `live` with a `window_end` before today.

## Evidence labels

Every line in a retro carries one of three labels. There is no fourth.

- `observed`: a dated file or artefact exists
- `asked`: the human answered in this session
- `unobserved`: reconstructed; treat as unknown

## Testing a skill

- **Eval**: a repeatable test of a skill. Realistic prompts, each with assertions its output must pass, graded on every run and compared against the previous iteration as the baseline. `skills/skill-iterator/SKILL.md` runs the loop; `skills/weekly-retro/evals/personas.md` is a worked set.

## Section names

Every markdown file ends with a `## Related` list of at most five links. Reports end with a `## Coverage ledger`.

## Related

- [README.md](README.md) - the map
- [rules/README.md](rules/README.md) - the rules and their incidents
- [experiments/README.md](experiments/README.md) - the three rules the skills enforce
