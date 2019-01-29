const path = require('path');

const config = {
  entry: {
    viewer: './src/client/viewer',
    editor: './src/client/editor',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'draft-js': '@wix/draft-js',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ],
  },
  devServer: {
    compress: true,
    port: 3002,
    after (app) {
      require('./src/server/configure-app')(app);
    },
  },
  mode: 'production',
};

module.exports = config;
