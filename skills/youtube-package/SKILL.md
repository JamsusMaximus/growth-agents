---
name: youtube-package
description: >
  Produce the complete upload package for a YouTube video that is filmed but
  not yet published: scored title variants, description, tags, chapters from
  real timestamps, and a thumbnail brief, all grounded in the transcript and
  real keyword data rather than guesswork. Use for "package this video",
  "title and description for this", "what should I call this video", "get this
  ready to publish", or re-optimising a published video's metadata. Not for
  choosing topics (that is vidiq-competitive) or for distribution afterwards.
license: CC-BY-NC-4.0
---

# youtube-package

Turns a filmed video into a paste-ready upload package.

## The one principle

**The transcript is the source of truth for what happened. Keyword research is
the source of truth for what to call it.**

Never let the transcript limit the keyword set: the video is about things it
never says aloud, and those terms are often the best opportunities. Never let
keywords invent facts: a description that describes a workflow the video did
not show is worse than none, because it gets pasted into YouTube unchecked.
Both failures happen. Guard against both.

If you're in a team: whoever filmed the video answers the inputs below; the
editor owns the timestamps; nobody else writes a factual claim.

## Inputs

Ask for these. Do not infer them.

1. **The video file**, or an existing transcript (`.srt` preferred, since
   chapters need timestamps).
2. **The one term to rank for.** This single input changes the title
   materially. Never guess it.
3. Optional: launch-window piece or evergreen, which links to include, whether
   a thumbnail already exists.

## Budget and pace

Around thirty tool calls, one pass, one stop. Title scoring has no batch mode,
so eight scored variants is eight calls. Run independent calls in parallel: all
keyword seeds in one message, the lane scan in one, the title scores in one.
Latency is the real cost when the video is a launch piece; being live today
beats being perfect tomorrow. Say why if you need to go materially past the
budget.

## Pipeline

### 1. Transcribe

Produce `.txt` and `.srt`. **If transcription fails, stop.** Write `HALTED.md`
saying why. Do not write a description on a guess; that is the failure this
skill exists to prevent.

### 2. Extract the factual spine

From the transcript, list: what was demonstrated, in order, with what result;
every tool, product and site named; every claim, tip and caveat said aloud.

This list is the only permitted source of factual statements in the
description. Speech-to-text mangles proper nouns. Never copy one straight from
the transcript; work out what was actually said and spell it correctly.

### 3. Seed terms, wider than the transcript

Four sources, all of them: terms said in the video; the ranking target and its
variants; adjacent terms the video is about but never names (a video showing
browser control is about "browser automation" even if nobody says it); and the
related-keyword expansion of the above.

### 4. Research every seed

Run keyword research on each seed (the vidIQ MCP is the reference tool). Build
one opportunity table: volume, competition, estimated searches, **sorted by
volume divided by competition**. Sorting by volume alone buries the good ones.
On a small channel weight competition more heavily than the ratio suggests.

**Read the related-keyword list, not just the metrics.** A term can look
perfect and belong to a different audience entirely: a generic phrase can
return results from a profession that shares the words. The qualified form
(product name plus phrase) usually returns a clean set at higher volume. Report
it when a term fails this check; it is a real finding.

**Run the bare product name as its own seed before shortening it in a title.**
Vendors reuse each other's feature names constantly, so a bare feature name
can belong to a rival product. Expect the answer to be "write it in full".

**Prefer adjacency over presence.** A title containing the product name and the
feature name side by side is a stronger signal than the same words apart. The
same holds for the opening of the description.

Flag the best unused ratio as the next-video candidate.

### 5. Scan the lane before writing a title

Keyword metrics say what people search. They say nothing about who already
owns the result, at what channel size, or what framing is winning. Two calls,
both required:

- A search on the ranking target: the results page the video is walking into.
  Record title, channel, subscriber count and views for the top fifteen or so.
- An outlier search on the topic, long-form, this month, sorted by breakout.
  This is what is overperforming, which is the more useful question.

Then answer three questions in `competitors.md`:

1. **Who owns the target phrase, and how big are they?** If the top results are
   channels two orders of magnitude larger, front-loading the target is a fight
   on authority you will lose. Say so.
2. **What framing are the small-channel breakouts using?** Filter to channels
   within an order of magnitude of your own. This is the single most useful
   output of the step.
3. **What has nobody done?** The unclaimed angle is usually the real
   positioning.

Outlier results are noisy on loose keywords. Read past the junk; do not report
it as competitors. Always report subscriber count beside view count: the same
view figure on a huge channel and a tiny one are opposite findings.

**This step can overturn the title rule in step 6.** When the lane is owned by
much larger channels running neutral explainers, and the breakouts on small
channels all take a position, a committed title beats a front-loaded one. The
target phrase then moves to the tags, the description opening and the hashtags.
Present both options with the evidence.

**Then intersect the winning framing with what is true.** A lane scan tells you
what framing wins, not what framing you are entitled to use. A title is a
factual claim. "I switched", "I stopped using", "why I left", "I tried it for
thirty days" assert biography. If the biography is false, the stance is still
available in the second person ("you should switch") or as a product claim,
and it scores within a few points. Copy the stance, not the biography.

