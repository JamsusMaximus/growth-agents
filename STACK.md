# Stack

Vendor names appear here and in `stack/`, and nowhere else in the repo. Every skill and spine refers to a generic slot ("analytics", "CRM", "email list"). Swap any row for your equivalent and the rest of the system does not notice.

Column key: **MCP** = a Claude Code connector exists; **API** = call it from a script with an env var; **CLI** = a terminal tool. The preferred access path is listed first.

| Tool | What for | MCP / API / CLI | One-line quirk | Page |
|---|---|---|---|---|
| PostHog | Product analytics, funnels, experiment readouts | MCP, API | Never rename an event; the query endpoint rejects a default script User-Agent | [posthog.md](stack/posthog.md) |
| Stripe | Payments, checkout, revenue read-back | API, CLI | Three environments share one SDK; check which key is active before creating anything | [stripe.md](stack/stripe.md) |
| Accounting (Xero) | Invoices, receivables, overdue chasing | API | A webhook goes silent on any URL change with no alert | [xero.md](stack/xero.md) |
| CRM (Attio) | Pipeline, people and company records, notes | MCP, API | Lists can be parented to companies, so a person lookup returns nothing | [attio.md](stack/attio.md) |
| Email list (Kit) | Newsletter, tags, sequences, broadcasts | API, MCP | Two "who has this tag" endpoints disagree for minutes after a write | [kit.md](stack/kit.md) |
| Resend | Transactional and one-to-one email | API, MCP | Always send a plain-text part alongside HTML | [resend.md](stack/resend.md) |
| Supabase | Postgres, customer and event tables | CLI, API | "RLS enabled" says nothing about policies; check both layers | [supabase.md](stack/supabase.md) |
| DataForSEO | Keyword volume and SERP data for the SEO audit | API | Pay per call; cross-check against your search console before acting | [dataforseo.md](stack/dataforseo.md) |
| vidIQ | YouTube keyword, outlier and title-scoring data | MCP | Title scores only mean something with your channel id passed in | [vidiq.md](stack/vidiq.md) |
| Granola | Meeting notes and transcripts | API, MCP | Shell vars do not reach a Python heredoc; export the key first | [granola.md](stack/granola.md) |
| Todoist | Tasks, the standup's source of yesterday's completions | MCP | Rescheduling through a full update destroys recurrence | [todoist.md](stack/todoist.md) |
| Google Calendar | Personal calendar, the standup's capacity check | MCP, CLI | Keep booking-tool slots and personal blocks in separate systems | [google-calendar.md](stack/google-calendar.md) |
| Perplexity Agent API | Fact-checking and research with sources | API | `output_text` does not exist on the wire; walk the `output` array | [perplexity.md](stack/perplexity.md) |
| Mistral Voxtral | Transcription of recordings and calls | API | Extract audio from video first; pass a bias list so product names survive | [mistral-voxtral.md](stack/mistral-voxtral.md) |
| ffmpeg | Audio extraction, frame grabs, clip cuts | CLI | Always specify the output codec; defaults vary by build | [ffmpeg.md](stack/ffmpeg.md) |
| Playwright | Browser automation, rendering gated pages locally | MCP, CLI | Render private URLs locally; never hand them to a hosted scraper | [playwright.md](stack/playwright.md) |
| Firecrawl | Scraping pages that block plain fetches | CLI, API | Costs a credit per page; try a browser User-Agent `curl` first | [firecrawl.md](stack/firecrawl.md) |
| GitHub CLI | PRs, checks, releases | CLI | Confirm a check run's head SHA matches the branch before calling it green | [github-cli.md](stack/github-cli.md) |
| Vercel CLI | Deploys, env vars, logs | CLI | `printf`, never `echo`, into `vercel env add`; sensitive vars pull as `[SENSITIVE]` | [vercel-cli.md](stack/vercel-cli.md) |
| Cloudflare Stream | Hosting paid content: chapters, recordings | API | A new serving host must also be added to your CSP `media-src` | [cloudflare-stream.md](stack/cloudflare-stream.md) |
| Magnific | Image generation and upscaling for thumbnails | MCP | Wait for a creation to finish before chaining it into the next call | [magnific.md](stack/magnific.md) |

Every page follows the same shape: what it is for in this system, which access path to prefer and why, setup in numbered steps (env var names only, never values), how James uses it, quirks, related.

If you're in a team: one person owns each row and its keys. Rotate a key and update the row in the same commit.

## Related

- [README.md](README.md)
- [GLOSSARY.md](GLOSSARY.md)
- [skills/weekly-retro/SKILL.md](skills/weekly-retro/SKILL.md)
- [skills/morning-standup/SKILL.md](skills/morning-standup/SKILL.md)
- [experiments/README.md](experiments/README.md)
