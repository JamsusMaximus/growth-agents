# Monthly retro - August 2026 (example)

**Run:** 1 Sep 2026. **Exposure:** 20 working days of 21 (one day ill). **Standup coverage:** 14 of 20 days (70%).

## 1. Pre-read (before any number)

> What kind of month was it, and what is the one thing about it you would rather not say?

**Answer (asked):** "Busy. I rebuilt the pricing page and it feels much better. The thing I'd rather not say is that I haven't looked at whether the pricing test finished."

## 2. Facts

| Fact | Value | Label | Source |
|---|---|---|---|
| Posts published | 3 of 5 weeks | observed | dated files |
| Experiments measured or killed | 0 | observed | `experiments/` frontmatter |
| Experiments still `live` past `window_end` | 1 (`pricing-page-headline`, ended 20 Aug) | observed | `experiments/` frontmatter |
| Standup `must_be_true` landed | 9 of 14 recorded | observed | standup frontmatter |
| Email list | 1,080 | asked | list provider, read on 1 Sep |
| Lead → customer conversion | 10%, unchanged on paper | asked | the one test that could move it is unread |
| ARR | not read | unobserved | not opened this month |

**Gap between the pre-read and the facts:** "busy" was building. Two of the five slipped standups had a product task as the one thing. The pricing page rebuild went live on 24 Aug; that is a build, not yet a result.

## 3. Is the year line closer?

Mission: £1M ARR by 31 Dec. Conversion: still 10% on paper, because the only test that could move it is past its window with no readout. List needs 230 net new per month from here; August delivered 80 (asked). ARR: not read.

**Verdict: NOT CLOSED.** One `live` experiment is past its window and the ARR figure was not read. No figure recorded. The verdict closes when `pricing-page-headline` is `measured` or `killed` and the ARR number is read, both inside the first weekly retro of September.

**Coverage gate:** 70% coverage clears the 60% bar. Derailer verdicts below are admissible.

## 4. Compounding ledger

`welcome-sequence-v2`: killed 24 Jul; the restored v1 still sends itself to every new subscriber with no send from me. Row stands, nothing new admitted.
`pricing-page-headline`: produced nothing yet; it has not been measured. Not admitted.

## 5. Derailers

| Derailer | Verdict | Evidence |
|---|---|---|
| Building instead of publishing | fired | 2 of 5 slipped standups were product tasks; two weeks unpublished |
| Polishing past good-enough | did not fire | the variant shipped on day 1 of the window |
| Inbox as the day's plan | unobserved | 7 days have no standup; the tell (standup after 10:00) cannot be read |

## Intentions

1. Ten conversion tests live at all times, none past its window.
2. Publish every Tuesday, rough if necessary, before any product work starts.
3. Read the ARR number on the first working day of every month.

## Related

- [TEMPLATE.md](TEMPLATE.md) - the blank month
- [../weekly/EXAMPLE.md](../weekly/EXAMPLE.md) - the Friday that inherits these intentions
- [../compounding-ledger.md](../compounding-ledger.md) - the row checked above
- [../../goals/EXAMPLE-MISSION.md](../../goals/EXAMPLE-MISSION.md) - the line tested in section 3
- [../../goals/EXAMPLE-derailers.md](../../goals/EXAMPLE-derailers.md) - the three rows section 5 gives verdicts on

## Coverage ledger

| Source | Status | Note |
|---|---|---|
| Weekly retros this month | checked | 4 of 5 present |
| Standups this month | checked | 14 of 20 |
| `experiments/*.md` | checked | one stale |
| Mission input (list) | checked | asked, 1 Sep |
| Mission input (conversion) | checked | asked; test unread |
| Mission number (ARR) | failed | not opened |
| Calendar (exposure) | checked | one sick day |
