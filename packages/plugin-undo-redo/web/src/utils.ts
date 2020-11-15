import { EditorState } from 'wix-rich-content-editor-common';

export default function createEditorStateWithoutComposition(editorState: EditorState) {
  return EditorState.set(editorState, {
    inCompositionMode: false,
  });
}
