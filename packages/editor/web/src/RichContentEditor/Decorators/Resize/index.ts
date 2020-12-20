import createDecorator from './createDecorator';
import { EditorPlugin, PluginFunctions } from 'draft-js-plugins-editor';

export default (config): EditorPlugin & { decorator } => {
  const store: Partial<PluginFunctions> = {
    getEditorRef: undefined,
    getEditorState: undefined,
    setEditorState: undefined,
  };
  return {
    initialize: ({ getEditorRef, getEditorState, setEditorState }) => {
      store.getEditorRef = getEditorRef;
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    decorator: createDecorator({ config, store }),
  };
};
