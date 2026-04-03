import type { SVGProps } from 'react';

export default function BiomonieLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="60 0 1300 450"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text id="text-bi" x="350" y="240" textAnchor="end" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="230" fill="white">
        Bi
      </text>

      <circle id="lemon-o" cx="405" cy="205" r="48" fill="none" stroke="#E2FF02" strokeWidth="18" />

      <text id="text-monie" x="460" y="240" textAnchor="start" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="230" fill="white">
        monie
      </text>

      <g id="connecting-dots" fill="#E2FF02">
        <circle cx="405" cy="275" r="6" />
        <circle cx="405" cy="295" r="6" />
      </g>

      <circle id="stick-head" cx="405" cy="335" r="22" fill="#E2FF02" stroke="#E2FF02" strokeWidth="4" />

      <line id="stick-body" x1="405" y1="357" x2="405" y2="400" stroke="#E2FF02" strokeWidth="12" strokeLinecap="round" />

      <line id="stick-arm-left" x1="405" y1="375" x2="375" y2="375" stroke="#E2FF02" strokeWidth="12" strokeLinecap="round" />
      <line id="stick-arm-right" x1="405" y1="375" x2="435" y2="375" stroke="#E2FF02" strokeWidth="12" strokeLinecap="round" />

      <line id="stick-leg-left" x1="405" y1="400" x2="385" y2="430" stroke="#E2FF02" strokeWidth="12" strokeLinecap="round" />
      <line id="stick-leg-right" x1="405" y1="400" x2="425" y2="430" stroke="#E2FF02" strokeWidth="12" strokeLinecap="round" />
    </svg>
  );
}
