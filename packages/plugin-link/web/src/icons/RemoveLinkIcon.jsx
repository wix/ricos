/* eslint-disable max-len */
import React from 'react';

const RemoveLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14"
    height="15"
    viewBox="0 0 19 19"
  >
    <defs>
      <path
        id="prefix__a"
        d="M7.8 5c.11 0 .2.09.2.2v.807H4.5c-1.38 0-2.5 1.12-2.5 2.5 0 1.326 1.032 2.41 2.336 2.495l.164.005H8v.793c0 .11-.09.2-.2.2H4.5C2.567 12 1 10.433 1 8.5S2.567 5 4.5 5h3.3zm5.7 0C15.433 5 17 6.567 17 8.5S15.433 12 13.5 12h-3.3c-.11 0-.2-.09-.2-.2v-.807h3.5c1.38 0 2.5-1.12 2.5-2.5 0-1.381-1.12-2.5-2.5-2.5H10V5.2c0-.11.09-.2.2-.2h3.3zm-1.7 3c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H6.2c-.11 0-.2-.09-.2-.2v-.6c0-.11.09-.2.2-.2h5.6z"
      />
    </defs>
    <g fill="currentColor" fillRule="evenodd" transform="translate(-2 -1)">
      <mask id="prefix__b" fill="currentColor">
        <use xlinkHref="#prefix__a" />
      </mask>
      <use fill="currentColor" transform="rotate(-45 9 8.5)" xlinkHref="#prefix__a" />
      {/* <g fill="currentColor" mask="url(#prefix__b)">
        <path d="M0 0H17V17H0z" transform="translate(2)" />
      </g> */}
      <path stroke="currentColor" strokeLinecap="square" d="M3 2l11.64 12.534" />
    </g>
  </svg>
);

export default RemoveLinkIcon;
