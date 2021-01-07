/* eslint-disable max-len */
import React from 'react';

const ArrowLeft = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61">
    <g fill="none" fillRule="evenodd">
      <path fill={props.backgroundColor} transform="translate(0 .5)" />
      <path
        stroke={props.foregroundColor}
        strokeWidth="1.5"
        d="M24 21L42 21 42 39"
        transform="translate(0 .5) scale(-1 1) rotate(45 0 -49.669)"
      />
    </g>
  </svg>
);

export default ArrowLeft;
