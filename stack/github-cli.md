# GitHub CLI (gh)

Pull requests, issues and CI checks from the terminal. The agent opens the PR, watches the checks and reads review comments; the human merges. It is the one tool here where the agent's output is checked by a machine before a person sees it.

## Who calls it

`skills/multi-agent-refine/SKILL.md` when the artefact is code; `reference/check-links.sh` and `reference/path-scoped-rules/check-rules.sh` run in CI and `gh` is how you read their results; any skill that ships a change, because it lands as a PR, never a direct push.

## MCP, API or CLI

CLI. `gh` handles auth and wraps both APIs. Drop to `gh api` when a command does not expose the field you need.

## Setup

1. Install `gh` and run `gh auth login`.
2. Protect your default branch: require the CI check by its exact name, and require branches to be up to date before merging.
3. One branch per task, ideally in a worktree, so the main checkout stays on main.

## How James uses it

Branch, push, `gh pr create`, wait for green, ask the human to merge. Every review finding reaches one of three end states: fixed with evidence, rejected with a reason, or deferred into a document.

## Quirks

- **`gh pr checks` can report a stale or unrelated run.** Before claiming green, confirm the run's `headSha` equals the branch head (`gh pr view <n> --json headRefOid` against `gh run list --json headSha,conclusion`).
- **An invalid workflow file makes a required check silently absent, not red.** "No failures" is not "passed". Check the required check is present.
- **Auto-merge parks on a BEHIND branch.** Every check green plus `mergeStateStatus: BEHIND` sits forever. `gh pr update-branch` fixes it and creates a new head SHA, so re-verify against that one.
- **Required-check names must match exactly.** The prefixed label in the checks tab is not the context name; a mismatch blocks every PR permanently.
- **AI reviewers often fire only on the first push.** Ask for a re-review explicitly after a fix.

## Related

- [STACK.md](../STACK.md)
- [Vercel CLI](vercel-cli.md)
- [Path-scoped rules](../reference/path-scoped-rules/README.md)
- [Principles](../principles/README.md)
