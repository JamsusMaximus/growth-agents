---
name: tone-of-voice
version: 0.2.0
license: CC-BY-NC-4.0
description: |
  Distill a person's or a brand's tone of voice from evidence they actually
  produced, then write it down as a register-scoped guide other agents (or
  humans) load before drafting anything. Two modes: PERSONAL (an individual
  locking down their own voice from posts, transcripts, blogs and edit-diffs)
  and BRAND (a company locking down theirs from website, collateral and
  founder content). Screens the corpus for AI contamination first, quarantines
  unattributed transcripts, counts refusals empirically, states coverage
  honestly, and validates with blind tests + production edits rather than a
  one-shot demo. Use when someone wants their AI assistant to sound like them
  or their brand instead of like ChatGPT. Pairs with /humanizer for final cleanup.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - WebFetch
  - Agent
---

# Tone of voice: distill a real voice from real evidence

You extract how someone actually writes and speaks from things they actually
produced, and write it down as a guide that makes future drafts sound like
them. The output is a single markdown file the user can drop into any project.

The one-sentence philosophy, learned in production: **a voice is defined as
much by refusals as by habits, refusals must be counted rather than vibed,
and every rule is only true in the register it came from.**

## Step 0 - Pick the mode (ask, don't assume)

Ask one question first: *"Is this for YOUR personal voice, or for a brand?"*
The modes differ in corpus, contamination profile, and output.

**PERSONAL mode** - an individual locking down their own tone:
- Best corpus, in value order: their own social posts (a full export if
  possible), hand-written blog/essays, transcripts of them speaking (solo >
  speaker-labelled > unlabelled), and edit-diffs (an AI draft vs what they
  actually sent - the sharpest refusal evidence that exists).
- Contamination risk: their recent output was probably co-written with AI.
- Output: one guide, register-scoped, with the quarry + only-you mechanism
  (Step 4).

**BRAND mode** - a company locking down theirs:
- Best corpus: website (homepage, about, 3-5 blog posts, a product page, a
  pricing/FAQ page), the founder's own posts and talks, a sales or
  onboarding email they're proud of, support replies that sound right.
- Contamination risk: committee-approved and agency copy dilute the voice
  before AI even gets involved; the founder's own writing is usually the
  truest signal - weight it as primary when they say it represents the brand.
- Extra separation to make: VOICE (how it sounds) vs HOUSE STYLE (mechanical
  rules: spellings, capitalisation, banned terms, legal phrases). Brands need
  both, labelled separately, because different people enforce them.
- Multiple authors: if sections of the corpus read differently, say so -
  name the dominant voice and ask whether the brand wants convergence.

In either mode, tell the user extra sources are optional but high-leverage:
ten minutes of pasting beats an hour of crawling.

## Step 1 - The contamination check (before any analysis)

Ask explicitly: *"Which of these sources were written or heavily assisted by
AI? Which did you (or your team) write entirely by hand? Roughly when did AI
start helping with your writing?"* A cut-off date gives you an automatic
purity filter for everything older.

Sort every source into three piles:
- **PURE** (primary evidence): hand-written, or spoken by them. Analyse fully.
- **CONTAMINATED** (differential evidence only): AI-drafted or heavily
  AI-assisted. Never present its patterns as the voice. Its one legitimate
  use: where the human EDITED the AI draft, the edits are gold - what they
  cut is a refusal, what they added is voice.
- **UNKNOWN**: ask; if still unknown, treat as contaminated.

Why this is step 1: a guide built on AI-flavoured sources feeds the person's
AI-voice back to them as "their voice" - the exact failure this skill exists
to prevent.

**Speaker-attribution rule: an unlabelled multi-speaker transcript is
QUARANTINED.** Do not quote it as the subject's voice until it is diarised or
the user confirms who said what - misattributing an interviewer's story to
the subject poisons the guide. Solo recordings and clearly-labelled
transcripts are fine. Say in the guide which sources sit in quarantine.

## Step 2 - Gather the corpus

Fetch web sources with whatever fetch tool you have (a plain curl with a
browser User-Agent gets most pages; fall back to a scraping service only when
you hit a bot challenge, a near-empty body, or 403/429). Keep scrapes out of
git.

Coverage honesty, both directions:
- Record exactly what you analysed and what you did not (file counts, date
  ranges, "10 of ~210 posts"). The finished guide must state this - it
  changes how much a reader should trust each rule. Never silently sample
  and imply you read everything.
- Small corpora: sample for REGISTER DIVERSITY first - one of each kind
  beats five of one kind.
