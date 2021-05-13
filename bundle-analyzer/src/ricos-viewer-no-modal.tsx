import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import 'ricos-viewer/dist/styles.min.css';

export default () => {
  return (
    <RicosViewer _rcProps={{ config: { 'wix-draft-plugin-image': { disableExpand: true } } }} />
  );
};
