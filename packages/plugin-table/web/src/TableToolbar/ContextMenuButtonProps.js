import { ContextMenuIcon } from '../icons';
import { getRange, getColsRange, getRowsRange } from '../domain/tableDataUtil';
import { isCellsNumberInvalid } from '../tableUtil';
import { SOURCE, LOCATION, CATEGORY, ACTION_NAME } from '../consts';

const getRowIndex = range => range[0].i;
const getColIndex = range => range[0].j;
const clear = (table, selected) => table.clearCells(getRange(selected));
const split = (table, selected) => table.splitCell(getRange(selected));
const selectRow = (selected, selectRows) => {
  const selectedRow = selected.start.i;
  selectRows({ start: selectedRow, end: selectedRow });
};
const selectCol = (selected, selectCols) => {
  const selectedCol = selected.start.j;
  selectCols({ start: selectedCol, end: selectedCol });
};
const addLastRow = (addRow, table) =>
  addRow(table.getRowNum(), { source: SOURCE.CONTEXT_MENU, location: LOCATION.BELOW });
const addLastCol = (addCol, table) =>
  addCol(table.getColNum(), { source: SOURCE.CONTEXT_MENU, location: LOCATION.RIGHT });

const splitButton = (table, selected, t) => {
  return {
    onClick: () => split(table, selected),
    dataHook: 'split-cells',
    text: t('TablePlugin_Toolbar_ContextMenu_SplitCells_Button'),
    type: 'text',
  };
};

const selectRowButton = (selected, selectRows, t) => {
  return {
    onClick: () => selectRow(selected, selectRows),
    dataHook: 'select-row',
    text: t('TablePlugin_Toolbar_ContextMenu_SelectRow_Button'),
    type: 'text',
  };
};

const selectColButton = (selected, selectCols, t) => {
  return {
    onClick: () => selectCol(selected, selectCols),
    dataHook: 'select-column',
    text: t('TablePlugin_Toolbar_ContextMenu_SelectCol_Button'),
    type: 'text',
  };
};

const deleteRowButton = (deleteRow, selectedRows, t) => {
  return {
    onClick: () => deleteRow(selectedRows),
    dataHook: 'delete-row',
    text: t('TablePlugin_Toolbar_ContextMenu_DeleteRow_Button'),
    type: 'text',
  };
};

const addLastRowButton = (addRow, table, t, disable) => {
  return {
    onClick: () => addLastRow(addRow, table),
    dataHook: 'insert-last-row',
    text: t('TablePlugin_Toolbar_ContextMenu_InsertRow_Button'),
    type: 'text',
    isDisabled: () => disable,
    tooltip: disable && t('TablePlugin_SettingsModal_limitError'),
  };
};

const addLastColButton = (addCol, table, t, disable) => {
  return {
    onClick: () => addLastCol(addCol, table),
    dataHook: 'insert-last-col',
    text: t('TablePlugin_Toolbar_ContextMenu_InsertCol_Button'),
    type: 'text',
    isDisabled: () => disable,
    tooltip: disable && t('TablePlugin_SettingsModal_limitError'),
  };
};

const addRowAboveButton = (addRow, range, t, disable) => {
  return {
    onClick: () =>
      addRow(getRowIndex(range), { source: SOURCE.CONTEXT_MENU, location: LOCATION.ABOVE }),
    dataHook: 'insert-above',
    text: t('TablePlugin_Toolbar_ContextMenu_InsertAbove_Button'),
    type: 'text',
    isDisabled: () => disable,
    tooltip: disable && t('TablePlugin_SettingsModal_limitError'),
  };
};

const addRowBelowButton = (addRow, range, t, disable) => {
  return {
    onClick: () =>
      addRow(getRowIndex(range) + 1, { source: SOURCE.CONTEXT_MENU, location: LOCATION.BELOW }),
    dataHook: 'insert-below',
    text: t('TablePlugin_Toolbar_ContextMenu_InsertBelow_Button'),
    type: 'text',
    isDisabled: () => disable,
    tooltip: disable && t('TablePlugin_SettingsModal_limitError'),
  };
};

const deleteColButton = (deleteColumn, selectedCols, t) => {
  return {
    onClick: () => deleteColumn(selectedCols),
    dataHook: 'delete-column',
    text: t('TablePlugin_Toolbar_ContextMenu_DeleteCol_Button'),
    type: 'text',
  };
};

const addColRightButton = (addCol, range, t, disable) => {
  return {
    onClick: () =>
      addCol(getColIndex(range) + 1, { source: SOURCE.CONTEXT_MENU, location: LOCATION.RIGHT }),
    dataHook: 'insert-right',
    text: t('TablePlugin_Toolbar_ContextMenu_InsertRight_Button'),
    type: 'text',
    isDisabled: () => disable,
    tooltip: disable && t('TablePlugin_SettingsModal_limitError'),
  };
};

const addColLeftButton = (addCol, range, t, disable) => {
  return {
    onClick: () =>
      addCol(getColIndex(range), { source: SOURCE.CONTEXT_MENU, location: LOCATION.LEFT }),
    dataHook: 'insert-left',
    text: t('TablePlugin_Toolbar_ContextMenu_InsertLeft_Button'),
    type: 'text',
    isDisabled: () => disable,
    tooltip: disable && t('TablePlugin_SettingsModal_limitError'),
  };
};

