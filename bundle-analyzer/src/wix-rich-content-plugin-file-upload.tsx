import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import { fileUploadTypeMapper } from 'wix-rich-content-plugin-file-upload/dist/module.viewer.js';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(fileUploadTypeMapper);
