import { IS_STAGING } from './storeLinks';

/**
 * Ensures the robots meta tag is set to the desired content.
 * When on staging (IS_STAGING = true), 'noindex, nofollow' is enforced site-wide.
 * Returns a cleanup function that restores prior state when leaving non-staging pages.
 */
export function setRobotsMeta(content: string = 'noindex, nofollow') {
  if (typeof document === 'undefined') return () => {};

  let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  const created = !meta;
  const prevContent = meta?.getAttribute('content') ?? null;

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);

  return () => {
    // Staging must remain noindex site-wide
    if (IS_STAGING) {
      if (meta) meta.setAttribute('content', 'noindex, nofollow');
      return;
    }

    if (created && meta) {
      meta.remove();
    } else if (meta && prevContent !== null) {
      meta.setAttribute('content', prevContent);
    } else if (meta) {
      meta.remove();
    }
  };
}
