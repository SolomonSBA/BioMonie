/**
 * Render every Exchange template in quirks mode (bare fragment, no doctype) and
 * standards mode, at 1.0x and 1.2x zoom, then verify:
 *   - the left column and banner are exactly the scaled height (356px at 1.25x)
 *     and share the same top and bottom edge
 *   - the same measurements hold in quirks and standards mode (<=1px difference)
 *   - every piece of text on the navy block computes to white
 *   - no text overflows its table cell (normal and long-name samples)
 *
 * Images are fulfilled with a 1x1 transparent PNG so the check never depends
 * on the network; the width/height attributes keep the layout intact.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
import { getSignatureLayout, SIGNATURE_SCALE } from '../src/lib/signatureBuilder.ts';

const ROOT = process.cwd();
const layout = getSignatureLayout(SIGNATURE_SCALE);
const EXPECTED_HEIGHT = layout.bannerHeight;
const ZOOMS = [1, 1.2];

const TINY_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const templates = [
  'exchange-signature',
  'exchange-signature.two-phones',
  'exchange-signature.staging',
  'exchange-signature.two-phones.staging',
];

// 'normal' and 'longname' are strict: no overflow allowed. 'long' is the
// deliberately extreme sample kept as a diagnostic only.
const variants = [
  { variant: 'normal', suffix: '', strict: true, exactHeight: true },
  { variant: 'longname', suffix: '.longname', strict: true, exactHeight: false },
  { variant: 'long', suffix: '.long', strict: false, exactHeight: false },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1400 } });
await page.route('**/*', (route) =>
  route.request().resourceType() === 'image'
    ? route.fulfill({ status: 200, contentType: 'image/png', body: TINY_PNG })
    : route.continue(),
);

function auditInPage({ expectedHeight, zoom, layout }) {
  const failures = [];
  const overflows = [];

  const outer = document.querySelector(`table[width="${layout.totalWidth}"]`);
  if (!outer) {
    return {
      failures: [`outer ${layout.totalWidth}px table not found`],
      overflows,
      heights: null,
      mode: document.compatMode,
    };
  }
  const row = outer.rows[0];
  const left = row.cells[0];
  const banner = row.cells[1];
  if (!left || !banner) {
    return {
      failures: ['left column or banner cell not found'],
      overflows,
      heights: null,
      mode: document.compatMode,
    };
  }

  const leftRect = left.getBoundingClientRect();
  const bannerRect = banner.getBoundingClientRect();
  const heights = {
    left: Number((leftRect.height / zoom).toFixed(2)),
    banner: Number((bannerRect.height / zoom).toFixed(2)),
    leftTop: Number((leftRect.top / zoom).toFixed(2)),
    bannerTop: Number((bannerRect.top / zoom).toFixed(2)),
    leftBottom: Number((leftRect.bottom / zoom).toFixed(2)),
    bannerBottom: Number((bannerRect.bottom / zoom).toFixed(2)),
    mode: document.compatMode,
  };

  for (const [label, value] of [
    ['left column', heights.left],
    ['banner', heights.banner],
  ]) {
    if (expectedHeight != null && Math.abs(value - expectedHeight) > 0.5) {
      failures.push(`${label} height is ${value}px, expected ${expectedHeight}px`);
    }
  }
  for (const [label, a, b] of [
    ['top', heights.leftTop, heights.bannerTop],
    ['bottom', heights.leftBottom, heights.bannerBottom],
  ]) {
    if (Math.abs(a - b) > 1) {
      failures.push(`left column and banner ${label} differ by ${Math.abs(a - b).toFixed(2)}px`);
    }
  }

  // Text must be explicitly white on the navy block. Check every element that
  // owns a direct text node, not just the top-level div.
  const navy = outer.querySelector('td[bgcolor="#1B3A50"]');
  if (!navy) {
    failures.push('navy block not found');
  } else {
    for (const el of [navy, ...navy.querySelectorAll('*')]) {
      const hasOwnText = Array.from(el.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '',
      );
      if (!hasOwnText) continue;
      const color = getComputedStyle(el).color;
      if (color !== 'rgb(255, 255, 255)') {
        failures.push(
          `<${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 24)}" is ${color}, expected white`,
        );
      }
    }
  }

  // Any text element overflowing its nearest cell horizontally or vertically.
  for (const el of outer.querySelectorAll('*')) {
    const hasOwnText = Array.from(el.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '',
    );
    if (!hasOwnText) continue;
    const cell = el.closest('td');
    if (!cell) continue;
    const style = getComputedStyle(cell);
    const cellRect = cell.getBoundingClientRect();
    const scale = zoom;
    const content = {
      left: (cellRect.left + parseFloat(style.paddingLeft) * scale) / scale,
      right: (cellRect.right - parseFloat(style.paddingRight) * scale) / scale,
      top: (cellRect.top + parseFloat(style.paddingTop) * scale) / scale,
      bottom: (cellRect.bottom - parseFloat(style.paddingBottom) * scale) / scale,
    };
    const elRect = {
      left: el.getBoundingClientRect().left / scale,
      right: el.getBoundingClientRect().right / scale,
      top: el.getBoundingClientRect().top / scale,
      bottom: el.getBoundingClientRect().bottom / scale,
    };
    if (elRect.right > content.right + 0.5) {
      overflows.push(
        `<${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 28)}" overflows cell horizontally by ${(elRect.right - content.right).toFixed(2)}px`,
      );
    }
    if (elRect.bottom > content.bottom + 0.5) {
      overflows.push(
        `<${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 28)}" overflows cell vertically by ${(elRect.bottom - content.bottom).toFixed(2)}px`,
      );
    }
    if (cell.scrollWidth > cell.clientWidth + 0.5 && el === cell.firstElementChild) {
      overflows.push(
        `cell "${cell.textContent.trim().slice(0, 28)}" scrollWidth ${cell.scrollWidth} > clientWidth ${cell.clientWidth}`,
      );
    }
    if (el.scrollHeight > el.clientHeight + 0.5 && el.clientHeight > 0) {
      overflows.push(
        `<${el.tagName.toLowerCase()}> "${el.textContent.trim().slice(0, 28)}" scrollHeight ${el.scrollHeight} > clientHeight ${el.clientHeight}`,
      );
    }
  }

  return { failures, overflows, heights, mode: document.compatMode };
}

