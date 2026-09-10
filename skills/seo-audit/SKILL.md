---
name: seo-audit
version: 1.0.0
description: When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions "SEO audit," "technical SEO," "why am I not ranking," "SEO issues," "on-page SEO," "meta tags review," or "SEO health check." For building pages at scale to target keywords, see programmatic-seo. For adding structured data, see schema-markup.
license: MIT
---

# SEO Audit

You are an expert in search engine optimization. Your goal is to identify SEO issues and provide actionable recommendations to improve organic search performance.

## Provenance

- **Upstream:** [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), skill `seo-audit`
- **Pinned version:** v1.0.0 (the `version` in the frontmatter above)
- **Licence:** MIT, see `LICENSE` in this folder
- **Upstream is ahead:** 2.10.1 at time of writing. This copy stays pinned because the five `scripts/*.mjs` files in this folder were written against 1.0.0 and have not been re-tested against later versions.
- **Modified:** yes. `SKILL.md` and `references/` are the upstream files. The `scripts/` folder and the `## How I run it` section below are additions and are not part of upstream.

## How I run it

The audit framework below is the upstream skill. The scripts in `scripts/` (relative to this skill folder) do the fetching and parsing so the audit works from real page data rather than guesses. They are installed once and used directly. Do not rewrite them per session.

**One-time install** (cheerio only, no other dependencies):

```bash
cd scripts && npm install
```

### Scripts

| Script | Purpose |
|---|---|
| `audit_page.mjs` | Audit a single URL. Text output by default; `--json` for machine-readable |
| `discover_urls.mjs` | Parse robots.txt + sitemaps, group URLs by template pattern |
| `audit_batch.mjs` | Concurrency-controlled batch runner with retry, outputs one JSON file per page |
| `aggregate.mjs` | Reads batch JSON results, produces site-level summary sorted by severity |
| `hreflang_check.mjs` | Reads batch JSON results, checks hreflang reciprocity and consistency |

**Fetch strategy, no Firecrawl credits by default:**
`audit_page.mjs` uses direct HTTP fetch first (free). Firecrawl is only used as an automatic fallback when the direct fetch returns a bot-challenge page or a JS-only shell with no visible content. Use `--firecrawl` to force Firecrawl for a specific URL. Set `FIRECRAWL_API_KEY` in your environment (the scripts also read a `.env` file in the current directory or your home directory). It is only needed if the fallback is triggered.

### Workflow: Single page

```bash
SCRIPTS=scripts   # relative to this skill folder
node $SCRIPTS/audit_page.mjs "https://example.com/page"
```

### Workflow: Full site audit

```bash
SCRIPTS=scripts   # relative to this skill folder
OUT=./audit-output

# 1. Discover URLs (reads robots.txt + all sitemaps, groups by template)
node $SCRIPTS/discover_urls.mjs example.com --sample 3 --limit 100 --json 2>/dev/null > $OUT-urls.json

# 2. Batch audit (concurrency=3, retries=2, saves one JSON per page)
mkdir -p $OUT
node $SCRIPTS/audit_batch.mjs --urls $OUT-urls.json --output $OUT

# 3. Aggregate (site-level summary, issue frequency, quick wins)
node $SCRIPTS/aggregate.mjs $OUT

# 4. Hreflang check (reciprocity + consistency, reads same JSON results)
node $SCRIPTS/hreflang_check.mjs $OUT
```

### Workflow: Spot-check a specific URL list

```bash
# Plain text file (one URL per line) also accepted by audit_batch.mjs
node $SCRIPTS/audit_batch.mjs --urls urls.txt --output ./audit-output --concurrency 5
```

### Key design decisions

- **No regex on HTML anywhere.** cheerio handles all DOM queries (attribute-order-agnostic)
- **Firecrawl metadata** used for title, description, OG tags, robots, lang, statusCode (JSON object, no parsing needed)
- **Firecrawl rawHtml** → cheerio for canonical, hreflang, googlebot meta, Twitter cards, schema
- **Firecrawl markdown** → H1/H2 as clean text lines (no HTML stripping), word count
- **`curl -sI` + `curl -w %{num_redirects}`** for HTTP headers, X-Robots-Tag, redirect depth
- **Issues array** on every JSON result enables aggregation across the full crawl
- Each Firecrawl scrape costs 1 credit. Check the current free-tier allowance before a large batch

### Issue severity codes

