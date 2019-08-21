const path = require('path');

module.exports = function configure(app) {
  app.set('views', path.resolve(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  return app;
};
