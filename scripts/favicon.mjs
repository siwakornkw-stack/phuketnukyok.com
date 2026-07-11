import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

// man-carrying-crane crop from original logo (box verified visually)
const src = await readFile('image-originals/logo.png');
const man = await sharp(src).extract({ left: 30, top: 615, width: 640, height: 640 }).png().toBuffer();

// favicon: transparent bg, ~11% padding so it isn't edge-to-edge (200 + 2*28 = 256)
const inner = await sharp(man).resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
const favicon = await sharp(inner)
  .extend({ top: 28, bottom: 28, left: 28, right: 28, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
await writeFile('public/favicon.png', favicon);

// apple-touch: iOS ignores alpha -> white bg, 140 + 2*20 = 180
const appleInner = await sharp(man).resize(140, 140, { fit: 'contain', background: '#ffffff' }).flatten({ background: '#ffffff' }).toBuffer();
const apple = await sharp(appleInner)
  .extend({ top: 20, bottom: 20, left: 20, right: 20, background: '#ffffff' })
  .png()
  .toBuffer();
await writeFile('public/apple-touch-icon.png', apple);

// preview both side by side for visual check
const strip = await sharp({ create: { width: 512, height: 256, channels: 4, background: '#dddddd' } })
  .composite([{ input: favicon, left: 0, top: 0 }, { input: apple, left: 294, top: 38 }])
  .png()
  .toBuffer();
await writeFile('scripts/favicon-preview.png', strip);
console.log('favicon.png (256, transparent) + apple-touch-icon.png (180, white) written');
