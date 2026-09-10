/**
 * aggregate.mjs - summarise a set of audit_page.mjs JSON results
 * Usage:
 *   node aggregate.mjs <results-dir>
 *   node aggregate.mjs results/*.json
 *
 * Produces a site-wide SEO summary:
 *   - Issue frequency table sorted by severity then page count
 *   - Page-level summary table with per-page issue counts
 *   - Quick-wins section
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// --- Collect input files ---
const args = process.argv.slice(2);
if (!args.length) {
  console.error('Usage: node aggregate.mjs <results-dir-or-files...>');
  process.exit(1);
}

let files = [];
for (const arg of args) {
  try {
    if (statSync(arg).isDirectory()) {
      files.push(
        ...readdirSync(arg)
          .filter(f => f.endsWith('.json'))
          .map(f => join(arg, f))
      );
    } else {
      files.push(arg);
    }
  } catch { files.push(arg); }
}

if (!files.length) {
  console.error('No JSON files found');
  process.exit(1);
}

// --- Load results ---
const pages = [];
for (const f of files) {
  try {
    const r = JSON.parse(readFileSync(f, 'utf8'));
    if (r.url) pages.push(r);
  } catch {}
}

if (!pages.length) {
  console.error('No valid audit results found');
  process.exit(1);
}

// --- Aggregate issue counts ---
const issueCounts = new Map(); // code → { severity, message, urls: [] }

for (const page of pages) {
  for (const issue of (page.issues ?? [])) {
    if (!issueCounts.has(issue.code)) {
      issueCounts.set(issue.code, { severity: issue.severity, message: issue.message, urls: [] });
    }
    issueCounts.get(issue.code).urls.push(page.url);
  }
}

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

const sortedIssues = [...issueCounts.entries()]
  .map(([code, data]) => ({ code, ...data }))
  .sort((a, b) =>
    severityOrder[a.severity] - severityOrder[b.severity] ||
    b.urls.length - a.urls.length
  );

// --- Status distribution ---
const statusCounts = {};
for (const p of pages) {
  const s = String(p.http?.statusCode ?? '?');
  statusCounts[s] = (statusCounts[s] ?? 0) + 1;
}

// --- Page-level summary ---
const pageSummaries = pages.map(p => {
  const issues = p.issues ?? [];
  return {
    url: p.url,
    status: p.http?.statusCode ?? '?',
    c: issues.filter(i => i.severity === 'critical').length,
    h: issues.filter(i => i.severity === 'high').length,
    m: issues.filter(i => i.severity === 'medium').length,
    l: issues.filter(i => i.severity === 'low').length,
    total: issues.length,
    topIssues: issues.filter(i => i.severity === 'critical' || i.severity === 'high').map(i => i.code),
  };
}).sort((a, b) => (severityOrder[b.topIssues[0]] ?? 99) - (severityOrder[a.topIssues[0]] ?? 99) || b.total - a.total);

// Infer site domain
const domains = [...new Set(pages.map(p => { try { return new URL(p.url).hostname; } catch { return '?'; } }))];

// --- Render ---
const n = pages.length;
const bar = (count, total, width = 20) => {
  const filled = Math.round((count / total) * width);
  return '█'.repeat(filled) + '░'.repeat(width - filled);
};

console.log(`\n${'═'.repeat(70)}`);
console.log(`  SEO AUDIT SUMMARY`);
console.log(`  Site:   ${domains.join(', ')}`);
console.log(`  Pages:  ${n}   |   Audited: ${pages[0]?.auditedAt?.slice(0, 10) ?? 'unknown'}`);
console.log(`${'═'.repeat(70)}`);

// HTTP status distribution
console.log('\nHTTP STATUS');
for (const [status, count] of Object.entries(statusCounts).sort()) {
  console.log(`  ${status}  ${bar(count, n)}  ${count}/${n}`);
}

// Issues by severity group
for (const sev of ['critical', 'high', 'medium', 'low']) {
  const group = sortedIssues.filter(i => i.severity === sev);
  if (!group.length) continue;
  const label = sev.toUpperCase().padEnd(8);
  const pagesAffected = new Set(group.flatMap(i => i.urls)).size;
  console.log(`\n${label}  (${pagesAffected}/${n} pages affected)`);
  console.log(`  ${'CODE'.padEnd(28)} ${'PAGES'.padEnd(8)} COVERAGE`);
  console.log(`  ${'─'.repeat(60)}`);
  for (const issue of group) {
    const count = issue.urls.length;
    const pct   = Math.round((count / n) * 100);
    console.log(`  ${issue.code.padEnd(28)} ${String(count).padStart(2)}/${n}     ${bar(count, n, 16)}  ${pct}%`);
  }
}

// Page-level table
console.log(`\n${'─'.repeat(70)}`);
console.log('PAGE SUMMARY  (sorted by severity)');
console.log(`  ${'URL'.padEnd(52)} STATUS  C  H  M  L`);
console.log(`  ${'─'.repeat(68)}`);
for (const p of pageSummaries) {
  const urlShort = p.url.replace(/^https?:\/\//, '').slice(0, 51).padEnd(52);
  const status   = String(p.status).padEnd(7);
  const flag     = p.c > 0 ? ' ◄ CRITICAL' : p.h > 0 ? ' ◄ HIGH' : '';
  console.log(`  ${urlShort} ${status} ${p.c}  ${p.h}  ${p.m}  ${p.l}${flag}`);
}

// Quick wins: issues affecting ≥50% of pages and fixable
const QUICK_WIN_CODES = new Set([
  'OG_IMAGE_MISSING', 'TWITTER_CARD_MISSING', 'OG_TITLE_MISSING',
  'HREFLANG_NO_XDEFAULT', 'META_DESC_MISSING', 'SCHEMA_NONE', 'LANG_MISSING',
]);

const quickWins = sortedIssues.filter(i =>
  QUICK_WIN_CODES.has(i.code) && i.urls.length / n >= 0.5
);

if (quickWins.length) {
  console.log(`\n${'─'.repeat(70)}`);
  console.log('QUICK WINS  (affects ≥50% of pages, likely a global template fix)');
  for (const w of quickWins) {
    console.log(`  [${w.severity.toUpperCase()}]  ${w.code}  →  ${w.message}`);
    console.log(`           Affects ${w.urls.length}/${n} pages - fix in template, not per-page`);
  }
}

// Critical pages that need immediate attention
const criticalPages = pageSummaries.filter(p => p.c > 0);
if (criticalPages.length) {
  console.log(`\n${'─'.repeat(70)}`);
  console.log('PAGES NEEDING IMMEDIATE ATTENTION');
  for (const p of criticalPages) {
    console.log(`  ${p.url}`);
    console.log(`    ${p.topIssues.map(c => issueCounts.get(c)?.message ?? c).join(' | ')}`);
  }
}

console.log(`\n${'═'.repeat(70)}\n`);
