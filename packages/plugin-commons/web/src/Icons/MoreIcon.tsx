/* eslint-disable max-len */
import React from 'react';

const MoreIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="more_path"
        d="M9.444 6A1.5 1.5 0 1 1 11 4.5 1.528 1.528 0 0 1 9.444 6zm0 5A1.5 1.5 0 1 1 11 9.5 1.528 1.528 0 0 1 9.444 11zm0 5A1.5 1.5 0 1 1 11 14.5 1.528 1.528 0 0 1 9.444 16z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="more_mask" fill="#fff">
        <use xlinkHref="#more_path" />
      </mask>
      <use fill="#333" fillRule="nonzero" xlinkHref="#more_path" />
    </g>
  </svg>
);

export default MoreIcon;
