import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/hue-pointer.scss';

class HuePointer extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }
  render() {
    return (
      <div>
        <div className={this.styles.vertical_line} />
        <div className={this.styles.hue_pointer} />
      </div>
    );
  }
}

HuePointer.propTypes = {
  theme: PropTypes.object.isRequired,
};
export default HuePointer;
