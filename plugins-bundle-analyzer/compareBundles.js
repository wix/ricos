/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');

function saveDiff(
  data,
  callback = err => {
    if (err) throw err;
  }
) {
  fs.writeFile('diffBundles.txt', data, callback);
}

function compareBundles() {
  let savingBundles = {},
    currentBundles = {},
    message = '';
  try {
    savingBundles = JSON.parse(fs.readFileSync('./savingBundlesSizes.json'));
    currentBundles = JSON.parse(fs.readFileSync('./bundleSizes.json'));
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(chalk.magenta('compares bundle sizes to baseline...'));
  Object.keys(currentBundles).forEach(key => {
    const oldSize = savingBundles[key];
    const newSize = currentBundles[key];
    if (newSize !== oldSize) {
      if (parseInt(newSize) - parseInt(oldSize) > 10) {
        const diff = `${key}: old bundlesize: ${oldSize}, current bundlesize: ${newSize}\n`;
        message = message.concat(diff);
      }
    }
  });

  if (message !== '') {
    console.error(chalk.bold.red(message));
    saveDiff(message, () => {
      throw message;
    });
  } else {
    saveDiff(message);
    console.log('comparison ended successfully');
  }
}

compareBundles();
