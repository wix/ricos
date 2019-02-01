const nodeExternals = require('webpack-node-externals');
const path = require('path');

const output = {
  path: path.resolve(__dirname, 'dist/'),
  filename: '[name].bundle.js',
};

const resolve = {
  extensions: ['.js', '.jsx'],
  alias: {
    'draft-js': '@wix/draft-js',
  },
};

const babelRule = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: 'babel-loader',
};

const config = [
  {
    name: 'client',
    entry: {
      viewer: './src/client/viewer',
      editor: './src/client/editor',
    },
    output,
    resolve,
    module: {
      rules: [
        babelRule,
        {
          test: /\.css$/,
          include: /packages\/test-env/,
          use: ['style-loader', { loader: 'css-loader', options: { modules: true } }],
        },
        {
          test: /\.min\.css$/,
          exclude: /packages\/test-env/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    mode: 'production',
  },
  {
    name: 'server',
    entry: {
      renderer: './src/server/renderer',
    },
    output: {
      ...output,
      libraryTarget: 'commonjs2',
      publicPath: '/static/'
    },
    resolve,
    target: 'node',
    externals: [nodeExternals({ whitelist: [/.css/ , /^wix-rich-content/] })],
    module: {
      rules: [
        babelRule,
        {
          test: /\.css$/,
          include: /packages\/test-env/,
          use: { loader: 'css-loader', options: { modules: true, exportOnlyLocals: true } },
        },
        {
          test: /\.css$/,
          exclude: /packages\/test-env/,
          use: { loader: 'css-loader', options: { exportOnlyLocals: true } },
        },
      ],
    },
    mode: 'production',
  },
];

module.exports = config;
