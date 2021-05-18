import React from 'react';
import ImageView from './image-view';

export default props => {
  console.log('image props', props);
  const { data, isSelected } = props;
  const style: Record<string, string | number> = {
    userSelect: 'none',
    width: 100,
  };
  if (isSelected) {
    style.boxShadow = '0 0 0 2px blue';
  }
  return (
    <span style={style}>
      <ImageView src={data.imageData.image.src.custom} />
    </span>
  );
};
