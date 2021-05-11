import React from 'react';

export default props => {
  const { data } = props;
  return (
    <div>
      <img src={data.imageData.image.src.custom} alt="img component" />
    </div>
  );
};
