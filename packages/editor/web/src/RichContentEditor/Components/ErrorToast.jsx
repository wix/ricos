import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from 'wix-rich-content-common';

const ErrorMessage = React.lazy(() => import('./ErrorMessage'));

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

  render() {
    const { errorCount, error } = this.state;
    const isOpen = errorCount > 0;
    if (!isOpen) {
      return null;
    }
    const { isMobile } = this.context;

    return (
      <Suspense fallback={<div />}>
        <ErrorMessage
          error={error}
          errorCount={errorCount}
          onClose={this.close}
          isMobile={isMobile}
        />
      </Suspense>
    );
  }
}

ErrorToast.propTypes = {
  commonPubsub: PropTypes.object.isRequired,
};
