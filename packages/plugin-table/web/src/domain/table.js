import {
  createEmptyCellEditor,
  getRange,
  createEmptyRow,
  createEmptyCell,
  getCellBorderStyle,
  TableDataUtil,
} from '../tableUtils';
import { CELL_MIN_WIDTH, ROW_DEFAULT_HEIGHT, COL_DEFAULT_WIDTH } from '../consts';
import { cloneDeep, isNumber } from 'lodash';

const setRowsCell = (rows, cell, i, j) => (rows[i].columns[j] = cell);
const setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

class Table extends TableDataUtil {
  constructor(componentData = {}, saveNewDataFunc) {
    super(componentData);
    this.saveNewDataFunc = saveNewDataFunc;
    this.contentMaxHeight = 0;
  }

  setNewRows = rows => {
    this.componentData.config.rows = rows;
    this.rows = rows;
    this.saveNewDataFunc(this.componentData);
  };

  pasteCells = (copiedCellsRange, targetRow, targetCol) => {
    const copiedRowsNum =
      copiedCellsRange[copiedCellsRange.length - 1].i - copiedCellsRange[0].i + 1;
    const copiedColsNum =
      copiedCellsRange[copiedCellsRange.length - 1].j - copiedCellsRange[0].j + 1;
    const rowRatio = targetRow - copiedCellsRange[0].i;
    const colRatio = targetCol - copiedCellsRange[0].j;
    const rowNum = this.getRowNum();
    const colNum = this.getColNum();
    const rowsOutOfBoundNum = targetRow + copiedRowsNum - rowNum;
    const colsOutOfBoundNum = targetCol + copiedColsNum - colNum;
    if (rowsOutOfBoundNum > 0) {
      const rowsIndexes = [...Array(rowsOutOfBoundNum).fill(0)].map((value, i) => i + rowNum);
      rowsIndexes.forEach(i => (this.rows[i] = createEmptyRow(colNum)));
    }
    if (colsOutOfBoundNum > 0) {
      const colsIndexes = [...Array(colsOutOfBoundNum).fill(0)].map(
        (value, i) => i + colNum - 1 + colsOutOfBoundNum
      );
      //eslint-disable-next-line
      Object.entries(this.rows).forEach(([i, row]) => {
        colsIndexes.forEach(i => (row.columns[i] = createEmptyCell()));
      });
    }
    copiedCellsRange.forEach(({ i, j }) => {
      setCellContent(this.rows, this.getCellContent(i, j), i + rowRatio, j + colRatio);
    });
    this.setNewRows(this.rows);
  };

  clearRange = range => {
    const emptyEditorState = createEmptyCellEditor();
    range.forEach(({ i, j }) => setCellContent(this.rows, emptyEditorState, i, j));
    this.setNewRows(this.rows);
  };

