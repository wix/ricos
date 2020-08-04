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
      return { isVisible: false };
    }
    return { message, isVisible: true };
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.message !== nextProps.message) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (!this.props.onClose && this.state.isVisible) {
      setTimeout(() => this.onClose(), 2000);
    }
  }

  onClose = () => {
    this.props?.onClose?.();
    this.setState({ isVisible: false });
  };

  render() {
    const { onClose, isMobile, isError } = this.props;
    const { isVisible, message } = this.state;
    const backgroundColor = isError ? styles.on_error : styles.on_success;
    const style = classnames(
      styles.toast_container,
      isVisible && styles.visible,
      isMobile && styles.mobile,
      backgroundColor
    );
    const tabIndex = isVisible ? 0 : -1;
    let toast = (
      <div className={style} tabIndex={tabIndex}>
        {onClose && <CloseIcon className={styles.close} onClick={this.onClose} />}
        {message}
      </div>
    );
    if (document) {
      toast = ReactDOM.createPortal(toast, document.body);
    }
    return toast;
  }
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool,
  isError: PropTypes.bool,
};
