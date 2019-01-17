/* eslint-disable */
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    namedModules: false
  },
  plugins: [
    new HotModuleReplacementPlugin(),
  ],
  devServer: {
    port: 3001,
    host: '0.0.0.0',
    hot: true,
    compress: true,
    publicPath: '/',
    stats: 'errors-only'
  },
};

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, devConfig);
};
