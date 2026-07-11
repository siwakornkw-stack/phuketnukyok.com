import { readFile, writeFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('kw-research.json', 'utf8'));
const all = data.flatMap((c) => c.keywords.map((k) => ({ ...k, cat: c.category })));

// dedup by keyword text, keep the strongest tier / best signal
const byKw = new Map();
for (const k of all) {
  const ex = byKw.get(k.keyword);
  const rank = { high: 3, medium: 2, low: 1 };
  if (!ex || rank[k.tier] > rank[ex.tier]) byKw.set(k.keyword, k);
}
const uniq = [...byKw.values()];

const tierS = { high: 3, medium: 2, low: 1 };
const intentS = { commercial: 2, local: 2, navigational: 1, informational: 0 };
const compS = { low: 2, medium: 1, high: 0 }; // winnable bonus
const score = (k) => tierS[k.tier] * 2 + (intentS[k.intent] ?? 0) + (compS[k.competition] ?? 0);

// group by page
const pages = {};
for (const k of uniq) {
  const url = (k.mapToUrl || '').startsWith('/blog') ? '/blog' : (k.mapToUrl || 'unmapped');
  (pages[url] ??= []).push(k);
}
for (const url in pages) pages[url].sort((a, b) => score(b) - score(a));

const pageOrder = ['/', '/services/crane', '/services/truck-crane', '/services/backhoe', '/services/container', '/services/materials', '/services/demolition', '/works', '/contact', '/blog'];
const pageName = {
  '/': 'หน้าแรก', '/services/crane': 'เช่าเครน', '/services/truck-crane': 'รถ 6 ล้อ/เฮี๊ยบ',
  '/services/backhoe': 'แบคโฮ', '/services/container': 'ตู้คอนเทนเนอร์', '/services/materials': 'หิน ดิน ทราย',
  '/services/demolition': 'รับรื้อถอน', '/works': 'ผลงาน', '/contact': 'ติดต่อ', '/blog': 'บทความ',
};

let md = '# Keyword Map — phuketnukyok.com\n\ntier = ประมาณการ demand จาก signal จริง (Google autocomplete TH relevance, related, competitor SERP) ไม่ใช่ตัวเลข metered ต่อเดือน\n\n';

// per-page primary/secondary
md += '## Primary keyword ต่อหน้า\n\n';
md += '| หน้า | Primary (target หลัก) | Secondary | intent | comp |\n|---|---|---|---|---|\n';
for (const url of pageOrder) {
  const ks = pages[url];
  if (!ks || !ks.length) continue;
  const primary = ks[0];
  const secondary = ks.slice(1, 6).map((k) => k.keyword).join(', ');
  md += `| ${pageName[url] || url}<br>\`${url}\` | **${primary.keyword}** (${primary.tier}) | ${secondary || '-'} | ${primary.intent} | ${primary.competition} |\n`;
}

// global top opportunities
const opp = uniq
  .filter((k) => k.intent === 'commercial' || k.intent === 'local')
  .sort((a, b) => score(b) - score(a));
md += '\n## Top Opportunities (คุ้มสุด — เรียงคะแนน demand x intent x winnable)\n\n';
md += '| # | Keyword | tier | comp | intent | หน้า |\n|---|---|---|---|---|---|\n';
opp.slice(0, 25).forEach((k, i) => {
  md += `| ${i + 1} | ${k.keyword} | ${k.tier} | ${k.competition} | ${k.intent} | \`${k.mapToUrl}\` |\n`;
});

// high tier + low/medium competition = quick wins
const quickWins = uniq.filter((k) => k.tier === 'high' && k.competition !== 'high' && (k.intent === 'local' || k.intent === 'commercial')).sort((a, b) => score(b) - score(a));
md += '\n## Quick wins (tier สูง + competition ไม่โหด — เจาะได้เร็ว)\n\n';
quickWins.forEach((k) => { md += `- **${k.keyword}** (${k.competition} comp, ${k.intent}) → \`${k.mapToUrl}\`\n`; });

// blog ideas (informational)
const blog = uniq.filter((k) => k.intent === 'informational' || (k.mapToUrl || '').startsWith('/blog'));
md += '\n## Blog ideas (informational demand → ดึง traffic ต้นทาง)\n\n';
blog.forEach((k) => { md += `- ${k.keyword}${(k.mapToUrl || '').startsWith('/blog') ? `  → \`${k.mapToUrl}\`` : ''}\n`; });

await writeFile('seo-keyword-map.md', md);

// console summary
console.log('unique keywords:', uniq.length, '/ raw', all.length);
console.log('per-page counts:', pageOrder.map((u) => pages[u] ? `${u}:${pages[u].length}` : null).filter(Boolean).join('  '));
console.log('top 10:');
opp.slice(0, 10).forEach((k, i) => console.log(`  ${i + 1}. ${k.keyword}  [${k.tier}/${k.competition}/${k.intent}] ${k.mapToUrl}`));
console.log('quick wins:', quickWins.length, ' blog ideas:', blog.length);
console.log('written: seo-keyword-map.md');
