import 'wix-rich-content-plugin-hashtag/dist/styles.min.css';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginHashtag());
