const express = require('express');
const path = require('path');
const configureApp = require('./configure-app');

const startApp = port => {
  const app = express();
  configureApp(app);
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.use(require('../../dist/renderer.bundle').default());
  app.listen(port, () => console.log(`Test env server is listening on port ${port}`)); //eslint-disable-line no-console
};

startApp(3002);
