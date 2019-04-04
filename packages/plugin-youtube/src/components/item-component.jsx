import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { YOUTUBE_URL } from '../constants';
import styles from '../../statics/styles/item.scss';

class ItemComponent extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.state = {
      isClicked: false,
    };
  }
  componentDidMount = () => {
    this.getNumberOfYears();
  };

  componentWillReceiveProps = nextProp => {
    if (this.state.isClicked !== nextProp.isClicked) {
      this.setState({ isClicked: nextProp.isClicked });
    }
  };

  onClickedHandler = () => {
    this.props.onItemClicked(YOUTUBE_URL + this.props.videoObj.videoId);
  };

  getNumberOfYears = () => {
    const { publishedDate } = this.props.videoObj;
    const dateAndTime = publishedDate.split('T');
    const date = dateAndTime[0].split('-');
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    let diff = '';
    if (yyyy - date[0] !== 0) {
      diff = yyyy - date[0] + ' years ago';
    } else if (mm - date[1] !== 0) {
      diff = mm - date[1] + ' months ago';
    } else {
      diff = dd - date[2] + ' days ago';
    }
    this.setState({ sincePublished: diff });
  };

  render() {
    const { isMobile, videoObj } = this.props;
    const border = isMobile && this.props.isClicked && '5px solid blue';
    return (
      <div
        role="button"
        tabIndex={0}
        style={{ border }}
        className={this.styles.item_container}
        onKeyPress={null}
        onClick={this.onClickedHandler}
      >
        <div className={this.styles.thumbnail_container}>
          <img className={this.styles.image} src={videoObj.thumbnail} alt="Youtube Thumbnail" />
        </div>
        <div className={this.styles.description_container}>
          <div className={this.styles.video_title}>{videoObj.videoTitle}</div>
          <div className={this.styles.video_publisher_name}>{videoObj.publisherName}</div>
          <div className={this.styles.video_publish_date}>{this.state.sincePublished}</div>
        </div>
        <div className={this.styles.clearFloating} />
      </div>
    );
  }
}

ItemComponent.propTypes = {
  theme: PropTypes.object.isRequired,
  onItemClicked: PropTypes.func.isRequired,
  videoObj: PropTypes.object.isRequired,
  isClicked: PropTypes.bool,
  isMobile: PropTypes.bool,
  thumbnail: PropTypes.string,
};

export default ItemComponent;
