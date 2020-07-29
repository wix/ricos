import { getBlockAtStartOfSelection, setEntityData } from 'wix-rich-content-editor-common';

const getTableBlockData = editorState => {
  const currentBlock = getBlockAtStartOfSelection(editorState);
  const entityKey = currentBlock.getEntityAt(0);
  return { data: editorState.getCurrentContent().getEntity(entityKey).data, entityKey };
};

export const addColumn = editorState => {
  const { data, entityKey } = getTableBlockData(editorState);
  const dataToSave = addColumnToComponentData(data);
  return setEntityData(editorState, entityKey, dataToSave);
};

export const addRow = editorState => {
  const { data, entityKey } = getTableBlockData(editorState);
  const dataToSave = addRowToComponentData(data);
  return setEntityData(editorState, entityKey, dataToSave);
};

const createEmptyRow = componentData => {
  const colNum = Object.keys(componentData.config.cells[0]).length;
  const columnsIndexes = [...Array(colNum).fill(0)].map((value, i) => i);
  const emptyRow = {};
  columnsIndexes.forEach(i => (emptyRow[i] = emptyState));
  return emptyRow;
};

export const addRowToComponentData = (componentData, position = 0) => {
  const { cells } = componentData.config;
  let cellsWithNewRow = { ...cells, [position]: createEmptyRow(componentData) };
  Object.entries(cells).forEach(([i, value]) => {
    if (i >= position) {
      cellsWithNewRow = { ...cellsWithNewRow, [parseInt(i) + 1]: value };
    }
  });
  return {
    ...componentData,
    config: {
      ...componentData.config,
      cells: cellsWithNewRow,
    },
  };
};

export const addColumnToComponentData = (componentData, position = 0) => {
  const {
    config: { cells },
  } = componentData;
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
    ...componentData,
    config: {
      ...componentData.config,
      cells: cellsWithNewCol,
    },
  };
};

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

export const getRowNum = cells => Object.entries(cells).length;

export const getColNum = cells => Object.entries(cells[0]).length;
