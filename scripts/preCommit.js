/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const isEmpty = require('lodash/isEmpty');

const baseDir = 'packages/';

const dirsWithModifiedFiles = execSync('git status --porcelain=1')
  .toString()
  .split('\n')
  .filter(s => !s.startsWith(' ') && !s.startsWith('?') && s.indexOf(baseDir) !== -1)
  .map(status => {
    const statusArr = status.trim().split(' ');
    const filePath = statusArr[statusArr.length - 1];
    const fullFileDir = path.parse(filePath).dir.replace(baseDir, '');
    const fullFileDirSepIndex = fullFileDir.indexOf(path.sep);
    const baseFileDir =
      fullFileDirSepIndex > -1 ? fullFileDir.substring(0, fullFileDirSepIndex) : fullFileDir;
    return baseFileDir;
  })
  .filter(s => !isEmpty(s));

if (dirsWithModifiedFiles.length) {
  new Set(dirsWithModifiedFiles).forEach(dir => {
    try {
      const npmTestCommand = `npm test --prefix ${baseDir}${dir}`;
      console.log(chalk.blue(`Executing: ${npmTestCommand}`));
      execSync(npmTestCommand, { stdio: 'inherit' });
    } catch (error) {
      console.error(chalk.red(`\nError: ${error.message}`));
      process.exit(1);
    }
  });
} else {
  console.log(chalk.blue('0 modified files, no tests to run!'));
}
