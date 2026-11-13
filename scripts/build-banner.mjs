import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import gifencPkg from 'gifenc';
import sharp from 'sharp';

const { GIFEncoder, quantize, applyPalette } = gifencPkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
// Versioned folder: bumped whenever the signature artwork/cache contract
// changes. Legacy files directly under public/email stay untouched.
const { ASSET_VERSION, BANNER_SLIDE_IDS, SIGNATURE_SCALE } = await import(
  '../src/lib/signatureConfig.ts'
);
const { getSignatureLayout } = await import('../src/lib/signatureBuilder.ts');
const outputDir = resolve(projectRoot, 'public', 'email', ASSET_VERSION);

// Approved slide set. Frame 1 ('hard') is the static Outlook fallback.
// At the larger 1.25x display size the GIF budget only fits four slides.
const DEFAULT_SLIDES = BANNER_SLIDE_IDS.slice(0, 4);

const TARGET_BYTES = 500 * 1024;

const layout = getSignatureLayout(SIGNATURE_SCALE);
// Display size inside the signature (394 x 356 at 1.25x).
const DISPLAY_WIDTH = layout.bannerWidth;
const DISPLAY_HEIGHT = layout.bannerHeight;
const TARGET_2X = { width: DISPLAY_WIDTH * 2, height: DISPLAY_HEIGHT * 2 };
const TARGET_1_5X = {
  width: Math.round(DISPLAY_WIDTH * 1.5),
  height: Math.round(DISPLAY_HEIGHT * 1.5),
};

function parseArgs() {
  const args = process.argv.slice(2);
  let slides = DEFAULT_SLIDES;
  let port = 5173;

  for (const arg of args) {
    if (arg.startsWith('--slides=')) {
      slides = arg.replace('--slides=', '').split(',').map((s) => s.trim()).filter(Boolean);
    } else if (arg.startsWith('--port=')) {
      port = parseInt(arg.replace('--port=', ''), 10) || 5173;
    }
  }
  return { slides, port };
}

