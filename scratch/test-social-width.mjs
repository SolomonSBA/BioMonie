import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const text1 = 'Facebook.com/biomonie | X.com/biomonie';
  const text2 = 'Instagram.com/biomonie | Youtube.com/biomonie';
  const text3 = 'Linkedin.com/biomonie';

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; font-family: Arial, Helvetica, sans-serif; }
        .line { font-size: 8px; white-space: nowrap; display: inline-block; }
      </style>
    </head>
    <body>
      <div id="l1" class="line">${text1}</div><br>
      <div id="l2" class="line">${text2}</div><br>
      <div id="l3" class="line">${text3}</div>
    </body>
    </html>
  `);

  for (const id of ['l1', 'l2', 'l3']) {
    const box = await page.locator(`#${id}`).boundingBox();
    const metrics = await page.evaluate((elId) => {
      const el = document.getElementById(elId);
      return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, text: el.textContent };
    }, id);
    console.log(`${id}: text="${metrics.text}", width=${box?.width.toFixed(2)}px`);
  }

  await browser.close();
}

main().catch(console.error);
