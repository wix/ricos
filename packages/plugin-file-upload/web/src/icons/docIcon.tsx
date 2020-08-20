/* eslint-disable max-len */
import React from 'react';

const docIcon = ({ styles, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42" {...rest}>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M0 0H4823V3877H0z" transform="translate(-1446 -3614)" />
      <g>
        <g
          fill="currentColor"
          className={styles.file_upload_icon_frame}
          strokeLinejoin="bevel"
          strokeWidth="1.003"
        >
          <path
            d="M32.5 41.5L0.5 41.5 0.5 0.5 20 0.5 32.5 13.3z"
            transform="translate(-1446 -3614) translate(1446 3614) translate(3)"
          />
          <path
            fillRule="nonzero"
            d="M19.2 13.4L32.1 13.3 31.5 12.7 20.2 1.1 19.6 0.5z"
            transform="translate(-1446 -3614) translate(1446 3614) translate(3)"
          />
        </g>
        <path d="M0 0H40V42H0z" transform="translate(-1446 -3614) translate(1446 3614)" />
        <path
          className={styles.file_upload_icon_background}
          fillRule="nonzero"
          d="M3.1 0.6L4.6 6.8 4.9 8.6 5.2 6.9 6.5 0.6 8.9 0.6 10.2 6.8 10.5 8.6 10.9 6.9 12.3 0.6 14.7 0.6 11.6 11.5 9.4 11.5 8 5.1 7.7 3 7.3 5.1 5.9 11.5 3.8 11.5 0.7 0.6z"
          transform="translate(-1446 -3614) translate(1446 3614) translate(12 19)"
        />
      </g>
    </g>
  </svg>
);

export default docIcon;
