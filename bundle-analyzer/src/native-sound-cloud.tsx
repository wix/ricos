import { pluginSoundCloud } from 'ricos/sound-cloud/viewer';

declare global {
  interface Window {
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-sound-cloud': pluginSoundCloud,
};
