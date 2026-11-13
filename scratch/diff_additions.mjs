import { readFileSync } from 'fs';
import { buildCandidate2 } from './optimize_exchange2.mjs';

const orig = readFileSync('docs/exchange-signature.html', 'utf8');
const cand = buildCandidate2({ siteOrigin: 'https://biomonie.com', twoPhones: false });

// Let's check phrases in cand that are not in orig:
const additions = [
  '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;',
  'bg-navy.png',
  'bg-grey.png',
  'bg-banner.png',
  'background-image',
  'white-space:nowrap',
  '<span style="color:#fff;text-decoration:none">%%MobileNumber%%</span>',
  'BIOMONIE TECHNOLOGIES</div><div style="white-space:nowrap">LIMITED',
  'height:285px'
];

for (const a of additions) {
  const countCand = (cand.match(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  const countOrig = (orig.match(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
  console.log(`"${a}": count in cand=${countCand}, orig=${countOrig}, delta=${(countCand - countOrig) * a.length} chars`);
}
