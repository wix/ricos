import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.rtlignore.scss';
import { CloseIcon } from '../Icons';
import ReactDOM from 'react-dom';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, message: '' };
  }
  static getDerivedStateFromProps(props) {
    const { message } = props;
    if (message === '') {
      return null;
    }
    return { message };
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.message !== nextProps.message || this.props.isOpen !== nextProps.isOpen) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.props.isTimed && this.props.isOpen) {
      setTimeout(() => this.onClose(), 2000);
    }
  }

  onClose = () => {
    this.props?.onClose?.();
    this.setState({ isVisible: false });
  };

  render() {
    const { onClose, isMobile, isError, isOpen } = this.props;
    const { message } = this.state;
    const backgroundColor = isError ? styles.on_error : styles.on_success;
    const style = classnames(
      styles.toast_container,
      isOpen && styles.visible,
      isMobile && styles.mobile,
      backgroundColor
    );
    const tabIndex = isOpen ? 0 : -1;
    let toast = (
      <div className={style} tabIndex={tabIndex}>
        {onClose && <CloseIcon className={styles.close} onClick={this.onClose} />}
        {message}
      </div>
    );
    if (typeof window !== 'undefined') {
      toast = ReactDOM.createPortal(toast, document.body);
    }
    return toast;
  }
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
  isError: PropTypes.bool,
  isTimed: PropTypes.bool,
};
