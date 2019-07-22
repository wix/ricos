/* eslint-disable max-len */
import React from 'react';

const LoaderIcon = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <defs>
      <path
        id="a"
        d="M14.064 5.948l1.518-.507A8 8 0 1 1 10.473.39l-.506 1.519a6.4 6.4 0 1 0 4.097 4.04z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(4 4)">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <use fill="#000" xlinkHref="#a" />
      <path fill="#000" d="M-4-4h24v24H-4z" mask="url(#b)" />
    </g>
  </svg>
);

export default LoaderIcon;
