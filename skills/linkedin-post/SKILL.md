---
name: linkedin-post
description: >
  Write a LinkedIn post in the operator's own voice, end to end: brief, post
  type, draft, a hard pre-publish gate, a fact-check pass, then learn from the
  human's edits. Use whenever someone asks for "a LinkedIn post", "a caption",
  "a launch post", "turn this into a post", "post about this experiment", or
  "write this up for LinkedIn". Never posts anything; it writes a file.
license: CC-BY-NC-4.0
---

# LinkedIn post

The agent drafts. The human writes the final pass and presses publish. Two
things go wrong without a gate: the draft comes back in a voice that is not the
operator's, and the draft carries a claim about a real person that nobody
checked. This skill exists to stop both before the human sees the draft.

**Two rules that never bend.**

1. **Never hand over a draft as ready to post.** It is a scaffold: angle, hook,
   structure, evidence. Say so when you deliver it.
2. **Never post, schedule or send anything.** The draft goes in a file.

If you're in a team: the person named as author still writes the final pass;
the gate report goes to whoever approves posts.

## 0. Load context first

Read, in this order, before drafting a word:

1. **The voice guide**: the output of the `tone-of-voice` skill in this plugin.
   Its "never" list is binding on every draft.
2. **Reach priors**: these follow Charlie Hills' 2026 LinkedIn algorithm report;
   none of its figures ship here. It is the source for what earns reach on the
   platform this year (hook shape, line structure, list formats, the fold). Use
   it for the levers. Do not paste its numbers into a post or into this file;
   they date, and the report is his.
3. **Who has to be able to act on the post**: the reader profile you keep
   beside the voice guide, if one exists. If none exists, ask.
4. **The artefact the post is about**, if there is one: the experiment file,
   the page, the video, the research. Never draft a post about a result you
   have not read.

Never draft a commercial post from cold. If the thread, the transcript or the
operator's position is missing, ask for it rather than inventing it.

## 1. Brief

Ask three to five questions before drafting. The ones that change the post most:

- **What is the one idea?** One spine per post. A post that hops between three
  thoughts reads as noise.
- **What is the only-you material?** The operator's own number, failure, or
  conversation. Never invent it. If the post needs it and they cannot supply
  it, the draft is incomplete until they do.
- **Is anything being given away?** If yes, the post needs a codeword call to
  action and a provenance block showing what the asset was built from.
- **Who is named?** Every real person or company named gets tagged, and every
  claim about them gets checked (step 5).
- **Which experiment or key result does this serve?** If the answer is none,
  say so; a post with no purpose is still worth writing, but the operator
  should know.

## 2. Pick the post type

The type sets the architecture. Pick one and say which.

| Type | Architecture | Note |
|---|---|---|
| Giveaway or launch | hook, free exercise, early ask, provenance, evidence, numbered list, closing ask | Trust comes from the sources behind the asset |
| Story | scene or cold quote, what happened, the turn, what it cost or taught | The only-you slot is mandatory. End on the cost, not a moral |
| Resource roundup | promise, the list with why each item earns its place, call to action | Rare and effective. Schedule deliberately |
| Ship news | what shipped, what it does, the proof, what is next | Under-used by most operators |
| How-to | literal hook, the method, a generous do-it-yourself block, comment mechanics | The DIY block must work without buying anything |

Worked example: the `pricing-page-headline` experiment measured. That is ship
news or story, not how-to. The proof is the readout; the only-you material is
what the operator expected and got wrong.

## 3. Draft

Follow the voice guide's post architecture for the type you chose. While
drafting:

- One sentence per line, blank line between, including inside quotations.
- Line one is the hook: short, concrete, no hedge, and it lands above the fold
  on a phone.
- Structure the reader can scan: a numbered list where the content is a list,
  markers where the voice guide uses them.
- Precise numbers and named things, or cut the reference. "A big model
  dropped" is not a fact.
