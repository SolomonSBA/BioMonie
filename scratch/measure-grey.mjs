import { buildExchangeSignatureHtml } from '../src/lib/signatureBuilder.ts';

const h = buildExchangeSignatureHtml({
  siteOrigin: 'https://biomonie1.onrender.com',
  twoPhones: true,
});
const g = h.slice(h.indexOf('<tr><td width=285 bgcolor=#D9D9D9'), h.indexOf('<td width=315 height=285'));
console.log('grey length', g.length);
console.log(g);
