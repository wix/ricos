const { execSync } = require('child_process');

let privateConfig = {};
try {
  privateConfig = require('./applitools.private.config.js');
} catch (e) {}

function getGithubBranchName() {
  const isPullRequest = !!process.env.GITHUB_HEAD_REF;
  return isPullRequest
    ? process.env.GITHUB_HEAD_REF
    : process.env.GITHUB_REF.split('/')
        .slice(2)
        .join('/')
        .replace(/\//g, '-');
}

function getLocalBranchName() {
  return (
    'LOCAL - ' +
    execSync('git rev-parse --abbrev-ref HEAD')
      .toString()
      .trim()
  );
}

function getBranchName() {
  return process.env.CI ? getGithubBranchName() : getLocalBranchName();
}

module.exports = {
  ...privateConfig,
  concurrency: 200,
  dontCloseBatches: true,
  batchName: getBranchName(),
  batchId: process.env.COMMIT_SHA || Math.random().toString(),
  parentBranchName: 'wix/ricos/master',
  branchName: `wix/ricos/${getBranchName()}`,
  showLogs: false,
};
