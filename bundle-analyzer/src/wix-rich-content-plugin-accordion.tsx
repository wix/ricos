import 'wix-rich-content-plugin-accordion/dist/styles.min.css';
import { pluginAccordion } from 'ricos/accordion/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginAccordion());
