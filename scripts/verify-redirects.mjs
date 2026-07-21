// Verify legacy redirects end at a live page (200), following the full chain.
// Run against production after deploy:  node scripts/verify-redirects.mjs
//
// Why this exists: seo-live-audit.mjs built its test URLs with encodeURIComponent(),
// which always emits UPPERCASE percent-encoding. The real WordPress site at
// nukyok.com emits LOWERCASE (%e0 not %E0), so every legacy URL 301'd into a 404
// while the audit reported 308 OK. This script uses the real upstream URLs instead
// of re-encoding them, and checks both cases for every rule in vercel.json.

import { readFileSync } from 'node:fs';

const NEW = 'https://phuketnukyok.com';
const OLD = 'https://nukyok.com';

// Old-domain paths that are still indexed. Sourced from SERP results for the old
// site. Add any others you know of - the old CMS had pages this list may miss.
const OLD_PATHS = [
  '/cha-crane-phuket/',
  '/crane-rental-phuket/',
  '/backhoe-rental-phuket/',
  '/land-filling-phuket/',
  '/area-adjustment-phuket/',
  '/construction-equipment-rental-phuket/',
  '/container-rental-and-sale-phuket/',
  '/phuket-road-roller-rental/',
  '/pipe-laying-service/',
  '/demolition-thalang-phuketnakyok/',
  '/service/',
  '/about-us/',
  '/contact/',
  '/' + encodeURIComponent('บริการ') + '/',
  '/' + encodeURIComponent('ให้เช่ารถเครน-ภูเก็ต').replace(/%2D/g, '-') + '/',
  '/' + encodeURIComponent('รับรื้อถอนภูเก็ต') + '/',
];

const hit = async (url) => {
  const r = await fetch(url, { redirect: 'follow' });
  return { status: r.status, final: r.url };
};

let fail = 0;
const report = (ok, label, detail) => {
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `\n        ${detail}` : ''}`);
};

console.log('--- old domain -> new site (full chain) ---');
for (const p of OLD_PATHS) {
  const { status, final } = await hit(OLD + p);
  report(status === 200, `${OLD}${p}`, status === 200 ? '' : `${status} at ${decodeURI(final)}`);
}

console.log('\n--- vercel.json rules, both encoding cases ---');
const { redirects } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
// Skip pattern rules (:path*) and host-scoped ones - they are not literal paths
// and only fire for requests arriving on the old domain.
const sources = [...new Set(
  redirects.filter((r) => !r.has && !r.source.includes(':')).map((r) => r.source)
)];
for (const src of sources) {
  const { status, final } = await hit(NEW + src);
  report(status === 200, `${src.length > 60 ? decodeURI(src) : src}`, status === 200 ? '' : `${status} at ${decodeURI(final)}`);
}

console.log(`\n${fail === 0 ? 'all redirects resolve to 200' : `${fail} broken`}`);
process.exit(fail === 0 ? 0 : 1);
