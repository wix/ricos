import { convertToRaw } from '../src/lib/editorStateConversion';
import { mergeBlockData, convertFromRaw, EditorState } from 'wix-rich-content-editor-common';

describe('ContentState conversion', () => {
  it('should convert correctly', () => {
    const dynamicStyles = {
      'line-height': '2.5',
      'padding-top': '0',
      'padding-bottom': '0',
    };
    const raw = {
      blocks: [
        {
          key: 'foo',
          text: 'test',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            dynamicStyles: {
              'line-height': '2.5',
              'padding-top': '0',
              'padding-bottom': '0',
            },
          },
        },
        {
          key: 'bar',
          text: 'test2',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
      VERSION: '6.8.0',
    };

    const editorState = EditorState.createWithContent(convertFromRaw(raw));
    const newState = mergeBlockData(editorState, { dynamicStyles });
    const newRaw = convertToRaw(newState.getCurrentContent());
    expect(newRaw.blocks[0]).toEqual(raw.blocks[0]);
    expect(newRaw.blocks[1]).toEqual(raw.blocks[1]);
  });
});
