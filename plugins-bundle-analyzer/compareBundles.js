/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');

const generateMessage = message => {
  const titleForPRComment = `bundle sizes that increased by more than 10KB:\n`;
  return titleForPRComment.concat(message);
};

function saveDiff(data = []) {
  fs.writeFile('diffBundles.json', data, err => {
    if (err) throw err;
  });
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
        message = message.concat(
          `${key}: old bundlesize: ${oldSize}, current bundlesize: ${newSize}\n`
        );
      }
    }
  });
  if (message !== '') {
    console.error(chalk.bold.red(message));
    saveDiff(generateMessage(message));
    throw message;
  } else {
    saveDiff('');
    console.log('comparison ended successfully');
  }
}

compareBundles();
