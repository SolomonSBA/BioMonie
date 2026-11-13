import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import sharp from 'sharp';
import {
  buildSignatureHtml,
  buildSignatureDocument,
  buildExchangeSignatureHtml,
  renderExchangeSignaturePreview,
  signaturePlainText,
  formatPhoneForTel,
  getContactFontSize,
  getSignatureLayout,
  COMPANY_ALIGN,
  BASE_DESIGN,
  TOTAL_WIDTH,
  LEFT_COLUMN_WIDTH,
  BANNER_WIDTH,
  BANNER_HEIGHT,
  NAVY_HEIGHT,
  GREY_HEIGHT,
  TOTAL_LEFT_HEIGHT,
  NAME_FONT_SIZE_DEFAULT,
  NAME_FONT_SIZE_MID,
  NAME_FONT_SIZE_SMALL,
  JOB_TITLE_FONT_SIZE,
  CONTACT_FONT_SIZE,
  EMAIL_FONT_SIZE,
  COMPANY_NAME_FONT_SIZE,
  SOCIAL_FONT_SIZE,
  LOGO_MARK_WIDTH,
  LOGO_MARK_HEIGHT,
  BANNER_ALT,
  EXCHANGE_EMAIL_VAR,
  EXCHANGE_SAMPLES,
  SIGNATURE_SCALE,
  type SignatureValues,
} from './signatureBuilder.ts';
import {
  ASSET_BASE_URL,
  ASSET_VERSION,
  SITE_ORIGIN,
  normalizeAssetBaseUrl,
  resolveAssetBaseUrl,
  signatureSocials,
  versionedAssetBaseUrl,
} from './signatureConfig.ts';
import {
  detectPlatform,
  isAppStorePlaceholder,
  normalizeOrigin,
  QR_DOWNLOAD_URL,
} from './storeLinks.ts';

const values: SignatureValues = {
  name: '<Ada>',
  title: 'Head & Design',
  email: 'ada@example.com',
  phone: '+234 (0) 807-739 4817',
};

const worstCase: SignatureValues = {
  name: 'Solomon Chukwuka Emmanuel',
  title: 'Senior Software Engineer / Technical Lead',
  email: 'solomon.chukwuka.emmanuel@biomonie.com',
  phone: '+234 (0) 801 234 5678',
  secondPhone: '+234 (0) 809 876 5432',
};

