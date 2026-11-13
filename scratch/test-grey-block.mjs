import { chromium } from 'playwright';

async function testGreyBlock() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="margin:0;padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" width="285" style="width:285px;border-collapse:collapse;table-layout:fixed;">
        <tr>
          <td bgcolor="#D9D9D9" height="80" style="background-color:#D9D9D9;padding:8px;height:80px;width:285px;box-sizing:border-box;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;" valign="middle">
            <table cellpadding="0" cellspacing="0" border="0" width="269" height="64" style="width:269px;height:64px;border-collapse:collapse;table-layout:fixed;">
              <tr>
                <td width="74" valign="middle" style="width:74px;padding:0 4px 0 0;line-height:0;">
                  <img src="logo-wordmark.png" width="70" height="31" style="display:block;border:0;width:70px;height:31px;">
                </td>
                <td width="195" valign="middle" style="width:195px;padding:0;overflow:hidden;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
                  <div style="font-family:Arial,Helvetica,sans-serif;font-size:8px;line-height:11px;color:#333333;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
                    <div id="line1" style="white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="#" style="color:#333333;text-decoration:none;">Facebook.com/biomonie</a>&nbsp;|&nbsp;<a href="#" style="color:#333333;text-decoration:none;">X.com/biomonie</a></div>
                    <div id="line2" style="white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="#" style="color:#333333;text-decoration:none;">Instagram.com/biomonie</a>&nbsp;|&nbsp;<a href="#" style="color:#333333;text-decoration:none;">Youtube.com/biomonie</a></div>
                    <div id="line3" style="white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="#" style="color:#333333;text-decoration:none;">Linkedin.com/biomonie</a></div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await page.setContent(html);

  for (const id of ['line1', 'line2', 'line3']) {
    const res = await page.evaluate((lineId) => {
      const el = document.getElementById(lineId);
      return {
        id: lineId,
        text: el.textContent,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        clipped: el.scrollWidth > el.clientWidth,
      };
    }, id);
    console.log(res);
  }

  await browser.close();
}

testGreyBlock().catch(console.error);
