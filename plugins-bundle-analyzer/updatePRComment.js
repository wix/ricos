/* eslint-disable no-console */
const { gitPRComment } = require('../scripts/gitPRComment');
const fs = require('fs');

const generateMessage = message => {
  const titleForPRComment = `bundle sizes that increased by more than 10KB:\n`;
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
