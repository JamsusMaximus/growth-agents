#!/usr/bin/env bash
# growth-agents session-start hook.
# Prints six lines: mission, quarter, month, week, today, stale experiments.
# If the live files are absent it prints the example files instead, and says so.
# Live files are read from the folder you opened Claude Code in (your project).
# Example files are read from the plugin itself. Never writes. Never sends.
set -u
PLUGIN="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
ROOT="${GROWTH_AGENTS_ROOT:-$(pwd)}"
cd "$ROOT" 2>/dev/null || exit 0
today=$(date +%Y-%m-%d)
ex=0

pick() { # pick <live-glob> <example-file-relative-to-plugin> -> echoes the file to read
  local live; live=$(ls -1 $1 2>/dev/null | grep -v -E 'TEMPLATE|EXAMPLE' | sort | tail -1)
  if [ -n "$live" ]; then echo "$live"; else echo "$PLUGIN/$2"; fi
}
first_line() { # first_line <file> <regex>  -> first matching line, stripped of markdown
  [ -f "$1" ] && grep -m1 -E "$2" "$1" | sed -E 's/^[#>*-]+ *//; s/\*\*//g'
}

mission_f=$(pick "goals/MISSION.md" "goals/EXAMPLE-MISSION.md")
# a MISSION.md still carrying a [placeholder] counts as absent
if [ -f "$mission_f" ] && grep -m1 -E '^mission:' "$mission_f" | grep -q '\['; then mission_f="$PLUGIN/goals/EXAMPLE-MISSION.md"; fi
# MISSION.md ships as a template; an unfilled [placeholder] on its mission line means not set up yet
okr_f=$(pick "goals/okrs/*.md" "goals/okrs/EXAMPLE.md")
month_f=$(pick "retros/monthly/*.md" "retros/monthly/EXAMPLE.md")
week_f=$(pick "retros/weekly/*.md" "retros/weekly/EXAMPLE.md")
day_f=$(pick "retros/standups/*.md" "retros/standups/EXAMPLE.md")
for f in "$mission_f" "$okr_f" "$month_f" "$week_f" "$day_f"; do case "$f" in *EXAMPLE*) ex=1;; esac; done

mission=$(first_line "$mission_f" '^mission:|^# |Mission:' | sed -E 's/^(mission: *|Mission: *)//')
quarter=$(grep -E '^\| *O[0-9]' "$okr_f" 2>/dev/null | head -2 | awk -F'|' '{gsub(/^ +| +$/,"",$2); gsub(/^ +| +$/,"",$3); printf "%s %s · ", $2, $3}' | sed 's/ · $//')
month=$(grep -A8 -iE '^## Intentions' "$month_f" 2>/dev/null | grep -E '^[0-9]+\.|^- ' | head -1 | sed -E 's/^([0-9]+\. |- )//')
week=$(grep -A8 -iE '^## Bets' "$week_f" 2>/dev/null | grep -E '^[0-9]+\.|^- ' | head -2 | sed -E 's/^([0-9]+\. |- )//' | paste -sd '·' - | sed 's/·/ · /g')
todayline=$(grep -m1 -iE '^must_be_true:|^\*\*Must be true' "$day_f" 2>/dev/null | sed -E 's/^must_be_true: *//; s/\*\*Must be true[^:]*: *//; s/\*\*//g')

stale=""
exp_glob="experiments/*.md"; [ -d experiments ] || exp_glob="$PLUGIN/experiments/*.md"
[ -d experiments ] && [ -z "$(ls -1 experiments/*.md 2>/dev/null | grep -v -E 'TEMPLATE|README|EXAMPLE')" ] && exp_glob="$PLUGIN/experiments/*.md"
for f in $exp_glob; do
  [ -f "$f" ] || continue
  case "$f" in *TEMPLATE*|*README*) continue;; esac
  st=$(grep -m1 -E '^status:' "$f" | awk '{print $2}')
  we=$(grep -m1 -E '^window_end:' "$f" | awk '{print $2}')
  [ "$st" = "live" ] || continue
  [ -n "$we" ] || continue
  if [[ "$we" < "$today" ]]; then
    days=$(( ( $(date -j -f %Y-%m-%d "$today" +%s 2>/dev/null || date -d "$today" +%s) - $(date -j -f %Y-%m-%d "$we" +%s 2>/dev/null || date -d "$we" +%s) ) / 86400 ))
    slug=$(basename "$f" .md)
    tag=""; case "$f" in *EXAMPLE*) tag=" (example)";; esac
    stale="${stale}${slug} · ${days} days over${tag}; "
  fi
done
stale=${stale%; }

if [ "$ex" = 1 ]; then
  case "$mission_f" in *EXAMPLE*) echo "Showing example files where you have no live ones yet. Run /growth-setup to start.";;
    *) echo "Showing example lines for retros you have not run yet. Run /standup to start.";; esac
fi
trim() { local s="$1"; if [ ${#s} -gt 100 ]; then printf '%s…' "${s:0:99}"; else printf '%s' "$s"; fi; }
printf 'Mission   %s\n' "$(trim "${mission:-not set}")"
printf 'Quarter   %s\n' "$(trim "${quarter:-not set}")"
printf 'Month     %s\n' "$(trim "${month:-not set}")"
printf 'Week      %s\n' "$(trim "${week:-not set}")"
printf 'Today     %s\n' "$(trim "${todayline:-not set}")"
printf 'Stale     %s\n' "${stale:-none}"
exit 0
