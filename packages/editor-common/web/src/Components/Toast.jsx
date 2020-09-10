import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.scss';
import { CloseIcon } from '../Icons';
import { getLangDir, isSSR } from 'wix-rich-content-common';
import ReactDOM from 'react-dom';

export default function Toast(props) {
  const { isMobile, isError, locale, message, onClose } = props;
  const backgroundColor = isError ? styles.on_error : styles.on_success;
  const style = classnames(styles.toast_container, isMobile && styles.mobile, backgroundColor);
  let toast = (
    <div dir={getLangDir(locale)}>
      <div className={style}>
        {onClose && <CloseIcon className={styles.close} onClick={onClose} />}
        {message}
      </div>
    </div>
  );
  if (!isSSR()) {
    toast = ReactDOM.createPortal(toast, document.body);
  }
  return toast;
}

Toast.propTypes = {
  message: PropTypes.any.isRequired,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool,
  isError: PropTypes.bool,
  locale: PropTypes.string,
};
