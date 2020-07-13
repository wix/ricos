/* eslint-disable max-len */
import React from 'react';

const decreaseIndentPluginIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="19"
    height="19"
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="decrease-indent"
        d="M3.973 3l1.89 2 .002.006.098.157.037.191-.037.191-.098.157-.003.005-1.889 2L3.306 7l1.082-1.146H0v-1h4.388L3.306 3.707 3.973 3z"
      />
    </defs>
    <g fillRule="evenodd" transform="translate(2 4)">
      <path d="M3.2 0h10.6c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H3.2C3.09 1 3 .91 3 .8V.2c0-.11.09-.2.2-.2zM8.2 5h5.6c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H8.2c-.11 0-.2-.09-.2-.2v-.6c0-.11.09-.2.2-.2zM3.2 10h10.6c.11 0 .2.09.2.2v.6c0 .11-.09.2-.2.2H3.2c-.11 0-.2-.09-.2-.2v-.6c0-.11.09-.2.2-.2z" />
      <use transform="rotate(-180 3 5.354)" xlinkHref="#decrease-indent" />
    </g>
  </svg>
);

export default decreaseIndentPluginIcon;
