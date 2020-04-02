/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const github = require('@actions/github');
const gitPRComment = require('./gitPRComment');

const EXAMPLES_TO_DEPLOY = [
  {
    name: 'rich-content',
    path: 'examples/main',
  },
  {
    name: 'rich-content-storybook',
    path: 'examples/storybook',
    buildCmd: 'build-storybook -s public',
    dist: 'storybook-static',
  },
];

const generateMessage = domains => {
  let message = 'Click below to open examples:\n';
  domains.map(({ name, domain }) => {
    return (message = message.concat(`${name}: https://`, domain));
  });
  return message;
};

const exec = cmd => execSync(cmd, { stdio: 'inherit' });

const fqdn = subdomain => `${subdomain}.surge.sh/`;

const generateSubdomain = exampleName => {
  const { version } = require('../lerna.json');
  const GITHUB_REF = github.context.payload.pull_request.head.ref;
  const branchName = GITHUB_REF.split('/').pop();
  const postfix = !branchName.startsWith('release') ? branchName : version;
  return exampleName + `-${postfix.replace(/(\.)|(\/)/g, '-')}`;
};

function build({ buildCmd = 'npm run build' }) {
  console.log(chalk.magenta(`Running: "${buildCmd}"`));
  exec('npm run clean');
  exec(buildCmd);
}

function deploy({ name, dist = 'dist' }) {
  console.log(chalk.cyan(`Deploying ${name} example to surge...`));
  const subdomain = generateSubdomain(name);
  const domain = fqdn(subdomain);
  const deployCommand = `npx surge ${dist} ${domain}`;
  try {
    console.log(chalk.magenta(`Running "${deployCommand}`));
    exec(deployCommand);
    return domain;
  } catch (e) {
    console.error(chalk.bold.red(e));
    throw e;
  }
}

function run() {
  let skip;
  const domains = [];
  const { SURGE_LOGIN, GITHUB_ACTIONS } = process.env;
  if (!GITHUB_ACTIONS) {
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
    build(example);
    domains.push({ name: example.name, domain: deploy(example) });
    process.chdir(path.resolve('../..'));
  }
  const message = generateMessage(domains);
  gitPRComment(message);
}

run();
