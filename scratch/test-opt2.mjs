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
  const wColor = 'color:#fff;text-decoration:none';

  const secondPhoneRow = options.twoPhones
    ? `<tr><td width="14"><img src="${u}/${a.phone}" width="14" height="14" alt="Phone" style="display:block;border:0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;${tsa}"><a href="tel:%%PhoneNumber%%" style="${wColor}"><span style="${wColor}">%%PhoneNumber%%</span></a></td></tr>`
    : '';

  return `<table cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;font-family:Arial,sans-serif;${tsa}"><tr valign="top">` +
  `<td width="285"><table cellpadding="0" cellspacing="0" width="285" style="border-collapse:collapse">` +
  `<tr>` +
    `<td bgcolor="#1B3A50" background="${u}/${a.bgNavy}" height="185" style="background-color:#1B3A50;background-image:url(${u}/${a.bgNavy});padding:12px 12px 8px;height:185px;width:285px;box-sizing:border-box" valign="top">` +
      `<table cellpadding="0" cellspacing="0" width="261" height="185">` +
      `<tr valign="top">` +
        `<td width="94" valign="middle" style="padding-right:10px"><img src="${u}/${a.logoMark}" width="84" height="118" alt="Biomonie" style="display:block;border:0"></td>` +
        `<td width="167" valign="top" style="color:#fff;${tsa}">` +
          `<div style="font:bold 13px/16px Arial,sans-serif;letter-spacing:.5px;max-height:32px;overflow:hidden;text-transform:uppercase">%%DisplayName%%</div>` +
          `<div style="font:10px/12px Arial,sans-serif;color:#fff;padding:3px 0 10px;max-height:37px;overflow:hidden">%%Title%%</div>` +
          `<table cellpadding="0" cellspacing="0" width="167" style="font:9px/14px Arial,sans-serif;color:#fff">` +
          `<tr><td width="14"><img src="${u}/${a.mail}" width="14" height="14" alt="Email" style="display:block;border:0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;${tsa}"><a href="mailto:%%UserLogonName%%" style="${wColor}"><span style="${wColor}">%%UserLogonName%%</span></a></td></tr>` +
          `<tr><td width="14"><img src="${u}/${a.phone}" width="14" height="14" alt="Phone" style="display:block;border:0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;${tsa}"><a href="tel:%%MobileNumber%%" style="${wColor}"><span style="${wColor}">%%MobileNumber%%</span></a></td></tr>` +
          secondPhoneRow +
          `<tr><td width="14"><img src="${u}/${a.website}" width="14" height="14" alt="Web" style="display:block;border:0"></td><td style="padding-left:6px;white-space:nowrap;${tsa}"><a href="${origin}" style="${wColor}"><span style="${wColor}">www.biomonie.com</span></a></td></tr>` +
          `</table>` +
          `<div style="padding-top:12px;font:bold 10px/12px Arial,sans-serif;color:#fff;text-align:right"><div style="white-space:nowrap">BIOMONIE TECHNOLOGIES</div><div style="white-space:nowrap">LIMITED</div></div>` +
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `<tr>` +
    `<td bgcolor="#D9D9D9" background="${u}/${a.bgGrey}" height="64" style="background-color:#D9D9D9;background-image:url(${u}/${a.bgGrey});padding:8px;height:64px;width:285px;box-sizing:border-box" valign="middle">` +
      `<table cellpadding="0" cellspacing="0" width="269" height="64">` +
      `<tr>` +
        `<td width="74" valign="middle" style="padding-right:4px"><img src="${u}/${a.logoWordmark}" width="70" height="31" alt="Biomonie" style="display:block;border:0"></td>` +
        `<td width="195" valign="middle" style="font:8px/11px Arial,sans-serif;color:#333;${tsa}">` +
          `<table cellpadding="0" cellspacing="4" style="margin-bottom:3px"><tr>` +
          `<td><a href="${fb}"><img src="${u}/${a['social-facebook']}" width="18" height="18" alt="Facebook" style="display:block;border:0"></a></td>` +
          `<td><a href="${x}"><img src="${u}/${a['social-x']}" width="18" height="18" alt="X" style="display:block;border:0"></a></td>` +
          `<td><a href="${ig}"><img src="${u}/${a['social-instagram']}" width="18" height="18" alt="Instagram" style="display:block;border:0"></a></td>` +
          `<td><a href="${yt}"><img src="${u}/${a['social-youtube']}" width="18" height="18" alt="YouTube" style="display:block;border:0"></a></td>` +
          `<td><a href="${li}"><img src="${u}/${a['social-linkedin']}" width="18" height="18" alt="LinkedIn" style="display:block;border:0"></a></td>` +
          `<td><a href="${tt}"><img src="${u}/${a['social-tiktok']}" width="18" height="18" alt="TikTok" style="display:block;border:0"></a></td>` +
          `</tr></table>` +
          `<div style="white-space:nowrap">Facebook.com/biomonie | X.com/biomonie</div>` +
          `<div style="white-space:nowrap">Instagram.com/biomonie | Youtube.com/biomonie</div>` +
          `<div style="white-space:nowrap">Linkedin.com/biomonie</div>` +
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `</table></td>` +
  `<td width="315" height="285" bgcolor="#14262F" background="${u}/${a.bgBanner}" style="width:315px;height:285px;background-color:#14262F;background-image:url(${u}/${a.bgBanner});padding:0;line-height:0"><a href="${bannerLink}" style="display:block"><img src="${u}/${a.banner}" width="315" height="285" alt="Biomonie - Download on Google Play and the App Store" style="display:block;border:0;width:315px;height:285px"></a></td>` +
  `</tr></table>`;
}

console.log('Prod 1 phone:', buildExchange({ twoPhones: false }).length);
console.log('Prod 2 phones:', buildExchange({ twoPhones: true }).length);
console.log('Staging 1 phone:', buildExchange({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: false }).length);
console.log('Staging 2 phones:', buildExchange({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: true }).length);
