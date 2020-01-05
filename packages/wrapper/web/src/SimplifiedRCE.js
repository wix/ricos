import React, { Children } from 'react';

export default function SimplifiedRCE({ strategies = [], children, ...rest }) {
  const modifiedProps = strategies.reduce(
    (props, stratFunc) => Object.assign(props, stratFunc(rest)),
    rest
  );
  return Children.only(React.cloneElement(children, modifiedProps));
}
