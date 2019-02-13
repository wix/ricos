import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/map-settings-modal.scss';

export const LabeledImage = ({ label, alt, title, onClick, onKeyPress, src, imgStyle }) => {
  return (
    <div className={styles.labeled_image_root}>
      <div
        onClick={onClick}
        role="button"
        onKeyPress={e => e.key === 'Enter' ? (onKeyPress || onClick)() : undefined}
        tabIndex={0}
      >
        <p className={styles.labeled_image_label}>{label}</p>
      </div>
      <div
        className={styles.labeled_image_img_wrapper}
        onClick={onClick}
        role="button"
        tabIndex={-1}
        onKeyPress={e => e.key === 'Enter' ? (onKeyPress || onClick)() : undefined}
      >
        <img
          src={src}
          alt={alt || label}
          title={title || label}
          className={styles.labeled_image_img}
          style={imgStyle}
        />
      </div>
    </div>
  );
};

LabeledImage.propTypes = {
  label: PropTypes.string.isRequired,
  alt: PropTypes.string,
  title: PropTypes.string,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  imgStyle: PropTypes.object,
};

