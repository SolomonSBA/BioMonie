/**
 * Palette-optimise ONLY the banner PNG in the active asset folder
 * (public/email/<ASSET_VERSION>).
 *
 * Classic Outlook on Windows renders palette (PNG-8) and alpha PNGs badly, so
 * every signature image except the banner must stay a full-colour, opaque RGB
 * PNG. This script therefore refuses to touch any file other than banner.png
 * (and banner.gif is produced directly by scripts/build-banner.mjs).
 */
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';
import { ASSET_VERSION } from '../src/lib/signatureConfig.ts';

const emailDir = resolve(process.cwd(), 'public', 'email', ASSET_VERSION);
const bannerPath = join(emailDir, 'banner.png');

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

if (!existsSync(bannerPath)) {
  console.log(`No public/email/${ASSET_VERSION}/banner.png yet - run "npm run build:banner" first.`);
  process.exit(0);
}

const before = statSync(bannerPath).size;
const input = readFileSync(bannerPath);
const meta = await sharp(input).metadata();

const output = await sharp(input)
  .png({
    palette: true,
    quality: 92,
    effort: 10,
    compressionLevel: 9,
    dither: 0.5,
    adaptiveFiltering: true,
  })
  .toBuffer();

const afterMeta = await sharp(output).metadata();
if (afterMeta.width !== meta.width || afterMeta.height !== meta.height) {
  throw new Error(
    `banner.png: dimensions changed from ${meta.width}x${meta.height} to ${afterMeta.width}x${afterMeta.height}`,
  );
}

if (output.length < before) {
  writeFileSync(bannerPath, output);
  console.log(`banner.png ${kb(before)} -> ${kb(output.length)} (palette-optimised)`);
} else {
  console.log(`banner.png ${kb(before)} (kept original; palette re-encode was larger)`);
}

console.log(`All other ${ASSET_VERSION} images left untouched (opaque full-colour RGB, bytes preserved).`);
