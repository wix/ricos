import React from 'react';
import styles from '../../statics/styles/hue-pointer.scss';

const HuePointer = () => (
  <div>
    <div className={styles.vertical_line} />
    <div className={styles.hue_pointer} />
  </div>
);

export default HuePointer;
