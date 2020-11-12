import 'wix-rich-content-plugin-accordion/dist/styles.min.css';
import { accordionTypeMapper } from 'wix-rich-content-plugin-accordion/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(accordionTypeMapper);
