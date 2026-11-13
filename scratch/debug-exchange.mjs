import { chromium } from 'playwright';
import { renderExchangeSignaturePreview } from '../src/lib/signatureBuilder.ts';

const html = renderExchangeSignaturePreview({
  name: 'Solomon Chukwuka Emmanuel',
  title: 'Senior Software Engineer / Technical Lead',
  email: 'solomon.chukwuka.emmanuel@biomonie.com',
  phone: '+234 (0) 801 234 5678',
  secondPhone: '+234 (0) 809 876 5432',
});

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.setContent(
  `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><div id="zoom" style="zoom:1.2">${html}</div></body></html>`,
);
const result = await page.evaluate(() => {
  const anchor = document.querySelector('a[href^="mailto:"]');
  const table = anchor.closest('table');
  const emailRow = anchor.closest('tr');
  const title = Array.from(document.querySelectorAll('div')).find(
    (el) => el.textContent?.trim() === 'Senior Software Engineer / Technical Lead',
  );
  return {
    table: table.getBoundingClientRect().toJSON(),
    anchor: anchor.getBoundingClientRect().toJSON(),
    firstRowCells: Array.from(emailRow.children).map((td) => ({
      widthAttr: td.getAttribute('width'),
      style: td.getAttribute('style'),
      rect: td.getBoundingClientRect().toJSON(),
    })),
    title: title.getBoundingClientRect().toJSON(),
    emailRow: emailRow.getBoundingClientRect().toJSON(),
    titleParent: title.parentElement.getBoundingClientRect().toJSON(),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
