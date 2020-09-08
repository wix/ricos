import React from 'react';
import PropTypes from 'prop-types';
import defaultStyles from '../../../statics/styles/hue-pointer.scss';
import { mergeStyles } from 'wix-rich-content-common';

const HuePointer = theme => {
  const styles = mergeStyles({ styles: defaultStyles, theme });

  return (
    <div>
      <div className={styles.huePointer_vertical_line} />
      <div className={styles.huePointer} />
    </div>
  );
};

HuePointer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default HuePointer;
