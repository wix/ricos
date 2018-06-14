/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const FILE_NAME = 'wix-rich-content-editor';

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        include: /\.min\.js$/,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.min\.css$/,
      })
    ]
  },
};

module.exports = function(env) {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  common.module.rules = common.module.rules.filter(rule => rule.test.toString() !== /\.scss$/.toString())
  prodConfig.entry = {
    [`${FILE_NAME}.min`]: common.entry[FILE_NAME],
  };
  return merge(common, prodConfig);
};
