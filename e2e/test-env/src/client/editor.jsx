import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/components/App';
import Editor from '../shared/components/Editor';
import getPropsFromQuery from './services/get-props-from-query';

hydrate(
  <App>
    <Editor initialState={window.__CONTENT_STATE__} {...getPropsFromQuery()}/>
  </App>,
  document.getElementById('root'),
);

