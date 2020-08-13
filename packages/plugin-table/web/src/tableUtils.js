import { getBlockAtStartOfSelection, setEntityData } from 'wix-rich-content-editor-common';
import Table from './domain/table';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';

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
  const colNum = table.colNum;
  return table.addColumn(colNum);
};

export const addRow = editorState => {
  const { data, saveNewDataFunc } = getTableBlockData(editorState);
  const table = new Table(data, saveNewDataFunc);
  const rowNum = table.rowNum;
  return table.addRow(rowNum);
};

export const createEmptyCellContent = () =>
  convertToRaw(EditorState.createEmpty().getCurrentContent());
