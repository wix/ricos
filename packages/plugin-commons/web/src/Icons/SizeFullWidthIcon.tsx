/* eslint-disable max-len */
import React from 'react';

const SizeFullWidthIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="full-width-path"
        d="M17 3.2v.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h14.6c.11 0 .2.09.2.2zm0 12v.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h14.6c.11 0 .2.09.2.2zM.2 6h18.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2H.2a.2.2 0 0 1-.2-.2V6.2c0-.11.09-.2.2-.2zM1 7v5h17V7H1z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="full-width-mask">
        <use xlinkHref="#full-width-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#full-width-path" />
      <g mask="url(#full-width-mask)">
        <path d="M0 1h19v17H0z" />
      </g>
    </g>
  </svg>
);

export default SizeFullWidthIcon;
