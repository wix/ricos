const nodeExternals = require('webpack-node-externals');
const path = require('path');

const output = {
  path: path.resolve(__dirname, 'dist/'),
  filename: '[name].bundle.js',
  chunkFilename: '[chunkhash].bundle.js',
  publicPath: '/',
};

const common = {
  mode: 'development',
  devtool: 'eval-source-map',
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '~',
    },
  },
};

const babelRule = {
  test: /\.js(x)?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      compact: true,
      rootMode: 'upward',
    },
  },
};

const scssRule = {
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
};

const scssServerRule = { ...scssRule, use: [...scssRule.use] };
scssServerRule.use.shift();

const urlRule = {
  test: /\.(woff|eot|ttf|svg|woff2)$/,
  issuer: /\.(s)?css$/,
  use: ['url-loader'],
};

const config = [
  {
    ...common,
    name: 'client',
    entry: {
      index: './src/client/index',
    },
    output,
    module: {
      rules: [
        babelRule,
        scssRule,
        urlRule,
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
        scssServerRule,
        urlRule,
        {
          test: /\.css$/,
          use: { loader: 'css-loader', options: { exportOnlyLocals: true } },
        },
      ],
    },
  },
];

module.exports = config;
