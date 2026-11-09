import { FaApple } from 'react-icons/fa6';
import {
  GOOGLE_PLAY_STORE_URL,
  APP_STORE_URL,
  isAppStorePlaceholder,
} from '@/lib/storeLinks';

type StoreBadgesProps = {
  className?: string;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  target?: '_blank' | '_self';
  appStoreDisabled?: boolean;
};

export default function StoreBadges({
  className = '',
  googlePlayUrl = GOOGLE_PLAY_STORE_URL,
  appStoreUrl = APP_STORE_URL,
  target = '_blank',
  appStoreDisabled,
}: StoreBadgesProps) {
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
  const isAppleDisabled =
    appStoreDisabled !== undefined
      ? appStoreDisabled
      : isAppStorePlaceholder(appStoreUrl);

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={googlePlayUrl}
        target={target}
        rel={rel}
        aria-label="Get it on Google Play"
        className="inline-flex h-[46px] min-w-[148px] items-center gap-2.5 rounded-lg border border-white/25 bg-black px-3.5 py-2 text-white no-underline transition-opacity hover:opacity-90"
      >
        <GooglePlayMark />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-medium tracking-wide text-white/90">
            GET IT ON
          </span>
          <span className="mt-0.5 text-[15px] font-semibold tracking-tight">
            Google Play
          </span>
        </span>
      </a>

      {isAppleDisabled ? (
        <div
          role="button"
          tabIndex={-1}
          aria-disabled="true"
          aria-label="App Store (Coming soon)"
          title="The iPhone app is coming soon"
          className="inline-flex h-[46px] min-w-[148px] cursor-not-allowed items-center gap-2.5 rounded-lg border border-white/15 bg-black/60 px-3.5 py-2 text-white/60 no-underline select-none"
        >
          <FaApple className="h-6 w-5 shrink-0 text-white/40" aria-hidden="true" />
          <span className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-medium tracking-wide text-white/50">
              Coming soon to
            </span>
            <span className="mt-0.5 text-[15px] font-semibold tracking-tight text-white/70">
              App Store
            </span>
          </span>
        </div>
      ) : (
        <a
          href={appStoreUrl}
          target={target}
          rel={rel}
          aria-label="Download on the App Store"
          className="inline-flex h-[46px] min-w-[148px] items-center gap-2.5 rounded-lg border border-white/25 bg-black px-3.5 py-2 text-white no-underline transition-opacity hover:opacity-90"
        >
          <FaApple className="h-6 w-5 shrink-0 text-white" aria-hidden="true" />
          <span className="flex flex-col items-start leading-none">
            <span className="text-[9px] font-medium tracking-wide text-white/90">
              Download on the
            </span>
            <span className="mt-0.5 text-[15px] font-semibold tracking-tight">
              App Store
            </span>
          </span>
        </a>
      )}
    </div>
  );
}

function GooglePlayMark() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
      <path d="M1.1 1.4C.7 1.8.5 2.4.5 3.1v17.8c0 .7.2 1.3.6 1.7l10.1-10.8L1.1 1.4Z" fill="#4285F4" />
      <path d="m11.2 11.8 2.6-2.8L3.3.7c-.4-.3-.9-.3-1.3-.1l9.2 11.2Z" fill="#EA4335" />
      <path d="m11.2 12.2 2.6 2.8 8.1-4.6c.7-.4.7-1.4 0-1.8l-8.1-4.6-2.6 2.8 5.2 3.6-5.2 1.8Z" fill="#FBBC04" />
      <path d="m11.2 12.2-9.2 11.2c.4.2.9.2 1.3-.1l10.5-6 2.6-2.8-5.2-2.3Z" fill="#34A853" />
    </svg>
  );
}
