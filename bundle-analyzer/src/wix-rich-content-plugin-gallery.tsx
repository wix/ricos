import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginGallery());
