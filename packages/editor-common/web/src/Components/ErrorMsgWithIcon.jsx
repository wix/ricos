import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../Icons/ErrorIcon';
import styles from '../../statics/styles/error-msg-with-icon.scss';
import classnames from 'classnames';

export default function ErrorMsgWithIcon(props) {
  const errorIconStyle = classnames(
    styles.errorIcon,
    props.errorMsg && styles.errorIconWithMessage
  );
  return (
    <div className={styles.error}>
      <ErrorIcon className={errorIconStyle} />
      <div className={styles.errorMsg}>{props.errorMsg}</div>
    </div>
  );
}

ErrorMsgWithIcon.propTypes = {
  errorMsg: PropTypes.string,
};
