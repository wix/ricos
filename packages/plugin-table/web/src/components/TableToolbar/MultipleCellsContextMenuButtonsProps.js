import { getRange, getColsRange } from '../../tableUtils';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;

const distributeRows = (table, innerEditorsRefs, selected) =>
  table.distributeRows(innerEditorsRefs, getRange(selected));
const distributeColumns = (table, selected) => table.distributeColumns(getColsRange(selected));
const merge = (table, selected) => table.mergeCells(getRange(selected));

const additionalProps = (selected, table, deleteRow, addRow, deleteColumn, addCol) => {
  const range = selected && getRange(selected);
  const selectedRows = range && table.getSelectedRows(range);
  const selectedCols = range && table.getSelectedCols(range);
  return selectedRows
    ? [...getRowOptions(range, selectedRows, deleteRow, addRow)]
    : selectedCols
    ? [...getColOptions(range, selectedCols, deleteColumn, addCol)]
    : [];
};

const getRowOptions = (range, selectedRows, deleteRow, addRow) => {
  return [
    {
      onClick: () => deleteRow(selectedRows),
      dataHook: 'delete-row',
      text: 'Delete row',
      type: 'text',
    },
    {
      onClick: () => addRow(getRowIndex(range)),
      dataHook: 'insert-above',
      text: 'Insert 1 above',
      type: 'text',
    },
    {
      onClick: () => addRow(getRowIndex(range) + 1),
      dataHook: 'insert-below',
      text: 'Insert 1 below',
      type: 'text',
    },
  ];
};

const getColOptions = (range, selectedCols, deleteColumn, addCol) => {
  return [
    {
      onClick: () => deleteColumn(selectedCols),
      dataHook: 'delete-column',
      text: 'Delete column',
      type: 'text',
    },
    {
      onClick: () => addCol(getColIndex(range) + 1),
      dataHook: 'insert-right',
      text: 'Insert 1 right',
      type: 'text',
    },
    {
      onClick: () => addCol(getColIndex(range)),
      dataHook: 'insert-left',
      text: 'Insert 1 left',
      type: 'text',
    },
  ];
};

export const getMultipleCellsContextMenuButtonsProps = (
  table,
  innerEditorsRefs,
  selected,
  deleteRow,
  addRow,
  deleteColumn,
  addCol
) => {
  return [
    {
      onClick: () => distributeRows(table, innerEditorsRefs, selected),
      dataHook: 'distribute-rows',
      text: 'Distribute rows',
      type: 'text',
    },
    {
      onClick: () => distributeColumns(table, selected),
      dataHook: 'distribute-columns',
      text: 'Distribute columns',
      type: 'text',
    },
    {
      onClick: () => merge(table, selected),
      dataHook: 'merge-cells',
      text: 'Merge cells',
      type: 'text',
    },
    ...additionalProps(selected, table, deleteRow, addRow, deleteColumn, addCol),
  ];
};
