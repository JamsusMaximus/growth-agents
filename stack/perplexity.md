# Perplexity Agent API

The research tool. When a skill needs a fact from the web, it asks Perplexity and cites the sources. Perplexity is for landscape, reasoning and finding sources. It is never the last word on a number.

## Who calls it

`skills/vidiq-competitive/SKILL.md`, `skills/youtube-package/SKILL.md` and `skills/seo-audit/SKILL.md` for research; the retros only when a bet turns on an external fact.

## MCP, API or CLI

The Agent API over plain `curl`. No official CLI. The old chat-completions endpoint is retired; never write a new call against it. Presets, cheapest first: `fast`, `low`, `medium`, `high`, `xhigh`. Use `low` for fact-checks. Never run `high` or above without the human saying yes in the session.

## Setup

1. Store your key as `PERPLEXITY_API_KEY` in your env file.
2. `POST https://api.perplexity.ai/v1/agent` with a JSON body of `preset` and `input`.
3. Parse the response as described below. Test once with a question you already know the answer to.

## How James uses it

A `low` call replaces a web search in most skills. Source URLs go into the output every time. Anything about a version, price or limit is settled afterwards against the vendor's own page or a package registry.

## Quirks

- **No `output_text` on the wire.** That field exists only on the SDK object. Over HTTP you get an `output` array: find the item with `type: "message"` and read `content[].text`. Reading `output_text` returns nothing, silently, on a 200.
- **Sources moved.** No top-level `citations`. URLs live in the `search_results` output items: `output[] | select(.type=="search_results") | .results[].url`.
- **Search is not always on.** A bare `model` with no `tools` answers ungrounded, and even a preset decides per request. If grounding matters, say "always search the web before answering" in `instructions` and check sources came back.
- **Inline markers** (`[1]`, `[web:1]`) appear in the text. Strip them before it goes in a document.
- **It goes stale on versions, limits and prices.** Ranking favours well-linked older pages. Put today's date in the query, ask for each source's date, and settle the number against the registry or primary doc.

## Related

- [STACK.md](../STACK.md)
- [Firecrawl](firecrawl.md)
- [vidIQ competitive skill](../skills/vidiq-competitive/SKILL.md)
- [Principles](../principles/README.md)
