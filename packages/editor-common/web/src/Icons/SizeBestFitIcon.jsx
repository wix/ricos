/* eslint-disable max-len */
import React from 'react';

const SizeBestFitIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="best-fit-path"
        d="M17 3.2v.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h14.6c.11 0 .2.09.2.2zm0 12v.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h14.6c.11 0 .2.09.2.2zM2.2 6h14.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2V6.2c0-.11.09-.2.2-.2zM3 7v5h13V7H3z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="best-fit-mask">
        <use xlinkHref="#best-fit-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#best-fit-path" />
    </g>
  </svg>
);

export default SizeBestFitIcon;
