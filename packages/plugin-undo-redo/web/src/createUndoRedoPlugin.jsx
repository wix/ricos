import { createBasePlugin } from 'wix-rich-content-editor-common';
import { UNDO_REDO_TYPE } from './types';
import createToolbar from './createToolbar';

const createUndoRedoPlugin = (config = {}) => {
  const type = UNDO_REDO_TYPE;
  const { helpers, theme, t, relValue, [type]: settings = {}, ...rest } = config;

  const onChange = editorState => {
    if (plugin.pubsub) {
      plugin.pubsub.set('editorState', editorState);
    }
    return editorState;
  };

  const plugin = createBasePlugin(
    {
      settings,
      theme,
      type,
      relValue,
      toolbar: createToolbar(config),
      helpers,
      t,
      ...rest,
    },
    { onChange }
  );
  return plugin;
};

export { createUndoRedoPlugin };
