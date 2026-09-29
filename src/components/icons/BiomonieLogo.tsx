import type { ImgHTMLAttributes } from 'react';

export default function BiomonieLogo({
  'aria-label': ariaLabel = 'Biomonie',
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/logo/biomonie-logo.png"
      alt={ariaLabel}
      width={1440}
      height={494}
      decoding="async"
      {...props}
    />
  );
}
