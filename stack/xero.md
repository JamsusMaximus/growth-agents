# Accounting (Xero)

## What it is for

Invoices and receivables for anything not paid by card. The weekly retro reads overdue and pending invoices from it and recommends who to chase. A paid invoice is what completes invoice-paid purchases, so its webhook is on the revenue path.

## MCP, API or CLI

API only. There is no CLI and the MCP options are thin. Use the OAuth app flow once, store the refresh token server-side, and let production own the token rotation. For anything you would do by hand, use the web app; do not fight production for a token from a laptop.

## Setup

1. Create an app in the developer portal. Note which scopes it holds; a 401 on a read can be a missing scope, not a bad token.
2. Store `XERO_CLIENT_ID`, `XERO_CLIENT_SECRET` and `XERO_REDIRECT_URI`. The redirect URI must match your live domain exactly.
3. Complete the OAuth handshake once and persist the refresh token in your database, not a file.
4. Register the webhook, store `XERO_WEBHOOK_KEY`, and click "Send intent to receive" until the status shows green.
5. Schedule a daily reconciliation that lists paid invoices and compares them with your own records.

## How this system uses it

The Friday retro lists overdue invoices with a chase recommendation. A webhook marks the buyer paid. A monthly reconciliation dry run catches anything the webhook missed.

## Quirks

- Changing the webhook URL puts the subscription into "intent to receive required" and delivery stops silently. Check the portal after any change.
- The daily API quota is per app per tenant and a webhook replay can burn it. When it is gone, every script and the production handler 429 until the window reopens. Do not create a second app to dodge it.
- Refresh tokens are single-use and rotate. Two callers sharing one token break each other.
- An invoice paid a few pence short never reaches paid, so the buyer is never marked paid and nothing alerts. Check the amount due first when someone says they paid.
- The invoice History endpoint is the record of who changed what. Read it before a script "corrects" a value a human set.

## Related

- [../STACK.md](../STACK.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [stripe.md](stripe.md)
- [attio.md](attio.md)
- [../rules/README.md](../rules/README.md)
