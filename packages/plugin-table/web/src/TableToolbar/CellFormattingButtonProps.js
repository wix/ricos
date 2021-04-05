import { getRange } from '../domain/tableDataUtil';
import {
  VerticalAlignmentTop,
  VerticalAlignmentMiddle,
  VerticalAlignmentBottom,
  BGColorIcon,
  BorderIcon,
  TrashIcon,
  BorderOutsideIcon,
  RowHeader,
  ColumnHeader,
} from '../icons';

const DEFAULT_PALETTE_BG = Object.freeze([
  '#ff0000',
  '#ffffff',
  '#303030',
  '#3a54b4',
  '#bfad80',
  '#dddddd',
]);
const DEFAULT_PALETTE_BORDERS = Object.freeze([
  '#ff0000',
  '#ffffff',
  '#303030',
  '#3a54b4',
  '#bfad80',
  '#dddddd',
]);
const DEFAULT_BG_COLOR = 'transparent';
const DEFAULT_BORDER_COLOR = 'unset';

const getColorsFromComponentData = (selected, table) => {
  const selectionStyle = table.getSelectionStyle(selected, DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR);
  const bgColor = selectionStyle.selectionBGColor || 'unset';
  const borderColor = selectionStyle.selectionBorderColor || 'unset';
  const verticalAlignment = selectionStyle.selectionVerticalAlign;
  const cellBorderIsActive = selectionStyle.selectionBorderIsActive;
  return {
    bgCurrentColor: bgColor,
    borderCurrentColor: borderColor,
    verticalAlignment,
    cellBorderIsActive,
  };
};

const setVerticalAlign = (value, table, selected) => {
  table.setCellsStyle({ verticalAlign: value }, getRange(selected));
};

const getAllCellsSelectionButtons = (isAllCellsSelected, deleteBlock, t) => {
  return isAllCellsSelected
    ? [
        {
          type: 'SEPARATOR',
        },
        {
          tooltip: t('TablePlugin_Toolbar_DeleteTable_Tooltip'),
          onClick: deleteBlock,
          dataHook: 'delete-table',
          getIcon: () => TrashIcon,
          getLabel: () => {},
          isActive: () => false,
          isDisabled: () => {},
          type: 'toggle',
        },
      ]
    : [];
};

const getHeaderButtons = (selectedRows, selectedCols, table, t) => {
  const isRowHeader = isHeaderSelected(selectedRows);
  const isColHeader = isHeaderSelected(selectedCols);
  if (isRowHeader || isColHeader) {
    return [
      {
        type: 'SEPARATOR',
      },
      {
        tooltip: t('TablePlugin_Toolbar_Header_Tooltip'),
        onClick: isRowHeader ? table.toggleRowHeader : table.toggleColHeader,
        dataHook: isRowHeader ? 'row-header' : 'col-header',
        getIcon: () => (isRowHeader ? RowHeader : ColumnHeader),
        isDisabled: () => {},
        getLabel: () => {},
        isActive: () => (isRowHeader ? table.getRowHeader() : table.getColHeader()),
        type: 'button',
      },
    ];
  }
  return [];
};

const getBorderColorButtons = (selected, settings, table, multipleCellsSelected, t) => {
  if (multipleCellsSelected) {
    return [
      {
        type: 'nested-menu',
        tooltip: t('TablePlugin_Toolbar_BorderColor_Tooltip'),
        dataHook: 'border-color-buttons',
        getIcon: () => BorderIcon,
        isActive: () => getColorsFromComponentData(selected, table).cellBorderIsActive,
        buttonList: [
          {
            dataHook: 'border-color-around',
            getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
            onColorAdded: color => settings?.onBorderColorAdded?.(color),
            onChange: color => table.setCellsSelectionBorderStyle(color, selected),
            settings,
            defaultPalette: DEFAULT_PALETTE_BORDERS,
            getUserColors: () => settings?.getBorderUserColors?.(),
            getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
            getIcon: () => BorderOutsideIcon,
            isDisabled: () => {},
            getLabel: () => {},
            isActive: () => false,
            onResetColor: () => table.removeBorderAround(selected),
            type: 'color-picker',
          },
          {
            dataHook: 'border-color-all',
            getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
            onColorAdded: color => settings?.onBorderColorAdded?.(color),
            onChange: color => table.setCellsSelectionBorderStyle(color, selected, true),
            settings,
            defaultPalette: DEFAULT_PALETTE_BORDERS,
            getUserColors: () => settings?.getBorderUserColors?.(),
            getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
            getIcon: () => BorderIcon,
            isDisabled: () => {},
            getLabel: () => {},
            isActive: () => false,
            onResetColor: () => table.removeAllBorders(getRange(selected)),
            type: 'color-picker',
          },
        ],
      },
    ];
  } else {
    return [
      {
        tooltip: t('TablePlugin_Toolbar_BorderColor_Tooltip'),
        dataHook: 'border-color-around',
        getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
        onColorAdded: color => settings?.onBorderColorAdded?.(color),
        onChange: color => table.setCellsSelectionBorderStyle(color, selected),
        settings,
        defaultPalette: DEFAULT_PALETTE_BORDERS,
        getUserColors: () => settings?.getBorderUserColors?.(),
        getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
        getIcon: () => BorderIcon,
        isDisabled: () => {},
        getLabel: () => {},
        isActive: () => getColorsFromComponentData(selected, table).cellBorderIsActive,
        onResetColor: () => table.removeAllBorders(getRange(selected)),
        type: 'color-picker',
      },
    ];
  }
};

