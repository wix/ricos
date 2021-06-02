import { convertToRaw, convertFromRaw } from '../lib/editorStateConversion';
import { mergeBlockData, EditorState } from 'wix-rich-content-editor-common';
import {
  raw,
  rawWithAnchorsInText,
  dynamicStyles,
  rawWithAnchorsInImage,
  rawWithOldSoundCloudVersion,
} from './TestData/conversion-content-state';
import collapsibleListRawData from './TestData/collapsible-list-raw-data.json';
import { VIDEO_TYPE } from 'ricos-content';
import { cloneDeep } from 'lodash';

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

  it('should convert Collapsible List from raw & convert it back to raw correctly', () => {
    const { VERSION: _, ...raw } = collapsibleListRawData;
    const rawCopy = cloneDeep(raw);
    const editorState = EditorState.createWithContent(convertFromRaw(rawCopy));
    // eslint-disable-next-line no-unused-vars
    const { VERSION: __, ...rawData } = convertToRaw(editorState.getCurrentContent());
    expect(rawData).toEqual(raw);
  });

  it('should convert old version of sound-cloud plugin correctly', () => {
    const editorState = EditorState.createWithContent(convertFromRaw(rawWithOldSoundCloudVersion));
    const newRaw = convertToRaw(editorState.getCurrentContent());
    expect(newRaw.entityMap['0'].type).toEqual(VIDEO_TYPE);
    expect(newRaw.entityMap['0'].data.type).toEqual('soundCloud');
  });
});
