import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import gifencPkg from 'gifenc';

const { GIFEncoder, quantize, applyPalette } = gifencPkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const outputDir = resolve(projectRoot, 'public', 'email');

// Updated slide set per user requirement:
// 1. 'hard' (approved Figma design, frame 1 static fallback)
// 2. 'access'
// 3. 'show'
// 4. 'netgain'
// 5. 'safety2'
// 6. 'encryptkey'
const DEFAULT_SLIDES = ['hard', 'access', 'show', 'netgain', 'safety2', 'encryptkey'];

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

function encodeGif(frames, maxColors = 256) {
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

async function main() {
  const { slides, port } = parseArgs();
  console.log('========================================');
  console.log('BUILDING EMAIL SIGNATURE BANNER GIF');
  console.log('========================================');
  console.log(`Requested slides (${slides.length}): ${slides.join(', ')}`);
  console.log(`Frame 1 (approved Figma & Outlook desktop fallback): "${slides[0]}"`);

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

  const context = await browser.newContext({
    viewport: { width: 630, height: 570 },
    deviceScaleFactor: 1,
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

      // Save frame 1 as static fallback PNG
      if (i === 0) {
        const pngPath = join(outputDir, 'banner.png');
        writeFileSync(pngPath, pngBuffer);
        console.log(`  -> Saved static frame 1 fallback to public/email/banner.png (${(pngBuffer.length / 1024).toFixed(1)} KB)`);
      }

      const decodedPng = PNG.sync.read(pngBuffer);
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

  // Encode GIF with 800 KB threshold handling
  const MAX_SIZE_BYTES = 800 * 1024; // 800 KB
  let activeFrames = [...frames];
  let droppedEncryptKey = false;
  let maxColors = 256;

  console.log(`\nEncoding ${activeFrames.length} frames into GIF (630x570, infinite loop)...`);
  let gifBuffer = encodeGif(activeFrames, maxColors);
  console.log(`Initial GIF size with ${activeFrames.length} slides: ${(gifBuffer.length / 1024).toFixed(1)} KB`);

  // Check if over 800 KB and 'encryptkey' is present
  if (gifBuffer.length > MAX_SIZE_BYTES && activeFrames.some((f) => f.slideId === 'encryptkey')) {
    console.warn(`\n[ALERT] GIF size (${(gifBuffer.length / 1024).toFixed(1)} KB) exceeds 800 KB limit.`);
    console.warn(`Automatically dropping 'encryptkey' slide as required...`);
    activeFrames = activeFrames.filter((f) => f.slideId !== 'encryptkey');
    droppedEncryptKey = true;
    gifBuffer = encodeGif(activeFrames, maxColors);
    console.log(`New GIF size after dropping 'encryptkey' (${activeFrames.length} slides): ${(gifBuffer.length / 1024).toFixed(1)} KB`);
  }

  // If still over 800 KB, optimize palette colors
  if (gifBuffer.length > MAX_SIZE_BYTES) {
    console.warn(`GIF size (${(gifBuffer.length / 1024).toFixed(1)} KB) still exceeds 800 KB. Optimizing palette with 128 colors...`);
    maxColors = 128;
    gifBuffer = encodeGif(activeFrames, maxColors);
    console.log(`GIF size with 128 colors: ${(gifBuffer.length / 1024).toFixed(1)} KB`);
  }

  if (gifBuffer.length > MAX_SIZE_BYTES) {
    console.warn(`GIF size (${(gifBuffer.length / 1024).toFixed(1)} KB) still exceeds 800 KB. Optimizing palette with 64 colors...`);
    maxColors = 64;
    gifBuffer = encodeGif(activeFrames, maxColors);
    console.log(`GIF size with 64 colors: ${(gifBuffer.length / 1024).toFixed(1)} KB`);
  }

  const gifPath = join(outputDir, 'banner.gif');
  writeFileSync(gifPath, gifBuffer);

  const finalSizeKb = (gifBuffer.length / 1024).toFixed(1);
  const finalSizeMb = (gifBuffer.length / (1024 * 1024)).toFixed(2);

  console.log('\n========================================');
  console.log('BANNER GIF BUILD COMPLETE');
  console.log('========================================');
  console.log(`Output GIF:        public/email/banner.gif`);
  console.log(`Output PNG:        public/email/banner.png`);
  console.log(`Final File Size:   ${finalSizeKb} KB (${finalSizeMb} MB)`);
  console.log(`Palette Colors:    ${maxColors}`);
  console.log(`Dimensions:        630x570 (renders at 315x285 in email signatures)`);
  console.log(`Frame Count:       ${activeFrames.length}`);
  if (droppedEncryptKey) {
    console.log(`Dropped Slide:     'encryptkey' was automatically dropped to stay under 800 KB`);
  } else {
    console.log(`Dropped Slide:     None ('encryptkey' was retained, within size budget)`);
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
