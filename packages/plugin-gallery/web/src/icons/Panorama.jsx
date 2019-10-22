/* eslint-disable max-len */
import React from 'react';

const Panorama = props => (
  <svg width={19} height={19} {...props}>
    <g stroke="currentColor" fill="none" fillRule="evenodd">
      <rect x={2.5} y={2.5} width={14} height={4} rx={1} />
      <rect x={2.5} y={8.5} width={14} height={2} rx={1} />
      <rect x={2.5} y={12.5} width={14} height={4} rx={1} />
    </g>
  </svg>
);

export default Panorama;
