import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';
import { soundCloudTypeMapper } from 'ricos/sound-cloud/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(soundCloudTypeMapper);
