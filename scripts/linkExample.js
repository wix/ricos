/* eslint-disable no-console */

const path = require('path');
const execSync = require('child_process').execSync;
const fs = require('fs');
const glob = require('glob');
const get = require('lodash/get');

const rootDirName = 'rich-content';
const rootDir = process.cwd().substr(0, process.cwd().indexOf(rootDirName) + rootDirName.length);
const PATHS = {
  lernaJson: path.resolve(rootDir, 'lerna.json'),
  yarnLink: path.resolve(process.env.HOME, '.config', 'yarn', 'link'),
  editorExample: path.resolve(rootDir, 'examples', 'editor'),
};
const packages = [];

process.chdir(rootDir);
const lernaConfig = require(PATHS.lernaJson);
lernaConfig.packages.forEach(pacakagesGlob => {
  glob.sync(pacakagesGlob).forEach(pkgRelPath => {
    const pkgPath = path.resolve(rootDir, pkgRelPath);
    process.chdir(pkgPath);
    const pkgJsonPath = path.resolve(pkgPath, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath));
    const pkgName = get(pkg, 'name');
    packages.push(pkgName);
    if (!fs.existsSync(path.resolve(PATHS.yarnLink, pkgName))) {
      execSync('yarn link', { stdio: 'inherit' });
    }
  });
});

process.chdir(PATHS.editorExample);
execSync(`yarn link ${packages.join(' ')}`, { stdio: 'inherit' });
