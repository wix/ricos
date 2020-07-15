import React from 'react';
import PropTypes from 'prop-types';
import ErrorIcon from '../Icons/ErrorIcon.svg';
import styles from '../../statics/styles/error-msg-with-icon.scss';

export default function ErrorMsgWithIcon(props) {
  return (
    <div className={styles.error}>
      <ErrorIcon className={styles.errorIcon} />
      <div className={styles.errorMsg}>{props.errorMsg}</div>
    </div>
  );
}

ErrorMsgWithIcon.propTypes = {
  errorMsg: PropTypes.string,
};
