import 'wix-rich-content-plugin-spoiler/dist/styles.min.css';
import { spoilerInlineStyleMapper } from 'wix-rich-content-plugin-spoiler/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(spoilerInlineStyleMapper);
