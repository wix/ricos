import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/viewer';

declare global {
  interface Window {
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-sound-cloud': pluginSoundCloud,
};
