# Weekly retro - [Friday's date]

**Week:** [Mon–Fri dates]. **Month's intentions:** [paste from `../monthly/<year>-<mm>.md`, or "no intentions yet"]. **Capacity next week:** [hours, asked].

<!-- Every line below carries one label: `observed`, `asked`, `unobserved`. The skill drops these HTML comments when it writes the live file. -->

## 1. Experiments (first, stale on top)

<!-- The week is not scored until every stale experiment is `measured` or `killed`. Stale means `live` with `window_end` before today. The agent lists them; the human types the readout. Example files never appear here: with no live experiments the section reads "no live experiments yet" and the gate is OPEN. -->

| Experiment | Status | Window end | Days over | Readout (typed by you) | Decision |
|---|---|---|---|---|---|
| `<slug>` | live | [date] | [n] | [the number, or "not measured"] | measured / killed / [blocked: why] |

**Scoring gate:** [OPEN: all stale experiments resolved] / [SHUT: n unresolved. Sections 2–4 stay blank.]

## 2. KR scoreboard

| KR | Target | This week | Score 0–100 | Label |
|---|---|---|---|---|
| KR1.1 | [from OKRs] | [what happened] | [n] | observed / asked / unobserved |

## 3. Standup pattern-mining

| Day | `must_be_true` | Verdict | Slip reason |
|---|---|---|---|
| Mon | [from standup] | landed / slipped / pending | [asked] |

**Which slip repeated?** [name it, and which derailer it belongs to; "derailers not yet named" if the table in `goals/derailers.md` is unfilled]. **Standups with no verdict:** [list; each stays at the top of the next standup until closed].

## Bets

<!-- Two or three. Each names the KR it moves and the smallest version that counts. The numbered list starts on the line directly after the heading: the session-start hook parses it. -->
1. [bet] - KR[n], smallest version: [one line]
2. [bet] - KR[n], smallest version: [one line]
3. [bet, optional]

Dropped: [what was left off, and "does not move a KR"].

## 4. Staged tasks

<!-- Drafted by the agent, confirmed by you before they go anywhere. Never auto-created. -->

- [ ] [task] (bet 1)
- [ ] [task] (bet 2)

<!-- If you're in a team: one scoreboard, one bets list, one pattern-mining table per person. -->

## Related

- [EXAMPLE.md](EXAMPLE.md) - a filled week
- [../standups/TEMPLATE.md](../standups/TEMPLATE.md) - the daily trail this mines
- [../../goals/okrs/TEMPLATE.md](../../goals/okrs/TEMPLATE.md) - the KRs scored above
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md) - the frontmatter the stale check reads
- [../../goals/derailers.md](../../goals/derailers.md) - the table the repeated slip is matched against

## Coverage ledger

<!-- `checked` means read this session. `failed` carries three words on why. `n/a` for a source that cannot apply this week, including `first run`. -->

| Source | Status | Note |
|---|---|---|
| `experiments/*.md` | checked / failed / n/a | |
| This week's standups | checked / failed / n/a | n of 5 days present |
| Current OKRs | checked / failed / n/a | |
| Latest monthly retro | checked / failed / n/a | |
| Last week's retro | checked / failed / n/a | |
| Calendar (capacity) | checked / failed / n/a | asked, not read |
| Tasks | checked / failed / n/a | |
| Metric source | checked / failed / n/a | |
