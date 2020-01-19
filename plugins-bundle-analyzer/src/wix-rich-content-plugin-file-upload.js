import 'wix-rich-content-plugin-file-upload/dist/styles.min.css';
import { fileUploadTypeMapper } from 'wix-rich-content-plugin-file-upload/dist/module.viewer.cjs';
import createViewerBundle from './wrapper';

export default () => createViewerBundle(fileUploadTypeMapper);
