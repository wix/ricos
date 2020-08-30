import { EditorState, convertToRaw } from 'wix-rich-content-editor';

export const createEmptyCellContent = () =>
  convertToRaw(EditorState.createEmpty().getCurrentContent());

const getRows = componentData => componentData?.config?.rows;

export const createEmptyCell = () => ({ content: createEmptyCellContent() });
export const setRowCell = (row, cell, j) => (row.columns[j] = cell);
export const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {} };
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

export const getColsWidth = componentData => {
  let colsWidth = '';
  const columns = getRowColumns(componentData, 0);
  columns &&
    //eslint-disable-next-line
    Object.entries(columns).forEach(([j, column]) => {
      if (column.style && column.style.width) {
        colsWidth += column.style.width + 'px ';
      } else {
        colsWidth += 'auto ';
      }
    });
  return colsWidth;
};
export const getRowsHeight = componentData => {
  let rowsHeight = '';
  const rows = getRows(componentData);
  rows &&
    //eslint-disable-next-line
    Object.entries(rows).forEach(([i, row]) => {
      if (row.rowHeight) {
        rowsHeight += row.rowHeight + ' ';
      } else {
        rowsHeight += 'auto ';
      }
    });
  return rowsHeight;
};

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
  range(start.i, end.i).map(i => range(start.j, end.j).map(j => ranges.push({ i, j })));
  return ranges;
};
