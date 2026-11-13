import {
  ASSET_BASE_URL,
  SITE_ORIGIN,
  signatureAssets,
  signatureImage,
  signatureSocials,
} from './signatureConfig.ts';
import { normalizeOrigin } from './storeLinks.ts';

/**
 * Height budget (worst case: two-line name, two-line job title, two phones):
 *   navy top padding          12
 *   name (2 x 17)             34
 *   gap                        3
 *   job title (2 x 12)        24
 *   gap                       10
 *   contact rows (4 x 14 + 3 x 6) 74
 *   company block (12 + 24 + 8)  44
 *   ---------------------------------
 *   total                    201  -> 4px spare inside NAVY_HEIGHT (205)
 */
export const NAVY_HEIGHT = 205;
export const GREY_HEIGHT = 80;
export const TOTAL_LEFT_HEIGHT = NAVY_HEIGHT + GREY_HEIGHT; // 285

export const NAME_FONT_SIZE_DEFAULT = 14;
export const NAME_FONT_SIZE_MID = 13;
export const NAME_FONT_SIZE_SMALL = 11;

export const JOB_TITLE_FONT_SIZE = 10;
export const CONTACT_FONT_SIZE = 9;
export const COMPANY_NAME_FONT_SIZE = 10;
export const SOCIAL_FONT_SIZE = 8;
export const ICON_SIZE = 14;

export const SANS_FONT = 'Arial,Helvetica,sans-serif';

export type SignatureValues = {
  name: string;
  title: string;
  email: string;
  phone: string;
  secondPhone?: string;
};

export type BuildSignatureOptions = {
  assetBaseUrl?: string;
  siteOrigin?: string;
  sampleState?: boolean;
  includeResponsiveStyle?: boolean;
  minify?: boolean;
  bannerLinkUrl?: string;
  googlePlayUrl?: string;
  appStoreUrl?: string;
};

