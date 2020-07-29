import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../Icons/ErrorIcon';
import styles from '../../statics/styles/error-msg-with-icon.scss';
import { MediaUploadErrorKey } from 'wix-rich-content-common';

export default function ErrorMsgWithIcon(props) {
  const getErrorMessage = error => {
    switch (error?.key) {
      case MediaUploadErrorKey.GENERIC:
        break;
      case MediaUploadErrorKey.SIZE_LIMIT:
        break;
      case MediaUploadErrorKey.QUOTA_STORAGE_VISITOR:
        break;
      case MediaUploadErrorKey.QUOTA_STORAGE_OWNER:
        break;
      case MediaUploadErrorKey.QUOTA_VIDEO_VISITOR:
        break;
      case MediaUploadErrorKey.QUOTA_VIDEO_OWNER:
        break;
      default:
        return error?.msg;
    }
  };

  return (
    <div className={styles.error}>
      <ErrorIcon className={styles.errorIcon} />
      <div className={styles.errorMsg}>{getErrorMessage(props.error)}</div>
    </div>
  );
}

ErrorMsgWithIcon.propTypes = {
  error: PropTypes.string,
};
