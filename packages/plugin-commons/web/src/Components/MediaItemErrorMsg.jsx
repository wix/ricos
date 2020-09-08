import React from 'react';
import PropTypes from 'prop-types';
import { ErrorIcon } from 'wix-rich-content-editor-common';
import styles from '../../statics/styles/media-item-error-msg.scss';
import classnames from 'classnames';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import { errorMessages } from '../Utils/mediaErrorUtils';

export default function MediaItemErrorMsg(props) {
  const { error, t, isTooltip } = props;
  const errorMsg = t(errorMessages[error.key]?.t_key) || error.msg;
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
