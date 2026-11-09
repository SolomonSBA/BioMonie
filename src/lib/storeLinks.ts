/**
 * ============================================================================
 * BIOMONIE STORE LINKS & SITE ORIGIN (SINGLE SOURCE OF TRUTH)
 * ============================================================================
 * All store badges, download redirects, signature configurations, and email
 * templates reference these settings.
 */

/**
 * Normalizes an origin URL string by removing trailing slashes and whitespace.
 * Defaults to https://biomonie.com if empty or invalid.
 */
export function normalizeOrigin(origin?: string): string {
  if (!origin || typeof origin !== 'string') return 'https://biomonie.com';
  const trimmed = origin.trim().replace(/\/+$/, '');
  return trimmed || 'https://biomonie.com';
}

/**
 * Resolves the canonical site origin across all runtime environments:
 * 1. Node.js (scripts, tests, SSR): process.env.VITE_SITE_ORIGIN
 * 2. Vite client build: import.meta.env.VITE_SITE_ORIGIN
 * 3. Browser runtime fallback: window.location.origin if hosted on onrender.com
 * 4. Production default: https://biomonie.com
 */
export function resolveSiteOrigin(): string {
  // 1. Process environment (Node.js runtime / scripts / tests)
  if (typeof process !== 'undefined' && process.env?.VITE_SITE_ORIGIN) {
    return normalizeOrigin(process.env.VITE_SITE_ORIGIN);
  }

  // 2. Vite build-time environment variable (client bundle)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_ORIGIN) {
      return normalizeOrigin(import.meta.env.VITE_SITE_ORIGIN);
    }
  } catch {
    // Ignore in non-Vite environments
  }

  // 3. Browser runtime origin fallback (e.g. when loaded on onrender.com)
  if (typeof window !== 'undefined' && window.location?.origin) {
    if (window.location.hostname.includes('onrender.com')) {
      return normalizeOrigin(window.location.origin);
    }
  }

  return 'https://biomonie.com';
}

export const SITE_ORIGIN = resolveSiteOrigin();

/**
 * True when the site origin points to the Render staging environment.
 */
export const IS_STAGING =
  SITE_ORIGIN.includes('onrender.com') ||
  (typeof window !== 'undefined' && Boolean(window.location?.hostname?.includes('onrender.com')));

/**
 * 1. Google Play Store URL
 * Currently using the live Biomonie Purse package ID:
 * https://play.google.com/store/apps/details?id=com.biomonie.purse
 */
export const GOOGLE_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.biomonie.purse';

/**
 * 2. Apple App Store URL
 * PLACEHOLDER: Replace this placeholder with the official App Store app URL
 * once the iOS app is published (e.g. 'https://apps.apple.com/app/biomonie/id1234567890').
 */
export const APP_STORE_URL = 'https://apps.apple.com'; // PLACEHOLDER: replace with official App Store app URL

/**
 * Checks whether an App Store URL is the unreleased placeholder (https://apps.apple.com).
 */
export function isAppStorePlaceholder(url: string = APP_STORE_URL): boolean {
  if (!url || typeof url !== 'string') return true;
  const cleaned = url.trim().replace(/\/+$/, '').toLowerCase();
  return cleaned === 'https://apps.apple.com' || cleaned === 'http://apps.apple.com';
}

/**
 * Production URL encoded in the desktop QR code on /download.
 * Derived directly from SITE_ORIGIN so staging points to staging /download.
 */
export const QR_DOWNLOAD_URL = `${SITE_ORIGIN}/download?utm_source=website&utm_medium=desktop_qr&utm_campaign=download_page`;

/**
 * Default campaign tracking parameters for links originating from the email signature banner
 */
export const DEFAULT_UTM_PARAMS: Record<string, string> = {
  utm_source: 'email_signature',
  utm_medium: 'email',
  utm_campaign: 'signature_banner',
};

export type DevicePlatform = 'ios' | 'android' | 'desktop';

/**
 * Detect device platform from User-Agent string.
 * - iPhone, iPad, iPod -> 'ios'
 * - Android -> 'android'
 * - Everything else (desktop browsers, unknown agents) -> 'desktop'
 */
export function detectPlatform(userAgent: string): DevicePlatform {
  if (!userAgent || typeof userAgent !== 'string') {
    return 'desktop';
  }

  // iOS check: iPhone, iPad, iPod
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'ios';
  }

  // Android check
  if (/Android/i.test(userAgent)) {
    return 'android';
  }

  return 'desktop';
}

/**
 * Build store destination URL with campaign tracking parameters (UTM).
 * - For Google Play: sets the 'referrer' parameter with URL-encoded UTM parameters.
 * - For App Store: passes direct UTM query parameters.
 */
export function buildStoreUrl(
  baseStoreUrl: string,
  utmParams: Record<string, string> = DEFAULT_UTM_PARAMS,
  isGooglePlay = false,
): string {
  try {
    const url = new URL(baseStoreUrl);

    const searchEntries = Object.entries(utmParams).filter(([key]) =>
      key.startsWith('utm_'),
    );

    if (searchEntries.length === 0) {
      return baseStoreUrl;
    }

    if (isGooglePlay) {
      // Google Play accepts campaign tracking in the 'referrer' parameter:
      // referrer=utm_source%3D...%26utm_medium%3D...
      const referrerQuery = searchEntries
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
      url.searchParams.set('referrer', referrerQuery);
    } else {
      // Direct UTM query parameters for App Store / general store links
      for (const [key, value] of searchEntries) {
        url.searchParams.set(key, value);
      }
    }

    return url.toString();
  } catch {
    return baseStoreUrl;
  }
}
