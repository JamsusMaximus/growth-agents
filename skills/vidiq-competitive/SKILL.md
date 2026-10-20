---
name: vidiq-competitive
description: >
  Find out what is working for competitors on a given YouTube video or topic,
  using vidIQ data, and turn it into the shape and packaging of your own
  version. Two entry points: a competitor's video URL, or a bare topic. Two
  paths: a cheap fast path for a same-day launch video on a brand-new feature,
  and a full run for a planned search video. Applies hard qualify and kill
  rules rather than presenting data. Use for "how did this video do", "is this
  topic worth making", "what has worked for X", "what should I call this",
  "what is working in this niche". Not open-ended "what should I film at all",
  and not packaging an already-filmed video (that is youtube-package).
license: CC-BY-NC-4.0
---

# vidIQ competitive analysis

Two decisions, nothing else: **what to film next** and **how to package it**. If
a number does not change one of those, it does not go in the report.

## The objective is reach, because capture happens downstream

For an online business selling a digital product, the channel is the top of a
chain: video, free giveaway or lead magnet, email list, offer. Capture rate
from view to list is roughly constant, so **bigger reach wins, close to
linearly**. Corollaries:

- Never kill a topic for being "too mass market". That is the strategy.
- A big-reach video with no capture mechanism attached is the real waste. The
  verdict must name which lead magnet or call to action rides on it.
- Publishing into an empty field on day zero is how a small channel reaches a
  head term at all.

Ad revenue is not an objective. Do not run the earnings tools or report
earnings; the money is in the list.

If you're in a team: the person who will film answers the type question in
step 0.1; the analyst runs the calls; the verdict goes to both.

## Step 0.0: which front door?

- **Entry A, a competitor's video.** "Here is a good video, help me make
  mine." Seed is that video.
- **Entry B, a topic, no video.** "I want to film X explained; what has
  performed?" Build the seed: run a strict-match outlier search on the topic,
  take the top two or three by breakout score, treat those as the seed set.
  Everything downstream works unchanged, run once per seed video. If the topic
  returns nothing under strict match, say so plainly and offer a broader parent
  term. Never silently fall back to a topic nobody watches.

Not this skill: "what should I film at all?" with no video and no topic.

## Step 0.1: classify the video type first

Everything branches on it: which term you search, which calls you make, what
the verdict looks like, and how much you spend. Ask the human one question:
*same-day launch video on a release under about two weeks old (Type 1), or a
planned search video (Type 2)?*

Fallback if nobody is there to ask: released within two weeks **and** fewer
than about five strict-match videos exist means Type 1. Otherwise Type 2.

| | Type 1: speedy launch | Type 2: planned search |
|---|---|---|
| Production | Self-recorded, self-edited, same day | Edited properly, days to weeks |
| Aimed at | A new release, published into an empty field | Search intent that compounds for months |
| Keyword gate | Exempt: volume is near zero because the term is days old | Applies |
| Qualified by | Release recency, outlier velocity, comment volume | Keyword demand, format evidence, saturation |
| Wins because | Nobody has indexed the term yet | It ranks and keeps ranking |

Being able to publish the same day is a real capability. Do not talk the
operator out of a launch play on production-cost grounds.

## Type 1 fast path (four calls)

The topic is decided, the feature is days old, and filming starts soon. The
full run would spend most of its budget on sections that are empty by
construction. Do not run it.

| # | Call | Produces |
|---|---|---|
| 1 | Get the seed video by id | Channel id, title, publish date |
| 2 | The incumbent channel's long-form back catalogue, newest first | The scaffold evidence and the only valid hit-rate denominator |
| 3 | Comments on the seed, one hundred by relevance | Structure and packaging language |
| 4 | Optional: strict-match outliers on the **parent** product | Extra scaffold candidates |

Search the parent product, never the feature name: a days-old feature has no
videos, no volume and no outliers by definition.

**Respect the clock.** Structure must land before filming, because it changes
what gets demonstrated and in what order. Title and thumbnail can land during
the edit. If structure cannot be delivered within about ten minutes, deliver
structure only and defer packaging.

**The Type 1 deliverable is a scaffold, not a topic.** Tag every title in the
incumbent's last thirty long uploads with exactly one scaffold:
`clearly-explained`, `just-dropped`, `i-tried`, `A-vs-B`, `N-things`,
`how-to-in-N-minutes`, `the-one-X`, `other (state it)`.

> hit rate = videos using scaffold S that beat the channel's median views,
> divided by all videos using S, over the last thirty long uploads.
> Report as `n/N`. Do not report a scaffold with N under four.

Only the back catalogue can supply the rate. Outlier searches return winners
only, so a hit rate computed from them is one hundred percent by construction.

## Step 0.2: bootstrap (Type 2)

