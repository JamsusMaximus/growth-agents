#!/usr/bin/env bash
# check-links.sh: no orphan pages.
#
# Written after an audit found the one useful map of a knowledge base was
# linked from nowhere, so an agent found it only by accident, and nine
# research notes sat with no index and no inbound link. Search did not
# surface them; only links did.
#
# Walks every markdown file git knows about (tracked or untracked, gitignore
# respected) and fails when a file:
#   1. has no `## Related` section
#   2. has zero inbound links from other markdown files in the repo
#
# LICENSE, LICENSES.md, node_modules/ and vendored upstream references/ folders are excluded.
#
# Usage: bash reference/check-links.sh [repo-root]
#        exit 0 = pass, exit 1 = fail. Offenders are printed.

set -u
cd "${1:-.}"

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "FAIL: not a git repository"
  exit 1
fi

FILES=$(git ls-files --cached --others --exclude-standard -- '*.md' \
        | grep -vE '(^|/)node_modules/' | grep -vE '^skills/(seo-audit|copywriting-hooks|humanizer)/references/' \
        | grep -vE '(^|/)(LICENSE|LICENSES)(\.md)?$' \
        | sort -u)

if [[ -z "$FILES" ]]; then
  echo "FAIL: no markdown files found"
  exit 1
fi

# normalise <path>: collapse ./ and ../ segments without touching the disk.
normalise() {
  local IFS='/' out=() seg
  for seg in $1; do
    case "$seg" in
      ''|'.') ;;
      '..') (( ${#out[@]} )) && unset 'out[${#out[@]}-1]' ;;
      *) out+=("$seg") ;;
    esac
  done
  (IFS='/'; printf '%s' "${out[*]:-}")
}

# Build the inbound-link table: one "target" line per resolved link.
LINKS=$(mktemp)
trap 'rm -f "$LINKS"' EXIT
while IFS= read -r src; do
  dir=$(dirname "$src")
  grep -oE '\]\([^)]+\)' "$src" 2>/dev/null \
    | sed -e 's/^](//' -e 's/)$//' -e 's/[#?].*$//' -e 's/^<//' -e 's/>$//' \
    | grep -E '\.md$' \
    | grep -vE '^[a-z]+://' \
    | while IFS= read -r target; do
        if [[ "$target" == /* ]]; then
          resolved=$(normalise "${target#/}")
        else
          resolved=$(normalise "$dir/$target")
        fi
        [[ "$resolved" != "$src" ]] && printf '%s\n' "$resolved"
      done
done <<<"$FILES" | sort | uniq -c | awk '{print $2 "\t" $1}' > "$LINKS"

FAILED=0
missing_related=0
orphans=0
total=0

while IFS= read -r f; do
  total=$((total + 1))
  if ! grep -qE '^## Related *$' "$f"; then
    echo "  FAIL: $f has no '## Related' section"
    missing_related=$((missing_related + 1))
    FAILED=1
  fi
  inbound=$(awk -F'\t' -v k="$f" '$1==k {print $2}' "$LINKS")
  if [[ -z "$inbound" ]]; then
    echo "  FAIL: $f has no inbound links from any other markdown file"
    orphans=$((orphans + 1))
    FAILED=1
  fi
done <<<"$FILES"

echo ""
echo "  $total markdown file(s) checked: $missing_related without Related, $orphans with no inbound link."

if (( FAILED )); then
  echo "LINK CHECK FAILED. Every page links out (## Related) and is linked in from at least one other page."
  exit 1
fi
echo "  All pages link out and are linked in."
