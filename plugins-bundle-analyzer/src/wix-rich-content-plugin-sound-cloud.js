import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer.cjs';
import createViewerBundle from './wrapper';

export default () => createViewerBundle(soundCloudTypeMapper);
