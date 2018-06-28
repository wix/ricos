import React from "react";

const BackArrowIcon = props => (
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
        d="M5.951 9h8.916c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2h-8.98l2.952 2.952a.2.2 0 0 1 .001.284l-.424.424a.2.2 0 0 1-.284-.001l-3.99-3.99a.202.202 0 0 1 0-.284L8.1 5.425a.2.2 0 0 1 .284.001l.427.428a.2.2 0 0 1 .001.284L5.951 9z"
      />
    </defs>
    <use fill="#333" xlinkHref="#a" />
  </svg>
);

export default BackArrowIcon;
