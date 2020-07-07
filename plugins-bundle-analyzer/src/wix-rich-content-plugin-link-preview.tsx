import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import { linkPreviewTypeMapper } from 'wix-rich-content-plugin-link-preview/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(linkPreviewTypeMapper);
