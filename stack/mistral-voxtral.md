# Mistral Voxtral (transcription)

Speech to text for local files: a recorded call, a talk, a video. Output is `transcript.txt` and `transcript.srt` beside each source file. Everything downstream (packaging a video, writing a post from a call) starts from that transcript.

## Who calls it

`skills/youtube-package/SKILL.md` (the transcript is the truth), `skills/linkedin-post/SKILL.md` when a post starts from a recording, `skills/tone-of-voice/SKILL.md` when the corpus includes speech.

## MCP, API or CLI

REST API only, from a small script. No MCP, no CLI. Batch only: no live transcription.

## Setup

1. Store your key as `MISTRAL_API_KEY`.
2. Install `ffmpeg` ([ffmpeg.md](ffmpeg.md)); video inputs need audio extracted first.
3. Write a script that scans a folder, extracts audio from video, posts each file as multipart form data with `model`, `file` and `timestamp_granularities=segment`, and writes both transcripts beside the source.
4. Turn on `diarize=true` and send a `context_bias` field for every proper noun the model mangles: your product, your tools, your name.
5. Upload four files at a time, within the rate limit.

## How James uses it

Point the script at a folder and walk away. Diarisation and the bias list are on by default. Multi-voice files come back grouped into speaker turns.

## Quirks

- **Chunk long files.** Past roughly forty minutes a single request can loop, repeating one sentence for pages or re-transcribing the same audio with drifting timestamps, and still return 200. Split into chunks of around nine minutes and validate by numbers: no backward jumps, no runs of identical segments, final timestamp not past the source duration.
- **Unknown form fields are silently ignored** and still return 200. Never conclude a feature is unsupported from a 200 with no effect.
- **`timestamp_granularities` and `language` are mutually exclusive.** Pick timestamps.
- **Speaker labels arrive as `speaker_id`,** not `speaker`, and are consistent within a file only.
- **Each bias term is one token.** Split multi-word names into words.

## Related

- [STACK.md](../STACK.md)
- [ffmpeg](ffmpeg.md)
- [YouTube package skill](../skills/youtube-package/SKILL.md)
- [Tone of voice skill](../skills/tone-of-voice/SKILL.md)