const distributeRowsButton = (distributeRows, selected, t) => {
  return {
    onClick: () => distributeRows(selected),
    dataHook: 'distribute-rows',
    text: t('TablePlugin_Toolbar_ContextMenu_DistributeRows_Button'),
    type: 'text',
  };
};

const distributeColumnsButton = (distributeColumns, selected, t) => {
  return {
    onClick: () => distributeColumns(selected),
    dataHook: 'distribute-columns',
    text: t('TablePlugin_Toolbar_ContextMenu_DistributeCols_Button'),
    type: 'text',
  };
};

const mergeButton = (merge, t) => {
  return {
    onClick: () => merge(),
    dataHook: 'merge-cells',
    text: t('TablePlugin_Toolbar_ContextMenu_MergeCells_Button'),
    type: 'text',
  };
};

const clearButton = (table, selected, t) => {
  return {
    onClick: () => clear(table, selected),
    dataHook: 'clear',
    text: t('TablePlugin_Toolbar_ContextMenu_Clear_Button'),
    type: 'text',
  };
};

const deleteTableButton = (deleteBlock, t) => {
  return {
    onClick: deleteBlock,
    dataHook: 'delete-table',
    text: t('TablePlugin_Toolbar_ContextMenu_DeleteTable_Button'),
    type: 'text',
  };
};

const divider = () => {
  return {
    type: 'divider',
  };
};

// eslint-disable-next-line complexity
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
  merge,
  t,
  distributeRows,
  distributeColumns,
  triggerBi
) => {
  const range = selected && getRange(selected);
  const colsRange = selected && getColsRange(selected);
  const rowsRange = selected && getRowsRange(selected);
  const shouldShowMerge = false;
  const rowNum = table.getRowNum();
  const colNum = table.getColNum();
  const disableNewCol = isCellsNumberInvalid(rowNum, colNum + 1);
  const disableNewRow = isCellsNumberInvalid(rowNum + 1, colNum);
  // const shouldShowMerge =
  //   range &&
  //   table.isAllMergeRangeSelected(range) &&
  //   !table.isBothHeaderCellsAndRegularCellsSelected(range);
  const shouldShowSplit = table.getSelectedParentCells(range).length > 0;
  let buttons;
  if (isAllCellsSelected) {
    buttons = [
      clearButton(table, selected, t),
      deleteTableButton(deleteBlock, t),
      divider(),
      addLastRowButton(addRow, table, t, disableNewRow),
      addLastColButton(addCol, table, t, disableNewCol),
      divider(),
      shouldShowMerge && mergeButton(merge, t),
      shouldShowSplit && splitButton(table, selected, t),
      divider(),
      distributeRowsButton(distributeRows, selected, t),
      distributeColumnsButton(distributeColumns, selected, t),
    ];
  } else if (selectedRows) {
    buttons = [
      clearButton(table, selected, t),
      deleteRowButton(deleteRow, selectedRows, t),
      divider(),
      addRowAboveButton(addRow, range, t, disableNewRow),
      addRowBelowButton(addRow, range, t, disableNewRow),
      divider(),
      shouldShowMerge && mergeButton(merge, t),
      shouldShowSplit && splitButton(table, selected, t),
      divider(),
      distributeColumnsButton(distributeColumns, selected, t),
    ];
  } else if (selectedCols) {
    buttons = [
      clearButton(table, selected, t),
      deleteColButton(deleteColumn, selectedCols, t),
      divider(),
      addColRightButton(addCol, range, t, disableNewCol),
      addColLeftButton(addCol, range, t, disableNewCol),
      divider(),
      shouldShowMerge && mergeButton(merge, t),
      shouldShowSplit && splitButton(table, selected, t),
      divider(),
      distributeRowsButton(distributeRows, selected, t),
    ];
  } else if (multipleCellsSelected) {
    buttons = [
      clearButton(table, selected, t),
      divider(),
      shouldShowMerge && mergeButton(merge, t),
      shouldShowSplit && splitButton(table, selected, t),
      divider(),
      rowsRange?.length > 1 && distributeRowsButton(distributeRows, selected, t),
      colsRange?.length > 1 && distributeColumnsButton(distributeColumns, selected, t),
    ];
  } else {
    buttons = [
      clearButton(table, selected, t),
      divider(),
      shouldShowSplit && splitButton(table, selected, t),
      shouldShowSplit && divider(),
      selectRowButton(selected, selectRows, t),
      selectColButton(selected, selectCols, t),
    ];
  }
  const category = isAllCellsSelected
    ? CATEGORY.ENTIRE_TABLE
    : selectedRows
    ? CATEGORY.ROW
    : selectedCols
    ? CATEGORY.COLUMN
    : CATEGORY.RANGE;
  return [
    {
      type: 'context-menu',
      getIcon: () => ContextMenuIcon,
      dataHook: 'context-menu',
      buttonList: buttons,
      onContextmenuClick: () => triggerBi(ACTION_NAME.CONTEXT_MENU_CLICK, { category }),
      onOptionClick: actionName =>
        triggerBi(ACTION_NAME.CONTEXT_MENU_OPTION_CLICK, { category, actionName }),
    },
  ];
};
