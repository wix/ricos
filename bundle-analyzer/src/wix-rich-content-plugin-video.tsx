import 'wix-rich-content-plugin-video/dist/styles.min.css';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(videoTypeMapper);
