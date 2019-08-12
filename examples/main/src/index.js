import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-reflex/styles.css';
import './styles.global.scss';

const allLocales = preval`module.exports = require('./getAllLocales')`;

ReactDOM.render(<App allLocales={allLocales} />, document.getElementById('root'));
registerServiceWorker();
