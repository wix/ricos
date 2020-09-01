import React from 'react';
import PropTypes from 'prop-types';
import { ErrorIcon } from 'wix-rich-content-editor-common';
import styles from '../../statics/styles/media-item-error-msg.scss';
import { MediaUploadErrorKey } from 'wix-rich-content-common';
import classnames from 'classnames';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';

const errorMessages = {
  [MediaUploadErrorKey.GENERIC]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: 'UploadFile_Error_Generic_Item',
  [MediaUploadErrorKey.SIZE_LIMIT]: 'UploadFile_Error_Size_Item',
};

export default function MediaItemErrorMsg(props) {
  const { error, t, isTooltip } = props;
  const errorMsg = t(errorMessages[error.key]) || error.msg;
  const errorIconStyles = classnames(styles.errorIcon, !isTooltip && styles.errorIconWithMessage);
  return (
    <div className={styles.error}>
      {isTooltip ? (
        <Tooltip content={errorMsg} isError>
          <ErrorIcon className={errorIconStyles} />
        </Tooltip>
      ) : (
        <>
          <ErrorIcon className={errorIconStyles} />
          <div className={styles.errorMsg}>{errorMsg}</div>
        </>
      )}
    </div>
  );
}

MediaItemErrorMsg.propTypes = {
  error: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  isTooltip: PropTypes.bool,
};
