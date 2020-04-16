/* eslint-disable no-console */
const github = require('@actions/github');
const chalk = require('chalk');
const fs = require('fs');

function compareBundles() {
  let savingBundles = {},
    currentBundles = {};
  try {
    const jsonString = fs.readFileSync('./savingBundlesSizes.json');
    savingBundles = JSON.parse(jsonString);
    currentBundles = JSON.parse(fs.readFileSync('./bundleSizes.json'));
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(chalk.magenta('compare bundle sizes...'));
  Object.keys(currentBundles).forEach(key => {
    const oldSize = savingBundles[key];
    const newSize = currentBundles[key];
    if (newSize !== oldSize) {
      if (parseInt(newSize) - parseInt(oldSize) > 10) {
        const e = new Error(
          `${key} increased by more than 10KB(old bundlesize: ${oldSize}, current bundlesize: ${newSize})`
        );
        console.error(chalk.bold.red(e));
        throw e;
      }
    }
  });
}

compareBundles();
