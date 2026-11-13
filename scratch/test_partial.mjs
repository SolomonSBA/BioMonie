import { signatureAssets } from '../src/lib/signatureConfig.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

function buildExchange(options = {}) {
  const origin = options.siteOrigin ? normalizeOrigin(options.siteOrigin) : 'https://biomonie.com';
  const u = `${origin}/email`;
  const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
  const a = signatureAssets.images;

  const fb = 'https://facebook.com/biomonie';
  const x = 'https://x.com/biomonie';
  const ig = 'https://instagram.com/biomonie';
  const yt = 'https://youtube.com/biomonie';
  const li = 'https://linkedin.com/company/biomonie';
  const tt = 'https://tiktok.com/@biomonie';

  const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
  const w = 'color:#fff;text-decoration:none';
  const b0 = 'display:block;border:0';

  const secondPhoneRow = options.twoPhones
    ? `<tr><td width="14"><img src="${u}/${a.phone}" width="14" height="14" alt="" border="0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;${tsa}"><a href="tel:%%PhoneNumber%%" style="${w}"><span style="${w}">%%PhoneNumber%%</span></a></td></tr>`
    : '';

  const str = `<table cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;font-family:Arial,sans-serif;${tsa}">` +
  `<tr valign="top">` +
    `<td width="285" bgcolor="#1B3A50" background="${u}/${a.bgNavy}" height="185" style="background-color:#1B3A50;background-image:url(${u}/${a.bgNavy});padding:12px 12px 8px">` +
      `<table cellpadding="0" cellspacing="0" width="261" height="185">` +
      `<tr valign="top">` +
        `<td width="94" valign="middle" style="padding-right:10px"><img src="${u}/${a.logoMark}" width="84" height="118" alt="Biomonie" style="${b0}"></td>` +
        `<td width="167" valign="top" style="color:#fff;${tsa}">` +
        // ...
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `</table>`;

  console.log('str length without details:', str.length);
}

buildExchange();
