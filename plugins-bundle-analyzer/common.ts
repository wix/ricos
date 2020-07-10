import HappyPack from 'happypack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration } from 'webpack';

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
    exclude: /node_modules/,
    loader: 'happypack/loader?id=ts',
  },
];

export const getWebpackConfig = (
  pkgName: string,
  { plugins = [] }: { plugins?: BundleAnalyzerPlugin[] } = {}
): Configuration => {
  return {
    entry: `./src/${pkgName}.tsx`,
    mode: 'production',
    output: {
      filename: `${pkgName}.js`,
    },
    module: {
      rules,
    },
    plugins: [
      ...plugins,
      new HappyPack({
        id: 'ts',
        loaders: [
          {
            path: 'ts-loader',
            query: { happyPackMode: true },
          },
        ],
      }),
    ],
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
