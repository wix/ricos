import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getCellData,
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

  setCellsContentMaxHeight = height =>
    height > this.contentMaxHeight && (this.contentMaxHeight = height);

  setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

  pasteCells = (copiedCells, targetRow, targetCol) => {
    const { rows, componentData } = this;
    const { ranges, copiedRowsNum, copiedColsNum } = copiedCells;
    const cellsWithPaste = { ...rows };
    const rowRatio = targetRow - ranges[0].i;
    const colRatio = targetCol - ranges[0].j;
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
    ranges.forEach(({ i, j }) => {
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
    const { componentData, config, rows } = this;
    const newCells = rows;
    rows[i].columns[j].content = content;
    const newData = {
      ...componentData,
      config: {
        ...config,
        rows: newCells,
      },
    };
    this.saveNewDataFunc(newData);
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

  isInSelectedRange = (i, j, selection) => {
    const { start: startSelect, end: endSelect } = selection;
    const start = {
      i: Math.min(startSelect.i, endSelect.i),
      j: Math.min(startSelect.j, endSelect.j),
    };
    const end = {
      i: Math.max(startSelect.i, endSelect.i),
      j: Math.max(startSelect.j, endSelect.j),
    };
    return i >= start?.i && i <= end?.i && j >= start?.j && j <= end?.j;
  };

  formattingCells = (style, selection) => {
    const { rows } = this;
    const cellsWithFormatting = { ...rows };
    Object.entries(rows).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row.columns).forEach(([j, column]) => {
        if (this.isInSelectedRange(i, j, selection)) {
          const cellWithFormatting = rows[i].columns[j];
          cellWithFormatting.blocks.map(block =>
            block.inlineStyleRanges.push({
              offset: 0,
              length: block.text.length,
              style,
            })
          );
          cellsWithFormatting[i] = {
            ...cellsWithFormatting[i],
            columns: { ...cellsWithFormatting[i].columns, [j]: cellWithFormatting },
          };
        }
      });
    });
    this.setNewRows(cellsWithFormatting);
  };

  setCellsStyle = (style, selection) => {
    this.setCellsStyleAttribute(style, ({ i, j }) => this.isInSelectedRange(i, j, selection));
  };

  setCellsStyleAttribute = (attribute, conditionFunc = () => true) => {
    const { rows } = this;
    const cellsWithNewStyle = { ...rows };
    Object.entries(cellsWithNewStyle).forEach(([i, row]) => {
      Object.entries(row.columns).forEach(([j, column]) => {
        if (conditionFunc({ i, j })) {
          column.style = { ...(column.style || {}), ...attribute };
        }
      });
    });
    this.setNewRows(cellsWithNewStyle);
  };

  setColumnWidth = (index, width) => {
    this.setCellsStyleAttribute({ width }, cellIndex => cellIndex.j === index);
  };

  setRowHeight = (index, height) => {
    const { rows } = this;
    const cellsWithRowHeight = { ...rows };
    cellsWithRowHeight[index].rowHeight = height;
    this.setNewRows(cellsWithRowHeight);
  };

  removeCellsStyleAttribute = (attribute, conditionFunc = () => true) => {
    const { rows } = this;
    const distributeAttr = { ...rows };
    //eslint-disable-next-line
    Object.entries(distributeAttr).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row.columns).forEach(([j, column]) => {
        if (column.style && column.style[attribute] && conditionFunc({ i, j })) {
          const { [attribute]: attr, ...rest } = column.style; //eslint-disable-line
          column.style = rest;
        }
      });
    });
    this.setNewRows(distributeAttr);
  };

  distributeColumns = selected => {
    this.removeCellsStyleAttribute('width', ({ i, j }) =>
      this.isInSelectedRange(parseInt(i), parseInt(j), selected)
    );
  };

  distributeRows = (tableRef, selected) => {
    const { rows } = this;
    const cellsWithRowHeight = { ...rows };

    this.removeCellsStyleAttribute('height');
    const rowHeight = this.calculateRowMaxHeight(tableRef, selected);
    const numOfRowsToDistribute = Math.abs(selected.start.i - selected.end.i) + 1;
    const firstRow = Math.min(selected.start.i, selected.end.i);
    const distributeRowsIdexes = [...Array(numOfRowsToDistribute).fill(numOfRowsToDistribute)].map(
      (startIndex, i) => firstRow + i
    );
    distributeRowsIdexes.forEach(
      i => (cellsWithRowHeight[i] = { ...cellsWithRowHeight[i], rowHeight })
    );
    this.setNewRows(cellsWithRowHeight);
  };

  calculateRowMaxHeight = (tableRef, selected) => {
    let maxHeight = 0;
    const startRow = selected.start.i;
    const endRow = selected.end.i;
    //eslint-disable-next-line
    Object.entries(this.rows).forEach(([i, row]) => {
      if (startRow <= i <= endRow) {
        const rowHeight = tableRef.children[i].offsetHeight;
        if (rowHeight > maxHeight) {
          maxHeight = rowHeight;
        }
      }
    });
    return maxHeight;
  };

  isRowSelected = selected => {
    const colNum = getColNum(this.componentData);
    return (
      selected?.start?.j === 0 &&
      selected?.end?.j === colNum - 1 &&
      selected?.start?.i === selected?.end?.i
    );
  };

  isColSelected = selected => {
    const rowNum = getRowNum(this.componentData);
    return (
      selected?.start?.i === 0 &&
      selected?.end?.i === rowNum - 1 &&
      selected?.start?.j === selected?.end?.j
    );
  };

  isMultipleCellSelected = selected =>
    selected.start.i !== selected.end.i || selected.start.j !== selected.end.j;

  updateMergeData = (cell = {}, data) => ({
    ...(cell.merge || {}),
    ...data,
  });

  mergeCells = selected => {
    const rowIndex = selected.start.i;
    const colIndex = selected.start.j;
    const mergedCells = { ...this.rows };
    Object.entries(mergedCells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row.columns).forEach(([j, column]) => {
        if (
          this.isInSelectedRange(i, j, selected) &&
          !(parseInt(i) === rowIndex && parseInt(j) === colIndex)
        ) {
          mergedCells[i].columns[j] = {
            ...column,
            merge: { ...this.updateMergeData(column, { child: true }) },
          };
        }
      });
    });
    mergedCells[rowIndex].columns[colIndex] = {
      ...this.rows[rowIndex].columns[colIndex],
      merge: this.updateMergeData(this.rows[rowIndex].columns[colIndex], {
        rowSpan: selected.end.i - rowIndex + 1,
        colSpan: selected.end.j - colIndex + 1,
      }),
    };
    this.setNewRows(mergedCells);
  };

  splitCell = selected => {
    const rowIndex = selected.start.i;
    const colIndex = selected.start.j;
    const parentCell = getCellData(this.componentData, rowIndex, colIndex);
    const { rowSpan, colSpan } = parentCell.merge;
    const mergedCells = {
      start: { i: rowIndex, j: colIndex },
      end: { i: rowIndex + rowSpan - 1, j: colIndex + colSpan - 1 },
    };
    const splitedCells = { ...this.rows };
    Object.entries(splitedCells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isInSelectedRange(i, j, mergedCells)) {
          splitedCells[i].columns[j].merge = {};
        }
      });
    });
    this.setNewRows(splitedCells);
  };

  isParentCellSelected = selected => {
    const mergeData =
      selected && getCellData(this.componentData, selected.start.i, selected.start.j)?.merge;
    const { rowSpan, colSpan } = mergeData || {};
    return selected && !this.isMultipleCellSelected(selected) && (rowSpan > 1 || colSpan > 1);
  };

  reorderColumns = (from, to) => {
    const { rows } = this;
    const cellsWithReorder = { ...rows };
    Object.entries(cellsWithReorder).forEach(([i, row]) => {
      row.columns[from] = { ...rows[i].columns[to] };
      row.columns[to] = { ...rows[i].columns[from] };
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
