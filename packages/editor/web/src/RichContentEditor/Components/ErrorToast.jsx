import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from 'wix-rich-content-common';
import { ERROR_MAP } from 'wix-rich-content-editor-common';
import { Trans } from 'react-i18next';

const Toast = React.lazy(() => import('./Toast'));

export default class ErrorToast extends Component {
  constructor(props) {
    super(props);
    this.state = { error: {}, errorCount: 0 };
  }

  static contextType = GlobalContext;

  componentDidMount() {
    const { commonPubsub } = this.props;
    window.__internalRicosOnError__ = this.onError;
    commonPubsub.subscribe('onMediaUploadError', this.onError);
  }

  componentWillUnmount() {
    const { commonPubsub } = this.props;
    commonPubsub.unsubscribe('onMediaUploadError', this.onError);
  }

  closeToastAfterDelay = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.close, 4000);
  };

  onError = error => {
    this.setState(state => ({ error, errorCount: state.errorCount + 1 }));
    this.closeToastAfterDelay();
  };

  close = () => {
    this.setState({ errorCount: 0 });
  };

  getErrorMessage = () => {
    const { error, errorCount } = this.state;
    const translationKey =
      errorCount > 1 ? 'UploadFile_Error_Generic_Toast_Multiple' : ERROR_MAP[error.key];
    const upgradeUrl = error.args?.upgradeUrl;

    const errorMsg = translationKey ? (
      <Trans i18nKey={translationKey} values={{ ...error.args, errors: errorCount }}>
        {error.msg}
        {upgradeUrl && (
          <a href={upgradeUrl} target="_blank" rel="noreferrer">
            {' '}
          </a>
        )}
      </Trans>
    ) : (
      error.msg
    );
    return errorMsg;
  };

  render() {
    const { errorCount } = this.state;
    const isOpen = errorCount > 0;
    if (!isOpen) {
      return null;
    }
    const { isMobile } = this.context;
    const errorMsg = this.getErrorMessage();
    return (
      <Suspense fallback={<div />}>
        <Toast message={errorMsg} onClose={this.close} isMobile={isMobile} isError />
      </Suspense>
    );
  }
}

ErrorToast.propTypes = {
  commonPubsub: PropTypes.object.isRequired,
};
