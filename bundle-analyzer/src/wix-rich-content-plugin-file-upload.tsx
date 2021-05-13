import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginFileUpload());
