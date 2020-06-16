import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { RichContentViewer } from 'wix-rich-content-viewer';

const helpers = {
  onExpand: () => {},
};

export default () => {
  return (
    <RicosViewer>
      <RichContentViewer helpers={helpers} />
    </RicosViewer>
  );
};
