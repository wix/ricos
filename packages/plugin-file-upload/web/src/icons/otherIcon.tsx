/* eslint-disable max-len */
import React from 'react';

const otherIcon = ({ styles, ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="42" viewBox="0 0 40 42" {...rest}>
    <g fill="none" fillRule="evenodd">
      <path
        className={styles.file_upload_icon_background}
        d="M0 0H4823V3877H0z"
        transform="translate(-1717 -3612)"
      />
      <path d="M1717 3612H1757V3654H1717z" transform="translate(-1717 -3612)" />
      <g>
        <path
          className={styles.file_upload_icon_background}
          d="M13.6 0.9L7.9 8.3 4.9 4.7 0.5 9.9 6.7 9.9 9.2 9.9 20.5 9.9z"
          transform="translate(-1717 -3612) translate(1720 3613) translate(6 21)"
        />
        <path
          className={styles.file_upload_icon_background}
          fillRule="nonzero"
          d="M3.3 11.5L0.6 11.5 4.2 5.9 0.8 0.6 3.5 0.6 5.5 4.1 7.5 0.6 10.2 0.6 6.8 5.9 10.4 11.5 7.6 11.5 5.5 7.8z"
          transform="translate(-1717 -3612) translate(1720 3613) translate(11 19)"
        />
        <path
          className={styles.file_upload_icon_background}
          fillRule="nonzero"
          d="M18.4 23.2c0-.6-.2-1-.5-1.2-.3-.2-.7-.4-1.3-.4h-2.1v3.2h2.1c.5 0 1-.1 1.3-.4.4-.3.5-.7.5-1.2zm2.3-.1c0 1.3-.3 2.2-1 2.8-.7.5-1.6.8-2.8.8h-2.3v4h-2.3v-11h4.8c1.1 0 2 .3 2.6.9.7.5 1 1.4 1 2.5z"
          transform="translate(-1717 -3612) translate(1720 3613)"
        />
        <path
          className={styles.file_upload_icon_background}
          d="M10.3 5.8L0.2 10.9 0.2 0.7z"
          transform="translate(-1717 -3612) translate(1720 3613) translate(12 19)"
        />
        <g className={styles.file_upload_icon_frame} strokeLinejoin="bevel" strokeWidth="1.003">
          <path
            fill="currentColor"
            d="M32.5 41.5L0.5 41.5 0.5 0.5 20 0.5 32.5 13.4z"
            transform="translate(-1717 -3612) translate(1720 3613)"
          />
          <path
            d="M19 13.4L31.9 13.4 31.3 12.7 20 1.2 19.4 0.5z"
            transform="translate(-1717 -3612) translate(1720 3613)"
          />
        </g>
        <g className={styles.file_upload_icon_background}>
          <path
            className={styles.file_upload_icon_background}
            d="M.5 4H10.5V5H.5zM.5 0H10.5V1H.5zM5.5 12L10.5 8 .5 8z"
            transform="translate(-1717 -3612) translate(1720 3613) translate(10.963 19.09)"
          />
        </g>
      </g>
    </g>
  </svg>
);

export default otherIcon;
