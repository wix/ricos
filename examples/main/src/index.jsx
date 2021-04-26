import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RichContentApp from '../shared/RichContentApp';
import 'react-reflex/styles.css';
import './styles.global.scss';
import ExampleApp from './ExampleApp';
import { isMobile } from './utils';

const allLocales = preval`module.exports = require('./getAllLocales')`;

ReactDOM.render(
  <RichContentApp
    app={ExampleApp}
    allLocales={allLocales}
    mode="demo"
    debounce={1000}
    isMobile={isMobile()}
  />,
  document.getElementById('root')
);
registerServiceWorker();
