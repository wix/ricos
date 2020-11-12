const { execSync } = require('child_process');

let privateConfig = {};
try {
  privateConfig = require('./applitools.private.config.js');
} catch (e) {}

function getBranchName() {
  return execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();
}

module.exports = {
  ...privateConfig,
  concurrency: 200,
  dontCloseBatches: true,
  // batchName: `LOCAL - ${getBranchName()}`,
  parentBranchName: 'wix-incubator/rich-content/master',
  branchName: `wix-incubator/rich-content/${getBranchName()}`,
};
