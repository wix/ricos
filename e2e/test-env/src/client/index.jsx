import { hydrate } from 'react-dom';
import React from 'react';
import RichContentApp from '../../../../examples/main/shared/RichContentApp';
import TestApp from './TestApp';
import IsolatedTestApp from './IsolatedTestApp';

import './app.css';

const compMap = { rce: TestApp, 'rce-isolated': IsolatedTestApp };

const props = {
  initialState: window.__CONTENT_STATE__,
  isMobile: window.isMobile,
  locale: window.locale,
};

hydrate(
  <RichContentApp app={compMap[window.compId]} mode={'test'} {...props} />,
  document.getElementById('root')
);
