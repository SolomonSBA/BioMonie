import {
  ASSET_BASE_URL,
  SITE_ORIGIN,
  signatureAssets,
  signatureImage,
  signatureSocials,
} from './signatureConfig.ts';
import { normalizeOrigin } from './storeLinks.ts';

export type SignatureValues = {
  name: string;
  title: string;
  email: string;
  phone: string;
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

const imgStyle = 'display:block;border:0;outline:none;';
const serifFont = "Georgia,'Times New Roman',serif";
const sansFont = 'Arial,Helvetica,sans-serif';
type AssetName = keyof typeof import('./signatureConfig').signatureAssets.images;

export const DEFAULT_SAMPLE_VALUES: SignatureValues = {
  name: 'Your Name',
  title: 'Job Title',
  email: 'name@biomonie.com',
  phone: '+234 000 000 0000',
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

  const displayName = escapeHtml(rawName.toUpperCase());
  const displayTitle = escapeHtml(rawTitle);
  const displayEmail = escapeHtml(rawEmail);
  const displayPhone = escapeHtml(rawPhone);

  const nameColor = sampleState && isNameEmpty ? '#9cb3c1' : '#ffffff';
  const titleColor = sampleState && isTitleEmpty ? '#9cb3c1' : '#ffffff';
  const emailColor = sampleState && isEmailEmpty ? '#9cb3c1' : '#ffffff';
  const phoneColor = sampleState && isPhoneEmpty ? '#9cb3c1' : '#ffffff';

  const nameLength = rawName.trim().length;
  const nameFontSize = nameLength <= 18 ? 15 : nameLength <= 26 ? 13 : 11;
  const nameLineHeight = nameFontSize <= 11 ? 14 : nameFontSize <= 13 ? 16 : 18;

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
      return `<td style="padding:0 ${padRight}px 5px 0;line-height:0;"><a href="${social.href}" target="_blank" style="text-decoration:none;display:block;"><img src="${image(`social-${key}` as AssetName)}" width="18" height="18" alt="${social.label}" style="${imgStyle}width:18px;height:18px;"></a></td>`;
    })
    .join('');

  const layoutStyle = 'border-collapse:collapse;table-layout:fixed;';
  const contactTextStyle = `font-family:${serifFont};font-size:10px;line-height:14px;overflow-wrap:anywhere;`;

  const mailtoHref = rawEmail ? `mailto:${escapeAttribute(rawEmail)}` : '#';
  const telHref = rawPhone ? `tel:${escapeAttribute(formatPhoneForTel(rawPhone))}` : '#';

  const styleBlock = includeResponsiveStyle
    ? `<style type="text/css">@media only screen and (max-width:480px){table.bm-table{width:100%!important;max-width:100%!important;}td.bm-col{display:block!important;width:100%!important;max-width:100%!important;}img.bm-resp{width:100%!important;height:auto!important;}}</style>`
    : '';

  const html = `${styleBlock}<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="bm-table" style="width:600px;max-width:100%;${layoutStyle}font-family:${serifFont};"><tr><td class="bm-col" width="285" valign="top" style="width:285px;padding:0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="285" style="width:285px;${layoutStyle}"><tr><td bgcolor="#1B3A50" height="176" style="background-color:#1B3A50;padding:22px 14px 16px 12px;height:176px;" valign="top"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="259" style="width:259px;${layoutStyle}"><tr><td width="84" valign="top" style="width:84px;padding:0 10px 0 0;line-height:0;"><img src="${image('logoMark')}" width="84" height="118" alt="Biomonie" style="${imgStyle}width:84px;height:118px;"></td><td width="175" valign="top" style="width:175px;padding:0;"><div style="font-family:${serifFont};font-size:${nameFontSize}px;line-height:${nameLineHeight}px;font-weight:bold;color:${nameColor};letter-spacing:0.5px;white-space:normal;overflow-wrap:anywhere;word-break:normal;">${displayName || '&nbsp;'}</div><div style="font-family:${serifFont};font-size:11px;line-height:14px;height:28px;max-height:28px;overflow:hidden;color:${titleColor};padding:2px 0 6px 0;">${displayTitle || '&nbsp;'}</div><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="175" style="width:175px;${layoutStyle}"><tr><td width="18" valign="middle" style="width:18px;padding:0 6px 4px 0;line-height:0;"><img src="${image('mail')}" width="16" height="16" alt="Email" style="${imgStyle}width:16px;height:16px;"></td><td valign="middle" style="padding:0 0 4px 0;${contactTextStyle}color:${emailColor};"><a href="${mailtoHref}" style="color:${emailColor};text-decoration:none;">${displayEmail || '&nbsp;'}</a></td></tr><tr><td width="18" valign="middle" style="width:18px;padding:0 6px 4px 0;line-height:0;"><img src="${image('phone')}" width="16" height="16" alt="Phone" style="${imgStyle}width:16px;height:16px;"></td><td valign="middle" style="padding:0 0 4px 0;${contactTextStyle}color:${phoneColor};"><a href="${telHref}" style="color:${phoneColor};text-decoration:none;">${displayPhone || '&nbsp;'}</a></td></tr><tr><td width="18" valign="middle" style="width:18px;padding:0 6px 0 0;line-height:0;"><img src="${image('website')}" width="16" height="16" alt="Website" style="${imgStyle}width:16px;height:16px;"></td><td valign="middle" style="padding:0;${contactTextStyle}color:#ffffff;"><a href="${escapeAttribute(siteOrigin)}" target="_blank" style="color:#ffffff;text-decoration:none;">www.biomonie.com</a></td></tr></table></td></tr><tr><td colspan="2" style="padding:10px 0 0 0;font-family:${sansFont};font-size:11px;line-height:14px;font-weight:bold;color:#ffffff;text-align:right;">Biomonie Technologies Limited</td></tr></table></td></tr><tr><td bgcolor="#D9D9D9" height="109" style="background-color:#D9D9D9;padding:12px 6px 10px 8px;height:109px;" valign="top"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="271" style="width:271px;${layoutStyle}"><tr><td width="85" valign="middle" style="width:85px;padding:0 5px 0 0;line-height:0;"><img src="${image('logoWordmark')}" width="80" height="35" alt="Biomonie" style="${imgStyle}width:80px;height:35px;"></td><td width="186" valign="top" style="width:186px;padding:0;overflow:hidden;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr>${socialIcons}</tr></table><div style="font-family:${serifFont};font-size:8px;line-height:12px;color:#333333;"><div style="white-space:nowrap;"><a href="${signatureSocials.facebook.href}" target="_blank" style="color:#333333;text-decoration:none;">Facebook.com/biomonie</a>&nbsp;|&nbsp;<a href="${signatureSocials.x.href}" target="_blank" style="color:#333333;text-decoration:none;">X.com/biomonie</a></div><div style="white-space:nowrap;"><a href="${signatureSocials.instagram.href}" target="_blank" style="color:#333333;text-decoration:none;">Instagram.com/biomonie</a>&nbsp;|&nbsp;<a href="${signatureSocials.youtube.href}" target="_blank" style="color:#333333;text-decoration:none;">Youtube.com/biomonie</a></div><div style="white-space:nowrap;"><a href="${signatureSocials.linkedin.href}" target="_blank" style="color:#333333;text-decoration:none;">Linkedin.com/biomonie</a></div></div></td></tr></table></td></tr></table></td><td class="bm-col" width="315" valign="top" bgcolor="#14262F" style="width:315px;background-color="#14262F";padding:0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="315" style="width:315px;${layoutStyle}"><tr><td width="315" height="285" valign="top" bgcolor="#14262F" style="width:315px;height:285px;padding:0;line-height:0;"><a href="${escapeAttribute(bannerLinkUrl)}" target="_blank" style="text-decoration:none;display:block;"><img src="${image('banner')}" class="bm-resp" width="315" height="285" alt="Biomonie, the first-ever global biometric cardless payment ecosystem. Download on Google Play and the App Store." style="${imgStyle}width:315px;height:285px;background-color:#14262F;"></a></td></tr></table></td></tr></table>`;

  if (minify) {
    return html.replace(/>\s+</g, '><').trim();
  }
  return html;
}

