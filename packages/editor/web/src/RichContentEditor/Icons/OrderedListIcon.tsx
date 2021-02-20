/* eslint-disable max-len */
import React from 'react';

const OrderedListIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="ordered-list-icon-path"
        d="M8.2 4h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm0 5h7.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H8.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm-5 1H5v-1h.8c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H3.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zm.8-2h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h2.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H5v1h-.8a.2.2 0 0 1-.2-.2V13zm-.8-3H4v-.8c0-.11.09-.2.2-.2H5v1h.8c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H3.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2zM3 7.8v-.6c0-.11.09-.2.2-.2h2.6c.11 0 .2.09.2.2v1.6a.2.2 0 0 1-.2.2H5V8H3.2a.2.2 0 0 1-.2-.2zM4 3h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h1.6c.11 0 .2.09.2.2v3.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V3z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="ordered-list-icon-mask">
        <use xlinkHref="#ordered-list-icon-path" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#ordered-list-icon-path" />
    </g>
  </svg>
);

export default OrderedListIcon;
