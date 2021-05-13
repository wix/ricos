import { pluginUndoRedo } from 'wix-rich-content-plugin-undo-redo/viewer';
import { createViewerBundle } from './createViewerBundle';

export default () => createViewerBundle(pluginUndoRedo());
