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
    const newData = {
      ...this.componentData,
      config: {
        ...this.componentData.config,
        cells: {
          ...this.componentData.config.cells,
          [i]: {
            ...this.componentData.config.cells[i],
            [j]: { ...this.componentData.config.cells[i][j], ...data },
          },
        },
      },
    };
    this.saveNewDataFunc(newData);
  };

  getRowNum = () => Object.entries(this.cells).length;

  getColNum = () => Object.entries(this.cells[0]).length;

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
          cellsWithNewCol[i] = { ...cellsWithNewCol[i], [j]: column };
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
    Object.entries(cells).forEach(([i, row]) => {
      Object.entries(row).forEach(([j, column]) => {
        if (this.isCellInSelectedRang(i, j, selection)) {
          cells[i][j].cellStyles = { ...cells[i][j].cellStyles, ...style };
        }
      });
    });
    const newData = {
      ...this.componentData,
      config: {
        ...this.config,
        cells,
      },
    };
    this.saveNewDataFunc(newData);
  };

  getCellStyle = (row, col) => this.cells[row][col]?.cellStyles;

  isRowSelected = selected =>
    selected?.start?.j === 0 &&
    selected?.end?.j === this.getColNum() - 1 &&
    selected?.start?.i === selected?.end?.i;

  isColSelected = selected =>
    selected?.start?.i === 0 &&
    selected?.end?.i === this.getRowNum() - 1 &&
    selected?.start?.j === selected?.end?.j;
}

export default Table;
