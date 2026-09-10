---
license: CC-BY-NC-4.0
name: prd
description: |
  Draft a Product Requirements Document (PRD) using a milestone-checkbox
  format: problem, constraints, non-goals, decisions captured, milestones with
  checkboxes, verification, out-of-scope, open questions. Use when the user
  says "PRD this", "let's draft a PRD", "/prd [topic]", "write a PRD for X",
  "scope X as a PRD", or any framing where the deliverable is a planning
  doc that will guide implementation. Does NOT implement; PRD-only. The
  output is always a milestone-chunked, checkbox-driven doc that an
  engineer can tick off as they build.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Glob
  - Grep
  - AskUserQuestion
  - WebSearch
---

# prd

Produce a PRD in a milestone-checkbox format. The PRD's purpose is to capture decisions and break the work into checkable milestones BEFORE any code is written.

## When this triggers

- "PRD this", "let's draft a PRD", "let's scope this as a PRD"
- "/prd <topic>"
- "write a PRD for X"
- Any time the user signals they want a planning doc rather than implementation

If unsure whether the user wants a PRD or wants you to start coding, ask once.

## What the PRD is NOT

- An implementation. Do not write code while drafting.
- A design doc with paragraphs of architecture prose. Decisions go in the table; mechanics go in the milestone checkboxes.
- A free-text wishlist. Every item under a milestone must be a discrete, checkable thing.
- A novel. Aim for ~250-400 lines for a typical scope; ~800+ only if the work spans many deployable PRs.

## House format (use this template)

```markdown
# <Title> PRD

**Status:** Draft, <YYYY-MM-DD>
**Owner:** <name>
**Surface:** <primary file(s) / endpoints / pages affected>

## Problem

<1-3 short paragraphs. State current state, why it's a problem, and the desired outcome. Not a sales pitch - a brief.>

We want to:
1. <outcome 1>
2. <outcome 2>
...

**Success metric** (optional): <one specific, measurable thing that will be true if this build works. From the 5-Whys at the start of scoping. Skip the line entirely if the user couldn't land on one or waved it off - don't pad with a vague metric just to fill the slot.>

## Constraints

What this build has to live within. Two quick gates (below, in Process) decide how much to capture; skip the whole section if the builder has a free hand and the build touches nothing real.

- **Freedom:** <has to fit in | free hand> (and note "prototype - exploring beyond today's setup" if it's a throwaway to rebuild later)
- **Touches:** <the real data / shared systems / real-world actions (send, post, write, pay) involved, or "nothing real">
- **Build on / must not disturb** (when it has to fit in): <what it must use or integrate with, and what it must NOT change, remove or reverse - read-only, no schema changes, vendor/platform choices, decisions made above the builder>
- **Tools it may add** (when it has to fit in): <new tools/models/connections the builder is allowed to add, from the sanctioned set>
- **Data & safety** (when it touches real data or takes real-world actions): <what data it touches, where it must live, compliance, and any real-world action that must be staged for human approval rather than run automatically>
- **Heads-up note** (when buy-in / sign-off is needed): <who'd want a heads-up before this ships or runs, and a literal paste-ready one-paragraph brief the builder can send them to get the nod - actual sentences, not a summary of what they care about>

For a *prototyping* build, tag these "current state - exploring beyond it" and note that productionising later must revisit them. Leave any line out if it genuinely doesn't apply; don't pad.

## Decisions captured (from scoping conversation)

| Question | Decision |
|---|---|
| <decision-shaped question> | <chosen option, with constraint if any> |
| ... | ... |

## Implementation milestones

Milestones are ordered by dependency. State which milestones unblock which.

### M1 - <name>

<one-line purpose. Note dependencies if any.>

- [ ] <discrete checkable item>
- [ ] <discrete checkable item>
- [ ] ...

### M2 - <name>

<one-line purpose>

- [ ] ...

<...>

### M<N> - Verification

Run before merging:

- [ ] <acceptance check 1>
- [ ] <acceptance check 2>
- [ ] Whatever this project's standard pre-merge check is (build / type-check / tests). If the project has no test suite, manual smoke checks are fine.
- [ ] Manual smoke checks specific to the feature

## Out of scope / future additions

One combined list. Each line is either:
- A deliberate "we're not doing this" (with reason - prevents scope creep), OR
- A deferred "future PRD when X" (with trigger - prevents silently dropped work)

Examples:
- Multi-step branching form - *deliberate; one page only for v1*
- A/B testing the question set - *deferred; separate PRD when v1 has 50 submissions*

## Open questions to resolve during implementation

- <question only the implementer can answer in-flight>
- ...

## Pre-mortem flags

Run after the rest of the doc is drafted. Two dimensions:

**Technical risks (will the build itself fail?):**
- <e.g. "email tool rate limit hit if we submit during a campaign send - need to verify in M2">

**Strategic risks (will the build achieve the success metric even if it ships?):**
- <e.g. "Form may not change discovery-call time if buyers ignore the routing and book a call anyway">

For each flag, name the milestone or open question that will catch it.

## Research grounding (include only when the PRD rests on external or recency-sensitive facts)

One line per verified claim, each with a source URL and the date checked. Note the tool used (a search-grounded research API, or web search). Omit this whole section for purely-internal PRDs (copy, data, refactors with no external dependency).

- <claim, verified one-liner> - source: <url>
```

