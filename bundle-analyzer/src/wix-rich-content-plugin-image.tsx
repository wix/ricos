import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(imageTypeMapper);
