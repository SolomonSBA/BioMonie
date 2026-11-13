import { chromium } from 'playwright';

const url = 'http://localhost:5173/signature';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});

let lastError = '';
for (let attempt = 0; attempt < 15; attempt++) {
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 5000 });
    console.log('status', response?.status());
    console.log('title', await page.title());
    console.log('h1', await page.locator('h1').first().textContent());
    console.log('preview tables', await page.locator('table').count());
    break;
  } catch (error) {
    lastError = String(error);
    await page.waitForTimeout(1000);
  }
}

console.log('page errors', errors);
console.log('last navigation error', lastError);
await browser.close();
if (errors.length > 0) process.exit(1);
