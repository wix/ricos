import { EditorState, convertToRaw } from 'wix-rich-content-editor';

export const createEmptyCellContent = () =>
  convertToRaw(EditorState.createEmpty().getCurrentContent());

export const getRows = componentData => componentData?.config?.rows;
export const getRow = (componentData, i) => getRows(componentData)?.[i];
export const getRowHeight = (componentData, i) => getRow(componentData, i)?.rowHeight;
export const getRowColumns = (componentData, i) => getRow(componentData, i)?.columns;
export const getRowNum = componentData => Object.entries(getRows(componentData)).length;
export const getColNum = componentData => Object.entries(getRowColumns(componentData, 0)).length;
export const getCellData = (componentData, i, j) =>
  getRow(componentData, i) && getRowColumns(componentData, i)[j];
export const getCellContent = (componentData, i, j) => getCellData(componentData, i, j)?.content;

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
