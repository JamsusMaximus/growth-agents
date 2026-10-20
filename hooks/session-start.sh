#!/usr/bin/env bash
# growth-agents session-start hook.
# Prints six lines: mission, quarter, month, week, today, stale experiments.
#
# Usage, any agent:  cd <your growth folder> && bash <path-to>/growth-agents/hooks/session-start.sh
# Claude Code runs it for you at the start of every session (hooks/hooks.json).
#
# Where your live files are read from, first match wins:
#   1. $GROWTH_AGENTS_ROOT
#   2. the path on the first line of a `.growth-agents` file in the folder you opened (written by /growth-setup)
#   3. the folder you opened, then its growth/ subfolder, whichever holds goals/MISSION.md
# In a team, set GROWTH_AGENTS_USER=<your name> so Today shows your own standup.
# Example files are read from the plugin itself, and only ever shown when you have no live mission yet,
# every line tagged (example). Once you have a live mission, a level with no live file reads "not set".
# Never writes. Never sends.
set -u
PLUGIN="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
START=$(pwd)

ROOT=""
if [ -n "${GROWTH_AGENTS_ROOT:-}" ]; then ROOT="$GROWTH_AGENTS_ROOT"
elif [ -f .growth-agents ]; then
  p=$(grep -v -E '^ *(#|$)' .growth-agents | head -1 | sed -E 's/^ +| +$//g')
  [ -n "$p" ] && ROOT="$p"
fi
if [ -z "$ROOT" ]; then
  ROOT="$START"
  for c in "$START" "$START/growth"; do
    if [ -f "$c/goals/MISSION.md" ] && [ "$(cd "$c" && pwd)" != "$PLUGIN" ]; then ROOT="$c"; break; fi
  done
fi
cd "$ROOT" 2>/dev/null || { echo "growth-agents: cannot open $ROOT (check .growth-agents or GROWTH_AGENTS_ROOT)"; exit 0; }
here=$(pwd)
today=$(date +%Y-%m-%d)

is_doc() { case "$1" in *TEMPLATE*|*EXAMPLE*|*README*) return 0;; esac; return 1; }
latest() { # latest <glob> -> newest live file, documentation excluded
  ls -1 $1 2>/dev/null | while read -r f; do is_doc "$f" || echo "$f"; done | sort | tail -1
}
unset_if_placeholder() { case "$1" in *\[*\]*) echo "";; *) echo "$1";; esac; }
to_epoch() { date -j -f %Y-%m-%d "$1" +%s 2>/dev/null || date -d "$1" +%s 2>/dev/null; }

# --- mission decides example mode -------------------------------------------------------
# A live mission is goals/MISSION.md in your folder, not the plugin's own copy, with a filled mission line.
mission=""
if [ "$here" != "$PLUGIN" ] && [ -f goals/MISSION.md ]; then
  mission=$(grep -m1 -E '^mission:' goals/MISSION.md | sed -E 's/^mission: *//')
  mission=$(unset_if_placeholder "$mission")
  have_live=1
else
  have_live=0
fi

if [ "$have_live" = 0 ]; then
  # First run: show the whole example so you can see the shape, every line labelled.
  E="$PLUGIN"
  mission=$(grep -m1 -E '^mission:' "$E/goals/EXAMPLE-MISSION.md" | sed -E 's/^mission: *//')
  okr_f="$E/goals/okrs/EXAMPLE.md"; month_f="$E/retros/monthly/EXAMPLE.md"
  week_f="$E/retros/weekly/EXAMPLE.md"; day_f="$E/retros/standups/EXAMPLE.md"
  tag=" (example)"
else
  okr_f=$(latest "goals/okrs/*.md"); month_f=$(latest "retros/monthly/*.md")
  week_f=$(latest "retros/weekly/*.md"); day_f=$(latest "retros/standups/*.md")
  # in a team, GROWTH_AGENTS_USER=<name> shows your own latest standup rather than whoever wrote last
  if [ -n "${GROWTH_AGENTS_USER:-}" ]; then u=$(latest "retros/standups/*-${GROWTH_AGENTS_USER}.md"); [ -n "$u" ] && day_f="$u"; fi
  tag=""
fi

