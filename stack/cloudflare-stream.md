# Cloudflare Stream

Video hosting for paid content: chapters, recordings, anything that must not sit on a public link. Stream encodes, serves adaptive bitrate and signs URLs. Free marketing video stays on YouTube, where the distribution is.

## Who calls it

A publish pipeline you write: recording in, encoded asset out, signed URL in the page. The YouTube skills do not touch it.

## MCP, API or CLI

REST API from a script. No MCP. Cloudflare's `wrangler` CLI covers object storage but not Stream uploads.

## Setup

1. Create an API token scoped to Stream; store it as `CLOUDFLARE_STREAM_API_TOKEN` with the account id as `CLOUDFLARE_STREAM_ACCOUNT_ID`.
2. Upload by "copy from URL" when the source is already online (a meeting recorder's download link); upload the file directly otherwise.
3. Poll the video's status until ready, then store its uid with the chapter that plays it.
4. Generate a signing key once; mint short-lived signed tokens per page load.

## How this system uses it

A script pulls a recording from the meeting tool, hands Stream the URL, polls until encoded, and opens a PR that wires the uid into the page. Every play URL is signed.

## Quirks

- **Encoding can take far longer than expected** for a high-resolution source. Set the poll timeout generously and, if it still times out, re-poll the uid later rather than uploading again.
- **Signed tokens expire.** A tab left open past the token's lifetime errors on resume with no useful message. Show a refresh prompt instead of a dead play button.
- **The embedded player exposes no error detail.** Stalled and error callbacks fire during normal initialisation. Do not pipe them straight into analytics; capture playback state and classify.
- **Every serving hostname must be in your content security policy** (`media-src`), or every video fails with the same dead-play-button signature.
- **Default development storage hostnames are rate-limited.** Serve from a custom domain in production.

## Related

- [STACK.md](../STACK.md)
- [ffmpeg](ffmpeg.md)
- [Mistral Voxtral](mistral-voxtral.md)
- [Vercel CLI](vercel-cli.md)
