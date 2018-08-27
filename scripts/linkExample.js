/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const lernaPackages = require('lerna-packages');

const rootDirName = 'rich-content';
const rootDir = process.cwd().substr(0, process.cwd().indexOf(rootDirName) + rootDirName.length);
const PATHS = {
  lernaJson: path.resolve(rootDir, 'lerna.json'),
  yarnLink: path.resolve(process.env.HOME, '.config', 'yarn', 'link'),
  editorExample: path.resolve(rootDir, 'examples', 'editor'),
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

process.chdir(PATHS.editorExample);
execSync(`yarn link ${packages.join(' ')}`, { stdio: 'inherit' });
