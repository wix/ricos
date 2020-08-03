import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.scss';
import { CloseIcon } from '../Icons';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false, message: undefined };
  }
  static getDerivedStateFromProps(props, state) {
    const { message } = props;
    if (message !== state.message) {
      let isVisible = false;
      if (message) {
        isVisible = true;
      }
      return { message, isVisible };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isVisible !== nextState.isVisible || this.props.message !== nextProps.message) {
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
    const { isVisible } = this.state;
    const { message, onClose, isMobile, isError } = this.props;
    const backgroundColor = isError ? styles.error : styles.success;
    const style = classnames(
      styles.toast,
      isVisible && styles.visible,
      isMobile && styles.mobile,
      backgroundColor
    );
    const tabIndex = isVisible ? 0 : -1;
    return (
      //   <ReactModal
      //     isOpen={isVisible}
      //     className={styles.modal}
      //     overlayClassName={styles.overlay}
      //     parentSelector={() => document.body}
      //     onRequestClose={this.onClose}
      //   >
      //     <div className={style} tabIndex={tabIndex}>
      //       {onClose && <CloseIcon className={styles.close} onClick={this.onClose} />}
      //       {message}
      //     </div>
      //   </ReactModal>
      <div className={style} tabIndex={tabIndex}>
        {onClose && <CloseIcon className={styles.close} onClick={this.onClose} />}
        {message}
      </div>
    );
  }
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  isMobile: PropTypes.bool,
  isError: PropTypes.bool,
};
