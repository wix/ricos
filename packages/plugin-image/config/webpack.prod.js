/* eslint-disable */
const path = require('path');

module.exports = env => {
  const BASE_PATH = path.resolve(__dirname, '..');
  const common = require('../../../config/webpack.prod.js')(env);
  common.entry.viewer = path.resolve(BASE_PATH, 'src/image-viewer.jsx');
  return common;
};
