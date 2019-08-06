/* eslint-disable no-undef */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles, validate, normalizeUrl, Context } from 'wix-rich-content-common';
import { isEqual } from 'lodash';
import schema from '../../statics/data-schema.json';
import styles from '../../statics/styles/unsplash-viewer.scss';

class UnsplashViewer extends Component {
  constructor(props) {
    super(props);
    validate(props.componentData, schema);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, schema);
    }
  }

  renderCaption = (caption, defaultCaption) => {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    return (
      <div className={this.styles.unsplash_imageCaption}>{caption ? caption : defaultCaption}</div>
    );
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.context.theme });
    const {
      componentData: { image },
      defaultCaption,
      isFocused,
    } = this.props;

    const linkAttributes = {
      rel: image.nofollow ? 'nofollow' : '',
      target: image.targetBlank ? '_blanck' : '',
    };

    return (
      <a href={normalizeUrl(image.url)} {...linkAttributes}>
        <div className={this.styles.unsplash_player_container}>
          <div className={this.styles.unsplash_image_username}>
            Photo By <u>{image.username}</u> on
            <u> Unsplash</u>
          </div>
          <div className={this.styles.unsplash_image_container}>
            <img className={this.styles.unsplash_player} src={image.originalUrl} alt={image.alt} />
          </div>
        </div>
        {!image.caption && isFocused
          ? this.renderCaption(image.caption, defaultCaption)
          : image.caption && this.renderCaption(image.caption, defaultCaption)}
      </a>
    );
  }
}

UnsplashViewer.contextType = Context.type;

UnsplashViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  theme: PropTypes.object,
  onReady: PropTypes.func,
  onStart: PropTypes.func,
  width: PropTypes.string,
  height: PropTypes.string,
  defaultCaption: PropTypes.string,
  isFocused: PropTypes.bool,
};

UnsplashViewer.defaultProps = {
  width: '100%',
  height: '100%',
};

export default UnsplashViewer;
