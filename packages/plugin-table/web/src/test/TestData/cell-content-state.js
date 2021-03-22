import { convertFromRaw, EditorState } from 'wix-rich-content-editor-common';
import { TABLE_TYPE } from '../../types';

export const getMockComponentData = () => ({
  type: TABLE_TYPE,
  config: {
    alignment: 'center',
    colsWidth: [10, 10],
    colsMinWidth: [120, 120],
    rowsHeight: [47, 47],
    size: 'content',
    rows: {
      0: {
        columns: {
          0: getCellContent('cell 0,0'),
          1: getCellContent('cell 0,1'),
        },
      },
      1: {
        columns: {
          0: getCellContent('cell 1,0'),
          1: getCellContent('cell 1,1'),
        },
      },
    },
  },
});

const getCellContent = text => ({
  content: EditorState.createWithContent(convertFromRaw(getCellEditorWithText(text))),
});

const getCellEditorWithText = text => ({
  blocks: [
    {
      key: 'foo',
      text,
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
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
});
