import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  buildSignatureHtml,
  buildExchangeSignatureHtml,
  formatPhoneForTel,
  type SignatureValues,
} from './signatureBuilder.ts';
import {
  ASSET_BASE_URL,
  BANNER_LINK_URL,
  SITE_ORIGIN,
} from './signatureConfig.ts';
import {
  detectPlatform,
  isAppStorePlaceholder,
  normalizeOrigin,
  QR_DOWNLOAD_URL,
} from './storeLinks.ts';

describe('detectPlatform (device detection)', () => {
  it('detects iPhone as ios', () => {
    const iphoneUA =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1';
    assert.strictEqual(detectPlatform(iphoneUA), 'ios');
  });

  it('detects iPad as ios', () => {
    const ipadUA =
      'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1';
    assert.strictEqual(detectPlatform(ipadUA), 'ios');
  });

  it('detects iPod as ios', () => {
    const ipodUA =
      'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1';
    assert.strictEqual(detectPlatform(ipodUA), 'ios');
  });

  it('detects Android as android', () => {
    const androidUA =
      'Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.64 Mobile Safari/537.36';
    assert.strictEqual(detectPlatform(androidUA), 'android');
  });

  it('detects desktop Chrome as desktop', () => {
    const chromeUA =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';
    assert.strictEqual(detectPlatform(chromeUA), 'desktop');
  });

  it('detects unknown, empty, or bot user agents as desktop', () => {
    assert.strictEqual(detectPlatform(''), 'desktop');
    assert.strictEqual(detectPlatform('Googlebot/2.1 (+http://www.google.com/bot.html)'), 'desktop');
    assert.strictEqual(detectPlatform('CustomClient/1.0'), 'desktop');
  });
});

describe('isAppStorePlaceholder (placeholder vs real App Store link)', () => {
  it('identifies default placeholder and variations as placeholder', () => {
    assert.strictEqual(isAppStorePlaceholder('https://apps.apple.com'), true);
    assert.strictEqual(isAppStorePlaceholder('https://apps.apple.com/'), true);
    assert.strictEqual(isAppStorePlaceholder('http://apps.apple.com'), true);
    assert.strictEqual(isAppStorePlaceholder(''), true);
  });

  it('identifies real App Store URLs as not placeholder', () => {
    assert.strictEqual(
      isAppStorePlaceholder('https://apps.apple.com/app/biomonie-purse/id1234567890'),
      false,
    );
    assert.strictEqual(
      isAppStorePlaceholder('https://apps.apple.com/ng/app/biomonie/id678901234'),
      false,
    );
  });
});

describe('normalizeOrigin & SITE_ORIGIN', () => {
  it('strips trailing slashes from origin', () => {
    assert.strictEqual(
      normalizeOrigin('https://biomonie1.onrender.com/'),
      'https://biomonie1.onrender.com',
    );
    assert.strictEqual(
      normalizeOrigin('https://biomonie.com///'),
      'https://biomonie.com',
    );
  });

  it('defaults to https://biomonie.com when unset', () => {
    assert.strictEqual(normalizeOrigin(''), 'https://biomonie.com');
    assert.strictEqual(normalizeOrigin(undefined), 'https://biomonie.com');
  });

  it('derives QR_DOWNLOAD_URL from origin', () => {
    assert.ok(
      QR_DOWNLOAD_URL.startsWith(`${SITE_ORIGIN}/download?utm_source=website`),
      `QR code URL should start with ${SITE_ORIGIN}/download`,
    );
  });
});

