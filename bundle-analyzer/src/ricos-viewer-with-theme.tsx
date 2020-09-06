import React from 'react';
import { RicosViewer } from 'ricos-viewer';
import { createTheme } from 'ricos-theme';
export default () => {
  return <RicosViewer theme={createTheme()} />;
};
