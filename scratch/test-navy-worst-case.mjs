import { chromium } from 'playwright';

async function testNavy() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const NAVY_HEIGHT = 205;
  const GREY_HEIGHT = 80;
  const SANS_FONT = 'Arial,Helvetica,sans-serif';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <table id="outer" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;border-collapse:collapse;table-layout:fixed;font-family:${SANS_FONT};-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
        <tr valign="top">
          <td id="leftCol" width="285" style="width:285px;padding:0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
            <table cellpadding="0" cellspacing="0" border="0" width="285" style="width:285px;border-collapse:collapse;table-layout:fixed;">
              <tr>
                <td id="navyTd" bgcolor="#1B3A50" height="185" style="background-color:#1B3A50;padding:12px 12px 8px 12px;height:185px;width:285px;box-sizing:border-box;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;" valign="top">
                  <table cellpadding="0" cellspacing="0" border="0" width="261" height="185" style="width:261px;height:185px;border-collapse:collapse;table-layout:fixed;">
                    <tr valign="top">
                      <td id="logoTd" width="94" valign="middle" style="width:94px;padding:0 10px 0 0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
                        <img src="logo-mark.png" width="84" height="118" style="display:block;border:0;width:84px;height:118px;">
                      </td>
                      <td id="textTd" width="167" valign="top" style="width:167px;padding:0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
                        <!-- Name: 2 lines max -->
                        <div id="nameDiv" style="font-family:${SANS_FONT};font-size:11px;line-height:14px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;white-space:normal;overflow-wrap:anywhere;word-break:normal;max-height:28px;overflow:hidden;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">SOLOMON CHUKWUKA EMMANUEL</div>
                        <!-- Gap: 3px -->
                        <!-- Job title: 2 lines max, 10px font / 12px lh, 3px top gap, 10px bottom gap -->
                        <div id="titleDiv" style="font-family:${SANS_FONT};font-size:10px;line-height:12px;color:#ffffff;padding:3px 0 10px 0;max-height:37px;overflow:hidden;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">Senior Software Engineer / Technical Lead</div>
                        <!-- Contact rows: 4 rows, 14px line-height, 6px between rows -->
                        <table cellpadding="0" cellspacing="0" border="0" width="167" style="width:167px;border-collapse:collapse;table-layout:fixed;">
                          <tr>
                            <td width="14" valign="middle" style="width:14px;padding:0 6px 6px 0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><img src="icon-mail.png" width="14" height="14" style="display:block;border:0;width:14px;height:14px;"></td>
                            <td valign="middle" style="padding:0 0 6px 0;font-family:${SANS_FONT};font-size:8px;line-height:14px;color:#ffffff;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="mailto:solomon@biomonie.com" style="color:#ffffff;text-decoration:none;"><span style="color:#ffffff;text-decoration:none;white-space:nowrap;">solomon@biomonie.com</span></a></td>
                          </tr>
                          <tr>
                            <td width="14" valign="middle" style="width:14px;padding:0 6px 6px 0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><img src="icon-phone.png" width="14" height="14" style="display:block;border:0;width:14px;height:14px;"></td>
                            <td valign="middle" style="padding:0 0 6px 0;font-family:${SANS_FONT};font-size:9px;line-height:14px;color:#ffffff;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="tel:+2348012345678" style="color:#ffffff;text-decoration:none;"><span style="color:#ffffff;text-decoration:none;white-space:nowrap;">+234 (0) 801 234 5678</span></a></td>
                          </tr>
                          <tr>
                            <td width="14" valign="middle" style="width:14px;padding:0 6px 6px 0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><img src="icon-phone.png" width="14" height="14" style="display:block;border:0;width:14px;height:14px;"></td>
                            <td valign="middle" style="padding:0 0 6px 0;font-family:${SANS_FONT};font-size:9px;line-height:14px;color:#ffffff;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="tel:+2348098765432" style="color:#ffffff;text-decoration:none;"><span style="color:#ffffff;text-decoration:none;white-space:nowrap;">+234 (0) 809 876 5432</span></a></td>
                          </tr>
                          <tr>
                            <td width="14" valign="middle" style="width:14px;padding:0 6px 0 0;line-height:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><img src="icon-web.png" width="14" height="14" style="display:block;border:0;width:14px;height:14px;"></td>
                            <td valign="middle" style="padding:0;font-family:${SANS_FONT};font-size:9px;line-height:14px;color:#ffffff;white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;"><a href="https://biomonie.com" target="_blank" style="color:#ffffff;text-decoration:none;"><span style="color:#ffffff;text-decoration:none;white-space:nowrap;">www.biomonie.com</span></a></td>
                          </tr>
                        </table>
                        <!-- Clear space: 12px -->
                        <!-- Company name: 2 lines, Arial bold 10px white, right aligned -->
                        <div id="companyDiv" style="padding:12px 0 0 0;font-family:${SANS_FONT};font-size:10px;line-height:12px;font-weight:bold;color:#ffffff;text-align:right;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">
                          <div style="white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">BIOMONIE TECHNOLOGIES</div>
                          <div style="white-space:nowrap;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;">LIMITED</div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td id="greyTd" bgcolor="#D9D9D9" height="64" style="background-color:#D9D9D9;padding:8px;height:64px;width:285px;box-sizing:border-box;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;" valign="middle">
                  <div style="height:64px;">Grey content</div>
                </td>
              </tr>
            </table>
          </td>
          <td id="rightTd" width="315" height="285" bgcolor="#14262F" style="width:315px;height:285px;padding:0;line-height:0;">
            <div style="width:315px;height:285px;background:#14262F;">Banner</div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await page.setContent(html);

  const leftColBox = await page.locator('#leftCol').boundingBox();
  const navyTdBox = await page.locator('#navyTd').boundingBox();
  const greyTdBox = await page.locator('#greyTd').boundingBox();
  const rightTdBox = await page.locator('#rightTd').boundingBox();
  const textTdBox = await page.locator('#textTd').boundingBox();

  console.log('Left col bounding box:', leftColBox);
  console.log('Navy TD bounding box:', navyTdBox);
  console.log('Grey TD bounding box:', greyTdBox);
  console.log('Right TD bounding box:', rightTdBox);
  console.log('Text TD bounding box:', textTdBox);

  await browser.close();
}

testNavy().catch(console.error);
