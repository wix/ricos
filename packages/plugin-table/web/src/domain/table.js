import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getCellData,
  getRange,
  getRow,
} from '../tableUtils';

const createEmptyCell = () => ({ content: createEmptyCellContent() });
const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {} };
  columnsIndexes.forEach(i => (emptyRow.columns[i] = createEmptyCell()));
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

  setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

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
        colsIndexes.forEach(i => (row.columns[i] = createEmptyCell()));
      });
    }
    copiedCellsRange.forEach(({ i, j }) => {
      this.setCellContent(
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
    const { rows } = this;
    const cellsWithClean = { ...rows };
    range.forEach(({ i, j }) => this.setCellContent(cellsWithClean, emptyContentState, i, j));
    this.setNewRows(cellsWithClean);
  };

  updateCellContent = (i, j, content) => {
    const { componentData } = this;
    getCellData(componentData, i, j).content = content;
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
          row.columns = { ...row.columns, [parseInt(j) + 1]: column };
        }
      });
      row.columns[index] = contentState;
    });
    this.setNewRows(cellsWithNewCol);
  };

  formattingCells = (style, range) => {
    const { componentData } = this;
    range.forEach(({ i, j }) => {
      getCellData(componentData, i, j).blocks.map(block =>
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
      const cell = getCellData(componentData, i, j);
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
      const cell = getCellData(componentData, i, j);
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
    const parentCell = getCellData(componentData, parentRow, parentCol);
    parentCell.merge = {
      ...(parentCell.merge || {}),
      rowSpan: lastChildRow - parentRow + 1,
      colSpan: lastChildCol - parentCol + 1,
    };
    childrenRange.forEach(
      ({ i, j }) =>
        (getCellData(componentData, i, j).merge = {
          ...(getCellData(componentData, i, j).merge || {}),
          child: true,
        })
    );
    this.setNewRows(rows);
  };

  splitCell = range => {
    const { rows, componentData } = this;
    const { i: parentRow, j: parentCol } = range[0];
    const parentCell = getCellData(componentData, parentRow, parentCol);
    const { rowSpan, colSpan } = parentCell.merge;
    const splitRange = getRange({
      start: range[0],
      end: { i: parentRow + rowSpan - 1, j: parentCol + colSpan - 1 },
    });
    splitRange.forEach(({ i, j }) => (getCellData(componentData, i, j).merge = {}));
    this.setNewRows(rows);
  };

  isParentCellSelected = (range = []) => {
    const mergeData = range[0] && getCellData(this.componentData, range[0].i, range[0].j)?.merge;
    const { rowSpan, colSpan } = mergeData || {};
    return range[0] && range.length === 1 && (rowSpan > 1 || colSpan > 1);
  };

  reorderColumns = (from, to) => {
    const { rows } = this;
    const cellsWithReorder = { ...rows };
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      row.columns = {
        ...rows[i].columns,
        [from]: { ...rows[i].columns[to] },
        [to]: { ...rows[i].columns[from] },
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
