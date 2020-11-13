import HappyPack from 'happypack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
// import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
// import DashboardPlugin from 'webpack-dashboard/plugin';
import { BuildOptimizerWebpackPlugin } from '@angular-devkit/build-optimizer';

console.log('yaron123!');
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
    optimization: {
      minimize: false,
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new BuildOptimizerWebpackPlugin(),
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
      external: {
        i18next: 'I18Next',
        'image-client-api': 'ImageSDK',
      },
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
