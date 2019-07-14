/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const lernaPackages = require('lerna-packages');

if (process.argv.length !== 3) {
  console.error('Usage: node linkExample.js {exampleName}');
  process.exit(1);
}

if (process.env.CI) {
  console.log('In CI - skipping linking');
  return;
}

const exampleName = process.argv[process.argv.length - 1];
const getRootDir = dirname => {
  const pacakgesPath = path.resolve(dirname, 'packages');
  if (fs.existsSync(pacakgesPath)) {
    return dirname;
  } else {
    return getRootDir(path.resolve(dirname, '..'));
  }
};

const getYarnLinkDir = () => {
  if (process.env.YARN_LINK_DIR) {
    return path.resolve(process.env.YARN_LINK_DIR);
  } else if (process.platform === 'win32' && process.env.LOCALAPPDATA) {
    return path.resolve(process.env.LOCALAPPDATA, 'Yarn', 'config', 'link');
  } else {
    return path.resolve(process.env.HOME, '.config', 'yarn', 'link');
  }
};

const rootDir = getRootDir(__dirname);
const PATHS = {
  lernaJson: path.resolve(rootDir, 'lerna.json'),
  yarnLink: getYarnLinkDir(),
  example: path.resolve(rootDir, 'examples', exampleName),
};
const packages = [];

process.chdir(rootDir);
lernaPackages({ configPath: PATHS.lernaJson }).forEach(pkg => {
  process.chdir(pkg.path);
  packages.push(pkg.name);
  if (!fs.existsSync(path.resolve(PATHS.yarnLink, pkg.name))) {
    execSync('yarn link', { stdio: 'inherit' });
  }
});

process.chdir(PATHS.example);
execSync(`yarn link ${packages.join(' ')}`, { stdio: 'inherit' });
