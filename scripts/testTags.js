/* eslint-disable no-console */

const chalk = require('chalk');
const pkgUtils = require('./pkgUtils');
const { getPackages } = require('@lerna/project');

function getPackagesTags() {
  getPackages().then(allPackages => {
    allPackages
      .filter(pkg => !pkg.private)
      .forEach(pkg => {
        const tag = pkgUtils.getTag(pkg);
        console.log({ tag });
      });
  });
}

function run() {
  console.log(chalk.yellow(`Testing tags:`));
  getPackagesTags();
}

run();
