import { EditorState } from 'wix-rich-content-editor';
import { TABLE_TYPE as type } from './types';
import { ROW_DEFAULT_HEIGHT } from './consts';
import { DEFAULTS } from './defaults';
import {
  isCursorAtStartOfContent,
  isCursorAtEndOfContent,
  isCursorAtFirstLine,
  isCursorAtLastLine,
} from 'wix-rich-content-editor-common';

export const createEmptyCellEditor = () => EditorState.createEmpty();
export const createEmptyCell = () => ({ content: createEmptyCellEditor() });
export const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {} };
  columnsIndexes.forEach(i => (emptyRow.columns[i] = createEmptyCell()));
  return emptyRow;
};

const createEmptyRows = (rowNum, colNum) => {
  const rows = {};
  [...Array(rowNum).fill(0)].map((row, i) => (rows[i] = createEmptyRow(colNum)));
  return rows;
};

export const getDefaultsSettings = (rowNum = 4, colNum = 4) =>
  Object.freeze({
    type,
    config: {
      ...DEFAULTS.config,
      colsWidth: [...Array(colNum).fill(10)],
      rowsHeight: [...Array(rowNum).fill(ROW_DEFAULT_HEIGHT)],
      rows: createEmptyRows(rowNum, colNum),
    },
  });

export const handleCellClipboardEvent = (e, editorState) => {
  let shouldPreventDefault;
  if (e.key === 'ArrowRight') {
    isCursorAtEndOfContent(editorState) && (shouldPreventDefault = true);
  } else if (e.key === 'ArrowLeft') {
    isCursorAtStartOfContent(editorState) && (shouldPreventDefault = true);
  } else if (e.key === 'ArrowUp') {
    isCursorAtFirstLine(editorState) && (shouldPreventDefault = true);
  } else if (e.key === 'ArrowDown') {
    isCursorAtLastLine(editorState) && (shouldPreventDefault = true);
  }
  if (shouldPreventDefault) {
    e.stopPropagation();
    e.preventDefault();
  }
};
