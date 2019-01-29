import React from 'react';
import { render } from 'react-dom';
import { RichContentViewer } from 'wix-rich-content-viewer';

render(
  <RichContentViewer initialState={window.__CONTENT_STATE__} />,
  document.getElementById('root'),
);

