import { pluginCollapsibleList, COLLAPSIBLE_LIST_TYPE } from './viewer';

window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[COLLAPSIBLE_LIST_TYPE] = pluginCollapsibleList;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(COLLAPSIBLE_LIST_TYPE);
}
