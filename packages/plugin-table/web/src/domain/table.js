import { DEFAULTS } from '../defaults';
import { createEmptyCellContent } from '../tableUtils';

const createEmptyRow = componentData => {
  const colNum = Object.keys(componentData.config.cells[0]).length;
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = {};
  const contentState = createEmptyCellContent();
  columnsIndexes.forEach(i => (emptyRow[i] = { content: contentState }));
  return emptyRow;
};

class Table {
  constructor(componentData = {}, saveNewDataFunc) {
    this.componentData = { ...DEFAULTS, ...componentData };
    this.config = { ...DEFAULTS.config, ...componentData.config };
    this.cells = this.config.cells;
    this.saveNewDataFunc = saveNewDataFunc;
    this.contentMaxHeight = 0;
  }

  getNewCellData = cells => ({
    ...this.componentData,
    config: {
      ...this.config,
      cells,
    },
  });

  setCellsContentMaxHeight = height =>
    height > this.contentMaxHeight && (this.contentMaxHeight = height);

  updateCellContent = (i, j, content) => {
    const { componentData, config, cells } = this;
    const currCell = (cells[i] && cells[i][j]) || {};
    const newData = {
      ...componentData,
      config: {
        ...config,
        cells: {
          ...cells,
          [i]: {
            ...cells[i],
            [j]: { ...currCell, content: { ...(currCell.content || {}), ...content } },
          },
        },
      },
    };
    this.saveNewDataFunc(newData);
  };

  addRow = position => {
    const { cells } = this;
    let cellsWithNewRow = { ...cells, [position]: createEmptyRow(this.componentData) };
    Object.entries(cells).forEach(([i, row]) => {
      if (i >= position) {
        cellsWithNewRow = { ...cellsWithNewRow, [parseInt(i) + 1]: row };
      }
    });
    const newData = this.getNewCellData(cellsWithNewRow);
    return this.saveNewDataFunc(newData);
  };

  addColumn = position => {
    const { cells } = this;
    const cellsWithNewCol = { ...cells };
    Object.entries(cells).forEach(([i, row]) => {
      const contentState = createEmptyCellContent();
      cellsWithNewCol[i] = { ...cellsWithNewCol[i], [position]: { content: contentState } };
      Object.entries(row).forEach(([j, column]) => {
        if (j < position) {
          cellsWithNewCol[i] = { ...cellsWithNewCol[i], [j]: column || {} };
          const cellStyles = cellsWithNewCol[i][j].cellStyles || {};
          cellStyles.width && (cellsWithNewCol[i][j].cellStyles.width = cellStyles.width - 20);
        } else {
          cellsWithNewCol[i] = { ...cellsWithNewCol[i], [parseInt(j) + 1]: column };
        }
      });
    });
    const newData = this.getNewCellData(cellsWithNewCol);
    return this.saveNewDataFunc(newData);
  };

  isCellInSelectedRang = (i, j, selection) =>
    i >= selection?.start?.i &&
    i <= selection?.end?.i &&
    j >= selection?.start?.j &&
    j <= selection?.end?.j;

