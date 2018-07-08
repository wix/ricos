const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  root: path.join(__dirname, '..'),
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
      chunkFilename: '[name].js',
      publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'draft-js': path.resolve(__dirname, '..', '..', '..', 'node_modules', '@wix', 'draft-js'),
    },
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
            extends: path.resolve(PATHS.root, '..', '..', '.babelrc.js')
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
        test: /\.(png|jpg|gif)$/,
        issuer: /\.(s)?css$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|eot|ttf|svg|woff2)$/,
        issuer: /\.(s)?css$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: /\.js(x)?$/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-react"]
            }
          },
          {
            loader: 'react-svg-loader',
            query: JSON.stringify({
              jsx: true,
              svgo: {
                plugins: [
                  { cleanupIDs: false },
                  { removeViewBox: false },
                  { removeDimensions: true },
                ],
              },
            }),
          },
        ],
      },
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
