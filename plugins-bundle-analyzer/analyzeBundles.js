/* eslint-disable no-console */

const chalk = require('chalk');
const { getPackages } = require('@lerna/project');
const webpack = require('webpack');
const { getWebpackConfig } = require('./common');

process.on('unhandledRejection', error => {
  throw error;
});

function run() {
  console.log(chalk.magenta('Analyzing plugins...'));
  // console.log('analyzing plugins');

  const additionalPackages = ['viewer-without-wrapper', 'viewer-with-wrapper'];

  getPackages().then(allPackages => {
    const pkgNames = allPackages
      .filter(pkg => !pkg.private)
      .filter(pkg => pkg.name.indexOf('wix-rich-content-plugin') === 0)
      .map(pkg => pkg.name);

    const promiseArr = pkgNames.concat(additionalPackages).map(pkgName => {
      return new Promise(resolve => {
        webpack(getWebpackConfig(pkgName), (err, stats) => {
          // Stats Object
          if (err || stats.hasErrors()) {
            const _err = err || stats.compilation.errors[0];
            console.error(chalk.red(_err));
            resolve({ name: pkgName, error: _err });
          } else {
            // console.log(chalk.green(pkg.name, `analyzed`));
            // console.log(stats.toString({ colors: true }));
            resolve({
              name: pkgName,
              size: Math.ceil(stats.toJson(true).assets[0].size / 1024),
            });
          }
        });
        // console.log(chalk.yellow(`Pkg`, JSON.stringify(getPackageDetails(pkg))));
      });
    });

    const warning = chalk.keyword('orange');

    Promise.all(promiseArr).then(results => {
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