## Process

1. **Confirm the scope.** Before asking anything else, confirm in one sentence what you understood the user wants to PRD. If they used a vague handle ("the upsell thing", "the auth refactor"), restate it concretely. If the ask clearly spans 4+ largely-independent deliverables (or would run past ~800 lines), name the scope risk now and ask whether they want one large roadmap PRD or phased single-module PRDs - don't silently accept an over-scoped framing.
2. **Probe the underlying goal with a real 5-Whys.** Before scoping the build, dig into WHY the user wants it - a genuine 5-Whys, not a single question. "Why do you need this? ... and why does that matter? ... what changes if it works?" - peel a few layers until you reach the real outcome, not the surface ask. If a measurable success metric emerges (e.g. "cut discovery-call qualification time by 50%", "convert 3 more team-tier deals per month"), capture it as the **Success metric** line under Problem; if it's quantitative, also ask whether the baseline is tracked today and how it'll be measured after launch, and if it isn't, add a baseline-capture item to M1 - a metric with no baseline anchor is unmeasurable. If none lands, that's fine - skip the line and note in the pre-mortem that the strategic-risk dimension will be less precise. Don't interrogate to exhaustion, but don't stop at the first answer either.
3. **Read existing context - and if there's little or none, push hard for it.** Skim the files the PRD will touch (the page, the API endpoint, the data file) - a couple of `Read` / `grep` calls to ground the questions. **If the project or folder is empty or near-empty (nothing real to ground on), do NOT proceed on vibes** - a PRD grounded in nothing is a PRD of invented assumptions, and the build that follows inherits every wrong guess. Explicitly ask for context and keep nudging until you have real material: "What can you point me at? Existing docs or notes, examples or screenshots of something similar, user interviews or call transcripts, data exports, links, or the current way this is done by hand." Tell them plainly that more context means a sharper, more grounded PRD and a build that gets it right first time. Only proceed once you have something concrete to work from, or they confirm there genuinely is none. This is a hard gate, not a nicety: if your grounding reads turned up nothing concrete, fire one `AskUserQuestion` for context and do NOT advance to the gates or interview until the user has supplied material or explicitly confirmed there is none - skipping this on a near-empty project is the single most common way this skill produces an invented PRD.
4. **Skim ONE existing PRD as a tone reference** if the project has prior PRDs - look for `*-prd.md` files in `docs/` and read the most recent or most similar in scope. If the project has no prior PRDs, the template above is the reference.
5. **Ground load-bearing or recency-sensitive assumptions with research.** Before drafting milestones, list the facts the solution depends on that you might be wrong or stale about - framework / library behaviour and version-specific APIs, platform limits / pricing / quotas (Vercel, PostHog, Stripe, etc.), third-party tool capabilities, anything that may have changed since your training cutoff. **Verify these rather than assert them** - a PRD that bakes in a wrong platform limit or a deprecated API sends the build agent down a dead end. Tool preference:
   - **Default to Perplexity whenever it's available** - either a Perplexity MCP server (check the available tools for a `perplexity`-style server and use it) or a `PERPLEXITY_API_KEY` in the project `.env` / `.env.local` (use the cheapest search-grounded preset). If both exist, the MCP server is fine. Never run a costly deep-research mode without asking the user first.
   - **Only if Perplexity is not available, fall back to web search** (the `WebSearch` tool), or `curl` with a browser user agent, escalating to a scraper only when a page blocks you.

   Capture each verified claim + its source URL in the **Research grounding** section of the PRD (with the date checked). Any load-bearing claim you could NOT verify becomes a **technical risk flag** in the pre-mortem, tied to the milestone that will confirm it. **Never assert a specific external figure (price, quota, region, limit, regulatory rule) from memory and merely tag it "verify later"** - either verify it now, or write it inline as `[UNVERIFIED - confirm before M<N>]` so it can't be mistaken for a checked fact; a plausible-looking number is worse than a blank. If a load-bearing external claim exists but no Perplexity / web search is available this session, omit the Research grounding section entirely and route every such claim to a pre-mortem technical-risk flag instead - a half-filled grounding section manufactures false confidence. Keep it proportionate: a light pass now sharpens your clarifying questions, and you may do a second pass once the approach is locked. If the PRD rests on no external or recent facts (purely internal copy / data / refactor), note "no external claims to verify" and move on - do not manufacture research.
