const BASE = 'https://phuketnukyok.com';
const strip = (h) =>
  h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ')
   .replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();

// site-level: headers from homepage
const home = await fetch(BASE + '/');
const H = home.headers;
const security = {
  https: BASE.startsWith('https'),
  hsts: H.get('strict-transport-security'),
  xcto: H.get('x-content-type-options'),
  xfo: H.get('x-frame-options'),
  referrer: H.get('referrer-policy'),
  permissions: H.get('permissions-policy'),
  server: H.get('server'),
};

// assets
const asset = async (p) => {
  const r = await fetch(BASE + p);
  return { status: r.status, type: r.headers.get('content-type'), cache: r.headers.get('cache-control') };
};
const assets = {
  robots: await asset('/robots.txt'),
  llms: await asset('/llms.txt'),
  og: await asset('/og.png'),
  favicon: await asset('/favicon.png'),
  sitemapIndex: await asset('/sitemap-index.xml'),
};

// sitemap URLs
const sm = await (await fetch(BASE + '/sitemap-0.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// per-page (live)
const pages = [];
for (const u of urls) {
  const res = await fetch(u);
  const h = await res.text();
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = [...h.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)];
  const imgNoAlt = imgs.filter((m) => !/\balt="[^"]+"/.test(m[0])).length;
  const ld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let ldTypes = [], ldValid = true;
  for (const m of ld) { try { const o = JSON.parse(m[1]); (o['@graph'] || [o]).forEach((x) => ldTypes.push(x['@type'])); } catch { ldValid = false; } }
  pages.push({
    url: u.replace(BASE, '') || '/',
    status: res.status,
    titleLen: title.length,
    descLen: desc.length,
    hasCanonical: /<link rel="canonical"/.test(h),
    h1Count: h1s.length,
    h2: (h.match(/<h2[^>]*>/g) || []).length,
    imgCount: imgs.length,
    imgNoAlt,
    ldTypes,
    ldValid,
    ogImage: /property="og:image"/.test(h),
    textLen: strip((h.match(/<main[\s\S]*?<\/main>/) || [h])[0] || h).length,
  });
}

// redirect sample (legacy -> new)
const redir = async (p) => {
  const r = await fetch(BASE + p, { redirect: 'manual' });
  return { status: r.status, location: r.headers.get('location') };
};
const redirects = {
  '/about-us': await redir('/about-us'),
  '/gallery': await redir('/gallery'),
  '/contact-us': await redir('/contact-us'),
  '/blog/thai-crane': await redir('/' + encodeURIComponent('เช่าเครน-ภูเก็ต')),
};

console.log(JSON.stringify({ security, assets, sitemapUrls: urls.length, redirects, pages }, null, 2));