| Code | Severity | Meaning |
|---|---|---|
| `NOINDEX` | critical | noindex in meta robots or X-Robots-Tag |
| `STATUS_404` | critical | Page returns 404 |
| `SOFT_404` | critical | 200 but headings contain "not found" language |
| `TITLE_MISSING` | critical | No title tag |
| `TITLE_TOO_LONG` | high | >65 chars |
| `OG_IMAGE_MISSING` | high | og:image not set |
| `OG_IMAGE_RELATIVE` | high | og:image is a relative URL (broken in social) |
| `CANONICAL_MISSING` | high | No canonical tag |
| `CANONICAL_CROSS_DOMAIN` | high | Canonical points to a different domain |
| `CANONICAL_MULTIPLE` | high | Multiple canonical tags (Google ignores all) |
| `H1_MISSING` | high | No H1 |
| `META_DESC_MISSING` | high | No meta description |
| `TITLE_REVIEW` | medium | 55-65 chars (borderline) |
| `META_DESC_TOO_LONG` | medium | >160 chars |
| `H1_MULTIPLE` | medium | More than one H1 |
| `HREFLANG_NO_XDEFAULT` | medium | Hreflang set but x-default missing |
| `REDIRECT_CHAIN` | medium | >1 redirect to reach page |
| `CONTENT_THIN` | medium | <300 words |
| `CANONICAL_HTTP` | medium | Canonical uses HTTP not HTTPS |
| `TWITTER_CARD_MISSING` | low | twitter:card not set |
| `SCHEMA_NONE` | low | No JSON-LD structured data |
| `LANG_MISSING` | low | No lang on `<html>` |
| `META_DESC_TOO_SHORT` | low | <70 chars |

**Script source:** `scripts/audit_page.mjs` in this folder. Read it directly if you need to inspect or extend the logic. Do not re-embed it here.

---

## Initial Assessment

**Check for product marketing context first:**
If `.claude/product-marketing-context.md` exists, read it before asking questions. Use that context and only ask for information not already covered or specific to this task.

Before auditing, understand:

1. **Site Context**
   - What type of site? (SaaS, e-commerce, blog, etc.)
   - What's the primary business goal for SEO?
   - What keywords/topics are priorities?

2. **Current State**
   - Any known issues or concerns?
   - Current organic traffic level?
   - Recent changes or migrations?

3. **Scope**
   - Full site audit or specific pages?
   - Technical + on-page, or one focus area?
   - Access to Search Console / analytics?

---

## Audit Framework

### Priority Order
1. **Crawlability & Indexation** (can Google find and index it?)
2. **Technical Foundations** (is the site fast and functional?)
3. **On-Page Optimization** (is content optimized?)
4. **Content Quality** (does it deserve to rank?)
5. **Authority & Links** (does it have credibility?)

---

## Technical SEO Audit

### Crawlability

**Robots.txt**
- Check for unintentional blocks
- Verify important pages allowed
- Check sitemap reference

**XML Sitemap**
- Exists and accessible
- Submitted to Search Console
- Contains only canonical, indexable URLs
- Updated regularly
- Proper formatting

**Site Architecture**
- Important pages within 3 clicks of homepage
- Logical hierarchy
- Internal linking structure
- No orphan pages

**Crawl Budget Issues** (for large sites)
- Parameterized URLs under control
- Faceted navigation handled properly
- Infinite scroll with pagination fallback
- Session IDs not in URLs

### Indexation

**Index Status**
- site:domain.com check
- Search Console coverage report
- Compare indexed vs. expected

**Indexation Issues**
- Noindex tags on important pages
- Canonicals pointing wrong direction
- Redirect chains/loops
- Soft 404s
- Duplicate content without canonicals

**Canonicalization**
- All pages have canonical tags
- Self-referencing canonicals on unique pages
- HTTP → HTTPS canonicals
- www vs. non-www consistency
- Trailing slash consistency

### Site Speed & Core Web Vitals

**Core Web Vitals**
- LCP (Largest Contentful Paint): < 2.5s
- INP (Interaction to Next Paint): < 200ms
- CLS (Cumulative Layout Shift): < 0.1

**Speed Factors**
- Server response time (TTFB)
- Image optimization
- JavaScript execution
- CSS delivery
- Caching headers
- CDN usage
- Font loading

**Tools**
- PageSpeed Insights
- WebPageTest
- Chrome DevTools
- Search Console Core Web Vitals report

### Mobile-Friendliness

- Responsive design (not separate m. site)
- Tap target sizes
- Viewport configured
- No horizontal scroll
- Same content as desktop
- Mobile-first indexing readiness

### Security & HTTPS

- HTTPS across entire site
- Valid SSL certificate
- No mixed content
- HTTP → HTTPS redirects
- HSTS header (bonus)

### URL Structure

- Readable, descriptive URLs
- Keywords in URLs where natural
- Consistent structure
- No unnecessary parameters
- Lowercase and hyphen-separated

---

## On-Page SEO Audit

### Title Tags

**Check for:**
- Unique titles for each page
- Primary keyword near beginning
- 50-60 characters (visible in SERP)
- Compelling and click-worthy
- Brand name placement (end, usually)

**Common issues:**
- Duplicate titles
- Too long (truncated)
- Too short (wasted opportunity)
- Keyword stuffing
- Missing entirely

### Meta Descriptions

**Check for:**
- Unique descriptions per page
- 150-160 characters
- Includes primary keyword
- Clear value proposition
- Call to action

**Common issues:**
- Duplicate descriptions
- Auto-generated garbage
- Too long/short
- No compelling reason to click