  formattingCells = (style, selection) => {
    const { cells } = this;
    const cellsWithFormatting = { ...cells };
    Object.entries(cells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, selection)) {
          const cellWithFormatting = cells[i][j];
          cellWithFormatting.blocks.map(block =>
            block.inlineStyleRanges.push({
              offset: 0,
              length: block.text.length,
              style,
            })
          );
          cellsWithFormatting[i] = { ...cellsWithFormatting[i], [j]: cellWithFormatting };
        }
      });
    });
    const newData = this.getNewCellData(cellsWithFormatting);
    this.saveNewDataFunc(newData);
  };

  setCellsStyle = (style, selection) => {
    this.setCellStyleAttribute(style, ({ i, j }) => this.isCellInSelectedRang(i, j, selection));
  };

  getCellData = (row, col) => this.cells[row] && this.cells[row][col];

  setCellStyleAttribute = (attribute, conditionFun = () => true) => {
    const { cells } = this;
    const cellsWithNewStyle = { ...cells };
    Object.entries(cellsWithNewStyle).forEach(([i, row]) => {
      Object.entries(row).forEach(([j, column]) => {
        if (conditionFun({ i, j })) {
          column.style = { ...(column.style || {}), ...attribute };
        }
      });
    });
    const newData = this.getNewCellData(cellsWithNewStyle);
    this.saveNewDataFunc(newData);
  };

  setColumnWidth = (index, width) => {
    this.setCellStyleAttribute({ width }, cellIndex => cellIndex.j === index);
  };

  setRowHeight = (index, height) => {
    this.setCellStyleAttribute({ height }, cellIndex => cellIndex.i === index);
  };

  distributeCellsStyleAttribute = attribute => {
    const { cells } = this;
    const distributeAttr = { ...cells };
    //eslint-disable-next-line
    Object.entries(distributeAttr).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (column.style && column.style[attribute]) {
          const { [attribute]: attr, ...rest } = column.style; //eslint-disable-line
          column.style = rest;
        }
      });
    });
    const newData = this.getNewCellData(distributeAttr);
    this.saveNewDataFunc(newData);
  };

  distributeColumns = () => {
    this.distributeCellsStyleAttribute('width');
  };

  distributeRows = () => this.setCellStyleAttribute({ height: this.contentMaxHeight });

  calculateRowMaxHeight = tableRef => {
    let maxHeight = 0;
    //eslint-disable-next-line
    Object.entries(this.cells).forEach(([i, row]) => {
      const rowHeight = tableRef.children[i].offsetHeight;
      if (rowHeight > maxHeight) {
        maxHeight = rowHeight;
      }
    });
    return maxHeight;
  };

  isRowSelected = selected =>
    selected?.start?.j === 0 &&
    selected?.end?.j === this.colNum - 1 &&
    selected?.start?.i === selected?.end?.i;

  isColSelected = selected =>
    selected?.start?.i === 0 &&
    selected?.end?.i === this.rowNum - 1 &&
    selected?.start?.j === selected?.end?.j;

  isMultipleCellSelected = selected =>
    selected.start.i !== selected.end.i || selected.start.j !== selected.end.j;

  updateMergeData = (cell = {}, data) => ({
    ...(cell.merge || {}),
    ...data,
  });

  mergeCells = selected => {
    const rowIndex = selected.start.i;
    const colIndex = selected.start.j;
    const mergedCells = { ...this.cells };
    Object.entries(mergedCells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (
          this.isCellInSelectedRang(i, j, selected) &&
          !(parseInt(i) === rowIndex && parseInt(j) === colIndex)
        ) {
          mergedCells[i][j] = {
            ...column,
            merge: { ...this.updateMergeData(column, { child: true }) },
          };
        }
      });
    });
    mergedCells[rowIndex][colIndex] = {
      ...this.cells[rowIndex][colIndex],
      merge: this.updateMergeData(this.cells[rowIndex][colIndex], {
        rowSpan: selected.end.i - rowIndex + 1,
        colSpan: selected.end.j - colIndex + 1,
      }),
    };
    const newData = this.getNewCellData(mergedCells);
    this.saveNewDataFunc(newData);
  };

  splitCell = selected => {
    const rowIndex = selected.start.i;
    const colIndex = selected.start.j;
    const parentCell = this.cells[rowIndex][colIndex];
    const { rowSpan, colSpan } = parentCell.merge;
    const mergedCells = {
      start: { i: rowIndex, j: colIndex },
      end: { i: rowIndex + rowSpan - 1, j: colIndex + colSpan - 1 },
    };
    const splitedCells = { ...this.cells };
    Object.entries(splitedCells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, mergedCells)) {
          splitedCells[i][j].merge = {};
        }
      });
    });
    const newData = this.getNewCellData(splitedCells);
    this.saveNewDataFunc(newData);
  };

  isParentCellSelected = selected => {
    const mergeData = selected && this.cells[selected.start.i][selected.start.j]?.merge;
    const { rowSpan, colSpan } = mergeData || {};
    return selected && !this.isMultipleCellSelected(selected) && (rowSpan > 1 || colSpan > 1);
  };

  get rowNum() {
    return Object.entries(this.cells).length;
  }

  get colNum() {
    return Object.entries(this.cells[0]).length;
  }
}

export default Table;
