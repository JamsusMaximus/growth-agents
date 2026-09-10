# Resend

## What it is for

Transactional and one-to-one email: receipts, magic links, and the personal nudges a script sends on a human's say-so. Broadcasts to the list stay in the email-list tool. In this system the agent has no send capability. It drafts; a human runs the send script. Email is the line.

## MCP, API or CLI

Prefer the API from a script with a dry-run default. The MCP exists and is fine for reading logs and metrics; do not give an agent a connector that can send. There is no CLI.

## Setup

1. Add and verify your sending domain: SPF including the vendor, DKIM published, DMARC at quarantine or stricter.
2. Create an API key and store it as `RESEND_API_KEY`.
3. Write one send helper that throws on failure and is awaited before any HTTP response returns. A fire-and-forget promise is dropped when the serverless function ends.
4. Give every send script `--execute`; without it, print recipients and stop.
5. Pace multi-recipient runs over minutes, not seconds.

## How James uses it

Transactional mail (receipts, magic links) goes through one helper in the app. Marketing nudges go through a script that spreads sends over time and writes a note on each CRM record in the same loop. Scheduled sends replaced a queue table for a delayed follow-up.

## Quirks

- Every send carries a hand-written plain-text part alongside the HTML. HTML alone is single-part, which hurts deliverability and pushes personal mail toward the promotions tab.
- The rate limit is low (a couple of requests per second). Sleep between sends.
- Call it with `curl` or a real HTTP client from scripts; a default Python `urllib` User-Agent is blocked at the edge and the failure looks like bad auth.
- Personal mail drops UTM parameters. Campaign tags read as bulk.
- Link scanners in corporate mail clients produce phantom clicks on tracked links. Count leads and conversions, not visits.
- Before adding a table or a cron for a delayed email, check whether a scheduled send does it.

## Related

- [../STACK.md](../STACK.md)
- [kit.md](kit.md)
- [attio.md](attio.md)
- [../principles/README.md](../principles/README.md)
- [../CLAUDE.md](../CLAUDE.md)
