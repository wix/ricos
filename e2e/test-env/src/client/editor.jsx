import React from 'react';
import { hydrate } from 'react-dom';
import Editor from '../../../../examples/main/src/editor/Editor';
import './app.css';

const props = {
  initialState: window.__CONTENT_STATE__,
  isMobile: window.isMobile,
  locale: window.locale,
};
const app = (
  <>
    Editor
    <Editor {...props} />
  </>
);

hydrate(app, document.getElementById('root'));
