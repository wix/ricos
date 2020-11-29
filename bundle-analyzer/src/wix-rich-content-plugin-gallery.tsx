import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(galleryTypeMapper);
