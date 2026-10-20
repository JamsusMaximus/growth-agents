# Email list (Kit)

## What it is for

The newsletter list, its tags, and the sequences that run when someone signs up. Broadcasts go out from here; one-to-one mail does not (see Resend). The weekly retro reads list growth against the KR; the `linkedin-post` and lead-magnet work end in a tag applied here.

## MCP, API or CLI

Prefer the v4 REST API from scripts. Kit publishes a first-party MCP, but its tool inventory is `[UNVERIFIED]` and the API covers everything a script needs: tags, subscribers, sequences, sequence emails. Forms are UI-only. There is no CLI.

## Setup

1. Create an API key and store it as `KIT_API_KEY`. The header is `X-Kit-Api-Key`.
2. Create your tags in the UI and record each tag id in an env var named for what the tag means, such as `KIT_TAG_LEAD_MAGNET`. The env file holds ids; the meaning lives in a doc.
3. Write one sequence per lead magnet through the API, then read each email back and confirm `published` is true. A draft sends to nobody.
4. Build the unsubscribe blocklist with `status=cancelled`; the `filter[...]` form is silently ignored and returns the whole list.
5. Add a retry with backoff to your API wrapper before the first bulk run.

## How this system uses it

List size and weekly growth feed the retro. A provisioning script creates the tag and sequence for each new lead magnet. An audit script runs before any broadcast that must exclude a segment, and exits non-zero on a leak.

## Quirks

- `/subscribers/{id}/tags` is immediate; `/tags/{id}/subscribers` is served from a lagging index. Verify a fresh tag with the first, never the second.
- Rate limits are tighter than a transactional sender's. A short gap between calls earns a 429 partway through a sweep; back off and retry.
- Sourcing a quoted env file in the shell keeps the quotes in the value, and the auth header fails. Strip them or read the key from a script.
- A POST "does this endpoint exist" probe is a write. It created a real sequence once. Read the OpenAPI spec instead.
- Automations and sequences ignore broadcast exclusion filters. A tag-triggered automation emails everyone with the tag. Never key one to your most widely applied tag.

## Related

- [../STACK.md](../STACK.md)
- [resend.md](resend.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [../skills/linkedin-post/SKILL.md](../skills/linkedin-post/SKILL.md)
- [../rules/README.md](../rules/README.md)
