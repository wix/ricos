import React from 'react';

/* eslint-disable react/prop-types */
export const withResizeHandlers = Component => ({
  onMouseDown,
  onMouseMove,
  onMouseLeave,
  style,
  ...rest
}) => (
  <div
    role="none"
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    style={{ ...style, minWidth: '100px' }}
  >
    <Component {...rest} />
  </div>
);
/* eslint-enable react/prop-types */
