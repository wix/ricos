/* eslint-disable max-len */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const { gitPRComment } = require('../scripts/gitPRComment');

const generateMessage = message => {
  const titleForPRComment = `Significant differences between the bundle sizes:\n`;
  return titleForPRComment.concat(message);
};

async function compareBundles() {
  let savingBundles = {},
    currentBundles = {},
    message = '';
  try {
    savingBundles = JSON.parse(fs.readFileSync('./bundlesSizesBaseline.json'));
    currentBundles = JSON.parse(fs.readFileSync('./bundleSizes.json'));
  } catch (err) {
    console.log(err);
    return;
  }
  console.log(chalk.magenta('compares bundle sizes to baseline...'));
  Object.keys(currentBundles).forEach(key => {
    const oldSize = savingBundles[key];
    const newSize = currentBundles[key];
    if (oldSize) {
      if (newSize !== oldSize && parseInt(newSize) - parseInt(oldSize) > 5) {
        const diff = `${key}: old bundlesize: ${oldSize}KB, current bundlesize: ${newSize}KB\n`;
        message = message.concat(diff);
      }
    } else {
      const warning = `${key} is missing in 'bundlesSizesBaseline.json' (Please add it to this file), current bundlesize: ${newSize}\n`;
      message = warning.concat(message);
    }
  });
  if (message !== '') {
    console.error(chalk.bold.red(message));
    await gitPRComment(generateMessage(message), 'compare');
    console.error(
      chalk.red(`\nError: There are Significant differences between some bundle sizes:\n${message}`)
    );
    process.exit(1);
  } else {
    await gitPRComment(message, 'compare');
    console.log('comparison ended successfully');
  }
}

compareBundles();
