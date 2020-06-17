/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const { fqdn, generateSubdomain } = require('./deployUtils');

const exec = cmd => execSync(cmd, { stdio: 'inherit' });

function build({ buildCmd = 'npm run build' }) {
  console.log(chalk.magenta(`Running: "${buildCmd}"`));
  exec('npm run clean');
  exec(buildCmd);
}

function deploy({ name, dist = 'dist' }) {
  console.log(chalk.cyan(`Deploying ${name} to surge...`));
  const subdomain = generateSubdomain(name);
  const domain = fqdn(subdomain);
  const deployCommand = `npx surge ${dist} ${domain}`;
  try {
    console.log(chalk.magenta(`Running "${deployCommand}`));
    exec(deployCommand);
  } catch (e) {
    console.error(chalk.bold.red(e));
    throw e;
  }
}

function run() {
  let skip;
  const report = 'tests-report';
  const { SURGE_LOGIN, GITHUB_ACTIONS, REPORT_PATH } = process.env;
  if (!GITHUB_ACTIONS) {
    skip = 'Not in CI';
  } else if (!SURGE_LOGIN) {
    skip = 'PR from fork';
  } else if (!REPORT_PATH) {
    skip = 'Report path is not defined';
  }
  if (skip) {
    console.log(chalk.yellow(`${skip} - skipping deploy`));
    return false;
  }
  console.log('HEY:', path.resolve(REPORT_PATH));
  console.log('HEY:', path.resolve(process.cwd(), REPORT_PATH));
  process.chdir(path.resolve(process.cwd(), REPORT_PATH));

  console.log(chalk.blue(`\nDeploying ${report}...`));
  build();
  deploy({ name: report });

  process.chdir(path.resolve('../..'));
}

run();
