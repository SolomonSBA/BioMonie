import {
  ASSET_BASE_URL,
  SIGNATURE_SCALE,
  SITE_ORIGIN,
  scaled,
  scaledFont,
  signatureAssets,
  signatureImage,
  signatureSocials,
  versionedAssetBaseUrl,
} from './signatureConfig.ts';
import { normalizeOrigin } from './storeLinks.ts';

export { SIGNATURE_SCALE };

export type CompanyAlign = 'left' | 'right';

/** Both company-name lines use this alignment. */
export const COMPANY_ALIGN: CompanyAlign = 'left';

/**
 * Base design measurements (scale 1.0, 600px total width).
 *
 * Every value below is multiplied by SIGNATURE_SCALE and rounded to whole
 * pixels by getSignatureLayout(). The base is kept as named constants so the
 * relationship between the approved 285px design and any scale stays obvious.
 */
export const BASE_DESIGN = {
  totalWidth: 600,
  leftWidth: 285,
  bannerWidth: 315,
  navyHeight: 205,
  greyHeight: 80,
  navyPadX: 12,
  navyPadY: 6,
  logoMarkWidth: 70,
  logoMarkHeight: 98,
  logoTextGap: 8,
  iconSize: 14,
  iconGutter: 6,
  nameLineHeight: 16,
  titleLineHeight: 12,
  contactLineHeight: 14,
  companyLineHeight: 12,
  socialLineHeight: 11,
  greyPad: 8,
  wordmarkWidth: 70,
  wordmarkHeight: 31,
  wordmarkCellWidth: 82,
  socialIconSize: 18,
  socialGap: 4,
  socialMarginBottom: 3,
  nameFontDefault: 13,
  nameFontMid: 12,
  nameFontSmall: 11,
  titleFont: 10,
  contactFont: 9,
  emailFont: 8,
  companyFont: 9,
  socialFont: 8,
  gaps: {
    titleContact: 6,
    contactRow: 6,
    contactCompany: 8,
    companyWebsite: 6,
    navyBottom: 10,
  },
} as const;

export type SignatureLayout = {
  scale: number;
  totalWidth: number;
  leftWidth: number;
  bannerWidth: number;
  bannerHeight: number;
  navyHeight: number;
  greyHeight: number;
  navyPadX: number;
  navyPadY: number;
  navyContentWidth: number;
  navyInnerHeight: number;
  logoMarkWidth: number;
  logoMarkHeight: number;
  logoTextGap: number;
  logoColumnWidth: number;
  textColumnWidth: number;
  iconSize: number;
  iconGutter: number;
  contactIconCellWidth: number;
  contactTextCellWidth: number;
  nameLineHeight: number;
  nameCellHeight: number;
  titleLineHeight: number;
  titleCellHeight: number;
  titleRowHeight: number;
  contactLineHeight: number;
  companyLineHeight: number;
  socialLineHeight: number;
  bottomRowHeight: number;
  greyPad: number;
  greyInnerWidth: number;
  greyInnerHeight: number;
  wordmarkWidth: number;
  wordmarkHeight: number;
  wordmarkCellWidth: number;
  socialTextCellWidth: number;
  socialIconSize: number;
  socialGap: number;
  socialMarginBottom: number;
  fonts: {
    nameDefault: number;
    nameMid: number;
    nameSmall: number;
    title: number;
    contact: number;
    email: number;
    company: number;
    social: number;
  };
  gaps: {
    titleContact: number;
    contactRow: number;
    contactCompany: number;
    companyWebsite: number;
    navyBottom: number;
  };
};

/**
 * Derives every dimension from the base design. Both columns always share the
 * same height: bannerHeight = leftWidth = navyHeight + greyHeight, while the
 * banner width is whatever remains of the rounded total width.
 */
