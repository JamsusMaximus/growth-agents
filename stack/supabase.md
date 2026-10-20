# Supabase

## What it is for

Postgres for the things the business must remember: customers, purchases, lead-magnet signups, lesson progress. It is the read-back of truth after a webhook fires; if the payment provider says paid and the row is missing, the row is the bug. The weekly retro reads signup and completion counts from it.

## MCP, API or CLI

Prefer the CLI for schema (link, migrate, push) and the JS client from scripts with the service-role key. The MCP is `[UNVERIFIED]` for this system. Every real caller uses the service-role client, which bypasses row-level security entirely, so the public key never needs a policy that says yes.

## Setup

1. Create the project and link it locally with the CLI.
2. Store `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (server only) and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (shipped to browsers; assume it is public).
3. Turn RLS on for every table and add no permissive policies. Confirm with `pg_policies`, not the dashboard advisor.
4. Keep every schema change as a committed migration in the same PR that needs it. Never apply SQL to production by hand.
5. Export the database password into the shell before `db push`; it does not read your env file.

## How this system uses it

The purchase webhook writes the customer row, and that row is what "did they buy" means. Purchase rows and completion counts feed the retro.

## Quirks

- "RLS enabled" means nothing about policies. A table can pass the advisor and be world-readable and writable through the public key. Check policies and grants too.
- Tables created in the dashboard have no repo definition. Audit from the database, not from the migrations folder.
- `db push` reads the checked-out branch's migration files. Run it from a checkout of main, or it reports "up to date" with your migration unapplied.
- Upsert with `onConflict` on a column cannot match an expression index; every insert fails, and a soft warning wrapper hides it.
- An `.or()` filter on an update or delete can fail with a "column does not exist" error on real columns. Use single-predicate filters on mutations.

## Related

- [../STACK.md](../STACK.md)
- [stripe.md](stripe.md)
- [posthog.md](posthog.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [../rules/README.md](../rules/README.md)
