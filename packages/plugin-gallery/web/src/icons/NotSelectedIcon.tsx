/* eslint-disable max-len */
import React from 'react';

const NotSelectedIcon = props => (
  <svg width="16" height="16" viewBox="0 0 16 16" {...props}>
    <defs>
      <circle id="a" cx="8" cy="8" r="8" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <use fill="#FFF" fillOpacity=".4" xlinkHref="#a" />
      <circle cx="8" cy="8" r="7.5" stroke="#FFF" />
    </g>
  </svg>
);

export default NotSelectedIcon;
/* eslint-enable max-len */
