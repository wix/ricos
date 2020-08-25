import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from '../../statics/styles/toast.scss';
import { CloseIcon } from '../Icons';
import ReactModal from 'react-modal';
import { getLangDir, isSSR } from 'wix-rich-content-common';

export default class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  componentDidMount() {
    // avoid rendering a portal when running headless
    this.body = document.querySelector('body');
    ReactModal.setAppElement('body');
    this.forceUpdate();
  }

  static getDerivedStateFromProps(props, state) {
    const { message, isOpen } = props;
    if (message === '') {
      return null;
    }
    if (isOpen && message !== state.message) {
      return { message, timeStamp: Date.now() };
    }
    return { message };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isTimed) {
      if (prevProps.message !== this.props.message || prevProps.isOpen !== this.props.isOpen) {
        setTimeout(() => this.onClose(), 3000);
      }
    }
  }

  onClose = forceClosed => {
    if (forceClosed || Date.now() - this.state.timeStamp >= 3000) {
      this.setState({ timeStamp: null }, this.props.onClose);
    }
  };

  parentSelector = () => {
    let element;
    if (!isSSR()) {
      element = document.body;
    }
    return element;
  };

  render() {
    if (!this.body) {
      return null;
    }
    const { isMobile, isError, isOpen, locale } = this.props;
    const { message } = this.state;
    const backgroundColor = isError ? styles.on_error : styles.on_success;
    const style = classnames(
      styles.toast_container,
      isOpen && styles.visible,
      isMobile && styles.mobile,
      backgroundColor
    );
    const toast = (
      <div dir={getLangDir(locale)}>
        <div className={style}>
          {
            <CloseIcon
              className={styles.close}
              onClick={() => this.onClose({ forceClosed: true })}
            />
          }
          {message}
        </div>
      </div>
    );
    return (
      <ReactModal
        isOpen={isOpen}
        className={styles.modal}
        overlayClassName={styles.modal}
        parentSelector={this.parentSelector}
        shouldCloseOnOverlayClick={false}
      >
        {toast}
      </ReactModal>
    );
  }
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
  isError: PropTypes.bool,
  isTimed: PropTypes.bool,
  locale: PropTypes.string,
};
