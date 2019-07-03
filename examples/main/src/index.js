import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-reflex/styles.css';
import './styles.global.scss';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
