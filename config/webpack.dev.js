const merge = require('webpack-merge');

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
  });
};
