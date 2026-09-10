# Stripe

## What it is for

Payments and the truth about what was bought. The weekly retro reads month-to-date revenue from it. Experiments with a checkout-rate metric read completion from Stripe's session list rather than from a browser event. The CRM and the email list are updated from its webhook.

## MCP, API or CLI

Prefer the API from scripts for anything that has to be right: revenue read-back, session listing, webhook handling. The CLI is for local webhook forwarding and quick inspection. Do not use either for verifying a live purchase from a laptop unless you are certain which account the local key points at (see quirks).

## Setup

1. Create the account, then note that you have three environments: live, test mode on the main account, and a sandbox with a different account id.
2. Store the secret key as `STRIPE_SECRET_KEY`. Keep the live key only in your host's production env, never in a local file.
3. Register the webhook endpoint with the exact path your framework serves, trailing slash included if your config adds one.
4. Store the signing secret as `STRIPE_WEBHOOK_SECRET`.
5. Log in to the CLI with `stripe login --api-key` for the environment you mean, and check `stripe config --list` before creating any object.

## How James uses it

Month-to-date revenue and purchases-per-month feed the weekly and monthly retros. Checkout metadata stamps the marketing context at purchase time so attribution survives. The purchase webhook writes the customer row and moves the CRM deal.

## Quirks

- Before creating a coupon, product or price, print the first characters of the active key. Objects land in whichever environment the key points at.
- Local reads with a test key return Stripe's test personas and look clean. A "no purchase" or "first purchase" call from a local read is worthless.
- `curl -d` sends the body raw. A `%` in a coupon name breaks the request with a generic error. Use `--data-urlencode`.
- Some endpoints reject or silently drop parameters depending on the account's pinned API version. Read the object back after creating it.
- On serverless hosts the SDK's default Node HTTP client can fail; use the fetch client.
- A webhook URL that redirects loses its POST body. Register the final URL.

## Related

- [../STACK.md](../STACK.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [xero.md](xero.md)
- [attio.md](attio.md)
- [posthog.md](posthog.md)
