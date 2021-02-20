import 'wix-rich-content-plugin-text-color/dist/styles.min.css';
import {
  textHighlightInlineStyleMapper,
  textColorInlineStyleMapper,
} from 'wix-rich-content-plugin-text-color/viewer';
import createViewerBundle from './RichContentViewerWrapper';

export default () =>
  createViewerBundle([textHighlightInlineStyleMapper, textColorInlineStyleMapper]);
