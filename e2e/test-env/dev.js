const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('./webpack.config');
const configureApp = require('./src/server/configure-app');

const start = () => {
  const app = express();
  const multiCompiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(multiCompiler, {
      publicPath: '/',
      serverSideRender: true,
    })
  );

  configureApp(app);
  app.use(webpackHotServerMiddleware(multiCompiler, { chunkName: 'renderer' }));

  app.listen(3002, () => {
    console.log(`Test env server is listening on port 3002`);
  });
};

start();
