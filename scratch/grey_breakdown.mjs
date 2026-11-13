import { signatureAssets } from '../src/lib/signatureConfig.ts';
const origin = 'https://biomonie1.onrender.com';
const u = `${origin}/email`;
const a = signatureAssets.images;
const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
const b0 = 'display:block;border:0';

const fb = 'https://facebook.com/biomonie';
const x = 'https://x.com/biomonie';
const ig = 'https://instagram.com/biomonie';
const yt = 'https://youtube.com/biomonie';
const li = 'https://linkedin.com/company/biomonie';
const tt = 'https://tiktok.com/@biomonie';

const lines = [
  `<tr valign="top">`,
  `<td width="285" bgcolor="#D9D9D9" background="${u}/${a.bgGrey}" height="64" style="background-color:#D9D9D9;background-image:url(${u}/${a.bgGrey});padding:8px">`,
  `<table cellpadding="0" cellspacing="0" width="269" height="64">`,
  `<tr>`,
  `<td width="74" valign="middle" style="padding-right:4px"><img src="${u}/${a.logoWordmark}" width="70" height="31" alt="Biomonie" style="${b0}"></td>`,
  `<td width="195" valign="middle" style="font:8px/11px Arial,sans-serif;color:#333;white-space:nowrap;${tsa}">`,
  `<table cellpadding="0" cellspacing="4" style="margin-bottom:3px"><tr>`,
  `<td><a href="${fb}"><img src="${u}/${a['social-facebook']}" width="18" height="18" alt="" border="0"></a></td>`,
  `<td><a href="${x}"><img src="${u}/${a['social-x']}" width="18" height="18" alt="" border="0"></a></td>`,
  `<td><a href="${ig}"><img src="${u}/${a['social-instagram']}" width="18" height="18" alt="" border="0"></a></td>`,
  `<td><a href="${yt}"><img src="${u}/${a['social-youtube']}" width="18" height="18" alt="" border="0"></a></td>`,
  `<td><a href="${li}"><img src="${u}/${a['social-linkedin']}" width="18" height="18" alt="" border="0"></a></td>`,
  `<td><a href="${tt}"><img src="${u}/${a['social-tiktok']}" width="18" height="18" alt="" border="0"></a></td>`,
  `</tr></table>`,
  `Facebook.com/biomonie | X.com/biomonie<br>`,
  `Instagram.com/biomonie | Youtube.com/biomonie<br>`,
  `Linkedin.com/biomonie`,
  `</td>`,
  `</tr>`,
  `</table>`,
  `</td>`,
  `</tr>`,
  `</table>`
];

for (const [i, l] of lines.entries()) {
  console.log(`Grey Line ${i}: ${l.length} chars -> ${l.substring(0, 50)}...`);
}
console.log('Total Grey:', lines.reduce((acc, l) => acc + l.length, 0));
