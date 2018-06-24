/* eslint-disable */
const merge = require('webpack-merge');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    namedModules: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  serve: {
    port: 3000,
    hot: true,
    clipboard: false,
    dev: {
      publicPath: '/',
      stats: 'errors-only',
      logLevel: 'warn',
    }
  },
};

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, devConfig);
};
