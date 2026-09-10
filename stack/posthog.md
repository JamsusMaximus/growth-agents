# PostHog

## What it is for

Product analytics: page views, funnels, conversion rates, and the numbers an experiment readout is typed from. The weekly retro reads funnel numbers from it; the `seo-audit` and `page-cro`-style work reads landing-page conversion from it; every experiment whose `primary_metric` is a rate on your site ends up here.

## MCP, API or CLI

Prefer the MCP for ad-hoc questions and insight lookups. Use the API from scripts that run on a schedule (event syncs, backfills, the monthly revenue read). There is no CLI worth using. A saved insight beats a fresh query every time: save the query once, reference it by id in the retro, and the numbers stay comparable week to week.

## Setup

1. Create a project and note which cloud region it lives in; the API host differs by region.
2. Add the snippet or SDK to the site and confirm a page view arrives.
3. Create a personal API key with the scopes your scripts need and store it as `POSTHOG_PERSONAL_API_KEY`. Store the project id as `POSTHOG_PROJECT_ID`.
4. Set test-account filters (localhost, your own person property) so your own traffic never counts.
5. Save one insight per KR you intend to read, and write its id into the OKR file beside the KR.

## How this system uses it

The weekly retro pulls landing-to-checkout conversion and the lead-magnet funnel from saved insights. Experiment readouts quote the insight, not a one-off query. A backfill script refills purchase events when a webhook was down.

## Quirks

- Never rename an event. History breaks. Add a new event and leave the old one.
- The query endpoint returns 403 to a default Python User-Agent while the identical body via `curl` returns 200. Send a browser-like User-Agent from scripts.
- HogQL has no test-account toggle. Add your internal-user filter to every query yourself.
- Revenue analytics can be configured on the project without any page existing to show it; read revenue through an insight or the managed views.
- A client-side "reached checkout" event undercounts under ad blockers. Read completion from the payment provider, not the browser.

## Related

- [../STACK.md](../STACK.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [../experiments/README.md](../experiments/README.md)
- [stripe.md](stripe.md)
- [supabase.md](supabase.md)
