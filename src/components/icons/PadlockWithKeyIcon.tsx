import type { SVGProps } from "react";

/**
 * Single combined padlock + key mark (Lucide has no one glyph for this).
 * Paths derived from Lucide Lock + Key (ISC), composed in one viewBox.
 */
export function PadlockWithKeyIcon({ className, strokeWidth = 2, ...props }: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <g>
        <rect width="18" height="11" x="2" y="11" rx="2" ry="2" />
        <path d="M6 11V7a5 5 0 0 1 10 0v4" />
      </g>
      <g transform="translate(12.75 0.25) scale(0.8)">
        <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
        <path d="m21 2-9.6 9.6" />
        <circle cx="7.5" cy="15.5" r="5.5" />
      </g>
    </svg>
  );
}
