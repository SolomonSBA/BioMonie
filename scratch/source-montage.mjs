import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

mkdirSync('scratch', { recursive: true });

const items = [
  ['icon-mail', 'public/email/icon-mail.png'],
  ['icon-phone', 'public/email/icon-phone.png'],
  ['icon-web', 'public/email/icon-web.png'],
  ['logo-mark', 'public/email/logo-mark.png'],
  ['logo-mark2', 'public/email/logo-mark2.png'],
  ['wordmark', 'public/email/logo-wordmark.transparent.png'],
  ['facebook', 'public/email/social-facebook.png'],
  ['instagram', 'public/email/social-instagram.png'],
  ['youtube', 'public/email/social-youtube.png'],
  ['linkedin', 'public/email/social-linkedin.png'],
  ['tiktok', 'public/email/social-tiktok.png'],
  ['x12', 'public/email/social-x12.png'],
  ['x-master', 'public/email/social-x.png'],
  ['biomonie-logo', 'public/logo/biomonie-logo.png'],
];

const CELL = 180;
const COLS = 4;
const ROWS = Math.ceil(items.length / COLS);
const W = COLS * CELL;
const H = ROWS * CELL;

const layers = [];
for (let i = 0; i < items.length; i++) {
  const [name, file] = items[i];
  const x = (i % COLS) * CELL;
  const y = Math.floor(i / COLS) * CELL;
  const resized = await sharp(file)
    .resize(CELL - 24, CELL - 24, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: 'lanczos3' })
    .ensureAlpha()
    .png({ palette: false })
    .toBuffer();
  const meta = await sharp(resized).metadata();
  layers.push({
    input: resized,
    left: x + Math.round((CELL - meta.width) / 2),
    top: y + Math.round((CELL - meta.height) / 2),
  });
}

// Annotate names with simple SVG text in the corner of each cell.
const labels = items
  .map(([name], i) => {
    const x = (i % COLS) * CELL + 6;
    const y = Math.floor(i / COLS) * CELL + 16;
    return `<text x="${x}" y="${y}" font-family="Arial" font-size="13" fill="#111">${name}</text>`;
  })
  .join('');

const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${labels}</svg>`,
);

await sharp({
  create: { width: W, height: H, channels: 4, background: { r: 128, g: 128, b: 128, alpha: 1 } },
})
  .composite([...layers, { input: svg, left: 0, top: 0 }])
  .png()
  .toFile('scratch/source-montage.png');

console.log('wrote scratch/source-montage.png');
