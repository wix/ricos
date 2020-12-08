import createViewerBundle from './RichContentViewerWrapper';
import { createHeadersMarkdownDecorator } from 'wix-rich-content-plugin-headers-markdown';

export default () => createViewerBundle(createHeadersMarkdownDecorator);