  isObjectsEqual = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);

  updateCellContent = (i, j, content) => {
    const oldContent = this.getCell(i, j).content;
    if (!this.isObjectsEqual(oldContent, content)) {
      this.getCell(i, j).content = content;
      this.saveNewDataFunc(this.componentData);
    }
  };

  addRow = index => {
    const colNum = this.getColNum();
    const cellsWithNewRow = { [index]: createEmptyRow(colNum) };
    Object.entries(this.rows).forEach(([i, row]) => {
      if (i >= index) {
        cellsWithNewRow[parseInt(i) + 1] = row;
      } else if (i < index) {
        cellsWithNewRow[i] = row;
      }
    });
    this.getRowsHeight().splice(index, 0, ROW_DEFAULT_HEIGHT);
    this.setNewRows(cellsWithNewRow);
  };

  addColumn = index => {
    const cellsWithNewCol = {};
    //eslint-disable-next-line
    Object.entries(this.rows).forEach(([i, row]) => {
      cellsWithNewCol[i] = { ...row };
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j >= index) {
          cellsWithNewCol[i].columns[parseInt(j) + 1] = column;
        } else if (j < index) {
          cellsWithNewCol[i].columns[j] = column;
        }
      });
      cellsWithNewCol[i].columns[index] = createEmptyCell();
    });
    this.getColsWidth().splice(index, 0, COL_DEFAULT_WIDTH);
    const newColsWidth = this.getColsWidth().map(colWith => {
      if (isNumber(colWith)) {
        return colWith - 20 > CELL_MIN_WIDTH ? colWith - 20 : CELL_MIN_WIDTH;
      }
      return colWith;
    });
    this.componentData.config.colsWidth = newColsWidth;
    this.setNewRows(cellsWithNewCol);
  };

  setCellsStyle = (style, range) => {
    range.forEach(({ i, j }) => {
      const cell = this.getCell(i, j);
      cell.style = { ...(cell.style || {}), ...style };
    });
    this.setNewRows(this.componentData.config.rows);
  };

  setCellsSelectionBorderStyle = (style, selection) => {
    const range = getRange(selection);
    range.forEach(({ i, j }) => {
      const cell = this.getCell(i, j);
      cell.style = { ...(cell.style || {}), ...getCellBorderStyle(selection, i, j, style) };
    });
    this.setNewRows(this.componentData.config.rows);
  };

  setColumnWidth = (range, width) => {
    range.forEach(({ j }) => (this.componentData.config.colsWidth[j] = width));
    this.saveNewDataFunc(this.componentData);
  };

  setRowHeight = (range, height) => {
    range.forEach(({ i }) => (this.componentData.config.rowsHeight[i] = height));
    this.setNewRows(this.componentData.config.rows);
  };

  distributeColumns = range => {
    const colsWidth = this.getColsWidth();
    range.forEach(i => (colsWidth[i] = COL_DEFAULT_WIDTH));
    this.saveNewDataFunc(this.componentData);
  };

  distributeRows = (innerEditorsRefs, range) => {
    let maxContentHeight = 0;
    range.forEach(({ i, j }) => {
      const height = innerEditorsRefs[`${i}-${j}`].editorHeight + 20;
      if (height > maxContentHeight) {
        maxContentHeight = height;
      }
    });
    this.setRowHeight(range, maxContentHeight);
  };

  deleteRow = deleteIndexes => {
    const cellsWithoutRow = {};
    const rowNum = this.getRowNum();
    [...Array(rowNum).fill(0)].forEach((value, i) => {
      if (i < deleteIndexes[0]) {
        cellsWithoutRow[i] = this.rows[i];
      } else if (i > deleteIndexes[deleteIndexes.length - 1]) {
        cellsWithoutRow[parseInt(i) - deleteIndexes.length] = this.rows[i];
      }
    });
    this.getRowsHeight().splice(deleteIndexes, deleteIndexes.length);
    this.setNewRows(cellsWithoutRow);
  };

  deleteColumn = deleteIndexes => {
    const cellsWithoutCol = {};
    const colNum = this.getColNum();
    Object.entries(this.rows).forEach(([i, row]) => {
      cellsWithoutCol[i] = createEmptyRow(colNum - deleteIndexes.length);
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j < deleteIndexes[0]) {
          setRowsCell(cellsWithoutCol, column, i, j);
        } else if (j > deleteIndexes[deleteIndexes.length - 1]) {
          setRowsCell(cellsWithoutCol, column, i, parseInt(j) - deleteIndexes.length);
        }
      });
    });
    this.getColsWidth().splice(deleteIndexes, deleteIndexes.length);
    this.setNewRows(cellsWithoutCol);
  };

  getSelectedRows = (range = []) => {
    const colNum = this.getColNum();
    return this.getSelectedSection(range, ({ i, j }) => ({ key: i, value: j }), colNum);
  };

  getSelectedCols = (range = []) => {
    const rowNum = this.getRowNum();
    return this.getSelectedSection(range, ({ i, j }) => ({ key: j, value: i }), rowNum);
  };

  getSelectedSection = (range, keyValueMapper, cellsNum) => {
    const selectedCells = {};
    range?.forEach(range => {
      const { key, value } = keyValueMapper(range);
      if (selectedCells[key]) {
        selectedCells[key].push(value);
      } else {
        selectedCells[key] = [value];
      }
    });
    const selected = [];
    Object.entries(selectedCells).forEach(
      ([j, col]) => col.length === cellsNum && selected.push(j)
    );
    return selected[0] && selected;
  };

  mergeCells = range => {
    const { i: parentRow, j: parentCol } = range[0];
    const { i: lastChildRow, j: lastChildCol } = range[range.length - 1];
    const childrenRange = range.slice(1);
    const parentCell = this.getCell(parentRow, parentCol);
    parentCell.merge = {
      ...(parentCell.merge || {}),
      rowSpan: lastChildRow - parentRow + 1,
      colSpan: lastChildCol - parentCol + 1,
    };
    childrenRange.forEach(
      ({ i, j }) =>
        (this.getCell(i, j).merge = {
          ...(this.getCell(i, j).merge || {}),
          child: true,
        })
    );
    this.setNewRows(this.rows);
  };

  splitCell = range => {
    const { i: parentRow, j: parentCol } = range[0];
    const parentCell = this.getCell(parentRow, parentCol);
    const { rowSpan, colSpan } = parentCell.merge;
    const splitRange = getRange({
      start: range[0],
      end: { i: parentRow + rowSpan - 1, j: parentCol + colSpan - 1 },
    });
    splitRange.forEach(({ i, j }) => (this.getCell(i, j).merge = {}));
    this.setNewRows(this.rows);
  };

  isParentCellSelected = (range = []) => {
    const mergeData = range[0] && this.getCell(range[0].i, range[0].j)?.merge;
    const { rowSpan, colSpan } = mergeData || {};
    return range[0] && range.length === 1 && (rowSpan > 1 || colSpan > 1);
  };

  reorderColumns = (from, to) => {
    const isAddedToLaterCol = from.start < to;
    const numOfColsToReorder = from.end - from.start + 1;
    const dropIndex = isAddedToLaterCol ? to - numOfColsToReorder : to;
    const cellsWithReorder = cloneDeep(this.rows);
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row.columns).forEach(([j, column]) => {
        const cellToSet = this.getCell(i, j);
        if (isAddedToLaterCol && j > from.end && j < dropIndex + numOfColsToReorder) {
          row.columns[parseInt(j) - numOfColsToReorder] = cellToSet;
        } else if (!isAddedToLaterCol && j >= to && j < from.start) {
          row.columns[parseInt(j) + numOfColsToReorder] = cellToSet;
        } else if (j >= from.start && j <= from.end) {
          row.columns[dropIndex + parseInt(j) - from.start] = cellToSet;
        }
      });
    });
    this.setNewRows(cellsWithReorder);
  };

  reorderRows = (from, to) => {
    const isAddedToLaterRow = from.start < to;
    const numOfColsToReorder = from.end - from.start + 1;
    const dropIndex = isAddedToLaterRow ? to - numOfColsToReorder : to;
    const cellsWithReorder = cloneDeep(this.rows);
    //eslint-disable-next-line
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      const rowToSet = this.rows[i];
      if (isAddedToLaterRow && i > from.end && i < dropIndex + numOfColsToReorder) {
        cellsWithReorder[parseInt(i) - numOfColsToReorder] = rowToSet;
      } else if (!isAddedToLaterRow && i >= to && i < from.start) {
        cellsWithReorder[parseInt(i) + numOfColsToReorder] = rowToSet;
      } else if (i >= from.start && i <= from.end) {
        cellsWithReorder[dropIndex + parseInt(i) - from.start] = rowToSet;
      }
    });
    this.setNewRows(cellsWithReorder);
  };
}

export default Table;
