import { pluginAccordion, ACCORDION_TYPE } from './viewer';

window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[ACCORDION_TYPE] = pluginAccordion;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(ACCORDION_TYPE);
}
