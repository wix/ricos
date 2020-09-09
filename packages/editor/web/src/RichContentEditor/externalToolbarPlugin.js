/**
  createExternalToolbarPlugin
  registers draft-plugins-editor lifecycle events for usage in externalized button props
* */
/* eslint-disable no-console */
export default commonPubsub => ({
  initialize: ({ getEditorState, setEditorState }) => {
    commonPubsub.set('getEditorState', getEditorState);
    commonPubsub.set('setEditorState', setEditorState);
  },
  onChange: editorState => {
    commonPubsub.set('selection', editorState.getSelection());
    return editorState;
  },
});
