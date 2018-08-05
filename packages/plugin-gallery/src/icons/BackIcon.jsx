/* eslint-disable max-len */
import React from 'react';

const BackIcon = props => (
  <svg
    width={19}
    height={19}
    viewBox="0 0 19 19"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path
        d="M5.951 9h8.916c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-8.98l2.952 2.952a.2.2 0 0 1 .001.284l-.424.424a.2.2 0 0 1-.284-.001l-3.99-3.99a.202.202 0 0 1 0-.284L8.1 5.425a.2.2 0 0 1 .284.001l.427.428a.2.2 0 0 1 .001.284L5.951 9z"
        id="path-1"
      />
    </defs>
    <g id="Symbols" fillRule="evenodd">
      <g id="01.-Icons-/-General-/-Arrow-/-01.-Default">
        <mask id="mask-2">
          <use xlinkHref="#path-1" />
        </mask>
        <use
          id="Arrow-Back"
          fillRule="nonzero"
          transform="matrix(1 0 0 -1 0 19.085)"
          xlinkHref="#path-1"
        />
      </g>
    </g>
  </svg>
);

export default BackIcon;
