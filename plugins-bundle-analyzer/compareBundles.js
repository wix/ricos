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

const generatePRComment = () => {
  let message = newBundles
    ? 'New package found.\nPlease update the baseline file by running locally "npm run analyzeBundles" and push the changes.\n\n'
    : '';
  message = message.concat(grewDownMessage ? `Packages that shrank:\n${grewDownMessage}\n` : '');

  !newBundles &&
    grewDownMessage &&
    (message = message.concat(
      'Please update the baseline file by running locally "npm run analyzeBundles" and push the changes.\n'
    ));

  if (grewUpMessage) {
    message = message.concat(chalk.red(`Error: Packages that grew:\n${grewUpMessage}\n`));
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
      newBundles = newBundles.concat(
        `${key} is added to the baseline with bundlesize: ${newSize}\n`
      );
      break;
    case 'grewDown':
      grewDownMessage = grewDownMessage.concat(`${key}: ${oldSize}KB => ${newSize}KB\n`);
      break;
    case 'grewUp':
      grewUpMessage = grewUpMessage.concat(`${key}: ${oldSize}KB => ${newSize}KB\n`);
      break;
    default:
      break;
  }
};

async function updatePRCommentAndConsole() {
  const pr_comment = generatePRComment();
  console.log(pr_comment);
  await gitPRComment(pr_comment);

  if (grewDownMessage !== '' || newBundles !== '') {
    fs.writeFileSync(`bundlesSizesBaseline.json`, JSON.stringify(savingBundles, null, 2), 'utf8');
  }
  grewUpMessage !== '' ? process.exit(1) : console.log('comparison ended successfully');
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
