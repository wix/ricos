import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import { linkPreviewTypeMapper } from 'wix-rich-content-plugin-link-preview/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(linkPreviewTypeMapper);
