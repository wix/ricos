import 'wix-rich-content-plugin-link-preview/dist/styles.min.css';
import { linkPreviewTypeMapper } from 'ricos/link-preview/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(linkPreviewTypeMapper);
