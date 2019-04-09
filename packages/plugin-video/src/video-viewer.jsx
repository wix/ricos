import React, { Component } from 'react';
import ReactPlayer from 'react-player';
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
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  normalizeUrl = url => (url.toLowerCase().indexOf('vimeo') === 0 ? 'https://' + url : url); //vimeo player needs urls prefixed with http[s]

  render() {
    const { componentData, settings, ...rest } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const url = this.normalizeUrl(getVideoSrc(componentData.src, settings));
    return <ReactPlayer className={classNames(this.styles.video_player)} url={url} {...rest} />;
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
};

VideoViewer.contextType = Context.type;

VideoViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default VideoViewer;
