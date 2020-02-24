import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayerWrapper from './reactPlayerWrapper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate, pluginVideoSchema, Loader } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import getVideoSrc from './get-video-source';
import styles from '../statics/styles/video-viewer.scss';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, pluginVideoSchema);
    this.state = { url: undefined, isLoaded: false };
    const url = getVideoSrc(props.componentData.src, props.settings);
    if (typeof url === 'string') {
      this.state = { url: this.normalizeUrl(url) };
    } else if (url && typeof url.then === 'function') {
      url.then(url => this.setState({ url: this.normalizeUrl(url) }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginVideoSchema);
      if (nextProps.componentData.src !== this.props.componentData.src) {
        const url = getVideoSrc(nextProps.componentData.src, nextProps.settings);
        if (typeof url === 'string') {
          this.setState({ url: this.normalizeUrl(url) });
        } else if (url && typeof url.then === 'function') {
          url.then(url => this.setState({ url: this.normalizeUrl(url) }));
        }
      }
    }
  }

  componentDidMount() {
    this.setState({ key: 'mounted' }); //remounts reactPlayer after ssr. Fixes bug where internal player id changes in client
  }

  normalizeUrl = url => (url.toLowerCase().indexOf('vimeo') === 0 ? 'https://' + url : url); //vimeo player needs urls prefixed with http[s]

  getVideoRatio = wrapper => {
    const element = wrapper.querySelector('iframe, video');
    return element.clientHeight / element.clientWidth;
  };

  onReactPlayerReady = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const wrapper = ReactDOM.findDOMNode(this).parentNode;
    const ratio = this.getVideoRatio(wrapper);
    wrapper.style['padding-bottom'] = ratio * 100 + '%';

    if (!this.state.isLoaded) {
      this.setState({ isLoaded: true });
    }
  };

  renderLoader = () => {
    return (
      <div className={this.styles.videoOverlay}>
        <Loader type={'medium'} />
      </div>
    );
  };

  isLoaded = () => this.state.isLoaded && !this.props.componentData.tempData;

  shouldRenderControls = isLoaded =>
    (!this.props.componentData.isCustomVideo && this.props.controls) || isLoaded;

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { url, key } = this.state;
    this.props.setComponentUrl?.(url);
    const isLoaded = this.isLoaded();
    const props = {
      url,
      onReady: this.onReactPlayerReady,
      onBuffer: () => this.setState({ isLoaded: false }),
      onBufferEnd: () => this.setState({ isLoaded: true }),
      disabled: this.props.disabled,
      width: this.props.width,
      height: this.props.height,
      controls: this.shouldRenderControls(isLoaded),
    };
    return (
      <>
        <ReactPlayerWrapper
          className={classNames(this.styles.video_player)}
          onContextMenu={this.handleContextMenu}
          key={key}
          data-loaded={isLoaded}
          {...props}
        />
        {!isLoaded && this.renderLoader()}
      </>
    );
  }
}

VideoViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  disableRightClick: PropTypes.bool,
  setComponentUrl: PropTypes.func,
};

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default VideoViewer;