6. **Surface the constraints - two quick gates, then only what's relevant.** Owners can change anything; employees can't rip out tools or reverse decisions made above them - and a build can touch real data or take real-world actions no matter who owns the tooling. Find this out before drafting milestones, or the build agent will happily propose ripping out a sanctioned tool, connecting an unapproved one, or auto-emailing real people. Keep it light and never let it read as a compliance form - you're arming the builder (to build safely, to win the sign-off), not policing them.

   - **Gate A - how much does this have to fit around what already exists?** "(a) It has to fit in - it must work with tools, data and decisions other people own; you can't rip things out or reverse calls made above you. (b) Free hand - you can build it however you like, with whatever tools you want." Two genuinely different answers, so don't blur them. If they pick **Free hand**, ask one quick follow-up: "Is this a throwaway prototype you'd rebuild properly later, or the real thing?" (A prototype isn't bound by today's setup; capture that setup as context tagged "exploring beyond this" so productionising later knows what to revisit. The real thing with a free hand needs nothing extra here.)
   - **Gate B - reality (ask always, one line):** "Does this touch real or company data, a system other people use, or take a real-world action - send, post, write, pay?"

   Then ask only the relevant subset (`AskUserQuestion`, one short prompt each, never a sub-form):
   - **It has to fit in** → *Stack & boundaries* (what it must build on or integrate with, AND what it must not change, remove or reverse - read-only, no schema changes, decisions made above you), then *Tools it may add* - infer the sanctioned set from the stack answer and have them confirm + flag anything NEW ("you named Airtable and Notion - assume those are fine; just flag anything new you'd connect"), never a blank inventory.
   - **Touches reality (Gate B = yes), either way** → *Data & safety:* what data it touches, where it must live, compliance, and any real-world action that should be staged for the builder's approval rather than run automatically (don't auto-send to real people / don't write to live data unprompted).
   - **Needs buy-in / sign-off, either way** → *Heads-up note* - lead with the help, not the gate: "who'd want a heads-up before this ships or runs, and what do they care about? I'll draft the one-paragraph brief that gets the nod." One nudge, not a roll-call of approvers. The captured output is a literal paste-ready paragraph the builder can send the approver - actual sentences, not a description of what the approver cares about (this is the highest-value part of the note for compliance-gated builds).
   - **Free hand + Gate B = no** → nothing to ask. Note "free hand, touches nothing real - no external constraints" and move on.

   For a build the user flagged as a **prototype** (the Free-hand follow-up): capture today's stack as context tagged "current state - exploring beyond it", keep the *Data & safety* guardrail (a prototype still can't auto-email real customers), re-aim the *Heads-up note* as a pitch assist ("what it does, what going live would take, what you're asking leadership to greenlight"), and skip the "what you can't change" questions - the point is to explore past them. Don't make a prototyper pre-negotiate productionising before they have a demo.

   Capture answers in the **Constraints** section. Milestones must respect any hard constraint; the pre-mortem (step 11) checks none of them assume changing something off-limits, adding an unsanctioned tool, or taking an un-staged real-world action.
