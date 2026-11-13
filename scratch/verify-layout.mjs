import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto('http://localhost:5173/signature', { waitUntil: 'domcontentloaded' });
await page.getByRole('button', { name: 'Long Name (2 phones)' }).click();
await page.waitForTimeout(500);

const result = await page.evaluate(() => {
  const preview = document.querySelector('[dangerouslysetinnerhtml]') ||
    Array.from(document.querySelectorAll('div')).find((d) => d.querySelector('table'));
  const root = document.querySelector('table');
  const socialLines = Array.from(document.querySelectorAll('div'))
    .filter((d) => d.children.length === 0 && /biomonie/i.test(d.textContent || '') && d.textContent.includes('.com'))
    .map((d) => ({
      text: d.textContent.trim(),
      scrollWidth: d.scrollWidth,
      clientWidth: d.clientWidth,
      clipped: d.scrollWidth > d.clientWidth,
    }));

  const leftCol = document.querySelector('td[width="285"]');
  const navy = document.querySelector('td[bgcolor="#1B3A50"]');
  const grey = document.querySelector('td[bgcolor="#D9D9D9"]');
  const anchors = Array.from(document.querySelectorAll('td[bgcolor="#1B3A50"] a')).map((a) => ({
    href: a.getAttribute('href'),
    style: a.getAttribute('style'),
    spanStyle: a.querySelector('span')?.getAttribute('style') || null,
  }));
  const companyLines = Array.from(navy?.querySelectorAll('div[style*="white-space:nowrap"]') || [])
    .filter((d) => /BIOMONIE|LIMITED/.test(d.textContent || ''))
    .map((d) => ({ text: d.textContent.trim(), align: getComputedStyle(d.parentElement).textAlign }));

  return {
    leftColHeight: leftCol?.offsetHeight,
    navyHeight: navy?.offsetHeight,
    greyHeight: grey?.offsetHeight,
    socialLines,
    anchors,
    companyLines,
    rootWidth: root?.offsetWidth,
  };
});

console.log(JSON.stringify(result, null, 2));
console.log('page errors', errors);
await browser.close();
