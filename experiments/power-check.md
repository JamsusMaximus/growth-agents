# Power check

Before a split test goes live, answer one question: given the traffic you have and the rate you start from, how big a lift could this test actually detect in the window? If the honest answer is "bigger than any lift you believe is plausible", the test cannot conclude, and it is not an experiment yet.

This is arithmetic anyone can do in a spreadsheet. No script ships in v1.

## What you need

- **Base rate.** The baseline from your experiment file, as a proportion. `10%` is `0.10`.
- **Weekly traffic.** Leads (or visitors) who will be assigned to the test each week, across both arms.
- **Power and confidence.** Use 80% power and a two-sided 5% significance level unless you have a reason not to. These give a combined z of roughly 2.8.

## The formula

For two equal arms, the smallest absolute difference you can detect is approximately:

```
lift = sqrt( 2 × 2.8² × p × (1 − p) / n_per_arm )
```

This uses the baseline variance for both arms, so it is slightly optimistic: the exact two-proportion figure is a few per cent larger.

where `p` is the base rate and `n_per_arm` is the assigned visitors in one arm over the whole window (weekly traffic × weeks ÷ 2). Put it in a cell, drag it across three columns for 2, 4 and 8 weeks, and you have the table below for your own numbers.

## Worked table

Base rate 10%, lead → customer conversion on a pricing page. Two traffic levels, so you can see where the line falls.

| Leads per week | Weeks | Per arm | Minimum detectable lift (absolute) | Variant would need to reach | Relative lift |
|---|---|---|---|---|---|
| 1,000 | 2 | 1,000 | 3.8 points | 13.8% | +38% |
| 1,000 | 4 | 2,000 | 2.7 points | 12.7% | +27% |
| 1,000 | 8 | 4,000 | 1.9 points | 11.9% | +19% |
| 5,000 | 2 | 5,000 | 1.7 points | 11.7% | +17% |
| 5,000 | 4 | 10,000 | 1.2 points | 11.2% | +12% |
| 5,000 | 8 | 20,000 | 0.8 points | 10.8% | +8% |

A low base rate bites harder. At a 3% base rate and 400 leads a week, a 4-week test has 800 per arm and can only detect about 1.7 points (3% to roughly 4.7%, a relative lift of more than half). No believable headline change does that, so the verdict is `cannot conclude`.

Read it like this. At 1,000 leads a week, a headline change would have to lift conversion by about a fifth to show up even after eight weeks. Headline changes rarely do that. At 5,000 a week, a 4-week test can see a lift of about an eighth, which is plausible for a strong change, and a 3-week test at that traffic detects about 1.4 points, which is what the two pricing-page examples in this folder relied on.

## The "cannot conclude" verdict

Compare the smallest lift you can detect in your longest acceptable window with the largest lift you honestly believe the change might produce. If the detectable lift is bigger than the believable lift, write `cannot conclude` in the experiment file's `power_check:` field and do not set it `live`. When it can conclude, write that too, with the numbers (for example `power_check: can conclude, detects 1.4 points in 3 weeks`). The weekly retro runs this arithmetic with you before any A/B test moves from `planned` to `live`.

That verdict is not a failure. It saves you the window. Your options from there:

- **Test something bigger.** A whole-page rewrite, a price, an offer. Bigger changes produce bigger lifts.
- **Move the metric up the funnel.** A click on the button happens far more often than a purchase, so the base rate is higher and the detectable lift is smaller. You give up certainty that clicks become money; say so in confounders.
- **Extend the window** only if you can name a date and the power check says it concludes by then. A window that keeps stretching is the ten-week failure rule 2 exists for.
- **Do not run a split test.** Ship the change to everyone and compare before and after, stated honestly as a weaker design in the experiment file.

## Kill criteria, written before results

The power check tells you how long the window has to be. It does not tell you when to stop early. Write those triggers in the experiment file now, before anything goes live:

- A broken funnel in one arm.
- The primary metric falling by more than a threshold you set.
- A confounder landing mid-window that makes the readout meaningless.

Anything decided after you have seen the numbers is a story, not a criterion.

## Related

- [ab-test-playbook.md](ab-test-playbook.md)
- [TEMPLATE.md](TEMPLATE.md)
- [README.md](README.md)
- [EXAMPLE-killed.md](EXAMPLE-killed.md)
