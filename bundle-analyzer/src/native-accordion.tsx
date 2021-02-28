import { pluginAccordion } from 'ricos/accordion/viewer';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = {
  ...window.ViewerPlugins,
  'wix-rich-content-plugin-accordion': pluginAccordion,
};
