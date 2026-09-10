# Weekly retro - 4 Sep 2026 (example)

**Week:** 31 Aug–4 Sep 2026. **Month's intentions:** no stale experiments; publish weekly before product work; read revenue on day one. **Capacity next week:** 35 hours (asked).

## 1. Experiments (first, stale on top)

| Experiment | Status | Window end | Days over | Readout (typed by you) | Decision |
|---|---|---|---|---|---|
| `pricing-page-headline` | live | 2026-08-20 | 15 | variant 4.0% vs control 3.2% over 3 weeks; power check said the window could detect 0.8 points, so this clears it | measured (observed after the file was updated this session) |
| `welcome-sequence-v2` | killed | 2026-08-07 | n/a | killed 24 Jul with the learning typed | closed |

**Scoring gate:** OPEN. One stale experiment resolved this session. It sat fifteen days over because nobody was chasing it; that is the finding, and the reason this section is first.

## 2. KR scoreboard

| KR | Target | This week | Score 0–100 | Label |
|---|---|---|---|---|
| KR1.1 | lead magnet in every post | mentioned in Tuesday's post | 100 | observed |
| KR1.2 | 1,250 subscribers | 1,103 | 41 | asked |
| KR2.1 | one pricing test live | none live since 20 Aug; next one `planned` | 0 | observed |
| KR2.2 | measured winner | variant wins, 4.0% | 100 | observed |
| KR3.1 | 13 of 13 weeks published | published Tuesday; 4 of 5 so far | 80 | observed |

## 3. Standup pattern-mining

| Day | `must_be_true` | Verdict | Slip reason |
|---|---|---|---|
| Mon | Read August revenue and record it | landed | |
| Tue | Post published by 12:00 | landed | |
| Wed | Second pricing test written to `planned` with baseline and metric | slipped | "rewrote the headline four times" (asked) |
| Thu | Same as Wed | slipped | "wanted the copy right first" (asked) |
| Fri | Same as Wed | pending | retro running; close tonight |

**Which slip repeated?** The same one, three days: the second pricing test, held back for copy. That is "polishing past good-enough". **Standups with no verdict:** Friday, closes tonight.

## Bets

1. Second pricing test live by Tuesday, copy as it stands (KR2.1)
2. Publish Tuesday before opening the product repo (KR3.1)
3. Move the winning headline to the pricing page and record the date in the experiment file - KR2.2, smallest version: the headline only, no other page changes

## 4. Staged tasks

- [ ] Fill baseline (4.0%) and `window_end` on the second pricing test, run the power check (bet 1)
- [ ] Draft Tuesday's post from the retro finding above (bet 2)
- [ ] Swap the headline; add the change date to `experiments/pricing-page-headline.md` (bet 3)

## Related

- [TEMPLATE.md](TEMPLATE.md) - the blank week
- [../monthly/EXAMPLE.md](../monthly/EXAMPLE.md) - the month whose intentions frame these bets
- [../standups/EXAMPLE.md](../standups/EXAMPLE.md) - the next Monday's standup, inheriting bet 1
- [../../goals/okrs/EXAMPLE.md](../../goals/okrs/EXAMPLE.md) - the KRs scored above
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md) - the frontmatter the stale check reads

## Coverage ledger

| Source | Status | Note |
|---|---|---|
| `experiments/*.md` | checked | two files, one stale |
| This week's standups | checked | 5 of 5 |
| Current OKRs | checked | |
| Latest monthly retro | checked | August |
| Last week's retro | failed | no file for 28 Aug |
| Calendar (capacity) | n/a | asked, not read |
