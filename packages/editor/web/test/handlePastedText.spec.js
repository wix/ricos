import handlePastedText, {
  convertParsedEditorStateObjectToRawData,
} from '../src/RichContentEditor/handlePastedText';
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  SelectionState,
} from 'wix-rich-content-editor-common';
import {
  raw,
  expectedRaw,
  emptyRaw,
  rawContent,
  expectedRawContent,
  headerWithAlignmentGoogleDocsHTML,
  headerWithAlignmentGoogleDocsExpectedRaw,
  headerWithAlignmentWordHTML,
  headerWithAlignmentWordExpectedRaw,
  textWithLineSpacingWordHTML,
  textWithLineSpacingWordExpectedRaw,
} from './TestData/pasted-data';

const allHeaders = ['h2', 'h3', 'h4', 'h5', 'h6'];

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

  it('should paste header with alignment from Google Docs correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(emptyRaw));
    const blockKey = '4lirv';
    const selection = SelectionState.createEmpty(blockKey);
    const editorStateWithSelection = EditorState.forceSelection(editorState, selection);
    const pastedEditorState = handlePastedText(
      '',
      headerWithAlignmentGoogleDocsHTML,
      editorStateWithSelection,
      undefined,
      allHeaders
    );
    const pastedRaw = convertToRaw(pastedEditorState.getCurrentContent());
    expect(pastedRaw).toEqual(headerWithAlignmentGoogleDocsExpectedRaw);
  });

  it('should paste header with alignment from Microsft Word correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(emptyRaw));
    const blockKey = '4lirv';
    const selection = SelectionState.createEmpty(blockKey);
    const editorStateWithSelection = EditorState.forceSelection(editorState, selection);
    const pastedEditorState = handlePastedText(
      '',
      headerWithAlignmentWordHTML,
      editorStateWithSelection,
      undefined,
      allHeaders
    );
    const pastedRaw = convertToRaw(pastedEditorState.getCurrentContent());
    expect(pastedRaw).toEqual(headerWithAlignmentWordExpectedRaw);
  });

  it('should paste text with line spacing from Microsft Word correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(emptyRaw));
    const blockKey = '4lirv';
    const selection = SelectionState.createEmpty(blockKey);
    const editorStateWithSelection = EditorState.forceSelection(editorState, selection);
    const pastedEditorState = handlePastedText(
      '',
      textWithLineSpacingWordHTML,
      editorStateWithSelection
    );
    const pastedRaw = convertToRaw(pastedEditorState.getCurrentContent());
    expect(pastedRaw).toEqual(textWithLineSpacingWordExpectedRaw);
  });

  it('should convert raw content of accordion (from EditorState JSON object to rawData) correctly', () => {
    expect(convertParsedEditorStateObjectToRawData(rawContent)).toEqual(expectedRawContent);
  });
});