const isHeaderSelected = (selection = []) => selection.length === 1 && selection.includes('0');

export const getCellFormattingButtonsProps = (
  selected,
  settings,
  table,
  isAllCellsSelected,
  deleteBlock,
  selectedRows,
  selectedCols,
  multipleCellsSelected,
  t
) => {
  return [
    {
      buttonList: [
        {
          dataHook: 'vertical-alignment-align-top',
          getIcon: () => VerticalAlignmentTop,
          getLabel: () => {},
          isActive: () => getColorsFromComponentData(selected, table).verticalAlignment === 'top',
          isDisabled: () => {},
          name: 'AlignTop',
          onClick: () => setVerticalAlign('top', table, selected),
          tooltip: t('TablePlugin_Toolbar_VerticalAlignment_AlignTop_Tooltip'),
          type: 'button',
        },
        {
          dataHook: 'vertical-alignment-align-middle',
          getIcon: () => VerticalAlignmentMiddle,
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).verticalAlignment === 'middle',
          isDisabled: () => {},
          name: 'AlignMiddle',
          onClick: () => setVerticalAlign('middle', table, selected),
          tooltip: t('TablePlugin_Toolbar_VerticalAlignment_AlignMiddle_Tooltip'),
          type: 'button',
        },
        {
          dataHook: 'vertical-alignment-align-bottom',
          getIcon: () => VerticalAlignmentBottom,
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).verticalAlignment === 'bottom',
          isDisabled: () => {},
          name: 'AlignBottom',
          onClick: () => setVerticalAlign('bottom', table, selected),
          tooltip: t('TablePlugin_Toolbar_VerticalAlignment_AlignBottom_Tooltip'),
          type: 'button',
        },
      ],
      dataHook: 'VerticalAlignment',
      name: 'VerticalAlignment',
      tooltip: t('TablePlugin_Toolbar_VerticalAlignment_Tooltip'),
      type: 'GROUP',
    },
    {
      type: 'SEPARATOR',
    },
    {
      tooltip: t('TablePlugin_Toolbar_BGColor_Tooltip'),
      dataHook: 'back-ground-color',
      getCurrentColor: () => getColorsFromComponentData(selected, table).bgCurrentColor,
      onColorAdded: color => settings?.onBgColorAdded?.(color),
      onChange: color => table.setCellsStyle({ backgroundColor: color }, getRange(selected)),
      settings,
      defaultPalette: DEFAULT_PALETTE_BG,
      getUserColors: () => settings?.getBgUserColors?.(),
      getDefaultColors: () => settings?.getBgDefaultColors?.() || DEFAULT_BG_COLOR,
      getIcon: () => BGColorIcon,
      isDisabled: () => {},
      getLabel: () => {},
      isActive: () =>
        getColorsFromComponentData(selected, table).bgCurrentColor !== DEFAULT_BG_COLOR,
      onResetColor: () => table.removeCellBackgroundColor(getRange(selected)),
      type: 'color-picker',
    },
    {
      type: 'SEPARATOR',
    },
    ...getBorderColorButtons(selected, settings, table, multipleCellsSelected, t),
    ...getHeaderButtons(selectedRows, selectedCols, table, t),
    ...getAllCellsSelectionButtons(isAllCellsSelected, deleteBlock, t),
  ];
};
