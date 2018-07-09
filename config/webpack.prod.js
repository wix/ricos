/* eslint-disable */
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
  plugins: [],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
};

module.exports = env => {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  const common = require('./webpack.common.js')(env);
  return merge(common, prodConfig);
};
