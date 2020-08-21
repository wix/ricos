import { DEFAULTS } from '../defaults';
import {
  createEmptyCellContent,
  getRowNum,
  getColNum,
  getCellContent,
  getCellData,
} from '../tableUtils';

const createEmptyCell = () => {
  const contentState = createEmptyCellContent();
  return { content: contentState };
};
const createEmptyRow = colNum => {
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = { columns: {} };
  columnsIndexes.forEach(i => (emptyRow.columns[i] = createEmptyCell()));
  return emptyRow;
};

class Table {
  constructor(componentData = {}, saveNewDataFunc) {
    this.componentData = { ...DEFAULTS, ...componentData };
    this.config = { ...DEFAULTS.config, ...componentData.config };
    this.rows = this.config.rows;
    this.saveNewDataFunc = saveNewDataFunc;
    this.contentMaxHeight = 0;
  }

  setNewRows = rows => ({
    ...this.componentData,
    config: {
      ...this.config,
      rows,
    },
  });

  setNewCells = rows => (this.rows = rows);

  setCellsContentMaxHeight = height =>
    height > this.contentMaxHeight && (this.contentMaxHeight = height);

  setCellContent = (rows, content, i, j) => (rows[i].columns[j].content = content);

  pasteCells = (copiedCells, targetRow, targetCol) => {
    const { ranges, copiedRowsNum, copiedColsNum } = copiedCells;
    const cellsWithPaste = { ...this.rows };
    const rowRatio = targetRow - ranges[0].i;
    const colRatio = targetCol - ranges[0].j;
    const rowNum = getRowNum(this.componentData);
    const colNum = getColNum(this.componentData);
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
        getCellContent(this.componentData, i, j),
        i + rowRatio,
        j + colRatio
      );
    });
    const newData = this.setNewRows(cellsWithPaste);
    this.saveNewDataFunc(newData);
  };

  clearCellsContent = cellsToDelete => {
    const emptyContentState = createEmptyCellContent();
    const { rows } = this;
    const cellsWithClean = { ...rows };
    cellsToDelete.forEach(({ i, j }) =>
      this.setCellContent(cellsWithClean, emptyContentState, i, j)
    );
    const newData = this.setNewRows(cellsWithClean);
    this.saveNewDataFunc(newData);
  };

  updateCellContent = (i, j, content) => {
    const { componentData, config, rows } = this;
    const currCell = getCellData(componentData, i, j) || {};
    const newCells = {
      ...rows,
      [i]: {
        ...rows[i],
        columns: {
          ...(rows[i].columns || {}),
          [j]: { ...currCell, content: { ...(currCell.content || {}), ...content } },
        },
      },
    };
    const newData = {
      ...componentData,
      config: {
        ...config,
        rows: newCells,
      },
    };
    this.saveNewDataFunc(newData);
  };

  addRow = position => {
    const { rows, componentData } = this;
    const colNum = getColNum(componentData);
    let cellsWithNewRow = { ...rows, [position]: createEmptyRow(colNum) };
    Object.entries(rows).forEach(([i, row]) => {
      if (i >= position) {
        cellsWithNewRow = { ...cellsWithNewRow, [parseInt(i) + 1]: row };
      }
    });
    const newData = this.setNewRows(cellsWithNewRow);
    return this.saveNewDataFunc(newData);
  };

  addColumn = position => {
    const { rows } = this;
    const cellsWithNewCol = { ...rows };
    //eslint-disable-next-line
    Object.entries(cellsWithNewCol).forEach(([i, row]) => {
      const contentState = createEmptyCellContent();
      row.columns = {
        ...row.columns,
        [position]: { content: contentState },
      };
      Object.entries(row.columns).forEach(([j, column]) => {
        if (j < position) {
          column.style = column.style || {};
          const colWith = column.style.width;
          colWith && (column.style.width = colWith - 20);
        } else if (j > position) {
          row.columns = { ...row.columns, [parseInt(j) + 1]: column };
        }
      });
    });
    const newData = this.setNewRows(cellsWithNewCol);
    return this.saveNewDataFunc(newData);
  };

  isCellInSelectedRang = (i, j, selection) =>
    i >= selection?.start?.i &&
    i <= selection?.end?.i &&
    j >= selection?.start?.j &&
    j <= selection?.end?.j;

  formattingCells = (style, selection) => {
    const { rows } = this;
    const cellsWithFormatting = { ...rows };
    Object.entries(rows).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row.columns).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, selection)) {
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
    const newData = this.setNewRows(cellsWithFormatting);
    this.saveNewDataFunc(newData);
  };

  setCellsStyle = (style, selection) => {
    this.setCellsStyleAttribute(style, ({ i, j }) => this.isCellInSelectedRang(i, j, selection));
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
    const newData = this.setNewRows(cellsWithNewStyle);
    this.saveNewDataFunc(newData);
  };

  setColumnWidth = (index, width) => {
    this.setCellsStyleAttribute({ width }, cellIndex => cellIndex.j === index);
  };

  setRowHeight = (index, height) => {
    const { rows } = this;
    const cellsWithRowHeight = { ...rows };
    cellsWithRowHeight[index].rowHeight = height;
    const newData = this.setNewRows(cellsWithRowHeight);
    this.saveNewDataFunc(newData);
  };

  distributeCellsStyleAttribute = (attribute, conditionFunc = () => true) => {
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
    const newData = this.setNewRows(distributeAttr);
    this.saveNewDataFunc(newData);
  };

  distributeColumns = selected => {
    this.distributeCellsStyleAttribute('width', ({ i, j }) =>
      this.isCellInSelectedRang(parseInt(i), parseInt(j), selected)
    );
  };

  distributeRows = (tableRef, selected) => {
    this.distributeCellsStyleAttribute('height');
    const rowsHeight = this.calculateRowMaxHeight(tableRef, selected);
    this.setCellsStyleAttribute({ height: rowsHeight });
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
          this.isCellInSelectedRang(i, j, selected) &&
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
    const newData = this.setNewRows(mergedCells);
    this.saveNewDataFunc(newData);
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
        if (this.isCellInSelectedRang(i, j, mergedCells)) {
          splitedCells[i].columns[j].merge = {};
        }
      });
    });
    const newData = this.setNewRows(splitedCells);
    this.saveNewDataFunc(newData);
  };

  isParentCellSelected = selected => {
    const mergeData =
      selected && getCellData(this.componentData, selected.start.i, selected.start.j)?.merge;
    const { rowSpan, colSpan } = mergeData || {};
    return selected && !this.isMultipleCellSelected(selected) && (rowSpan > 1 || colSpan > 1);
  };
}

export default Table;
