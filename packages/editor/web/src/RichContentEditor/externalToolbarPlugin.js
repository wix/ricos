/**
  createExternalToolbarPlugin
  registers draft-plugins-editor lifecycle events for usage in externalized button props
* */
/* eslint-disable no-console */
export default commonPubsub => ({
  initialize: ({ getEditorState, setEditorState }) => {
    console.debug('createExternalToolbarPlugin initialized');
    commonPubsub.set('getEditorState', getEditorState);
    commonPubsub.set('setEditorState', setEditorState);
  },
  onChange: editorState => {
    console.debug('createExternalToolbarPlugin onChange');
    commonPubsub.set('selection', editorState.getSelection());
    return editorState;
  },
});