function navyBlock(html: string) {
  const start = html.indexOf('bgcolor="#1B3A50"');
  const end = html.indexOf('bgcolor="#D9D9D9"');
  return start >= 0 && end > start ? html.slice(start, end) : '';
}

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
    assert.strictEqual(normalizeOrigin('https://biomonie.com///'), 'https://biomonie.com');
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
  it('escapes user input', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('&lt;ADA&gt;'));
    assert.ok(html.includes('Head &amp; Design'));
    assert.ok(!html.includes('<Ada>'));
  });

  it('formats phone numbers for tel links', () => {
    const html = buildSignatureHtml(values);
    assert.strictEqual(formatPhoneForTel(values.phone), '+23408077394817');
    assert.ok(html.includes('tel:+23408077394817'));
  });

  it('includes all entered fields', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('&lt;ADA&gt;'));
    assert.ok(html.includes('Head &amp; Design'));
    assert.ok(html.includes('ada@example.com'));
    assert.ok(html.includes('+234 (0) 807-739 4817'));
  });

  it('points all image URLs at the versioned asset base', () => {
    const html = buildSignatureHtml(values);
    const imgMatches = Array.from(html.matchAll(/<img[^>]+src="([^">]+)"/g));
    assert.ok(imgMatches.length >= 10, 'Should contain all signature images');
    for (const match of imgMatches) {
      assert.ok(
        match[1].startsWith(`${ASSET_BASE_URL}/${ASSET_VERSION}/`),
        `Image src ${match[1]} must use ${ASSET_BASE_URL}/${ASSET_VERSION}/`,
      );
    }
  });

  it('ensures every image has width, height, alt, border=0 and display:block', () => {
    const html = buildSignatureHtml(values);
    const imgTags = html.match(/<img[^>]+>/g) || [];
    assert.ok(imgTags.length >= 10, 'Should have images');
    for (const tag of imgTags) {
      assert.ok(/width="[0-9]+"/.test(tag), `Image tag missing width: ${tag}`);
      assert.ok(/height="[0-9]+"/.test(tag), `Image tag missing height: ${tag}`);
      assert.ok(/alt="[^"]+"/.test(tag), `Image tag missing alt: ${tag}`);
      assert.ok(/border="0"/.test(tag), `Image tag missing border=0: ${tag}`);
      assert.ok(/style="[^"]*display:\s*block[^"]*"/.test(tag), `Image tag missing display:block: ${tag}`);
    }
  });

  it('renders the banner at the scaled display size with bgcolor only (no tile)', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('bgcolor="#14262F"'));
    assert.ok(html.includes('background-color:#14262F'));
    assert.ok(!html.includes('bg-banner.png'));
    assert.ok(!html.includes('background-image'));
    assert.ok(html.includes(`width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}"`));
    assert.ok(html.includes(`width:${BANNER_WIDTH}px;height:${BANNER_HEIGHT}px`));
    assert.ok(html.includes(`alt="${BANNER_ALT}"`));
  });

  it('links the banner to /download with UTM tags and no localhost URL', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('/download'));
    assert.ok(html.includes('utm_source=email_signature'));
    assert.ok(html.includes('utm_medium=email'));
    assert.ok(html.includes('utm_campaign=signature_banner'));
    assert.ok(!html.includes('localhost'));
    assert.ok(!html.includes('127.0.0.1'));
  });

  it('supports a custom siteOrigin for staging', () => {
    const stagingHtml = buildSignatureHtml(values, {
      siteOrigin: 'https://biomonie1.onrender.com',
    });
    assert.ok(stagingHtml.includes('https://biomonie1.onrender.com/download'));
    assert.ok(stagingHtml.includes(`https://biomonie1.onrender.com/email/${ASSET_VERSION}/`));
    assert.ok(stagingHtml.includes('href="https://biomonie1.onrender.com"'));
    assert.ok(stagingHtml.includes('>www.biomonie.com<'));
    assert.ok(!stagingHtml.includes('https://biomonie.com/email'));
  });

  it('shrinks the name font for longer names', () => {
    const shortNameHtml = buildSignatureHtml({ ...values, name: 'Short Name' });
    assert.ok(shortNameHtml.includes(`font-size:${NAME_FONT_SIZE_DEFAULT}px`));

    const medNameHtml = buildSignatureHtml({ ...values, name: 'Christopher Alexander' });
    assert.ok(medNameHtml.includes(`font-size:${NAME_FONT_SIZE_MID}px`));

    const longNameHtml = buildSignatureHtml({
      ...values,
      name: 'Bartholomew Maximillian Montgomery',
    });
    assert.ok(longNameHtml.includes(`font-size:${NAME_FONT_SIZE_SMALL}px`));
  });

  it('keeps text-size-adjust:none and white-space:nowrap on text', () => {
    const html = buildSignatureHtml(values);
    assert.ok((html.match(/-webkit-text-size-adjust:none/g) || []).length >= 8);
    assert.ok((html.match(/-ms-text-size-adjust:none/g) || []).length >= 8);
    assert.ok((html.match(/white-space:nowrap/g) || []).length >= 6);
    for (const text of ['ada@example.com', '+234 (0) 807-739 4817', 'www.biomonie.com']) {
      const index = html.indexOf(text);
      assert.ok(index > 0, `Expected ${text}`);
      const nearby = html.slice(Math.max(0, index - 300), index);
      assert.ok(nearby.includes('white-space:nowrap'), `Expected nowrap near ${text}`);
    }
  });

  it('uses scaled social text, wordmark and three non-wrapping lines', () => {
    const html = buildSignatureHtml(values);
    const layout = getSignatureLayout(SIGNATURE_SCALE);
    assert.ok(
      html.includes(
        `font-size:${layout.fonts.social}px;line-height:${layout.socialLineHeight}px;mso-line-height-rule:exactly;color:#333333`,
      ),
    );
    assert.ok(html.includes(`width="${layout.wordmarkWidth}" height="${layout.wordmarkHeight}"`));
    assert.ok(html.includes('Instagram.com/biomonie'));
    assert.ok(html.includes('Youtube.com/biomonie'));
    assert.ok(html.includes('Facebook.com/biomonie'));
    assert.ok(html.includes('X.com/biomonie'));
    assert.ok(html.includes('Linkedin.com/biomonie'));
  });

  it('uses Arial typography only and no Georgia or serif font family', () => {
    const html = buildSignatureHtml(values);
    assert.ok(!html.includes('Georgia'));
    assert.ok(!html.replace(/sans-serif/gi, '').includes('serif'));
    assert.ok(html.includes('Arial,Helvetica,sans-serif'));
  });

  it('writes the company name as two literal left-aligned nowrap lines', () => {
    assert.strictEqual(COMPANY_ALIGN, 'left');
    const layout = getSignatureLayout(SIGNATURE_SCALE);
    const html = buildSignatureHtml(values);
    assert.ok(html.includes('text-align:left'));
    assert.ok(html.includes('>BIOMONIE TECHNOLOGIES</div>'));
    assert.ok(html.includes('>LIMITED</div>'));
    assert.ok(
      html.includes(
        `font-size:${layout.fonts.company}px;line-height:${layout.companyLineHeight}px;mso-line-height-rule:exactly;font-weight:bold;letter-spacing:0;color:#FFFFFF;text-align:left`,
      ),
    );
    const companyIndex = html.indexOf('BIOMONIE TECHNOLOGIES');
    const limitedIndex = html.indexOf('>LIMITED</div>', companyIndex);
    assert.ok(limitedIndex > companyIndex, 'LIMITED must directly follow BIOMONIE TECHNOLOGIES');
    const companySnippet = html.slice(html.lastIndexOf('<div', companyIndex), limitedIndex + 20);
    assert.ok(
      (companySnippet.match(/white-space:nowrap/g) || []).length >= 2,
      'Both company lines must be nowrap',
    );
  });

  it('supports right-aligned company lines when COMPANY_ALIGN is right', () => {
    const html = buildSignatureHtml(values, { companyAlign: 'right' });
    assert.ok(html.includes('text-align:right'));
    assert.ok(html.includes('>BIOMONIE TECHNOLOGIES</div>'));
    assert.ok(html.includes('>LIMITED</div>'));
    assert.ok(!html.includes('text-align:left'));
  });

  it('renders contacts, then the company name, then the website row last', () => {
    const block = navyBlock(buildSignatureHtml(worstCase));
    assert.ok(block.length > 0, 'Navy block must exist');
    const emailIndex = block.indexOf('alt="Email"');
    const phoneIndex = block.indexOf('alt="Phone"');
    const secondPhoneIndex = block.indexOf('alt="Phone"', phoneIndex + 1);
    const companyIndex = block.indexOf('BIOMONIE TECHNOLOGIES');
    const websiteIndex = block.indexOf('alt="Website"');
    assert.ok(emailIndex > 0 && phoneIndex > emailIndex, 'Email then phone');
    assert.ok(secondPhoneIndex > phoneIndex, 'Second phone after the first phone');
    assert.ok(companyIndex > secondPhoneIndex, 'Company name must be below the contacts');
    assert.ok(websiteIndex > companyIndex, 'Website must be the last row, below the company name');
    const tail = block.slice(websiteIndex);
    assert.ok(!tail.includes('alt="Email"'));
    assert.ok(!tail.includes('alt="Phone"'));
    assert.ok(!tail.includes('BIOMONIE TECHNOLOGIES'));
  });

  it('puts the name in a two-line bottom-aligned cell directly above the title', () => {
    const layout = getSignatureLayout(SIGNATURE_SCALE);
    const html = buildSignatureHtml(worstCase);
    const nameCell = html.match(
      new RegExp(
        `<td width="${layout.textColumnWidth}" height="${layout.nameCellHeight}" valign="bottom"[^>]*>[^<]*</td>`,
      ),
    );
    assert.ok(nameCell, 'Name must be a fixed two-line cell with valign="bottom"');
    assert.ok(
      nameCell[0].includes(`height:${layout.nameCellHeight}px`) &&
        nameCell[0].includes(`line-height:${layout.nameLineHeight}px`),
      'Name cell height and line-height must come from the layout',
    );

    const titleIndex = html.indexOf(`height="${layout.titleRowHeight}" valign="top"`);
    assert.ok(titleIndex > 0, 'Title row must reserve two lines plus the title gap');
    const emailRow = html.indexOf('alt="Email"');
    const titleClose = html.indexOf('</td>', titleIndex);
    assert.ok(emailRow > titleClose, 'The first contact row must follow the title row');
    assert.ok(
      !html.includes('height="132" valign="bottom"'),
      'Contacts must not be bottom-anchored',
    );
  });

  it('pins the contact table columns without relying on colgroup (Word ignores it)', () => {
    const layout = getSignatureLayout(SIGNATURE_SCALE);
    const html = buildSignatureHtml(values);
    const opener = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${layout.textColumnWidth}" style="width:${layout.textColumnWidth}px;border-collapse:collapse;table-layout:fixed;">`;
    // The contact table is the last table at the text-column width.
    const start = html.lastIndexOf(opener);
    assert.ok(start > 0, 'Contact table must exist');
    // Classic Outlook/Word drops <colgroup>, so column widths must live on cells.
    assert.ok(!html.includes('<colgroup'), 'Do not rely on colgroup');
    assert.ok(
      html
        .slice(start + opener.length)
        .startsWith(`<tr><td width="${layout.contactIconCellWidth}"`),
      'The contact table must open with a real two-column contact row',
    );
    const contactTable = html.slice(start, html.indexOf('</table>', start));
    assert.ok(
      !contactTable.split('alt="Email"')[0].includes('colspan="2"'),
      'No spanning row may precede the first contact row, or Word splits the table in half',
    );
    assert.ok(
      html.includes(`width:${layout.contactIconCellWidth}px;line-height:0`),
      'The icon cell must own the whole icon gutter (no extra padding that pushes the text out)',
    );
    assert.ok(
      html.includes(
        `width:${layout.contactTextCellWidth}px;font-family:Arial,Helvetica,sans-serif`,
      ),
    );
  });

  it('uses a scaled logo mark, gap and three-row logo span', () => {
    const layout = getSignatureLayout(SIGNATURE_SCALE);
    const html = buildSignatureHtml(values);
    assert.strictEqual(LOGO_MARK_WIDTH, layout.logoMarkWidth);
    assert.strictEqual(LOGO_MARK_HEIGHT, layout.logoMarkHeight);
    assert.ok(html.includes(`width="${LOGO_MARK_WIDTH}" height="${LOGO_MARK_HEIGHT}"`));
    assert.ok(html.includes(`width:${LOGO_MARK_WIDTH}px;height:${LOGO_MARK_HEIGHT}px`));
    assert.ok(html.includes('rowspan="3"'));
    assert.ok(html.includes(`width="${layout.logoColumnWidth}"`));
    assert.ok(html.includes(`padding:0 ${layout.logoTextGap}px 0 0`));
  });

  it('keeps the left column and banner at the same scaled height', () => {
    const layout = getSignatureLayout(SIGNATURE_SCALE);
    assert.strictEqual(NAVY_HEIGHT, layout.navyHeight);
    assert.strictEqual(GREY_HEIGHT, layout.greyHeight);
    assert.strictEqual(TOTAL_LEFT_HEIGHT, layout.bannerHeight);
    assert.strictEqual(layout.navyHeight + layout.greyHeight, layout.bannerHeight);

    const combinations: SignatureValues[] = [
      { name: 'Miracle Amos', title: 'UX Designer', email: 'miracle@biomonie.com', phone: '+234 807 739 4817' },
      { name: 'Solomon Chukwuka Emmanuel', title: 'Senior Software Engineer', email: 'solomon@biomonie.com', phone: '+234 801 234 5678' },
      { name: 'Miracle Amos', title: 'UX Designer', email: 'miracle@biomonie.com', phone: '+234 807 739 4817', secondPhone: '+234 809 111 2222' },
      worstCase,
    ];

    for (const combo of combinations) {
      const html = buildSignatureHtml(combo);
      assert.ok(html.includes(`height="${NAVY_HEIGHT}"`), `Navy height missing for ${combo.name}`);
      assert.ok(html.includes(`height="${GREY_HEIGHT}"`), `Grey height missing for ${combo.name}`);
      assert.ok(
        html.includes(`width="${layout.navyContentWidth}" height="${layout.navyInnerHeight}"`),
      );
      assert.ok(html.includes(`height="${layout.nameCellHeight}"`));
      assert.ok(html.includes(`height="${layout.titleRowHeight}"`));
      assert.ok(html.includes(`height="${layout.bottomRowHeight}"`));
      assert.ok(html.includes(`width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}"`));
    }
  });

  it('uses bgcolor/background-color only (no tiles, no background attributes)', () => {
    const html = buildSignatureHtml(values);
    for (const hex of ['#1B3A50', '#D9D9D9', '#14262F']) {
      assert.ok(html.includes(`bgcolor="${hex}"`), `Missing bgcolor ${hex}`);
      assert.ok(html.includes(`background-color:${hex}`), `Missing background-color ${hex}`);
    }
    assert.ok(!/bg-(navy|grey|banner)\.png/.test(html), 'No bg tile images');
    assert.ok(!/\bbackground="/.test(html), 'No background attribute');
    assert.ok(!html.includes('background-image'), 'No background-image');
  });

  it('makes every navy-block anchor white with no underline, including both phones', () => {
    const html = buildSignatureHtml(worstCase);
    const block = navyBlock(html);
    const anchors = Array.from(block.matchAll(/<a\b[^>]*>/g)).map((m) => m[0]);
    assert.ok(anchors.length >= 4, 'Expected email, two phones and website anchors');
    for (const anchor of anchors) {
      assert.ok(anchor.includes('color:#FFFFFF'), `Anchor missing white colour: ${anchor}`);
      assert.ok(anchor.includes('text-decoration:none'), `Anchor missing no-underline: ${anchor}`);
    }
    assert.ok(block.includes('href="tel:+23408012345678"'));
    assert.ok(block.includes('href="tel:+23408098765432"'));
    assert.ok((block.match(/<span style="color:#FFFFFF;text-decoration:none;white-space:nowrap;">/g) || []).length >= 4);
  });

  it('renders the second phone only when filled and never in sample state', () => {
    const withoutSecondPhone = buildSignatureHtml({ ...values, secondPhone: '' });
    assert.strictEqual((withoutSecondPhone.match(/alt="Phone"/g) || []).length, 1);

    const withSecondPhone = buildSignatureHtml({ ...values, secondPhone: '+234 809 876 5432' });
    assert.strictEqual((withSecondPhone.match(/alt="Phone"/g) || []).length, 2);
    assert.ok(withSecondPhone.includes('tel:+2348098765432'));

    const preview = buildSignatureHtml(
      { name: '', title: '', email: '', phone: '', secondPhone: '' },
      { sampleState: true },
    );
    assert.strictEqual((preview.match(/alt="Phone"/g) || []).length, 1);
  });

  it('adds format-detection only to the downloadable document, not the copied fragment', () => {
    const fragment = buildSignatureHtml(worstCase);
    const document = buildSignatureDocument(worstCase);
    assert.ok(!fragment.includes('format-detection'), 'Copied fragment must not contain meta');
    assert.ok(
      document.includes('<meta name="format-detection" content="telephone=no">'),
      'Download must contain telephone=no',
    );
    assert.ok(document.includes('<html>'));
    assert.ok(document.includes(fragment));
  });

  it('references the versioned transparent wordmark', () => {
    const html = buildSignatureHtml(values);
    assert.ok(html.includes(`${ASSET_BASE_URL}/${ASSET_VERSION}/logo-wordmark.png`));
    const v4Path = resolve(process.cwd(), 'public', 'email', 'v4', 'logo-wordmark.png');
    assert.ok(existsSync(v4Path), 'public/email/v4/logo-wordmark.png must exist');
  });
});

