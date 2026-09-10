/**
 * audit_page.mjs - per-page SEO auditor
 * Usage: node audit_page.mjs <url> [--json] [--firecrawl]
 *
 * Fetch strategy (cheapest first):
 *   1. Direct HTTP fetch with browser User-Agent (free - no API credits)
 *   2. Firecrawl API (1 credit) - automatic fallback when direct fetch returns
 *      a bot-challenge page, empty body, or JS-only app shell
 *      Use --firecrawl to skip straight to Firecrawl
 *
 * Data sources:
 *   Direct HTML → cheerio for ALL metadata (title, OG, robots, canonical, etc.)
 *   Firecrawl rawHtml → same cheerio parsing (fallback path)
 *   Firecrawl metadata JSON → title/OG/robots/lang when rawHtml is unavailable
 *   curl -sI  → X-Robots-Tag, HTTP version, redirect depth
 */

import { load } from 'cheerio';
import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';

// --- CLI args ---
const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('-'));
const jsonMode       = args.includes('--json');
const forceFirecrawl = args.includes('--firecrawl');

if (!url) {
  console.error('Usage: node audit_page.mjs <url> [--json] [--firecrawl]');
  process.exit(1);
}

// --- Load API key (only needed for Firecrawl fallback) ---
if (!process.env.FIRECRAWL_API_KEY) {
  for (const p of ['.env', `${process.env.HOME}/.env`]) {
    try {
      readFileSync(p, 'utf8').split('\n').forEach(line => {
        const eq = line.indexOf('=');
        if (eq < 1) return;
        const k = line.slice(0, eq).trim();
        const v = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
        if (k && v && !process.env[k]) process.env[k] = v;
      });
      if (process.env.FIRECRAWL_API_KEY) break;
    } catch {}
  }
}

const domain = new URL(url).hostname;

// --- Direct HTTP fetch ---
const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

async function fetchDirect(targetUrl) {
  try {
    const resp = await fetch(targetUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
    });
    const html = await resp.text();
    return { html, statusCode: resp.status };
  } catch {
    return null;
  }
}

// Detect bot-challenge or JS-shell pages that need Firecrawl to render
function needsFirecrawl(html, statusCode) {
  if (!html || html.length < 200) return true;
  if (statusCode === 403 || statusCode === 429) return true;
  const lower = html.toLowerCase();
  // Cloudflare challenge
  if (lower.includes('just a moment') && lower.includes('cloudflare')) return true;
  if (lower.includes('checking your browser')) return true;
  if (lower.includes('cf-browser-verification')) return true;
  if (lower.includes('enable javascript and cookies to continue')) return true;
  // JS-only SPA shell: <body> has almost no text
  const $ = load(html);
  const bodyText = $('body').clone()
    .find('script, style').remove().end()
    .text().replace(/\s+/g, ' ').trim();
  if (bodyText.length < 100) return true;
  return false;
}

// --- Firecrawl with exponential-backoff retry ---
async function firecrawl(targetUrl, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const resp = await fetch('https://api.firecrawl.dev/v1/scrape', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: targetUrl,
          formats: ['markdown', 'rawHtml'],
          onlyMainContent: false,
          waitFor: 1000,
        }),
      });
      const text = await resp.text();
      const json = JSON.parse(text);
      if (json.data) return json.data;
    } catch {}
    if (attempt < retries) await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
  }
  return null;
}

// --- Fetch HTML ---
let html = '';
let statusCode = '?';
let usedFirecrawl = false;
let markdown = '';
let firecrawlMeta = {};

