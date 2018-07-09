/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
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
