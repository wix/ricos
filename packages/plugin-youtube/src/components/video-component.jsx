import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { YOUTUBE_URL } from '../constants';
import styles from '../../statics/styles/video-component.scss';

class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      isClicked: false,
    };
  }
  componentDidMount = () => {
    this.getVideoAge();
  };

  componentWillReceiveProps = nextProp => {
    if (this.state.isClicked !== nextProp.isClicked) {
      this.setState({ isClicked: nextProp.isClicked });
    }
  };

  onClickedHandler = () => {
    this.props.onVideoClicked(YOUTUBE_URL + this.props.videoObj.videoId);
  };

  getVideoAge = () => {
    const { publishedDate } = this.props.videoObj;
    const { t } = this.props;
    const dateAndTime = publishedDate.split('T');
    const date = dateAndTime[0].split('-');
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    let diff = '';
    if (year - date[0] !== 0) {
      diff = year - date[0] + t('YoutubePlugin_years_ago_label');
    } else if (month - date[1] !== 0) {
      diff = month - date[1] + t('YoutubePlugin_months_ago_label');
    } else {
      diff = day - date[2] + t('YoutubePlugin_days_ago_label');
    }
    this.setState({ sincePublished: diff });
  };

  render() {
    const { videoObj } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        className={this.styles.video_component_container}
        onKeyPress={null}
        onClick={this.onClickedHandler}
      >
        <div className={this.styles.video_component_thumbnail_container}>
          <img
            className={this.styles.video_component_image}
            src={videoObj.thumbnail}
            alt="Youtube Thumbnail"
          />
        </div>
        <div className={this.styles.video_component_description_container}>
          <div className={this.styles.video_component_video_title}>{videoObj.videoTitle}</div>
          <div className={this.styles.video_component_video_publisher_name}>
            {videoObj.publisherName}
          </div>
          <div className={this.styles.video_component_video_publish_date}>
            {this.state.sincePublished}
          </div>
        </div>
        <div className={this.styles.video_component_clearFloating} />
      </div>
    );
  }
}

VideoComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  onVideoClicked: PropTypes.func.isRequired,
  videoObj: PropTypes.object.isRequired,
  isClicked: PropTypes.bool,
  isMobile: PropTypes.bool,
  thumbnail: PropTypes.string,
  t: PropTypes.func,
};

export default VideoComponent;
