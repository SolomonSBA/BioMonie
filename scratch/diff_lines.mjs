import fs from 'node:fs';

const s = fs.readFileSync('scratch/test_opt4.mjs', 'utf8');
const fn = s.slice(s.indexOf('function buildExchange'), s.indexOf('console.log'));
const evalFn = new Function('signatureAssets', 'normalizeOrigin', 'return ' + fn);
import('../src/lib/signatureConfig.ts').then(c => {
  import('../src/lib/storeLinks.ts').then(l => {
    const fnObj = evalFn(c.signatureAssets, l.normalizeOrigin);
    const newHtml = fnObj({ twoPhones: false, siteOrigin: 'https://biomonie.com' });
    const oldHtml = fs.readFileSync('docs/exchange-signature.html', 'utf8');

    function fmt(str) { return str.replaceAll('><', '>\n<'); }
    fs.writeFileSync('scratch/new_formatted.html', fmt(newHtml));

    const oldLines = fmt(oldHtml).split('\n');
    const newLines = fmt(newHtml).split('\n');

    console.log('Old line count:', oldLines.length);
    console.log('New line count:', newLines.length);

    for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
      if (oldLines[i] !== newLines[i]) {
        console.log(`[Line ${i + 1}]`);
        console.log('  OLD:', oldLines[i]);
        console.log('  NEW:', newLines[i]);
      }
    }
  });
});
