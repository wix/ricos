import { EditorState } from '@wix/draft-js';

function createEditorStateWithoutComposition(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

export const undo = (editorState: EditorState) =>
  createEditorStateWithoutComposition(EditorState.undo(editorState));

export const redo = (editorState: EditorState) =>
  createEditorStateWithoutComposition(EditorState.redo(editorState));
