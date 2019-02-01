import React from 'react';
import { render } from 'react-dom';
import App from '../shared/components/App';
import Editor from '../shared/components/Editor';
import getPropsFromQuery from './services/get-props-from-query';

render(
  <App>
    <Editor raw={window.__CONTENT_STATE__} {...getPropsFromQuery()}/>
  </App>,
  document.getElementById('root'),
);

