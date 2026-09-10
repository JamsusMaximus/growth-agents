# Vercel CLI

Deploys, environment variables and logs for the site that hosts your experiments. The agent uses it to confirm a variant is actually live and to read production configuration without opening a dashboard.

## Who calls it

`experiments/ab-test-playbook.md` when a variant ships as a deploy; `skills/seo-audit/SKILL.md` to check a preview; the weekly retro indirectly, because "is the experiment live" means "did the deploy succeed".

## MCP, API or CLI

CLI for anything that writes: deploys, `env pull`, `env add`. The MCP server or the dashboard for logs. The REST API only for a custom integration.

## Setup

1. Install the CLI, `vercel login`, then `vercel link` in the project.
2. `vercel env pull --environment=production` into a gitignored file.
3. Confirm CI deploys a preview on every PR and production only from the default branch.

## How James uses it

Preview per PR, production from main. Variables are set with `printf`, never `echo`. Logs are read in the dashboard because the CLI stream is unreliable.

## Quirks

- **`echo "value" | vercel env add` stores a trailing newline** in the value. Downstream APIs then reject the key with an error that looks like a typo. Use `printf "value" | vercel env add NAME production`.
- **A pulled env file is a snapshot.** Stale, it reads exactly like a live breakage. Re-pull before concluding anything from it.
- **`vercel logs` frequently hangs.** Use the dashboard or the MCP.
- **Serverless is not local.** An SDK that works in dev can fail on a preview deploy. Test on a preview.
- **If your framework adds a trailing slash to routes**, every externally registered URL (webhooks, cron paths) needs it too. Without it the request redirects, the body is lost and the handler never runs.

## Related

- [STACK.md](../STACK.md)
- [GitHub CLI](github-cli.md)
- [A/B test playbook](../experiments/ab-test-playbook.md)
- [Cloudflare Stream](cloudflare-stream.md)
