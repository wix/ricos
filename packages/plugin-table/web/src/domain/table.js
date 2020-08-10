import { DEFAULTS } from '../defaults';
import { EditorState, convertToRaw } from 'wix-rich-content-editor';

const createEmptyRow = componentData => {
  const colNum = Object.keys(componentData.config.cells[0]).length;
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = {};
  const contentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
  columnsIndexes.forEach(i => (emptyRow[i] = contentState));
  return emptyRow;
};

class Table {
  constructor(componentData = {}, saveNewDataFunc) {
    this.componentData = { ...DEFAULTS, ...componentData };
    this.config = { ...DEFAULTS.config, ...componentData.config };
    this.cells = this.config.cells;
    this.saveNewDataFunc = saveNewDataFunc;
  }

  getNewCellData = cells => ({
    ...this.componentData,
    config: {
      ...this.config,
      cells,
    },
  });

  updateCell = (i, j, data) => {
    const { componentData, config, cells } = this;
    const newData = {
      ...componentData,
      config: {
        ...config,
        cells: {
          ...cells,
          [i]: {
            ...cells[i],
            [j]: { ...cells[i][j], ...data },
          },
        },
      },
    };
    this.saveNewDataFunc(newData);
  };

  addRow = position => {
    const { cells } = this;
    let cellsWithNewRow = { ...cells, [position]: createEmptyRow(this.componentData) };
    Object.entries(cells).forEach(([i, value]) => {
      if (i >= position) {
        cellsWithNewRow = { ...cellsWithNewRow, [parseInt(i) + 1]: value };
      }
    });
    const newData = this.getNewCellData(cellsWithNewRow);
    return this.saveNewDataFunc(newData);
  };

  addColumn = position => {
    const { cells } = this;
    const cellsWithNewCol = { ...cells };
    Object.entries(cells).forEach(([i, row]) => {
      const contentState = convertToRaw(EditorState.createEmpty().getCurrentContent());
      cellsWithNewCol[i] = { ...cellsWithNewCol[i], [position]: contentState };
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
    const { cells } = this;
    const cellsWithStyle = { ...cells };
    Object.entries(cellsWithStyle).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, selection)) {
          const cellData = { ...(column.cellData || {}) };
          cellData.style = { ...(cellData.style || {}), ...style };
          column.cellData = cellData;
        }
      });
    });
    const newData = this.getNewCellData(cellsWithStyle);
    this.saveNewDataFunc(newData);
  };

  getCellData = (row, col) => this.cells[row][col]?.cellData;

  setColWidth = (index, width) => {
    const { cells } = this;
    const cellsWithNewWidth = { ...cells };
    //eslint-disable-next-line
    Object.entries(cellsWithNewWidth).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (j === index) {
          const cellData = { ...(column.cellData || {}) };
          cellData.style = { ...(cellData.style || {}), width };
          column.cellData = cellData;
        }
      });
    });
    const newData = this.getNewCellData(cellsWithNewWidth);
    this.saveNewDataFunc(newData);
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
    selected?.start?.i !== selected?.end?.i || selected?.start?.j !== selected?.end?.j;

  updateCellData = (cell = {}, data) => ({
    ...(cell.cellData || {}),
    ...data,
  });

  mergeCells = selected => {
    const rowIndex = selected.start.i;
    const colIndex = selected.start.j;
    const mergedCells = { ...this.cells };
    Object.entries(mergedCells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, selected) && !(i === rowIndex && j === colIndex)) {
          mergedCells[i][j] = {
            ...column,
            cellData: { ...this.updateCellData(column, { merged: true }) },
          };
        }
      });
    });
    mergedCells[rowIndex][colIndex] = {
      ...this.cells[rowIndex][colIndex],
      cellData: this.updateCellData(this.cells[rowIndex][colIndex], {
        rowSpan: selected.end.i - rowIndex + 1,
        colSpan: selected.end.j - colIndex + 1,
        parentCell: true,
        merged: false,
      }),
    };
    const newData = this.getNewCellData(mergedCells);
    this.saveNewDataFunc(newData);
  };

  splitCell = selected => {
    const rowIndex = selected.start.i;
    const colIndex = selected.start.j;
    const parentCell = this.cells[rowIndex][colIndex];
    const { rowSpan, colSpan } = parentCell.cellData;
    const mergedCells = {
      start: { i: rowIndex, j: colIndex },
      end: { i: rowIndex + rowSpan - 1, j: colIndex + colSpan - 1 },
    };
    const splitedCells = { ...this.cells };
    Object.entries(splitedCells).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, mergedCells) && !(i === rowIndex && j === colIndex)) {
          splitedCells[i][j].cellData.merged = false;
        }
      });
    });
    splitedCells[rowIndex][colIndex] = {
      ...this.cells[rowIndex][colIndex],
      cellData: this.updateCellData(this.cells[rowIndex][colIndex], {
        rowSpan: 1,
        colSpan: 1,
        parentCell: false,
      }),
    };
    const newData = this.getNewCellData(splitedCells);
    this.saveNewDataFunc(newData);
  };

  isParentCellSelected = selected =>
    selected &&
    !this.isMultipleCellSelected(selected) &&
    this.cells[selected.start.i][selected.start.j]?.cellData?.parentCell;

  get rowNum() {
    return Object.entries(this.cells).length;
  }

  get colNum() {
    return Object.entries(this.cells[0]).length;
  }
}

export default Table;
