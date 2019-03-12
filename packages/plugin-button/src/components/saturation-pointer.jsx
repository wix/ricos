import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/saturation-pointer.scss';

class SaturationPointer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    return (
      <div className={this.styles.saturation_pointer}>
        <div className={this.styles.top_path} />
        <div className={this.styles.bottom_path} />
        <div className={this.styles.left_path} />
        <div className={this.styles.right_path} />
        <div className={this.styles.circle} />
      </div>
    );
  }
}

SaturationPointer.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default SaturationPointer;
