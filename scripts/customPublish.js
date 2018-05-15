/* eslint-disable no-console */

const path = require('path');
const execSync = require('child_process').execSync;
const fs = require('fs');
const glob = require('glob');
const chalk = require('chalk');
const semver = require('semver');
const memoize = require('lodash/memoize');
const get = require('lodash/get');

const DEFAULT_REGISTRY = 'https://registry.npmjs.org/';
const LATEST_TAG = 'latest';
const NEXT_TAG = 'next';
const OLD_TAG = 'old';

const lernaJsonPath = path.resolve('./lerna.json');
const lernaConfig = require(lernaJsonPath);

const getPackageDetails = memoize(pkg => {
  try {
    return JSON.parse(
      execSync(`npm show ${pkg.name} --registry=${pkg.registry} --json`),
    );
  } catch (error) {
    if (error.stderr.toString().includes('npm ERR! code E404')) {
      console.error(
        chalk.red(
          '\nError: package not found. Possibly not published yet, please verify that this package is published to npm.',
        ),
      );
    }
  }
});

function getPublishedVersions(pkg) {
  return getPackageDetails(pkg).versions || [];
}

function getLatestVersion(pkg) {
  return get(getPackageDetails(pkg), 'dist-tags.latest');
}

function shouldPublishPackage(pkg) {
  const remoteVersionsList = getPublishedVersions(pkg);

  return !remoteVersionsList.includes(pkg.version);
}

function getTag(pkg) {
  const isLessThanLatest = () => semver.lt(pkg.version, getLatestVersion(pkg));

  const isPreRelease = () => semver.prerelease(pkg.version) !== null;

  // if the version is less than the version tagged as latest in the registry
  if (isLessThanLatest()) {
    return OLD_TAG;
  }

  // if it's a prerelease use the next tag
  if (isPreRelease()) {
    return NEXT_TAG;
  }

  return LATEST_TAG;
}

function publish(pkg) {
  const publishCommand = `npm publish --tag=${getTag(pkg)} --registry=${pkg.registry}`;

  if (!process.env.IS_BUILD_AGENT) {
    console.log(
      chalk.yellow(`${pkg.name}@${pkg.version} will not be published because we're not running in a CI build agent`),
    );
    return false;
  }

  console.log(
    chalk.magenta(`Running: "${publishCommand}" for ${pkg.name}@${pkg.version}`),
  );

  execSync(publishCommand, { stdio: 'inherit' });
  return true;
}

function release(pkg) {
  console.log(`\nStarting the release process for ${chalk.bold(pkg.name)}`);

  if (!shouldPublishPackage(pkg)) {
    console.log(
      chalk.blue(
        `${pkg.name}@${pkg.version} already exists on registry ${pkg.registry}`,
      ),
    );
    console.log('No publish performed');
    return;
  }

  const published = publish(pkg);
  if (published) {
    console.log(
      chalk.green(`Published "${pkg.name}@${pkg.version}" succesfully to ${pkg.registry}`),
    );
  } else {
    console.log('No publish performed');
  }
}

// 1. load all non-private pacakges from lerna.json
// 2. verify that each package can be published by checking the registry.
//   (Can only publish versions that doesn't already exist)
// 3. choose a tag ->
// * `old` for a release that is less than latest (semver).
// * `next` for a prerelease (beta/alpha/rc).
// * `latest` as default.
// 4. perform npm publish using the chosen tag.

lernaConfig.packages.forEach(pacakagesGlob => {
  glob.sync(pacakagesGlob).forEach(pkgPath => {
    const pkgJsonPath = path.resolve(pkgPath, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath));
    if (!pkg.private) {
      release({
        name: get(pkg, 'name'),
        version: get(pkg, 'version'),
        registry: get(pkg, 'publishConfig.registry', DEFAULT_REGISTRY),
      });
    }
  });
});
