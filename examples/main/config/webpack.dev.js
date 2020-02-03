/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');

const PATHS = {
  monorepo_root: path.join(__dirname, '..', '..', '..'),
};

const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'react-hot-loader': path.resolve(PATHS.monorepo_root, 'node_modules', 'react-hot-loader'),
      'react-dom': path.resolve(PATHS.monorepo_root, 'node_modules', '@hot-loader', 'react-dom'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: true,
            rootMode: 'upward',
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: [/node_modules.*node_modules/, /node_modules\/monaco-editor/,
          /node_modules\/@wix\/web-bi-logger/, /node_modules\/@wix\/bi-logger-rich-editor/],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    port: 3000,
    open: true,
    host: 'localhost',
    hot: true,
    compress: true,
    publicPath: '/',
    stats: 'errors-only',
    disableHostCheck: true,
  },
};

module.exports = env => {
  const common = require('./webpack.common.js')(env);
  return merge(common, devConfig);
};
