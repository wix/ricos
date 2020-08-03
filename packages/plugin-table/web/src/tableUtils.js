import { getBlockAtStartOfSelection, setEntityData } from 'wix-rich-content-editor-common';
import Table from './domain/table';

const getTableBlockData = editorState => {
  const currentBlock = getBlockAtStartOfSelection(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  return {
    data: editorState.getCurrentContent().getEntity(entityKey).data,
    saveNewDataFunc: newData => setEntityData(editorState, entityKey, newData),
  };
};

export const addColumn = editorState => {
  const { data, saveNewDataFunc } = getTableBlockData(editorState);
  const table = new Table(data, saveNewDataFunc);
  const colNum = table.getColNum();
  return table.addColumn(colNum);
};

export const addRow = editorState => {
  const { data, saveNewDataFunc } = getTableBlockData(editorState);
  const table = new Table(data, saveNewDataFunc);
  const rowNum = table.getRowNum();
  return table.addRow(rowNum);
};
