# Path-scoped rules

A rule that always loads costs context on every session, even the ones it has nothing to say about. A path-scoped rule loads only when the agent touches a file that matches it.

The mechanism is a markdown file in `.claude/rules/` with a `globs:` list in its YAML frontmatter:

```yaml
---
globs:
  - "experiments/*.md"
---
```

Everything below the frontmatter is the rule. It is read when a matching file is edited and ignored otherwise, so `CLAUDE.md` stays short and the rule stays sharp.

## The failure mode

A path-scoped rule fails silently. Rename the folder it matches and the rule keeps sitting there, loading for nothing, and nobody notices because nothing errors. The same is true when the rule cites a path that has moved, or when it is never linked from `CLAUDE.md` so no human ever rereads it.

`check-rules.sh` catches all four. It fails when a rule file:

| Check | Why it matters |
|---|---|
| has no frontmatter or no `globs:` key | it will load for every file, or never |
| has a glob matching zero tracked files | the rule never loads and nothing says so |
| cites a backticked repo path that does not exist | the instruction points at a ghost |
| is not named in `CLAUDE.md` | an unlinked rule rots unseen |

## Running it

Locally, from the repo root:

```bash
bash reference/path-scoped-rules/check-rules.sh
```

In CI, add a step that runs the same line. It exits 1 with the offending file and reason on failure, 0 otherwise. It needs bash, git and the usual coreutils; no Python, no Node.

Start from `example-rule.md`: copy it into `.claude/rules/`, adjust the glob, link it from `CLAUDE.md`, run the check.

If you're in a team: run the check in CI on every pull request, so a folder rename cannot silently switch a rule off.

## Related

- [example-rule.md](example-rule.md): a rule file to copy
- [check-rules.sh](check-rules.sh): the check itself
- [../README.md](../README.md): the other reference scripts
- [../../CLAUDE.md](../../CLAUDE.md): where every rule file must be linked from
