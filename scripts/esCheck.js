const { execSync } = require('child_process');
function execCommand(cmd) {
  try {
    execSync(cmd, {
      stdio: ['inherit', 'inherit', 'pipe'],
      maxBuffer: 10 * 1024 * 1024,
      cwd: process.cwd(),
      env: process.env,
    });
  } catch (e) {
    if (e.stderr !== null) {
      process.stderr.write(e.stderr);
      process.exit(1);
    }
  }
}

const ES_CHECK_DEFAULTS = {
  ecmaVersion: 'es5',
  module: false,
  files: 'dist/statics/**/*.js',
};

const esCheckConfig = ES_CHECK_DEFAULTS;

const filesToCheck = require('globby').sync(esCheckConfig.files, {
  onlyFiles: true,
  expandDirectories: true,
});

if (filesToCheck.length > 0) {
  const esCheckCommand = `npx es-check ${esCheckConfig.ecmaVersion} ${
    esCheckConfig.module ? '--module' : ''
  } ${process.cwd()}/${esCheckConfig.files}`;

  execCommand(esCheckCommand);
}
