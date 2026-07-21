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
// [old path, page it must end on]. Checking only for a 200 is not enough: while
// nukyok.com still points at Wix, its catch-all drops the path and everything
// lands on the home page - which is a 200, and would pass a status-only check
// while the migration is still broken.
const th = (s) => '/' + encodeURIComponent(s).replace(/%2D/g, '-') + '/';
const OLD_PATHS = [
  ['/cha-crane-phuket/', '/services/crane'],
  ['/crane-rental-phuket/', '/services/crane'],
  [th('ให้เช่ารถเครน-ภูเก็ต'), '/services/crane'],
  ['/backhoe-rental-phuket/', '/services/backhoe'],
  ['/pipe-laying-service/', '/services/backhoe'],
  ['/area-adjustment-phuket/', '/services/backhoe'],
  ['/land-filling-phuket/', '/services/materials'],
  [th('ขายหินจังหวัดภูเก็ต'), '/services/materials'],
  ['/demolition-thalang-phuketnakyok/', '/services/demolition'],
  [th('รับรื้อถอนภูเก็ต'), '/services/demolition'],
  ['/container-rental-and-sale-phuket/', '/services/container'],
  ['/road-construction-contractor-phuket/', '/services/road'],
  [th('รับสร้างถนนภูเก็ต'), '/services/road'],
  ['/phuket-road-roller-rental/', '/fleet'],
  [th('ผลงานรื้อถอน'), '/works'],
  ['/construction-equipment-rental-phuket/', '/services'],
  ['/service/', '/services'],
  [th('บริการ'), '/services'],
  ['/about-us/', '/about'],
  ['/contact/', '/contact'],
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
let toHome = 0;
for (const [p, want] of OLD_PATHS) {
  const { status, final } = await hit(OLD + p);
  const landed = new URL(final).pathname.replace(/\/$/, '') || '/';
  const ok = status === 200 && landed === want;
  if (ok) {
    report(true, `${decodeURI(p)} -> ${want}`);
  } else {
    if (landed === '/') toHome++;
    report(false, decodeURI(p), `want ${want}, got ${status} ${decodeURI(landed)}`);
  }
}
if (toHome) {
  console.log(`\n  ${toHome} landed on the home page - nukyok.com is still on Wix,`);
  console.log(`  whose catch-all drops the path. Point its A record at 76.76.21.21.`);
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
