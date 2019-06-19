const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const { initPlugin: initSnapshotsPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  initSnapshotsPlugin(on, config);
  return config;
};
