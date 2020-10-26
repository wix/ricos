/* eslint-disable */
const merge = require('webpack-merge').merge;
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  mode: 'production',
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
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /styles\.global\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})],
  },
};

module.exports = env => {
  if (env && env.analyzeBundle) {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
  }
  const common = require('./webpack.common.js')(env);
  common.module.rules = common.module.rules.filter(
    rule => rule.test && rule.test.toString() !== /\.scss$/.toString()
  );
  return merge(common, prodConfig);
};
