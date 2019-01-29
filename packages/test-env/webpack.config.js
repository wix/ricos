const path = require('path');

const config = {
  entry: './src/client',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js',
  },
  mode: 'development',
  devServer: {
    compress: true,
    port: 3002,
    after (app) {
      require('./src/server/configure-app')(app);
    },
  },
};

module.exports = config;