describe('buildSignatureHtml', () => {
  const values: SignatureValues = {
    name: '<Ada>',
    title: 'Head & Design',
    email: 'ada@example.com',
    phone: '+234 (0) 807-739 4817',
  };

  it('escapes user input', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('&lt;ADA&gt;'));
    assert.ok(html.includes('Head &amp; Design'));
    assert.ok(!html.includes('<Ada>'));
  });

  it('formats phone numbers for tel links', () => {
    assert.strictEqual(formatPhoneForTel(values.phone), '+23408077394817');
    assert.ok(htmlContains(buildSignatureHtml(values), 'tel:+23408077394817'));
  });

  it('includes all four entered fields', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('&lt;ADA&gt;'));
    assert.ok(html.includes('Head &amp; Design'));
    assert.ok(html.includes('ada@example.com'));
    assert.ok(html.includes('+234 (0) 807-739 4817'));
  });

  it('ensures all image URLs point to assetBaseUrl (default https://biomonie.com/email/...)', () => {
    const html = buildSignatureHtml(values);
    const imgMatches = Array.from(html.matchAll(/<img[^>]+src="([^">]+)"/g));
    assert.ok(imgMatches.length >= 10, 'Should contain all signature images');
    for (const match of imgMatches) {
      const src = match[1];
      assert.ok(
        src.startsWith(`${ASSET_BASE_URL}/`),
        `Image src ${src} must start with ${ASSET_BASE_URL}/`,
      );
    }
  });

  it('ensures every image has width, height, alt and display:block', () => {
    const html = buildSignatureHtml(values);
    const imgTags = html.match(/<img[^>]+>/g) || [];
    assert.ok(imgTags.length >= 10, 'Should have images');
    for (const tag of imgTags) {
      assert.ok(/width="[0-9]+"/.test(tag), `Image tag missing width: ${tag}`);
      assert.ok(/height="[0-9]+"/.test(tag), `Image tag missing height: ${tag}`);
      assert.ok(/alt="[^"]*"/.test(tag), `Image tag missing alt: ${tag}`);
      assert.ok(
        /style="[^"]*display:\s*block[^"]*"/.test(tag),
        `Image tag missing display:block: ${tag}`,
      );
    }
  });

  it('renders a single 315x285 banner image inside the right-column 315px cell with bgcolor #14262F', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('bgcolor="#14262F"'));
    assert.ok(html.includes('banner.gif'));
    assert.ok(html.includes('width="315" height="285"'));
    assert.ok(
      html.includes(
        'alt="Biomonie, the first-ever global biometric cardless payment ecosystem. Download on Google Play and the App Store."',
      ),
    );
  });

  it('links the banner image to /download with UTM tags and no localhost URL', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('/download'));
    assert.ok(html.includes('utm_source=email_signature'));
    assert.ok(html.includes('utm_medium=email'));
    assert.ok(html.includes('utm_campaign=signature_banner'));
    assert.ok(!html.includes('localhost'));
    assert.ok(!html.includes('127.0.0.1'));
  });

  it('supports custom siteOrigin for staging (e.g. onrender.com)', () => {
    const stagingHtml = buildSignatureHtml(values, {
      siteOrigin: 'https://biomonie1.onrender.com',
    });
    assert.ok(stagingHtml.includes('https://biomonie1.onrender.com/download'));
    assert.ok(stagingHtml.includes('https://biomonie1.onrender.com/email/'));
    assert.ok(stagingHtml.includes('href="https://biomonie1.onrender.com"'));
    assert.ok(stagingHtml.includes('>www.biomonie.com<'));
    assert.ok(!stagingHtml.includes('https://biomonie.com/email'));
  });

  it('fails if any src or href attribute contains https://biomonie.com when origin is https://biomonie1.onrender.com', () => {
    const stagingOrigin = 'https://biomonie1.onrender.com';
    const html = buildSignatureHtml(values, {
      siteOrigin: stagingOrigin,
      sampleState: false,
    });

    // Find all src and href attribute values
    const attrRegex = /\s(?:src|href)="([^"]+)"/g;
    const matches = Array.from(html.matchAll(attrRegex));

    assert.ok(matches.length > 0, 'Signature HTML must contain src and href attributes');

    const violations: string[] = [];
    for (const match of matches) {
      const attrVal = match[1];
      if (attrVal.includes('https://biomonie.com')) {
        violations.push(attrVal);
      }
    }

    assert.deepStrictEqual(
      violations,
      [],
      `Found src or href attributes containing https://biomonie.com: ${violations.join(', ')}`,
    );

    // Verify all image src attributes use the staging origin
    const imgMatches = Array.from(html.matchAll(/<img[^>]+src="([^">]+)"/g));
    for (const img of imgMatches) {
      assert.ok(
        img[1].startsWith(`${stagingOrigin}/email/`),
        `Image src ${img[1]} must start with ${stagingOrigin}/email/`,
      );
    }

    // Verify banner link href uses the staging origin
    assert.ok(
      html.includes(`href="${stagingOrigin}/download?utm_source=email_signature`),
      'Banner link must point to staging download URL',
    );

    // Verify website link href uses staging origin
    assert.ok(
      html.includes(`href="${stagingOrigin}"`),
      'Website link href must point to staging origin',
    );

    // Verify intentional visible display text remains www.biomonie.com
    assert.ok(
      html.includes('>www.biomonie.com<'),
      'Visible text must remain www.biomonie.com',
    );
  });

  it('shrinks name font for longer names', () => {
    const shortNameHtml = buildSignatureHtml({ ...values, name: 'Short Name' });
    assert.ok(shortNameHtml.includes('font-size:15px'));

    const medNameHtml = buildSignatureHtml({
      ...values,
      name: 'Christopher Alexander',
    });
    assert.ok(medNameHtml.includes('font-size:13px'));

    const longNameHtml = buildSignatureHtml({
      ...values,
      name: 'Bartholomew Maximillian Montgomery',
    });
    assert.ok(longNameHtml.includes('font-size:11px'));
  });

  it('formats social text with 8px font and wide container to prevent clipping', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('font-size:8px;line-height:12px;'));
    assert.ok(html.includes('Instagram.com/biomonie'));
    assert.ok(html.includes('Youtube.com/biomonie'));
    assert.ok(html.includes('Facebook.com/biomonie'));
    assert.ok(html.includes('X.com/biomonie'));
    assert.ok(html.includes('Linkedin.com/biomonie'));
  });

  it('handles empty state sample text in preview and never in export', () => {
    const emptyValues: SignatureValues = { name: '', title: '', email: '', phone: '' };

    // Preview mode: shows greyed sample text
    const preview = buildSignatureHtml(emptyValues, { sampleState: true });
    assert.ok(preview.includes('YOUR NAME'));
    assert.ok(preview.includes('Job Title'));
    assert.ok(preview.includes('name@biomonie.com'));
    assert.ok(preview.includes('+234 000 000 0000'));
    assert.ok(preview.includes('#9cb3c1'));

    // Production export mode: never includes sample text
    const production = buildSignatureHtml(emptyValues, { sampleState: false });
    assert.ok(!production.includes('YOUR NAME'));
    assert.ok(!production.includes('Job Title'));
    assert.ok(!production.includes('name@biomonie.com'));
    assert.ok(!production.includes('+234 000 000 0000'));
  });
});

