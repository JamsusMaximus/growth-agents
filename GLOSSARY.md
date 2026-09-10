# Glossary

Fixed vocabulary. Every file in this repo uses these names and no synonyms.

## Files and folders

| Thing | Path | Notes |
|---|---|---|
| Mission | `goals/MISSION.md` | The year in one line, then the annual goals in detail. Derailers live here. |
| Quarter OKRs | `goals/okrs/<year>-q<n>.md` | Template: `goals/okrs/TEMPLATE.md`. Example: `goals/okrs/EXAMPLE.md`. |
| Monthly retro | `retros/monthly/<year>-<mm>.md` | Template and example alongside. |
| Weekly retro | `retros/weekly/<yyyy-mm-dd>.md` | Dated by the Friday it covers. |
| Standup | `retros/standups/<yyyy-mm-dd>.md` | One per working day. |
| Compounding ledger | `retros/compounding-ledger.md` | Never delete a row. |
| Experiment | `experiments/<slug>.md` | Template: `experiments/TEMPLATE.md`. Examples: `EXAMPLE-*.md`. |
| Principle | `principles/<slug>.md` | One rule per file. |
| Skill | `skills/<name>/SKILL.md` | One folder per skill. |
| Tool page | `stack/<tool>.md` | One per tool in `STACK.md`. |

Dated files (`YYYY-MM-DD.md`) are ignored by git in this repo so your live files never get committed by accident. Templates and examples are the only dated-looking files that ship.

## Fields

| Field | Meaning | Where |
|---|---|---|
| `mission` | The year goal in one line | MISSION.md |
| `derailer` | A named failure mode with a recovery move | MISSION.md |
| `objective` | A quarter-level outcome (O1, O2 ...) | OKRs |
| `kr` | A key result; prefer behaviours you control | OKRs, experiments |
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
kr: O2                # which key result this moves
primary_metric: checkout rate
baseline: 3.2%
window_end: 2026-08-20
---
```

`status` is the only field the hook and the retro skills need to find stale work: `live` with a `window_end` before today.

## Evidence labels

Every line in a retro carries one of three labels. There is no fourth.

- `observed`: a dated file or artefact exists
- `asked`: the human answered in this session
- `unobserved`: reconstructed; treat as unknown

## Section names

Every markdown file ends with a `## Related` list of at most five links. Reports end with a `## Coverage ledger`.

## Related

- [README.md](README.md) - the map
- [principles/README.md](principles/README.md) - the rules and their incidents
- [experiments/README.md](experiments/README.md) - the three rules the skills enforce
