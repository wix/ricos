import { ContextMenuIcon } from '../../icons';
import { getMultipleCellsContextMenuButtonsProps } from './MultipleCellsContextMenuButtonsProps';
import { getSingleCellContextMenuButtonsProps } from './SingleCellContextMenuButtonsProps';
import { getRange } from '../../tableUtils';

const clear = (table, selected) => table.clearRange(getRange(selected));
const split = (table, selected) => table.splitCell(getRange(selected));

const splitButton = (table, selected) => {
  const range = selected && getRange(selected);
  const shouldShowSplit = range && table.isParentCellSelected(range);
  return shouldShowSplit
    ? [
        {
          onClick: () => split(table, selected),
          dataHook: 'split-cells',
          text: 'Split cells',
          type: 'text',
        },
      ]
    : [];
};

const getContextMenuButtons = (
  shouldShowContextMenu,
  table,
  innerEditorsRefs,
  selected,
  deleteRow,
  addRow,
  deleteColumn,
  addCol,
  selectRows,
  selectCols
) => {
  return shouldShowContextMenu
    ? [
        ...getMultipleCellsContextMenuButtonsProps(
          table,
          innerEditorsRefs,
          selected,
          deleteRow,
          addRow,
          deleteColumn,
          addCol
        ),
      ]
    : [...getSingleCellContextMenuButtonsProps(table, selected, selectRows, selectCols)];
};

export const getContextMenuButtonsProps = (
  shouldShowContextMenu,
  table,
  innerEditorsRefs,
  selected,
  deleteRow,
  addRow,
  deleteColumn,
  addCol,
  selectRows,
  selectCols
) => {
  return [
    {
      type: 'context-menu',
      getIcon: () => ContextMenuIcon,
      dataHook: 'context-menu',
      buttonList: [
        {
          onClick: () => clear(table, selected),
          dataHook: 'clear',
          text: 'Clear',
          type: 'text',
        },
        ...splitButton(table, selected),
        ...getContextMenuButtons(
          shouldShowContextMenu,
          table,
          innerEditorsRefs,
          selected,
          deleteRow,
          addRow,
          deleteColumn,
          addCol,
          selectRows,
          selectCols
        ),
      ],
    },
  ];
};
