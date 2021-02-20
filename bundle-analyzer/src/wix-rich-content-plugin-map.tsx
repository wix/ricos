import 'wix-rich-content-plugin-map/dist/styles.min.css';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(mapTypeMapper);
