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
      if (nextProps.componentData.tempData !== this.props.componentData.tempData) {
        this.onReactPlayerReady();
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

    if (!this.state.isLoaded && !this.props.componentData.tempData) {
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

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { url, isLoaded, key } = this.state;
    const props = {
      url,
      onReady: this.onReactPlayerReady,
      disabled: this.props.disabled,
      width: this.props.width,
      height: this.props.height,
    };
    return (
      <>
        <ReactPlayerWrapper
          className={classNames(this.styles.video_player)}
          onContextMenu={this.handleContextMenu}
          key={key}
          {...props}
          controls={props.controls || isLoaded}
        />
        {!isLoaded && this.props.componentData.tempData && this.renderLoader()}
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
  disabled: PropTypes.bool.isRequired,
  disableRightClick: PropTypes.bool.isRequired,
};

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default VideoViewer;
