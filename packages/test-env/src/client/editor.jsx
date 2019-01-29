import React from 'react';
import { render } from 'react-dom';
import Editor from './components/Editor';

render(
  <Editor raw={window.__CONTENT_STATE__}/>,
  document.getElementById('root'),
);

