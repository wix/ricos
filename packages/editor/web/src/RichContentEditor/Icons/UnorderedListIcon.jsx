/* eslint-disable max-len */
import React from 'react';

const UnorderedListIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="unordered-list-icon-path"
        d="M4.2 4h.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm3 0h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H7.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm-3 0h.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0-5h.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="unordered-list-icon-mask">
        <use xlinkHref="#unordered-list-icon-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#unordered-list-icon-path" />
    </g>
  </svg>
);

export default UnorderedListIcon;
