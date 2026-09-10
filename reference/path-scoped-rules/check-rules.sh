#!/usr/bin/env bash
# check-rules.sh: path-scoped rules in .claude/rules/ must actually load and
# must point at files that exist.
#
# Written after two of four rule files were found actively wrong on the same
# day: one instructed the inverse of the repo's own rule, another had silently
# stopped loading after a path change. Nothing had checked either condition.
#
# Fails when a rule file:
#   1. has no YAML frontmatter, or the frontmatter has no `globs:` key
#   2. has a glob that matches zero tracked files (a rule that never loads)
#   3. cites a repo path in backticks that does not exist
#   4. is not linked from CLAUDE.md
#
# Usage: bash reference/path-scoped-rules/check-rules.sh [repo-root]
#        exit 0 = pass, exit 1 = fail
# Needs bash 3.2+, git, grep, sed, awk. No Python, no Node.

set -euo pipefail
cd "${1:-.}"

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "FAIL: not a git repository (the check reads git ls-files)"
  exit 1
fi

FAILED=0
fail() { echo "  FAIL: $1"; FAILED=1; }

echo "Path-scoped rules check..."

shopt -s nullglob
RULES=(.claude/rules/*.md)
if (( ${#RULES[@]} == 0 )); then
  echo "  FAIL: .claude/rules/ has no rule files"
  exit 1
fi

TRACKED=$(mktemp)
trap 'rm -f "$TRACKED"' EXIT
git ls-files > "$TRACKED"

# glob_to_regex: turn a gitignore-style glob into an extended regex.
#   **/  -> (.*/)?    any number of directories, including none
#   **   -> .*
#   *    -> [^/]*
#   ?    -> .
# Other regex metacharacters are escaped first. A leading "./" is dropped.
glob_to_regex() {
  local g="${1#./}"
  g=$(printf '%s' "$g" | sed -e 's/[.+^$(){}|[\]\\]/\\&/g')
  g=${g//\*\*\//@@DIRS@@}
  g=${g//\*\*/@@ANY@@}
  g=${g//\*/[^\/]*}
  g=${g//\?/.}
  g=${g//@@DIRS@@/(.*\/)?}
  g=${g//@@ANY@@/.*}
  printf '^%s$' "$g"
}

count_matches() {
  grep -cE "$(glob_to_regex "$1")" "$TRACKED" || true
}

for rule in "${RULES[@]}"; do
  base=$(basename "$rule")

  # 1. frontmatter with a globs: key
  if [[ "$(head -1 "$rule")" != "---" ]]; then
    fail "$base has no YAML frontmatter, so it will never path-scope"
    continue
  fi
  FM=$(awk 'NR>1 && /^---$/{exit} NR>1' "$rule")
  if ! grep -qE '^(globs|paths):' <<<"$FM"; then
    fail "$base frontmatter has no 'globs:' key"
    continue
  fi

  # 2. every glob matches at least one tracked file
  GLOBS=()
  while IFS= read -r g; do
    [[ -n "$g" ]] && GLOBS+=("$g")
  done < <(sed -nE '/^(globs|paths):/,/^[a-z]/p' <<<"$FM" \
             | grep -oE '"[^"]+"|'"'"'[^'"'"']+'"'"'|^ *- *[^"'"'"' ]+' \
             | sed -e 's/^ *- *//' | tr -d "\"'")
  if (( ${#GLOBS[@]} == 0 )); then
    fail "$base declares globs: but lists none"
    continue
  fi
  for glob in "${GLOBS[@]}"; do
    n=$(count_matches "$glob")
    if (( n == 0 )); then
      fail "$base glob '$glob' matches zero tracked files, so this rule never loads for it"
    fi
  done

  # 3. every repo path cited in backticks exists
  while IFS= read -r ref; do
    [[ -e "$ref" ]] || fail "$base cites '$ref' which does not exist"
  done < <(sed -e 's/<!--.*-->//g' "$rule" \
             | grep -oE '`[a-zA-Z0-9_./-]+/[a-zA-Z0-9_./-]+\.[a-z]+`' \
             | tr -d '`' | grep -v '[*?]' | sort -u)

  # 4. linked from CLAUDE.md
  if [[ ! -f CLAUDE.md ]]; then
    fail "CLAUDE.md is missing, so $base cannot be linked from it"
  elif ! grep -qF "$base" CLAUDE.md; then
    fail "CLAUDE.md never names $base; an unlinked rule rots unseen"
  fi
done

if (( FAILED )); then
  echo ""
  echo "PATH-SCOPED RULES CHECK FAILED. Fix the lines above."
  exit 1
fi

echo "  ${#RULES[@]} rule file(s): frontmatter present, globs match tracked files, cited paths exist, all linked from CLAUDE.md."