- Quotes are verbatim. Trim with an ellipsis; never paraphrase inside quotation
  marks.
- Any prompt a stranger will paste ends with "Change nothing."

## 4. The gate

Render this table with PASS, FAIL or N/A and one line of evidence per row.
**Any FAIL means fix it and re-run before the human sees the draft. Never show
a failing artefact.** Save the table beside the draft as `gate-report.md`.

Rows one to eight are fixed. Rows nine onward are a template: fill them from
the voice guide and the reach priors, in the operator's own terms, and sharpen
them over time (step 7).

| # | Criterion | What passing means | Evidence |
|---|---|---|---|
| 1 | One idea | A single spine start to finish | |
| 2 | Hook test | Above the fold, concrete, no hedge, would stop the target reader | |
| 3 | No AI tells | Passes `humanizer`: no em dashes, tricolons, negative parallelism, performed candour, tidy morals, hype vocabulary | |
| 4 | Voice match | Every line could be the operator's; nothing on the voice guide's never list | |
| 5 | Fact-check pass | Step 5 run; every claim traced or cut | |
| 6 | Only-you slot | Present on a story; consciously declined on a giveaway | |
| 7 | People tagged | Every real person or company named has a profile link | |
| 8 | Paste-clean | No markdown link syntax, no auto-linked filenames, plain text | |
| 9 | Reach lever: structure | [fill from the reach priors: list shape, line breaks, markers] | |
| 10 | Reach lever: opening | [fill from the reach priors: first two lines] | |
| 11 | Generosity | Real value delivered without buying anything | |
| 12 | Comment mechanics | A question or codeword that seeds replies | |
| 13 | British English | Spelling and idiom (swap for your own locale) | |
| 14 | [your row] | [what passing means] | |

A zero-marker, zero-list, hedged draft that reads like a press release fails
rows two, three and nine at once. Fix it silently; do not annotate it.

## 5. The fact-check pass

Its own step, never folded into the gate. A post names real people and real
companies in public under the operator's name. Check every one of these
against a source you can point at:

- **Name and role.** Spelled correctly, role stated accurately.
- **Venue, event, publication.** The actual title and host, not a guess from a
  filename.
- **Durations and dates.** "Last week" and "thirty minutes" are claims.
- **Every number.** From a tool result, a file you read, or something the
  human gave you. Blank beats plausible.
- **Mentions resolved.** An empty tag or a placeholder handle means not ready.

For a public video source, fetch the page and read the title, upload date and
channel from it rather than trusting memory. List what you verified and what
you could not. An unverifiable claim is cut, not softened.

## 6. Deliver

- Write `<yyyy-mm-dd>-<slug>.md` in your posts folder, with the draft first and
  a `## Notes for the final pass` section: what is real, what is verbatim,
  what you chose and why, and the open calls for the human.
- Write `gate-report.md` beside it.
- State the length in words and characters and where the fold falls.
- Hand over as a scaffold.

## 7. Learn from the edits

This is why the skill exists. When the human edits the draft, diff their
version against yours before anything else and write down what changed. Then:

1. Add a dated entry to the voice guide's changelog capturing the principle,
   not just the fix.
2. If the lesson is durable, promote it into the voice guide's LinkedIn
   register section, which is what the next session reads.
3. If a gate row should have caught it, add or sharpen the row in step 4. A
   miss that the gate could not have caught is a new row; a miss the gate
   should have caught is a sharper line of evidence on an existing row.

Every edit sharpens a row. A gate that never changes is a gate nobody learns
from.

## Related

- [tone-of-voice](../tone-of-voice/SKILL.md): where the voice guide comes from
- [humanizer](../humanizer/SKILL.md): the AI-tells pass behind gate row three
- [youtube-package](../youtube-package/SKILL.md): the same gate idea for a video upload
- [experiments/README.md](../../experiments/README.md): the readouts most posts are about
- [principles/README.md](../../principles/README.md): why the agent never sends
