# Magnific (image and video generation)

Generated images and video for thumbnails, post visuals and short clips. The agent queues a render, waits for it, shows the human a numbered grid and iterates on the one they pick. It never decides which image ships.

## Who calls it

`skills/youtube-package/SKILL.md` writes the thumbnail brief that the render step consumes; `skills/linkedin-post/SKILL.md` when a post needs a visual.

## MCP, API or CLI

MCP. It exposes generation, variation, targeted edit, upscale, a wait call and an account balance read. A REST API exists underneath, but the MCP is the route this system documents.

## Setup

1. Add the Magnific MCP server to Claude Code and authenticate.
2. Read the account balance once so you know the starting credit figure.
3. Agree a per-session credit cap with the human before the first render.

## How this system uses it

Brief in, four to eight candidates out, every render numbered before a human sees it. The human picks; the skill recommends. The winner gets a targeted edit or two, then one upscale. Credits are read back from the balance call and logged, never counted from memory.

## Quirks

- **Queue, then wait.** Results only arrive through the wait call. Never re-submit a queued job because it looks slow; you pay twice.
- **Never generate a real brand's mark from words.** Give the real asset as an image reference and expect drift. Pixel-perfect means compositing the real file afterwards.
- **A clean prompt can trip the content filter** on one word. Reword, or switch model if it persists.
- **Upscales cost more than renders.** Upscale one winner, not a grid.
- **Counting objects in a render needs a zoomed crop.** Never report a count from the thumbnail view.

## Related

- [STACK.md](../STACK.md)
- [YouTube package skill](../skills/youtube-package/SKILL.md)
- [LinkedIn post skill](../skills/linkedin-post/SKILL.md)
- [Cloudflare Stream](cloudflare-stream.md)
