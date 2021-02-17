import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import { galleryTypeMapper } from 'ricos/gallery/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(galleryTypeMapper);
