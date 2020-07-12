/* eslint-disable max-len */
import React from 'react';

const Product = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="25"
    height="24"
    viewBox="0 0 25 24"
  >
    <defs>
      <filter
        id="prefix__a"
        width="179.2%"
        height="215.2%"
        x="-39.6%"
        y="-57.6%"
        filterUnits="objectBoundingBox"
      >
        <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
        <feMorphology in="SourceAlpha" radius="1" result="shadowInner" />
        <feOffset in="shadowInner" result="shadowInner" />
        <feComposite
          in="shadowOffsetOuter1"
          in2="shadowInner"
          operator="out"
          result="shadowOffsetOuter1"
        />
        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="2.5" />
        <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
      </filter>
      <path id="prefix__b" d="M0 4.737L18.947 4.737 17.763 17.763 1.184 17.763z" />
    </defs>
    <g fill="none" fillRule="evenodd" transform="translate(3.193 2.526)">
      <use fill="currentColor" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
      <path
        stroke="currentColor"
        strokeLinecap="square"
        d="M18.4 5.237H.548L1.64 17.263h15.666L18.4 5.237z"
      />
      <path
        fillRule="nonzero"
        stroke="currentColor"
        d="M5.921 4.737v-.948C5.921 1.697 7.511 0 9.474 0c1.962 0 3.552 1.697 3.552 3.79v.947"
      />
    </g>
  </svg>
);

export default Product;
