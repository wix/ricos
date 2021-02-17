import 'wix-rich-content-plugin-button/dist/styles.min.css';
import { buttonTypeMapper } from 'ricos/button/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(buttonTypeMapper);
