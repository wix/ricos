import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/viewer';

declare global {
  interface Window {
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-collapsible-list': pluginCollapsibleList,
};
