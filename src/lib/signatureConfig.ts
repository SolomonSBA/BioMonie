import {
  SITE_ORIGIN,
  GOOGLE_PLAY_STORE_URL,
  APP_STORE_URL,
  IS_STAGING,
} from './storeLinks.ts';

export { SITE_ORIGIN, GOOGLE_PLAY_STORE_URL, APP_STORE_URL, IS_STAGING };

/**
 * Signature asset base URL.
 * Defaults to SITE_ORIGIN + "/email" (https://biomonie.com/email in production,
 * or https://biomonie1.onrender.com/email in staging).
 *
 * Set VITE_ASSET_BASE_URL (e.g. https://cdn.biomonie.com/email) to serve every
 * signature image from a CDN. Links (banner, website) always stay on SITE_ORIGIN.
 */
export function resolveAssetBaseUrl(): string {
  // 1. Process environment (Node.js runtime / scripts / tests)
  if (typeof process !== 'undefined' && process.env?.VITE_ASSET_BASE_URL) {
    return normalizeAssetBaseUrl(process.env.VITE_ASSET_BASE_URL);
  }

  // 2. Vite build-time environment variable (client bundle)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_ASSET_BASE_URL) {
      return normalizeAssetBaseUrl(import.meta.env.VITE_ASSET_BASE_URL);
    }
  } catch {
    // Ignore in non-Vite environments
  }

  return `${SITE_ORIGIN}/email`;
}

/** Trims whitespace and trailing slashes from a configured asset base URL. */
export function normalizeAssetBaseUrl(assetBaseUrl?: string): string {
  if (!assetBaseUrl || typeof assetBaseUrl !== 'string') return `${SITE_ORIGIN}/email`;
  const trimmed = assetBaseUrl.trim().replace(/\/+$/, '');
  return trimmed || `${SITE_ORIGIN}/email`;
}

export const ASSET_BASE_URL = resolveAssetBaseUrl();

/**
 * Signature scale factor.
 *
 * The approved design is 600px wide at scale 1. Every dimension (widths,
 * heights, icons, spacing, fonts) is derived from that base by multiplication
 * and rounded to whole pixels, because Word/Outlook cannot render fractions.
 * Change this single constant and regenerate to resize the whole signature.
 */
export const SIGNATURE_SCALE = 1.25;

/** Rounds a base dimension to whole pixels for Word/Outlook. */
export function scaled(base: number, scale = SIGNATURE_SCALE): number {
  return Math.round(base * scale);
}

/**
 * Rounds a base font size to whole pixels, never below 9px (the smallest size
 * that stays legible in Outlook). Fonts round down so 10px -> 12px at 1.25x,
 * which keeps the approved 16/12/11/11/10/10 type ramp.
 */
export function scaledFont(base: number, scale = SIGNATURE_SCALE): number {
  return Math.max(9, Math.floor(base * scale + 1e-9));
}

/**
 * Signature asset version / cache-busting folder.
 *
 * Every image URL is {ASSET_BASE_URL}/{ASSET_VERSION}/{file}. Bumping this
 * constant creates a brand-new folder, so the 30-day Cache-Control on /email
 * stays safe and previously delivered signatures keep working from the old
 * folder. The legacy files directly under public/email are never modified.
 */
export const ASSET_VERSION = 'v4';

/** Returns the versioned image base, e.g. https://biomonie.com/email/v2 */
export function versionedAssetBaseUrl(assetBaseUrl = ASSET_BASE_URL) {
  return `${normalizeAssetBaseUrl(assetBaseUrl)}/${ASSET_VERSION}`;
}

/**
 * BANNER DESTINATION LINK
 * When clicked in email clients, the banner directs here.
 * The /download landing page detects device OS (iOS vs Android) and redirects
 * to the appropriate app store with campaign UTM tracking.
 * All store URLs and the site origin live in one place: src/lib/storeLinks.ts.
 */
export const BANNER_LINK_URL = `${SITE_ORIGIN}/download?utm_source=email_signature&utm_medium=email&utm_campaign=signature_banner`;

/**
 * Hero slides to include in the email signature banner.gif.
 * Frame 1 is the strongest static fallback for Outlook desktop (which shows only frame 1).
 * Matches the approved Figma design: 'hard' ("YOU work hard for your money"), 'access', 'show', 'netgain', 'safety2', 'encryptkey'.
 */
export const BANNER_SLIDE_IDS = [
  'hard',
  'access',
  'show',
  'netgain',
  'safety2',
  'encryptkey',
] as const;

export function getPreviewAssetBaseUrl() {
  return ASSET_BASE_URL;
}

export const signatureAssets = {
  images: {
    logoMark: 'logo-mark.png',
    logoWordmark: 'logo-wordmark.png',
    mail: 'icon-mail.png',
    phone: 'icon-phone.png',
    website: 'icon-web.png',
    'social-facebook': 'social-facebook.png',
    'social-x': 'social-x.png',
    'social-instagram': 'social-instagram.png',
    'social-youtube': 'social-youtube.png',
    'social-linkedin': 'social-linkedin.png',
    'social-tiktok': 'social-tiktok.png',
    banner: 'banner.gif',
  },
} as const;

export const signatureSocials = {
  facebook: { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61572337227483' },
  x: { label: 'X', href: 'https://x.com/Biomonie__' },
  instagram: { label: 'Instagram', href: 'https://www.instagram.com/biomonie/' },
  youtube: { label: 'YouTube', href: 'https://www.youtube.com/@Biomonie' },
  linkedin: { label: 'LinkedIn', href: 'https://www.linkedin.com/company/biomonie' },
  tiktok: { label: 'TikTok', href: 'https://www.tiktok.com/@biomonie' },
} as const;

export type SignatureSocial = keyof typeof signatureSocials;

export function signatureImage(
  name: keyof typeof signatureAssets.images,
  assetBaseUrl = ASSET_BASE_URL,
) {
  return `${versionedAssetBaseUrl(assetBaseUrl)}/${signatureAssets.images[name]}`;
}
