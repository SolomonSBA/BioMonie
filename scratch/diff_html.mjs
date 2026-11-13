import fs from 'node:fs';
import { buildExchangeMinified } from './test_minify.mjs';

const oldHtml = fs.readFileSync('docs/exchange-signature.html', 'utf8');
const newHtml = buildExchangeMinified({ twoPhones: false, siteOrigin: 'https://biomonie.com' });

console.log('Old length:', oldHtml.length);
console.log('New length:', newHtml.length);
console.log('Difference:', newHtml.length - oldHtml.length);

// Let's do a word/token diff
const oldParts = oldHtml.split(/([<>\s=";]+)/);
const newParts = newHtml.split(/([<>\s=";]+)/);

// Print the newHtml with highlighting of what wasn't in oldHtml
console.log('--- Old HTML ---');
console.log(oldHtml);
console.log('--- New HTML ---');
console.log(newHtml);
