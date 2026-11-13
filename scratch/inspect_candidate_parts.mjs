import { buildCandidate } from './optimize_exchange.mjs';

const s = buildCandidate({ siteOrigin: 'https://biomonie1.onrender.com', twoPhones: true });

// Strip all style="..."
const noStyles = s.replace(/style="[^"]*"/g, '');
console.log('Length without style attributes:', noStyles.length);
console.log('Length of styles alone:', s.length - noStyles.length);
