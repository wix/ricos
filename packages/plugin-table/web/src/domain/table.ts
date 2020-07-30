import { DEFAULTS } from '../defaults';
import { ComponentData } from 'wix-rich-content-common';

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
  componentData: ComponentData;
  config: ComponentData['config'] & { cells: Record<string, Record<string, unknown>> };
  cells: Record<string, Record<string, unknown>>;

  constructor(componentData: ComponentData = {}) {
    this.componentData = { ...DEFAULTS, ...componentData };
    this.config = { ...DEFAULTS.config, ...componentData.config };
    this.cells = this.config.cells;
  }

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
    return {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithNewRow,
      },
    };
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
    return {
      ...this.componentData,
      config: {
        ...this.config,
        cells: cellsWithNewCol,
      },
    };
  };
}

export default Table;
