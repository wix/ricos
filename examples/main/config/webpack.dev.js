/* eslint-disable */
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    namedModules: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: /node_modules.*node_modules/,
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    compress: true,
    publicPath: '/',
    stats: 'errors-only',
  },
};

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, devConfig);
};
