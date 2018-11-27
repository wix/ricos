import React, { Component } from 'react';
import styles from '../../statics/styles/saturation-pointer.scss';
class SaturationPointer extends Component {

  render() {
    return (
      <div className={styles.saturation_pointer}>
        <div className={styles.top_path} />
        <div className={styles.bottom_path} />
        <div className={styles.left_path} />
        <div className={styles.right_path} />
        <div className={styles.circle} />
      </div>
    );
  }
}

export default SaturationPointer;
