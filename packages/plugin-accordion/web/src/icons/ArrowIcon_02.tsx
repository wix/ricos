/* eslint-disable max-len */
import React from 'react';

const ArrowIcon_02 = props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="16" viewBox="0 0 8 16" {...props}>
    <defs>
      <filter
        id="3hky8i5iza"
        width="106.7%"
        height="103.2%"
        x="-3.3%"
        y="-1.2%"
        filterUnits="objectBoundingBox"
      >
        <feOffset dy="4" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="4" />
        <feComposite
          in="shadowBlurOuter1"
          in2="SourceAlpha"
          operator="out"
          result="shadowBlurOuter1"
        />
        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
      </filter>
      <path
        id="rx6rxctkbb"
        d="M2 0h416c1.105 0 2 .895 2 2v861c0 1.105-.895 2-2 2H2c-1.105 0-2-.895-2-2V2C0 .895.895 0 2 0z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <g fillRule="nonzero" transform="translate(-159 -227)">
        <use fill="#000" filter="url(#3hky8i5iza)" />
        <path
          fill="#FFF"
          fillRule="evenodd"
          stroke="#FFF"
          strokeOpacity=".25"
          d="M418 .5c.414 0 .79.168 1.06.44.272.27.44.646.44 1.06h0v861c0 .414-.168.79-.44 1.06-.27.272-.646.44-1.06.44h0H2c-.414 0-.79-.168-1.06-.44-.272-.27-.44-.646-.44-1.06h0V2c0-.414.168-.79.44-1.06C1.21.667 1.585.5 2 .5h0z"
        />
      </g>
      <path d="M0 0H90.214V84.892H0z" transform="translate(-159 -227) translate(118 193)" />
      <path
        fill="#000"
        d="M162.999 231L155 237.988 155.876 239 162.999 232.779 170.124 239 171 237.988z"
        transform="translate(-159 -227) matrix(0 -1 -1 0 398 398)"
      />
    </g>
  </svg>
);

export default ArrowIcon_02;