export function formatPhoneForTel(phone: string) {
  return phone.replace(/[\s()[\]-]/g, '');
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function escapeAttribute(value: string) {
  return encodeURI(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function getContactFontSize(text: string): number {
  const len = text.trim().length;
  if (len <= 26) return CONTACT_FONT_SIZE; // 9px
  if (len <= 32) return 8;
  return 7;
}

const imgStyle = 'display:block;border:0;outline:none;';
type AssetName = keyof typeof import('./signatureConfig').signatureAssets.images;

export const DEFAULT_SAMPLE_VALUES: SignatureValues = {
  name: 'Your Name',
  title: 'Job Title',
  email: 'name@biomonie.com',
  phone: '+234 000 000 0000',
  secondPhone: '',
};

export function buildSignatureHtml(
  values: SignatureValues,
  options: BuildSignatureOptions = {},
) {
  const siteOrigin = options.siteOrigin ? normalizeOrigin(options.siteOrigin) : SITE_ORIGIN;
  const defaultBannerUrl = `${siteOrigin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
  const defaultAssetBase = `${siteOrigin}/email`;

  const {
    assetBaseUrl = defaultAssetBase,
    sampleState = false,
    includeResponsiveStyle = true,
    minify = false,
    bannerLinkUrl = defaultBannerUrl,
  } = options;

  const isNameEmpty = !values.name || values.name.trim() === '';
  const isTitleEmpty = !values.title || values.title.trim() === '';
  const isEmailEmpty = !values.email || values.email.trim() === '';
  const isPhoneEmpty = !values.phone || values.phone.trim() === '';

  const rawName = sampleState && isNameEmpty ? DEFAULT_SAMPLE_VALUES.name : values.name;
  const rawTitle = sampleState && isTitleEmpty ? DEFAULT_SAMPLE_VALUES.title : values.title;
  const rawEmail = sampleState && isEmailEmpty ? DEFAULT_SAMPLE_VALUES.email : values.email;
  const rawPhone = sampleState && isPhoneEmpty ? DEFAULT_SAMPLE_VALUES.phone : values.phone;
  const rawSecondPhone = values.secondPhone ? values.secondPhone.trim() : '';

  const displayName = escapeHtml(rawName.toUpperCase());
  const displayTitle = escapeHtml(rawTitle);
  const displayEmail = escapeHtml(rawEmail);
  const displayPhone = escapeHtml(rawPhone);
  const displaySecondPhone = escapeHtml(rawSecondPhone);

  const nameColor = sampleState && isNameEmpty ? '#9CB3C1' : '#FFFFFF';
  const titleColor = sampleState && isTitleEmpty ? '#9CB3C1' : '#FFFFFF';
  const emailColor = sampleState && isEmailEmpty ? '#9CB3C1' : '#FFFFFF';
  const phoneColor = sampleState && isPhoneEmpty ? '#9CB3C1' : '#FFFFFF';

  const nameLength = rawName.trim().length;
  const nameFontSize =
    nameLength <= 18
      ? NAME_FONT_SIZE_DEFAULT
      : nameLength <= 26
        ? NAME_FONT_SIZE_MID
        : NAME_FONT_SIZE_SMALL;
  const nameLineHeight = nameFontSize <= 11 ? 14 : nameFontSize <= 13 ? 16 : 17;
  const nameMaxHeight = nameLineHeight * 2;

  // Auto-shrink rule for email and phones: 9px <= 26 chars, 8px <= 32 chars, 7px beyond.
  const emailFontSize = getContactFontSize(rawEmail);
  const phoneFontSize = getContactFontSize(rawPhone);
  const secondPhoneFontSize = getContactFontSize(rawSecondPhone);

  const image = (key: AssetName) => signatureImage(key, assetBaseUrl);

  const socialIconKeys: Array<keyof typeof signatureSocials> = [
    'facebook',
    'x',
    'instagram',
    'youtube',
    'linkedin',
    'tiktok',
  ];

  const socialIcons = socialIconKeys
    .map((key, index) => {
      const social = signatureSocials[key];
      const padRight = index === socialIconKeys.length - 1 ? 0 : 4;
      return `<td style="padding:0 ${padRight}px 0 0;line-height:0;${tsa}"><a href="${social.href}" target="_blank" style="text-decoration:none;display:block;"><img src="${image(`social-${key}` as AssetName)}" width="18" height="18" alt="${social.label}" style="${imgStyle}width:18px;height:18px;"></a></td>`;
    })
    .join('');

  const layoutStyle = 'border-collapse:collapse;table-layout:fixed;';
  const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';

  const mailtoHref = rawEmail ? `mailto:${escapeAttribute(rawEmail)}` : '#';
  const telHref = rawPhone ? `tel:${escapeAttribute(formatPhoneForTel(rawPhone))}` : '#';
  const secondPhoneHref = rawSecondPhone
    ? `tel:${escapeAttribute(formatPhoneForTel(rawSecondPhone))}`
    : '#';

  // Second phone row: rendered ONLY when filled (never when empty, never in sampleState)
  const hasSecondPhone = Boolean(rawSecondPhone);
  const secondPhoneRow = hasSecondPhone
    ? `<tr><td width="${ICON_SIZE}" valign="middle" style="width:${ICON_SIZE}px;padding:0 6px 6px 0;line-height:0;${tsa}"><img src="${image('phone')}" width="${ICON_SIZE}" height="${ICON_SIZE}" alt="Phone" style="${imgStyle}width:${ICON_SIZE}px;height:${ICON_SIZE}px;"></td><td valign="middle" style="padding:0 0 6px 0;font-family:${SANS_FONT};font-size:${secondPhoneFontSize}px;line-height:14px;color:${phoneColor};white-space:nowrap;${tsa}"><a href="${secondPhoneHref}" style="color:${phoneColor};text-decoration:none;"><span style="color:${phoneColor};text-decoration:none;white-space:nowrap;">${displaySecondPhone}</span></a></td></tr>`
    : '';

  const styleBlock = includeResponsiveStyle
    ? `<style type="text/css">@media only screen and (max-width:480px){table.bm-table{width:100%!important;max-width:100%!important;}td.bm-col{display:block!important;width:100%!important;max-width:100%!important;}img.bm-resp{width:100%!important;height:auto!important;}}</style>`
    : '';

  const contactRow = (options: {
    icon: AssetName;
    alt: string;
    href: string;
    text: string;
    fontSize: number;
    color: string;
    last?: boolean;
  }) =>
    `<tr>` +
      `<td width="${ICON_SIZE}" valign="middle" style="width:${ICON_SIZE}px;padding:0 6px ${options.last ? 0 : 6}px 0;line-height:0;${tsa}"><img src="${image(options.icon)}" width="${ICON_SIZE}" height="${ICON_SIZE}" alt="${options.alt}" style="${imgStyle}width:${ICON_SIZE}px;height:${ICON_SIZE}px;"></td>` +
      `<td valign="middle" style="padding:0 0 ${options.last ? 0 : 6}px 0;font-family:${SANS_FONT};font-size:${options.fontSize}px;line-height:14px;color:${options.color};white-space:nowrap;${tsa}"><a href="${options.href}"${options.href.startsWith('http') ? ' target="_blank"' : ''} style="color:${options.color};text-decoration:none;"><span style="color:${options.color};text-decoration:none;white-space:nowrap;">${options.text}</span></a></td>` +
    `</tr>`;

  // Navy inner table content height = NAVY_HEIGHT - 12px top padding = 193px.
  const navyInnerHeight = NAVY_HEIGHT - 12;
  const greyInnerHeight = GREY_HEIGHT - 16;

  const html = `${styleBlock}<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="bm-table" style="width:600px;max-width:100%;${layoutStyle}font-family:${SANS_FONT};${tsa}">` +
  `<tr>` +
  `<td class="bm-col" width="285" valign="top" style="width:285px;padding:0;line-height:0;${tsa}">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="285" style="width:285px;${layoutStyle}">` +
    `<tr>` +
      `<td bgcolor="#1B3A50" background="${image('bgNavy')}" height="${NAVY_HEIGHT}" style="background-color:#1B3A50;background-image:url(${image('bgNavy')});padding:12px 12px 0 12px;height:${NAVY_HEIGHT}px;width:285px;box-sizing:border-box;${tsa}" valign="top">` +
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="261" height="${navyInnerHeight}" style="width:261px;height:${navyInnerHeight}px;${layoutStyle}">` +
        `<tr>` +
          `<td width="94" valign="middle" style="width:94px;padding:0 10px 0 0;line-height:0;${tsa}">` +
            `<img src="${image('logoMark')}" width="84" height="118" alt="Biomonie" style="${imgStyle}width:84px;height:118px;">` +
          `</td>` +
          `<td width="167" valign="top" style="width:167px;padding:0;line-height:0;${tsa}">` +
            `<div style="font-family:${SANS_FONT};font-size:${nameFontSize}px;line-height:${nameLineHeight}px;font-weight:bold;color:${nameColor};letter-spacing:0.5px;white-space:normal;overflow-wrap:anywhere;word-break:normal;max-height:${nameMaxHeight}px;overflow:hidden;${tsa}">${displayName || '&nbsp;'}</div>` +
            `<div style="font-family:${SANS_FONT};font-size:${JOB_TITLE_FONT_SIZE}px;line-height:12px;color:${titleColor};padding:3px 0 10px 0;max-height:24px;overflow:hidden;${tsa}">${displayTitle || '&nbsp;'}</div>` +
            `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="167" style="width:167px;${layoutStyle}">` +
              contactRow({ icon: 'mail', alt: 'Email', href: mailtoHref, text: displayEmail || '&nbsp;', fontSize: emailFontSize, color: emailColor }) +
              contactRow({ icon: 'phone', alt: 'Phone', href: telHref, text: displayPhone || '&nbsp;', fontSize: phoneFontSize, color: phoneColor }) +
              secondPhoneRow +
              contactRow({ icon: 'website', alt: 'Website', href: escapeAttribute(siteOrigin), text: 'www.biomonie.com', fontSize: CONTACT_FONT_SIZE, color: '#FFFFFF', last: true }) +
            `</table>` +
            `<div style="padding:12px 12px 8px 0;font-family:${SANS_FONT};font-size:${COMPANY_NAME_FONT_SIZE}px;line-height:12px;font-weight:bold;color:#FFFFFF;text-align:right;${tsa}">` +
              `<div style="white-space:nowrap;${tsa}">BIOMONIE TECHNOLOGIES</div>` +
              `<div style="white-space:nowrap;${tsa}">LIMITED</div>` +
            `</div>` +
          `</td>` +
        `</tr>` +
        `</table>` +
      `</td>` +
    `</tr>` +
    `<tr>` +
      `<td bgcolor="#D9D9D9" background="${image('bgGrey')}" height="${GREY_HEIGHT}" style="background-color:#D9D9D9;background-image:url(${image('bgGrey')});padding:8px;height:${GREY_HEIGHT}px;width:285px;box-sizing:border-box;${tsa}" valign="middle">` +
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="269" height="${greyInnerHeight}" style="width:269px;height:${greyInnerHeight}px;${layoutStyle}">` +
        `<tr>` +
          `<td width="74" valign="middle" style="width:74px;padding:0 4px 0 0;line-height:0;${tsa}"><img src="${image('logoWordmark')}" width="70" height="31" alt="Biomonie" style="${imgStyle}width:70px;height:31px;"></td>` +
          `<td width="195" valign="middle" style="width:195px;padding:0;overflow:hidden;${tsa}">` +
            `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:3px;"><tr>${socialIcons}</tr></table>` +
            `<div style="font-family:${SANS_FONT};font-size:${SOCIAL_FONT_SIZE}px;line-height:11px;color:#333333;${tsa}">` +
              `<div style="white-space:nowrap;${tsa}"><a href="${signatureSocials.facebook.href}" target="_blank" style="color:#333333;text-decoration:none;"><span style="color:#333333;text-decoration:none;">Facebook.com/biomonie</span></a>&nbsp;|&nbsp;<a href="${signatureSocials.x.href}" target="_blank" style="color:#333333;text-decoration:none;"><span style="color:#333333;text-decoration:none;">X.com/biomonie</span></a></div>` +
              `<div style="white-space:nowrap;${tsa}"><a href="${signatureSocials.instagram.href}" target="_blank" style="color:#333333;text-decoration:none;"><span style="color:#333333;text-decoration:none;">Instagram.com/biomonie</span></a>&nbsp;|&nbsp;<a href="${signatureSocials.youtube.href}" target="_blank" style="color:#333333;text-decoration:none;"><span style="color:#333333;text-decoration:none;">Youtube.com/biomonie</span></a></div>` +
              `<div style="white-space:nowrap;${tsa}"><a href="${signatureSocials.linkedin.href}" target="_blank" style="color:#333333;text-decoration:none;"><span style="color:#333333;text-decoration:none;">Linkedin.com/biomonie</span></a></div>` +
            `</div>` +
          `</td>` +
        `</tr>` +
        `</table>` +
      `</td>` +
    `</tr>` +
    `</table>` +
  `</td>` +
  `<td class="bm-col" width="315" height="285" valign="top" bgcolor="#14262F" background="${image('bgBanner')}" style="width:315px;height:285px;background-color:#14262F;background-image:url(${image('bgBanner')});padding:0;line-height:0;${tsa}">` +
    `<a href="${escapeAttribute(bannerLinkUrl)}" target="_blank" style="text-decoration:none;display:block;"><img src="${image('banner')}" class="bm-resp" width="315" height="285" alt="Biomonie, the first-ever global biometric cardless payment ecosystem. Download on Google Play and the App Store." style="${imgStyle}width:315px;height:285px;background-color:#14262F;"></a>` +
  `</td>` +
  `</tr>` +
  `</table>`;

  if (minify) {
    return html.replace(/>\s+</g, '><').trim();
  }
  return html;
}

export function buildExchangeSignatureHtml(options: {
  siteOrigin?: string;
  twoPhones?: boolean;
} = {}): string {
  // Exchange variables: %%DisplayName%%, %%Title%%, %%UserLogonName%%, %%MobileNumber%%,
  // and optional %%PhoneNumber%%. All CSS is inline so Exchange disclaimers keep it.
  const origin = options.siteOrigin ? normalizeOrigin(options.siteOrigin) : SITE_ORIGIN;
  const u = `${origin}/email`;
  const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
  const a = signatureAssets.images;

  const fb = 'https://facebook.com/biomonie';
  const x = 'https://x.com/biomonie';
  const ig = 'https://instagram.com/biomonie';
  const yt = 'https://youtube.com/biomonie';
  const li = 'https://linkedin.com/company/biomonie';
  const tt = 'https://tiktok.com/@biomonie';

  const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
  const white = 'color:#FFFFFF;text-decoration:none';

  // Navy inner content = 205 - 12px top padding = 193px.
  // Worst case content = 34 name + 3 + 24 title + 10 + 74 contacts + 44 company = 189px.
  const secondPhoneRow = options.twoPhones
    ? `<div style="height:20px;white-space:nowrap"><img src="${u}/${a.phone}" width=14 height=14 align=middle>&nbsp;<a href="tel:%%PhoneNumber%%" style="${white}"><span style="${white};white-space:nowrap">%%PhoneNumber%%</span></a></div>`
    : '';

  const row = (icon: string, href: string, text: string, last = false) =>
    `<div style="height:${last ? 14 : 20}px;white-space:nowrap"><img src="${u}/${icon}" width=14 height=14 align=middle>&nbsp;<a href="${href}" style="${white}"><span style="${white};white-space:nowrap">${text}</span></a></div>`;

  return `<table cellpadding=0 cellspacing=0 width=600 style="border-collapse:collapse;font:9px/14px Arial,sans-serif;color:#FFFFFF;${tsa}"><tr>` +
  `<td width=285><table cellpadding=0 cellspacing=0 width=285>` +
  `<tr>` +
    `<td bgcolor="#1B3A50" background="${u}/${a.bgNavy}" height=193 style="background-color:#1B3A50;background-image:url(${u}/${a.bgNavy});padding:12px 12px 0;${tsa}">` +
      `<table cellpadding=0 cellspacing=0 width=261 height=193>` +
      `<tr>` +
        `<td width=94 style="padding-right:10px">` +
          `<img src="${u}/${a.logoMark}" width=84 height=118>` +
        `</td>` +
        `<td width=167 valign=top style="color:#FFFFFF;line-height:14px;${tsa}">` +
          `<div style="font:bold 13px/16px Arial,sans-serif;height:32px;overflow:hidden;text-transform:uppercase">%%DisplayName%%</div>` +
          `<div style="font:10px/12px Arial,sans-serif;padding:3px 0 10px;height:24px;overflow:hidden">%%Title%%</div>` +
          row(a.mail, 'mailto:%%UserLogonName%%', '%%UserLogonName%%') +
          row(a.phone, 'tel:%%MobileNumber%%', '%%MobileNumber%%') +
          secondPhoneRow +
          row(a.website, origin, 'www.biomonie.com', true) +
          `<div style="padding:12px 12px 8px 0;font:bold 10px/12px Arial,sans-serif;color:#FFFFFF;text-align:right;${tsa}"><div style="white-space:nowrap">BIOMONIE TECHNOLOGIES</div><div style="white-space:nowrap">LIMITED</div></div>` +
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `<tr>` +
    `<td bgcolor="#D9D9D9" background="${u}/${a.bgGrey}" height=64 style="background-color:#D9D9D9;background-image:url(${u}/${a.bgGrey});padding:8px;${tsa}" valign=middle>` +
      `<table cellpadding=0 cellspacing=0 width=269 height=64>` +
      `<tr>` +
        `<td width=74 style="padding-right:4px"><img src="${u}/${a.logoWordmark}" width=70 height=31></td>` +
        `<td width=195 style="font:8px/11px Arial,sans-serif;color:#333333;white-space:nowrap;${tsa}">` +
          `<table cellspacing=3 style="font-size:0;line-height:0;margin-bottom:3px"><tr>` +
          `<td><a href="${fb}"><img src="${u}/${a['social-facebook']}" width=18 height=18></a></td>` +
          `<td><a href="${x}"><img src="${u}/${a['social-x']}" width=18 height=18></a></td>` +
          `<td><a href="${ig}"><img src="${u}/${a['social-instagram']}" width=18 height=18></a></td>` +
          `<td><a href="${yt}"><img src="${u}/${a['social-youtube']}" width=18 height=18></a></td>` +
          `<td><a href="${li}"><img src="${u}/${a['social-linkedin']}" width=18 height=18></a></td>` +
          `<td><a href="${tt}"><img src="${u}/${a['social-tiktok']}" width=18 height=18></a></td>` +
          `</tr></table>` +
          `<div>Facebook.com/biomonie | X.com/biomonie</div>` +
          `<div>Instagram.com/biomonie | Youtube.com/biomonie</div>` +
          `<div>Linkedin.com/biomonie</div>` +
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `</table></td>` +
  `<td width=315 height=285 bgcolor="#14262F" background="${u}/${a.bgBanner}" style="width:315px;height:285px;background-color:#14262F;background-image:url(${u}/${a.bgBanner})"><a href="${bannerLink}" style=display:block><img src="${u}/${a.banner}" width=315 height=285 style="display:block;border:0;height:285px"></a></td>` +
  `</tr></table>`;
}

export const EXCHANGE_SAMPLES: Record<'longName' | 'shortName', SignatureValues> = {
  longName: {
    name: 'Solomon Chukwuka Emmanuel',
    title: 'Senior Software Engineer',
    email: 'solomon@biomonie.com',
    phone: '+234 (0) 801 234 5678',
    secondPhone: '+234 (0) 809 876 5432',
  },
  shortName: {
    name: 'Miracle Amos',
    title: 'UX Designer',
    email: 'miracle@biomonie.com',
    phone: '+234 (0) 807 739 4817',
    secondPhone: '',
  },
};

export function renderExchangeSignaturePreview(
  sample: SignatureValues,
  options: { assetBaseUrl?: string; siteOrigin?: string; twoPhones?: boolean } = {},
): string {
  const origin =
    options.siteOrigin ||
    (options.assetBaseUrl ? options.assetBaseUrl.replace(/\/email$/, '') : SITE_ORIGIN);
  const twoPhones = options.twoPhones ?? Boolean(sample.secondPhone);
  const html = buildExchangeSignatureHtml({ siteOrigin: origin, twoPhones });
  return html
    .replace(/%%DisplayName%%/g, escapeHtml(sample.name))
    .replace(/%%Title%%/g, escapeHtml(sample.title))
    .replace(/%%UserLogonName%%/g, escapeHtml(sample.email))
    .replace(/%%MobileNumber%%/g, escapeHtml(sample.phone))
    .replace(/%%PhoneNumber%%/g, escapeHtml(sample.secondPhone || ''));
}

export function signaturePlainText(values: SignatureValues) {
  const lines = [values.name, values.title, values.email, values.phone];
  if (values.secondPhone && values.secondPhone.trim()) {
    lines.push(values.secondPhone.trim());
  }
  lines.push('www.biomonie.com');
  return lines.join('\n');
}
