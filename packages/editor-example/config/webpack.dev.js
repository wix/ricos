/* eslint-disable */
const merge = require('webpack-merge');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    namedModules: false
  },
  serve: {
    port: 3000,
    hot: true,
    clipboard: false,
    dev: {
      publicPath: '/',
      stats: 'errors-only',
    }
  },
};

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, devConfig);
};
