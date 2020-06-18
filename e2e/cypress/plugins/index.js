const { initPlugin: initSnapshotsPlugin } = require('cypress-plugin-snapshots/plugin');
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const { merge } = require('lodash');

module.exports = (on, initialConfig) => {
  const config = enhanceConfig(initialConfig);
  addMatchImageSnapshotPlugin(on, config);
  initSnapshotsPlugin(on, config);
  on('task', {
    log(message) {
      // eslint-disable-next-line no-console
      console.log(message);
      return null;
    },
  });
  return config;
};

function enhanceConfig(initialConfig) {
  const configName = initialConfig.env.CYPRESS_CONFIG;
  const path = `../../../cypress.${configName}.json`;

  let additionalConfig = {};
  try {
    if (configName) {
      additionalConfig = require(path);
    }
  } catch (error) {
    console.error(`Failed to load ${path}`);
  }

  return merge(initialConfig, additionalConfig);
}

require('@applitools/eyes-cypress')(module);