export function getSignatureLayout(scale: number = SIGNATURE_SCALE): SignatureLayout {
  const r = (base: number) => Math.max(1, scaled(base, scale));
  const f = (base: number) => scaledFont(base, scale);

  const totalWidth = r(BASE_DESIGN.totalWidth);
  const leftWidth = r(BASE_DESIGN.leftWidth);
  const bannerWidth = totalWidth - leftWidth;
  const bannerHeight = leftWidth;
  const navyHeight = r(BASE_DESIGN.navyHeight);
  const greyHeight = bannerHeight - navyHeight;

  const navyPadX = r(BASE_DESIGN.navyPadX);
  const navyPadY = r(BASE_DESIGN.navyPadY);
  const navyContentWidth = leftWidth - navyPadX * 2;
  const navyInnerHeight = navyHeight - navyPadY * 2;

  const logoMarkWidth = r(BASE_DESIGN.logoMarkWidth);
  const logoMarkHeight = r(BASE_DESIGN.logoMarkHeight);
  const logoTextGap = r(BASE_DESIGN.logoTextGap);
  const logoColumnWidth = logoMarkWidth + logoTextGap;
  const textColumnWidth = navyContentWidth - logoColumnWidth;

  const iconSize = r(BASE_DESIGN.iconSize);
  const iconGutter = r(BASE_DESIGN.iconGutter);
  const contactIconCellWidth = iconSize + iconGutter;
  const contactTextCellWidth = textColumnWidth - contactIconCellWidth;

  const nameLineHeight = r(BASE_DESIGN.nameLineHeight);
  const nameCellHeight = nameLineHeight * 2;
  const titleLineHeight = r(BASE_DESIGN.titleLineHeight);
  const titleCellHeight = titleLineHeight * 2;
  // The title cell carries two lines plus the title->contact gap, so the
  // contact table can still start with a real 2-column row (Word splits a
  // table whose first row is a single colspan cell).
  const titleRowHeight = titleCellHeight + r(BASE_DESIGN.gaps.titleContact);
  const bottomRowHeight = navyInnerHeight - nameCellHeight - titleRowHeight;

  const greyPad = r(BASE_DESIGN.greyPad);
  const greyInnerWidth = leftWidth - greyPad * 2;
  const greyInnerHeight = greyHeight - greyPad * 2;
  const wordmarkWidth = r(BASE_DESIGN.wordmarkWidth);
  const wordmarkHeight = r(BASE_DESIGN.wordmarkHeight);
  const wordmarkCellWidth = r(BASE_DESIGN.wordmarkCellWidth);
  const socialTextCellWidth = greyInnerWidth - wordmarkCellWidth;
  const socialIconSize = r(BASE_DESIGN.socialIconSize);

  return {
    scale,
    totalWidth,
    leftWidth,
    bannerWidth,
    bannerHeight,
    navyHeight,
    greyHeight,
    navyPadX,
    navyPadY,
    navyContentWidth,
    navyInnerHeight,
    logoMarkWidth,
    logoMarkHeight,
    logoTextGap,
    logoColumnWidth,
    textColumnWidth,
    iconSize,
    iconGutter,
    contactIconCellWidth,
    contactTextCellWidth,
    nameLineHeight,
    nameCellHeight,
    titleLineHeight,
    titleCellHeight,
    titleRowHeight,
    contactLineHeight: r(BASE_DESIGN.contactLineHeight),
    companyLineHeight: r(BASE_DESIGN.companyLineHeight),
    socialLineHeight: r(BASE_DESIGN.socialLineHeight),
    bottomRowHeight,
    greyPad,
    greyInnerWidth,
    greyInnerHeight,
    wordmarkWidth,
    wordmarkHeight,
    wordmarkCellWidth,
    socialTextCellWidth,
    socialIconSize,
    socialGap: r(BASE_DESIGN.socialGap),
    socialMarginBottom: r(BASE_DESIGN.socialMarginBottom),
    fonts: {
      nameDefault: f(BASE_DESIGN.nameFontDefault),
      nameMid: f(BASE_DESIGN.nameFontMid),
      nameSmall: f(BASE_DESIGN.nameFontSmall),
      title: f(BASE_DESIGN.titleFont),
      contact: f(BASE_DESIGN.contactFont),
      email: f(BASE_DESIGN.emailFont),
      company: f(BASE_DESIGN.companyFont),
      social: f(BASE_DESIGN.socialFont),
    },
    gaps: {
      titleContact: r(BASE_DESIGN.gaps.titleContact),
      contactRow: r(BASE_DESIGN.gaps.contactRow),
      contactCompany: r(BASE_DESIGN.gaps.contactCompany),
      companyWebsite: r(BASE_DESIGN.gaps.companyWebsite),
      navyBottom: r(BASE_DESIGN.gaps.navyBottom),
    },
  };
}

