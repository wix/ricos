import { convertToRaw } from '../src/lib/editorStateConversion';
import { mergeBlockData, convertFromRaw, EditorState } from 'wix-rich-content-editor-common';
import { raw, rawWithAnchors, dynamicStyles } from './TestData/conversion-content-state';

describe('ContentState conversion', () => {
  it('should convert correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(raw));
    const newState = mergeBlockData(editorState, { dynamicStyles });
    const newRaw = convertToRaw(newState.getCurrentContent());
    expect(newRaw.blocks[0]).toEqual(raw.blocks[0]);
    expect(newRaw.blocks[1]).toEqual(raw.blocks[1]);
  });

  it('should convert anchors correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(rawWithAnchors));
    const newRaw = convertToRaw(editorState.getCurrentContent());
    expect(newRaw.entityMap['0'].type).not.toEqual('LINK');
    expect(newRaw.entityMap['1'].type).not.toEqual('LINK');
  });
});
