const path = require('path');
const ncu = require('npm-check-updates');
const { pickBy, isEmpty } = require('lodash');

function updatePackages() {
  return ncu.run({
    deep: true,
    packageManager: 'yarn',
    target: 'minor',
    minimal: true,
    upgrade: true,
    reject: ['jsonschema'],
  });
}

console.log('package upgrade started..');
updatePackages().then(upgraded =>
  console.log(
    'upgraded deps:',
    pickBy(upgraded, v => !isEmpty(v))
  )
);
