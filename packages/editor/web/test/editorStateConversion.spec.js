import { convertToRaw } from '../src/lib/editorStateConversion';
import { mergeBlockData, convertFromRaw, EditorState } from 'wix-rich-content-editor-common';
import {
  raw,
  rawWithAnchorsInText,
  dynamicStyles,
  rawWithAnchorsInImage,
} from './TestData/conversion-content-state';

describe('ContentState conversion', () => {
  it('should convert correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(raw));
    const newState = mergeBlockData(editorState, { dynamicStyles });
    const newRaw = convertToRaw(newState.getCurrentContent());
    expect(newRaw.blocks[0]).toEqual(raw.blocks[0]);
    expect(newRaw.blocks[1]).toEqual(raw.blocks[1]);
  });

  it('should convert anchors correctly (text)', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(rawWithAnchorsInText));
    const newRaw = convertToRaw(editorState.getCurrentContent());
    expect(newRaw.entityMap['0'].type).not.toEqual('LINK');
    expect(newRaw.entityMap['1'].type).not.toEqual('LINK');
  });

  it('should convert anchors correctly (image)', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(rawWithAnchorsInImage));
    const newRaw = convertToRaw(editorState.getCurrentContent());
    expect(newRaw.entityMap['0'].data.config.link).toEqual(undefined);
    expect(newRaw.entityMap['1'].data.config.link).toEqual(undefined);
  });
});
