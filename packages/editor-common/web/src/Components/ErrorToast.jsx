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
    this.state = { errors: [], isOpen: false };
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const { commonPubsub } = this.props;
    commonPubsub.subscribe('onMediaUploadError', this.onError);
    commonPubsub.subscribe('onErrorBlockRemove', this.onErrorBlockRemove);
  }

  componentWillUnmount() {
    const { commonPubsub } = this.props;
    commonPubsub.unsubscribe('onMediaUploadError', this.onError);
    commonPubsub.unsubscribe('onErrorBlockRemove', this.onErrorBlockRemove);
  }

  onErrorBlockRemove = errorBlock => {
    const { errors } = this.state;
    errors.splice(
      errors.findIndex(e => e.blockKey === errorBlock.blockKey),
      1
    );
    this.setState({ errors });
    if (errors.length === 0) {
      this.onClose();
    }
  };

  onError = ({ blockKey, error }) => {
    if (error) {
      const errors = [...this.state.errors, { blockKey, error }];
      this.setState({ errors, isOpen: true });
    }
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  getErrorMessage = () => {
    const { t } = this.context;
    const { errors } = this.state;
    const size = errors.length;
    let errorMsg;
    if (size > 1) {
      errorMsg = t('UploadFile_Error_Generic_Toast_Multiple', { errors: size });
    } else if (size === 1) {
      const error = errors[size - 1].error;
      errorMsg = t(errorMap[error?.key] || error?.msg, error?.args);
    }
    return errorMsg;
  };

  render() {
    const { isMobile } = this.context;
    const { isOpen } = this.state;
    const { locale } = this.props;
    const errorMsg = this.getErrorMessage();
    return (
      <Toast
        isOpen={isOpen}
        message={errorMsg}
        onClose={this.onClose}
        isMobile={isMobile}
        locale={locale}
        isError
        isTimed
      />
    );
  }
}

ErrorToast.propTypes = {
  commonPubsub: PropTypes.object.isRequired,
  locale: PropTypes.string,
};