/** The layout used by the build at the configured signature scale. */
export const SIGNATURE_LAYOUT = getSignatureLayout(SIGNATURE_SCALE);

export const TOTAL_WIDTH = SIGNATURE_LAYOUT.totalWidth;
export const LEFT_COLUMN_WIDTH = SIGNATURE_LAYOUT.leftWidth;
export const BANNER_WIDTH = SIGNATURE_LAYOUT.bannerWidth;
export const BANNER_HEIGHT = SIGNATURE_LAYOUT.bannerHeight;
export const NAVY_HEIGHT = SIGNATURE_LAYOUT.navyHeight;
export const GREY_HEIGHT = SIGNATURE_LAYOUT.greyHeight;
export const TOTAL_LEFT_HEIGHT = SIGNATURE_LAYOUT.bannerHeight;

export const NAME_FONT_SIZE_DEFAULT = SIGNATURE_LAYOUT.fonts.nameDefault;
export const NAME_FONT_SIZE_MID = SIGNATURE_LAYOUT.fonts.nameMid;
export const NAME_FONT_SIZE_SMALL = SIGNATURE_LAYOUT.fonts.nameSmall;

export const JOB_TITLE_FONT_SIZE = SIGNATURE_LAYOUT.fonts.title;
export const CONTACT_FONT_SIZE = SIGNATURE_LAYOUT.fonts.contact;
export const EMAIL_FONT_SIZE = SIGNATURE_LAYOUT.fonts.email;
export const COMPANY_NAME_FONT_SIZE = SIGNATURE_LAYOUT.fonts.company;
export const CONTACT_ROW_GAP = SIGNATURE_LAYOUT.gaps.contactRow;
export const CONTACT_COMPANY_GAP = SIGNATURE_LAYOUT.gaps.contactCompany;
export const COMPANY_WEBSITE_GAP = SIGNATURE_LAYOUT.gaps.companyWebsite;
export const TITLE_CONTACT_GAP = SIGNATURE_LAYOUT.gaps.titleContact;
export const NAVY_BOTTOM_PADDING = SIGNATURE_LAYOUT.gaps.navyBottom;
export const SOCIAL_FONT_SIZE = SIGNATURE_LAYOUT.fonts.social;
export const ICON_SIZE = SIGNATURE_LAYOUT.iconSize;

export const LOGO_MARK_WIDTH = SIGNATURE_LAYOUT.logoMarkWidth;
export const LOGO_MARK_HEIGHT = SIGNATURE_LAYOUT.logoMarkHeight;
export const LOGO_TEXT_GAP = SIGNATURE_LAYOUT.logoTextGap;
export const NAVY_INNER_HEIGHT = SIGNATURE_LAYOUT.navyInnerHeight;
export const NAVY_TOP_ROW_HEIGHT = SIGNATURE_LAYOUT.nameCellHeight + SIGNATURE_LAYOUT.titleRowHeight;
export const NAVY_BOTTOM_ROW_HEIGHT = SIGNATURE_LAYOUT.bottomRowHeight;
export const NAVY_CONTENT_WIDTH = SIGNATURE_LAYOUT.navyContentWidth;
export const NAVY_LOGO_COLUMN_WIDTH = SIGNATURE_LAYOUT.logoColumnWidth;
export const NAVY_TEXT_COLUMN_WIDTH = SIGNATURE_LAYOUT.textColumnWidth;

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
  companyAlign?: CompanyAlign;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  /** Overrides SIGNATURE_SCALE (used by tests to prove every scale is coherent). */
  scale?: number;
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

/**
 * Auto-shrink rule for contact lines. The tier is chosen from the text length
 * against the 26/32-character base thresholds, then scaled and clamped to 9px.
 * At 1.25x a contact line is 11/10/9px and an email is 10/9/9px.
 */
export function getContactFontSize(
  text: string,
  base: number = BASE_DESIGN.contactFont,
  scale: number = SIGNATURE_SCALE,
): number {
  const len = text.trim().length;
  const tierBase = len <= 26 ? base : len <= 32 ? base - 1 : base - 2;
  return scaledFont(tierBase, scale);
}

