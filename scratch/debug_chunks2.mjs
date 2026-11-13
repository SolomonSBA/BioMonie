import { buildExchangeMinified } from './test_minify.mjs';

const html = buildExchangeMinified({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: true });
console.log('Total length:', html.length);

const chunks = html.split('><');
let running = 0;
chunks.forEach((c, i) => {
  running += c.length + 2;
  console.log(`[${i}] len=${c.length} accum=${running} | <${c.slice(0, 50)}>`);
});
