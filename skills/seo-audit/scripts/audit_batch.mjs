/**
 * audit_batch.mjs - concurrent batch runner for audit_page.mjs
 * Usage:
 *   node audit_batch.mjs --urls urls.txt    --output /tmp/audit-results
 *   node audit_batch.mjs --urls urls.json   --output /tmp/audit-results  (discover_urls.mjs JSON)
 *   node audit_batch.mjs --urls urls.txt    --output /tmp/audit-results  --concurrency 3 --retries 2
 *
 * Input formats:
 *   Plain text: one URL per line
 *   JSON: discover_urls.mjs output ({ patterns: [{ sample: [...] }] }) OR a plain URL array
 *
 * Output: one <slug>.json file per URL in --output directory.
 * Each file contains the full PageAudit object from audit_page.mjs --json.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { spawn } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const auditScript = resolve(__dir, 'audit_page.mjs');

// --- CLI args ---
const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}

const urlsFile   = getArg('--urls');
const outputDir  = getArg('--output') ?? 'results';
const concurrency = parseInt(getArg('--concurrency') ?? '3', 10);
const maxRetries  = parseInt(getArg('--retries') ?? '2', 10);

if (!urlsFile) {
  console.error([
    'Usage: node audit_batch.mjs --urls <file> --output <dir> [--concurrency 3] [--retries 2]',
    '',
    'File formats:',
    '  Plain text: one URL per line',
    '  JSON: discover_urls.mjs output or plain URL array',
  ].join('\n'));
  process.exit(1);
}

// --- Load URLs ---
let urls = [];
try {
  const content = readFileSync(urlsFile, 'utf8');
  if (urlsFile.endsWith('.json')) {
    const parsed = JSON.parse(content);
    if (parsed.patterns) {
      // discover_urls.mjs output - flatten samples
      urls = parsed.patterns.flatMap(p => p.sample ?? []);
    } else if (Array.isArray(parsed)) {
      urls = parsed;
    } else {
      console.error('JSON file must be an array of URLs or discover_urls.mjs output');
      process.exit(1);
    }
  } else {
    urls = content.split('\n').map(l => l.trim()).filter(l => l.startsWith('http'));
  }
} catch (e) {
  console.error(`Failed to read ${urlsFile}: ${e.message}`);
  process.exit(1);
}

if (urls.length === 0) {
  console.error('No URLs found in input file');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

console.log(`Auditing ${urls.length} URLs  concurrency=${concurrency}  retries=${maxRetries}`);
console.log(`Output → ${resolve(outputDir)}\n`);

// --- Slug: URL → safe filename ---
function urlSlug(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/[^a-zA-Z0-9-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .slice(0, 120);
}

// --- Run a single audit as child process ---
function runAudit(url) {
  return new Promise(resolve => {
    let stdout = '';
    let stderr = '';

    const proc = spawn('node', [auditScript, url, '--json'], {
      env: process.env,
    });

    proc.stdout.on('data', d => { stdout += d; });
    proc.stderr.on('data', d => { stderr += d; });

    const timeout = setTimeout(() => {
      proc.kill('SIGTERM');
      resolve({ url, auditedAt: new Date().toISOString(), error: 'Timeout after 60s', issues: [{ severity: 'critical', code: 'TIMEOUT', message: 'Audit timed out after 60s' }] });
    }, 60000);

    proc.on('close', code => {
      clearTimeout(timeout);
      if (stdout.trim()) {
        try {
          resolve(JSON.parse(stdout.trim()));
          return;
        } catch {}
      }
      resolve({
        url,
        auditedAt: new Date().toISOString(),
        error: `Exit ${code}: ${stderr.slice(0, 200)}`,
        issues: [{ severity: 'critical', code: 'AUDIT_ERROR', message: `Audit process failed (exit ${code})` }],
      });
    });
  });
}

// --- Retry wrapper ---
async function auditWithRetry(url) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const result = await runAudit(url);
    if (!result.error) return result;
    if (attempt < maxRetries) {
      const delay = 2000 * (attempt + 1);
      process.stderr.write(`  Retry ${attempt + 1}/${maxRetries} for ${url} (${result.error})\n`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  return { url, auditedAt: new Date().toISOString(), error: 'Failed after all retries', issues: [{ severity: 'critical', code: 'FETCH_FAILED', message: 'Failed after all retries' }] };
}

// --- Concurrency pool ---
async function runPool(items, fn, limit) {
  const results = new Array(items.length);
  let index = 0;
  async function worker() {
    while (true) {
      const i = index++;
      if (i >= items.length) break;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array(Math.min(limit, items.length)).fill(null).map(() => worker()));
  return results;
}

// --- Run ---
const startTime = Date.now();
let completed = 0;

const results = await runPool(urls, async (url, idx) => {
  process.stdout.write(`[${String(idx + 1).padStart(String(urls.length).length)}/${urls.length}] ${url}\n`);
  const result = await auditWithRetry(url);
  completed++;

  const filename = `${outputDir}/${urlSlug(url)}.json`;
  writeFileSync(filename, JSON.stringify(result, null, 2));

  // Inline summary
  const issues = result.issues ?? [];
  const c = issues.filter(i => i.severity === 'critical').length;
  const h = issues.filter(i => i.severity === 'high').length;
  const m = issues.filter(i => i.severity === 'medium').length;
  const l = issues.filter(i => i.severity === 'low').length;
  const statusPad = String(result.http?.statusCode ?? '?').padEnd(3);
  process.stdout.write(`  → ${statusPad}  issues: ${c}C ${h}H ${m}M ${l}L\n`);

  return result;
}, concurrency);

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
const errors  = results.filter(r => r.error).length;

console.log(`\nDone in ${elapsed}s. ${results.length} pages  ${errors ? `${errors} errors  ` : ''}→ ${resolve(outputDir)}`);
console.log(`\nNext step: node ${resolve(__dir, 'aggregate.mjs')} ${resolve(outputDir)}`);
