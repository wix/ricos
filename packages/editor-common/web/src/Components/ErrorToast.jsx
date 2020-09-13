import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MediaUploadErrorKey, GlobalContext } from 'wix-rich-content-common';
import Toast from './Toast';
import { Trans } from 'react-i18next';

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
    this.state = { error: {}, errorCount: 0 };
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
      this.setState({ error, errorCount }, () => {
        this.timeStamp = Date.now();
        setTimeout(() => this.onClose({ timerClose: true }), 4000);
      });
    }
  };

  onClose = ({ timerClose }) => {
    if (!timerClose || Date.now() - this.timeStamp >= 4000) {
      this.setState({ errorCount: 0 });
    }
  };

  getErrorMessage = () => {
    const { error, errorCount } = this.state;
    const t_key = errorCount > 1 ? 'UploadFile_Error_Generic_Toast_Multiple' : errorMap[error.key];
    const upgradeUrl = error.args?.upgradeUrl;
    const maxLimit = error.args?.maxLimit;
    const errorMsg = (
      <Trans i18nKey={t_key} values={{ maxLimit, errors: errorCount }}>
        {error.msg}
        {upgradeUrl && (
          <a href={upgradeUrl} target="_blank" rel="noreferrer">
            {' '}
          </a>
        )}
      </Trans>
    );
    return { errorCount, errorMsg };
  };

  render() {
    const { isMobile } = this.context;
    const { errorCount, errorMsg } = this.getErrorMessage();
    const isOpen = errorCount > 0;
    return isOpen ? (
      <Toast message={errorMsg} onClose={this.onClose} isMobile={isMobile} isError />
    ) : null;
  }
}

ErrorToast.propTypes = {
  commonPubsub: PropTypes.object.isRequired,
};
