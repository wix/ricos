import { ContextMenuIcon } from '../../icons';
import { getRange, getColsRange } from '../../tableUtils';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;
const clear = (table, selected) => table.clearRange(getRange(selected));
const split = (table, selected) => table.splitCell(getRange(selected));
const selectRow = (selected, selectRows) => {
  const selectedRow = selected.start.i;
  selectRows({ start: selectedRow, end: selectedRow });
};
const selectCol = (selected, selectCols) => {
  const selectedCol = selected.start.j;
  selectCols({ start: selectedCol, end: selectedCol });
};
const distributeRows = (table, innerEditorsRefs, selected) =>
  table.distributeRows(innerEditorsRefs, getRange(selected));
const distributeColumns = (table, selected) => table.distributeColumns(getColsRange(selected));
const addLastRow = (addRow, table) => addRow(table.getRowNum());
const addLastCol = (addCol, table) => addCol(table.getColNum());

const splitButton = (table, selected) => {
  return {
    onClick: () => split(table, selected),
    dataHook: 'split-cells',
    text: 'Split cells',
    type: 'text',
  };
};

const selectRowButton = (selected, selectRows) => {
  return {
    onClick: () => selectRow(selected, selectRows),
    dataHook: 'select-row',
    text: 'Select row',
    type: 'text',
  };
};

const selectColButton = (selected, selectCols) => {
  return {
    onClick: () => selectCol(selected, selectCols),
    dataHook: 'select-column',
    text: 'Select column',
    type: 'text',
  };
};

const deleteRowButton = (deleteRow, selectedRows) => {
  return {
    onClick: () => deleteRow(selectedRows),
    dataHook: 'delete-row',
    text: 'Delete row',
    type: 'text',
  };
};

const addLastRowButton = (addRow, table) => {
  return {
    onClick: () => addLastRow(addRow, table),
    dataHook: 'insert-last-row',
    text: 'Insert row',
    type: 'text',
  };
};

const addLastColButton = (addCol, table) => {
  return {
    onClick: () => addLastCol(addCol, table),
    dataHook: 'insert-last-col',
    text: 'Insert column',
    type: 'text',
  };
};

const addRowAboveButton = (addRow, range) => {
  return {
    onClick: () => addRow(getRowIndex(range)),
    dataHook: 'insert-above',
    text: 'Insert 1 above',
    type: 'text',
  };
};

const addRowBelowButton = (addRow, range) => {
  return {
    onClick: () => addRow(getRowIndex(range) + 1),
    dataHook: 'insert-below',
    text: 'Insert 1 below',
    type: 'text',
  };
};

const deleteColButton = (deleteColumn, selectedCols) => {
  return {
    onClick: () => deleteColumn(selectedCols),
    dataHook: 'delete-column',
    text: 'Delete column',
    type: 'text',
  };
};

const addColRightButton = (addCol, range) => {
  return {
    onClick: () => addCol(getColIndex(range) + 1),
    dataHook: 'insert-right',
    text: 'Insert 1 right',
    type: 'text',
  };
};

const addColLeftButton = (addCol, range) => {
  return {
    onClick: () => addCol(getColIndex(range)),
    dataHook: 'insert-left',
    text: 'Insert 1 left',
    type: 'text',
  };
};

const distributeRowsButton = (table, innerEditorsRefs, selected) => {
  return {
    onClick: () => distributeRows(table, innerEditorsRefs, selected),
    dataHook: 'distribute-rows',
    text: 'Distribute rows',
    type: 'text',
  };
};

const distributeColumnsButton = (table, selected) => {
  return {
    onClick: () => distributeColumns(table, selected),
    dataHook: 'distribute-columns',
    text: 'Distribute columns',
    type: 'text',
  };
};

const mergeButton = merge => {
  return {
    onClick: () => merge(),
    dataHook: 'merge-cells',
    text: 'Merge cells',
    type: 'text',
  };
};

const clearButton = (table, selected) => {
  return {
    onClick: () => clear(table, selected),
    dataHook: 'clear',
    text: 'Clear',
    type: 'text',
  };
};

const deleteTableButton = deleteBlock => {
  return {
    onClick: deleteBlock,
    dataHook: 'delete-table',
    text: 'Delete table',
    type: 'text',
  };
};

const divider = () => {
  return {
    type: 'divider',
  };
};

export const getContextMenuButtonsProps = (
  isAllCellsSelected,
  selectedRows,
  selectedCols,
  multipleCellsSelected,
  table,
  innerEditorsRefs,
  selected,
  deleteRow,
  addRow,
  deleteColumn,
  addCol,
  selectRows,
  selectCols,
  deleteBlock,
  merge
) => {
  const range = selected && getRange(selected);
  const shouldShowSplit = range && table.isParentCellSelected(range);
  let buttons;
  if (isAllCellsSelected) {
    buttons = [
      clearButton(table, selected),
      deleteTableButton(deleteBlock),
      divider(),
      addLastRowButton(addRow, table),
      addLastColButton(addCol, table),
      divider(),
      multipleCellsSelected && mergeButton(merge),
      shouldShowSplit && splitButton(table, selected),
      divider(),
      distributeRowsButton(table, innerEditorsRefs, selected),
      distributeColumnsButton(table, selected),
    ];
  } else if (selectedRows) {
    buttons = [
      clearButton(table, selected),
      deleteRowButton(deleteRow, selectedRows),
      divider(),
      addRowAboveButton(addRow, range),
      addRowBelowButton(addRow, range),
      divider(),
      mergeButton(merge),
      shouldShowSplit && splitButton(table, selected),
      divider(),
      distributeRowsButton(table, innerEditorsRefs, selected),
    ];
  } else if (selectedCols) {
    buttons = [
      clearButton(table, selected),
      deleteColButton(deleteColumn, selectedCols),
      divider(),
      addColRightButton(addCol, range),
      addColLeftButton(addCol, range),
      divider(),
      mergeButton(merge),
      shouldShowSplit && splitButton(table, selected),
      divider(),
      distributeColumnsButton(table, selected),
    ];
  } else if (multipleCellsSelected) {
    buttons = [
      clearButton(table, selected),
      divider(),
      mergeButton(merge),
      shouldShowSplit && splitButton(table, selected),
      divider(),
      distributeRowsButton(table, innerEditorsRefs, selected),
      distributeColumnsButton(table, selected),
    ];
  } else {
    buttons = [
      clearButton(table, selected),
      divider(),
      shouldShowSplit && splitButton(table, selected),
      shouldShowSplit && divider(),
      selectRowButton(selected, selectRows),
      selectColButton(selected, selectCols),
    ];
  }
  return [
    {
      type: 'context-menu',
      getIcon: () => ContextMenuIcon,
      dataHook: 'context-menu',
      buttonList: buttons,
    },
  ];
};
