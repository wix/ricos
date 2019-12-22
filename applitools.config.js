const { execSync } = require('child_process');

let privateConfig = {};
try {
  privateConfig = require('./applitools.private.config.js');
} catch (e) {}

function getHeadHash() {
  return execSync('git rev-parse --verify HEAD')
    .toString()
    .trim();
}

module.exports = {
  ...privateConfig,
  concurrency: 200,
  batchId: getHeadHash(),
  dontCloseBatches: true,
};
