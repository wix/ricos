/* eslint-disable max-len */
/* eslint-disable no-console */
const chalk = require('chalk');
const fs = require('fs');
const { gitPRComment } = require('../scripts/gitPRComment');
const { analyze } = require('./analyzeBundles');
const PleaseUpdateMsg =
  'Please update the baseline files by running locally "npm run saveBundlesSizesBaseline" and push the changes.\n';

let savingBundles = {},
  currentBundles = {},
  grewUpMessage = '',
  newBundles = '',
  grewDownMessage = '';

const generatePRComment = () => {
  let message = 'Comparison bundleSizes:\n';
  if (!grewUpMessage && !grewDownMessage && !newBundles) {
    message += 'No changes in Bundles sizes.\n';
  } else {
    if (newBundles) {
      message += `New packages found.\n`;
      message += PleaseUpdateMsg;
    } else if (grewDownMessage) {
      message += `Packages that shrank:\n${grewDownMessage}\n`;
      message += PleaseUpdateMsg;
    }

    message += grewUpMessage ? chalk.red(`Error: Packages that grew:\n${grewUpMessage}\n`) : '';
  }
  return message;
};

const updateBundleInBaselineAndMessage = ({ key, oldSize, newSize, isNewBundle }) => {
  savingBundles[key] = newSize;
  const messageType = isNewBundle ? 'newBundle' : 'grewDown';
  updateMessage(messageType, key, oldSize, newSize);
};

const updateMessage = (messageType, key, oldSize, newSize) => {
  switch (messageType) {
    case 'newBundle':
      newBundles += `${key} is added to the baseline with bundlesize: ${newSize}\n`;
      break;
    case 'grewDown':
      grewDownMessage += `${key}: ${oldSize}KB => ${newSize}KB\n`;
      break;
    case 'grewUp':
      grewUpMessage += `${key}: ${oldSize}KB => ${newSize}KB\n`;
      break;
    default:
      break;
  }
};

async function updatePRCommentAndConsole() {
  const pr_comment = generatePRComment();
  console.log(pr_comment);
  await gitPRComment(pr_comment, 'Comparison bundleSizes');

  if (grewDownMessage !== '' || newBundles !== '') {
    fs.writeFileSync(`bundlesSizesBaseline.json`, JSON.stringify(savingBundles, null, 2), 'utf8');
  }
  !pr_comment.includes('No changes')
    ? process.exit(1)
    : console.log('comparison ended successfully');
}

async function compareBundles() {
  try {
    savingBundles = JSON.parse(fs.readFileSync('./bundlesSizesBaseline.json'));
    currentBundles = await analyze();
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
        updateMessage('grewUp', key, oldSize, newSize);
      } else if (diff < 0) {
        updateBundleInBaselineAndMessage({ key, newSize, oldSize });
      }
    } else {
      updateBundleInBaselineAndMessage({ key, newSize, isNewBundle: true });
    }
  });

  updatePRCommentAndConsole();
}

compareBundles();
