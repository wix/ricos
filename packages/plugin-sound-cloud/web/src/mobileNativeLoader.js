import { pluginSoundCloud, SOUND_CLOUD_TYPE } from './viewer';

window.__ricosPlugins = window.__ricosPlugins || {};
window.__ricosPlugins[SOUND_CLOUD_TYPE] = pluginSoundCloud;
if (window.__notifyRicosPluginLoaded) {
  window.__notifyRicosPluginLoaded(SOUND_CLOUD_TYPE);
}
