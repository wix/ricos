import { pluginLinkButton, LINK_BUTTON_TYPE } from './viewer';

window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[LINK_BUTTON_TYPE] = pluginLinkButton;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(LINK_BUTTON_TYPE);
}