describe('versioned signature assets (v4, scaled from the v3 masters)', () => {
  const v4Dir = resolve(process.cwd(), 'public', 'email', 'v4');
  const v3Dir = resolve(process.cwd(), 'public', 'email', 'v3');
  const expected = [
    ['icon-mail.png', 32, 32],
    ['icon-phone.png', 32, 32],
    ['icon-web.png', 32, 32],
    ['social-facebook.png', 36, 36],
    ['social-x.png', 36, 36],
    ['social-instagram.png', 36, 36],
    ['social-youtube.png', 36, 36],
    ['social-linkedin.png', 36, 36],
    ['social-tiktok.png', 36, 36],
    ['logo-mark.png', 168, 236],
    ['logo-wordmark.png', 184, 80],
  ] as const;

  it('uses the v4 folder for every signature image', () => {
    assert.strictEqual(ASSET_VERSION, 'v4');
    assert.strictEqual(
      versionedAssetBaseUrl('https://biomonie.com/email/'),
      'https://biomonie.com/email/v4',
    );
  });

  for (const [file, width, height] of expected) {
    it(`${file} is an unchanged transparent ${width}x${height} RGBA PNG`, async () => {
      const filePath = resolve(v4Dir, file);
      const v3Path = resolve(v3Dir, file);
      assert.ok(existsSync(filePath), `public/email/v4/${file} must exist`);
      assert.ok(existsSync(v3Path), `public/email/v3/${file} must stay intact`);

      const meta = await sharp(filePath).metadata();
      assert.strictEqual(meta.format, 'png');
      assert.strictEqual(meta.width, width, `${file} width changed`);
      assert.strictEqual(meta.height, height, `${file} height changed`);
      assert.strictEqual(meta.hasAlpha, true, `${file} must keep an alpha channel`);
      assert.strictEqual(meta.channels, 4, `${file} must be 32-bit RGBA`);
      assert.strictEqual(meta.paletteBitDepth, undefined, `${file} must not be palette/indexed`);

      // v4 icons/logos are byte-for-byte copies of the approved v3 masters.
      assert.ok(
        readFileSync(filePath).equals(readFileSync(v3Path)),
        `${file} must be an unchanged copy of v3`,
      );

      const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
      assert.strictEqual(info.channels, 4, `${file} raw channels must be RGBA`);
      const corner = (x: number, y: number) => data[(y * info.width + x) * 4 + 3];
      assert.deepStrictEqual(
        [corner(0, 0), corner(info.width - 1, 0), corner(0, info.height - 1), corner(info.width - 1, info.height - 1)],
        [0, 0, 0, 0],
        `${file} must have fully transparent corners (no baked plate)`,
      );
    });
  }

  it('ships no background tiles in the v4 folder', async () => {
    for (const file of ['bg-navy.png', 'bg-grey.png', 'bg-banner.png']) {
      assert.ok(!existsSync(resolve(v4Dir, file)), `v4 must not contain ${file}`);
    }
  });

  it('keeps the v3 masters untouched (v1/v2/v3 are read-only)', async () => {
    const meta = await sharp(resolve(v3Dir, 'logo-mark.png')).metadata();
    assert.strictEqual(meta.width, 168);
    assert.strictEqual(meta.height, 236);
  });

  it('ships the new banner at 1.5x or 2x of the display size', async () => {
    const gif = resolve(v4Dir, 'banner.gif');
    const png = resolve(v4Dir, 'banner.png');
    assert.ok(existsSync(gif), 'v4 banner.gif must exist');
    assert.ok(existsSync(png), 'v4 banner.png must exist');

    const gifMeta = await sharp(gif, { animated: true }).metadata();
    const validWidths = [
      Math.round(BANNER_WIDTH * 2),
      Math.round(BANNER_WIDTH * 1.5),
    ];
    const validHeights = [
      Math.round(BANNER_HEIGHT * 2),
      Math.round(BANNER_HEIGHT * 1.5),
    ];
    assert.ok(validWidths.includes(gifMeta.width ?? 0), `Unexpected banner width ${gifMeta.width}`);
    assert.ok(validHeights.includes(gifMeta.pageHeight ?? 0), `Unexpected banner height ${gifMeta.pageHeight}`);
    assert.ok((gifMeta.pages ?? 0) >= 3, 'Banner must keep at least 3 slides');
    assert.ok((gifMeta.pages ?? 0) <= 4, 'Banner must not exceed 4 slides');

    const pngMeta = await sharp(png).metadata();
    assert.strictEqual(pngMeta.width, gifMeta.width);
    assert.strictEqual(pngMeta.height, gifMeta.pageHeight);
  });
});

