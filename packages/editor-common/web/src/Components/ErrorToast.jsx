import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MediaUploadErrorKey, GlobalContext } from 'wix-rich-content-common';
import Toast from './Toast';

const errorMap = {
  [MediaUploadErrorKey.GENERIC]: 'UploadFile_Error_Generic_Toast',
  [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: 'UploadFile_Error_StorageExceeded_Visitor',
  [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: 'UploadFile_Error_StorageExceeded_SiteOwner',
  [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: 'UploadVideo_Error_StorageExceeded_Visitor',
  [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: 'UploadVideo_Error_StorageExceeded_SiteOwner',
  [MediaUploadErrorKey.SIZE_LIMIT]: 'UploadFile_Error_Size_Toast',
};

export default class ErrorToast extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMsg: '', errorCount: 0 };
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const { commonPubsub } = this.props;
    commonPubsub.subscribe('onMediaUploadError', this.onError);
  }

  componentWillUnmount() {
    const { commonPubsub } = this.props;
    commonPubsub.unsubscribe('onMediaUploadError', this.onError);
  }

  onError = error => {
    if (error) {
      const errorCount = this.state.errorCount + 1;
      const errorMsg = this.getErrorMessage(error, errorCount);
      this.setState({ errorMsg, errorCount, timeStamp: Date.now() }, () =>
        setTimeout(() => this.onClose({ timerClose: true }), 3000)
      );
    }
    return 'return val';
  };

  onClose = ({ timerClose }) => {
    if (!timerClose || Date.now() - this.state.timeStamp >= 3000) {
      this.setState({ errorCount: 0 });
    }
  };

  getErrorMessage = (error, errorCount) => {
    const { t } = this.context;
    let errorMsg;
    if (errorCount > 1) {
      errorMsg = t('UploadFile_Error_Generic_Toast_Multiple', { errors: errorCount });
    } else if (errorCount === 1) {
      errorMsg = t(errorMap[error?.key] || error?.msg, error?.args);
    }
    return errorMsg;
  };

  render() {
    const { isMobile } = this.context;
    const { errorCount, errorMsg } = this.state;
    const { locale } = this.props;
    const isOpen = errorCount > 0;
    return (
      (isOpen && (
        <Toast
          message={errorMsg}
          onClose={this.onClose}
          isMobile={isMobile}
          locale={locale}
          isError
        />
      )) ||
      null
    );
  }
}

ErrorToast.propTypes = {
  commonPubsub: PropTypes.object.isRequired,
  locale: PropTypes.string,
};