Feed the real competitor titles into title generation so it is grounded in the
actual lane rather than the tool's own hidden lookup.

### 6. Titles

Generate, then score eight variants. Present a table with **score and character
count**, sorted by score.

Expect the generator to ignore the ranking target; it optimises for click
appeal. Treat its output as raw material and write your own front-loaded
variants into the scored set.

Selection, in order:

0. Check step 5. If the lane is owned by much larger neutral channels, lead
   with the committed option and push the target into tags and description.
1. **The first forty characters or so must be a complete thought on their
   own**: subject, stake and action, with the target as early as it will go.
   Truncation is a two-line clamp that depends on wrapping, so preview the
   shortlist in a grid mock-up rather than counting characters. Never put the
   hook in a trailing parenthetical; the browse grid cuts it.
2. Highest score among titles satisfying rule 1. Hard limit one hundred
   characters.
3. Within a few points the score decides nothing; judgement does. Prefer the
   title that gives the reader a stake. A statement about a property of
   software, with no "you" in it, is flat however well it scores.
4. Do not reach for emotion by overclaiming. Inflating the charge against a
   product fails on accuracy and on score at once.

**Then stop and present.** Do not auto-select. Show what lost, not only what
won. The human has overridden the recommended title and been right.

### 7. Description, chapters, tags

**Description**, from the factual spine only. The first line or so is the
search snippet and is cut server-side, so the target goes in the first eight
words. No minimum length; padding is a failure mode. The limit is measured in
bytes, so emoji cost more. Add a handful of hashtags using real terms people
follow, not spelling variants.

**Chapters**, from real `.srt` timestamps only. First stamp `00:00`, at least
three, ascending, at least ten seconds apart, around ten at most. **If there
is no `.srt`, emit blank times and say why.** A plausible-looking timestamp is
worse than a blank one, because manual chapters override the automatic ones.

**Links.** Keep one standing block of verified URLs for your channel and paste
it below the factual body. Anything not in that block stays as `[LINKS]`.
Never invent a URL.

**Tags.** Ranking target and variants first, then the volume base. Spelling
variants belong here, not in hashtags. Mind the character limit and that
multi-word tags cost extra.

### 8. Thumbnail brief

Three lines: two concepts, at most three words of overlay text each, and a
small-render legibility check (sidebar thumbnails are tiny). This step
produces the brief only.

**Title and thumbnail carry different halves of one idea.** The title states
the action; the thumbnail states the reason. The same half twice wastes the
thumbnail.

Two hard checks before proposing a concept:

1. **Does the video deliver what the thumbnail promises?** A takedown
   thumbnail on a measured video buys clicks and loses retention, and on a
   small channel retention is what the algorithmic test judges.
2. **Does it mock something you sell, teach or partner on?** Contrast is fine.
   Contempt is commercially self-defeating.

Do not propose thumbnail A/B tests on a small channel. Detecting a small CTR
difference takes months of traffic; anything below a near-doubling is noise.

## Output

Flat files, so each can be checked independently:

| File | Contents |
|---|---|
| `title.txt` | The bare final title |
| `description.md` | The description alone |
| `titles.md` | Scored variants, eight or more rows, score and character count |
| `keywords.md` | The opportunity table |
| `competitors.md` | Who owns the lane, what is breaking out, what nobody has done |
| `chapters.md` | Chapters alone |
| `tool-log.md` | Every tool call made and its result |
| `<slug>-publishing-pack.md` | The assembled pack |
| `<slug>-transcript.md` | The transcript |

## Hard rules

1. Never invent a timestamp. Blank with a reason beats plausible.
2. Never invent a link, handle or URL.
3. Never state a fact absent from the transcript. A title is a factual claim
   and this rule governs it.
4. Always show character counts beside title scores.
5. Always ask for the ranking target before generating titles.
6. Rank keywords by volume divided by competition, never volume alone.
7. Always show what lost, not just what won.
8. Never recommend a title without having looked at who already ranks.
9. Always report subscriber counts beside competitor view counts.

## When things go wrong

| Situation | Do this |
|---|---|
| Transcription fails | Halt. Write `HALTED.md`. No description |
| All seeds return zero volume | Say so; the topic is too new to measure. Fall back to the parent term and flag figures as understated and rising |
| The keyword tool errors | Report it rather than continuing quietly |
| Outliers mostly off-topic | Expected on loose keywords. Report only real competitors and say the search was noisy |
| Lane scan contradicts an existing plan | Say so and date both claims. Competitive facts go stale in weeks |
| Very long video | Cap chapters around ten |
| No single clear topic | Ask which angle to optimise for |
| Non-English | Out of scope. Say so |

## Related

- [vidiq-competitive](../vidiq-competitive/SKILL.md): decide the topic and shape before filming
- [linkedin-post](../linkedin-post/SKILL.md): the announcement post once it is live
- [tone-of-voice](../tone-of-voice/SKILL.md): the voice the description is written in
- [STACK.md](../../STACK.md): the keyword and transcription tools this skill assumes
- [rules/README.md](../../rules/README.md): why blank beats plausible
