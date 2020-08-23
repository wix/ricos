import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../Icons/ErrorIcon';
import styles from '../../statics/styles/media-item-error-msg.scss';
import { MediaUploadErrorKey } from 'wix-rich-content-common';
import classnames from 'classnames';

const errorMessages = {
  [MediaUploadErrorKey.GENERIC]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.SIZE_LIMIT]: 'UploadFile_Error_Size_Item',
};

export default function MediaItemErrorMsg(props) {
  const { error, t } = props;
  const errorMsg = t?.(errorMessages[error?.key]) || error?.msg;
  const errorIconStyle = classnames(styles.errorIcon, errorMsg && styles.errorIconWithMessage);
  return (
    <div className={styles.error}>
      <ErrorIcon className={errorIconStyle} />
      {errorMsg && <div className={styles.errorMsg}>{errorMsg}</div>}
    </div>
  );
}

MediaItemErrorMsg.propTypes = {
  error: PropTypes.string,
  t: PropTypes.func,
};
