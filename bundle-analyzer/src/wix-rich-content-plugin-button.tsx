import 'wix-rich-content-plugin-button/dist/styles.min.css';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(buttonTypeMapper);