quarter=""; [ -n "$okr_f" ] && quarter=$(grep -E '^\| *O[0-9]' "$okr_f" 2>/dev/null | head -2 | awk -F'|' '{gsub(/^ +| +$/,"",$2); gsub(/^ +| +$/,"",$3); printf "%s %s · ", $2, $3}' | sed 's/ · $//')
section() { # section <file> <heading-regex> -> list items under that heading only, up to the next heading
  awk -v h="$2" 'BEGIN{IGNORECASE=1} $0 ~ "^## " { on = (tolower($0) ~ tolower(h)); next } on && /^([0-9]+\. |- )/' "$1" 2>/dev/null | sed -E 's/^([0-9]+\. |- )//'
}
month="";   [ -n "$month_f" ] && month=$(section "$month_f" '^## intentions' | head -1)
week="";    [ -n "$week_f" ] && week=$(section "$week_f" '^## bets' | head -2 | paste -sd '·' - | sed 's/·/ · /g')
todayline=""; [ -n "$day_f" ] && todayline=$(grep -m1 -iE '^must_be_true:|^\*\*Must be true' "$day_f" 2>/dev/null | sed -E 's/^must_be_true: *//; s/\*\*Must be true[^:]*: *//; s/\*\*//g')
if [ "$have_live" = 1 ]; then
  quarter=$(unset_if_placeholder "$quarter"); month=$(unset_if_placeholder "$month")
  week=$(unset_if_placeholder "$week"); todayline=$(unset_if_placeholder "$todayline")
  # a standup from an earlier day is shown with its date, so it never passes for today's
  # team mode names standups YYYY-MM-DD-<name>.md: show whose it is
  b=$(basename "${day_f:-}" .md); d=${b:0:10}; who=${b:11}
  if [ -n "$todayline" ]; then
    lbl=""; [ "$d" != "$today" ] && lbl="from $d"
    [ -n "$who" ] && lbl="${lbl:+$lbl, }$who"
    [ -n "$lbl" ] && todayline="($lbl) $todayline"
  fi
fi

# --- stale experiments ------------------------------------------------------------------
# Your experiments/ plus one level down (e.g. clients/<name>/experiments/), labelled by that folder.
stale=""
if [ "$have_live" = 0 ]; then files=$(ls -1 "$PLUGIN"/experiments/*.md 2>/dev/null)
else files=$(ls -1 experiments/*.md */experiments/*.md */*/experiments/*.md 2>/dev/null); fi
for f in $files; do
  [ -f "$f" ] || continue
  case "$f" in *TEMPLATE*|*README*) continue;; esac
  if [ "$have_live" = 1 ]; then is_doc "$f" && continue; fi
  st=$(grep -m1 -E '^status:' "$f" | awk '{print $2}')
  [ "$st" = "live" ] || continue
  we=$(grep -m1 -E '^window_end:' "$f" | awk '{print $2}')
  slug=$(basename "$f" .md)
  owner=$(dirname "$f"); owner=${owner%/experiments}; case "$owner" in experiments|*/experiments|"$PLUGIN"*) owner="";; esac
  [ -n "$owner" ] && slug="$owner/$slug"
  who=$(grep -m1 -E '^owner:' "$f" | sed -E 's/^owner: *//'); who=$(unset_if_placeholder "$who")
  [ -n "$who" ] && slug="$slug ($who)"
  if [ -z "$we" ] || [ "${we#[}" != "$we" ]; then
    stale="${stale}${slug} · live with no window_end${tag}; "; continue
  fi
  if ! echo "$we" | grep -qE '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' || [ -z "$(to_epoch "$we")" ]; then
    stale="${stale}${slug} · window_end \"$we\" unreadable, use YYYY-MM-DD${tag}; "; continue
  fi
  if [[ "$we" < "$today" ]]; then
    days=$(( ( $(to_epoch "$today") - $(to_epoch "$we") ) / 86400 ))
    unit=days; [ "$days" = 1 ] && unit=day
    stale="${stale}${slug} · ${days} ${unit} over${tag}; "
  fi
done
stale=${stale%; }

# --- print ------------------------------------------------------------------------------
if [ "$have_live" = 0 ]; then
  echo "No goals/MISSION.md here yet, so these are the plugin's example files. Run /growth-setup to write yours."
fi
trim() { local s="$1"; if [ ${#s} -gt 100 ]; then printf '%s…' "${s:0:99}"; else printf '%s' "$s"; fi; }
line() { local v="$2"; if [ -n "$v" ]; then printf '%-9s %s%s\n' "$1" "$(trim "$v")" "$tag"; else printf '%-9s not set\n' "$1"; fi; }
line Mission "$mission"
line Quarter "$quarter"
line Month "$month"
line Week "$week"
line Today "$todayline"
printf '%-9s %s\n' Stale "${stale:-none}"
exit 0
