import handlePastedText from '../src/RichContentEditor/handlePastedText';
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  SelectionState,
} from 'wix-rich-content-editor-common';
import { raw, expectedRaw } from './TestData/pasted-data';

describe('Paste text tests', () => {
  it('should paste text on atomic block correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(raw));
    const blockKey = '6hc2b';
    const selection = SelectionState.createEmpty(blockKey);
    const editorStateWithSelection = EditorState.forceSelection(editorState, selection);
    const pastedEditorState = handlePastedText('3000', undefined, editorStateWithSelection);
    const pastedRaw = convertToRaw(pastedEditorState.getCurrentContent());
    expect(pastedRaw).toEqual(expectedRaw);
  });
});
