import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import { giphyTypeMapper } from 'wix-rich-content-plugin-giphy/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(giphyTypeMapper);
