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
          insert: 'top',
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
  {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  },
];

export const getWebpackConfig = (
  pkgName: string,
  { plugins = [] }: { plugins?: import('webpack-bundle-analyzer').BundleAnalyzerPlugin[] } = {}
): import('webpack').Configuration => {
  return {
    entry: `./src/${pkgName}.tsx`,
    mode: 'production',
    output: {
      filename: `${pkgName}.js`,
    },
    module: {
      rules,
    },
    plugins,
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      lodash: '_',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
};
