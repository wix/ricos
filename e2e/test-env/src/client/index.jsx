import { hydrate } from 'react-dom';
import React from 'react';
import RichContentApp from '../../../../examples/main/shared/RichContentApp';
import './app.css';

const props = {
  initialState: window.__CONTENT_STATE__,
  isMobile: window.isMobile,
  locale: window.locale,
};

hydrate(<RichContentApp mode={'test'} {...props} />, document.getElementById('root'));
