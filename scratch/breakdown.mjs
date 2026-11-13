import { signatureAssets } from '../src/lib/signatureConfig.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

const origin = 'https://biomonie1.onrender.com';
const u = `${origin}/email`;
const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
const a = signatureAssets.images;
const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
const w = 'color:#fff;text-decoration:none';
const b0 = 'display:block;border:0';

const partOuter = `<table cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;font-family:Arial,sans-serif;${tsa}"><tr valign="top">...</tr></table>`;
console.log('partOuter:', partOuter.length);

const partNavyTd = `<td width="285" bgcolor="#1B3A50" background="${u}/${a.bgNavy}" height="185" style="background-color:#1B3A50;background-image:url(${u}/${a.bgNavy});padding:12px 12px 8px">...</td>`;
console.log('partNavyTd:', partNavyTd.length);

const partBanner = `<td width="315" height="285" rowspan="2" bgcolor="#14262F" background="${u}/${a.bgBanner}" style="width:315px;height:285px;background-color:#14262F;background-image:url(${u}/${a.bgBanner});padding:0;line-height:0"><a href="${bannerLink}" style="display:block"><img src="${u}/${a.banner}" width="315" height="285" alt="Biomonie" style="display:block;border:0;width:315px;height:285px"></a></td>`;
console.log('partBanner:', partBanner.length);

const partGreyTd = `<td width="285" bgcolor="#D9D9D9" background="${u}/${a.bgGrey}" height="64" style="background-color:#D9D9D9;background-image:url(${u}/${a.bgGrey});padding:8px">...</td>`;
console.log('partGreyTd:', partGreyTd.length);
