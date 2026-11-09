import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExchangeSignatureHtml } from '../src/lib/signatureBuilder.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawOrigin = process.env.VITE_SITE_ORIGIN || 'https://biomonie.com';
const siteOrigin = normalizeOrigin(rawOrigin);
const isStaging = siteOrigin.includes('onrender.com');

const filename = isStaging ? 'exchange-signature.staging.html' : 'exchange-signature.html';
const outputPath = resolve(__dirname, `../docs/${filename}`);

mkdirSync(dirname(outputPath), { recursive: true });
const html = buildExchangeSignatureHtml({ siteOrigin });

if (html.length > 4500) {
  throw new Error(`Exchange signature exceeds 4,500 character limit: ${html.length} characters`);
}
if (html.includes('localhost') || html.includes('127.0.0.1')) {
  throw new Error('Exchange signature contains localhost or 127.0.0.1 URL');
}

if (isStaging) {
  if (html.includes('biomonie.com/email')) {
    throw new Error('Staging Exchange signature contains production biomonie.com/email asset URL');
  }
} else {
  if (html.includes('onrender.com')) {
    throw new Error('Production Exchange signature contains staging onrender.com URL');
  }
}

writeFileSync(outputPath, html, 'utf-8');
console.log(`Successfully generated docs/${filename} (${html.length} characters) for ${siteOrigin}`);