function documentFor(fragment, zoom, standards) {
  const doctype = standards ? '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' : '<body>';
  return `${doctype}<div id="zoom" style="zoom:${zoom}">${fragment}</div></body></html>`;
}

let failed = false;
const measured = [];

for (const name of templates) {
  const fragment = readFileSync(resolve(ROOT, `docs/${name}.html`), 'utf-8');
  for (const { variant, suffix, strict, exactHeight } of variants) {
    const previewHtml = readFileSync(resolve(ROOT, `docs/preview/${name}${suffix}.html`), 'utf-8');
    // Strip the preview shell so the template itself is what gets measured.
    const inner = previewHtml.replace(/^[\s\S]*?<body[^>]*>/, '').replace(/<\/body>[\s\S]*$/, '');

    for (const standards of [true, false]) {
      for (const zoom of ZOOMS) {
        const doc = documentFor(inner, zoom, standards);
        await page.setContent(doc, { waitUntil: 'domcontentloaded' });
        const result = await page.evaluate(auditInPage, {
          expectedHeight: exactHeight ? EXPECTED_HEIGHT : null,
          zoom,
          layout,
        });
        const expectedMode = standards ? 'CSS1Compat' : 'BackCompat';
        if (result.mode !== expectedMode) {
          result.failures.push(`expected ${expectedMode}, got ${result.mode}`);
        }
        const label = `${name}${suffix} ${standards ? 'standards' : 'quirks'} ${zoom}x`;
        if (result.failures.length) {
          failed = true;
          console.error(`\n${label} FAILED:`);
          for (const failure of result.failures) console.error(` - ${failure}`);
        }
        if (result.overflows.length) {
          if (strict) {
            failed = true;
            console.error(`\n${label} FAILED:`);
            for (const overflow of result.overflows) console.error(` - ${overflow}`);
          } else {
            console.warn(`\n${label} diagnostic overflow (expected for the extreme sample):`);
            for (const overflow of result.overflows) console.warn(` - ${overflow}`);
            continue;
          }
        }
        measured.push({ label, heights: result.heights });
        console.log(
          `${label.padEnd(72)} left=${result.heights?.left ?? '-'}px banner=${result.heights?.banner ?? '-'}px (${result.mode})`,
        );
      }
    }
  }
}

console.log('\nMeasured heights:');
for (const entry of measured) {
  console.log(
    `  ${entry.label}: left=${entry.heights.left}px banner=${entry.heights.banner}px top delta=${(entry.heights.leftTop - entry.heights.bannerTop).toFixed(2)}px`,
  );
}

await browser.close();

if (failed) {
  console.error('\nEXCHANGE PREVIEW CHECK FAILED');
  process.exit(1);
}
console.log('\nEXCHANGE PREVIEW CHECK PASSED');