const imgStyle = 'display:block;border:0;-ms-interpolation-mode:bicubic;';

/** Shared banner alt so web and Exchange stay identical. */
export const BANNER_ALT =
  'Biomonie, the first-ever global biometric cardless payment ecosystem. Download on Google Play and the App Store.';

/**
 * Exchange email placeholder. Some Exchange/AD environments expose %%Email%%
 * instead of %%UserLogonName%%; switch this one constant after confirming with
 * the CTO. The build script and tests use it for both the mailto and the label.
 */
export const EXCHANGE_EMAIL_VAR = '%%UserLogonName%%';

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
    companyAlign = COMPANY_ALIGN,
    scale = SIGNATURE_SCALE,
  } = options;

  const L = getSignatureLayout(scale);

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
      ? L.fonts.nameDefault
      : nameLength <= 26
        ? L.fonts.nameMid
        : L.fonts.nameSmall;
  // Fixed two-line cell: a one-line name sits on the bottom edge (directly
  // above the title), a two-line name fills the box. Line height never changes
  // with the shrink tier, so the cell height is stable for Word.
  const nameLineHeight = L.nameLineHeight;
  const nameCellHeight = L.nameCellHeight;

  const emailFontSize = getContactFontSize(rawEmail, BASE_DESIGN.emailFont, scale);
  const phoneFontSize = getContactFontSize(rawPhone, BASE_DESIGN.contactFont, scale);
  const secondPhoneFontSize = getContactFontSize(
    rawSecondPhone,
    BASE_DESIGN.contactFont,
    scale,
  );

  const image = (key: AssetName) => signatureImage(key, assetBaseUrl);

  const layoutStyle = 'border-collapse:collapse;table-layout:fixed;';
  const tsa = '-webkit-text-size-adjust:none;-ms-text-size-adjust:none;';
  const msoLine = 'mso-line-height-rule:exactly;';

  /**
   * Outlook/Word spacer row. Word ignores padding/margin gaps inside table
   * cells, so every vertical gap is an explicit row with a fixed height.
   */
  const spacerRow = (height: number, width: number, colspan = 1) =>
    `<tr><td width="${width}"${colspan > 1 ? ` colspan="${colspan}"` : ''} height="${height}" style="height:${height}px;font-size:1px;line-height:1px;${msoLine}">&nbsp;</td></tr>`;

  /**
   * Contact-table spacer row. It must contain BOTH columns explicitly.
   *
   * Classic Outlook renders with Word's table engine, which ignores <colgroup>
   * and table-layout:fixed. If the first row of the contact table is a single
   * colspan=2 cell, Word splits the table into two equal columns, pushing every
   * contact line to the right. Two explicit cells make the widths unambiguous
   * in every engine.
   */
  const contactSpacerRow = (height: number) => {
    const cell = (width: number) =>
      `<td width="${width}" height="${height}" style="width:${width}px;height:${height}px;font-size:1px;line-height:1px;${msoLine}">&nbsp;</td>`;
    return `<tr>${cell(L.contactIconCellWidth)}${cell(L.contactTextCellWidth)}</tr>`;
  };

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
      const padRight = index === socialIconKeys.length - 1 ? 0 : L.socialGap;
      const size = L.socialIconSize;
      return `<td width="${size}" style="width:${size}px;padding:0 ${padRight}px 0 0;line-height:0;${tsa}"><a href="${social.href}" target="_blank" style="text-decoration:none;display:block;"><img src="${image(`social-${key}` as AssetName)}" width="${size}" height="${size}" border="0" alt="${social.label}" style="${imgStyle}width:${size}px;height:${size}px;"></a></td>`;
    })
    .join('');

  const mailtoHref = rawEmail ? `mailto:${escapeAttribute(rawEmail)}` : '#';
  const telHref = rawPhone ? `tel:${escapeAttribute(formatPhoneForTel(rawPhone))}` : '#';
  const secondPhoneHref = rawSecondPhone
    ? `tel:${escapeAttribute(formatPhoneForTel(rawSecondPhone))}`
    : '#';

  // Second phone row: rendered ONLY when filled (never when empty, never in sampleState)
  const hasSecondPhone = Boolean(rawSecondPhone);
  const secondPhoneRow = hasSecondPhone
    ? `<tr><td width="${L.contactIconCellWidth}" style="width:${L.contactIconCellWidth}px;line-height:0;${tsa}"><img src="${image('phone')}" width="${L.iconSize}" height="${L.iconSize}" border="0" alt="Phone" style="${imgStyle}width:${L.iconSize}px;height:${L.iconSize}px;"></td><td width="${L.contactTextCellWidth}" style="width:${L.contactTextCellWidth}px;font-family:${SANS_FONT};font-size:${secondPhoneFontSize}px;line-height:${L.contactLineHeight}px;${msoLine}color:${phoneColor};white-space:nowrap;${tsa}"><a href="${secondPhoneHref}" style="color:${phoneColor};text-decoration:none;"><span style="color:${phoneColor};text-decoration:none;white-space:nowrap;">${displaySecondPhone}</span></a></td></tr>`
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
  }) =>
    `<tr>` +
      `<td width="${L.contactIconCellWidth}" style="width:${L.contactIconCellWidth}px;line-height:0;${tsa}"><img src="${image(options.icon)}" width="${L.iconSize}" height="${L.iconSize}" border="0" alt="${options.alt}" style="${imgStyle}width:${L.iconSize}px;height:${L.iconSize}px;"></td>` +
      `<td width="${L.contactTextCellWidth}" style="width:${L.contactTextCellWidth}px;font-family:${SANS_FONT};font-size:${options.fontSize}px;line-height:${L.contactLineHeight}px;${msoLine}color:${options.color};white-space:nowrap;${tsa}"><a href="${options.href}"${options.href.startsWith('http') ? ' target="_blank"' : ''} style="color:${options.color};text-decoration:none;"><span style="color:${options.color};text-decoration:none;white-space:nowrap;">${options.text}</span></a></td>` +
    `</tr>`;

  const html = `${styleBlock}<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${L.totalWidth}" class="bm-table" style="width:${L.totalWidth}px;max-width:100%;${layoutStyle}font-family:${SANS_FONT};${tsa}">` +
  `<tr>` +
  `<td class="bm-col" width="${L.leftWidth}" valign="top" style="width:${L.leftWidth}px;padding:0;line-height:0;${tsa}">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${L.leftWidth}" style="width:${L.leftWidth}px;${layoutStyle}">` +
    `<tr>` +
      `<td width="${L.leftWidth}" bgcolor="#1B3A50" height="${L.navyHeight}" style="background-color:#1B3A50;padding:${L.navyPadY}px ${L.navyPadX}px;height:${L.navyHeight}px;box-sizing:border-box;${tsa}" valign="top">` +
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${L.navyContentWidth}" height="${L.navyInnerHeight}" style="width:${L.navyContentWidth}px;height:${L.navyInnerHeight}px;${layoutStyle}">` +
        `<tr>` +
          `<td width="${L.logoColumnWidth}" height="${L.navyInnerHeight}" rowspan="3" valign="middle" style="width:${L.logoColumnWidth}px;padding:0 ${L.logoTextGap}px 0 0;line-height:0;${tsa}">` +
            `<img src="${image('logoMark')}" width="${L.logoMarkWidth}" height="${L.logoMarkHeight}" border="0" alt="Biomonie" style="${imgStyle}width:${L.logoMarkWidth}px;height:${L.logoMarkHeight}px;">` +
          `</td>` +
          `<td width="${L.textColumnWidth}" height="${nameCellHeight}" valign="bottom" style="width:${L.textColumnWidth}px;height:${nameCellHeight}px;font-family:${SANS_FONT};font-size:${nameFontSize}px;line-height:${nameLineHeight}px;${msoLine}font-weight:bold;color:${nameColor};letter-spacing:0.5px;white-space:normal;overflow-wrap:anywhere;word-break:normal;overflow:hidden;${tsa}">${displayName || '&nbsp;'}</td>` +
        `</tr>` +
        `<tr>` +
          `<td width="${L.textColumnWidth}" height="${L.titleRowHeight}" valign="top" style="width:${L.textColumnWidth}px;height:${L.titleRowHeight}px;font-family:${SANS_FONT};font-size:${L.fonts.title}px;line-height:${L.titleLineHeight}px;${msoLine}color:${titleColor};overflow:hidden;${tsa}">${displayTitle || '&nbsp;'}</td>` +
        `</tr>` +
        `<tr>` +
          `<td width="${L.textColumnWidth}" height="${L.bottomRowHeight}" valign="top" style="width:${L.textColumnWidth}px;height:${L.bottomRowHeight}px;padding:0;line-height:0;${tsa}">` +
            `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${L.textColumnWidth}" style="width:${L.textColumnWidth}px;${layoutStyle}">` +
              contactRow({ icon: 'mail', alt: 'Email', href: mailtoHref, text: displayEmail || '&nbsp;', fontSize: emailFontSize, color: emailColor }) +
              contactSpacerRow(L.gaps.contactRow) +
              contactRow({ icon: 'phone', alt: 'Phone', href: telHref, text: displayPhone || '&nbsp;', fontSize: phoneFontSize, color: phoneColor }) +
              (hasSecondPhone ? contactSpacerRow(L.gaps.contactRow) + secondPhoneRow : '') +
              contactSpacerRow(L.gaps.contactCompany) +
              `<tr><td width="${L.textColumnWidth}" colspan="2" style="width:${L.textColumnWidth}px;font-family:${SANS_FONT};font-size:${L.fonts.company}px;line-height:${L.companyLineHeight}px;${msoLine}font-weight:bold;letter-spacing:0;color:#FFFFFF;text-align:${companyAlign};${tsa}">` +
                `<div style="white-space:nowrap;${tsa}">BIOMONIE TECHNOLOGIES</div>` +
                `<div style="white-space:nowrap;${tsa}">LIMITED</div>` +
              `</td></tr>` +
              contactSpacerRow(L.gaps.companyWebsite) +
              contactRow({ icon: 'website', alt: 'Website', href: escapeAttribute(siteOrigin), text: 'www.biomonie.com', fontSize: L.fonts.contact, color: '#FFFFFF' }) +
              contactSpacerRow(L.gaps.navyBottom) +
            `</table>` +
          `</td>` +
        `</tr>` +
        `</table>` +
      `</td>` +
    `</tr>` +
    `<tr>` +
      `<td width="${L.leftWidth}" bgcolor="#D9D9D9" height="${L.greyHeight}" style="background-color:#D9D9D9;padding:${L.greyPad}px;height:${L.greyHeight}px;box-sizing:border-box;${tsa}" valign="middle">` +
        `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${L.greyInnerWidth}" height="${L.greyInnerHeight}" style="width:${L.greyInnerWidth}px;height:${L.greyInnerHeight}px;${layoutStyle}">` +
        `<tr>` +
          `<td width="${L.wordmarkCellWidth}" valign="middle" style="width:${L.wordmarkCellWidth}px;padding:0 ${L.socialGap}px 0 0;line-height:0;${tsa}"><img src="${image('logoWordmark')}" width="${L.wordmarkWidth}" height="${L.wordmarkHeight}" border="0" alt="Biomonie" style="${imgStyle}width:${L.wordmarkWidth}px;height:${L.wordmarkHeight}px;"></td>` +
          `<td width="${L.socialTextCellWidth}" valign="middle" style="width:${L.socialTextCellWidth}px;padding:0;${tsa}">` +
            `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-bottom:${L.socialMarginBottom}px;"><tr>${socialIcons}</tr></table>` +
            `<div style="font-family:${SANS_FONT};font-size:${L.fonts.social}px;line-height:${L.socialLineHeight}px;${msoLine}color:#333333;${tsa}">` +
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
  `<td class="bm-col" width="${L.bannerWidth}" height="${L.bannerHeight}" valign="top" bgcolor="#14262F" style="width:${L.bannerWidth}px;height:${L.bannerHeight}px;background-color:#14262F;padding:0;line-height:0;${tsa}">` +
    `<a href="${escapeAttribute(bannerLinkUrl)}" target="_blank" style="text-decoration:none;display:block;"><img src="${image('banner')}" class="bm-resp" width="${L.bannerWidth}" height="${L.bannerHeight}" border="0" alt="${BANNER_ALT}" style="${imgStyle}width:${L.bannerWidth}px;height:${L.bannerHeight}px;background-color:#14262F;"></a>` +
  `</td>` +
  `</tr>` +
  `</table>`;

  if (minify) {
    return html.replace(/>\s+</g, '><').trim();
  }
  return html;
}

