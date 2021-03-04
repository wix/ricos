import { pluginMap, MAP_TYPE } from './viewer';

window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[MAP_TYPE] = pluginMap;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(MAP_TYPE);
}
