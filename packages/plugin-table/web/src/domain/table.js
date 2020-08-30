import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getCell,
  getRange,
  getRow,
  getRowColumns,
} from '../tableUtils';

const setRowCell = (row, cell, j) => (row.columns[j] = cell);
const setRowsCell = (rows, cell, i, j) => (rows[i].columns[j] = cell);
const setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

const createEmptyCell = () => ({ content: createEmptyCellContent() });
const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {} };
  columnsIndexes.forEach(i => setRowCell(emptyRow, createEmptyCell(), i));
  return emptyRow;
};

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
          colWith && (column.style.width = colWith - 20);
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
    range.forEach(({ i }) => (getRow(componentData, i).rowHeight = height));
    this.setNewRows(componentData.config.rows);
  };

  distributeColumns = range => {
    const { componentData } = this;
    range.forEach(({ i, j }) => {
      const cell = getCell(componentData, i, j);
      if (cell.style && cell.style.width) {
        const { width, ...rest } = cell.style; //eslint-disable-line
        cell.style = rest;
      }
    });
    this.setNewRows(componentData.config.rows);
  };

  distributeRows = (tableRef, range) => {
    let maxHeight = 0;
    range.forEach(({ i }) => {
      const rowHeight = tableRef.children[i].offsetHeight;
      if (rowHeight > maxHeight) {
        maxHeight = rowHeight;
      }
    });
    this.setRowHeight(range, maxHeight);
  };

  deleteRow = index => {
    const cellsWithoutRow = {};
    const rowNum = getRowNum(this.componentData);
    [...Array(rowNum).fill(0)].forEach((value, i) => {
      if (i < index) {
        cellsWithoutRow[i] = this.rows[i];
      } else if (i > index) {
        cellsWithoutRow[parseInt(i) - 1] = this.rows[i];
      }
    });
    this.setNewRows(cellsWithoutRow);
  };

  deleteColumn = index => {
    const cellsWithoutCol = {};
    const colNum = getColNum(this.componentData);
    Object.entries(this.rows).forEach(([i, row]) => {
      cellsWithoutCol[i] = createEmptyRow(colNum - 1);
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j < index) {
          setRowsCell(cellsWithoutCol, column, i, j);
        } else if (j > index) {
          setRowsCell(cellsWithoutCol, column, i, parseInt(j) - 1);
        }
      });
    });
    this.setNewRows(cellsWithoutCol);
  };

  isRowSelected = (range = []) => {
    const colNum = getColNum(this.componentData);
    return range.length === colNum && range[0].j === 0 && range[range.length - 1].j === colNum - 1;
  };

  isColSelected = (range = []) => {
    const rowNum = getRowNum(this.componentData);
    return range.length === rowNum && range[0].i === 0 && range[range.length - 1].i === rowNum - 1;
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
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      row.columns = {
        ...getRowColumns(componentData, i),
        [from]: { ...getCell(componentData, i, to) },
        [to]: { ...getCell(componentData, i, from) },
      };
    });
    this.setNewRows(cellsWithReorder);
  };

  reorderRows = (from, to) => {
    const { rows } = this;
    const cellsWithReorder = { ...rows };
    cellsWithReorder[from] = rows[to];
    cellsWithReorder[to] = rows[from];
    this.setNewRows(cellsWithReorder);
  };
}

export default Table;
