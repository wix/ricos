import { DEFAULTS } from '../defaults';

const emptyState = {
  blocks: [
    {
      key: '42d26',
      text: '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
  VERSION: '7.13.1',
};

const createEmptyRow = componentData => {
  const colNum = Object.keys(componentData.config.cells[0]).length;
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = {};
  columnsIndexes.forEach(i => (emptyRow[i] = emptyState));
  return emptyRow;
};

class Table {
  constructor(componentData = {}, saveNewDataFunc) {
    this.componentData = { ...DEFAULTS, ...componentData };
    this.config = { ...DEFAULTS.config, ...componentData.config };
    this.cells = this.config.cells;
    this.saveNewDataFunc = saveNewDataFunc;
  }

  updateCellData = (i, j, data) => {
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
    const newData = {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithNewRow,
      },
    };
    return this.saveNewDataFunc(newData);
  };

  addColumn = position => {
    const { cells } = this;
    const cellsWithNewCol = { ...cells };
    Object.entries(cells).forEach(([i, row]) => {
      cellsWithNewCol[i] = { ...cellsWithNewCol[i], [position]: emptyState };
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
    const newData = {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithNewCol,
      },
    };
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
    const newData = {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithFormatting,
      },
    };
    this.saveNewDataFunc(newData);
  };

  setCellsStyle = (style, selection) => {
    const { cells } = this;
    const cellsWithStyle = { ...cells };
    Object.entries(cellsWithStyle).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, selection)) {
          column.cellStyles = { ...(column.cellStyles || {}), ...style };
        }
      });
    });
    const newData = {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithStyle,
      },
    };
    this.saveNewDataFunc(newData);
  };

  getCellStyle = (row, col) => this.cells[row][col]?.cellStyles;

  setColWidth = (index, width) => {
    const { cells } = this;
    const cellsWithNewWidth = { ...cells };
    //eslint-disable-next-line
    Object.entries(cellsWithNewWidth).forEach(([i, row]) => {
      //eslint-disable-next-line
      Object.entries(row).forEach(([j, column]) => {
        if (j === index) {
          column.cellStyles = { ...(column.cellStyles || {}), width };
        }
      });
    });
    const newData = {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithNewWidth,
      },
    };
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

  get rowNum() {
    return Object.entries(this.cells).length;
  }

  get colNum() {
    return Object.entries(this.cells[0]).length;
  }
}

export default Table;