export function buildExchangeSignatureHtml(options: { siteOrigin?: string } = {}): string {
  // Exchange variables: %%DisplayName%%, %%Title%%, %%UserLogonName%%, %%MobileNumber%%
  // Strictly under 4,500 characters (Exchange mail flow rule limit) with inline CSS only.
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

  return `<table cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;font-family:Georgia,serif;"><tr valign="top">` +
  `<td width="285"><table cellpadding="0" cellspacing="0" width="285" bgcolor="#1B3A50">` +
  `<tr>` +
    `<td width="96" style="padding:22px 10px 0 12px"><img src="${u}/${a.logoMark}" width="84" height="118" alt="Biomonie" style="display:block;border:0"></td>` +
    `<td width="189" style="padding:22px 14px 0 0;color:#fff">` +
      `<div style="font:bold 13px/16px Georgia,serif;letter-spacing:.5px;height:32px;overflow:hidden;text-transform:uppercase">%%DisplayName%%</div>` +
      `<div style="font:11px/14px Georgia,serif;height:28px;overflow:hidden;padding:2px 0 6px">%%Title%%</div>` +
      `<table cellpadding="0" cellspacing="0" width="175" style="font:10px/14px Georgia,serif;color:#fff">` +
      `<tr><td width="18" height="18"><img src="${u}/${a.mail}" width="16" height="16" alt="Email" style="display:block;border:0"></td><td style="padding-left:6px"><a href="mailto:%%UserLogonName%%" style="color:#fff;text-decoration:none">%%UserLogonName%%</a></td></tr>` +
      `<tr><td height="18"><img src="${u}/${a.phone}" width="16" height="16" alt="Phone" style="display:block;border:0"></td><td style="padding-left:6px"><a href="tel:%%MobileNumber%%" style="color:#fff;text-decoration:none">%%MobileNumber%%</a></td></tr>` +
      `<tr><td height="16"><img src="${u}/${a.website}" width="16" height="16" alt="Web" style="display:block;border:0"></td><td style="padding-left:6px"><a href="${origin}" style="color:#fff;text-decoration:none">www.biomonie.com</a></td></tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `<tr><td colspan="2" style="padding:6px 14px 16px 0;font:bold 11px/14px Arial,sans-serif;color:#fff;text-align:right">Biomonie Technologies Limited</td></tr>` +
  `<tr bgcolor="#D9D9D9">` +
    `<td width="90" valign="middle" style="padding:12px 6px 10px 8px"><img src="${u}/${a.logoWordmark}" width="80" height="35" alt="Biomonie" style="display:block;border:0"></td>` +
    `<td width="195" style="padding:12px 6px 10px 0;font:8px/12px Georgia,serif;color:#333;white-space:nowrap">` +
      `<table cellpadding="0" cellspacing="4" style="margin-bottom:4px"><tr>` +
      `<td><a href="${fb}"><img src="${u}/${a['social-facebook']}" width="18" height="18" alt="Facebook" style="display:block;border:0"></a></td>` +
      `<td><a href="${x}"><img src="${u}/${a['social-x']}" width="18" height="18" alt="X" style="display:block;border:0"></a></td>` +
      `<td><a href="${ig}"><img src="${u}/${a['social-instagram']}" width="18" height="18" alt="Instagram" style="display:block;border:0"></a></td>` +
      `<td><a href="${yt}"><img src="${u}/${a['social-youtube']}" width="18" height="18" alt="YouTube" style="display:block;border:0"></a></td>` +
      `<td><a href="${li}"><img src="${u}/${a['social-linkedin']}" width="18" height="18" alt="LinkedIn" style="display:block;border:0"></a></td>` +
      `<td><a href="${tt}"><img src="${u}/${a['social-tiktok']}" width="18" height="18" alt="TikTok" style="display:block;border:0"></a></td>` +
      `</tr></table>` +
      `Facebook.com/biomonie | X.com/biomonie<br>` +
      `Instagram.com/biomonie | Youtube.com/biomonie<br>` +
      `Linkedin.com/biomonie` +
    `</td>` +
  `</tr>` +
  `</table></td>` +
  `<td width="315" bgcolor="#14262F"><a href="${bannerLink}"><img src="${u}/${a.banner}" width="315" height="285" alt="Biomonie, the first-ever global biometric cardless payment ecosystem. Download on Google Play and the App Store." style="display:block;border:0"></a></td>` +
  `</tr></table>`;
}

export const EXCHANGE_SAMPLES: Record<'longName' | 'shortName', SignatureValues> = {
  longName: {
    name: 'Solomon Chukwuka Emmanuel',
    title: 'Senior Software Engineer',
    email: 'solomon@biomonie.com',
    phone: '+234 (0) 801 234 5678',
  },
  shortName: {
    name: 'Miracle Amos',
    title: 'UX Designer',
    email: 'miracle@biomonie.com',
    phone: '+234 (0) 807 739 4817',
  },
};

export function renderExchangeSignaturePreview(
  sample: SignatureValues,
  options: { assetBaseUrl?: string; siteOrigin?: string } = {},
): string {
  const origin =
    options.siteOrigin ||
    (options.assetBaseUrl ? options.assetBaseUrl.replace(/\/email$/, '') : SITE_ORIGIN);
  const html = buildExchangeSignatureHtml({ siteOrigin: origin });
  return html
    .replace(/%%DisplayName%%/g, escapeHtml(sample.name))
    .replace(/%%Title%%/g, escapeHtml(sample.title))
    .replace(/%%UserLogonName%%/g, escapeHtml(sample.email))
    .replace(/%%MobileNumber%%/g, escapeHtml(sample.phone));
}

export function signaturePlainText(values: SignatureValues) {
  return `${values.name}\n${values.title}\n${values.email}\n${values.phone}\nwww.biomonie.com`;
}
