/* eslint-disable max-len */
import React from 'react';

export const LoaderIcon = props => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <defs>
      <path
        id="file-upload-loader-icon-path"
        d="M14.064 5.948l1.518-.507A8 8 0 1 1 10.473.39l-.506 1.519a6.4 6.4 0 1 0 4.097 4.04z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(4 4)">
      <mask id="file-upload-loader-mask" fill="#fff">
        <use xlinkHref="#file-upload-loader-icon-path" />
      </mask>
      <use fill="currentColor" xlinkHref="#file-upload-loader-icon-path" />
      <path fill="currentColor" d="M-4-4h24v24H-4z" mask="url(#file-upload-loader-mask)" />
    </g>
  </svg>
);
