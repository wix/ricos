/* eslint-disable max-len */
import React from 'react';

const ItalicIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="italic-icon-path"
        d="M7.834 13l1.234-7H7.2a.2.2 0 0 1-.2-.2V4.2c0-.11.09-.2.2-.2h5.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2h-1.701l-1.234 7H11.8c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H6.2a.2.2 0 0 1-.2-.2v-1.6c0-.11.09-.2.2-.2h1.634z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="italic-icon-mask">
        <use xlinkHref="#italic-icon-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#italic-icon-path" />
    </g>
  </svg>
);

export default ItalicIcon;
