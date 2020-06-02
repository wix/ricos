import 'wix-rich-content-plugin-spoiler/dist/styles.min.css';
import { spoilerTypeMapper } from 'wix-rich-content-plugin-spoiler/dist/module.viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(spoilerTypeMapper);
