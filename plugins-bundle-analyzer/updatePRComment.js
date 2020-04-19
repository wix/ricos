/* eslint-disable no-console */
const { gitPRComment } = require('../scripts/gitPRComment');
const fs = require('fs');

const updatePRComment = () => {
  try {
    const diff = JSON.parse(fs.readFileSync('./diffBundles.json'));
    gitPRComment(diff);
  } catch (err) {
    console.log(err);
    return;
  }
};
updatePRComment();
