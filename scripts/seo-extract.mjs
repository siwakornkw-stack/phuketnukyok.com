import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = 'dist';
async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const strip = (h) =>
  h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
   .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

const files = await walk(dist);
const pages = [];
for (const f of files) {
  const h = await readFile(f, 'utf8');
  const url = '/' + path.relative(dist, f).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const canonical = (h.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';
  const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  const h2 = (h.match(/<h2[^>]*>/g) || []).length;
  const h3 = (h.match(/<h3[^>]*>/g) || []).length;
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)];
  const imgNoAlt = imgs.filter((m) => !/\balt="[^"]+"/.test(m[0])).length;
  const links = [...h.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map((m) => m[1]);
  const internal = links.filter((l) => l.startsWith('/') || l.includes('phuketnukyok.com')).length;
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let ldTypes = [], ldValid = true;
  for (const m of ld) {
    try { const o = JSON.parse(m[1]); const g = o['@graph'] || [o]; ldTypes.push(...g.map((x) => x['@type'])); }
    catch { ldValid = false; }
  }
  const og = ['og:title', 'og:description', 'og:image', 'og:url'].filter((p) => h.includes(`property="${p}"`));
  const textLen = strip((h.match(/<main[\s\S]*?<\/main>/) || [h])[0] || h).length;
  pages.push({
    url, titleLen: title.length, title, descLen: desc.length, hasCanonical: !!canonical,
    h1Count: h1s.length, h1: h1s[0] || '', h2, h3, imgCount: imgs.length, imgNoAlt,
    internalLinks: internal, ldTypes, ldValid, ogCount: og.length, textLen,
  });
}
pages.sort((a, b) => a.url.localeCompare(b.url));

// site-level assets
const assets = {};
for (const a of ['robots.txt', 'llms.txt', 'sitemap-index.xml', 'favicon.png', 'apple-touch-icon.png']) {
  try { await stat(path.join(dist, a)); assets[a] = true; } catch { assets[a] = false; }
}
let sitemapUrls = 0;
try { const sm = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8'); sitemapUrls = (sm.match(/<loc>/g) || []).length; } catch {}

// image weight
let imgKB = 0, imgN = 0;
async function imgWalk(d) { for (const e of await readdir(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) await imgWalk(p); else if (/\.(jpg|png|webp|svg)$/i.test(e.name)) { imgKB += (await stat(p)).size / 1024; imgN++; } } }
try { await imgWalk(path.join(dist, 'images')); } catch {}

console.log(JSON.stringify({ pageCount: pages.length, assets, sitemapUrls, imgN, imgKB: Math.round(imgKB), pages }, null, 2));
