/* eslint-disable max-len */
import React from 'react';

const ReadyIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <filter
        id="file_upload_ready_icon_a"
        width="271.4%"
        height="340%"
        x="-85.7%"
        y="-85.7%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="4" />
        <feColorMatrix
          in="shadowBlurOuter1"
          result="shadowMatrixOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feOffset in="SourceAlpha" result="shadowOffsetOuter2" />
        <feGaussianBlur in="shadowOffsetOuter2" result="shadowBlurOuter2" stdDeviation="2" />
        <feColorMatrix
          in="shadowBlurOuter2"
          result="shadowMatrixOuter2"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="shadowMatrixOuter2" />
        </feMerge>
      </filter>
      <path
        id="file_upload_ready_icon_b"
        d="M16.346 0.167L17.167 0.963 6.97 11.833 0.833 6.925 1.534 6.019 6.861 10.279z"
      />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3 6)">
      <use
        fill="#000"
        filter="url(#file_upload_ready_icon_a)"
        xlinkHref="#file_upload_ready_icon_b"
      />
      <use fill="#008250" xlinkHref="#file_upload_ready_icon_b" />
    </g>
  </svg>
);

export default ReadyIcon;