1. Video ids: from the URL, or from the outlier sweep in step 0.0.
2. Seed channel id, title and publish date, in one call for all seeds.
3. The search keyword: the two-or-three-word product or topic phrase from the
   seed title, not the full title. A long string returns zero under strict
   match. If ambiguous, ask; two agents guessing differently produce different
   reports.
4. **Your own channel's long-form back catalogue.** Non-optional. Every
   judgement is relative to your baseline. Read your current subscriber count
   here and derive the size thresholds below from it, rather than hard-coding
   them; they go stale silently as the channel grows.

## Priority bands

1. **What format is winning on channels your size** (outliers). An outlier on
   a huge channel is evidence about the channel, not the format.
2. **Topic demand you can win** (keyword research). Competition is a gate, not
   a discount factor.
3. **Title formulas and scored candidates.** The packaging decision.
4. **Saturation** (the competitor's catalogue plus a thirty-day field count).
   Mostly says what not to make.
5. **Breakout literacy.** A lens over everything above, not a section.
6. **Comment themes, woven in.** Comments feed three decisions: **structure**
   (repeated questions become the running order), **packaging language** (the
   viewers' exact words are the title and thumbnail words), and **the angle**
   (an unanswered repeated question under a big video is proven demand with an
   incumbent who declined to cover it). Never cut this band for credits; it is
   the one reliably winnable at a small size. On Type 1 only structure and
   packaging language transfer; the angle is already decided.
7. **Thumbnail.** Packaging detail once a topic is chosen.
8. **Decay curve and channel growth.** Two lines, or cut.

## The sequence

Ordered by dependency, not by band. **Run no title call until the topic is
written down.**

Research phase:

| # | Call | Serves |
|---|---|---|
| 1 | Outliers, strict title match, long-form, three months, sorted by breakout | What format is winning |
| 1b | Same, capped to small channels | Go and get the small-channel evidence rather than killing on its absence |
| 2 | Keyword research, research mode | Demand you can win; trend from the views-per-hour history in this call |
| 3 | Outliers, this month | The thirty-day field count |
| 4 | Competitor's long-form back catalogue | Saturation and their real hits |
| 5 | Comments, one hundred by relevance | The angle |
| 6 | Video stats daily plus channel stats | Context |

Write the one-sentence topic here. Then, and only then, the packaging phase:

| # | Call | Serves |
|---|---|---|
| 7 | Generate titles, feeding outlier titles as competitor titles and your catalogue as previous titles | Candidates |
| 8 | Score two or three candidates **against your own channel id** | Generation returns scores but takes no channel id, so they are not contextual. Do not skip this to save credits |
| 9 | Optional: score a thumbnail | Only if a concept exists |

Not run: earnings, subscriber insights (owned channels only, different
question), similar-videos (if you must, match on title only).

## Decision rules

Without these the report is taste dressed as analysis. Apply them literally;
when a rule fires, say so and name it.

**Classify the format first.** Tag every outlier with exactly one of:
first-look, feature walkthrough, tutorial-with-outcome, comparison,
build-along, teardown. State the tag so the count is auditable.

- A format is **proven** only if three or more outliers share the tag and each
  has a breakout of three or more.
- **Breakout bands:** three or more is a breakout; one and a half to three is
  solid, counts as demand evidence but never format evidence; under one and a
  half is a dud. Always say which band.
- **Weight by channel size.** A breakout on a channel within about five times
  your subscribers is format evidence. A breakout on a channel far larger is
  demand evidence, labelled non-transferable as format.
- **Survivorship check.** Outlier searches return only winners. If a format is
  everywhere and rarely breaks out, the channel explains the win.

**Qualifying a keyword.** One hard gate: competition at or below the ceiling
you set for an evergreen search play (thirty on vidIQ's scale is a sane
default). Everything else is preference. Report the best available even if it
clears only the gate. Among qualifiers prefer the biggest; the ceiling exists
to stop unwinnable head terms, not to push you small. Release-timing plays are
exempt from the gate entirely; judge them on outlier velocity and comment
volume, and say which you used.

**Downgrades, not kills.** No outlier from a channel near your size means
demand-proven, format-unproven, not a search play. It still qualifies if band
six supplies an unanswered question or band two a real keyword gap. Say which
carries it.

**Kill rules. Only these say DON'T FILM:**

- Bands one, two and six all come back empty.
- The incumbent has a video more than ten times bigger on the same topic within
  six months, and no unanswered comment theme remains.
- The honest answer to "why you" is "nothing". This fires only if you cannot
  name a specific client, result or failure the video would cite; "I have
  credibility" is always available and so never counts.
- The packaging gate fails twice.

**Every DON'T FILM carries a next action:** the nearest adjacent topic that
qualifies, or "no topic in this lane; re-run when [specific event]". A kill
with no next action is wasted credit.

**Tie-break between two topics:** breakout evidence, keyword qualification,
angle strength, time to film, recency window. Soonest to film wins ties.

## Timing

Take the earliest publish date in the outlier set as t=0 and record each
outlier's lag. Report as early cluster versus late cluster, not a day-by-day
curve; with a handful of outliers the curve is noise. The verdict carries a
**ship-by date**. Miss a Type 1 window and it does not become a worse Type 1;
it converts into a Type 2 long-tail video with a different title. Say so.

Off-platform seeding (your list, your other channels) is your real day-one
distribution and no vidIQ metric sees it. Factor it in.

## Packaging is a gate, not a later section

Write the title and a one-line thumbnail concept **before** the film or
don't-film call. If they do not beat the incumbent's side by side, the verdict
is don't film regardless of keyword ratio. A topic that cannot be packaged is
not a topic.

- Score against your own channel id, never the competitor's. Cross-channel
  scores are not comparable.
- The score is a prior, not a verdict. It rewards generic clickbait shapes
  over specific practitioner framing. Justify the choice in words and report
  the score alongside.
- Thumbnail text three to five words, complementary to the title, derived from
  what the winning outlier thumbnails actually say.
- If the human has candidate titles, ask for them before generating.

## Output

Write `vidiq-analysis-<slug>.md`, slug from the seed video. The verdict is the
deliverable; everything below it is evidence.

**Type 1 verdict:** do not ask film or don't film; that is closed. Three lines:
SHAPE (format tag, target runtime, running order from the comments with
counts), TITLE (scaffold and its `n/N`, the feature slotted in, thumbnail
text, viewer phrasings worth lifting), SHIP TODAY (and what it converts into if
the window is missed). Omit the demand and saturation sections entirely.

**Type 2 verdict:** three lines, each with a bracketed citation to the evidence
section, then the checks.

1. FILM or DON'T FILM, with the rule that fired and the mandatory next action.
2. The topic: a [format] about [phrase] that answers [comment question],
   titled "[title]", thumbnail text "[words]".
3. Ship by [date], [production path].

Checks: why-you (a named client, result or failure) · variant of (your own
video, or "new lane") · series (yes with the next two, or one-off) · capture
hook (which lead magnet or call to action rides on it).

Evidence sections, each omitted rather than padded when its data is missing:
what is winning (split winnable-at-your-size versus demand-signal-only), topic
demand, packaging, saturation (Type 2 only), structure from the comments,
context, confidence and gaps.

**Always append to a shortlist.** Every run adds or updates one row in a
standing `shortlist.md`: topic, type, single strongest number with source,
window, status (`shortlisted`, `filmed <date>`, `killed <date>: <reason>`).
Kills are the most valuable rows because they stop the same topic being
re-analysed in six weeks. A kill reason must be specific enough to expire.
Update an existing row rather than adding a duplicate.

## Cost and consent

Every vidIQ call costs credits except balance and own-channel lookup. Title
scoring has no batch mode. The fast path is four paid calls and never needs a
yes. The full run is roughly fifteen paid calls. Check the balance before and
after and report the difference as actual spend. State the projected cost and
wait for a yes when the balance is low. Contrast with `youtube-package`, where
credits are not a constraint: packaging a filmed video is committed work; a
competitor read is speculative.

## Traps

- Outlier search defaults to broad semantic matching and returns garbage for
  product names. Always require all title terms.
- Similar-videos with the default match mixes in thumbnail lookalikes with no
  topical relevance. Match on title only.
- Subscriber insights errors on channels you do not own.
- Video stats need full ISO-8601 timestamps with a `Z`, not a bare date.
- Channel videos requires a video format parameter; omitting it throws.
- Title scoring requires a type as well as a title.
- Keyword research in rising mode ignores the keyword; use the history from
  research mode for trend direction.
- Breakout is diagnostic for reading competitors only. On your own thin,
  irregular catalogue the denominator is unstable; define your own success in
  funnel terms (site clicks, list signups, enquiries citing YouTube).

## When a call comes back empty

- Outliers empty under strict match: retry strict with the shortest
  distinctive term. Still empty: report "no measurable format signal; this
  lane is unproven", which is itself a finding. Never fall back to broad match.
- Comments disabled or too few: say so, and walk down the angle ladder: a
  keyword gap with no strong incumbent, then an outlier format not yet applied
  to your topic.
- Any other section unavailable: omit it. Never pad.

## Related

- [youtube-package](../youtube-package/SKILL.md): once the topic is chosen and filmed
- [linkedin-post](../linkedin-post/SKILL.md): the off-platform seeding that no metric sees
- [experiments/README.md](../../experiments/README.md): log a filmed video as an experiment with a window
- [STACK.md](../../STACK.md): the vidIQ MCP this skill assumes
- [rules/README.md](../../rules/README.md): why every report ends with what was not checked
