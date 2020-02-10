const argv = require('yargs').argv;
const chalk = require('chalk');
const webpack = require('webpack');
const { getWebpackConfig } = require('./common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.on('unhandledRejection', error => {
  throw error;
});
const pluginName = argv._[0];
if (!pluginName) {
  console.error(chalk.red('Must supply plugin name')); //eslint-disable-line
} else {
  const fullname = `wix-rich-content-plugin-${pluginName}`;
  console.log(chalk.magenta(`Analyzing ${fullname} plugin...`)); //eslint-disable-line

  webpack(
    getWebpackConfig(fullname, {
      plugins: [new BundleAnalyzerPlugin()],
    }),
    (err, stats) => {
      if (err || stats.hasErrors()) {
        const _err = err || stats.compilation.errors[0];
        console.error(chalk.red(_err)); //eslint-disable-line
      } else {
        console.log(chalk.green(fullname, `analyzed`)); //eslint-disable-line
      }
    }
  );
}
