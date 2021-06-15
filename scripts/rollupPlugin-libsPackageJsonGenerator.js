function writePackageJson(packagePath, filePath) {
  const fs = require('fs');
  fs.mkdirSync(packagePath, { recursive: true });
  const isLoadable = packagePath === 'loadable';
  const isEditor = packagePath === 'editor';
  let newPath;
  if (isLoadable || isEditor) {
    newPath = isLoadable ? '../dist/loadable/es/viewer' : '../dist/loadable/es/index';
  }
  fs.writeFile(
    packagePath + '/package.json',
    `{
    "main": "${newPath ? newPath : filePath + '.cjs'}.js",
    "module": "${newPath || filePath}.js",
    "types": "${isLoadable ? '../dist/src/viewer' : filePath}.d.ts"
}`,
    err => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  );
}

function removeExtension(fileName) {
  return fileName
    .split('.')
    .slice(0, -1)
    .join('.');
}

export default function createLibsPackageJsons() {
  return {
    name: 'copy-and-watch',
    async writeBundle() {
      const fs = require('fs');
      if (fs.existsSync('lib')) {
        fs.readdirSync('lib').forEach(file => {
          const fileName = removeExtension(file);
          const path = 'libs/' + fileName;
          writePackageJson(path, `../../dist/lib/${fileName}`);
        });
      }
      if (fs.existsSync('src/viewer.ts')) {
        writePackageJson('viewer', '../dist/module.viewer');
        writePackageJson('loadable', '../dist/loadable/es/viewer');
        writePackageJson('editor', '../dist/loadable/es/viewer');
      }
    },
  };
}
