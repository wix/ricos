import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getCell,
  getRange,
  getRow,
  createEmptyRow,
  createEmptyCell,
  setRowCell,
} from '../tableUtils';
import { CELL_MIN_WIDTH } from '../consts';

const setRowsCell = (rows, cell, i, j) => (rows[i].columns[j] = cell);
const setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

class Table {
  constructor(componentData = {}, saveNewDataFunc) {
    this.componentData = componentData;
    this.rows = this.componentData.config.rows;
    this.saveNewDataFunc = saveNewDataFunc;
    this.contentMaxHeight = 0;
  }

  setNewRows = rows => {
    this.rows = rows;
    this.componentData.config.rows = rows;
    const newData = {
      ...this.componentData,
      config: {
        ...this.componentData.config,
        rows,
      },
    };
    this.saveNewDataFunc(newData);
  };

  pasteCells = (copiedCellsRange, targetRow, targetCol) => {
    const { rows, componentData } = this;
    const copiedRowsNum =
      copiedCellsRange[copiedCellsRange.length - 1].i - copiedCellsRange[0].i + 1;
    const copiedColsNum =
      copiedCellsRange[copiedCellsRange.length - 1].j - copiedCellsRange[0].j + 1;
    const cellsWithPaste = { ...rows };
    const rowRatio = targetRow - copiedCellsRange[0].i;
    const colRatio = targetCol - copiedCellsRange[0].j;
    const rowNum = getRowNum(componentData);
    const colNum = getColNum(componentData);
    const rowsOutOfBoundNum = targetRow + copiedRowsNum - rowNum;
    const colsOutOfBoundNum = targetCol + copiedColsNum - colNum;
    if (rowsOutOfBoundNum > 0) {
      const rowsIndexes = [...Array(rowsOutOfBoundNum).fill(0)].map(
        (value, i) => i + rowNum - 1 + rowsOutOfBoundNum
      );
      rowsIndexes.forEach(i => (cellsWithPaste[i] = createEmptyRow(colNum)));
    }
    if (colsOutOfBoundNum > 0) {
      const colsIndexes = [...Array(colsOutOfBoundNum).fill(0)].map(
        (value, i) => i + colNum - 1 + colsOutOfBoundNum
      );
      //eslint-disable-next-line
      Object.entries(cellsWithPaste).forEach(([i, row]) => {
        colsIndexes.forEach(i => setRowCell(row, createEmptyCell(), i));
      });
    }
    copiedCellsRange.forEach(({ i, j }) => {
      setCellContent(
        cellsWithPaste,
        getCellContent(componentData, i, j),
        i + rowRatio,
        j + colRatio
      );
    });
    this.setNewRows(cellsWithPaste);
  };

  clearRange = range => {
    const emptyContentState = createEmptyCellContent();
    range.forEach(({ i, j }) => setCellContent(this.rows, emptyContentState, i, j));
    this.setNewRows(this.rows);
  };

  updateCellContent = (i, j, content) => {
    const { componentData } = this;
    getCell(componentData, i, j).content = content;
    this.saveNewDataFunc(componentData);
  };

  addRow = index => {
    const { rows, componentData } = this;
    const colNum = getColNum(componentData);
    let cellsWithNewRow = { ...rows };
    Object.entries(cellsWithNewRow).forEach(([i, row]) => {
      if (i >= index) {
        cellsWithNewRow = { ...cellsWithNewRow, [parseInt(i) + 1]: row };
      }
    });
    cellsWithNewRow[index] = createEmptyRow(colNum);
    this.setNewRows(cellsWithNewRow);
  };

