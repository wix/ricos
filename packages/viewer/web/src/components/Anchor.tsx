import React from 'react';

const Anchor = React.memo<{
  anchorKey: string;
  type?: string;
}>(({ anchorKey, type }) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <div key={anchorKey} type={type} data-hook={anchorKey} /> //'type' attribute is for wix corvid
));

export default Anchor;
