import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(galleryTypeMapper);
