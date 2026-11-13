/**
 * Render every signature image at 2x on the four backgrounds that matter:
 *   #1B3A50 (light-mode navy)
 *   #3E5A74 (Outlook dark-mode navy)
 *   #D9D9D9 (light-mode grey footer)
 *   #262626 (Outlook dark-mode grey footer)
 *
 * Output: scratch/icon-contact-sheet.png
 */
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { ASSET_VERSION } from '../src/lib/signatureConfig.ts';
import { getSignatureLayout, SIGNATURE_SCALE } from '../src/lib/signatureBuilder.ts';

const L = getSignatureLayout(SIGNATURE_SCALE);
const assetDir = resolve(process.cwd(), 'public', 'email', ASSET_VERSION);
mkdirSync(resolve(process.cwd(), 'scratch'), { recursive: true });

const BACKGROUNDS = [
  { hex: '#1B3A50', rgb: { r: 0x1b, g: 0x3a, b: 0x50 } },
  { hex: '#3E5A74', rgb: { r: 0x3e, g: 0x5a, b: 0x74 } },
  { hex: '#D9D9D9', rgb: { r: 0xd9, g: 0xd9, b: 0xd9 } },
  { hex: '#262626', rgb: { r: 0x26, g: 0x26, b: 0x26 } },
];

// Display sizes from the signature layout. Rendered here at 2x.
const ROWS = [
  { name: 'icon-mail.png', file: 'icon-mail.png', w: L.iconSize, h: L.iconSize, note: 'contact icon' },
  { name: 'icon-phone.png', file: 'icon-phone.png', w: L.iconSize, h: L.iconSize, note: 'contact icon' },
  { name: 'icon-web.png', file: 'icon-web.png', w: L.iconSize, h: L.iconSize, note: 'contact icon' },
  { name: 'logo-mark.png', file: 'logo-mark.png', w: L.logoMarkWidth, h: L.logoMarkHeight, note: 'navy logo' },
  { name: 'logo-wordmark.png', file: 'logo-wordmark.png', w: L.wordmarkWidth, h: L.wordmarkHeight, note: 'grey wordmark' },
  { name: 'social-facebook.png', file: 'social-facebook.png', w: L.socialIconSize, h: L.socialIconSize, note: 'social' },
  { name: 'social-x.png', file: 'social-x.png', w: L.socialIconSize, h: L.socialIconSize, note: 'social' },
  { name: 'social-instagram.png', file: 'social-instagram.png', w: L.socialIconSize, h: L.socialIconSize, note: 'social' },
  { name: 'social-youtube.png', file: 'social-youtube.png', w: L.socialIconSize, h: L.socialIconSize, note: 'social' },
  { name: 'social-linkedin.png', file: 'social-linkedin.png', w: L.socialIconSize, h: L.socialIconSize, note: 'social' },
  { name: 'social-tiktok.png', file: 'social-tiktok.png', w: L.socialIconSize, h: L.socialIconSize, note: 'social' },
  { name: 'banner.png', file: 'banner.png', w: L.bannerWidth, h: L.bannerHeight, note: 'banner (asset is 1.5x)' },
];

const LABEL_W = 200;
const CELL_W = 660;
const CELL_PAD = 20;
const HEADER_H = 54;

let height = HEADER_H;
const rowTops = [];
for (const row of ROWS) {
  rowTops.push(height);
  height += row.h * 2 + CELL_PAD * 2;
}
height += 20;

const width = LABEL_W + CELL_W * BACKGROUNDS.length;

const layers = [];
const labels = [];

BACKGROUNDS.forEach((bg, col) => {
  labels.push(
    `<text x="${LABEL_W + col * CELL_W + 12}" y="26" font-family="Arial" font-size="20" font-weight="bold" fill="#111">${bg.hex}</text>`,
  );
});

for (let r = 0; r < ROWS.length; r++) {
  const row = ROWS[r];
  const top = rowTops[r];
  const rowH = row.h * 2 + CELL_PAD * 2;

  labels.push(
    `<text x="12" y="${top + 26}" font-family="Arial" font-size="18" font-weight="bold" fill="#111">${row.name}</text>`,
    `<text x="12" y="${top + 48}" font-family="Arial" font-size="14" fill="#555">${row.note}</text>`,
    `<text x="12" y="${top + 68}" font-family="Arial" font-size="14" fill="#555">2x: ${row.w * 2}x${row.h * 2}</text>`,
  );

  const filePath = join(assetDir, row.file);
  if (!existsSync(filePath)) {
    labels.push(
      `<text x="${LABEL_W + 12}" y="${top + 24}" font-family="Arial" font-size="16" fill="#b00">MISSING ${row.file}</text>`,
    );
    continue;
  }

  const image = await sharp(filePath)
    .resize(row.w * 2, row.h * 2, {
      fit: 'fill',
      kernel: 'lanczos3',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .png({ palette: false })
    .toBuffer();

  for (let col = 0; col < BACKGROUNDS.length; col++) {
    const bg = BACKGROUNDS[col];
    const panel = await sharp({
      create: { width: CELL_W, height: rowH, channels: 4, background: { ...bg.rgb, alpha: 1 } },
    })
      .png()
      .toBuffer();
    layers.push({
      input: panel,
      left: LABEL_W + col * CELL_W,
      top,
    });
    layers.push({
      input: image,
      left: LABEL_W + col * CELL_W + Math.round((CELL_W - row.w * 2) / 2),
      top: top + CELL_PAD,
    });
  }
}

const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">${labels.join('')}</svg>`,
);

await sharp({
  create: { width, height, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
})
  .composite([...layers, { input: svg, left: 0, top: 0 }])
  .png()
  .toFile('scratch/icon-contact-sheet.png');

console.log(`Wrote scratch/icon-contact-sheet.png (${width}x${height})`);
console.log(`Images: ${ROWS.map((r) => r.name).join(', ')}`);
console.log(`Backgrounds: ${BACKGROUNDS.map((b) => b.hex).join(', ')}`);
