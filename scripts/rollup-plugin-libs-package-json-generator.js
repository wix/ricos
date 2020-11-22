function writePackageJson(packagePath, filePath) {
  const fs = require('fs');
  fs.mkdirSync(packagePath, { recursive: true });
  fs.writeFile(
    packagePath + '/package.json',
    `{
    "main": "${filePath}.cjs.js",
    "module": "${filePath}.js",
    "types": "${filePath}.d.ts"
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
          writePackageJson(path, `../../dist/${fileName}`);
        });
      }
      if (fs.existsSync('src/viewer.ts')) {
        writePackageJson('viewer', '../dist/module.viewer');
      }
    },
  };
}
