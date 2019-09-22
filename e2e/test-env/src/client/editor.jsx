import React from 'react';
import { hydrate } from 'react-dom';
import './app.css';
import Editor from '../../../../examples/main/src/editor/Editor.jsx';

const props = {
  initialState: window.__CONTENT_STATE__,
  isMobile: window.isMobile,
  locale: window.locale,
};
const app = <Editor {...props} />;

hydrate(app, document.getElementById('root'));
