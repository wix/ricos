// eslint-disable-next-line max-len
import { verticalEmbedTypeMapper } from 'wix-rich-content-plugin-vertical-embed/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(verticalEmbedTypeMapper);
