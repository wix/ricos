/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const sgAutorelease = require('surge-github-autorelease');

const rootDir = path.resolve(__dirname, '..');

const surgeOpts = {
  repoOwner: 'wix-incubator',
  repoName: 'rich-content',
  rootPath: rootDir,
};

if (process.env.GITHUB_TOKEN) {
  surgeOpts.githubToken = process.env.GITHUB_TOKEN;
}

const exec = cmd => execSync(cmd, { stdio: 'inherit' });

const fqdn = subdomain => `https://${subdomain}.surge.sh/`;

function bootstrap(example) {
  const bootstrapCommand = `npm install --prefix=${example.path}`;
  console.log(
    chalk.magenta(`Running: "${bootstrapCommand}"`),
  );
  exec(bootstrapCommand);
}

function build(example) {
  const buildCommand = `npm run build --prefix=${example.path}`;
  console.log(
    chalk.magenta(`Running: "${buildCommand}"`),
  );
  exec(`npm run clean --prefix=${example.path}`);
  exec(buildCommand);
}

async function publish(example) {
  console.log(chalk.cyan(`Publishing ${example.name} example v${example.version} to surge...`));
  const domain = `${example.name}-${example.version.replace(/\./g, '-')}`;
  try {
    await sgAutorelease({
      ...surgeOpts,
      domain,
      sourceDirectory: `${example.path}/dist`,
    });
    console.log(chalk.green(`Published to ${fqdn(domain)}`));
  } catch (e) {
    console.error(chalk.bold.red(e));
  }
}

async function deployExamples(examples) {
  if (!process.env.IS_BUILD_AGENT) {
    console.log(chalk.yellow(`Not in CI - skipping examples deploy`));
    return false;
  }

  if (!examples.length) {
    console.log('No examples to publish');
    return false;
  }

  for (const example of examples) {
    console.log(chalk.blue(`\nDeploying ${example.name} example...`));
    bootstrap(example);
    build(example);
    await publish(example);
  }
}

module.exports = deployExamples;