describe('Exchange Signature template (Production & Staging)', () => {
  it('generates an Exchange template strictly under 4,500 characters with variables and no localhost URLs', () => {
    const html = buildExchangeSignatureHtml();
    assert.ok(
      html.length < 4500,
      `Exchange HTML length (${html.length}) must be strictly under 4,500 characters`,
    );
    assert.ok(!html.includes('localhost'), 'Exchange HTML must not contain localhost');
    assert.ok(!html.includes('127.0.0.1'), 'Exchange HTML must not contain 127.0.0.1');

    assert.ok(html.includes('%%DisplayName%%'));
    assert.ok(html.includes('%%Title%%'));
    assert.ok(html.includes('%%UserLogonName%%'));
    assert.ok(html.includes('%%MobileNumber%%'));
    assert.ok(html.includes('mailto:%%UserLogonName%%'));
    assert.ok(html.includes('tel:%%MobileNumber%%'));

    // Points banner link to /download with UTM tags
    assert.ok(html.includes('https://biomonie.com/download'));
    assert.ok(html.includes('utm_source=email_signature'));
    assert.ok(html.includes('utm_medium=email'));
    assert.ok(html.includes('utm_campaign=signature_banner'));

    // Fixed 13px name and 2-line containers for name and title
    assert.ok(
      html.includes(
        'font:bold 13px/16px Georgia,serif;letter-spacing:.5px;height:32px;overflow:hidden;text-transform:uppercase',
      ),
    );
    assert.ok(
      html.includes(
        'font:11px/14px Georgia,serif;height:28px;overflow:hidden;padding:2px 0 6px',
      ),
    );

    const imgTags = html.match(/<img[^>]+>/g) || [];
    assert.strictEqual(imgTags.length, 12, 'Exchange signature must contain all 12 images');
    for (const tag of imgTags) {
      assert.ok(/width="[0-9]+"/.test(tag), `Exchange image missing width: ${tag}`);
      assert.ok(/height="[0-9]+"/.test(tag), `Exchange image missing height: ${tag}`);
      assert.ok(/alt="[^"]*"/.test(tag), `Exchange image missing alt: ${tag}`);
      assert.ok(
        /display:\s*block/.test(tag),
        `Exchange image missing display:block: ${tag}`,
      );
    }
  });

  it('matches the written docs/exchange-signature.html file within 4,500 chars limit for production', () => {
    const filePath = resolve(process.cwd(), 'docs/exchange-signature.html');
    assert.ok(existsSync(filePath), 'docs/exchange-signature.html must exist');
    const content = readFileSync(filePath, 'utf-8');
    assert.ok(
      content.length < 4500,
      `docs/exchange-signature.html is ${content.length} characters (must be < 4500)`,
    );
    assert.ok(content.includes('https://biomonie.com/download'));
    assert.ok(content.includes('https://biomonie.com/email/'));
    assert.ok(!content.includes('onrender.com'));
    assert.ok(!content.includes('localhost'));
    assert.ok(!content.includes('127.0.0.1'));
  });

  it('matches the written docs/exchange-signature.staging.html file within 4,500 chars limit for staging', () => {
    const filePath = resolve(process.cwd(), 'docs/exchange-signature.staging.html');
    assert.ok(existsSync(filePath), 'docs/exchange-signature.staging.html must exist');
    const content = readFileSync(filePath, 'utf-8');
    assert.ok(
      content.length < 4500,
      `docs/exchange-signature.staging.html is ${content.length} characters (must be < 4500)`,
    );
    assert.ok(content.includes('https://biomonie1.onrender.com/download'));
    assert.ok(content.includes('https://biomonie1.onrender.com/email/'));
    assert.ok(!content.includes('biomonie.com/email'));
    assert.ok(!content.includes('localhost'));
    assert.ok(!content.includes('127.0.0.1'));

    // Verify no src or href contains https://biomonie.com
    const matches = Array.from(content.matchAll(/\s(?:src|href)="([^"]+)"/g));
    const violations = matches.map((m) => m[1]).filter((val) => val.includes('https://biomonie.com'));
    assert.deepStrictEqual(
      violations,
      [],
      `Found staging Exchange src or href containing https://biomonie.com: ${violations.join(', ')}`,
    );
  });
});

function htmlContains(html: string, needle: string) {
  return html.includes(needle);
}