async function isServerRunning(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`, { method: 'HEAD' });
    return res.ok || res.status === 404 || res.status === 200;
  } catch {
    return false;
  }
}

/**
 * Slide display duration:
 * - 3.5 seconds for slides with longer text ('netgain', 'encryptkey')
 * - 3.0 seconds default for other slides
 */
function getSlideDelay(slideId) {
  if (slideId === 'netgain' || slideId === 'encryptkey') {
    return 3500;
  }
  return 3000;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function encodeGif(frames, maxColors = 128) {
  const gif = GIFEncoder();
  for (const frame of frames) {
    const palette = quantize(frame.data, maxColors);
    const index = applyPalette(frame.data, palette);
    const delay = getSlideDelay(frame.slideId);
    gif.writeFrame(index, frame.width, frame.height, {
      palette,
      delay,
      repeat: 0, // loop forever
    });
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}

async function resizeFrames(frames, width, height) {
  const resized = [];
  for (const frame of frames) {
    const data = await sharp(Buffer.from(frame.data), {
      raw: { width: frame.width, height: frame.height, channels: 4 },
    })
      .resize(width, height, { fit: 'fill', kernel: 'lanczos3' })
      .raw()
      .toBuffer();
    resized.push({ ...frame, width, height, data });
  }
  return resized;
}

async function main() {
  const { slides, port } = parseArgs();
  console.log('========================================');
  console.log('BUILDING EMAIL SIGNATURE BANNER GIF');
  console.log('========================================');
  console.log(`Requested slides (${slides.length}): ${slides.join(', ')}`);
  console.log(`Frame 1 (approved Figma & Outlook desktop fallback): "${slides[0]}"`);
  console.log(`Display size:       ${DISPLAY_WIDTH}x${DISPLAY_HEIGHT} (signature ${SIGNATURE_SCALE}x)`);
  console.log(`Render targets:     2x ${TARGET_2X.width}x${TARGET_2X.height}, 1.5x ${TARGET_1_5X.width}x${TARGET_1_5X.height}`);
  console.log(`Size target:        under ${kb(TARGET_BYTES)}`);

  let viteServer = null;
  let actualPort = port;
  const running = await isServerRunning(port);
  if (!running) {
    console.log(`Starting Vite dev server on port ${port}...`);
    viteServer = await createServer({
      root: projectRoot,
      server: { port },
    });
    await viteServer.listen();
    const addr = viteServer.httpServer?.address();
    if (addr && typeof addr === 'object') {
      actualPort = addr.port;
    }
    console.log(`Dev server is ready at http://localhost:${actualPort}`);
  } else {
    console.log(`Using existing server on http://localhost:${port}`);
  }

  mkdirSync(outputDir, { recursive: true });

  console.log('Launching headless Chromium via Playwright...');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    if (viteServer) await viteServer.close();
    console.error('\nError: Playwright Chromium browser binary not found or failed to launch.');
    console.error('Please run the following command to download the browser:');
    console.error('    npx playwright install chromium\n');
    throw err;
  }

  // The banner canvas is 630x570 CSS pixels. Rasterise it at the 2x target
  // width so text is painted at device resolution, never upscaled from 1x.
  const deviceScaleFactor = TARGET_2X.width / 630;
  const context = await browser.newContext({
    viewport: { width: 630, height: 570 },
    deviceScaleFactor,
  });
  const page = await context.newPage();

  const frames = [];

  try {
    for (let i = 0; i < slides.length; i++) {
      const slideId = slides[i];
      const url = `http://localhost:${actualPort}/banner-render?slide=${encodeURIComponent(slideId)}`;
      const delay = getSlideDelay(slideId);
      console.log(`\n[${i + 1}/${slides.length}] Capturing slide "${slideId}" (duration: ${delay}ms) from ${url}...`);

      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForSelector('#banner-canvas[data-ready="true"]', { timeout: 15000 });
      // Small pause to allow font rendering and subpixel painting to settle
      await page.waitForTimeout(300);

      // Verify clearance between sub text and badges row
      const subBox = await page.locator('#banner-sub').boundingBox();
      const badgesBox = await page.locator('#banner-badges').boundingBox();
      if (subBox && badgesBox) {
        const clearance = badgesBox.y - (subBox.y + subBox.height);
        console.log(`  -> Clearance between sub text and badges: ${clearance.toFixed(1)}px (min 24px)`);
        if (clearance < 24) {
          console.warn(`  [WARNING] Clearance (${clearance.toFixed(1)}px) is below the 24px minimum!`);
        }
      }

      const canvas = page.locator('#banner-canvas');
      const pngBuffer = await canvas.screenshot({ type: 'png' });

      // The canvas is 630x570 CSS with an aspect ratio very slightly different
      // from the 394:356 display cell; normalise to the exact 2x raster size.
      const normalised = await sharp(pngBuffer)
        .resize(TARGET_2X.width, TARGET_2X.height, { fit: 'fill', kernel: 'lanczos3' })
        .png()
        .toBuffer();
      const decodedPng = PNG.sync.read(normalised);
      frames.push({
        slideId,
        width: decodedPng.width,
        height: decodedPng.height,
        data: decodedPng.data,
      });
    }
  } finally {
    await browser.close();
    if (viteServer) {
      console.log('Stopping dev server...');
      await viteServer.close();
    }
  }

  const tryEncode = (label, activeFrames, maxColors) => {
    const buffer = encodeGif(activeFrames, maxColors);
    console.log(
      `  ${label.padEnd(58)} ${kb(buffer.length).padStart(9)} ${buffer.length < TARGET_BYTES ? 'PASS' : 'over'}`,
    );
    return buffer;
  };

  console.log(`\nEncoding ${frames.length} frames...`);
  let activeFrames = [...frames];
  let maxColors = 128;
  let finalWidth = TARGET_2X.width;
  let finalHeight = TARGET_2X.height;
  let resolutionLabel = '2x';
  let droppedSlides = [];

  let gifBuffer = tryEncode(
    `1. ${resolutionLabel} (${finalWidth}x${finalHeight}), ${maxColors} colours, ${activeFrames.length} frames`,
    activeFrames,
    maxColors,
  );

  if (gifBuffer.length >= TARGET_BYTES) {
    activeFrames = await resizeFrames(activeFrames, TARGET_1_5X.width, TARGET_1_5X.height);
    finalWidth = TARGET_1_5X.width;
    finalHeight = TARGET_1_5X.height;
    resolutionLabel = '1.5x';
    gifBuffer = tryEncode(
      `2. ${resolutionLabel} (${finalWidth}x${finalHeight}), ${maxColors} colours, ${activeFrames.length} frames`,
      activeFrames,
      maxColors,
    );
  }

  if (gifBuffer.length >= TARGET_BYTES && activeFrames.length > 3) {
    droppedSlides = activeFrames.slice(3).map((frame) => frame.slideId);
    activeFrames = activeFrames.slice(0, 3);
    gifBuffer = tryEncode(
      `3. drop to 3 frames (dropped: ${droppedSlides.join(', ')}), ${maxColors} colours`,
      activeFrames,
      maxColors,
    );
  }

  if (gifBuffer.length >= TARGET_BYTES) {
    maxColors = 96;
    gifBuffer = tryEncode(
      `4. ${resolutionLabel}, ${activeFrames.length} frames, ${maxColors} colours`,
      activeFrames,
      maxColors,
    );
  }

  if (gifBuffer.length >= TARGET_BYTES) {
    throw new Error(
      `banner.gif is ${kb(gifBuffer.length)} after every optimisation step (target ${kb(TARGET_BYTES)})`,
    );
  }

  const gifPath = join(outputDir, 'banner.gif');
  writeFileSync(gifPath, gifBuffer);

  // Static first frame at the final raster size (Outlook desktop fallback).
  const firstFrame = activeFrames[0];
  const firstFramePng = await sharp(Buffer.from(firstFrame.data), {
    raw: { width: firstFrame.width, height: firstFrame.height, channels: 4 },
  })
    .png()
    .toBuffer();
  const optimisedPng = await sharp(firstFramePng)
    .png({
      palette: true,
      quality: 92,
      effort: 10,
      compressionLevel: 9,
      dither: 0.5,
      adaptiveFiltering: true,
    })
    .toBuffer();
  const pngOut = optimisedPng.length < firstFramePng.length ? optimisedPng : firstFramePng;
  const pngPath = join(outputDir, 'banner.png');
  writeFileSync(pngPath, pngOut);
  console.log(
    `\nSaved static frame 1 fallback to public/email/${ASSET_VERSION}/banner.png (${kb(firstFramePng.length)} -> ${kb(pngOut.length)})`,
  );

  // Mirror into the server copy when it exists (local Express/IIS testing).
  const serverEmailDir = resolve(projectRoot, 'server', 'public', 'email');
  if (existsSync(serverEmailDir)) {
    const serverOutputDir = join(serverEmailDir, ASSET_VERSION);
    mkdirSync(serverOutputDir, { recursive: true });
    for (const name of ['banner.png', 'banner.gif']) {
      const source = join(outputDir, name);
      if (existsSync(source)) copyFileSync(source, join(serverOutputDir, name));
    }
  }

  const finalSizeKb = (gifBuffer.length / 1024).toFixed(1);
  const finalSizeMb = (gifBuffer.length / (1024 * 1024)).toFixed(2);

  console.log('\n========================================');
  console.log('BANNER GIF BUILD COMPLETE');
  console.log('========================================');
  console.log(`Output GIF:        public/email/${ASSET_VERSION}/banner.gif`);
  console.log(`Output PNG:        public/email/${ASSET_VERSION}/banner.png`);
  console.log(`Final File Size:   ${finalSizeKb} KB (${finalSizeMb} MB)`);
  console.log(`Palette Colors:    ${maxColors}`);
  console.log(`Resolution:        ${resolutionLabel} (${finalWidth}x${finalHeight})`);
  console.log(`Display Size:      ${DISPLAY_WIDTH}x${DISPLAY_HEIGHT}`);
  console.log(`Frame Count:       ${activeFrames.length}`);
  if (droppedSlides.length > 0) {
    console.log(`Dropped Slides:    ${droppedSlides.join(', ')}`);
  } else {
    console.log(`Dropped Slides:    None`);
  }
  console.log('Included Slides in order:');
  activeFrames.forEach((frame, idx) => {
    const delay = getSlideDelay(frame.slideId);
    console.log(`  Frame ${idx + 1}: "${frame.slideId}" (${delay}ms)${idx === 0 ? ' [Approved Figma design & Outlook desktop fallback]' : ''}`);
  });
  console.log('========================================\n');
}

main().catch((err) => {
  console.error('\nBuild banner failed:', err);
  process.exit(1);
});
