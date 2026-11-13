import fs from 'node:fs';

const oldStr = fs.readFileSync('docs/exchange-signature.html', 'utf8');

// Let's print oldStr with tags on separate lines
function formatTags(str) {
  return str.replaceAll('><', '>\n<');
}

fs.writeFileSync('scratch/old_formatted.html', formatTags(oldStr));
console.log('Old lines:', formatTags(oldStr).split('\n').length);
