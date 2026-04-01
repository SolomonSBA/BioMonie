import type { SVGProps } from 'react';

export default function BiomonieLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="680"
      height="200"
      viewBox="0 0 680 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        id="text-bi"
        x="170"
        y="115"
        textAnchor="end"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="72"
        fill="white"
      >
        Bi
      </text>

      <circle id="lemon-o" cx="192" cy="100" r="20" fill="none" stroke="#E2FF02" strokeWidth="8" />

      <text
        id="text-monie"
        x="214"
        y="115"
        textAnchor="start"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        fontSize="72"
        fill="white"
      >
        monie
      </text>

      <g id="connecting-dots" fill="#E2FF02">
        <circle cx="192" cy="128" r="2.5" />
        <circle cx="192" cy="136" r="2.5" />
      </g>

      <circle id="stick-head" cx="192" cy="154" r="10" fill="#E2FF02" stroke="#E2FF02" strokeWidth="2" />

      <line id="stick-body" x1="192" y1="164" x2="192" y2="182" stroke="#E2FF02" strokeWidth="5" strokeLinecap="round" />

      <line id="stick-arm-left" x1="192" y1="170" x2="180" y2="170" stroke="#E2FF02" strokeWidth="5" strokeLinecap="round" />
      <line id="stick-arm-right" x1="192" y1="170" x2="204" y2="170" stroke="#E2FF02" strokeWidth="5" strokeLinecap="round" />

      <line id="stick-leg-left" x1="192" y1="182" x2="184" y2="194" stroke="#E2FF02" strokeWidth="5" strokeLinecap="round" />
      <line id="stick-leg-right" x1="192" y1="182" x2="200" y2="194" stroke="#E2FF02" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
