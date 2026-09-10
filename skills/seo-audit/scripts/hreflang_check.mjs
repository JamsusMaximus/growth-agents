/**
 * hreflang_check.mjs - hreflang reciprocity validator
 * Usage:
 *   node hreflang_check.mjs <results-dir>     (reads existing audit_batch JSON results)
 *   node hreflang_check.mjs results/*.json
 *
 * Checks:
 *   1. Every (page → locale → href) triple has a reciprocal (href → locale → page)
 *   2. x-default is set on pages with hreflang
 *   3. No declared hreflang target returns 404 (if status is in the result data)
 *   4. All pages in an hreflang group declare the same set of locales (consistency)
 *
 * For a full check, run audit_batch.mjs first to build the JSON corpus, then
 * pass the results directory here.
 *
 * If a declared hreflang target URL is not in the corpus, it is flagged as
 * UNVERIFIED (you may need to audit it separately).
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// --- Collect input files ---
const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node hreflang_check.mjs <results-dir-or-files...>');
  process.exit(1);
}

let files = [];
for (const arg of args) {
  try {
    if (statSync(arg).isDirectory()) {
      files.push(...readdirSync(arg).filter(f => f.endsWith('.json')).map(f => join(arg, f)));
    } else {
      files.push(arg);
    }
  } catch { files.push(arg); }
}

// --- Load results ---
const pages = [];
for (const f of files) {
  try {
    const r = JSON.parse(readFileSync(f, 'utf8'));
    if (r.url && r.hreflang) pages.push(r);
  } catch {}
}

if (!pages.length) {
  console.error('No valid audit results with hreflang data found');
  process.exit(1);
}

// --- Build hreflang map: pageUrl → Map<locale, href> ---
// Also need the reverse map for reciprocity checks
// Note: hreflang entries in the page's audit result contain the LOCALE strings
// (e.g. ["de", "en", "fr"]) but NOT the hrefs. We need the rawHtml to get href values.
//
// Since audit_page.mjs only stores locales (not hrefs), we need to re-derive hrefs.
// Strategy: use the URL patterns we know. For pages with hreflang, the hreflang
// href for a given locale is typically in the same sitemap / page set we already crawled.
//
// We build a best-effort map using the crawled URL set and locale patterns:
//   - If page /en/foo has locales [de, en, fr] and we have /de/foo in our corpus,
//     then /de/foo is the German hreflang target.
//
// For a proper check, we use the audit result metadata which includes hreflang
// locales from the <head>. The HREF values come from re-parsing the rawHtml -
// but audit_page.mjs does not store the full href map.
//
// We therefore do a cross-reference check using what we have:
//   - Pages that DECLARE hreflang locales
//   - Whether other pages in the corpus have reciprocal locale sets

// Build a set of all audited URLs (normalised)
const auditedUrls = new Map(); // url → pageResult
for (const p of pages) {
  auditedUrls.set(normaliseUrl(p.url), p);
}

// Attempt to read hreflang hrefs from the result if we ever store them
// For now, use a locale-presence based reciprocity model:
// Group pages by their hreflang locale set signature

// Pages with hreflang
const hreflangPages = pages.filter(p => p.hreflang.locales.length > 0);

if (!hreflangPages.length) {
  console.log('No pages with hreflang tags found in results.');
  process.exit(0);
}

// --- Checks ---
const issues = [];
const iss = (severity, url, code, message) => issues.push({ severity, url, code, message });

// Group pages by locale set signature (sorted locales joined)
const byLocaleSet = new Map();
for (const p of hreflangPages) {
  const sig = p.hreflang.locales.join(',');
  if (!byLocaleSet.has(sig)) byLocaleSet.set(sig, []);
  byLocaleSet.get(sig).push(p);
}

// Check 1: x-default missing
for (const p of hreflangPages) {
  if (!p.hreflang.hasXDefault) {
    iss('medium', p.url, 'XDEFAULT_MISSING', `Hreflang set (${p.hreflang.locales.join(', ')}) but x-default not declared`);
  }
}

// Check 2: Inconsistent locale sets across pages that should be in the same group
// Heuristic: pages with the same URL structure but different locale prefixes
// should declare identical locale sets
const localeSetCounts = [...byLocaleSet.entries()].sort((a, b) => b[1].length - a[1].length);
const dominantSig = localeSetCounts[0]?.[0] ?? '';
const dominantLocales = new Set(dominantSig.split(',').filter(Boolean));

for (const p of hreflangPages) {
  const sig = p.hreflang.locales.join(',');
  if (sig !== dominantSig && dominantSig) {
    const pageLocs = new Set(p.hreflang.locales);
    const missing  = [...dominantLocales].filter(l => !pageLocs.has(l));
    const extra    = [...pageLocs].filter(l => !dominantLocales.has(l));
    if (missing.length) {
      iss('high', p.url, 'HREFLANG_INCONSISTENT',
        `Missing locales vs majority of site: ${missing.join(', ')}  (majority set: ${dominantSig})`);
    }
    if (extra.length) {
      iss('medium', p.url, 'HREFLANG_EXTRA',
        `Extra locales not in majority set: ${extra.join(', ')}`);
    }
  }
}

// Check 3: Pages with status 404 that are likely hreflang targets
// (these are in our corpus, we know they 404)
for (const p of pages) {
  const status = p.http?.statusCode;
  if ((status === 404 || status === '404') && hreflangPages.length > 0) {
    // Check if any other page's hreflang locale set would include this URL
    // Heuristic: if this URL has a locale prefix and other pages declare that locale
    try {
      const { pathname } = new URL(p.url);
      const seg = pathname.split('/')[1]; // e.g. 'de', 'en-ie'
      const localePagesWith = hreflangPages.filter(hp => hp.hreflang.locales.includes(seg));
      if (localePagesWith.length > 0) {
        iss('critical', p.url, 'HREFLANG_TARGET_404',
          `Page returns 404 but is likely an hreflang target for locale "${seg}" (${localePagesWith.length} pages declare this locale)`);
      }
    } catch {}
  }
}

// Check 4: Reciprocity using URL pattern matching
// For each hreflang page, infer what the target URLs should look like and check
// if they appear in our corpus with the reciprocal locale.
//
// Strategy: if /en/foo declares locales [de, en, fr], look for /de/foo and /fr/foo
// in the corpus and verify they also declare the same locale set (transitively reciprocal).
for (const p of hreflangPages) {
  try {
    const { pathname } = new URL(p.url);
    const segments = pathname.split('/');
    const localePrefix = segments[1]; // e.g. 'en', 'de', 'fr'

    for (const targetLocale of p.hreflang.locales) {
      if (targetLocale === 'x-default' || targetLocale === localePrefix) continue;

      // Build expected target URL: swap locale prefix
      const expectedPath = '/' + [targetLocale, ...segments.slice(2)].join('/');
      const expectedUrl  = new URL(p.url).origin + expectedPath;
      const normExpected = normaliseUrl(expectedUrl);

      const targetPage = auditedUrls.get(normExpected);
      if (!targetPage) {
        // Not in corpus - can't verify
        iss('low', p.url, 'HREFLANG_UNVERIFIED',
          `Hreflang target for "${targetLocale}" (${expectedUrl}) not in crawl corpus - audit it separately`);
        continue;
      }

      // Target exists - does it declare the source locale?
      if (!targetPage.hreflang.locales.includes(localePrefix)) {
        iss('high', p.url, 'HREFLANG_NOT_RECIPROCAL',
          `${expectedUrl} does not declare hreflang for "${localePrefix}" (pointing back here)`);
      }
    }
  } catch {}
}

// --- Output ---
const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
const sorted = issues.sort((a, b) =>
  severityOrder[a.severity] - severityOrder[b.severity] ||
  a.url.localeCompare(b.url)
);

console.log(`\n${'═'.repeat(70)}`);
console.log('  HREFLANG RECIPROCITY CHECK');
console.log(`  Pages with hreflang: ${hreflangPages.length} / ${pages.length}`);
console.log(`  Issues found: ${sorted.length}`);
console.log(`${'═'.repeat(70)}\n`);

if (!sorted.length) {
  console.log('No hreflang issues detected in the crawled corpus.');
} else {
  // Group by severity
  for (const sev of ['critical', 'high', 'medium', 'low']) {
    const group = sorted.filter(i => i.severity === sev);
    if (!group.length) continue;
    console.log(`${sev.toUpperCase()} (${group.length})`);
    for (const issue of group) {
      const shortUrl = issue.url.replace(/^https?:\/\//, '').slice(0, 60);
      console.log(`  [${issue.code}] ${shortUrl}`);
      console.log(`    ${issue.message}`);
    }
    console.log('');
  }
}

// Locale set summary
console.log('LOCALE SET DISTRIBUTION');
for (const [sig, pgs] of localeSetCounts) {
  const locales = sig || '(none)';
  console.log(`  [${pgs.length} pages] ${locales}`);
  if (pgs.length <= 3) {
    for (const p of pgs) console.log(`    ${p.url}`);
  }
}
console.log('');

function normaliseUrl(url) {
  try {
    const u = new URL(url);
    return u.hostname + u.pathname.replace(/\/$/, '');
  } catch { return url; }
}
