const { clearScrean, log } = require('./cmdLineUtils');
const execSync = require('child_process').execSync;
clearScrean();
log.title('creating pre release branch');

log.cyan('Getting current version...');

// log.warn('make sure youre on the branch you want to pre-release and that youre fully comitted (git status is empty)');
const getPackagesCmd = 'lerna ls --json';
const runCmd = (cmd, ignore = false) => execSync(cmd, { stdio: ignore ? 'ignore' : 'inherit' });
const runJsonCmd = cmd => JSON.parse(execSync(cmd, { stdio: ['pipe', 'pipe', 'inherit'] }));
const packages = runJsonCmd(getPackagesCmd);
let currentVersion;
packages.forEach(pkg => {
  const { name, version } = pkg;
  if (!currentVersion) {
    currentVersion = version;
  } else if (version !== currentVersion) {
    log.error('Mismatch in versions, Release aborted');
    throw `${name} version ${version} is different from ${currentVersion}`;
  }
});

log.msg(`Current version: ${currentVersion}`);
log.cyan('switching to pre-release branch');
log.msg('git fetch');
runCmd('git fetch');
const alphaBranch = `release-${currentVersion}-alpha`;
const switchCmd = `git checkout ${alphaBranch} || git checkout -b ${alphaBranch}`;

log.msg(`switching to ${alphaBranch} branch...`);
runCmd(switchCmd, true);

log.cyan(
  `you are now on pre-release branch!
   please pull (if needed) and merge your change here, 
   and then run npm run createVersion and choose 'pre-release' option`
);
