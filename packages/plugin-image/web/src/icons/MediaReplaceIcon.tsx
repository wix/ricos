/* eslint-disable max-len */
import React from 'react';

const MediaReplaceIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="replace-path"
        d="M3 7.8V3.2c0-.11.09-.2.2-.2h.6c.11 0 .2.09.2.2v2.592A6.607 6.607 0 0 1 9.412 3C13.05 3 16 5.91 16 9.5c0 .168-.006.335-.02.5h-1.016a5.51 5.51 0 0 0 .022-.5c0-3.038-2.495-5.5-5.574-5.5a5.583 5.583 0 0 0-4.967 3H7.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H3.2a.2.2 0 0 1-.2-.2zm13 3.4v4.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-2.592A6.607 6.607 0 0 1 9.588 16C5.95 16 3 13.09 3 9.5c0-.168.006-.335.02-.5h1.016a5.496 5.496 0 0 0-.022.5c0 3.038 2.495 5.5 5.574 5.5a5.583 5.583 0 0 0 4.967-3H11.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h4.6c.11 0 .2.09.2.2z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="replace-mask">
        <use xlinkHref="#replace-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#replace-path" />
    </g>
  </svg>
);

export default MediaReplaceIcon;
