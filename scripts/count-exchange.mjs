/**
 * Print the exact character count of every Exchange template and fail if any
 * file crosses the 4,900-character safety limit (Microsoft 365 hard limit is
 * 5,000 including the disclaimer wrapper).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const files = [
  'docs/exchange-signature.html',
  'docs/exchange-signature.two-phones.html',
  'docs/exchange-signature.staging.html',
  'docs/exchange-signature.two-phones.staging.html',
];

let failed = false;

for (const file of files) {
  const html = readFileSync(resolve(process.cwd(), file), 'utf-8');
  const count = html.length;
  const spare = 4900 - count;
  const marker = spare < 0 ? 'FAIL' : spare < 100 ? 'WARN' : 'OK';
  console.log(
    `${file.padEnd(56)} ${String(count).padStart(4)} chars  ${String(spare).padStart(4)} spare  ${marker}`,
  );
  if (count >= 4900) failed = true;
}

if (failed) {
  console.error('\nAt least one Exchange template is at or above 4,900 characters.');
  process.exit(1);
}
