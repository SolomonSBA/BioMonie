import { chromium } from 'playwright';
import {
  buildSignatureHtml,
  renderExchangeSignaturePreview,
  getSignatureLayout,
  SIGNATURE_SCALE,
} from '../src/lib/signatureBuilder.ts';

const layout = getSignatureLayout(SIGNATURE_SCALE);
const ZOOM = 1.2;

const worstCase = {
  name: 'Solomon Chukwuka Emmanuel',
  title: 'Senior Software Engineer / Technical Lead',
  email: 'solomon.chukwuka.emmanuel@biomonie.com',
  phone: '+234 (0) 801 234 5678',
  secondPhone: '+234 (0) 809 876 5432',
};

const cases = [
  { label: 'web generator', html: buildSignatureHtml(worstCase, { sampleState: false }) },
  {
    label: 'Exchange 2-phone',
    html: renderExchangeSignaturePreview(worstCase),
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
let failed = false;

for (const testCase of cases) {
  // zoom:1.2 simulates a client that enlarges the whole signature by 20%.
  const documentHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;background:#fff}</style></head><body><div id="zoom" style="zoom:${ZOOM}">${testCase.html}</div></body></html>`;
  await page.setContent(documentHtml, { waitUntil: 'load' });

  const result = await page.evaluate(
    ({ layout, zoom }) => {
    const failures = [];
    const measurements = [];

    const findByText = (text) =>
      Array.from(document.querySelectorAll('div, span')).find(
        (el) => el.textContent === text && el.children.length === 0,
      ) || Array.from(document.querySelectorAll('div')).find((el) => el.textContent === text);

    const measure = (label, el) => {
      if (!el) {
        failures.push(`${label}: element not found`);
        return;
      }
      const rect = el.getBoundingClientRect();
      const td = el.closest('td');
      let available;
      if (td) {
        const style = getComputedStyle(td);
        available =
          td.getBoundingClientRect().width -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight);
      } else {
        available = el.clientWidth;
      }
      const textWidth = rect.width;
      const clipped = textWidth > available + 0.5;
      const selfClipped = el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 0.5;
      measurements.push({
        label,
        textWidth: Number(textWidth.toFixed(2)),
        available: Number(available.toFixed(2)),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        clipped,
      });
      if (clipped) failures.push(`${label}: text ${textWidth.toFixed(2)} > available ${available.toFixed(2)}`);
      if (selfClipped) failures.push(`${label}: scrollWidth ${el.scrollWidth} > clientWidth ${el.clientWidth}`);
    };

    const emailAnchor = document.querySelector('a[href^="mailto:"]');
    const phoneAnchors = Array.from(document.querySelectorAll('a[href^="tel:"]'));
    const websiteAnchor = Array.from(document.querySelectorAll('a')).find(
      (el) => el.textContent?.trim() === 'www.biomonie.com',
    );
    const companyLine1 = findByText('BIOMONIE TECHNOLOGIES');
    const companyLine2 = findByText('LIMITED');

    measure('email', emailAnchor);
    phoneAnchors.forEach((el, index) => measure(`phone ${index + 1}`, el));
    measure('website', websiteAnchor);
    measure('company line 1', companyLine1);
    measure('company line 2', companyLine2);

    if (companyLine1) {
      const style = getComputedStyle(companyLine1);
      const fontSize = parseFloat(style.fontSize);
      const letterSpacing = style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing);
      measurements.push({
        label: 'company font',
        fontSize: Number(fontSize.toFixed(2)),
        fontWeight: style.fontWeight,
        letterSpacing: Number(letterSpacing.toFixed(2)),
      });
      if (Math.abs(fontSize - layout.fonts.company) > 0.1) {
        failures.push(`company font-size is ${fontSize}px, expected ${layout.fonts.company}px`);
      }
      if (Math.abs(letterSpacing) > 0.1) failures.push(`company letter-spacing is ${letterSpacing}px, expected 0`);
      if (Number(style.fontWeight) < 700) failures.push('company name is not bold');
    }

    const socialLines = Array.from(document.querySelectorAll('div')).filter(
      (el) => el.style.whiteSpace === 'nowrap' && /\.com\/biomonie/.test(el.textContent || ''),
    );
    socialLines.forEach((el, index) => {
      const clipped = el.scrollWidth > el.clientWidth + 0.5;
      measurements.push({
        label: `social line ${index + 1}`,
        text: el.textContent.trim(),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        clipped,
      });
      if (clipped) failures.push(`social line ${index + 1}: clipped`);
    });

    const leftCol = document.querySelector(`[width="${layout.leftWidth}"]`);
    const leftHeightScaled = leftCol?.getBoundingClientRect().height || 0;
    const leftHeight = leftHeightScaled / zoom;
    if (Math.abs(leftHeight - layout.bannerHeight) > 0.5) {
      failures.push(
        `left column height ${leftHeight.toFixed(2)}, expected exactly ${layout.bannerHeight}`,
      );
    }
    measurements.push({
      label: 'left column height (unscaled)',
      height: Number(leftHeight.toFixed(2)),
    });

    if (leftCol && emailAnchor) {
      const overflow =
        (emailAnchor.getBoundingClientRect().right - leftCol.getBoundingClientRect().right) / zoom;
      measurements.push({
        label: 'email right edge -> left column edge (overflow)',
        value: Number(overflow.toFixed(2)),
      });
      if (overflow > 0.5) {
        failures.push(`email overflows the left column by ${overflow.toFixed(2)}px`);
      }
    }

    // Classic Outlook (Word) ignores <colgroup>, so the contact text must sit
    // exactly one icon column from the contact table's left edge. A ~half-width
    // indent means the table split into two equal halves.
    if (emailAnchor) {
      const contactTable = emailAnchor.closest('table');
      if (contactTable) {
        const indent =
          (emailAnchor.getBoundingClientRect().left - contactTable.getBoundingClientRect().left) /
          zoom;
        measurements.push({
          label: 'contact text indent from table edge (unscaled)',
          value: Number(indent.toFixed(2)),
        });
        if (
          indent < layout.contactIconCellWidth - 1 ||
          indent > layout.contactIconCellWidth + 1
        ) {
          failures.push(
            `contact text is indented ${indent.toFixed(2)}px, expected ${layout.contactIconCellWidth}px (icon column width)`,
          );
        }
      }
    }

    const navy = document.querySelector('td[bgcolor="#1B3A50"]');
    const logo = navy?.querySelector('img[src*="logo-mark"]');
    if (navy && logo) {
      const navyRect = navy.getBoundingClientRect();
      const logoRect = logo.getBoundingClientRect();
      const delta = Math.abs(
        logoRect.top + logoRect.height / 2 - (navyRect.top + navyRect.height / 2),
      );
      measurements.push({ label: 'logo vertical centre delta', value: Number(delta.toFixed(2)) });
      if (delta > 2) failures.push(`logo is not vertically centred (delta ${delta.toFixed(2)}px)`);
    }

    const titleBlock = Array.from(document.querySelectorAll('div, td')).find(
      (el) =>
        el.textContent?.trim() === 'Senior Software Engineer / Technical Lead' &&
        el.children.length === 0,
    );
    if (titleBlock && emailAnchor) {
      const emailRow = emailAnchor.closest('tr') || emailAnchor.parentElement;
      const titleRect = titleBlock.getBoundingClientRect();
      const gap = (emailRow.getBoundingClientRect().top - titleRect.bottom) / zoom;
      measurements.push({ label: 'title bottom -> email row top', value: Number(gap.toFixed(2)) });
      if (gap < -0.5) failures.push(`title overlaps the email row by ${(-gap).toFixed(2)}px`);
      // The title cell reserves two lines plus the title->contact gap; a
      // one-line title therefore leaves more visible space, never less.
      if (gap > layout.gaps.titleContact + layout.titleLineHeight + 0.5) {
        failures.push(
          `title-to-email gap is ${gap.toFixed(2)}px, expected <= ${layout.gaps.titleContact + layout.titleLineHeight}px`,
        );
      }
    }

    if (companyLine1 && websiteAnchor) {
      const companyBottom = companyLine1.parentElement.getBoundingClientRect().bottom;
      const websiteRow = websiteAnchor.closest('tr') || websiteAnchor.parentElement;
      const websiteTop = websiteRow.getBoundingClientRect().top;
      measurements.push({
        label: 'company bottom -> website row top',
        value: Number(((websiteTop - companyBottom) / zoom).toFixed(2)),
      });
      if (websiteTop < companyBottom - 0.5) {
        failures.push('website row must sit below the company name');
      }
    }

    return { failures, measurements };
    },
    { layout, zoom: ZOOM },
  );

  console.log(`\n### ${testCase.label}`);
  console.log(JSON.stringify(result.measurements, null, 2));

  if (result.failures.length > 0) {
    failed = true;
    console.error(`${testCase.label.toUpperCase()} LAYOUT CHECK FAILED:`);
    for (const failure of result.failures) console.error(` - ${failure}`);
  }
}

await browser.close();

if (failed) process.exit(1);
console.log('\nLAYOUT CHECK PASSED');
