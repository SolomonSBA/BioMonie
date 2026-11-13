import { buildCandidate } from './optimize_exchange.mjs';

const s = buildCandidate({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: true });
console.log('Total:', s.length);
console.log('table count:', (s.match(/<table/g) || []).length);
console.log('td count:', (s.match(/<td/g) || []).length);
console.log('style count:', (s.match(/style="/g) || []).length);

// Let's print out what the largest styles are:
const styles = Array.from(s.matchAll(/style="([^"]+)"/g)).map(m => m[1]);
console.log('\nStyles list:');
styles.forEach((st, i) => console.log(`${i}: (${st.length} chars) ${st}`));
