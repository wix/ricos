import createViewerBundle from './RichContentViewerWrapper';
import { createHeadersMarkdownDecorator } from 'ricos/headers-markdown/viewer';

export default () => createViewerBundle(createHeadersMarkdownDecorator);
