import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.scss';
import { CloseIcon } from '../Icons';

export default function Toast(props) {
  const { isMobile, isError, message, onClose } = props;
  const backgroundColor = isError ? styles.error : styles.success;
  const style = classnames(styles.toastContainer, isMobile && styles.mobile, backgroundColor);
  return (
    <div className={style}>
      {onClose && <CloseIcon className={styles.close} onClick={onClose} />}
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.oneOfType(PropTypes.string, PropTypes.elementType).isRequired,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool,
  isError: PropTypes.bool,
};
