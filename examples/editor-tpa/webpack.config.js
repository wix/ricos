const path = require('path');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    index: './index',
    modal: './modal',
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'wix-rich-content-editor': 'WixRichContentEditor',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-2', 'react'],
          plugins: ['transform-class-properties'],
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
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loaders: ['url-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 4200,
    publicPath: '/dist/',
  },
  devtool: 'source-map',
};
