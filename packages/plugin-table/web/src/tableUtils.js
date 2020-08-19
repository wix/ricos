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

export const getRows = componentData => componentData.config.rows;
export const getRow = (componentData, i) => getRows(componentData)?.[i];
export const getRowColumns = (componentData, i) => getRow(componentData, i)?.columns;
export const getRowNum = componentData => Object.entries(getRows(componentData)).length;
export const getColNum = componentData => Object.entries(getRowColumns(componentData, 0)).length;
export const getCellData = (componentData, i, j) =>
  getRow(componentData, i) && getRowColumns(componentData, i)[j];
export const getCellContent = (componentData, i, j) => getCellData(componentData, i, j)?.content;