if (forceFirecrawl) {
  const data = await firecrawl(url);
  if (!data) {
    const err = { url, auditedAt: new Date().toISOString(), error: 'Firecrawl failed after retries', issues: [{ severity: 'critical', code: 'FETCH_FAILED', message: 'Could not fetch page via Firecrawl' }] };
    if (jsonMode) { console.log(JSON.stringify(err)); process.exit(1); }
    console.error(`ERROR: Could not fetch ${url}`);
    process.exit(1);
  }
  html = data.rawHtml ?? '';
  markdown = data.markdown ?? '';
  firecrawlMeta = data.metadata ?? {};
  statusCode = firecrawlMeta.statusCode ?? '?';
  usedFirecrawl = true;
} else {
  const direct = await fetchDirect(url);
  if (direct && !needsFirecrawl(direct.html, direct.statusCode)) {
    html = direct.html;
    statusCode = direct.statusCode;
  } else {
    // Fallback to Firecrawl
    if (!process.env.FIRECRAWL_API_KEY) {
      const err = { url, auditedAt: new Date().toISOString(), error: 'Direct fetch returned bot-challenge and no FIRECRAWL_API_KEY set', issues: [{ severity: 'critical', code: 'FETCH_FAILED', message: 'Bot-challenge page, no Firecrawl key available' }] };
      if (jsonMode) { console.log(JSON.stringify(err)); process.exit(1); }
      console.error(`ERROR: ${err.error}`);
      process.exit(1);
    }
    const data = await firecrawl(url);
    if (!data) {
      const err = { url, auditedAt: new Date().toISOString(), error: 'Firecrawl fallback failed', issues: [{ severity: 'critical', code: 'FETCH_FAILED', message: 'Direct fetch blocked, Firecrawl fallback also failed' }] };
      if (jsonMode) { console.log(JSON.stringify(err)); process.exit(1); }
      console.error(`ERROR: Could not fetch ${url}`);
      process.exit(1);
    }
    html = data.rawHtml ?? '';
    markdown = data.markdown ?? '';
    firecrawlMeta = data.metadata ?? {};
    statusCode = firecrawlMeta.statusCode ?? (direct?.statusCode ?? '?');
    usedFirecrawl = true;
  }
}

const $ = load(html);

// --- Extract metadata from HTML via cheerio ---
// (works for both direct-fetched and Firecrawl rawHtml)

// Title: <title> tag is canonical
const title = ($('head title').first().text() ?? '').trim()
  || (firecrawlMeta.title ?? '').trim();

// Meta description
const description = $('head meta[name="description"]').attr('content')
  ?? $('head meta[name="Description"]').attr('content')
  ?? firecrawlMeta.description
  ?? '';

// Language: from <html lang="...">
const language = $('html').attr('lang')
  ?? firecrawlMeta.language
  ?? '';

// OG tags: support both property="og:x" (standard) and name="og:x" (common non-standard variant)
const og = sel => $(`head meta[property="${sel}"], head meta[name="${sel}"]`).first().attr('content') ?? '';
const ogTitle = og('og:title') || firecrawlMeta.ogTitle || firecrawlMeta['og:title'] || '';
const ogDesc  = og('og:description') || firecrawlMeta.ogDescription || firecrawlMeta['og:description'] || '';
const ogImg   = og('og:image') || firecrawlMeta.ogImage || firecrawlMeta['og:image'] || '';

// Robots: may be string, array, or multiple tags
const robotsAttrs = $('head meta[name="robots"], head meta[name="Robots"]')
  .map((_, el) => $(el).attr('content'))
  .get()
  .filter(Boolean);
let robotsList;
if (robotsAttrs.length > 0) {
  robotsList = robotsAttrs;
} else if (firecrawlMeta.robots) {
  robotsList = Array.isArray(firecrawlMeta.robots) ? firecrawlMeta.robots : [firecrawlMeta.robots];
} else {
  robotsList = [];
}
const hasNoindexMeta = robotsList.some(r => r.toLowerCase().includes('noindex'));
const hasConflict = robotsList.length > 1 && hasNoindexMeta;

// Canonical
const canonicalEl = $('head link[rel="canonical"]');
const canonical = canonicalEl.first().attr('href') ?? 'MISSING';
const canonicalCount = canonicalEl.length;

// Hreflang
const hreflangEntries = $('head link[hreflang]').map((_, el) => $(el).attr('hreflang')).get();
const hreflangLocales = [...new Set(hreflangEntries)].sort();
const hasXDefault = hreflangEntries.includes('x-default');

// Googlebot-specific
const googlebotMeta = $('head meta[name="googlebot"]').attr('content') ?? '';

// Twitter cards: support both name= and property= variants
const tw = sel => $(`head meta[name="${sel}"], head meta[property="${sel}"]`).first().attr('content') ?? '';
const twitterCard  = tw('twitter:card');
const twitterTitle = tw('twitter:title');
const twitterImage = tw('twitter:image');

// Schema types from JSON-LD blocks
const schemaTypes = [];
$('script[type="application/ld+json"]').each((_, el) => {
  try {
    const parsed = JSON.parse($(el).html() ?? '');
    [].concat(parsed).forEach(node => { if (node['@type']) schemaTypes.push(node['@type']); });
  } catch {}
});
const uniqueSchema = [...new Set(schemaTypes)];

