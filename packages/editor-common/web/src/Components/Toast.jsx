import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.scss';
import { CloseIcon } from '../Icons';

export default function Toast(props) {
  const { isMobile, isError, message, onClose } = props;
  const backgroundColor = isError ? styles.on_error : styles.on_success;
  const style = classnames(styles.toast_container, isMobile && styles.mobile, backgroundColor);
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
