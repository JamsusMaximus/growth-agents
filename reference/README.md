# Reference

Three small pieces that keep the rest of the repo honest. None of them send anything or write outside the repo.

| File | What it does |
|---|---|
| [self-improvement-prompt.md](self-improvement-prompt.md) | A weekly prompt that audits the workspace and proposes at most two changes per section, applied only on an explicit yes. |
| [path-scoped-rules/](path-scoped-rules/README.md) | How to keep a rule out of always-on context, and a check that fails when the rule has silently stopped loading. |
| [check-links.sh](check-links.sh) | Fails the build when any markdown file lacks a `## Related` section or has no inbound link. |

Run both scripts from the repo root:

```bash
bash reference/check-links.sh
bash reference/path-scoped-rules/check-rules.sh
```

## Related

- [self-improvement-prompt.md](self-improvement-prompt.md): the weekly audit
- [path-scoped-rules/README.md](path-scoped-rules/README.md): rules that load on demand
- [../CLAUDE.md](../CLAUDE.md): the always-on context these keep small
- [../CONTRIBUTING.md](../CONTRIBUTING.md): the Related-list rule these scripts enforce
