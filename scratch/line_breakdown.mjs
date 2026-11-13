import { signatureAssets } from '../src/lib/signatureConfig.ts';
const origin = 'https://biomonie1.onrender.com';
const u = `${origin}/email`;
const a = signatureAssets.images;
const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
const w = 'color:#fff;text-decoration:none';
const b0 = 'display:block;border:0';

const lines = [
  `<table cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;font-family:Arial,sans-serif;${tsa}">`,
  `<tr valign="top">`,
  `<td width="285" bgcolor="#1B3A50" background="${u}/${a.bgNavy}" height="185" style="background-color:#1B3A50;background-image:url(${u}/${a.bgNavy});padding:12px 12px 8px">`,
  `<table cellpadding="0" cellspacing="0" width="261" height="185">`,
  `<tr valign="top">`,
  `<td width="94" valign="middle" style="padding-right:10px"><img src="${u}/${a.logoMark}" width="84" height="118" alt="Biomonie" style="${b0}"></td>`,
  `<td width="167" valign="top" style="color:#fff;${tsa}">`,
  `<div style="font:bold 13px/16px Arial,sans-serif;letter-spacing:.5px;height:32px;overflow:hidden;text-transform:uppercase">%%DisplayName%%</div>`,
  `<div style="font:10px/12px Arial,sans-serif;color:#fff;padding:3px 0 10px;height:24px;overflow:hidden">%%Title%%</div>`,
  `<table cellpadding="0" cellspacing="0" width="167" style="font:9px/14px Arial,sans-serif;color:#fff">`,
  `<tr><td width="14"><img src="${u}/${a.mail}" width="14" height="14" alt="" border="0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;${tsa}"><a href="mailto:%%UserLogonName%%" style="${w}"><span style="${w}">%%UserLogonName%%</span></a></td></tr>`,
  `<tr><td width="14"><img src="${u}/${a.phone}" width="14" height="14" alt="" border="0"></td><td style="padding:0 0 6px 6px;white-space:nowrap;${tsa}"><a href="tel:%%MobileNumber%%" style="${w}"><span style="${w}">%%MobileNumber%%</span></a></td></tr>`,
  `<tr><td width="14"><img src="${u}/${a.website}" width="14" height="14" alt="" border="0"></td><td style="padding-left:6px;white-space:nowrap;${tsa}"><a href="${origin}" style="${w}"><span style="${w}">www.biomonie.com</span></a></td></tr>`,
  `</table>`,
  `<div style="padding-top:12px;font:bold 10px/12px Arial,sans-serif;color:#fff;text-align:right"><div style="white-space:nowrap">BIOMONIE TECHNOLOGIES</div><div style="white-space:nowrap">LIMITED</div></div>`,
  `</td>`,
  `</tr>`,
  `</table>`,
  `</td>`
];

for (const [i, l] of lines.entries()) {
  console.log(`Line ${i}: ${l.length} chars -> ${l.substring(0, 50)}...`);
}
console.log('Total:', lines.reduce((acc, l) => acc + l.length, 0));
