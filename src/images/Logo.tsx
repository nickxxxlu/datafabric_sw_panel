import * as React from 'react';

function SvgLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.9 71.52" {...props}>
      <defs>
        <linearGradient
          id="logo_svg__logo_svg__linear-gradient"
          x1={42.95}
          y1={16.88}
          x2={81.9}
          y2={16.88}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#f2cc0c" />
          <stop offset={1} stopColor="#ff9830" />
        </linearGradient>
        <style>
          {
            '\r\n      .logo_svg__logo_svg__cls-1{fill:#84aff1}.logo_svg__logo_svg__cls-2{fill:#3865ab}\r\n    '
          }
        </style>
      </defs>
      <g id="logo_svg__logo_svg__Layer_2" data-name="Layer 2">
        <g id="logo_svg__logo_svg__Layer_1-2" data-name="Layer 1">
          <path
            className="logo_svg__logo_svg__cls-1"
            d="M55.46 62.43A2 2 0 0154.07 59l4.72-4.54a2 2 0 012.2-.39l3.65 1.63 3.68-3.64a2 2 0 112.81 2.84l-4.64 4.6a2 2 0 01-2.22.41l-3.67-1.65-3.76 3.61a2 2 0 01-1.38.56z"
          />
          <path
            className="logo_svg__logo_svg__cls-2"
            d="M37 0H2a2 2 0 00-2 2v29.76a2 2 0 002 2h35a2 2 0 002-2V2a2 2 0 00-2-2zM4 29.76V8.84h31v20.92z"
          />
          <path
            d="M79.9 0H45a2 2 0 00-2 2v29.76a2 2 0 002 2h35a2 2 0 002-2V2a2 2 0 00-2.1-2zM47 29.76V8.84h31v20.92z"
            fill="url(#logo_svg__logo_svg__linear-gradient)"
          />
          <path
            className="logo_svg__logo_svg__cls-2"
            d="M37 37.76H2a2 2 0 00-2 2v29.76a2 2 0 002 2h35a2 2 0 002-2V39.76a2 2 0 00-2-2zM4 67.52V46.6h31v20.92zm75.9-29.76H45a2 2 0 00-2 2v29.76a2 2 0 002 2h35a2 2 0 002-2V39.76a2 2 0 00-2.1-2zM47 67.52V46.6h31v20.92z"
          />
          <path
            className="logo_svg__logo_svg__cls-1"
            d="M10.48 56.95h4v5.79h-4zm6.95-3h4v8.79h-4zm7.04-3h4v11.79h-4zm-5-25.15a6.93 6.93 0 116.93-6.92 6.93 6.93 0 01-6.93 6.92zm0-9.85a2.93 2.93 0 102.93 2.93A2.93 2.93 0 0019.47 16z"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgLogo;
