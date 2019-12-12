/* eslint-disable max-len */
import React from 'react';

const TrashIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={19}
    height={19}
    viewBox="0 0 19 19"
    {...props}
  >
    <defs>
      <path
        id="trash-icon-path"
        d="M15 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5h-.8a.2.2 0 0 1-.2-.2v-.6c0-.11.09-.2.2-.2h12.6c.11 0 .2.09.2.2v.6a.2.2 0 0 1-.2.2H15zm-1 0H5v10.8c0 .11.09.2.2.2h8.6a.2.2 0 0 0 .2-.2V5zM7.2 7h.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2zm4 0h.6c.11 0 .2.09.2.2v6.6a.2.2 0 0 1-.2.2h-.6a.2.2 0 0 1-.2-.2V7.2c0-.11.09-.2.2-.2zM6.857 3v1H6V3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1h-.857V3H6.857z"
      />
    </defs>
    <g fillRule="evenodd">
      <mask id="trash-icon-mask">
        <use xlinkHref="#trash-icon-path" />
      </mask>
      <use xlinkHref="#trash-icon-path" />
    </g>
  </svg>
);

export default TrashIcon;
