const path = require('path');

const getFixture = (fixtureName) => {
  try {
    return require(`./fixtures/${fixtureName}`);
  } catch (error) {
    console.error(`Could not load ${fixtureName} fixture`);
    console.error(error);
  }
};

module.exports = function configure(app) {
  app.set('views', path.resolve(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.sendStatus(200);
  });

  app.get('/rce', (req, res) => {
    res.render('index', { contentState: null, bundleName: 'editor' });
  });

  app.get('/rce/:fixtureName', (req, res) => {
    const contentState = getFixture(req.params.fixtureName);
    if (!contentState) {
      return res.sendStatus(404);
    }

    res.render('index', { contentState, bundleName: 'editor' });
  });

  app.get('/rcv/:fixtureName', (req, res) => {
    const contentState = getFixture(req.params.fixtureName);
    if (!contentState) {
      return res.sendStatus(404);
    }

    res.render('index', { contentState, bundleName: 'viewer' });
  });

  return app;
};
