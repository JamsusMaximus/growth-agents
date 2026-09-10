# vidIQ

## What it is for

YouTube research: keyword demand, breakout videos on channels your size, competitor titles, and a score for your own title candidates. The `vidiq-competitive` skill decides whether a topic is worth filming; the `youtube-package` skill uses it to title and tag a video that is already filmed.

## MCP, API or CLI

MCP only, and that is the point: the skills call the tools by name and the credit accounting is visible in the session. No API key handling in scripts. There is no CLI.

## Setup

1. Install the MCP connector and authorise it against the YouTube channel you publish from.
2. Record your channel id somewhere the skills can read it. Title scoring without it is generic.
3. Check the credit balance tool once so you know what a run costs before you start.
4. Add your competitor set through the tool so outlier searches are scoped.

## How James uses it

A competitor's video URL or a bare topic goes into the research skill, which either qualifies or kills the idea against hard rules. The packaging skill scores two or three titles against the channel and picks. Credits are not the constraint; a kill with no next action is the waste.

## Quirks

- Title generation returns scores but takes no channel id, so those numbers are not about your channel. Score the shortlist separately with the channel id passed in.
- Channel and video statistics are snapshots. Anything you copy into a doc goes stale silently as the channel grows; date it.
- The fast path for a same-day launch video is a handful of calls. Do not run the full sequence for a video that only needs a proven title scaffold.
- Outlier searches on very small channels return thin sets. Widen the size band before concluding nothing is breaking out.
- Credit costs per tool are `[UNVERIFIED]` here; the balance tool is the source.

## Related

- [../STACK.md](../STACK.md)
- [../skills/vidiq-competitive/SKILL.md](../skills/vidiq-competitive/SKILL.md)
- [../skills/youtube-package/SKILL.md](../skills/youtube-package/SKILL.md)
- [dataforseo.md](dataforseo.md)
- [../experiments/README.md](../experiments/README.md)
