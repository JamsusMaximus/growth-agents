# A/B test playbook

A split test is the most expensive kind of experiment to run properly, and the easiest kind to run badly. Badly run, it gives you a confident number that is wrong. This page is the shape that avoids the common ways of getting it wrong. Vendor-neutral: any feature-flag product or a hand-rolled cookie will do.

## Why client-side flags flicker and bias

The obvious set-up is to render the page, then let a script in the browser pick an arm and swap the content. Two things go wrong.

- **Flicker.** The visitor sees the control for a fraction of a second, then the variant. On a headline test that is the whole experiment shown twice. Fast connections hide it; slow ones do not, and slow connections are not a random sample of your visitors.
- **Bias.** Anyone who leaves before the script runs, blocks scripts, or lands on a cached copy counts in whichever arm the server sent, not the one the script would have chosen. The arms stop being equal.

The fix is the same for both: decide the arm before the page renders.

## Server-side assignment

The server picks the arm on the first request and renders that arm. The visitor never sees the other one. Assignment is a coin flip per visitor, not per page view, and not by anything you could be tempted to segment on later.

## Sticky cookie

Write the arm to a cookie on that first response so the same visitor sees the same arm on every later visit. Without it a returning visitor is re-flipped, sees both arms across a week, and you have no idea which one they were responding to when they bought. Set it to outlive the window.

## Assignment-gated reporting

Count a visitor only when the arm actually rendered. Fire an "assigned" event from the page, carrying the arm, at the moment the tested content is on screen. Report conversion as a share of assigned visitors, not of all visitors to the URL.

The difference is real. A visitor who hit the URL and bounced before render, a crawler, a prefetch, a redirect: all of these inflate the denominator and shrink both rates. Worse, they do not inflate the two arms equally. Assignment is the denominator. Nothing else is.

Most analytics tools, for example PostHog, do this with a flag evaluated on the server plus an event you send yourself once the page has rendered; other tools have equivalents. The principle does not depend on the vendor.

## Plain links to the tested page

Every link you send to the tested page carries no arm parameter. Newsletters, social posts, ads, all point at the plain URL. The server assigns. If you ever put the arm in the URL, everyone who clicks that link is in that arm and the split is broken for the whole window.

## Preview an arm

You will want to see the variant before the test starts and while it runs. Give yourself a way that does not touch real assignment: a preview query parameter that only works when you are signed in, or a separate preview deployment. Never preview by clearing your cookie and reloading until you get the arm you want; that adds you to the assigned count on both sides.

## Kill criteria before results

Write down, before the test goes live, what would make you stop it early. A broken checkout in one arm. A primary metric falling by more than the amount you set. A confounder landing mid-window that makes the readout meaningless. If the criteria are written first, stopping early is a decision. If they are written after, it is a rationalisation.

## Checklist for the next test

1. Power check done and the window can conclude (`power-check.md`).
2. Baseline snapshot taken and written into the experiment file.
3. Server-side assignment, sticky cookie, assignment event carrying the arm.
4. Report reads assigned visitors only.
5. All outbound links are plain.
6. Preview path tested without polluting assignment.
7. Kill criteria written in the file.
8. `status: live`, `window_end` set. The hook will chase you from there.

## Related

- [power-check.md](power-check.md)
- [TEMPLATE.md](TEMPLATE.md)
- [README.md](README.md)
- [EXAMPLE-measured.md](EXAMPLE-measured.md)
