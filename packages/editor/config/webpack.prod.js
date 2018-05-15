/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]', 'sass-loader'],
        }),
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        output: {
          beautify: false,
        },
      },
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};

module.exports = function(env) {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  common.module.rules = common.module.rules.filter(rule => rule.test.toString() !== /\.scss$/.toString())
  return merge(common, prodConfig);
};
