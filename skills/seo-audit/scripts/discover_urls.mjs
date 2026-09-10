/**
 * discover_urls.mjs - URL discovery from robots.txt + sitemaps
 * Usage: node discover_urls.mjs <domain> [--limit 500] [--sample 3] [--json]
 *
 * 1. Fetches robots.txt to find all Sitemap: references
 * 2. Recursively fetches sitemap index files and URL sitemaps
 * 3. Groups URLs by inferred template pattern (numeric segments → {id})
 * 4. Samples N URLs per template for auditing
 *
 * JSON output is compatible with audit_batch.mjs --urls flag.
 */

import { load } from 'cheerio';
import { readFileSync } from 'fs';

// --- API key (needed only for Firecrawl-protected sitemaps - not usually required) ---
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

// --- CLI args ---
const args = process.argv.slice(2);
const rawDomain = args.find(a => !a.startsWith('-'));
const limitArg  = args.indexOf('--limit');
const sampleArg = args.indexOf('--sample');
const limitPerSitemap  = limitArg  !== -1 ? parseInt(args[limitArg + 1], 10)  : 500;
const samplePerPattern = sampleArg !== -1 ? parseInt(args[sampleArg + 1], 10) : 3;
const jsonMode = args.includes('--json');

if (!rawDomain) {
  console.error('Usage: node discover_urls.mjs <domain> [--limit 500] [--sample 3] [--json]');
  process.exit(1);
}

const domain  = rawDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
const baseUrl = `https://${domain}`;

// --- Helpers ---
async function fetchText(url) {
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SEOBot/1.0)' },
      signal: AbortSignal.timeout(20000),
    });
    if (!resp.ok) return null;
    return resp.text();
  } catch { return null; }
}

// Parse sitemap XML using cheerio in XML mode
// Returns { sitemapUrls: [], pageUrls: [] }
function parseSitemap(xml) {
  const $ = load(xml, { xmlMode: true });
  const sitemapUrls = $('sitemapindex > sitemap > loc').map((_, el) => $(el).text().trim()).get();
  const pageUrls    = $('urlset > url > loc').map((_, el) => $(el).text().trim()).get();
  return { sitemapUrls, pageUrls };
}

// Infer URL template: replace variable segments with placeholders.
// Numeric segments → {id}, long hyphenated slugs → {slug}.
// Final grouping uses frequency analysis: segments unique to <10% of URLs
// at the same path depth are treated as variable (IDs or content slugs).
function urlTemplate(url, allPathsAtDepth) {
  try {
    const { pathname } = new URL(url);
    const segments = pathname.split('/');
    return segments.map((seg, i) => {
      if (!seg) return seg;
      if (/^\d+$/.test(seg)) return '{id}';                      // numeric id
      if (/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(seg)) return '{uuid}'; // uuid
      // Slug heuristic: contains hyphens, longer than a typical keyword
      // (>20 chars), OR appears at this position very rarely across the URL set
      if (allPathsAtDepth) {
        const posKey = `${i}:${seg}`;
        const depth  = segments.length;
        const total  = allPathsAtDepth.get(depth) ?? 1;
        const freq   = allPathsAtDepth.get(posKey) ?? 1;
        if (freq / total < 0.1) return seg.includes('-') ? '{slug}' : '{id}';
      }
      return seg;
    }).join('/');
  } catch { return url; }
}

// Build frequency map for template inference
function buildFreqMap(urls) {
  const map = new Map();
  for (const u of urls) {
    try {
      const segs = new URL(u).pathname.split('/');
      const depth = segs.length;
      map.set(depth, (map.get(depth) ?? 0) + 1);
      segs.forEach((seg, i) => {
        if (seg) {
          const k = `${i}:${seg}`;
          map.set(k, (map.get(k) ?? 0) + 1);
        }
      });
    } catch {}
  }
  return map;
}

// --- Step 1: robots.txt ---
log('Fetching robots.txt...');
const robotsTxt = await fetchText(`${baseUrl}/robots.txt`) ?? '';
const sitemapRefs = [...robotsTxt.matchAll(/^Sitemap:\s*(.+)/gim)]
  .map(m => m[1].trim())
  .filter(Boolean);

if (sitemapRefs.length === 0) {
  log('No Sitemap: entries in robots.txt - trying common paths');
  sitemapRefs.push(
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/sitemaps/sitemap.xml`,
  );
}
log(`Found ${sitemapRefs.length} sitemap reference(s)`);

// --- Step 2: Recursive sitemap fetch ---
const allUrls  = new Set();
const visited  = new Set();

async function processSitemap(sitemapUrl) {
  if (visited.has(sitemapUrl)) return;
  visited.add(sitemapUrl);

  log(`  Fetching: ${sitemapUrl}`);
  const xml = await fetchText(sitemapUrl);
  if (!xml) { log(`  Failed (skipping): ${sitemapUrl}`); return; }

  // Some sites serve JS-rendered 404 pages at sitemap URLs - detect this
  if (xml.trim().startsWith('<!DOCTYPE') || xml.trim().startsWith('<html')) {
    log(`  Got HTML instead of XML (skipping): ${sitemapUrl}`);
    return;
  }

  const { sitemapUrls, pageUrls } = parseSitemap(xml);

  // Recurse into child sitemaps first
  for (const child of sitemapUrls) {
    await processSitemap(child);
  }

  // Add page URLs up to limit
  let added = 0;
  for (const u of pageUrls) {
    if (added >= limitPerSitemap) break;
    if (u.includes(domain)) {
      allUrls.add(u);
      added++;
    }
  }
  if (added > 0) log(`  +${added} URLs (total: ${allUrls.size})`);
}

for (const ref of sitemapRefs) {
  await processSitemap(ref);
}

log(`\nTotal URLs discovered: ${allUrls.size}`);

if (allUrls.size === 0) {
  log('WARNING: No URLs found. Check that the domain is correct and sitemaps are accessible.');
}

// --- Step 3: Group by template pattern ---
const freqMap = buildFreqMap([...allUrls]);
const byTemplate = new Map();
for (const u of allUrls) {
  const tmpl = urlTemplate(u, freqMap);
  if (!byTemplate.has(tmpl)) byTemplate.set(tmpl, []);
  byTemplate.get(tmpl).push(u);
}

// Sort by count descending
const patterns = [...byTemplate.entries()]
  .sort((a, b) => b[1].length - a[1].length)
  .map(([pattern, urls]) => ({
    pattern,
    count: urls.length,
    sample: urls.slice(0, samplePerPattern),
    allUrls: urls,
  }));

// --- Output ---
if (jsonMode) {
  // Strip allUrls from JSON output to keep it manageable
  const out = {
    domain,
    baseUrl,
    discoveredAt: new Date().toISOString(),
    totalUrls: allUrls.size,
    totalPatterns: patterns.length,
    patterns: patterns.map(({ pattern, count, sample }) => ({ pattern, count, sample })),
  };
  console.log(JSON.stringify(out, null, 2));
  process.exit(0);
}

// Text output
console.log(`\n=== URL Discovery: ${domain} ===`);
console.log(`Total URLs: ${allUrls.size}`);
console.log(`Templates:  ${patterns.length}`);
console.log('');
for (const { pattern, count, sample } of patterns) {
  console.log(`[${String(count).padStart(4)}] ${pattern}`);
  for (const u of sample) {
    console.log(`         ${u}`);
  }
}

function log(msg) {
  // Always to stderr so stdout stays clean for piping
  process.stderr.write(msg + '\n');
}
