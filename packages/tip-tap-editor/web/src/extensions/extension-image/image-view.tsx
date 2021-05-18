import React from 'react';

export default props => {
  const { src } = props;
  return (
    <span>
      <img src={src} alt="img component" style={{ width: '100%' }} />
    </span>
  );
};
