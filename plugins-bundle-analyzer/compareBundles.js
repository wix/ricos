/* eslint-disable max-len */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const { gitPRComment } = require('../scripts/gitPRComment');

let savingBundles = {},
  currentBundles = {},
  grewUpMessage = '',
  newBundles = '',
  grewDownMessage = '';

const generateMessage = (grewUpMessage, grewDownMessage, newBundles) => {
  let message = `${newBundles}\n`;
  message = message.concat(
    grewDownMessage ? `There are bundle sizes that grew down:\n${grewDownMessage}\n` : ''
  );
  if (grewUpMessage) {
    message = message.concat(
      `Significant differences between the bundle sizes:\n${grewDownMessage}\n`
    );
  }
  return message;
};

const addNewBundleToBaseline = (key, newSize) => {
  savingBundles[key] = newSize;
  newBundles = newBundles.concat(`${key} is added to the baseline with bundlesize: ${newSize}\n`);
};

const updateBundleThatGrewDown = (key, diff, newSize) => {
  savingBundles[key] = newSize;
  grewDownMessage = grewDownMessage.concat(
    `The bundle size of ${key} is reduced by ${Math.abs(diff)}KB\n`
  );
};

const updateGrewUpMessage = (key, oldSize, newSize) => {
  grewUpMessage = grewUpMessage.concat(
    `${key}: old bundlesize: ${oldSize}KB, current bundlesize: ${newSize}KB\n`
  );
};

async function updatePRCommentAndConsole() {
  await gitPRComment(generateMessage(grewUpMessage, grewDownMessage, newBundles));

  if (grewDownMessage !== '' || newBundles !== '') {
    fs.writeFileSync(`bundlesSizesBaseline.json`, JSON.stringify(savingBundles, null, 2), 'utf8');
    console.log(grewDownMessage);
    console.log(newBundles);
  }

  if (grewUpMessage !== '') {
    console.error(
      chalk.red(
        `\nError: There are Significant differences between some bundle sizes:\n${grewUpMessage}`
      )
    );
    process.exit(1);
  } else {
    console.log('comparison ended successfully');
  }
}

function compareBundles() {
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
      const diff = oldSize && parseInt(newSize) - parseInt(oldSize);
      if (diff > 5) {
        updateGrewUpMessage(key, oldSize, newSize);
      } else if (diff < 0) {
        updateBundleThatGrewDown(key, diff, newSize);
      }
    } else {
      addNewBundleToBaseline(key, newSize);
    }
  });
  updatePRCommentAndConsole();
}

compareBundles();
