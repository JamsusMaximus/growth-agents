# Granola

## What it is for

Meeting notes and transcripts. The morning standup reads yesterday's meetings for commitments made out loud; the weekly retro reads the week's calls for commitments and repeated themes. A transcript is the only evidence label that beats memory: a dated file exists, so the line is `observed`.

## MCP, API or CLI

Prefer the Personal API from scripts that save transcripts to dated files; that is what makes them `observed` later. The MCP is fine for a quick "what did we agree" in a session. There is no CLI.

## Setup

1. Generate a personal API key and store it as `GRANOLA_API_KEY`.
2. Write a fetch script that lists notes with cursor pagination and pulls each transcript with the transcript include flag.
3. Convert the speaker field (microphone or speaker source) into `Me:` and `Them:` lines before saving.
4. Save transcripts to a dated folder per meeting series, gitignored.
5. Match a meeting to a company or person by attendee email domain, not by title; generic titles repeat.

## How James uses it

The standup pulls yesterday's notes and lists anything promised, with who and the implied deadline, then cross-checks against tasks and inbox. The weekly retro reads the week's calls for commitments and repeated themes. A transcript script files each call into a dated folder.

## Quirks

- Shell variables do not reach a Python heredoc. Export the key explicitly before the script runs, or the request goes out with an empty header.
- The notes list is paginated with a small page size and a cursor. A script that reads one page and stops sees only the latest few meetings.
- Rate limits are modest (a burst allowance, then a low sustained rate). Fetch transcripts sequentially with a short sleep.
- A meeting with a generic title and no matching attendee domain is unassigned. Surface it; never guess which company it was.
- Speaker attribution in a transcript is by audio source, not by name. Two people on one microphone read as one speaker.

## Related

- [../STACK.md](../STACK.md)
- [../skills/morning-standup/SKILL.md](../skills/morning-standup/SKILL.md)
- [../skills/weekly-retro/SKILL.md](../skills/weekly-retro/SKILL.md)
- [todoist.md](todoist.md)
- [google-calendar.md](google-calendar.md)
