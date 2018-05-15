/* eslint-disable no-console */

process.on('unhandledRejection', error => {
  throw error;
});

const path = require('path');
const cp = require('child_process');
const chalk = require('chalk');
const prompts = require('prompts');
const argv = require('yargs').argv;
const pkg = require('../package.json');

const lernaPath = path.resolve(__dirname, '../node_modules/.bin/lerna');
const scope = argv.scope || 'wix-rich-content-*';

// resets the console
process.stdout.write('\x1Bc');

console.log(chalk.underline(`Starting the release process for ${pkg.name}`));
console.log();

prompts({
  type: 'confirm',
  name: 'value',
  initial: false,
  message: 'Did you remember to update changelog with the new version?',
}).then(({ value }) => {
  if (!value) {
    console.log();
    console.log(chalk.cyan('So do it now 👇'));
    console.log();
    console.log(path.resolve(__dirname, '../CHANGELOG.md'));
    console.log();
    console.log(chalk.red('Release aborted'));
  } else {
    try {
      cp.execSync(`${lernaPath} publish --skip-npm --scope=${scope} --message="chore(version bump):" --independent`, { stdio: 'inherit' });

      console.log();
      console.log(chalk.green('Release was created locally'));
      console.log();
      console.log('Please push your changes to origin');
      console.log();
      console.log(chalk.cyan('git push --follow-tags'));
      console.log();
      console.log('Head over to the CI and wait for rich-content build to pass 👇');
      console.log();
      console.log(
        chalk.cyan(
          'http://ci.dev.wix/viewType.html?buildTypeId=WixRichContent_WixRichContent_O',
        ),
      );
    } catch (error) {
      throw error;
    }
  }
});
