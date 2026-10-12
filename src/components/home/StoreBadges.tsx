type StoreBadgesProps = {
  className?: string;
};

export default function StoreBadges({ className = '' }: StoreBadgesProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href="https://play.google.com/store"
        target="_blank"
        rel="noopener noreferrer"
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
      <a
        href="https://apps.apple.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="inline-flex h-[46px] min-w-[148px] items-center gap-2.5 rounded-lg border border-white/25 bg-black px-3.5 py-2 text-white no-underline transition-opacity hover:opacity-90"
      >
        <AppleMark />
        <span className="flex flex-col items-start leading-none">
          <span className="text-[9px] font-medium tracking-wide text-white/90">
            Download on the
          </span>
          <span className="mt-0.5 text-[15px] font-semibold tracking-tight">
            App Store
          </span>
        </span>
      </a>
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

function AppleMark() {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="currentColor" aria-hidden="true">
      <path d="M14.7 11.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.8-2-1.6-.2-3.1 1-3.9 1-.8 0-2.1-1-3.5-1C3.7 5.8 1.8 7 0.8 8.8c-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.4 2.8 1.3-.1 1.8-.9 3.4-.9s2 .9 3.4.8c1.5 0 2.4-1.4 3.3-2.8.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.3-5.7ZM12.1 3.8c.7-.9 1.2-2.1 1.1-3.3-1 .1-2.3.7-3 1.6-.7.8-1.3 2.1-1.1 3.3 1.2 0 2.3-.6 3-1.6Z" />
    </svg>
  );
}
