/* eslint-disable max-len */
import React from 'react';

const TitleIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="title-icon-path"
        d="M15 10v4.8a.2.2 0 0 1-.2.2h-1.6a.2.2 0 0 1-.2-.2V10h-1.8a.2.2 0 0 1-.2-.2V8.2c0-.11.09-.2.2-.2h5.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H15zM8 6v8.8a.2.2 0 0 1-.2.2H6.2a.2.2 0 0 1-.2-.2V6H2.2a.2.2 0 0 1-.2-.2V4.2c0-.11.09-.2.2-.2h9.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H8z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="title-icon-mask">
        <use xlinkHref="#title-icon-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#title-icon-path" />
    </g>
  </svg>
);

export default TitleIcon;
