/* eslint-disable max-len */
import React from 'react';

const InsertPluginIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="11"
    height="14"
    viewBox="0 0 11 14"
    {...props}
  >
    <defs>
      <path id="b" d="M0 0h320v784H0z" />
      <filter id="a" width="100.3%" height="100.3%" x="-.2%" y="-.1%" filterUnits="objectBoundingBox">
        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
      </filter>
      <path id="d" d="M0 0h320v784H0z" />
      <filter id="c" width="100.3%" height="100.3%" x="-.2%" y="-.1%" filterUnits="objectBoundingBox">
        <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feColorMatrix in="shadowOffsetOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
      </filter>
    </defs>
    <g fill="none" fill-rule="evenodd">
      <path fill="#F2F2F2" d="M-250-288H70v570h-320z" />
      <g transform="translate(-250 -288)">
        <use fill="#000" filter="url(#a)" xlinkHref="#b"/>
            <use fill="#FFF" xlinkHref="#b"/>
        </g>
      <g fill="#000" opacity=".3" transform="translate(-250 -288)">
        <use filter="url(#c)" xlinkHref="#d"/>
            <use xlinkHref="#d"/>
        </g>
      <g transform="translate(-232 -144)">
        <rect width="284" height="210" fill="#FFF" rx="3" />
      </g>
      <path stroke="#333" d="M.5.5v13h10V5.499H5.49V.5H.5z" />
      <path fill="#333" d="M5 1h1v1H5zM6 0h1v1H6zM9 5h1v1H9zM9 3h1v1H9zM10 4h1v1h-1zM5 5h1v1H5zM7 1h1v1H7zM8 2h1v1H8z" />
      <path stroke="#333" d="M.465 10.594L4.67 8 8.09 9.947l2.472-1.604" />
    </g>
  </svg>

);

export default InsertPluginIcon;
