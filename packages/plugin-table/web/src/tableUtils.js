import { getBlockAtStartOfSelection, setEntityData } from 'wix-rich-content-editor-common';
import Table from './domain/table';

const getTableBlockData = editorState => {
  const currentBlock = getBlockAtStartOfSelection(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  return { data: editorState.getCurrentContent().getEntity(entityKey).data, entityKey };
};

export const addColumn = editorState => {
  const { data, entityKey } = getTableBlockData(editorState);
  const table = new Table(data);
  const colNum = table.getColNum();
  const dataToSave = table.addColumn(colNum);
  return setEntityData(editorState, entityKey, dataToSave);
};

export const addRow = editorState => {
  const { data, entityKey } = getTableBlockData(editorState);
  const table = new Table(data);
  const rowNum = table.getRowNum();
  const dataToSave = table.addRow(rowNum);
  return setEntityData(editorState, entityKey, dataToSave);
};
