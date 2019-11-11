import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactPlayerWrapper from './reactPlayerWrapper';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate, Context, ViewportRenderer } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import getVideoSrc from './get-video-source';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/video-viewer.scss';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
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
      validate(nextProps.componentData, schema);
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

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const { url, isLoaded } = this.state;
    const props = {
      ...this.props,
      url,
      onReady: this.onReactPlayerReady,
      disabled: this.context.disabled,
    };
    return (
      <ViewportRenderer>
        <ReactPlayerWrapper
          className={classNames(this.styles.video_player)}
          data-loaded={isLoaded}
          {...props}
        />
      </ViewportRenderer>
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
};

VideoViewer.contextType = Context.type;

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default VideoViewer;
