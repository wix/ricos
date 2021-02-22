import 'wix-rich-content-plugin-vertical-embed/dist/styles.min.css';
import { pluginVerticalEmbed } from 'ricos/vertical-embed/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginVerticalEmbed());
