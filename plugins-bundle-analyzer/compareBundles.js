/* eslint-disable no-console */
const { gitPRComment } = require('../scripts/gitPRComment');
const chalk = require('chalk');
const fs = require('fs');

const generateMessage = message => {
  const titleForPRComment = `bundle sizes that increased by more than 10KB:\n`;
  return titleForPRComment.concat(message);
};

function compareBundles() {
  let savingBundles = {},
    currentBundles = {},
    message = '';

  try {
    const jsonString = fs.readFileSync('./savingBundlesSizes.json');
    savingBundles = JSON.parse(jsonString);
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
    const e = new Error(message);
    console.error(chalk.bold.red(e));
    gitPRComment(generateMessage(message));
    throw e;
  } else {
    gitPRComment('');
    console.log('comparison ended successfully');
  }
}

compareBundles();
