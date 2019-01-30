import React from 'react';
import { render } from 'react-dom';
import { RichContentViewer } from 'wix-rich-content-viewer';
import getPropsFromQuery from './services/get-props-from-query';

render(
  <RichContentViewer initialState={window.__CONTENT_STATE__} {...getPropsFromQuery()} />,
  document.getElementById('root'),
);

