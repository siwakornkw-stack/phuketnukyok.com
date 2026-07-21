// Regenerate the redirects block in vercel.json.
// Run:  node scripts/build-redirects.mjs
//
// Source of truth for legacy URL -> new page. Edit LEGACY below, rerun, redeploy.
// Every rule is emitted in four forms because both variations occur in the wild:
//   - uppercase and lowercase percent-encoding (%E0 vs %e0)
//   - with and without a trailing slash
// Destinations are absolute so they resolve to the canonical host even when the
// request arrives on nukyok.com.

import { readFileSync, writeFileSync } from 'node:fs';

const CANONICAL = 'https://phuketnukyok.com';

// Old path -> new path. Mapping derived from the archived content of each page.
const LEGACY = {
  // crane
  '/ให้เช่ารถเครน-ภูเก็ต': '/services/crane',
  '/เช่าเครน-ภูเก็ต': '/services/crane',
  '/อุตสาหกรรมเครน': '/services/crane',
  '/cha-crane-phuket': '/services/crane',
  '/crane-rental-phuket': '/services/crane',
  '/backhoe-crane-rental-thalang': '/services/crane',

  // backhoe - also absorbs pipe laying and land clearing, which the new site
  // covers inside the backhoe service rather than as separate pages
  '/ให้เช่ารถแบคโฮ-ภูเก็ต': '/services/backhoe',
  '/เช่าแบคโฮ-ภูเก็ต': '/services/backhoe',
  '/เช่าแบคโฮถลาง': '/services/backhoe',
  '/รถเช่าแม็คโคร': '/services/backhoe',
  '/รับเคลียร์ริ่งพื้นที่': '/services/backhoe',
  '/เคลียร์ริ่งพื้นที่-ภูเก': '/services/backhoe',
  '/ปรับพื้นที่-ภูเก็ต': '/services/backhoe',
  '/วางท่อ-ภูเก็ต': '/services/backhoe',
  '/backhoe-rental-phuket': '/services/backhoe',
  '/excavator-rental-phangnga': '/services/backhoe',
  '/area-adjustment-phuket': '/services/backhoe',
  '/land-clearing-phuket': '/services/backhoe',
  '/pipe-laying-service': '/services/backhoe',
  '/pipe-installation-thalang-phuketnakyok': '/services/backhoe',

  // materials
  '/ขายหินจังหวัดภูเก็ต': '/services/materials',
  '/ขายหิน-ภูเก็ต': '/services/materials',
  '/รับถมที่ภูเก็ต': '/services/materials',
  '/ถมดิน-ภูเก็ต': '/services/materials',
  '/land-filling-phuket': '/services/materials',
  '/sell-construction-and-decorative-stones': '/services/materials',

  // demolition
  '/รับรื้อถอนภูเก็ต': '/services/demolition',
  '/รับรื้อถอน-ภูเก็ต': '/services/demolition',
  '/รื้อถอนภูเก็ต': '/services/demolition',
  '/building-demolition-phuket': '/services/demolition',
  '/demolition-thalang-phuketnakyok': '/services/demolition',

  // container - WordPress truncated the Thai slug mid-word, keep both spellings
  '/ขาย-เช่า-ตู้คอนเทนเนอร์': '/services/container',
  '/เช่าตู้คอนเทนเนอร์-ภูเก': '/services/container',
  '/เช่าตู้คอนเทนเนอร์-ภูเก็ต': '/services/container',
  '/container-rental-and-sale-phuket': '/services/container',

  // truck crane
  '/blog/ให้เช่ารถ-6-ล้อ-ภูเก็ต': '/services/truck-crane',

  // service index
  '/บริการ': '/services',
  '/เช่าเครื่องจักรภูเก็ต': '/services',
  '/service': '/services',
  '/service-detail': '/services',
  '/construction-equipment-rental-phuket': '/services',

  // road roller lives on the fleet page, which lists รถบด SAKAI
  '/phuket-road-roller-rental': '/fleet',

  // gallery and static pages
  '/ผลงานรื้อถอน': '/works',
  '/gallery': '/works',
  '/เกี่ยวกับเรา': '/about',
  '/about-us': '/about',
  '/ติดต่อเรา': '/contact',
  '/contact-us': '/contact',

  // legacy blog posts folded into service pages
  '/blog/เช่ารถเครนในจังหวัดภูเก็ต': '/services/crane',
  '/blog/เช่ารถเครนในจังหวัดภูเก็ต-พังงา-กระบี่': '/services/crane',
  '/blog/เช่ารถแบ็คโฮ-ภูเก็ต': '/services/backhoe',
  '/blog/ขายทราย-ภูเก็ต': '/services/materials',
  '/blog/รับถมที่-ภูเก็ต': '/services/materials',
  '/blog/รับถมที่-': '/services/materials',
  '/blog/งานทุบตึก-ภูเก็ต': '/services/demolition',
  '/blog/รื้อถอนอาคาร-งานทุบตึก-ภูเก็ต': '/services/demolition',
  '/blog/รื้อถอนอาคาร-งานทุบตึก-': '/services/demolition',
  '/blog/เช่ารถภูเก็ต': '/',
  '/blog/รถตู้-vip-ภูเก็ต-บริการรถตู้นำเที่ยวภูเก็ต': '/',
};

// Encode a Thai path the way a browser does, keeping - and / literal.
const enc = (p) =>
  p
    .split('/')
    .map((seg) => encodeURIComponent(seg).replace(/%2D/g, '-'))
    .join('/');

const redirects = [];
const seen = new Set();
const push = (source, destination) => {
  if (seen.has(source)) return;
  seen.add(source);
  redirects.push({ source, destination, permanent: true });
};

for (const [oldPath, newPath] of Object.entries(LEGACY)) {
  const upper = enc(oldPath);
  const lower = upper.replace(/%[0-9A-F]{2}/g, (m) => m.toLowerCase());
  const destination = CANONICAL + newPath;
  for (const base of new Set([upper, lower])) {
    push(base, destination);
    push(base + '/', destination);
  }
}

// Anything else arriving on the old host goes to the matching path on the
// canonical host. Must stay last: it matches everything.
redirects.push({
  source: '/:path*',
  has: [{ type: 'host', value: 'nukyok.com' }],
  destination: `${CANONICAL}/:path*`,
  permanent: true,
});
redirects.push({
  source: '/:path*',
  has: [{ type: 'host', value: 'www.nukyok.com' }],
  destination: `${CANONICAL}/:path*`,
  permanent: true,
});

const f = new URL('../vercel.json', import.meta.url);
const cfg = JSON.parse(readFileSync(f, 'utf8'));
cfg.redirects = redirects;
writeFileSync(f, JSON.stringify(cfg, null, 2) + '\n');

console.log(`${Object.keys(LEGACY).length} legacy paths -> ${redirects.length} rules`);
