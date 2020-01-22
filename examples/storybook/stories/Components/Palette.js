/* eslint-disable react/prop-types */
import React from 'react';

import './Palette.css';

const Color = ({ value, name }) => {
  return (
    <div style={{ background: value }} className="color-box">
      {name}
    </div>
  );
};

export default ({ palette }) => {
  const usedPalette = palette.slice(5);
  const getPlaceByIdx = idx => (idx % 5) * 5 + Math.floor(idx / 5);

  return (
    <div className="palette">
      {usedPalette.map((color, i) => (
        <Color {...usedPalette[getPlaceByIdx(i)]} key={'color_' + i} />
      ))}
    </div>
  );
};
