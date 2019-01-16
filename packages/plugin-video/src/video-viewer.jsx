import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles, validate } from 'wix-rich-content-common';
import isEqual from 'lodash/isEqual';
import getVideoSrc from './get-video-source';
import schema from '../statics/data-schema.json';
import styles from '../statics/styles/video-viewer.scss';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  render() {
    const { componentData, theme, settings, isMobile, ...rest } = this.props; // eslint-disable-line no-unused-vars
    return (
      <ReactPlayer
        className={classNames(this.styles.video_player)}
        url={getVideoSrc(componentData.src, settings)}
        {...rest}
      />
    );
  }
}

VideoViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  controls: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  settings: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
};

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default VideoViewer;
