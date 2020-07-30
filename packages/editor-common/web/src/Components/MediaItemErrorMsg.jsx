import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../Icons/ErrorIcon';
import styles from '../../statics/styles/media-item-error-msg.scss';
import { MediaUploadErrorKey } from 'wix-rich-content-common';
import classnames from 'classnames';

function getErrorMap(t) {
  return {
    [MediaUploadErrorKey.GENERIC]: t('UploadFile_Error_Generic_Item'),
    [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: t('UploadFile_Error_Generic_Item'),
    [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: t('UploadFile_Error_Generic_Item'),
    [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: t('UploadFile_Error_Generic_Item'),
    [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: t('UploadFile_Error_Generic_Item'),
    [MediaUploadErrorKey.SIZE_LIMIT]: t('UploadFile_Error_Size_Item'),
  };
}

export default function MediaItemErrorMsg(props) {
  const { error, t } = props;
  const errorMessages = t && getErrorMap(t);
  let errorMsg = error?.msg;
  if (errorMessages) {
    errorMsg = (error && errorMessages[error?.key]) || error?.msg;
  }
  const errorIconStyle = classnames(styles.errorIcon, error && styles.errorIconWithMessage);
  return (
    <div className={styles.error}>
      <ErrorIcon className={errorIconStyle} />
      <div className={styles.errorMsg}>{errorMsg}</div>
    </div>
  );
}

MediaItemErrorMsg.propTypes = {
  error: PropTypes.string,
  t: PropTypes.func,
};
