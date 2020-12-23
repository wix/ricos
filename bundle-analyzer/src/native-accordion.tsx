import { pluginAccordion } from 'wix-rich-content-plugin-accordion/viewer';

declare global {
  interface Window {
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-accordion': pluginAccordion,
};
