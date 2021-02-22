import 'wix-rich-content-plugin-emoji/dist/styles.min.css';
import { pluginEmoji } from 'ricos/emoji/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginEmoji());
