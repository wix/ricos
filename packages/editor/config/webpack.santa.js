/* eslint-disable */
const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FILE_NAME = 'wix-rich-content-editor';
const BASE_PATH = path.resolve(__dirname, '..');

const santaConfig = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: [path.resolve(BASE_PATH, 'src')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[local]', 'sass-loader'],
        }),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production"),
        SANTA: JSON.stringify(true),
      }
    }),
    new ExtractTextPlugin(`${FILE_NAME}-santa.css`)
  ]
};

module.exports = function(env) {
  const prodConfig = prod(env);
  prodConfig.module.rules = prodConfig.module.rules.filter(rule => rule.test.toString() !== /\.scss$/.toString())
  prodConfig.output.filename = `${FILE_NAME}-santa.js`;

  return merge(prodConfig, santaConfig);
};
