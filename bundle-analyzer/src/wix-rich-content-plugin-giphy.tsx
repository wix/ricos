import 'wix-rich-content-plugin-giphy/dist/styles.min.css';
import { giphyTypeMapper } from 'ricos/giphy/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(giphyTypeMapper);
