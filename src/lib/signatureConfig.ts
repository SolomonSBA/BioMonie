import {
  SITE_ORIGIN,
  GOOGLE_PLAY_STORE_URL,
  APP_STORE_URL,
  IS_STAGING,
} from './storeLinks.ts';

export { SITE_ORIGIN, GOOGLE_PLAY_STORE_URL, APP_STORE_URL, IS_STAGING };

/**
 * Signature asset base URL.
 * Automatically derived from SITE_ORIGIN (https://biomonie.com/email in production,
 * or https://biomonie1.onrender.com/email in staging).
 */
export const ASSET_BASE_URL = `${SITE_ORIGIN}/email`;

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
  return typeof window !== 'undefined' && window.location.origin
    ? `${window.location.origin}/email`
    : ASSET_BASE_URL;
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
  return `${assetBaseUrl}/${signatureAssets.images[name]}`;
}
