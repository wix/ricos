import 'wix-rich-content-plugin-accordion/dist/styles.min.css';
import { pluginAccordion } from 'wix-rich-content-plugin-accordion/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginAccordion());
