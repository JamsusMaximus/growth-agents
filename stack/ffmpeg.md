# ffmpeg

The media utility every other media step leans on. It extracts audio before transcription, pulls frames for a vision pass, trims and concatenates clips, and reports a file's real duration. Local binary; nothing leaves your machine.

## Who calls it

The transcription script ([mistral-voxtral.md](mistral-voxtral.md)) for audio extraction and chunking; `skills/youtube-package/SKILL.md` for chapter timestamps and frame grabs.

## MCP, API or CLI

CLI only. `ffmpeg` transforms; `ffprobe` inspects. They are installed together.

## Setup

1. `brew install ffmpeg` (or your package manager).
2. Check `ffmpeg -version` and `ffprobe -version` both run. No key, no account.

## How this system uses it

Three commands cover almost everything.

```bash
# audio out of a video, mono, small enough to upload
ffmpeg -i input.mp4 -vn -ac 1 -c:a libmp3lame -b:a 96k output.mp3

# one frame every fifteen seconds
ffmpeg -i input.mp4 -vf "fps=1/15" frames/frame-%04d.png -y

# real duration in seconds
ffprobe -v error -show_entries format=duration -of csv=p=0 input.mp4
```

Scene-change detection (`-vf "select='gt(scene,0.3)'"`) catches slide transitions more reliably than time-based sampling.

## Quirks

- **Trust `ffprobe`, not the nominal segment length.** Chunks cut with `-segment_time` are not exactly that long. Offset each chunk's timestamps by its probed duration or the transcript drifts.
- **Frame counts explode.** One frame a second on an hour of video is 3,600 images. Sample sparsely, then go dense on the range you care about.
- **`-y` overwrites silently; without it the command stalls waiting for input.** Pick one deliberately in scripts.
- **Mono at 96 kbps is plenty for speech.** Never upload the video track to a transcription API.

## Related

- [STACK.md](../STACK.md)
- [Mistral Voxtral](mistral-voxtral.md)
- [Cloudflare Stream](cloudflare-stream.md)
- [YouTube package skill](../skills/youtube-package/SKILL.md)
