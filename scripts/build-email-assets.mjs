/**
 * Build the v4 signature image set in public/email/v4.
 *
 * v4 is the 1.25x-scale asset folder:
 *   - banner.gif / banner.png are produced by scripts/build-banner.mjs at the
 *     new 394x356 display size (rendered at 2x, reduced to fit 500 KB).
 *   - Every icon, social tile and logo is copied UNCHANGED from v3. Those
 *     sources are already at least 1.5x the new display size, so v3 stays the
 *     artwork source of truth and is never modified here.
 *
 * Legacy folders (public/email/*.png, v2 and v3) are READ ONLY.
 */
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const legacyDir = resolve(projectRoot, 'public', 'email');
const sourceDir = join(legacyDir, 'v3');
const outputDir = join(legacyDir, 'v4');
const serverEmailDir = resolve(projectRoot, 'server', 'public', 'email');
const serverOutputDir = join(serverEmailDir, 'v4');

/** Toggle kept for the legacy generator contract; v4 copies v3 verbatim. */
export const WORDMARK_OUTLINE = true;

mkdirSync(outputDir, { recursive: true });

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

const manifest = [];

async function copyAsset(name, detail) {
  const source = join(sourceDir, name);
  if (!existsSync(source)) {
    throw new Error(`Missing v3 source artwork: ${source}`);
  }
  const destination = join(outputDir, name);
  copyFileSync(source, destination);
  const meta = await sharp(destination).metadata();
  if (meta.hasAlpha !== true || meta.channels !== 4 || meta.paletteBitDepth !== undefined) {
    throw new Error(
      `${name} must be RGBA: hasAlpha=${meta.hasAlpha} channels=${meta.channels} palette=${meta.paletteBitDepth}`,
    );
  }
  manifest.push({
    name,
    bytes: statSync(destination).size,
    detail: detail || `copied unchanged from v3 (${meta.width}x${meta.height})`,
  });
}

// 1. Icons, social tiles and logos: unchanged copies of the v3 RGBA masters.
for (const name of [
  'icon-mail.png',
  'icon-phone.png',
  'icon-web.png',
  'logo-mark.png',
  'logo-wordmark.png',
  'social-facebook.png',
  'social-x.png',
  'social-instagram.png',
  'social-youtube.png',
  'social-linkedin.png',
  'social-tiktok.png',
]) {
  await copyAsset(name);
}

// 2. Banner: written directly by scripts/build-banner.mjs. Keep it if present,
// otherwise fall back to the v3 banner so the folder is never incomplete.
for (const name of ['banner.gif', 'banner.png']) {
  const destination = join(outputDir, name);
  if (existsSync(destination)) {
    manifest.push({
      name,
      bytes: statSync(destination).size,
      detail: 'built by build-banner at the v4 display size',
    });
    continue;
  }
  const fallback = join(sourceDir, name);
  if (!existsSync(fallback)) {
    console.warn(`NOTE: ${name} not found - run "npm run build:banner" first.`);
    continue;
  }
  console.warn(`WARNING: ${name} missing in v4; copying the v3 fallback. Run "npm run build:banner".`);
  copyFileSync(fallback, destination);
  manifest.push({ name, bytes: statSync(destination).size, detail: 'v3 fallback (rebuild banner)' });
}

// 3. Mirror into the Express/IIS server copy for local testing.
if (existsSync(serverEmailDir)) {
  mkdirSync(serverOutputDir, { recursive: true });
  for (const asset of manifest) {
    copyFileSync(join(outputDir, asset.name), join(serverOutputDir, asset.name));
  }
  console.log(`Mirrored v4 assets to ${serverOutputDir}`);
}

console.log(`\nBuilt ${manifest.length} images in public/email/v4:`);
for (const asset of manifest) {
  console.log(`  ${asset.name.padEnd(24)} ${kb(asset.bytes).padStart(9)}  ${asset.detail}`);
}
