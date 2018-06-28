import React from "react";

const DropdownArrowIcon = props => (
  <svg
    viewBox="0 0 19 19"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    {...props}
  >
    <defs>
      <path
        d="M11.496 9.7l-5.43 5.176a.208.208 0 0 0 0 .304l.48.457a.234.234 0 0 0 .319 0l6.069-5.785a.21.21 0 0 0 0-.304l-6.07-5.785a.234.234 0 0 0-.319 0l-.479.457a.208.208 0 0 0 0 .304l5.43 5.176z"
        id="a"
      />
    </defs>
    <use fillRule="nonzero" transform="rotate(90 9.5 9.7)" xlinkHref="#a" />
  </svg>
);

export default DropdownArrowIcon;