// --- H1/H2 and word count ---
// Use markdown lines if available (Firecrawl path), else cheerio body text
let h1s, h2s, wordCount;

if (markdown) {
  function stripInlineMd(s) {
    return s
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/`[^`]*`/g, '')
      .trim();
  }
  const lines = markdown.split('\n');
  h1s = lines.filter(l => /^# [^#]/.test(l)).map(l => stripInlineMd(l.replace(/^# /, ''))).filter(Boolean);
  h2s = lines.filter(l => /^## [^#]/.test(l)).map(l => stripInlineMd(l.replace(/^## /, ''))).filter(Boolean).slice(0, 5);
  wordCount = markdown
    .replace(/```[\s\S]*?```/gm, '').replace(/`[^`]*`/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/^#{1,6}\s+/gm, '').replace(/[*_~>|]/g, '')
    .split(/\s+/).filter(w => w.length > 0).length;
} else {
  // Direct fetch path: extract from HTML
  h1s = $('h1').map((_, el) => $(el).text().trim()).get().filter(Boolean);
  h2s = $('h2').map((_, el) => $(el).text().trim()).get().filter(Boolean).slice(0, 5);
  const bodyClone = $('body').clone();
  bodyClone.find('script, style, nav, footer, header, noscript').remove();
  const bodyText = bodyClone.text().replace(/\s+/g, ' ').trim();
  wordCount = bodyText.split(/\s+/).filter(w => w.length > 1).length;
}

// --- HTTP headers via curl ---
const followResult = spawnSync('curl', [
  '-s', '-o', '/dev/null',
  '-w', '%{num_redirects}|%{url_effective}',
  '-L', '--max-redirs', '10',
  '--user-agent', BROWSER_UA,
  '--max-time', '10',
  url,
], { encoding: 'utf8' });
const followParts = (followResult.stdout ?? '').split('|');
const redirectDepth = parseInt(followParts[0] ?? '0', 10) || 0;
const finalUrl = (followParts[1] ?? url).trim();

const headResult = spawnSync('curl', [
  '-sI', '--max-time', '10',
  '--user-agent', BROWSER_UA,
  url,
], { encoding: 'utf8' });
const httpRaw = headResult.stdout ?? '';
const httpLine = httpRaw.split('\n')[0]?.trim() ?? 'failed';
const xRobotsMatch = httpRaw.match(/^x-robots-tag:\s*(.+)/im);
const xRobots = xRobotsMatch ? xRobotsMatch[1].trim() : '';
const hasNoindexHeader = xRobots.toLowerCase().includes('noindex');

// --- Derived values ---
const titleLen = title.length;
const descLen = (description ?? '').length;

let ogImgStatus = 'ok';
if (!ogImg) ogImgStatus = 'missing';
else if (!ogImg.startsWith('http')) ogImgStatus = 'relative';
else { try { if (new URL(ogImg).hostname !== domain) ogImgStatus = 'external'; } catch {} }

let canonicalHost = null;
if (canonical !== 'MISSING') { try { canonicalHost = new URL(canonical).hostname; } catch {} }
const canonicalIsHttp        = canonical.startsWith('http://');
const canonicalIsCrossDomain = !!(canonicalHost && canonicalHost !== domain);
const canonicalIsSelf        = canonical === url;

const not404Signals = ['404', 'not found', "page doesn't exist", 'page not found'];
const soft404 = (statusCode === 200 || statusCode === '200') &&
  [...h1s, ...h2s].some(h => not404Signals.some(s => h.toLowerCase().includes(s)));

// --- Issues ---
const issues = [];
const iss = (severity, code, message) => issues.push({ severity, code, message });

if (statusCode === 404 || statusCode === '404')
  iss('critical', 'STATUS_404', 'Page returns 404');
if (soft404)
  iss('critical', 'SOFT_404', 'Soft 404 suspected (200 with not-found content in headings)');
if (hasNoindexMeta || hasNoindexHeader)
  iss('critical', 'NOINDEX', `Noindex${hasConflict ? ' (conflicting directives - noindex wins)' : hasNoindexMeta ? ' (meta robots)' : ' (X-Robots-Tag header)'}`);
if (redirectDepth > 1)
  iss('medium', 'REDIRECT_CHAIN', `${redirectDepth} hops to reach final URL - wastes crawl budget`);

if (!title)
  iss('critical', 'TITLE_MISSING', 'Title tag missing');
else if (titleLen > 65)
  iss('high', 'TITLE_TOO_LONG', `Title ${titleLen} chars (max ~65, will be truncated in SERP)`);
else if (titleLen > 55)
  iss('medium', 'TITLE_REVIEW', `Title ${titleLen} chars (borderline - review wording)`);

if (!description)
  iss('high', 'META_DESC_MISSING', 'Meta description missing - Google will auto-generate a snippet');
else if (descLen > 160)
  iss('medium', 'META_DESC_TOO_LONG', `Meta description ${descLen} chars (will be truncated at ~160)`);
else if (descLen < 70)
  iss('low', 'META_DESC_TOO_SHORT', `Meta description ${descLen} chars (min ~70 for full snippet)`);

if (canonical === 'MISSING')
  iss('high', 'CANONICAL_MISSING', 'No canonical tag - Google may pick the wrong canonical');
else {
  if (canonicalIsHttp)        iss('medium', 'CANONICAL_HTTP',         'Canonical uses HTTP, not HTTPS');
  if (canonicalIsCrossDomain) iss('high',   'CANONICAL_CROSS_DOMAIN', `Canonical points to ${canonicalHost} (different domain)`);
  if (canonicalCount > 1)     iss('high',   'CANONICAL_MULTIPLE',     `${canonicalCount} canonical tags found - Google will ignore all`);
}

if (!ogTitle)         iss('medium', 'OG_TITLE_MISSING',  'og:title not set - social shares will have no title');
if (!ogDesc)          iss('low',    'OG_DESC_MISSING',   'og:description not set');
if (ogImgStatus === 'missing')  iss('high', 'OG_IMAGE_MISSING',  'og:image not set - social shares will have no image');
if (ogImgStatus === 'relative') iss('high', 'OG_IMAGE_RELATIVE', 'og:image is a relative URL - will not work in social shares');

if (!twitterCard)
  iss('low', 'TWITTER_CARD_MISSING', 'twitter:card not set - X/Twitter will use a basic link card');
if (!twitterImage && ogImgStatus === 'missing')
  iss('low', 'TWITTER_IMAGE_MISSING', 'No twitter:image or og:image fallback');

if (h1s.length === 0) iss('high',   'H1_MISSING',   'No H1 heading found');
else if (h1s.length > 1) iss('medium', 'H1_MULTIPLE', `${h1s.length} H1 headings - should be exactly one`);

if (hreflangLocales.length > 0 && !hasXDefault)
  iss('medium', 'HREFLANG_NO_XDEFAULT', 'Hreflang present but x-default missing - no fallback for unmatched locales');

if (!language)
  iss('low', 'LANG_MISSING', 'lang attribute not set on <html> element');
if (uniqueSchema.length === 0)
  iss('low', 'SCHEMA_NONE', 'No JSON-LD structured data found');
if (wordCount > 0 && wordCount < 300)
  iss('medium', 'CONTENT_THIN', `${wordCount} words - may be considered thin content`);

// --- Build structured result ---
const result = {
  url,
  auditedAt: new Date().toISOString(),
  fetchMethod: usedFirecrawl ? 'firecrawl' : 'direct',
  http: { statusCode, httpLine, redirectDepth, finalUrl, xRobots },
  lang: language || 'MISSING',
  title:    { text: title, length: titleLen },
  metaDesc: { text: description, length: descLen },
  canonical: {
    href: canonical, isSelf: canonicalIsSelf,
    isHttp: canonicalIsHttp, isCrossDomain: canonicalIsCrossDomain, count: canonicalCount,
  },
  robots: { directives: robotsList, hasNoindex: hasNoindexMeta || hasNoindexHeader, hasConflict, googlebotDirective: googlebotMeta },
  og:      { title: ogTitle, description: ogDesc, image: ogImg, imageStatus: ogImgStatus },
  twitter: { card: twitterCard, title: twitterTitle, image: twitterImage },
  hreflang: { locales: hreflangLocales, hasXDefault },
  headings: { h1: h1s, h2: h2s, wordCount },
  schema:   { types: uniqueSchema },
  issues,
};

if (jsonMode) {
  console.log(JSON.stringify(result));
  process.exit(0);
}

// --- Human-readable text output ---
const robotsDisplay = robotsList.length ? robotsList.join(' | ') : 'NOT SET (index,follow by default)';
const titleFlag = titleLen > 65 ? ' [TOO LONG]' : titleLen > 55 ? ' [REVIEW]' : '';
const descFlag  = !description ? '' : descLen > 160 ? ' [TOO LONG]' : descLen < 70 ? ' [TOO SHORT]' : '';

let imgFlag = '';
if (ogImgStatus === 'missing')  imgFlag = ' [MISSING]';
else if (ogImgStatus === 'relative') imgFlag = ' [RELATIVE - BROKEN]';
else if (ogImgStatus === 'external') {
  try { imgFlag = ` [EXTERNAL: ${new URL(ogImg).hostname}]`; } catch {}
}

const noindexNote = (hasNoindexMeta && hasNoindexHeader) ? '  [NOINDEX - meta + header]'
  : hasNoindexMeta   ? '  [NOINDEX - meta]'
  : hasNoindexHeader ? '  [NOINDEX - X-Robots-Tag]'
  : '';

const criticals = issues.filter(i => i.severity === 'critical');
const highs     = issues.filter(i => i.severity === 'high');
const mediums   = issues.filter(i => i.severity === 'medium');
const lows      = issues.filter(i => i.severity === 'low');

console.log(`\n=== ${url} === [${usedFirecrawl ? 'firecrawl' : 'direct'}]`);
console.log(`HTTP:        ${httpLine}${redirectDepth > 1 ? `  [CHAIN: ${redirectDepth} redirects]` : redirectDepth === 1 ? '  [1 redirect]' : ''}`);
console.log(`STATUS:      ${statusCode}${soft404 ? '  [SOFT 404 SUSPECTED]' : ''}`);
console.log(`LANG:        ${language || 'MISSING'}`);
console.log(`TITLE (${titleLen})${titleFlag}: ${title || 'MISSING'}`);
console.log(`META DESC (${descLen})${descFlag}: ${description || 'MISSING'}`);
console.log(`CANONICAL:   ${canonical}${canonicalIsHttp ? '  [HTTP]' : ''}${canonicalIsCrossDomain ? `  [CROSS-DOMAIN: ${canonicalHost}]` : ''}${canonicalCount > 1 ? `  [${canonicalCount} FOUND - CONFLICT]` : ''}`);
console.log(`ROBOTS:      ${robotsDisplay}${hasConflict ? '  [CONFLICT]' : ''}${noindexNote}`);
if (googlebotMeta) console.log(`GOOGLEBOT:   ${googlebotMeta}  [GOOGLEBOT-SPECIFIC]`);
console.log(`X-Robots:    ${xRobots || '(none)'}`);
console.log(`OG TITLE:    ${ogTitle || 'MISSING'}`);
console.log(`OG DESC:     ${ogDesc || 'MISSING'}`);
console.log(`OG IMG:      ${ogImg ? ogImg.substring(0, 80) : 'MISSING'}${imgFlag}`);
console.log(`TWITTER:     card=${twitterCard || 'MISSING'}  img=${twitterImage ? twitterImage.substring(0, 60) : '(inherits og:image or MISSING)'}`);
console.log(`HREFLANG:    ${hreflangLocales.length ? hreflangLocales.join(', ') : 'none'}${hreflangLocales.length && !hasXDefault ? '  [x-default MISSING]' : ''}`);
console.log(`H1 (${h1s.length}):      ${h1s.join(' | ') || 'MISSING'}${h1s.length > 1 ? '  [MULTIPLE]' : ''}`);
console.log(`H2 (top 5):  ${h2s.join(' | ') || 'none'}`);
console.log(`SCHEMA:      ${uniqueSchema.length ? uniqueSchema.join(', ') : 'NONE'}`);
console.log(`WORDS:       ${wordCount}`);
if (redirectDepth > 1) console.log(`FINAL URL:   ${finalUrl}`);

const allIssues = [
  ...criticals.map(i => `  [CRITICAL] ${i.message}`),
  ...highs.map(i     => `  [HIGH]     ${i.message}`),
  ...mediums.map(i   => `  [MEDIUM]   ${i.message}`),
  ...lows.map(i      => `  [LOW]      ${i.message}`),
];
if (allIssues.length) {
  console.log(`\nISSUES (${issues.length}):`);
  allIssues.forEach(l => console.log(l));
}
