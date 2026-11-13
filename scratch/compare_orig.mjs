import { readFileSync } from 'fs';
import { buildCandidate2 } from './optimize_exchange2.mjs';

const orig = readFileSync('docs/exchange-signature.html', 'utf8');
const cand = buildCandidate2({ siteOrigin: 'https://biomonie.com', twoPhones: false });

console.log('Original length:', orig.length);
console.log('Candidate length:', cand.length);
console.log('Difference:', cand.length - orig.length);
