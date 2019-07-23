const nodeExternals = require('webpack-node-externals');
const path = require('path');

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

const babelRule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: 'babel-loader',
};

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
        babelRule,
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
        babelRule,
        {
          test: /\.css$/,
          use: { loader: 'css-loader', options: { exportOnlyLocals: true } },
        },
      ],
    },
  },
];

module.exports = config;
