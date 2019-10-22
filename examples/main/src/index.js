import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import RichContentApp from '../shared/RichContentApp';
import 'react-reflex/styles.css';
import './styles.global.scss';

const allLocales = preval`module.exports = require('./getAllLocales')`;

ReactDOM.render(
  <RichContentApp allLocales={allLocales} mode="demo" />,
  document.getElementById('root')
);
registerServiceWorker();
