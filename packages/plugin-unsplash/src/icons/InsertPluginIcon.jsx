/* eslint-disable max-len */
import React from 'react';

const InsertPluginIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="21"
    height="19"
    viewBox="0 0 21 19"
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M1 0h13a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zm0 1v9h13V1H1zm3 4a1.001 1.001 0 0 1 0-2 1.001 1.001 0 0 1 0 2z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3 4)">
      <path
        stroke="#000"
        d="M7.503 7.397l2.584-2.114L13.4 9.698c.143.379.143.379-.1.702-.14.082-.14.082-.301.1H3.123l2.474-4.175 1.906 1.072z"
      />
      <use fill="#000" xlinkHref="#a" />
    </g>
  </svg>
);

export default InsertPluginIcon;
