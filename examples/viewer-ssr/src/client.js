import 'regenerator-runtime/runtime';
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { wixAxiosConfig } from 'wix-axios-config';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/client-i18n';
import App from './components/App';

const initialI18n = window.__INITIAL_I18N__;
const baseURL = window.__BASEURL__;

wixAxiosConfig(axios, { baseURL });

ReactDOM.render(
  <I18nextProvider i18n={i18n(initialI18n)}>
    <App />
  </I18nextProvider>,
  document.getElementById('root'),
);