for (const [_label, twoPhones] of [
  ['1-phone', false],
  ['2-phone', true],
] as const) {
  describe(`Exchange ${_label} template`, () => {
  const html = buildExchangeSignatureHtml({ twoPhones });
  const expectedImages = twoPhones ? 13 : 12;

  it('stays under 4,900 characters and has no localhost URLs', () => {
    assert.ok(html.length < 4900, `Exchange HTML is ${html.length} characters`);
    assert.ok(!html.includes('localhost'));
    assert.ok(!html.includes('127.0.0.1'));
  });

  it('points every image at the versioned v4 asset folder', () => {
    const sources = Array.from(html.matchAll(/<img[^>]+src=("[^"]+"|[^\s>]+)/g)).map((m) =>
      m[1].replace(/^"|"$/g, ''),
    );
    assert.strictEqual(sources.length, expectedImages);
    for (const src of sources) {
      assert.ok(
        src.startsWith(`${SITE_ORIGIN}/email/${ASSET_VERSION}/`),
        `Exchange image ${src} must use the v4 folder`,
      );
    }
  });

  it('uses Exchange variables and the scaled bottom-aligned name', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    assert.ok(html.includes('%%DisplayName%%'));
    assert.ok(html.includes('%%Title%%'));
    assert.strictEqual(EXCHANGE_EMAIL_VAR, '%%UserLogonName%%');
    assert.ok(html.includes(EXCHANGE_EMAIL_VAR));
    assert.ok(html.includes('%%MobileNumber%%'));
    assert.ok(html.includes(`font:bold ${L.fonts.nameDefault}px/${L.nameLineHeight}px Arial`));
    assert.ok(
      html.includes(
        `<td width=${L.textColumnWidth} height=${L.nameCellHeight} valign=bottom style="font:bold ${L.fonts.nameDefault}px/${L.nameLineHeight}px Arial;mso-line-height-rule:exactly;color:#fff;text-transform:uppercase">%%DisplayName%%</td>`,
      ),
      'Name must sit in a fixed two-line cell with valign="bottom"',
    );
    assert.ok(html.includes(`font:${L.fonts.title}px/${L.titleLineHeight}px Arial`));
    assert.ok(html.includes(`height=${L.titleRowHeight} valign=top`));
    assert.ok(
      html.includes(
        `font:${L.fonts.email}px/${L.contactLineHeight}px Arial;mso-line-height-rule:exactly;color:#fff;letter-spacing:-0.4px`,
      ),
      'Email row must be 10px with the scaled tracking',
    );
    assert.ok(html.includes(`<td width=${L.contactTextCellWidth} valign=top nowrap`));
    assert.ok(html.includes('text-transform:uppercase'));
    assert.ok(html.includes(`mailto:${EXCHANGE_EMAIL_VAR}`));
    assert.ok(html.includes('tel:%%MobileNumber%%'));
    assert.ok(html.includes('https://biomonie.com/download'));
    assert.ok(html.includes('utm_source=email_signature'));
    assert.ok(!html.includes('overflow:hidden'), 'Word ignores overflow; heights must be real');
  });

  it('renders contacts, then the company name, then the website row last', () => {
    const companyIndex = html.indexOf('BIOMONIE TECHNOLOGIES');
    const websiteIndex = html.indexOf('>www.biomonie.com</a>');
    const phoneIndex = html.indexOf('tel:%%MobileNumber%%');
    assert.ok(companyIndex > 0, 'Company name must exist');
    assert.ok(websiteIndex > 0, 'Website row must exist');
    assert.ok(companyIndex > phoneIndex, 'Company name must be below the phone rows');
    assert.ok(websiteIndex > companyIndex, 'Website row must be below the company name');
    const beforeCompany = html.slice(phoneIndex, companyIndex);
    assert.ok(!beforeCompany.includes('www.biomonie.com'), 'Website must not precede the company name');
    if (twoPhones) {
      assert.ok(html.includes('%%PhoneNumber%%'));
      assert.ok(html.includes('tel:%%PhoneNumber%%'));
      assert.ok(html.indexOf('%%PhoneNumber%%') < companyIndex);
    } else {
      assert.ok(!html.includes('%%PhoneNumber%%'));
    }
    assert.strictEqual((html.match(/>www\.biomonie\.com<\/a>/g) || []).length, 1);
    assert.ok(html.includes('BIOMONIE TECHNOLOGIES</div><div>LIMITED</div>'));
    assert.ok(html.includes(`<td width=${getSignatureLayout(SIGNATURE_SCALE).textColumnWidth} colspan=2 valign=top`));
  });

  it('starts the contact table with a real two-column row so Word cannot split it', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    const opener = `<table cellpadding=0 cellspacing=0 width=${L.textColumnWidth} style=table-layout:fixed>`;
    const start = html.indexOf(opener);
    assert.ok(start > 0, 'Contact table must exist');
    const after = html.slice(start + opener.length);
    assert.ok(
      after.startsWith(`<tr><td width=${L.contactIconCellWidth}><img`),
      `The first contact-table row must define both columns (${L.contactIconCellWidth} + ${L.contactTextCellWidth})`,
    );
    // The company cell is allowed to span both columns; nothing before it may.
    const firstContact = html.indexOf(`<tr><td width=${L.contactIconCellWidth}><img`);
    const firstSpan = html.indexOf('colspan=');
    assert.ok(
      firstSpan === -1 || firstSpan > firstContact,
      'No spanning row may precede the first contact row',
    );
  });

  it('uses Word-safe spacer rows for every vertical gap', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    const spacers = html.match(
      /<tr><td colspan=2 height=\d+ style=line-height:1px><br><\/td><\/tr>/g,
    ) || [];
    assert.strictEqual(
      spacers.length,
      twoPhones ? 4 : 3,
      `Expected ${twoPhones ? 4 : 3} explicit spacer rows, found ${spacers.length}`,
    );
    // The title row reserves the title->contact gap; the contact table can then
    // start with a real two-column row instead of a spanning spacer.
    assert.ok(html.includes(`height=${L.titleRowHeight} valign=top`));
    assert.ok(
      html.includes(`height=${L.gaps.contactRow} style=line-height:1px`),
      'Expected a scaled contact-row spacer',
    );
    assert.ok(
      html.includes(`height=${L.gaps.contactCompany} style=line-height:1px`),
      'Expected a scaled phone-to-company spacer',
    );
  });

  it('uses the scaled logo, wordmark cell and social cells', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    assert.ok(html.includes(`width=${L.logoMarkWidth} height=${L.logoMarkHeight}`));
    assert.ok(html.includes('rowspan=3'));
    assert.ok(html.includes(`<td width=${L.logoColumnWidth} height=${L.navyInnerHeight} rowspan=3`));
    assert.ok(html.includes(`<td width=${L.wordmarkCellWidth}>`));
    assert.strictEqual(
      (html.match(new RegExp(`<td width=${L.socialIconSize}>`, 'g')) || []).length,
      6,
    );
    assert.strictEqual(
      (html.match(new RegExp(`<td width=${L.contactIconCellWidth}>`, 'g')) || []).length,
      twoPhones ? 4 : 3,
    );
    assert.ok(html.includes(`<td width=${L.contactTextCellWidth} valign=top`));
    assert.ok(html.includes(`cellspacing=${L.socialGap}`));
  });

  it('hardens every image for Word (attributes, alt, block layout)', () => {
    const tags = html.match(/<img[^>]+>/g) || [];
    assert.strictEqual(tags.length, expectedImages);
    for (const tag of tags) {
      assert.ok(/width=\d+/.test(tag), `Image tag missing width: ${tag}`);
      assert.ok(/height=\d+/.test(tag), `Image tag missing height: ${tag}`);
      assert.ok(/border=0/.test(tag), `Image tag missing border=0: ${tag}`);
      assert.ok(/alt=("[^"]+"|[^\s>]+)/.test(tag), `Image tag missing alt: ${tag}`);
      assert.ok(tag.includes('display:block'), `Image tag missing display:block: ${tag}`);
    }
  });

  it('uses bgcolor only - no tiles or background attributes', () => {
    for (const hex of ['#1B3A50', '#D9D9D9', '#14262F']) {
      assert.ok(html.includes(`bgcolor=${hex}`), `Missing bgcolor ${hex}`);
    }
    assert.ok(!/bg-(navy|grey|banner)/.test(html), 'No tile images');
    assert.ok(!/\bbackground=/.test(html), 'No background attribute');
    assert.ok(!html.includes('background-image'), 'No background-image');
  });

  it('uses the same social hrefs and display text as the web signature', () => {
    const web = buildSignatureHtml(EXCHANGE_SAMPLES.longName);
    const webHrefs = new Set(
      Array.from(web.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g))
        .map((m) => m[1])
        .filter((href) => Object.values(signatureSocials).some((s) => s.href === href)),
    );
    const exchangeHrefs = new Set(
      Array.from(html.matchAll(/<a\b[^>]*href=([^\s>]+)/g))
        .map((m) => m[1])
        .filter((href) => Object.values(signatureSocials).some((s) => s.href === href)),
    );
    assert.deepStrictEqual(
      Array.from(exchangeHrefs).sort(),
      Array.from(webHrefs).sort(),
      'Exchange social hrefs must equal the web social hrefs',
    );

    const textLines = (source: string) =>
      (source.match(/(?:Facebook|X|Instagram|Youtube|Linkedin)\.com\/biomonie/g) || []).sort();
    assert.deepStrictEqual(
      textLines(html),
      textLines(web),
      'Exchange social display text must equal the web social display text',
    );
  });

  it('gives every td an explicit width and keeps the left column at the scaled height', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    const tdTags = html.match(/<td\b[^>]*>/g) || [];
    for (const tag of tdTags) {
      // Full-width spacer rows live after the first contact row, which already
      // pins the scaled icon/text columns for Word; they do not need their own width.
      if (/colspan=2 height=\d+ style=line-height:1px/.test(tag)) continue;
      assert.ok(/width=\d+/.test(tag), `Every td needs an explicit width: ${tag}`);
    }
    assert.ok(html.includes(`<td width=${L.leftWidth} valign=top><table`));
    assert.ok(html.includes(`<td width=${L.leftWidth} bgcolor=#1B3A50`));
    assert.ok(html.includes(`<td width=${L.leftWidth} bgcolor=#D9D9D9`));
  });

  it('makes every contact/phone anchor white without underline', () => {
    const anchors = Array.from(html.matchAll(/<a\b[^>]*>/g)).map((m) => m[0]);
    const contactAnchors = anchors.filter((a) =>
      /mailto:|tel:|href=https:\/\/biomonie\.com\s/.test(a),
    );
    assert.ok(contactAnchors.length >= (twoPhones ? 4 : 3), 'Expected contact anchors');
    for (const anchor of contactAnchors) {
      assert.ok(anchor.includes('color:#fff'), `Anchor missing white colour: ${anchor}`);
      assert.ok(anchor.includes('text-decoration:none'), `Anchor missing no-underline: ${anchor}`);
    }
  });

  it('repeats explicit font, line-height, mso rule and colour on every text holder', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    const styleOf = (pattern: RegExp) => {
      const match = html.match(pattern);
      assert.ok(match, `Missing text holder for ${pattern}`);
      return match[1];
    };
    const nameStyle = styleOf(
      new RegExp(`<td width=${L.textColumnWidth} height=${L.nameCellHeight} valign=bottom style="([^"]*)">%%DisplayName%%`),
    );
    const titleStyle = styleOf(
      new RegExp(`<td width=${L.textColumnWidth} height=${L.titleRowHeight} valign=top style="([^"]*)">%%Title%%`),
    );
    const contactStyles = Array.from(
      html.matchAll(new RegExp(`<td width=${L.contactTextCellWidth} valign=top[^>]*style="([^"]*)"`, 'g')),
      (match) => match[1],
    );
    const companyStyle = styleOf(
      new RegExp(`<td width=${L.textColumnWidth} colspan=2 [^>]*style="([^"]*)"`),
    );
    const socialStyle = styleOf(
      new RegExp(`<td width=${L.socialTextCellWidth} [^>]*style="([^"]*)"`),
    );

    assert.strictEqual(contactStyles.length, twoPhones ? 4 : 3, 'One explicit style per contact row');
    for (const style of [nameStyle, titleStyle, ...contactStyles, companyStyle, socialStyle]) {
      assert.ok(/font(-family)?:/.test(style), `Missing explicit font: ${style}`);
      assert.ok(/font(-size)?:/.test(style) || /font:/.test(style), `Missing font size: ${style}`);
      assert.ok(/line-height/.test(style) || /font:/.test(style), `Missing line height: ${style}`);
      assert.ok(style.includes('mso-line-height-rule:exactly'), `Missing mso rule: ${style}`);
      assert.ok(/color:#(fff|333)/.test(style), `Missing explicit colour: ${style}`);
    }
  });

  it('uses a scaled 10px email row and no insecure http:// links', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    assert.strictEqual(L.fonts.email, 10);
    assert.ok(
      html.includes(
        `font:${L.fonts.email}px/${L.contactLineHeight}px Arial;mso-line-height-rule:exactly;color:#fff;letter-spacing:-0.4px`,
      ),
    );
    assert.ok(html.includes(`<td width=${L.contactTextCellWidth} valign=top nowrap`));
    assert.ok(!html.includes('http://'));
  });

  it('top-aligns both columns and every text cell', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    for (const marker of [
      `<td width=${L.leftWidth} valign=top>`,
      `<td width=${L.bannerWidth} height=${L.bannerHeight} valign=top`,
      `<td width=${L.leftWidth} bgcolor=#1B3A50 valign=top`,
      `<td width=${L.leftWidth} bgcolor=#D9D9D9 valign=top`,
      `<td width=${L.textColumnWidth} height=${L.titleRowHeight} valign=top`,
      `<td width=${L.textColumnWidth} colspan=2 valign=top`,
      `<td width=${L.socialTextCellWidth} valign=top`,
    ]) {
      assert.ok(html.includes(marker), `Missing top alignment: ${marker}`);
    }
    const contactCells =
      html.match(new RegExp(`<td width=${L.contactTextCellWidth} valign=top`, 'g')) || [];
    assert.strictEqual(contactCells.length, twoPhones ? 4 : 3);
  });

  it('keeps padding off cells that carry a height attribute (quirks/standards parity)', () => {
    const L = getSignatureLayout(SIGNATURE_SCALE);
    assert.ok(!/<td\b[^>]*height=\d+[^>]*style="[^"]*padding/.test(html));
    assert.ok(
      html.includes(
        `<td width=${L.leftWidth} bgcolor=#1B3A50 valign=top style="padding:${L.navyPadY}px ${L.navyPadX}px"`,
      ),
    );
    assert.ok(
      html.includes(
        `<td width=${L.leftWidth} bgcolor=#D9D9D9 valign=top style="padding:${L.greyPad}px"`,
      ),
    );
  });
  });
}

