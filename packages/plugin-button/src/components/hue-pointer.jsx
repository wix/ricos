import React, { Component } from 'react';
import styles from '../../statics/styles/hue-pointer.scss';
class HuePointer extends Component {

  render() {
    return (
      <div>
        <div className={styles.vertical_line} />
        <div className={styles.hue_pointer} />
      </div>
    );
  }
}

export default HuePointer;
