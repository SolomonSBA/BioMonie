import { buildExchangeMinified } from './test_minify.mjs';

const html = buildExchangeMinified({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: true });
console.log('Total length:', html.length);

const chunks = html.split('><');
console.log('Number of chunks:', chunks.length);
chunks.forEach((c, i) => {
  if (c.length > 50) {
    console.log(i, c.length, c.slice(0, 70));
  }
});
