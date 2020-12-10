// import 'wix-rich-content-plugin-accordion/dist/styles.min.css';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion/viewer';

declare global {
  interface Window {
    ViewerPlugins: any;
  }
}

window.ViewerPlugins = { ...window.ViewerPlugins, accordion: pluginAccordion };