/**
 * Full downloadable document. The telephone format-detection meta only belongs
 * here: copying a fragment into Gmail/Outlook must not carry a <meta> tag.
 */
export function buildSignatureDocument(
  values: SignatureValues,
  options: BuildSignatureOptions = {},
) {
  const fragment = buildSignatureHtml(values, options);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="format-detection" content="telephone=no"><title>Biomonie email signature</title></head><body style="margin:0;padding:0;">${fragment}</body></html>`;
}

export function buildExchangeSignatureHtml(options: {
  siteOrigin?: string;
  assetBaseUrl?: string;
  twoPhones?: boolean;
  /** Overrides SIGNATURE_SCALE (used by tests to prove every scale is coherent). */
  scale?: number;
} = {}): string {
  // Exchange variables: %%DisplayName%%, %%Title%%, %%UserLogonName%%, %%MobileNumber%%,
  // and optional %%PhoneNumber%%. All CSS is inline so Exchange disclaimers keep it.
  const origin = options.siteOrigin ? normalizeOrigin(options.siteOrigin) : SITE_ORIGIN;
  const u = versionedAssetBaseUrl(options.assetBaseUrl || `${origin}/email`);
  const bannerLink = `${origin}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;
  const a = signatureAssets.images;
  const L = getSignatureLayout(options.scale ?? SIGNATURE_SCALE);

  // Word/Outlook ignores padding and margin gaps, so every vertical gap is an
  // explicit spacer row. Every text-bearing element repeats its font/colour:
  // bare fragments are often opened in quirks mode, where inheritance from the
  // outer table is unreliable, and Word's table engine does not honour it either.
  const mso = 'mso-line-height-rule:exactly';
  const is = 'display:block';
  const emailTracking = `${(Math.round(-0.3 * L.scale * 10) / 10).toFixed(1)}px`;
  const navText = (fontSize: number) =>
    `font:${fontSize}px/${L.contactLineHeight}px Arial;${mso};color:#fff`;
  const sp = (h: number) =>
    `<tr><td colspan=2 height=${h} style=line-height:1px><br></td></tr>`;
  const row = (
    icon: string,
    href: string,
    text: string,
    alt: string,
    fontSize = L.fonts.contact,
    track = false,
  ) =>
    `<tr><td width=${L.contactIconCellWidth}><img src=${u}/${icon} width=${L.iconSize} height=${L.iconSize} border=0 alt=${alt} style=${is}></td><td width=${L.contactTextCellWidth} valign=top${track ? ' nowrap' : ''} style="${navText(fontSize)}${track ? `;letter-spacing:${emailTracking}` : ''}"><a href=${href} style=color:#fff;text-decoration:none>${text}</a></td></tr>`;
  const social = (network: keyof typeof signatureSocials, icon: string) =>
    `<td width=${L.socialIconSize}><a href=${signatureSocials[network].href}><img src=${u}/${icon} width=${L.socialIconSize} height=${L.socialIconSize} border=0 alt=${signatureSocials[network].label} style=${is}></a></td>`;

  const secondPhoneRow = options.twoPhones
    ? row(a.phone, 'tel:%%PhoneNumber%%', '%%PhoneNumber%%', 'Phone')
    : '';

  return `<table cellpadding=0 cellspacing=0 width=${L.totalWidth}><tr>` +
  `<td width=${L.leftWidth} valign=top><table cellpadding=0 cellspacing=0 width=${L.leftWidth}>` +
  `<tr>` +
    `<td width=${L.leftWidth} bgcolor=#1B3A50 valign=top style="padding:${L.navyPadY}px ${L.navyPadX}px">` +
      `<table cellpadding=0 cellspacing=0 width=${L.navyContentWidth} height=${L.navyInnerHeight}>` +
      `<tr>` +
        `<td width=${L.logoColumnWidth} height=${L.navyInnerHeight} rowspan=3 valign=middle><img src=${u}/${a.logoMark} width=${L.logoMarkWidth} height=${L.logoMarkHeight} border=0 alt=Biomonie style=${is}></td>` +
        `<td width=${L.textColumnWidth} height=${L.nameCellHeight} valign=bottom style="font:bold ${L.fonts.nameDefault}px/${L.nameLineHeight}px Arial;${mso};color:#fff;text-transform:uppercase">%%DisplayName%%</td>` +
      `</tr>` +
      `<tr>` +
        `<td width=${L.textColumnWidth} height=${L.titleRowHeight} valign=top style="font:${L.fonts.title}px/${L.titleLineHeight}px Arial;${mso};color:#fff">%%Title%%</td>` +
      `</tr>` +
      `<tr>` +
        `<td width=${L.textColumnWidth} height=${L.bottomRowHeight} valign=top>` +
          `<table cellpadding=0 cellspacing=0 width=${L.textColumnWidth} style=table-layout:fixed>` +
          row(a.mail, `mailto:${EXCHANGE_EMAIL_VAR}`, EXCHANGE_EMAIL_VAR, 'Email', L.fonts.email, true) +
          sp(L.gaps.contactRow) +
          row(a.phone, 'tel:%%MobileNumber%%', '%%MobileNumber%%', 'Phone') +
          (options.twoPhones ? sp(L.gaps.contactRow) + secondPhoneRow : '') +
          sp(L.gaps.contactCompany) +
          `<tr><td width=${L.textColumnWidth} colspan=2 valign=top style="font:bold ${L.fonts.company}px/${L.companyLineHeight}px Arial;${mso};color:#fff"><div>BIOMONIE TECHNOLOGIES</div><div>LIMITED</div></td></tr>` +
          sp(L.gaps.companyWebsite) +
          row(a.website, origin, 'www.biomonie.com', 'Website') +
          `</table>` +
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `<tr>` +
    `<td width=${L.leftWidth} bgcolor=#D9D9D9 valign=top style="padding:${L.greyPad}px">` +
      `<table cellpadding=0 cellspacing=0 width=${L.greyInnerWidth} height=${L.greyInnerHeight}>` +
      `<tr>` +
        `<td width=${L.wordmarkCellWidth}><img src=${u}/${a.logoWordmark} width=${L.wordmarkWidth} height=${L.wordmarkHeight} border=0 alt=Biomonie style=${is}></td>` +
        `<td width=${L.socialTextCellWidth} valign=top nowrap style="font:${L.fonts.social}px/${L.socialLineHeight}px Arial,sans-serif;${mso};color:#333">` +
          `<table cellpadding=0 cellspacing=${L.socialGap}><tr>` +
          social('facebook', a['social-facebook']) +
          social('x', a['social-x']) +
          social('instagram', a['social-instagram']) +
          social('youtube', a['social-youtube']) +
          social('linkedin', a['social-linkedin']) +
          social('tiktok', a['social-tiktok']) +
          `</tr></table>` +
          `<div>Facebook.com/biomonie&nbsp;|&nbsp;X.com/biomonie</div>` +
          `<div>Instagram.com/biomonie&nbsp;|&nbsp;Youtube.com/biomonie</div>` +
          `<div>Linkedin.com/biomonie</div>` +
        `</td>` +
      `</tr>` +
      `</table>` +
    `</td>` +
  `</tr>` +
  `</table></td>` +
  `<td width=${L.bannerWidth} height=${L.bannerHeight} valign=top bgcolor=#14262F><a href="${bannerLink}"><img src=${u}/${a.banner} width=${L.bannerWidth} height=${L.bannerHeight} border=0 alt="${BANNER_ALT}" style=${is}></a></td>` +
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
  options: {
    assetBaseUrl?: string;
    siteOrigin?: string;
    twoPhones?: boolean;
    scale?: number;
  } = {},
): string {
  const origin =
    options.siteOrigin ||
    (options.assetBaseUrl ? options.assetBaseUrl.replace(/\/email$/, '') : SITE_ORIGIN);
  const twoPhones = options.twoPhones ?? Boolean(sample.secondPhone);
  const html = buildExchangeSignatureHtml({
    siteOrigin: origin,
    twoPhones,
    scale: options.scale,
  });
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
