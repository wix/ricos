const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  const FILE_NAME = env.FILE_NAME;
  const BASE_PATH = path.resolve(__dirname, '..', 'packages', FILE_NAME.replace('wix-rich-content-', ''));

  return {
    entry: {
      [env.FILE_NAME]: path.resolve(BASE_PATH, 'src/'),
    },
    output: {
      path: path.resolve(BASE_PATH, 'dist'),
      filename: `[name].js`,
      library: FILE_NAME,
      libraryTarget: 'umd',
      globalObject: 'typeof self !== \'undefined\' ? self : this', //https://github.com/webpack/webpack/issues/6522
    },
    optimization: {
      namedModules: false,
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
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
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
      extensions: ['.js', '.json', '.jsx', '.scss', '.css'],
      alias: {
        'draft-js': path.resolve(__dirname, '..', 'node_modules', '@wix', 'draft-js'),
      },
    },
    context: BASE_PATH,
    target: 'web',
    externals: [
      'lodash',
      'react',
      'react-dom',
      'classnames',
      'decorate-component-with-props',
      'wix-rich-content-common',
      /^pro-gallery-renderer.*$/,
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
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new CopyWebpackPlugin([{
        from: '**/*',
        context: 'src/static',
        to: 'static/',
      }]),
    ],
  };
};
