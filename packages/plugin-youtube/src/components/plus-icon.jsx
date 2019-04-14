import React from 'react';
import styles from '../../statics/styles/plus-icon.scss';
const PlusIcon = () => {
  return (
    <div className={styles.PlusIcon_container}>
      <div className={styles.PlusIcon_vertical} />
      <div className={styles.PlusIcon_horizontal} />
    </div>
  );
};

export default PlusIcon;
