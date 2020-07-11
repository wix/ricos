process.on('unhandledRejection', error => {
  throw error;
});

const path = require('path');
const cp = require('child_process');
const chalk = require('chalk');
const prompts = require('prompts');
const argv = require('yargs').argv;
const pkg = require('../package.json');
const { clearScrean, log } = require('./cmdLineUtils');

const lernaPath = path.resolve(__dirname, '../node_modules/.bin/lerna');

clearScrean();
log.title(`Starting the release process for ${pkg.name}`);

cp.execSync('find ./*/ -maxdepth 3 -name "package-lock.json" -type f -delete', {
  stdio: 'inherit',
});

prompts({
  type: 'confirm',
  name: 'value',
  initial: false,
  message: 'Did you remember to update changelog with the new version?',
}).then(({ value }) => {
  if (!value) {
    log.space();
    log.cyan(chalk.cyan('So do it now 👇'));
    log.space();
    log.msg(path.resolve(__dirname, '../CHANGELOG.md'));
    log.space();
    log.error(chalk.red('Release aborted'));
  } else {
    try {
      let lernaCmd = `${lernaPath} version --exact --no-commit-hooks --force-publish="*"`;
      if (argv.release) {
        lernaCmd = `${lernaCmd} ${argv.release}`;
      }
      cp.execSync(lernaCmd, { stdio: 'inherit' });
    } catch (error) {
      throw error;
    }
  }
});
