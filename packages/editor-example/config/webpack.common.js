const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
};

module.exports = env => ({
  entry: [
    require.resolve('./polyfills'),
    path.resolve(PATHS.src, 'index.js'),
  ],
  output: {
      path: PATHS.dist,
      filename: '[name].js',
      publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            compact: true,
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]"
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        exclude: [
          /\.(js|jsx)$/,
          /\.html$/,
          /\.json$/,
          /\.css$/,
          /\.scss$/,
        ],
        loader: "url-loader",
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Rich Content Editor',
      favicon: './public/favicon.ico',
      template: './public/index.html',
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no',
      }
    }),
    new CopyWebpackPlugin([{
      from: '**/*',
      context: 'node_modules/wix-rich-content-plugin-html/dist/static/',
      to: 'static/',
    }]),
  ],
});
