import { pluginLinkButton } from 'ricos/button/viewer';

declare global {
  interface Window {
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-button': pluginLinkButton,
};
