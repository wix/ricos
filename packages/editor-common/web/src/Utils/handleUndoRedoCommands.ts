import { EditorState } from '@wix/draft-js';

function removeCompositionModeFromEditorState(editorState: EditorState) {
  if (editorState.isInCompositionMode()) {
    return EditorState.set(editorState, {
      inCompositionMode: false,
    });
  }
  return editorState;
}

export const undo = (editorState: EditorState) =>
  removeCompositionModeFromEditorState(EditorState.undo(editorState));

export const redo = (editorState: EditorState) =>
  removeCompositionModeFromEditorState(EditorState.redo(editorState));
