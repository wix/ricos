import React from 'react';
import { RicosViewer } from 'ricos-viewer';

export default () => {
  return (
    <RicosViewer _rcProps={{ config: { 'wix-draft-plugin-image': { disableExpand: true } } }} />
  );
};
