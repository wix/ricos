import React from 'react';
import { render } from 'react-dom';
import Editor from '../shared/components/Editor';
import getPropsFromQuery from './services/get-props-from-query';

render(
  <Editor raw={window.__CONTENT_STATE__} {...getPropsFromQuery()}/>,
  document.getElementById('root'),
);

