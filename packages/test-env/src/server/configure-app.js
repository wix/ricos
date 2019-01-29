const path = require('path');

const getFixture = (packageName, fixtureName) => {
  try {
    return require(`../../../${packageName}/e2e/fixtures/${fixtureName}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = function configure(app) {
  app.set('views', path.resolve(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/e', (req, res) => {
    res.render('index', { contentState: null, bundleName: 'editor' });
  });

  app.get('/e/:packageName/:fixtureName', (req, res) => {
    const contentState = getFixture(req.params.packageName, req.params.fixtureName);
    if (!contentState) {
      return res.sendStatus(404);
    }

    res.render('index', { contentState: null, bundleName: 'editor' });
  });

  app.get('/v/:packageName/:fixtureName', (req, res) => {
    const contentState = getFixture(req.params.packageName, req.params.fixtureName);
    if (!contentState) {
      return res.sendStatus(404);
    }

    res.render('index', { contentState, bundleName: 'viewer' });
  });

  return app;
};
