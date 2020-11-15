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
          importLoaders: 1,
          modules: {
            localIdentName: '[name]_[local]',
          },
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
  entry: string,
  output: string,
  { plugins = [] }: { plugins?: BundleAnalyzerPlugin[] } = {}
): Configuration => {
  return {
    entry,
    mode: 'production',
    output: {
      filename: `${output}.js`,
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
      'image-client-api': 'image-client-api',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
};

export const getWebpackPluginConfig = (
  pkgName: string,
  { plugins = [] }: { plugins?: BundleAnalyzerPlugin[] } = {}
): Configuration => {
  return getWebpackConfig(`./src/${pkgName}.tsx`, pkgName, { plugins });
};
