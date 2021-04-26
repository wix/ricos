/* eslint-disable max-len */
import React from 'react';

const FabIcon = props => (
  <svg width={60} height={63} viewBox="0 0 60 63" {...props}>
    <g fill="none" fillRule="evenodd" transform="translate(10)">
      <circle cx={20} cy={20} r={20} fill="var(--ricos-action-color-fallback, #0261ff)" />
      <path fill="#FFF" d="M21 19h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
    </g>
  </svg>
);

export default FabIcon;
