const rules = [
  {
    test: /\.js(x)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react'],
      },
    },
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          insertAt: 'top',
        },
      },
      'css-loader',
    ],
  },
  {
    test: /\.scss$/,
    exclude: /styles\.global\.scss/,
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
];

const getWebpackConfig = (pkgName, { plugins = [] } = {}) => {
  return {
    entry: `./src/${pkgName}.js`,
    mode: 'production',

    module: {
      rules,
    },
    plugins,
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: '_',
    },
  };
};

module.exports = { getWebpackConfig };
