import { buildExchangeSignatureHtml } from '../src/lib/signatureBuilder.ts';

const h = buildExchangeSignatureHtml({
  siteOrigin: 'https://biomonie1.onrender.com',
  twoPhones: true,
});
const marks = [
  '<td width=285><table',
  '<tr><td width=285 bgcolor=#1B3A50',
  '<tr><td width=285 bgcolor=#D9D9D9',
  '<td width=315 height=285',
];
let prev = 0;
for (const k of marks) {
  const i = h.indexOf(k);
  console.log(k, i, i - prev);
  prev = i;
}
console.log('total', h.length);
console.log('images', (h.match(/<img/g) || []).length);
console.log('spacers', (h.match(/mso-line-height-rule:exactly/g) || []).length);
console.log('anchors', (h.match(/<a /g) || []).length);
console.log('\n--- NAVY ---\n');
console.log(h.slice(h.indexOf('<tr><td width=285 bgcolor=#1B3A50'), h.indexOf('<tr><td width=285 bgcolor=#D9D9D9')));
