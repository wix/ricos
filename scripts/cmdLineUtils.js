/* eslint-disable no-console */

const chalk = require('chalk');

function clearScrean() {
  process.stdout.write('\x1Bc');
}

const log = {
  underline: msg => log.msg(chalk.underline(msg)),
  space: () => console.log(),
  title: msg => {
    log.underline(msg);
    log.space();
  },
  msg: msg => console.log(msg),
  cyan: msg => log.msg(chalk.cyan(msg)),
  error: msg => log.msg(chalk.red(msg)),
};
module.exports = {
  clearScrean,
  log,
};
