/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;

const EXAMPLES_TO_DEPLOY = [
  {
    name: 'rich-content',
    path: 'examples/main',
  },
];

const exec = cmd => execSync(cmd, { stdio: 'inherit' });

const fqdn = subdomain => `${subdomain}.surge.sh/`;

const generateSubdomain = exampleName => {
  const { version } = require('../lerna.json');
  let subdomain = exampleName;
  const { TRAVIS_PULL_REQUEST, CI, TRAVIS_BRANCH } = process.env;
  if (TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST !== 'false') {
    subdomain += `-${TRAVIS_PULL_REQUEST}`;
    console.log('Generated subdomain: ', subdomain);
  } else if (CI === 'true' && TRAVIS_BRANCH !== 'master') {
    subdomain += `-${TRAVIS_BRANCH}`;
    console.log('Generated subdomain: ', subdomain);
  } else {
    subdomain += `-${version.replace(/\./g, '-')}`;
  }
  return subdomain;
};

function build() {
  const buildCommand = 'npm run build';
  console.log(chalk.magenta(`Running: "${buildCommand}"`));
  exec('npm run clean');
  exec(buildCommand);
}

function deploy(name) {
  console.log(chalk.cyan(`Deploying ${name} example to surge...`));
  const subdomain = generateSubdomain(name);
  const domain = fqdn(subdomain);
  const deployCommand = `npx surge dist ${domain}`;
  try {
    console.log(chalk.magenta(`Running "${deployCommand}`));
    exec(deployCommand);
  } catch (e) {
    console.error(chalk.bold.red(e));
  }
}

function run() {
  let skip;
  const { SURGE_LOGIN, TRAVIS_BRANCH, TRAVIS_PULL_REQUEST, CI } = process.env;
  if (!TRAVIS_BRANCH.startsWith('release') && TRAVIS_PULL_REQUEST === 'false') {
    if (CI !== 'true' || TRAVIS_BRANCH === 'master') skip = 'Not on a release branch or PR';
  } else if (!CI) {
    skip = 'Not in CI';
  } else if (!SURGE_LOGIN) {
    skip = 'PR from fork';
  }
  if (skip) {
    console.log(chalk.yellow(`${skip} - skipping deploy`));
    return false;
  }

  for (const example of EXAMPLES_TO_DEPLOY) {
    process.chdir(path.resolve(process.cwd(), example.path));

    console.log(chalk.blue(`\nDeploying ${example.name} example...`));
    build();
    deploy(example.name);

    process.chdir(path.resolve('../..'));
  }
}

run();
