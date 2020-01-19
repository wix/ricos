import 'wix-rich-content-plugin-map/dist/styles.min.css';
import { mapTypeMapper } from 'wix-rich-content-plugin-map/dist/module.viewer.cjs';
import createViewerBundle from './wrapper';

export default () => createViewerBundle(mapTypeMapper);
