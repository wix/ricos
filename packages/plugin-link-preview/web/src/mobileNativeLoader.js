import { pluginLinkPreview, LINK_PREVIEW_TYPE } from './viewer';

window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[LINK_PREVIEW_TYPE] = pluginLinkPreview;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(LINK_PREVIEW_TYPE);
}
