/* eslint-disable no-console */
const { gitPRComment } = require('../scripts/gitPRComment');
const fs = require('fs');

const generateMessage = message => {
  const titleForPRComment = `Significant differences between the bundle sizes:\n`;
  return titleForPRComment.concat(message);
};

const updatePRComment = () => {
  try {
    const diff = fs.readFileSync('diffBundles.txt', 'utf8');
    const message = diff ? generateMessage(diff) : '';
    gitPRComment(message);
  } catch (err) {
    console.log(err);
    return;
  }
};
updatePRComment();
