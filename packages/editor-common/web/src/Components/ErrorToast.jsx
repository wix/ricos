import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MediaUploadErrorKey, GlobalContext } from 'wix-rich-content-common';
import Toast from './Toast';

function getErrorMap(t) {
  return {
    [MediaUploadErrorKey.GENERIC]: t('UploadFile_Error_Generic_Toast'),
    [MediaUploadErrorKey.QUOTA_STORAGE_VISITOR]: t('UploadFile_Error_StorageExceeded_Visitor'),
    [MediaUploadErrorKey.QUOTA_STORAGE_OWNER]: t('UploadFile_Error_StorageExceeded_SiteOwner'),
    [MediaUploadErrorKey.QUOTA_VIDEO_VISITOR]: t('UploadVideo_Error_StorageExceeded_Visitor'),
    [MediaUploadErrorKey.QUOTA_VIDEO_OWNER]: t('UploadVideo_Error_StorageExceeded_SiteOwner'),
    [MediaUploadErrorKey.SIZE_LIMIT]: t('UploadFile_Error_Size_Toast', { maxLimit: 150 }),
  };
}

export default class ErrorToast extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, count: 0 };
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const { commonPubsub } = this.props;
    const { t } = this.context;
    this.errorMap = getErrorMap(t);
    commonPubsub.subscribe('onMediaUploadError', this.onError);
    commonPubsub.subscribe('onErrorBlockRemove', this.onErrorBlockRemove);
  }

  componentWillUnmount() {
    const { commonPubsub } = this.props;
    commonPubsub.unsubscribe('onMediaUploadError', this.onError);
    commonPubsub.unsubscribe('onErrorBlockRemove', this.onErrorBlockRemove);
  }

  onErrorBlockRemove = () => {
    const { count } = this.state;
    if (count === 1) {
      this.onClose();
    } else {
      this.setState({ count: count - 1 });
    }
  };

  onError = error => {
    if (error) {
      this.setState({ error, count: this.state.count + 1 });
    }
  };

  onClose = () => {
    this.setState({ error: null, count: 0 });
  };

  getErrorMessage = () => {
    const { error, count } = this.state;
    const { t } = this.context;
    let errorMsg;
    if (error) {
      if (count > 1) {
        errorMsg = t('UploadFile_Error_Generic_Toast_Multiple', { errors: count });
      } else if (count === 1) {
        errorMsg = this.errorMap[error?.key] || error?.msg;
      }
    }
    return errorMsg;
  };

  render() {
    const { isMobile } = this.context;
    const errorMsg = this.getErrorMessage();
    return <Toast message={errorMsg} onClose={this.onClose} isMobile={isMobile} isError />;
  }
}

ErrorToast.propTypes = {
  commonPubsub: PropTypes.object.isRequired,
};
