import { pluginLinkButton } from 'ricos/button/viewer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-button': pluginLinkButton,
};
