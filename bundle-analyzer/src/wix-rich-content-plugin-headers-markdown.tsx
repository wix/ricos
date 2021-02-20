import createViewerBundle from './RichContentViewerWrapper';
import { createHeadersMarkdownDecorator } from 'wix-rich-content-plugin-headers-markdown/viewer';

export default () => createViewerBundle(createHeadersMarkdownDecorator);
