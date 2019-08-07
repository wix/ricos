import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop';
import ReactPlayerWrapper from './reactPlayerWrapper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate, Context } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import getVideoSrc from './get-video-source';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/video-viewer.scss';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.state = {
      isPlaying: false,
      isReady: false,
      placeholderStyle: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  normalizeUrl = url => (url.toLowerCase().indexOf('vimeo') === 0 ? 'https://' + url : url); //vimeo player needs urls prefixed with http[s]

  getVideoRatio = wrapper => {
    const element = wrapper.querySelector('iframe, video');
    return element.clientHeight / element.clientWidth;
  };

  fixVideoRatio = () => {
    // eslint-disable-next-line react/no-find-dom-node
    const wrapper = ReactDOM.findDOMNode(this).parentNode;
    const ratio = this.getVideoRatio(wrapper);
    wrapper.style['padding-bottom'] = ratio * 100 + '%';
    this.setState({
      placeholderStyle: {
        height: wrapper.clientHeight,
      },
    });
  };

  onStart = () => {
    this.setState({ isPlaying: true });
    this.props.onStart();
  };

  onReady = () => {
    if (!this.state.isReady) {
      this.fixVideoRatio();
      this.setState({
        isReady: true,
      });
    }
  };

  onEnded = () => this.setState({ isPlaying: false });

  render() {
    const { componentData, settings, ...rest } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const url = this.normalizeUrl(getVideoSrc(componentData.src, settings));
    const props = { ...rest, url, onReady: this.onReady };
    const { isReady, isPlaying, placeholderStyle } = this.state;

    return (
      <ReactPlayerWrapper
        className={classNames(this.styles.video_player)}
        {...props}
        onStart={this.onStart}
        onEnded={this.onEnded}
      />
    );
  }
}

VideoViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object.isRequired,
  playing: PropTypes.bool,
};

VideoViewer.contextType = Context.type;

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
  playing: false,
  onStart: noop,
  onReady: noop,
};

export default VideoViewer;
