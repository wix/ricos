const semver = require('semver');
const execSync = require('child_process').execSync;
const { get, memoize } = require('lodash');

const LATEST_TAG = 'latest';
const NEXT_TAG = 'next';
const OLD_TAG = 'old';

const isLessThanLatest = (version, latestVersion) => semver.lt(version, latestVersion);

const getPackageDetails = memoize(pkg => {
  try {
    const npmShowCommand = `npm show ${pkg.name} --registry=${pkg.registry} --json`;
    return JSON.parse(execSync(npmShowCommand, { stdio: ['pipe', 'pipe', 'ignore'] }));
  } catch (error) {
    console.log(error);
    if (error.stdout && !error.stdout.toString().includes('E404')) {
      console.error(chalk.red(`\nError: ${error}`));
    }
  }
});
function getLatestVersion(pkg) {
  const pgkDetails = getPackageDetails(pkg);
  return get(pgkDetails, 'dist-tags.latest');
}

function getPublishedVersions(pkg) {
  return get(getPackageDetails(pkg), 'versions', []);
}

function getTag(pkg) {
  const { NPM_TAG } = process.env;
  if (NPM_TAG) {
    return NPM_TAG;
  }
  const latestVersion = getLatestVersion(pkg);
  return calcTag(pkg.version, latestVersion);
}

function calcTag(version, latestVersion) {
  if (latestVersion && isLessThanLatest(version, latestVersion)) {
    return OLD_TAG;
  }

  const prereleaseArr = semver.prerelease(version);
  if (prereleaseArr !== null) {
    const preRelease = prereleaseArr[0];
    if (preRelease === 'alpha') {
      return NEXT_TAG;
    } else {
      return preRelease;
    }
  }

  return LATEST_TAG;
}

const isLatest = tag => tag === LATEST_TAG;

module.exports = {
  getPublishedVersions,
  getTag,
  calcTag,
  isLatest,
  NEXT_TAG,
};
