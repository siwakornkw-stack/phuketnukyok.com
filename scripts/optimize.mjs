import sharp from 'sharp';
import { readFile, writeFile, copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const dir = 'public/images';
const backup = 'image-originals'; // pristine originals, outside public/ so they never ship. re-run reads from here (idempotent, no double-compression)
await mkdir(backup, { recursive: true });

const kb = async (p) => Math.round((await stat(p)).size / 1024);
const ensureBackup = async (name) => {
  const bak = path.join(backup, name);
  try { await stat(bak); } catch { await copyFile(path.join(dir, name), bak); }
  return bak;
};

// display max ~600px (hero) / ~400px (rest); target = 2x retina headroom
const jpgs = ['hero-crane', 'crane', 'truck-crane', 'backhoe', 'container', 'materials', 'custom'];
let before = 0, after = 0;
for (const name of jpgs) {
  const file = name + '.jpg';
  const bak = await ensureBackup(file);
  before += await kb(bak);
  const width = name === 'hero-crane' ? 1200 : 1000;
  const out = await sharp(await readFile(bak))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toBuffer();
  await writeFile(path.join(dir, file), out);
  after += Math.round(out.length / 1024);
  console.log(`${file}  ->  ${Math.round(out.length / 1024)}KB`);
}

// logo: flat brand colors + alpha -> palette PNG, 512px ample for 52px header use
const bakLogo = await ensureBackup('logo.png');
before += await kb(bakLogo);
const logoOut = await sharp(await readFile(bakLogo))
  .resize({ width: 512, withoutEnlargement: true })
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toBuffer();
await writeFile(path.join(dir, 'logo.png'), logoOut);
after += Math.round(logoOut.length / 1024);
console.log(`logo.png  ->  ${Math.round(logoOut.length / 1024)}KB`);

console.log(`\nTOTAL  ${before}KB  ->  ${after}KB  (-${Math.round((1 - after / before) * 100)}%)`);
