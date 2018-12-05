import React from 'react';
import styles from '../../statics/styles/saturation-pointer.scss';
const SaturationPointer = () => (

  <div className={styles.saturation_pointer}>
    <div className={styles.top_path} />
    <div className={styles.bottom_path} />
    <div className={styles.left_path} />
    <div className={styles.right_path} />
    <div className={styles.circle} />
  </div>
);

export default SaturationPointer;
