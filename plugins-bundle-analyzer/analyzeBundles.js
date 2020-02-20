/* eslint-disable no-console */

const chalk = require('chalk');
const { getPackages } = require('@lerna/project');
const webpack = require('webpack');
const { getWebpackConfig } = require('./common');
const argv = require('yargs').argv;

process.on('unhandledRejection', error => {
  throw error;
});

const warning = chalk.keyword('orange');

const getAllPluginsNames = ({ skipPlugins = false }) => {
  if (skipPlugins) {
    return Promise.resolve([]);
  }
  return getPackages().then(allPackages => {
    return allPackages
      .filter(pkg => !pkg.private)
      .filter(pkg => pkg.name.indexOf('wix-rich-content-plugin') === 0)
      .map(pkg => pkg.name);
  });
};

const viewerPakages = ['viewer-without-wrapper', 'viewer-with-wrapper'];

const options = {};
const option = argv._[0];
if (option === 'skipPlugins') {
  options.skipPlugins = true;
}
console.log(JSON.stringify(options));
function run() {
  console.log(chalk.magenta('Analyzing plugins...'));
  getAllPluginsNames(options).then(pkgNames => {
    const bundleResultsPromise = pkgNames.concat(viewerPakages).map(pkgName => {
      return new Promise(resolve => {
        webpack(getWebpackConfig(pkgName), (err, stats) => {
          // Stats Object
          if (err || stats.hasErrors()) {
            const _err = err || stats.compilation.errors[0];
            console.error(chalk.red(_err));
            resolve({ name: pkgName, error: _err });
          } else {
            resolve({
              name: pkgName,
              size: Math.ceil(stats.toJson(true).assets[0].size / 1024),
            });
          }
        });
      });
    });

    Promise.all(bundleResultsPromise).then(results => {
      results.forEach(result => {
        const { size, name, error } = result;
        const prefix = chalk.cyan(`[${name}]`);
        if (error) {
          console.log(prefix, chalk.red(`Error! ${error}`));
        } else {
          const chlk = size > 500 ? warning : size > 250 ? chalk.yellow : chalk.green;
          console.log(prefix, chlk(`${size}KB`));
        }
      });
    });
  });
}

run();
