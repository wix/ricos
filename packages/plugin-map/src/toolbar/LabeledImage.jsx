import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/map-settings-modal.scss';
import { mergeStyles } from 'wix-rich-content-common';

export class LabeledImage extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  render() {
    const { label, alt, title, onClick, onKeyPress, src, imgStyle } = this.props;

    return (
      <div className={this.styles.labeled_image_root}>
        <div
          onClick={onClick}
          role="button"
          onKeyPress={e => e.key === 'Enter' && (onKeyPress || onClick)()}
          tabIndex={0}
        >
          <p className={this.styles.labeled_image_label}>{label}</p>
        </div>
        <div
          className={this.styles.labeled_image_img_wrapper}
          onClick={onClick}
          role="button"
          tabIndex={-1}
          onKeyPress={e => e.key === 'Enter' && (onKeyPress || onClick)()}
        >
          <img
            src={src}
            alt={alt || label}
            title={title || label}
            className={this.styles.labeled_image_img}
            style={imgStyle}
          />
        </div>
      </div>
    );
  }

}

LabeledImage.propTypes = {
  label: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  imgStyle: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

