import { argv } from 'yargs';
import chalk from 'chalk';
import webpack from 'webpack';
import { getWebpackPluginConfig } from './webpack.common';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

process.on('unhandledRejection', error => {
  throw error;
});
const pluginName = argv._[0];
if (!pluginName) {
  console.error(chalk.red('Must supply plugin name')); //eslint-disable-line
} else {
  console.log(chalk.magenta(`Analyzing ${pluginName} plugin...`)); //eslint-disable-line

  webpack(
    getWebpackPluginConfig(pluginName, {
      plugins: [new BundleAnalyzerPlugin()],
    }),
    (err, stats) => {
      if (err || stats.hasErrors()) {
        const _err = err || stats.compilation.errors[0];
        console.error(chalk.red(_err)); //eslint-disable-line
      } else {
        console.log(chalk.green(pluginName, `analyzed`)); //eslint-disable-line
      }
    }
  );
}
