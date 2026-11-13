import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExchangeSignatureHtml } from '../src/lib/signatureBuilder.ts';
import { ASSET_VERSION, normalizeAssetBaseUrl } from '../src/lib/signatureConfig.ts';
import { normalizeOrigin } from '../src/lib/storeLinks.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const rawOrigin = process.env.VITE_SITE_ORIGIN || 'https://biomonie.com';
const siteOrigin = normalizeOrigin(rawOrigin);
const isStaging = siteOrigin.includes('onrender.com');
const assetBaseUrl = process.env.VITE_ASSET_BASE_URL
  ? normalizeAssetBaseUrl(process.env.VITE_ASSET_BASE_URL)
  : `${siteOrigin}/email`;
const versionedAssetBase = `${assetBaseUrl}/${ASSET_VERSION}`;

const docsDir = resolve(__dirname, '../docs');
mkdirSync(docsDir, { recursive: true });

const filesToGenerate = [
  {
    filename: isStaging ? 'exchange-signature.staging.html' : 'exchange-signature.html',
    twoPhones: false,
    label: 'Single Phone',
  },
  {
    filename: isStaging
      ? 'exchange-signature.two-phones.staging.html'
      : 'exchange-signature.two-phones.html',
    twoPhones: true,
    label: 'Two Phones',
  },
];

for (const target of filesToGenerate) {
  const outputPath = resolve(docsDir, target.filename);
  const html = buildExchangeSignatureHtml({ siteOrigin, assetBaseUrl, twoPhones: target.twoPhones });

  if (html.length >= 4900) {
    throw new Error(
      `Exchange signature (${target.filename}) exceeds the 4,900 character safety limit: ${html.length} characters`,
    );
  }
  if (html.includes('localhost') || html.includes('127.0.0.1')) {
    throw new Error(`Exchange signature (${target.filename}) contains localhost or 127.0.0.1 URL`);
  }
  if (!html.includes(`${siteOrigin}/download`)) {
    throw new Error(
      `Exchange signature (${target.filename}) is missing the ${siteOrigin}/download banner link`,
    );
  }

  const imageSources = Array.from(html.matchAll(/<img[^>]+src=("[^"]+"|[^\s>]+)/g)).map(
    (match) => match[1].replace(/^"|"$/g, ''),
  );
  if (imageSources.length < 12) {
    throw new Error(
      `Exchange signature (${target.filename}) has only ${imageSources.length} images`,
    );
  }
  for (const source of imageSources) {
    if (!source.startsWith(`${versionedAssetBase}/`)) {
      throw new Error(
        `Exchange signature (${target.filename}) image ${source} must use ${versionedAssetBase}/`,
      );
    }
  }

  if (isStaging) {
    // Staging deliberately loads the production image set so the two-phone
    // template stays under the 4,900-character Exchange limit. Only links must
    // stay on the staging origin.
    if (html.includes('https://biomonie.com/download')) {
      throw new Error(
        `Staging Exchange signature (${target.filename}) contains a production link`,
      );
    }
  } else if (html.includes('onrender.com')) {
    throw new Error(
      `Production Exchange signature (${target.filename}) contains staging onrender.com URL`,
    );
  }

  writeFileSync(outputPath, html, 'utf-8');
  console.log(
    `Successfully generated docs/${target.filename} (${html.length} characters, ${target.label}) for ${siteOrigin} (assets: ${versionedAssetBase})`,
  );
}