7. **Interview thoroughly - this is the heart of the PRD.** A good PRD comes from a real interrogation of the idea, not a couple of quick questions. Keep asking until you genuinely understand the problem, the user, the scope, the shape and the edges. **Aim for 10-20 questions across as many `AskUserQuestion` rounds as the scope needs - more for multi-system or infra builds, fewer for a static page - and do NOT draft the PRD after one or two rounds.** Most questions should be **multiple-choice** (fast for the user; mutually-exclusive options, or `multiSelect` when truly orthogonal); a few should be **open / free-text** where the answer is genuinely bespoke (the core problem, the success picture, anything you can't enumerate). Cover, at minimum: the real problem and desired outcome; who uses it and the job they're doing; the exact scope (what's in vs deliberately out); the inputs and data; integrations and where it lives; the shape / UX / key flows; edge cases and failure handling; for any build pulling from two or more systems, the join / attribution key that links them; and what "done and good" looks like (acceptance). Before you stop, run a silent check: "could I draft every section of the template without inventing an answer?" If any dimension is still guesswork, ask another round. **Then run a second check: is any unknown I'm about to park in Open questions or the pre-mortem actually answerable now - by the user, by reading a file, or by a fact-check?** Open questions are ONLY for things the implementer can resolve in-flight. Anything that splits how milestones are structured (routing strategy, storage pattern, a cross-system join key), is a compliance or financial-reward decision, or determines whether the success metric is even measurable, gets resolved NOW, not deferred - a foundational decision parked in Open questions is a build-agent landmine. Only when the picture is genuinely complete do you move to drafting.
8. **Convert each answered question into a row in the Decisions captured table.** This is the contract: every decision the user made is visible at the top of the doc.
9. **Draft the milestones.** Order them by dependency. State the dependency graph in one line at the top of the milestones section. Within a milestone, every line must be a checkable thing - no narrative prose between checkboxes (a single one-line purpose under the heading is fine).
10. **Write the PRD** to a sensible project path. See "Where to save" below.
11. **Run a pre-mortem.** After the doc is drafted, imagine the build has failed and walk back from that. Surface risks in two dimensions:
   - **Technical:** will the implementation itself fail? (API rate limits, missing context, environment quirks, edge cases the milestones don't cover, an unverified external assumption from step 5)
   - **Strategic:** even if it ships cleanly, will it achieve the Success metric? (wrong user assumption, missing distribution, depends on a behaviour change that won't happen)

   Also run a **constraints check:** does any milestone assume changing something the Constraints section marks off-limits, adding a tool that isn't sanctioned, or taking a real-world action that should be staged for approval? Each is a flag tied to the milestone that would hit it.

   If any pre-mortem flag would *change a milestone's shape* rather than just warn about it, it was caught too late - treat it as a missed interview question: add a Decisions-captured row and fix the affected milestone checkboxes before handing over, don't leave a prose warning that defers a structural call to the build agent.

   Write the flags into the **Pre-mortem flags** section of the PRD. For each flag, point to the milestone or open question that will catch it. Then present the flags back to the user and ask explicitly: "Want to do a revision pass before handing this to a build agent?" If they say yes, loop back to steps 6-7 with the pre-mortem as input.
12. **Update the project's docs index** if one exists. Look for `docs/index.md` (or a similar catalogue file) and add a wiki-link entry under the appropriate section.
13. **End-of-turn summary:** one or two sentences naming the file path and the milestone count. No more.

## Where to save

- Inside a git repo: `<repo>/docs/<area>/<topic>-prd.md`. Pick the area from the closest existing PRD's neighbours, or sensible top-level categories like `growth/`, `product/`, `internal/`, `infra/`. If unsure, ask the user once.
- Outside a repo: a `prds/` folder in your documents (create it if needed). Don't park PRDs in a temp folder - they're durable artefacts.

Filename convention: `kebab-case-prd.md`. Lowercase. The `-prd.md` suffix is load-bearing for greps.

## Things to get right

- **Success metric is default but skippable.** Ask once; if the user has one, capture it. If they don't or wave it off, skip the line and note in pre-mortem that strategic risks will be less precise. Don't pad with a vague metric just to fill the slot, and don't refuse to scope without one.
- **Every milestone item is a discrete check.** "Update the hero" is not a check; "Hero pill copy: 'Now taking orders for autumn'" is.
- **Don't emit invented numbers as decisions.** Any numeric threshold, weight, or parameter that appears verbatim in a milestone must either come from the user or be tagged `(illustrative - confirm in implementation)`. The silent check guards sections; this guards the values inside them.
- **State copy verbatim in the PRD** when copy is part of the deliverable. Don't write "update the hero copy"; write the exact line. The PRD is the source of truth so the implementer doesn't re-decide the wording mid-PR.
- **Include line numbers** when referring to specific spots in existing files (e.g. `path/to/file.ts:142`). A PRD that says "the CTA block" without coordinates costs an extra grep at implementation time.
- **The decisions table is non-negotiable.** Every clarification you asked must appear there. If a decision was implied (not asked), still capture it in the table so the implementer can challenge it later.
- **Constraints are load-bearing for non-owners.** When the builder doesn't own the surrounding systems, the Constraints section is what stops the build agent proposing to rip out a sanctioned tool, connect an unapproved one, or auto-run a real-world action. Two gates (freedom + reality) decide how much to ask - for a free hand over something that touches nothing real, ask nothing. Keep the tone "I'm arming you", never "I'm auditing you": the heads-up note is a brief the agent drafts *for* the builder to win sign-off, not a gate. The reality gate (Gate B) is the one that catches the dangerous case - a free hand or a prototype can still be piping regulated data through an LLM or auto-emailing real people.
- **Milestones over PRs.** Default to milestones (M1, M2, ...). Only switch to PR-numbered sections (PR 1, PR 2a, ...) when the work clearly spans multiple deployable shipments and the user has confirmed that intent.
- **The verification milestone is mandatory.** Even small PRDs end with an M<N> that is the merge gate. Pulls together whatever this project's standard pre-merge check is plus feature-specific manual smoke.
- **Out of scope / future additions is one combined list.** Each line is either deliberate ("we're not doing this") or deferred ("future PRD when X"). Label which. Never split into two sections - participants confuse them and end up with overlap.
- **Pre-mortem must hit both dimensions.** Technical risks (will it ship?) and strategic risks (will it hit the metric even if it ships?). A pre-mortem that only flags technical risks is a half-pre-mortem. Each flag must point to a milestone or open question that catches it.
- **Verify external/recent facts, don't assert them.** Any claim the build rests on that depends on a framework version, platform limit, pricing, quota, or third-party API capability gets fact-checked in step 5 (Perplexity if available, else web search) and recorded in Research grounding with a source. Stale model knowledge baked into a PRD as fact is how a build agent ends up implementing against a limit or API that no longer exists. What you can't verify becomes a pre-mortem technical-risk flag.

## Things to avoid

- Do NOT write the implementation while drafting. Resist any urge to also `Edit` the page during the PRD step. The user will say "ok let's build" as a separate signal.
- Do NOT pad the doc with rationale for every decision; the table captures it. Rationale belongs in PR descriptions and decision logs.
- Do NOT merge milestones to look smaller. M1 + M2 collapsed into "M1: do everything" defeats the point - the dependency graph and per-PR sizing are the value.
- Do NOT add testing checkboxes inside every feature milestone *and* a verification milestone - duplicates the work. Feature milestones reference unit tests they need; the verification milestone runs the full project suite once.

## Reference

The template in "House format" above is the structural reference. If this project has prior PRDs in `docs/`, skim one as a tone reference (step 4 of Process).

## Related

- [../multi-agent-refine/SKILL.md](../multi-agent-refine/SKILL.md) - pressure-test the PRD before anyone builds from it
- [../../experiments/TEMPLATE.md](../../experiments/TEMPLATE.md) - the experiment file a growth PRD usually ends by staging
- [../../principles/can-this-experiment-conclude.md](../../principles/can-this-experiment-conclude.md) - the power check every test PRD runs
- [../../ROSTER.md](../../ROSTER.md) - where this hire sits
