# Monthly retro - [month year]

**Run:** [date]. **Exposure:** [n] working days of [n] (leave, illness). **Standup coverage:** [n] of [n] days ([share]%).

<!-- The skill drops these HTML comments when it writes the live file. -->

## 1. Pre-read (before any number)

<!-- Ask this first and record the answer verbatim. The point is a read uncontaminated by the report, so the report can be checked against it. -->

> What kind of month was it, and what is the one thing about it you would rather not say?

**Answer (asked):** [verbatim]

## 2. Facts

<!-- Every line carries one label: `observed`, `asked`, `unobserved`. -->

| Fact | Value | Label | Source |
|---|---|---|---|
| Posts published | [n] of [n] weeks | observed / asked | [dated files, or "asked"] |
| Experiments measured or killed | [n] | observed | `experiments/` frontmatter |
| Experiments still `live` past `window_end` | [n] | observed | `experiments/` frontmatter |
| Standup `must_be_true` landed | [n] of [n] recorded | observed | standup frontmatter |
| Last month's intentions hit | [n] of [n], or "none set" | observed | previous monthly file |
| [the number the mission is in, or "mission not set"] | [value] | asked | [where you read it] |

**Gap between the pre-read and the facts:** [where the feeling and the files disagree. This is usually the finding.]

## 3. Is the year line closer?

Mission: [paste the line, or "not set"]. Needed per month from here: [arithmetic]. Delivered this month: [value, label]. **Verdict:** closer / flat / further / NOT CLOSED.

<!-- Degraded mode. If any input that feeds this section is stale (a `live` experiment past `window_end`, a week with no retro, the mission number not read this month, the mission not set), the verdict is NOT CLOSED and no figure is recorded. Write `open as of <date>, pending <input>` and the checkbox below. A stale month does not get a number it did not earn. -->

- [ ] Reopen [month] when [the stale input] is resolved.

## 4. Compounding ledger

<!-- Which assets produced value this month with your hands off them? Name the evidence per row and admit them in `../compounding-ledger.md`. Builds do not qualify until they have produced something. "Nothing qualifies" is a complete section. -->

[rows admitted, refused, or "nothing qualifies"]

## 5. Derailers

<!-- For each of the three in `goals/derailers.md`: fired / did not fire / unobserved. Coverage gate: below 60% standup coverage, "did not fire" is not an available verdict; the absence of evidence is `unobserved`, never a clean month. If the table still reads [name it], write "derailers not yet named" and nothing else. -->

| Derailer | Verdict | Evidence |
|---|---|---|
| [from `goals/derailers.md`] | fired / did not fire / unobserved | [standup lines, weekly pattern-mining, or the human's own words (asked)] |

## Intentions

<!-- Two or three. Each is a commitment the weekly retro inherits as the frame for its bets. Tasks are banned here: "Measure the pricing test" is a task, "One live experiment at all times" is an intention. At least one carries a trigger and a person who will notice, asked by name; "no one will notice (asked: works alone)" is allowed. The numbered list starts on the line directly after the heading: the session-start hook parses it. -->
1. [intention]
2. [intention]
3. [intention, optional]

<!-- If you're in a team: one pre-read per person, one set of intentions for the team. -->

## Related

- [EXAMPLE.md](EXAMPLE.md) - a filled month
- [../weekly/TEMPLATE.md](../weekly/TEMPLATE.md) - inherits the intentions
- [../compounding-ledger.md](../compounding-ledger.md) - the admission test
- [../../goals/MISSION.md](../../goals/MISSION.md) - the year line
- [../../goals/derailers.md](../../goals/derailers.md) - the three rows section 5 gives verdicts on

## Coverage ledger

<!-- `checked` means read this session. `failed` carries three words on why. `n/a` for a source that cannot apply, including `first run`. -->

| Source | Status | Note |
|---|---|---|
| Weekly retros this month | checked / failed / n/a | [n of n present] |
| Standups this month | checked / failed / n/a | [n of n working days] |
| `experiments/*.md` | checked / failed / n/a | |
| Mission number | checked / failed / n/a | [dated] |
| Calendar (exposure) | checked / failed / n/a | [asked] |
| Last month's retro | checked / failed / n/a | |
| Compounding ledger | checked / failed / n/a | |
