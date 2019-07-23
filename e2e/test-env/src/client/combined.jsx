import React from 'react';
import { hydrate } from 'react-dom';
import './app.css';
import Editor from '../shared/components/Editor';
import Viewer from '../shared/components/Viewer';

const props = { initialState: window.__CONTENT_STATE__, isMobile: window.isMobile };
const app = (
  <>
    <Editor {...props} />
    <Viewer {...props} />
  </>
);

hydrate(app, document.getElementById('root'));
