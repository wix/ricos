const path = require('path');

module.exports = env => {
  const BASE_PATH = path.resolve(__dirname, '..');
  const common = require('../../../config/webpack.dev.js')(env);
  common.entry.viewer = path.resolve(BASE_PATH, 'src/HtmlComponent.jsx');
  return common;
};
