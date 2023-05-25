import * as React from 'react';

function SvgBtnDropdownGroupA(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 24h24V0H0z" />
        <path
          fill="#5AC8FA"
          fillRule="nonzero"
          d="M13 9v2h6v4h3v6h-8v-6h3v-2H7.013v2H10v6H2v-6h3.012v-4H11V9H8V3h8v6h-3zm1-4h-4v2h4V5zm6 12h-4v2h4v-2zM8 17H4v2h4v-2z"
        />
      </g>
    </svg>
  );
}

export default SvgBtnDropdownGroupA;