describe('VITE_ASSET_BASE_URL (asset CDN override)', () => {
  const cdn = 'https://cdn.biomonie.com/email';

  it('normalizes the configured asset base and falls back to SITE_ORIGIN + /email', () => {
    assert.strictEqual(normalizeAssetBaseUrl('https://cdn.biomonie.com/email///'), cdn);
    assert.strictEqual(normalizeAssetBaseUrl('  https://cdn.biomonie.com/email/  '), cdn);
    assert.strictEqual(normalizeAssetBaseUrl(''), `${SITE_ORIGIN}/email`);
    assert.strictEqual(normalizeAssetBaseUrl(undefined), `${SITE_ORIGIN}/email`);
    assert.strictEqual(resolveAssetBaseUrl(), ASSET_BASE_URL);
  });

  it('uses VITE_ASSET_BASE_URL when the module loads', () => {
    const readAssetBase = (env: NodeJS.ProcessEnv) =>
      execFileSync(
        process.execPath,
        [
          '-e',
          "import('./src/lib/signatureConfig.ts').then((m) => console.log(m.ASSET_BASE_URL))",
        ],
        { env, encoding: 'utf-8' },
      )
        .trim()
        .split(/\r?\n/)
        .pop();

    const withCdn = readAssetBase({ ...process.env, VITE_ASSET_BASE_URL: `${cdn}/` });
    assert.strictEqual(withCdn, cdn);

    const withoutCdn = { ...process.env };
    delete withoutCdn.VITE_ASSET_BASE_URL;
    assert.strictEqual(readAssetBase(withoutCdn), `${SITE_ORIGIN}/email`);
  });

  it('uses the asset base for every image in the web signature but not for links', () => {
    const html = buildSignatureHtml(worstCase, { assetBaseUrl: cdn });
    const imgSources = Array.from(html.matchAll(/<img[^>]+src="([^"]+)"/g)).map((m) => m[1]);
    assert.ok(imgSources.length >= 10);
    for (const src of imgSources) {
      assert.ok(
        src.startsWith(`${cdn}/${ASSET_VERSION}/`),
        `Image ${src} must use the versioned CDN asset base`,
      );
    }
    assert.ok(!html.includes('background-image'));
    assert.ok(!/bg-(navy|grey|banner)/.test(html));
    assert.ok(html.includes(`href="${SITE_ORIGIN}/download`));
    assert.ok(html.includes(`href="${SITE_ORIGIN}"`));
    assert.ok(!html.includes('cdn.biomonie.com/download'));
  });

  it('uses the asset base for every image in the Exchange template but not for links', () => {
    const html = buildExchangeSignatureHtml({ assetBaseUrl: cdn, twoPhones: true });
    const sources = Array.from(html.matchAll(/<img[^>]+src=("[^"]+"|[^\s>]+)/g)).map((m) =>
      m[1].replace(/^"|"$/g, ''),
    );
    assert.ok(sources.length >= 10);
    for (const src of sources) {
      assert.ok(
        src.startsWith(`${cdn}/${ASSET_VERSION}/`),
        `Image ${src} must use the versioned CDN asset base`,
      );
    }
    assert.ok(html.includes(`href=${SITE_ORIGIN}`));
    assert.ok(html.includes(`${SITE_ORIGIN}/download`));
    assert.ok(!html.includes('cdn.biomonie.com/download'));
  });
});

describe('Exchange generated files', () => {
  const files = [
    ['docs/exchange-signature.html', 'https://biomonie.com', 'https://biomonie.com', false],
    ['docs/exchange-signature.two-phones.html', 'https://biomonie.com', 'https://biomonie.com', true],
    [
      'docs/exchange-signature.staging.html',
      'https://biomonie1.onrender.com',
      'https://biomonie.com',
      false,
    ],
    [
      'docs/exchange-signature.two-phones.staging.html',
      'https://biomonie1.onrender.com',
      'https://biomonie.com',
      true,
    ],
  ] as const;

  for (const [file, origin, assetOrigin, twoPhones] of files) {
    it(`${file} is under 4,900 characters with ${origin} links and v4 assets`, () => {
      const filePath = resolve(process.cwd(), file);
      assert.ok(existsSync(filePath), `${file} must exist`);
      const content = readFileSync(filePath, 'utf-8');
      const L = getSignatureLayout(SIGNATURE_SCALE);
      assert.ok(content.length < 4900, `${file} is ${content.length} characters (must be < 4,900)`);
      if (twoPhones) {
        // Leave at least 100 characters of headroom below the safety limit.
        assert.ok(
          content.length <= 4800,
          `${file} is ${content.length} characters; two-phone files need 100 spare (<= 4,800)`,
        );
      }
      assert.ok(content.includes(`${origin}/download`));
      assert.ok(content.includes('%%MobileNumber%%'));
      assert.ok(content.includes('%%DisplayName%%'));
      assert.ok(content.includes(EXCHANGE_EMAIL_VAR));
      assert.ok(content.includes('BIOMONIE TECHNOLOGIES'));
      assert.ok(content.includes('LIMITED'));
      assert.ok(!content.includes('bg-navy') && !content.includes('background='));
      assert.ok(!content.includes('background-image'));
      assert.ok(!content.includes('http://'), `${file} must not contain insecure http:// links`);
      assert.ok(
        content.includes(
          `font:${L.fonts.email}px/${L.contactLineHeight}px Arial;mso-line-height-rule:exactly;color:#fff`,
        ),
        `${file} email row must use the scaled font size with an explicit font and colour`,
      );

      const sources = Array.from(content.matchAll(/<img[^>]+src=("[^"]+"|[^\s>]+)/g)).map((m) =>
        m[1].replace(/^"|"$/g, ''),
      );
      assert.ok(sources.length >= 12, `${file} has only ${sources.length} images`);
      for (const src of sources) {
        assert.ok(
          src.startsWith(`${assetOrigin}/email/${ASSET_VERSION}/`),
          `${file} image ${src} must use ${assetOrigin}/email/${ASSET_VERSION}/`,
        );
      }
      const imgs = content.match(/<img[^>]+>/g) || [];
      for (const tag of imgs) {
        assert.ok(/\balt=("[^"]+"|[^\s>]+)/.test(tag), `${file} image missing alt: ${tag}`);
      }

      if (twoPhones) {
        assert.ok(content.includes('%%PhoneNumber%%'));
      } else {
        assert.ok(!content.includes('%%PhoneNumber%%'));
      }
      if (origin.includes('onrender.com')) {
        // The staging templates use production image assets to stay under the
        // Exchange character limit, but every LINK must stay on staging.
        assert.ok(!content.includes('https://biomonie.com/download'));
        assert.ok(!content.includes('https://biomonie1.onrender.com/email/'));
      } else {
        assert.ok(!content.includes('onrender.com'));
      }
      assert.ok(!content.includes('localhost'));
      assert.ok(!content.includes('127.0.0.1'));
    });
  }
});

describe('getContactFontSize', () => {
  it('scales the 9/8/7px tiers to 11/10/9px at 1.25x', () => {
    assert.strictEqual(getContactFontSize('a'.repeat(26)), 11);
    assert.strictEqual(getContactFontSize('a'.repeat(27)), 10);
    assert.strictEqual(getContactFontSize('a'.repeat(32)), 10);
    assert.strictEqual(getContactFontSize('a'.repeat(33)), 9);
  });

  it('never shrinks below 9px at any scale', () => {
    for (const scale of [1.0, 1.15, 1.25, 1.35]) {
      for (const length of [10, 26, 27, 32, 33, 80]) {
        for (const base of [BASE_DESIGN.contactFont, BASE_DESIGN.emailFont]) {
          const size = getContactFontSize('a'.repeat(length), base, scale);
          assert.ok(size >= 9, `${size}px at ${scale}x for ${length} chars (base ${base})`);
          assert.strictEqual(size, Math.round(size), 'Font sizes must be whole pixels');
        }
      }
    }
  });
});

describe('SIGNATURE_SCALE consistency', () => {
  for (const scale of [1.0, 1.15, 1.25, 1.35]) {
    it(`derives coherent whole-pixel web and Exchange layouts at ${scale}x`, () => {
      const L = getSignatureLayout(scale);
      const web = buildSignatureHtml(EXCHANGE_SAMPLES.longName, { scale });
      const exchange = buildExchangeSignatureHtml({ twoPhones: true, scale });

      // Every dimension is a whole pixel.
      for (const [name, value] of Object.entries(L)) {
        if (typeof value === 'number' && name !== 'scale') {
          assert.strictEqual(value, Math.round(value), `${name} at ${scale}x must be whole pixels`);
        }
      }

      // Both columns always share one height.
      assert.strictEqual(L.totalWidth, L.leftWidth + L.bannerWidth);
      assert.strictEqual(L.navyHeight + L.greyHeight, L.bannerHeight);
      assert.strictEqual(L.bannerHeight, L.leftWidth);

      for (const html of [web, exchange]) {
        assert.ok(html.includes(`width=${L.bannerWidth} height=${L.bannerHeight}`) ||
          html.includes(`width="${L.bannerWidth}" height="${L.bannerHeight}"`));
        assert.ok(html.includes(`width=${L.leftWidth}`) || html.includes(`width="${L.leftWidth}"`));
      }

      // Name is bottom-aligned in a fixed two-line cell in both outputs.
      assert.ok(web.includes(`height="${L.nameCellHeight}" valign="bottom"`));
      assert.ok(exchange.includes(`height=${L.nameCellHeight} valign=bottom`));

      // Fonts never drop below 9px.
      for (const size of Object.values(L.fonts)) {
        assert.ok(size >= 9, `Font ${size}px at ${scale}x must be >= 9px`);
      }
    });
  }
});

describe('renderExchangeSignaturePreview', () => {
  it('fills the Exchange variables for preview', () => {
    const preview = renderExchangeSignaturePreview(EXCHANGE_SAMPLES.longName);
    assert.ok(preview.includes('Solomon Chukwuka Emmanuel'));
    assert.ok(preview.includes('Senior Software Engineer'));
    assert.ok(preview.includes('solomon@biomonie.com'));
    assert.ok(preview.includes('+234 (0) 801 234 5678'));
    assert.ok(preview.includes('+234 (0) 809 876 5432'));
    assert.ok(!preview.includes('%%DisplayName%%'));
  });
});

describe('signaturePlainText', () => {
  it('formats text without second phone', () => {
    const text = signaturePlainText({
      name: 'Ada Lovelace',
      title: 'Engineer',
      email: 'ada@biomonie.com',
      phone: '+234 800 000 0000',
    });
    assert.strictEqual(
      text,
      'Ada Lovelace\nEngineer\nada@biomonie.com\n+234 800 000 0000\nwww.biomonie.com',
    );
  });

  it('formats text with second phone when provided', () => {
    const text = signaturePlainText({
      name: 'Ada Lovelace',
      title: 'Engineer',
      email: 'ada@biomonie.com',
      phone: '+234 800 000 0000',
      secondPhone: '+234 809 999 9999',
    });
    assert.strictEqual(
      text,
      'Ada Lovelace\nEngineer\nada@biomonie.com\n+234 800 000 0000\n+234 809 999 9999\nwww.biomonie.com',
    );
  });
});
