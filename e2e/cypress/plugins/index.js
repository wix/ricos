const { initPlugin: initSnapshotsPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  initSnapshotsPlugin(on, config);
  return config;
};
