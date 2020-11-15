const selectRow = (selected, selectRows) => {
  const selectedRow = selected.start.i;
  selectRows({ start: selectedRow, end: selectedRow });
};
const selectCol = (selected, selectCols) => {
  const selectedCol = selected.start.j;
  selectCols({ start: selectedCol, end: selectedCol });
};

export const getSingleCellContextMenuButtonsProps = (table, selected, selectRows, selectCols) => {
  return [
    {
      onClick: () => selectRow(selected, selectRows),
      dataHook: 'select-row',
      text: 'Select row',
      type: 'text',
    },
    {
      onClick: () => selectCol(selected, selectCols),
      dataHook: 'select-column',
      text: 'Select column',
      type: 'text',
    },
  ];
};
