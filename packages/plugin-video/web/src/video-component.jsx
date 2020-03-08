import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { mergeStyles } from 'wix-rich-content-common';
import { Loader } from 'wix-rich-content-editor-common';
import VideoViewer from './video-viewer';
import styles from '../statics/styles/default-video-styles.scss';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';

const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
  },
});

class VideoComponent extends React.Component {
  static type = { VIDEO_TYPE_LEGACY, VIDEO_TYPE };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps;
    this.state = {
      isLoaded: false,
      isPlayable,
    };
  }

  setPlayer = player => {
    this.player = player;
  };

  componentDidMount() {
    this.handlePlayerFocus();
  }

  componentDidUpdate() {
    this.handlePlayerFocus();
  }

  handlePlayerFocus() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this).querySelector('iframe, video');
    if (element) {
      element.tabIndex = -1;
    }
  }

  handleReady = () => {
    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderOverlay = (styles, t) => {
    const { isLoaded } = this.state;
    const overlayText = t('VideoComponent_Overlay');
    return (
      <div className={classNames(styles.video_overlay)}>
        {isLoaded && <span className={styles.video_overlay_message}>{overlayText}</span>}
      </div>
    );
  };

  renderLoader = () => {
    return (
      <div className={this.styles.videoOverlay}>
        <Loader type={'medium'} helpers={this.props.helpers} />
      </div>
    );
  };

  reLoad = () => {
    if (this.state.isLoaded) {
      this.setState({ isLoaded: false });
    }
  };

  renderPlayer = () => {
    const {
      theme,
      componentData,
      disabled,
      disableRightClick,
      settings,
      setComponentUrl,
    } = this.props;
    return (
      <VideoViewer
        ref={this.setPlayer}
        componentData={componentData}
        settings={settings}
        onReady={this.handleReady}
        disabled={disabled}
        disableRightClick={disableRightClick}
        theme={theme}
        setComponentUrl={setComponentUrl}
        reLoad={this.reLoad}
      />
    );
  };

  onKeyDown = (e, handler) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handler();
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { className, onClick } = this.props;
    const { isPlayable } = this.state;
    const containerClassNames = classNames(this.styles.video_container, className || '');
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="videoPlayer"
        onClick={onClick}
        className={containerClassNames}
        onKeyDown={e => this.onKeyDown(e, onClick)}
        draggable
      >
        {!isPlayable && this.renderOverlay(this.styles, this.props.t)}
        {this.renderPlayer()}
        {!this.state.isLoaded && this.renderLoader()}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

VideoComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  disableRightClick: PropTypes.bool,
  disabled: PropTypes.bool,
  setComponentUrl: PropTypes.func,
  helpers: PropTypes.object.isRequired,
};

export { VideoComponent as Component, DEFAULTS };
