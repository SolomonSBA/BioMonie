import { chromium } from 'playwright';
import { buildSignatureHtml } from '../src/lib/signatureBuilder.ts';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const sample = {
    name: 'Solomon Chukwuka Emmanuel',
    title: 'Senior Software Engineer / Technical Lead',
    email: 'solomon.chukwuka@biomonie.com',
    phone: '+234 (0) 801 234 5678',
    secondPhone: '+234 (0) 809 876 5432',
  };

  const html = buildSignatureHtml(sample);
  await page.setContent(html);

  // Measure social lines
  const socialLines = await page.evaluate(() => {
    // find elements containing biomonie in the grey block
    const divs = Array.from(document.querySelectorAll('div')).filter(d => 
      d.textContent.includes('Instagram.com/biomonie') ||
      d.textContent.includes('Facebook.com/biomonie') ||
      d.textContent.includes('Linkedin.com/biomonie')
    );
    return divs.map(d => ({
      text: d.textContent.trim(),
      scrollWidth: d.scrollWidth,
      clientWidth: d.clientWidth,
      clipped: d.scrollWidth > d.clientWidth,
    }));
  });

  console.log('Social lines:', socialLines);
  await browser.close();
}

main().catch(console.error);
