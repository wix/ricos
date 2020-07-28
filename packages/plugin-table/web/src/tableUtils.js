import { getBlockAtStartOfSelection, setEntityData } from 'wix-rich-content-editor-common';

export const addColumn = editorState => {
  const currentBlock = getBlockAtStartOfSelection(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const data = editorState.getCurrentContent().getEntity(entityKey).data;
  const { cells, colNum } = data.config;
  const rowIndexes = Object.keys(cells);
  rowIndexes.map(i => (cells[i] = { ...cells[i], [parseInt(colNum)]: emptyState }));
  data.config.colNum++;

  return setEntityData(editorState, entityKey, data);
};

export const addRow = editorState => {
  const currentBlock = getBlockAtStartOfSelection(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  const data = editorState.getCurrentContent().getEntity(entityKey).data;
  data.config.rowNum++;

  return setEntityData(editorState, entityKey, data);
};

export const emptyState = {
  blocks: [
    {
      key: '42d26',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
  VERSION: '7.13.1',
};
