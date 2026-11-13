/**
 * Write local-only HTML previews for the four Exchange disclaimer templates.
 *
 * docs/preview/ is gitignored: these files are for eyeballing the signature in
 * a browser, not for deployment. Every preview wraps the fragment in a full
 * standards-mode document, and a second *.long.html set stress-tests long
 * directory values.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(__dirname, '..', 'docs');
const previewDir = resolve(docsDir, 'preview');

const templateNames = [
  'exchange-signature.html',
  'exchange-signature.two-phones.html',
  'exchange-signature.staging.html',
  'exchange-signature.two-phones.staging.html',
];

const normal = {
  '%%DisplayName%%': 'Solomon Chukwuka Emmanuel',
  '%%Title%%': 'Senior Software Engineer',
  '%%UserLogonName%%': 'solomon@biomonie.com',
  '%%MobileNumber%%': '+234 801 234 5678',
  '%%PhoneNumber%%': '+234 809 876 5432',
};

const long = {
  '%%DisplayName%%': 'Chukwuemeka Oluwaseun Adeyemi-Johnson',
  '%%Title%%': 'Senior Vice President, Business Development and Partnerships',
  '%%UserLogonName%%': 'chukwuemeka.adeyemi-johnson@biomonie.com',
  '%%MobileNumber%%': '+234 801 234 5678',
  '%%PhoneNumber%%': '+234 809 876 5432',
};

// Long name only: exercises the two-line bottom-aligned name cell without the
// deliberately unrenderable title/email from the extreme sample.
const longname = {
  ...normal,
  '%%DisplayName%%': 'Chukwuemeka Oluwaseun Adeyemi-Johnson',
};

function fill(fragment, values) {
  let html = fragment;
  for (const [token, value] of Object.entries(values)) {
    html = html.split(token).join(value);
  }
  return html;
}

function wrap(fragment) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:20px;background:#fff">${fragment}</body></html>`;
}

mkdirSync(previewDir, { recursive: true });

for (const name of templateNames) {
  const sourcePath = resolve(docsDir, name);
  const fragment = readFileSync(sourcePath, 'utf-8');
  const base = name.replace(/\.html$/, '');

  for (const [suffix, values] of [
    ['', normal],
    ['.longname', longname],
    ['.long', long],
  ]) {
    const outputPath = resolve(previewDir, `${base}${suffix}.html`);
    const documentHtml = wrap(fill(fragment, values));
    writeFileSync(outputPath, documentHtml, 'utf-8');
    console.log(`Wrote docs/preview/${base}${suffix}.html (${documentHtml.length} characters)`);
  }
}
