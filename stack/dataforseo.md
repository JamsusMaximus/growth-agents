# DataForSEO

## What it is for

Keyword volume, difficulty and SERP data for the `seo-audit` skill and for deciding whether a page is worth writing. It answers "does anyone search for this" before an experiment on organic traffic goes live. It does not answer "is our page winning"; your search console does.

## MCP, API or CLI

API only, from the audit scripts. It is pay-per-call, so every call sits behind a script that batches keywords and caches the response to disk. No MCP is used here and there is no CLI. `[UNVERIFIED]`: whether a first-party MCP exists at the time you read this.

## Setup

1. Create an account and generate API credentials. Store them as `DATAFORSEO_LOGIN` and `DATAFORSEO_PASSWORD` (the API uses basic auth).
2. Pick one location and language code and hard-code them in the audit script; mixed locales make numbers incomparable.
3. Add a cache directory (gitignored) and write every raw response there with the date in the filename.
4. Run the audit script on one keyword first and read the cost field in the response before running a batch.
5. Record the keyword set you audited in the experiment file so the readout compares like with like.

## How James uses it

The SEO audit reads volume for candidate keywords and ranks pages to write or fix. A retro that considers an organic-traffic bet asks it whether the demand exists first. Keep it where it changes a decision.

## Quirks

- Every call costs money. A loop without a cache is a bill.
- Volume is an estimate. Cross-check against real impressions in your search console before you bet a quarter on it.
- Rate limits and per-call prices are `[UNVERIFIED]` here; read them from the vendor's pricing page on the day, not from a search result.
- A keyword with zero volume in the tool can still convert if it is your product's exact name. Do not kill a branded term on volume alone.

## Related

- [../STACK.md](../STACK.md)
- [../skills/seo-audit/SKILL.md](../skills/seo-audit/SKILL.md)
- [../experiments/README.md](../experiments/README.md)
- [vidiq.md](vidiq.md)
- [posthog.md](posthog.md)
