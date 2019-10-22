/* eslint-disable max-len */
import React from 'react';

const SizeOriginalIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="original-size-path"
        d="M1.2 3h16.6c.11 0 .2.09.2.2v12.6a.2.2 0 0 1-.2.2H1.2a.2.2 0 0 1-.2-.2V3.2c0-.11.09-.2.2-.2zM2 4v11h15V4H2zm2 3.16c.24 0 .473-.02.7-.06.227-.04.432-.107.615-.2a1.57 1.57 0 0 0 .47-.36c.13-.147.215-.327.255-.54h.93v7H6V8H4v-.84zM9 8h1v1H9V8zm0 3h1v1H9v-1zm2-3.84c.24 0 .473-.02.7-.06.227-.04.432-.107.615-.2a1.57 1.57 0 0 0 .47-.36c.13-.147.215-.327.255-.54h.93v7H13V8h-2v-.84z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="original-size-mask">
        <use xlinkHref="#original-size-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#original-size-path" />
    </g>
  </svg>
);

export default SizeOriginalIcon;
