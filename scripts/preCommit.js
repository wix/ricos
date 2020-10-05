/* eslint-disable no-console */

const path = require('path');
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const isEmpty = require('lodash').isEmpty;

const baseDir = 'packages/';
const excludedDirs = ['e2e'];

const executeCommand = command => {
  console.log(chalk.blue(`Executing: ${command}`));
  execSync(command, { stdio: 'inherit' });
};

const lintModified = () => {
  const dirsWithModifiedFiles = execSync('git status --porcelain=1')
    .toString()
    .split('\n')
    .filter(
      s =>
        !s.startsWith(' ') &&
        !s.startsWith('?') &&
        s.indexOf(baseDir) !== -1 &&
        s.indexOf('docs') === -1 &&
        s.indexOf('wrapper') === -1
    )
    .map(status => {
      const statusArr = status.trim().split(' ');
      const filePath = statusArr[statusArr.length - 1];
      const fullFileDir = path.parse(filePath).dir.replace(baseDir, '');
      const fullFileDirSepIndex = fullFileDir.indexOf(path.sep);
      const baseFileDir =
        fullFileDirSepIndex > -1 ? fullFileDir.substring(0, fullFileDirSepIndex) : fullFileDir;
      return baseFileDir;
    })
    .filter(s => !isEmpty(s))
    .filter(s => !excludedDirs.includes(s));

  if (dirsWithModifiedFiles.length) {
    new Set(dirsWithModifiedFiles).forEach(dir => {
      try {
        const npmLintCommand = `npm run lint --prefix ${baseDir}${dir}/web`;
        executeCommand(npmLintCommand);
        const npmTestCommand = `npm test --prefix ${baseDir}${dir}/web`;
        executeCommand(npmTestCommand);
      } catch (error) {
        console.error(chalk.red(`\nError: ${error.message}`));
        process.exit(1);
      }
    });
  } else {
    console.log(chalk.blue('0 modified files, no tests to run!'));
  }
};

const deduplicateLock = () => {
  try {
    executeCommand(`yarn-deduplicate --fail yarn.lock`);
  } catch (error) {
    console.error(chalk.red('yarn.lock deduplicated; please review and commit the changes'));
    process.exit(1);
  }
};

lintModified();
deduplicateLock();