  addColumn = index => {
    const { rows } = this;
    const cellsWithNewCol = { ...rows };
    const contentState = createEmptyCell();
    //eslint-disable-next-line
    Object.entries(cellsWithNewCol).forEach(([i, row]) => {
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j < index) {
          column.style = column.style || {};
          const colWith = column.style.width;
          colWith &&
            (column.style.width = colWith - 20 > CELL_MIN_WIDTH ? colWith - 20 : CELL_MIN_WIDTH);
        } else if (j >= index) {
          setRowCell(row, column, parseInt(j) + 1);
        }
      });
      setRowCell(row, contentState, index);
    });
    this.setNewRows(cellsWithNewCol);
  };

  formattingCells = (style, range) => {
    const { componentData } = this;
    range.forEach(({ i, j }) => {
      getCell(componentData, i, j).blocks.map(block =>
        block.inlineStyleRanges.push({
          offset: 0,
          length: block.text.length,
          style,
        })
      );
    });
    this.setNewRows(componentData.config.rows);
  };

  setCellsStyle = (style, range) => {
    const { componentData } = this;
    range.forEach(({ i, j }) => {
      const cell = getCell(componentData, i, j);
      cell.style = { ...(cell.style || {}), ...style };
    });
    this.setNewRows(componentData.config.rows);
  };

  setColumnWidth = (range, width) => {
    this.setCellsStyle({ width }, range);
  };

  setRowHeight = (range, height) => {
    const { componentData } = this;
    range.forEach(i => (getRow(componentData, i).rowHeight = height));
    this.setNewRows(componentData.config.rows);
  };

  distributeColumns = range => {
    const { componentData, rows } = this;
    //eslint-disable-next-line
    Object.entries(rows).forEach(([i, row]) => {
      range.forEach(j => {
        const cell = getCell(componentData, i, j);
        if (cell.style && cell.style.width) {
          const { width, ...rest } = cell.style; //eslint-disable-line
          cell.style = rest;
        }
      });
    });
    this.setNewRows(rows);
  };

  distributeRows = (tableRef, range) => {
    let maxHeight = 0;
    range.forEach(i => {
      const rowHeight = tableRef.children[i].offsetHeight;
      if (rowHeight > maxHeight) {
        maxHeight = rowHeight;
      }
    });
    this.setRowHeight(range, maxHeight);
  };

  deleteRow = (deleteStartIndex, rowsNumToSelect) => {
    const cellsWithoutRow = {};
    const rowNum = getRowNum(this.componentData);
    [...Array(rowNum).fill(0)].forEach((value, i) => {
      if (i < deleteStartIndex) {
        cellsWithoutRow[i] = this.rows[i];
      } else if (i > deleteStartIndex) {
        cellsWithoutRow[parseInt(i) - rowsNumToSelect] = this.rows[i];
      }
    });
    this.setNewRows(cellsWithoutRow);
  };

  deleteColumn = (deleteStartIndex, colsNumToSelect) => {
    const cellsWithoutCol = {};
    const colNum = getColNum(this.componentData);
    Object.entries(this.rows).forEach(([i, row]) => {
      cellsWithoutCol[i] = createEmptyRow(colNum - 1);
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j < deleteStartIndex) {
          setRowsCell(cellsWithoutCol, column, i, j);
        } else if (j > deleteStartIndex) {
          setRowsCell(cellsWithoutCol, column, i, parseInt(j) - colsNumToSelect);
        }
      });
    });
    this.setNewRows(cellsWithoutCol);
  };

  getSelectedRows = (range = []) => {
    const colNum = getColNum(this.componentData);
    return this.getSelectedSection(range, ({ i, j }) => ({ key: i, value: j }), colNum);
  };

  getSelectedCols = (range = []) => {
    const rowNum = getRowNum(this.componentData);
    return this.getSelectedSection(range, ({ i, j }) => ({ key: j, value: i }), rowNum);
  };

  getSelectedSection = (range, keyValueMapper, cellsNum) => {
    const selectedCells = {};
    range.forEach(range => {
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
    const { rows, componentData } = this;
    const { i: parentRow, j: parentCol } = range[0];
    const { i: lastChildRow, j: lastChildCol } = range[range.length - 1];
    const childrenRange = range.slice(1);
    const parentCell = getCell(componentData, parentRow, parentCol);
    parentCell.merge = {
      ...(parentCell.merge || {}),
      rowSpan: lastChildRow - parentRow + 1,
      colSpan: lastChildCol - parentCol + 1,
    };
    childrenRange.forEach(
      ({ i, j }) =>
        (getCell(componentData, i, j).merge = {
          ...(getCell(componentData, i, j).merge || {}),
          child: true,
        })
    );
    this.setNewRows(rows);
  };

  splitCell = range => {
    const { rows, componentData } = this;
    const { i: parentRow, j: parentCol } = range[0];
    const parentCell = getCell(componentData, parentRow, parentCol);
    const { rowSpan, colSpan } = parentCell.merge;
    const splitRange = getRange({
      start: range[0],
      end: { i: parentRow + rowSpan - 1, j: parentCol + colSpan - 1 },
    });
    splitRange.forEach(({ i, j }) => (getCell(componentData, i, j).merge = {}));
    this.setNewRows(rows);
  };

  isParentCellSelected = (range = []) => {
    const mergeData = range[0] && getCell(this.componentData, range[0].i, range[0].j)?.merge;
    const { rowSpan, colSpan } = mergeData || {};
    return range[0] && range.length === 1 && (rowSpan > 1 || colSpan > 1);
  };

  reorderColumns = (from, to) => {
    const { rows, componentData } = this;
    const cellsWithReorder = { ...rows };
    const diff = to > from.end ? to - from.end : from.start - to;
    const colsToReorder = [...Array(from.end - from.start + 1).fill(0)].map(
      (value, i) => i + from.start
    );
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      colsToReorder.forEach((fromIndex, j) => {
        row.columns = {
          ...row.columns,
          [fromIndex]: { ...getCell(componentData, i, to + diff * j) },
          [to + diff * j]: { ...getCell(componentData, i, fromIndex) },
        };
      });
    });
    this.setNewRows(cellsWithReorder);
  };

  reorderRows = (from, to) => {
    const { rows } = this;
    const cellsWithReorder = { ...rows };
    const diff = to > from.end ? to - from.end : from.start - to;
    const rowsToReorder = [...Array(from.end - from.start + 1).fill(0)].map(
      (value, i) => i + from.start
    );
    rowsToReorder.forEach((fromIndex, j) => {
      cellsWithReorder[fromIndex] = rows[to + diff * j];
      cellsWithReorder[to + diff * j] = rows[fromIndex];
    });
    this.setNewRows(cellsWithReorder);
  };
}

export default Table;
