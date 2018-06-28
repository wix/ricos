import React from "react";

const SizeSmallCenterIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 19 19"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M17 3.2v.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h14.6c.11 0 .2.09.2.2zm0 12v.6a.2.2 0 0 1-.2.2H2.2a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h14.6c.11 0 .2.09.2.2zM4.2 6h10.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2H4.2a.2.2 0 0 1-.2-.2V6.2c0-.11.09-.2.2-.2zM5 7v5h9V7H5z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="b">
        <use xlinkHref="#a" />
      </mask>
      <use fillRule="nonzero" xlinkHref="#a" />
    </g>
  </svg>
);

export default SizeSmallCenterIcon;
