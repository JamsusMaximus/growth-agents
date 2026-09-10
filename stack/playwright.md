# Playwright (MCP)

A real browser the agent drives. It navigates, reads the accessibility tree, clicks, fills forms, screenshots, and reads console and network output. The system uses it to look at a page the way a visitor would, and to render a local HTML artefact so the human can see it.

## Who calls it

`skills/seo-audit/SKILL.md` for rendered-page checks; `experiments/ab-test-playbook.md` steps that verify a variant is live; any skill whose output includes a screenshot.

## MCP, API or CLI

Prefer the MCP for one-off looks: snapshot, act, snapshot. Use the library (`playwright` in Node or Python) when the same check runs every week and belongs in CI. The test runner (`@playwright/test`) only with a suite, pinned to the same version as the library.

## Setup

1. Add the Playwright MCP server to Claude Code.
2. Run one `browser_navigate` to a public page and one `browser_snapshot`. The snapshot is text; it is what the agent reads. Screenshots are for the human.
3. Decide up front whether the agent gets a login session. Most checks do not need one.

## How James uses it

Snapshot a page and read the tree instead of guessing from a screenshot. Check the live page after a deploy rather than trusting the diff. Render a local HTML report to PNG for sharing.

## Quirks

- **`file://` URLs are blocked.** `browser_navigate` refuses the file protocol, so a local artefact cannot be opened directly. Serve the folder (`python3 -m http.server 8000`) and navigate to `http://localhost:8000/...`. `[UNVERIFIED]` whether an allowed-origins flag lifts this in every version.
- **Snapshot before you click.** Element references come from the last snapshot; a stale one hits the wrong element.
- **A `secure` cookie is silently dropped on plain `http://` localhost.** Storage state for a local server must set it false.
- **Never send a private URL to a hosted renderer.** A signed invoice or magic link belongs in this local browser.

## Related

- [STACK.md](../STACK.md)
- [Firecrawl](firecrawl.md)
- [SEO audit skill](../skills/seo-audit/SKILL.md)
- [A/B test playbook](../experiments/ab-test-playbook.md)
