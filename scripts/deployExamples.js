/* eslint-disable no-console, fp/no-loops */

const chalk = require('chalk');
const execSync = require('child_process').execSync;

const exec = cmd => execSync(cmd, { stdio: 'inherit' });

const fqdn = subdomain => `https://${subdomain}.surge.sh/`;

function bootstrap(example) {
  const bootstrapCommand = `npm install --prefix=${example.path}`;
  console.log(chalk.magenta(`Running: "${bootstrapCommand}"`));
  exec(bootstrapCommand);
}

function build(example) {
  const buildCommand = `npm run build --prefix=${example.path}`;
  console.log(chalk.magenta(`Running: "${buildCommand}"`));
  exec(`npm run clean --prefix=${example.path}`);
  exec(buildCommand);
}

function publish(example) {
  console.log(chalk.cyan(`Publishing ${example.name} example v${example.version} to surge...`));
  const domain = `${example.name}-${example.version.replace(/\./g, '-')}`;
  const deployCommand = `npx surge-github-autorelease -b . -s ${example.path}/dist -d ${domain}`;
  try {
    console.log(chalk.magenta(`Running "${deployCommand}`));
    exec(deployCommand);
    console.log(chalk.green(`Published to ${fqdn(domain)}`));
  } catch (e) {
    console.error(chalk.bold.red(e));
  }
}

async function deployExamples(examples) {
  if (!process.env.CI) {
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
    publish(example);
  }
}

module.exports = deployExamples;
