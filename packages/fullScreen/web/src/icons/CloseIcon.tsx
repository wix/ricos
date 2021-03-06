/* eslint-disable max-len */
import React from 'react';

const CloseIcon = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60">
    <g fill="none" fillRule="evenodd">
      <path fill={props.backgroundColor} d="M0 0H60V60H0z" />
      <path
        fill={props.foregroundColor}
        d="M42.188 17l.812.813L30.812 30 43 42.188l-.813.812L30 30.812 17.812 43 17 42.187 29.187 30 17 17.812l.813-.812L30 29.187 42.188 17z"
      />
    </g>
  </svg>
);

export default CloseIcon;