- Large corpora (dozens of transcripts, hundreds of posts): offer the user a
  parallel agent sweep - batch files across subagents that each VALIDATE the
  draft guide (confirm / refute / new pattern, verbatim quotes, only the
  subject's speech) rather than one agent skimming. Merge on convergence:
  a pattern two independent batches both surface is real.

## Step 3 - Analyse: registers, habits, counted refusals

**Register-scope everything.** People have several voices: short-form posts,
long-form essays, emails, spoken/teaching, captions. Tag every finding with
the register it came from, and never test one register's rules against
another register's evidence. Structures that are AI-tells in polished
writing are often native in speech - the tell is the crisp, content-light,
polished FORM, not the underlying structure. If evidence exists for only one
register, say so; don't generalise.

For each register, extract with 2-3 verbatim quotes per claim (quote verbatim and
visibly - `> ` blockquotes preferred, inline quotation marks acceptable):
- Openers and closers; sentence rhythm; paragraph and line-break shape.
- Vocabulary fingerprint: loved words, intensifiers, dialect - and words
  conspicuously ABSENT, stated with counts ("zero instances in 84 posts",
  "two em dashes across the whole corpus"). Counted absences become Never
  rules; vibed absences are just opinions.
- Signature moves and recurring metaphors - and whether each is genuinely
  theirs or borrowed/quoted from someone else.
- Humour type; how they handle uncertainty, selling, emotion, failure.
- From edit-diffs: everything they deleted from an AI draft is a
  high-confidence refusal. Quote the before/after in the guide.

**The tell taxonomy** - hunt these in contaminated sources; ban them in the
guide with register scope (they are the common ways generated text betrays
itself, beyond the classic moreover/delve list):
- Negative parallelism as a sales flourish ("It's not X. It's Y.")
- Rule-of-three rhythm with no content behind it
- Stacked negation fragments ("Not theory. Not slides.")
- Performed candour ("Honestly?" as a hook, vs their real in-sentence adverbs)
- Self-admiring wit and engineered charm (quips built to be liked)
- The tidy moral (personal stories that land a shaped lesson)
- Vague gestures at specificity ("an entire protocol" - name it or cut it)
- Platform tropes ("Let that sink in.", "Read that again.", "I'll wait.")
- Tic-stacking (three signature devices in five lines reads as caricature)

## Step 4 - Write the guide

One markdown file. Structure (adapt to the voice, don't pad):

- **Mode + provenance header**: personal or brand; which sources were pure /
  contaminated / quarantined; exact coverage and date range.
- **Voice in one line** - the tape-to-monitor sentence.
- **Never list first** (refusals do most of the work): each rule with its
  evidence count and its REGISTER SCOPE.
- **Always list** with verbatim evidence per rule.
- **Signature phrases tagged by register** - a blog flourish must not leak
  into caption drafts, nor a spoken filler into essays.
- **Voice by register** - one short section per register, real quotes only.
- **The quarry** (personal mode): their verified lines, metaphors and war
  stories that are safe to import as MATERIAL into any register. Style stays
  register-bound; material crosses freely. This feeds the **only-you slot**:
  drafts for this person should be built around an explicit placeholder for
  a personal specific only they can supply - never invented, incomplete by
  design until they fill it.
- **House style** (brand mode): the mechanical rules, separate from voice.
- **Register confidence tiers**: which registers the guide is draft-quality
  in vs scaffold-only, based on evidence depth. Be honest - it sets how
  drafts get used.
- **Maintenance rule + changelog**: "append to this file every time the user
  edits a draft - capture the principle, not the fix."

Guide-prose rules: write it clean of the tells yourself; no em dashes; every
trait backed by a verbatim quote or a count, or cut it.

## Step 5 - Validate (a loop, not a demo)

1. **Calibration read.** Show the headline line, the Never list and the
   anti-patterns; ask what rings false, what's exaggerated, what's missing.
   Revise before anything else.
2. **Blind test.** Present ~6 short samples: half verbatim from their pure
   corpus, half written by you from the guide. Ask them to spot the fakes.
   For every fake they catch, ask what gave it away and encode THAT as a new
   rule, in their words. Expect to lose early rounds - the guide improves by
   losing informatively. Ceiling caveat: an author always recognises events
   they never wrote about, so after a round or two, move on.
3. **Production loop.** Draft a real deliverable they actually need. They
   edit; every edit becomes a rule via the changelog. The guide has arrived
   when their edits drop to word-level.
4. Update the register confidence tiers after each round, and restate
   coverage if new sources arrived.

## Pairing with /humanizer

Generate with this guide loaded, run /humanizer on the draft, then spot-check
against the guide's Never list. Humanizer strips generic AI fingerprints;
this guide enforces the specific person. Both, always, in that order.

The humanizer skill ships in this plugin (`skills/humanizer/`), so it is
already installed alongside this one. Upstream, if you want it elsewhere:
`https://github.com/blader/humanizer`.

## Related

- [humanizer](../humanizer/SKILL.md): the second half of the pairing above
- [copywriting-hooks](../copywriting-hooks/SKILL.md): hooks are drafted with the guide loaded
- [multi-agent-refine](../multi-agent-refine/SKILL.md): the voice critic in a refine round reads the guide
- [Licences](../../LICENSES.md): licence for this skill
