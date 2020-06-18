import createDecorator from './createDecorator';

export default config => {
  const store = {
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
