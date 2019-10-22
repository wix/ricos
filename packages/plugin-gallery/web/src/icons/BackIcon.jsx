/* eslint-disable max-len */
import React from 'react';

const BackIcon = props => (
  <svg width="19" height="19" viewBox="0 0 19 19" {...props}>
    <defs>
      <path
        id="back-arrow-path"
        d="M5.967 9h8.916c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-8.98l2.952 2.952a.2.2 0 0 1 .001.284l-.424.424a.2.2 0 0 1-.284-.001l-3.99-3.99a.202.202 0 0 1-.001-.284l3.96-3.96a.2.2 0 0 1 .284.001l.427.428a.2.2 0 0 1 .001.284L5.967 9z"
      />
    </defs>
    <g id="back-arrow" fillRule="evenodd">
      <use fillRule="nonzero" transform="matrix(-1 0 0 1 19.166 0)" xlinkHref="#back-arrow-path" />
    </g>
  </svg>
);

export default BackIcon;
/* eslint-enable max-len */
