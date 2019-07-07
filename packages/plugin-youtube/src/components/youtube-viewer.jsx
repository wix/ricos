import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { mergeStyles, validate, Context } from 'wix-rich-content-common';
import schema from '../../statics/data-schema.json';
import styles from '../../statics/styles/youtube-viewer.scss';
import classNames from 'classnames';
class YoutubeViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
  }

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      componentData: { youtube },
      ...rest
    } = this.props;
    return (
      <ReactPlayer
        className={classNames(this.styles.youtube_viewer_video_player)}
        url={youtube.url}
        {...rest}
      />
    );
  }
}

YoutubeViewer.contextType = Context.type;

YoutubeViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
};

YoutubeViewer.defaultProps = {
  width: '100%',
  height: '100%',
  controls: true,
};

export default YoutubeViewer;
