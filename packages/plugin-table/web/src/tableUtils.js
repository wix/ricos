import { EditorState, convertToRaw } from 'wix-rich-content-editor';

//CREATE EMPTY TABLE COMPS
export const createEmptyCellContent = () =>
  convertToRaw(EditorState.createEmpty().getCurrentContent());

export const createEmptyCell = () => ({ content: createEmptyCellContent() });

export const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {}, rowHeight: '47px' };
  columnsIndexes.forEach(i => (emptyRow.columns[i] = createEmptyCell()));
  return emptyRow;
};

//RESIZERS
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

//SELECTION
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

export class TableDataUtil {
  constructor(componentData) {
    this.updateComponentData(componentData);
  }

  updateComponentData = componentData => {
    this.componentData = componentData;
    this.rows = this.componentData.config.rows;
  };

  //TABLE DATA GETTERS
  getRowColumns = i => this.getRow(i)?.columns;

  getRows = () => this.componentData?.config?.rows;

  getRow = i => this.getRows()?.[i]; //just table

  getRowHeight = i => this.getRow(i)?.rowHeight; //row renderer

  getRowNum = () => Object.entries(this.getRows()).length; //table viewer, table component, table

  getColNum = () => Object.entries(this.getRowColumns(0)).length; //table viewer, table component, table

  getCell = (i, j) => this.getRow(i) && this.getRowColumns(i)[j]; // cell renderer, table

  getCellContent = (i, j) => this.getCell(i, j)?.content; //table viewer, table component, table, cell renderer

  //SELECTION
  getRowsSelection = rowsIndexes => ({
    //table component
    start: { i: rowsIndexes.start, j: 0 },
    end: { i: rowsIndexes.end, j: this.getColNum() - 1 },
  });

  getColsSelection = colsIndexes => ({
    //table component
    start: { i: 0, j: colsIndexes.start },
    end: { i: this.getRowNum() - 1, j: colsIndexes.end },
  });

  getAllCellsSelection = () => ({
    //table component
    start: { i: 0, j: 0 },
    end: {
      i: this.getRowNum() - 1,
      j: this.getColNum() - 1,
    },
  });

  isAllCellsSelected = (
    start,
    end //table component
  ) =>
    start &&
    end &&
    Math.min(start.i, end.i) === 0 &&
    Math.min(start.j, end.j) === 0 &&
    Math.max(start.i, end.i) === this.getRowNum() - 1 &&
    Math.max(start.j, end.j) === this.getColNum() - 1;
}
