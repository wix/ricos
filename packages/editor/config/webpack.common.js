const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FILE_NAME = 'wix-rich-content-editor';
const BASE_PATH = path.resolve(__dirname, '..');
const ROOT_DIR = path.resolve(BASE_PATH, '..', '..');

module.exports = {
  entry: path.resolve(BASE_PATH, 'src', 'index.js'),
  output: {
    path: path.resolve(BASE_PATH, 'dist'),
    filename: `${FILE_NAME}.js`,
    publicPath: '/assets/',
    library: FILE_NAME,
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(BASE_PATH, 'src')],
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
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
        test: /\.(woff|eot|ttf|woff2)$/,
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
        include: [path.resolve(BASE_PATH, 'src')],
        loaders: [
          {
            loader: 'babel-loader',
            query: 'presets=react',
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
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(BASE_PATH, 'src')],
    extensions: ['.js', '.json', '.jsx', '.css'],
    alias: {
      'draft-js': path.resolve(ROOT_DIR, 'node_modules', '@wix', 'draft-js'),
    },
  },
  performance: {
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  context: BASE_PATH,
  target: 'web',
  externals: [
    'react',
    'react-dom',
    'immutable',
    {
      'draft-js': {
        root: 'Draft',
        commonjs2: '@wix/draft-js',
        commonjs: '@wix/draft-js',
        amd: '@wix/draft-js',
        umd: '@wix/draft-js',
      },
      '@wix/draft-js': {
        root: 'Draft',
        commonjs2: '@wix/draft-js',
        commonjs: '@wix/draft-js',
        amd: '@wix/draft-js',
        umd: '@wix/draft-js',
      }
    }
  ],
  stats: 'errors-only',
  plugins: [new ExtractTextPlugin(`${FILE_NAME}.css`)],
};
