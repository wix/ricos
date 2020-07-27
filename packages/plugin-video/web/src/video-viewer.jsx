import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayerWrapper from './reactPlayerWrapper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginVideoSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-video.schema.json';
import { isEqual } from 'lodash';
import getVideoSrc from './get-video-source';
import { BlockSpoilerComponent } from 'wix-rich-content-plugin-spoiler';
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
          this.setUrl(url);
        } else if (url && typeof url.then === 'function') {
          url.then(url => this.setUrl(url));
        }
      }
    }
  }

  setUrl = newUrl => {
    const url = this.normalizeUrl(newUrl);
    if (url !== this.state.url) {
      this.setState({ url });
      this.props.onReload?.();
    }
  };
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
    if (!this.props.isLoaded) {
      this.props.onReady?.() || this.setState({ isLoaded: true });
    }
  };

  handleContextMenu = e => this.props.disableRightClick && e.preventDefault();

  render() {
    const { theme, width, height, disabled, setComponentUrl } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const { url, key } = this.state;

    setComponentUrl?.(url);
    const props = {
      url,
      onReady: this.onReactPlayerReady,
      disabled,
      width,
      height,
      key,
    };
    const isLoaded = this.props.isLoaded || this.state.isLoaded;
    return (
      <BlockSpoilerComponent pluginType="Video" {...this.props}>
        <ReactPlayerWrapper
          className={classNames(this.styles.video_player)}
          onContextMenu={this.handleContextMenu}
          data-loaded={isLoaded}
          controls={this.props.isLoaded !== false}
          {...props}
        />
      </BlockSpoilerComponent>
    );
  }
}

VideoViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onStart: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  disableRightClick: PropTypes.bool,
  setComponentUrl: PropTypes.func,
  onReady: PropTypes.func,
  isLoaded: PropTypes.bool,
  onReload: PropTypes.func,
};

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default VideoViewer;
