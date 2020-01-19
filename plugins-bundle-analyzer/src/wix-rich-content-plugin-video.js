import 'wix-rich-content-plugin-video/dist/styles.min.css';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';
import createViewerBundle from './wrapper';

export default () => createViewerBundle(videoTypeMapper);
