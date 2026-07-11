import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

const W = 1200, H = 630;
// logo already contains the "ภูเก็ตนักยก / PHUKET NUKYOK" wordmark -> no text rendering needed
const logo = await sharp(await readFile('image-originals/logo.png'))
  .resize({ width: 620, withoutEnlargement: true })
  .toBuffer();
const meta = await sharp(logo).metadata();

const bg = Buffer.from(
  `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#F5F1E8"/>
    <rect y="${H - 14}" width="${W}" height="14" fill="#F6A81C"/>
    <rect x="0" width="14" height="${H}" fill="#1C1C1C"/>
  </svg>`
);

const og = await sharp(bg)
  .composite([{ input: logo, left: Math.round((W - meta.width) / 2), top: Math.round((H - meta.height) / 2) - 6 }])
  .png()
  .toBuffer();
await writeFile('public/og.png', og);
console.log(`public/og.png  ${W}x${H}  ${Math.round(og.length / 1024)}KB`);