### Heading Structure

**Check for:**
- One H1 per page
- H1 contains primary keyword
- Logical hierarchy (H1 → H2 → H3)
- Headings describe content
- Not just for styling

**Common issues:**
- Multiple H1s
- Skip levels (H1 → H3)
- Headings used for styling only
- No H1 on page

### Content Optimization

**Primary Page Content**
- Keyword in first 100 words
- Related keywords naturally used
- Sufficient depth/length for topic
- Answers search intent
- Better than competitors

**Thin Content Issues**
- Pages with little unique content
- Tag/category pages with no value
- Doorway pages
- Duplicate or near-duplicate content

### Image Optimization

**Check for:**
- Descriptive file names
- Alt text on all images
- Alt text describes image
- Compressed file sizes
- Modern formats (WebP)
- Lazy loading implemented
- Responsive images

### Internal Linking

**Check for:**
- Important pages well-linked
- Descriptive anchor text
- Logical link relationships
- No broken internal links
- Reasonable link count per page

**Common issues:**
- Orphan pages (no internal links)
- Over-optimized anchor text
- Important pages buried
- Excessive footer/sidebar links

### Keyword Targeting

**Per Page**
- Clear primary keyword target
- Title, H1, URL aligned
- Content satisfies search intent
- Not competing with other pages (cannibalization)

**Site-Wide**
- Keyword mapping document
- No major gaps in coverage
- No keyword cannibalization
- Logical topical clusters

---

## Content Quality Assessment

### E-E-A-T Signals

**Experience**
- First-hand experience demonstrated
- Original insights/data
- Real examples and case studies

**Expertise**
- Author credentials visible
- Accurate, detailed information
- Properly sourced claims

**Authoritativeness**
- Recognized in the space
- Cited by others
- Industry credentials

**Trustworthiness**
- Accurate information
- Transparent about business
- Contact information available
- Privacy policy, terms
- Secure site (HTTPS)

### Content Depth

- Comprehensive coverage of topic
- Answers follow-up questions
- Better than top-ranking competitors
- Updated and current

### User Engagement Signals

- Time on page
- Bounce rate in context
- Pages per session
- Return visits

---

## Common Issues by Site Type

### SaaS/Product Sites
- Product pages lack content depth
- Blog not integrated with product pages
- Missing comparison/alternative pages
- Feature pages thin on content
- No glossary/educational content

### E-commerce
- Thin category pages
- Duplicate product descriptions
- Missing product schema
- Faceted navigation creating duplicates
- Out-of-stock pages mishandled

### Content/Blog Sites
- Outdated content not refreshed
- Keyword cannibalization
- No topical clustering
- Poor internal linking
- Missing author pages

### Local Business
- Inconsistent NAP
- Missing local schema
- No Google Business Profile optimization
- Missing location pages
- No local content

---

## Output Format

### Audit Report Structure

**Executive Summary**
- Overall health assessment
- Top 3-5 priority issues
- Quick wins identified

**Technical SEO Findings**
For each issue:
- **Issue**: What's wrong
- **Impact**: SEO impact (High/Medium/Low)
- **Evidence**: How you found it
- **Fix**: Specific recommendation
- **Priority**: 1-5 or High/Medium/Low

**On-Page SEO Findings**
Same format as above

**Content Findings**
Same format as above

**Prioritized Action Plan**
1. Critical fixes (blocking indexation/ranking)
2. High-impact improvements
3. Quick wins (easy, immediate benefit)
4. Long-term recommendations

---

## References

- [AI Writing Detection](references/ai-writing-detection.md): Common AI writing patterns to avoid (em dashes, overused phrases, filler words)
- [AEO & GEO Patterns](references/aeo-geo-patterns.md): Content patterns optimized for answer engines and AI citation

---

## Tools Referenced

**Free Tools**
- Google Search Console (essential)
- Google PageSpeed Insights
- Bing Webmaster Tools
- Rich Results Test
- Mobile-Friendly Test
- Schema Validator

**Paid Tools** (if available)
- Screaming Frog
- Ahrefs / Semrush
- Sitebulb
- ContentKing

---

## Task-Specific Questions

1. What pages/keywords matter most?
2. Do you have Search Console access?
3. Any recent changes or migrations?
4. Who are your top organic competitors?
5. What's your current organic traffic baseline?

---

## Related Skills

- **programmatic-seo**: For building SEO pages at scale
- **schema-markup**: For implementing structured data
- **page-cro**: For optimizing pages for conversion (not just ranking)
- **analytics-tracking**: For measuring SEO performance

---

## Related

- [copywriting-hooks](../copywriting-hooks/SKILL.md): openings and titles for the pages the audit says are thin
- [humanizer](../humanizer/SKILL.md): pairs with `references/ai-writing-detection.md` when rewriting page copy
- [Stack](../../STACK.md): where SEO data and scraping tools sit in the toolset
- [Licences](../../LICENSES.md): the vendoring index
