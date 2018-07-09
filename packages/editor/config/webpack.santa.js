/* eslint-disable */
const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FILE_NAME = 'wix-rich-content-editor';

const santaConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=1&localIdentName=[local]',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SANTA: JSON.stringify(true),
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${FILE_NAME}-santa.css`
    })
  ]
};

module.exports = function(env) {
  const prodConfig = prod(env);
  prodConfig.module.rules = prodConfig.module.rules.filter(rule => rule.test.toString() !== /\.scss$/.toString())
  prodConfig.output.filename = `${FILE_NAME}-santa.js`;

  return merge(prodConfig, santaConfig);
};
