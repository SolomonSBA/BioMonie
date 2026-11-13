import { chromium } from 'playwright';
import { buildSignatureHtml, renderExchangeSignaturePreview } from '../src/lib/signatureBuilder.ts';

const values = {
  name: 'Solomon Chukwuka Emmanuel',
  title: 'Software Engineer',
  email: 'solomon@biomonie.com',
  phone: '+234 (0) 801 234 5678',
  secondPhone: '+234 (0) 809 876 5432',
};

const web = buildSignatureHtml(values, { sampleState: false });
const webNoColgroup = web.replace(/<colgroup>[\s\S]*?<\/colgroup>/g, '');
const exchange = renderExchangeSignaturePreview(values, { twoPhones: true });

const cases = [
  { label: 'web (Chrome, colgroup)', html: web },
  { label: 'web (Word: colgroup ignored)', html: webNoColgroup },
  { label: 'exchange', html: exchange },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 400 } });

for (const testCase of cases) {
  await page.setContent(
    `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:0;background:#fff}</style></head><body>${testCase.html}</body></html>`,
  );
  const result = await page.evaluate(() => {
    const email = document.querySelector('a[href^="mailto:"]');
    const company = Array.from(document.querySelectorAll('div, td')).find(
      (el) => el.textContent?.trim() === 'BIOMONIE TECHNOLOGIES' && el.children.length === 0,
    );
    // Contact table = the table that directly contains the email anchor's row.
    const contactTable = email?.closest('table');
    const emailCell = email?.closest('td');
    const iconCell = emailCell?.previousElementSibling;
    const left = (el) => (el ? el.getBoundingClientRect().left : null);
    return {
      tableLeft: left(contactTable),
      iconCellLeft: left(iconCell),
      emailCellLeft: left(emailCell),
      emailTextLeft: left(email),
      companyLeft: left(company),
      iconCellWidth: iconCell ? iconCell.getBoundingClientRect().width : null,
      emailCellWidth: emailCell ? emailCell.getBoundingClientRect().width : null,
      hasColgroup: Boolean(document.querySelector('colgroup')),
    };
  });
  console.log(testCase.label, JSON.stringify(result, null, 0));
  await page.screenshot({ path: `scratch/indent-${testCase.label.replace(/[^a-z0-9]+/gi, '-')}.png`, clip: { x: 0, y: 0, width: 660, height: 300 } });
}

await browser.close();
