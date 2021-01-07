/* eslint-disable max-len */
import React from 'react';

const ArrowRight = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61">
    <g fill="none" fillRule="evenodd">
      <path fill={props.backgroundColor} transform="translate(0 .5)" />
      <path
        stroke={props.foregroundColor}
        strokeWidth="1.5"
        d="M17 21L35 21 35 39"
        transform="translate(0 .5) rotate(45 26 30)"
      />
    </g>
  </svg>
);

export default ArrowRight;
