import React from 'react';

import styles from './Palette.scss';

const Color = ({ value, name }) => {
  return (
    <div style={{ background: value }} className={styles.colorBox}>
      {name}
    </div>
  );
};

export default ({ palette }) => {
  const usedPalette = palette.slice(5);
  const getPlaceByIdx = idx => (idx % 5) * 5 + Math.floor(idx / 5);

  return (
    <div className={styles.palette}>
      {usedPalette.map((color, i) => (
        <Color {...usedPalette[getPlaceByIdx(i)]} key={'color_' + i} />
      ))}
    </div>
  );
};
