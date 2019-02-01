import React from 'react';
import { render } from 'react-dom';
import getPropsFromQuery from './services/get-props-from-query';
import Viewer from '../shared/components/Viewer';

render(
  <Viewer initialState={window.__CONTENT_STATE__} {...getPropsFromQuery()}/>,
  document.getElementById('root'),
);

