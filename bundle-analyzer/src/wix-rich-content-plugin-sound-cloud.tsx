import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(soundCloudTypeMapper);
