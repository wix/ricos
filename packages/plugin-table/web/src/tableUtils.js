import { EditorState, convertToRaw } from 'wix-rich-content-editor';

export const createEmptyCellContent = () =>
  convertToRaw(EditorState.createEmpty().getCurrentContent());

const getRows = componentData => componentData?.config?.rows;

export const createEmptyCell = () => ({ content: createEmptyCellContent() });
export const setRowCell = (row, cell, j) => (row.columns[j] = cell);
export const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {}, rowHeight: '47px' };
  columnsIndexes.forEach(i => setRowCell(emptyRow, createEmptyCell(), i));
  return emptyRow;
};
export const getRowColumns = (componentData, i) => getRow(componentData, i)?.columns;
export const getRow = (componentData, i) => getRows(componentData)?.[i];
export const getRowHeight = (componentData, i) => getRow(componentData, i)?.rowHeight;
export const getRowNum = componentData => Object.entries(getRows(componentData)).length;
export const getColNum = componentData => Object.entries(getRowColumns(componentData, 0)).length;
export const getCell = (componentData, i, j) =>
  getRow(componentData, i) && getRowColumns(componentData, i)[j];
export const getCellContent = (componentData, i, j) => getCell(componentData, i, j)?.content;

export const range = (start, end) => {
  const array = [];
  const inc = end - start > 0;
  for (let i = start; inc ? i <= end : i >= end; inc ? i++ : i--) {
    inc ? array.push(i) : array.unshift(i);
  }
  return array;
};

export const getRange = ({ start, end }) => {
  const ranges = [];
  start &&
    end &&
    range(start.i, end.i).map(i => range(start.j, end.j).map(j => ranges.push({ i, j })));
  return ranges;
};

export const getColsRange = ({ start, end }) => {
  const ranges = [];
  range(start.j, end.j).map(j => ranges.push(j));
  return ranges;
};

const getStyleVal = (elm, css) => {
  return window.getComputedStyle(elm, null).getPropertyValue(css);
};

export const paddingDiff = col => {
  if (getStyleVal(col, 'box-sizing') === 'border-box') {
    return 0;
  }
  const padLeft = getStyleVal(col, 'padding-left');
  const padRight = getStyleVal(col, 'padding-right');
  return parseInt(padLeft) + parseInt(padRight);
};

export const getCellBorderStyle = (selection, row, col, borderStyle) => {
  const style = {};
  const range = getRange(selection);
  if (!range.find(({ i, j }) => i === row && j === col - 1)) {
    style.borderLeft = borderStyle;
  }
  if (!range.find(({ i, j }) => i === row && j === col + 1)) {
    style.borderRight = borderStyle;
  }
  if (!range.find(({ i, j }) => i === row - 1 && j === col)) {
    style.borderTop = borderStyle;
  }
  if (!range.find(({ i, j }) => i === row + 1 && j === col)) {
    style.borderBottom = borderStyle;
  }
  return style;
};
