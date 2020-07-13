import 'wix-rich-content-plugin-button/dist/styles.min.css';
import { buttonTypeMapper } from 'wix-rich-content-plugin-button/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(buttonTypeMapper);
