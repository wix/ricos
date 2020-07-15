/* eslint-disable no-console */
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const pkgUtils = require('./pkgUtils');
const { getPackages } = require('@lerna/project');

const publishCommand = (pkg, tag) =>
  `npm publish ${pkg.path} --tag=${tag} --registry=${pkg.registry}`;
const addNextTagCmd = pkg =>
  `npm dist-tag --registry=${pkg.registry} add ${pkg.name}@${pkg.version} ${pkgUtils.NEXT_TAG}`;

function shouldPublishPackage(pkg) {
  const remoteVersionsList = pkgUtils.getPublishedVersions(pkg);
  return !remoteVersionsList.includes(pkg.version);
}

function publish(pkg) {
  const { name, version } = pkg;
  const tag = pkgUtils.getTag(pkg);
  const publishCmd = publishCommand(pkg, tag);
  console.log(chalk.magenta(`Running: "${publishCmd}" for ${name}@${version}`));
  execSync(publishCmd, { stdio: 'inherit' });
  if (pkgUtils.isLatest(tag)) {
    const addTagCmd = addNextTagCmd(pkg);
    console.log(chalk.magenta(`adding: adding next tag to latest: "${addTagCmd}"`));
    execSync(addTagCmd, { stdio: 'inherit' });
  }
  return true;
}

function release(pkg) {
  console.log(`\nStarting the release process for ${chalk.bold(pkg.name)}`);

  if (!shouldPublishPackage(pkg)) {
    console.log(
      chalk.blue(`${pkg.name}@${pkg.version} already exists on registry ${pkg.registry}`)
    );
    console.log('No publish performed');
    return;
  }

  const published = publish(pkg);
  if (published) {
    console.log(
      chalk.green(`Published "${pkg.name}@${pkg.version}" succesfully to ${pkg.registry}`)
    );
  } else {
    console.log('No publish performed');
  }
}

function createNpmRc() {
  execSync(`rm -f package-lock.json`);
  const { NPM_EMAIL, NPM_TOKEN } = process.env;
  const EOL = require('os').EOL;
  const content = `email=${NPM_EMAIL}${EOL}//registry.npmjs.org/:_authToken=${NPM_TOKEN}${EOL}`;
  const fs = require('fs');
  fs.writeFileSync(`.npmrc`, content);
}

function publishPackages() {
  getPackages().then(allPackages => {
    allPackages
      .filter(pkg => !pkg.private)
      .forEach(pkg =>
        release({
          name: pkg.name,
          version: pkg.version,
          registry: pkg.get('publishConfig').registry,
          path: pkg.location,
        })
      );
  });
}

function run() {
  let skip;
  const { FORCE_PUBLISH, TRAVIS_BRANCH, CI } = process.env;
  if (!TRAVIS_BRANCH.startsWith('release') && !FORCE_PUBLISH) {
    skip = 'Not on a release branch';
  } else if (!CI) {
    skip = 'Not in CI';
  }
  if (skip) {
    console.log(chalk.yellow(`${skip} - skipping publish`));
    return false;
  }

  createNpmRc();
  publishPackages();
}

run();
