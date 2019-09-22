const nodeExternals = require('webpack-node-externals');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const output = {
  path: path.resolve(__dirname, 'dist/'),
  filename: '[name].bundle.js',
};

const common = {
  mode: 'development',
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'draft-js': '@wix/draft-js',
    },
  },
};

const commonRules = [
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
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]_[local]',
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
  {
    test: /\.(woff|eot|ttf|svg|woff2)$/,
    issuer: /\.(s)?css$/,
    use: ['url-loader'],
  },
];

const config = [
  {
    ...common,
    name: 'client',
    entry: {
      combined: './src/client/combined',
      editor: './src/client/editor',
    },
    output,
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
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]',
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(woff|eot|ttf|svg|woff2)$/,
          issuer: /\.(s)?css$/,
          use: ['url-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },
  {
    ...common,
    name: 'server',
    entry: {
      renderer: './src/server/renderer',
    },
    output: {
      ...output,
      libraryTarget: 'commonjs2',
      publicPath: '/static/',
    },
    target: 'node',
    externals: [nodeExternals({ whitelist: [/.css/, /^wix-rich-content/] })],
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
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]',
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(woff|eot|ttf|svg|woff2)$/,
          issuer: /\.(s)?css$/,
          use: ['url-loader'],
        },
        {
          test: /\.css$/,
          use: { loader: 'css-loader', options: { exportOnlyLocals: true } },
        },
      ],
    },
  },
];

module.exports = config;
