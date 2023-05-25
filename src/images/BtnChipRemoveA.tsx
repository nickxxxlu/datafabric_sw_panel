import * as React from 'react';

function SvgBtnChipRemoveA(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 24h24V0H0z" />
        <path
          fill="#5AC8FA"
          fillRule="nonzero"
          d="M8.707 7.293L12 10.586l3.293-3.293 1.414 1.414L13.414 12l3.293 3.293-1.414 1.414L12 13.414l-3.293 3.293-1.414-1.414L10.586 12 7.293 8.707z"
        />
      </g>
    </svg>
  );
}

export default SvgBtnChipRemoveA;
