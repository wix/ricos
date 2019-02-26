import 'regenerator-runtime/runtime';
import React from 'react';
import { renderToString } from 'react-dom/server';
import wixRunMode from 'wix-run-mode';
import ejs from 'ejs';
import serialize from 'serialize-javascript';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/server-i18n';
import i18nMiddleware from './i18n/middleware-i18n';
import App from './components/App';
import wixExpressCsrf from 'wix-express-csrf';
import wixExpressRequireHttps from 'wix-express-require-https';
import { readFileSync } from 'fs';

module.exports = (app, context) => {
  const config = context.config.load('viewer-ssr');
  const templatePath = './src/index.ejs';
  const indexTemplate = readFileSync(templatePath, 'utf8');
  const isProduction = wixRunMode.isProduction();

  app.use(i18nMiddleware(i18n));
  app.use(wixExpressCsrf());
  app.use(wixExpressRequireHttps);

  app.get('/', (req, res) => {
    const renderModel = {
      ...getRenderModel(req),
      ...getComponentRenderingData(req),
    };
    const html = ejs.render(indexTemplate, renderModel, {
      cache: isProduction,
      filename: templatePath,
    });
    res.send(html);
  });

  function getRenderModel(req) {
    return {
      locale: req.aspects['web-context'].language,
      basename: req.aspects['web-context'].basename,
      debug: req.aspects['web-context'].debug || process.env.NODE_ENV === 'development',
      clientTopology: config.clientTopology,
      title: 'Wix Universal Project Boilerplate',
    };
  }

  function getComponentRenderingData(req) {
    const appHtml = renderToString(
      <I18nextProvider i18n={req.i18n}>
        <App />
      </I18nextProvider>
    );

    return {
      i18nResources: req.i18n.getResourceBundle(req.i18n.language),
      appHtml,
      serialize,
    };
  }

  return app;
};
