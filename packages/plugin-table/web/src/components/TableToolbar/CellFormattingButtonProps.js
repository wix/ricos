import { getRange } from '../../tableUtils';
import {
  VerticalAlignmentTop,
  VerticalAlignmentMiddle,
  VerticalAlignmentBottom,
  BGColorIcon,
  BorderIcon,
  TrashIcon,
} from '../../icons';

const DEFAULT_PALETTE = Object.freeze([
  'transparent',
  '#ffffff',
  '#303030',
  '#3a54b4',
  '#bfad80',
  '#dddddd',
]);
const DEFAULT_BG_COLOR = '#ffffff';
const DEFAULT_BORDER_COLOR = '#dddddd';

const getColorsFromComponentData = (selected, table) => {
  const selectionStyle = table.getSelectionStyle(selected, DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR);
  const bgColor = selectionStyle.selectionBGColor;
  const borderColor = selectionStyle.selectionBorderColor;
  const verticalAlignment = selectionStyle.selectionVerticalAlign;
  return {
    bgCurrentColor: bgColor,
    borderCurrentColor: borderColor,
    verticalAlignment,
  };
};

const setVerticalAlign = (value, table, selected) => {
  table.setCellsStyle({ verticalAlign: value }, getRange(selected));
};

const getAllCellsSelectionButtons = (isAllCellsSelected, deleteBlock) => {
  return isAllCellsSelected
    ? {
        Separator3: {
          type: 'separator',
        },
        Trash: {
          tooltip: 'Delete table',
          onClick: deleteBlock,
          dataHook: 'delete-table',
          getIcon: () => TrashIcon,
          getLabel: () => {},
          isActive: () => false,
          isDisabled: () => {},
          type: 'toggle',
        },
      }
    : null;
};

export const getCellFormattingButtonsProps = (
  selected,
  settings,
  table,
  isAllCellsSelected,
  deleteBlock
) => {
  return {
    BgColorPicker: {
      tooltip: 'Back ground color',
      getCurrentColor: () => getColorsFromComponentData(selected, table).bgCurrentColor,
      onColorAdded: color => settings?.onBgColorAdded?.(color),
      onChange: color => table.setCellsStyle({ backgroundColor: color }, getRange(selected)),
      settings,
      defaultPalette: DEFAULT_PALETTE,
      getUserColors: () => settings?.getBgUserColors?.(),
      getDefaultColors: () => settings?.getBgDefaultColors?.() || DEFAULT_BG_COLOR,
      getIcon: () => BGColorIcon,
      isDisabled: () => {},
      getLabel: () => {},
      isActive: () =>
        getColorsFromComponentData(selected, table).bgCurrentColor !== DEFAULT_BG_COLOR,
      type: 'color-picker',
    },
    Separator: {
      type: 'separator',
    },
    BorderColorPicker: {
      type: 'nested-menu',
      getIcon: () => BorderIcon,
      isActive: () =>
        getColorsFromComponentData(selected, table).borderCurrentColor !== DEFAULT_BORDER_COLOR,
      buttonList: {
        Border1: {
          getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
          onColorAdded: color => settings?.onBorderColorAdded?.(color),
          onChange: color => table.setCellsSelectionBorderStyle(`1px double ${color}`, selected),
          settings,
          defaultPalette: DEFAULT_PALETTE,
          getUserColors: () => settings?.getBorderUserColors?.(),
          getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
          getIcon: () => BorderIcon,
          isDisabled: () => {},
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).borderCurrentColor !== DEFAULT_BORDER_COLOR,
          type: 'color-picker',
        },
        Border2: {
          getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
          onColorAdded: color => settings?.onBorderColorAdded?.(color),
          onChange: color =>
            table.setAllBordersCellsSelectionStyle(`1px double ${color}`, selected),
          settings,
          defaultPalette: DEFAULT_PALETTE,
          getUserColors: () => settings?.getBorderUserColors?.(),
          getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
          getIcon: () => BorderIcon,
          isDisabled: () => {},
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).borderCurrentColor !== DEFAULT_BORDER_COLOR,
          type: 'color-picker',
        },
      },
    },
    Separator2: {
      type: 'separator',
    },
    VerticalAlignment: {
      buttonList: {
        AlignTop: {
          dataHook: 'vertical-alignment-align-top',
          getIcon: () => VerticalAlignmentTop,
          getLabel: () => {},
          isActive: () => getColorsFromComponentData(selected, table).verticalAlignment === 'top',
          isDisabled: () => {},
          name: 'AlignTop',
          onClick: () => setVerticalAlign('top', table, selected),
          tooltip: 'Align top',
          type: 'button',
        },
        AlignMiddle: {
          dataHook: 'vertical-alignment-align-middle',
          getIcon: () => VerticalAlignmentMiddle,
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).verticalAlignment === 'middle',
          isDisabled: () => {},
          name: 'AlignMiddle',
          onClick: () => setVerticalAlign('middle', table, selected),
          tooltip: 'Align middle',
          type: 'button',
        },
        AlignBottom: {
          dataHook: 'vertical-alignment-align-bottom',
          getIcon: () => VerticalAlignmentBottom,
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).verticalAlignment === 'bottom',
          isDisabled: () => {},
          name: 'AlignBottom',
          onClick: () => setVerticalAlign('bottom', table, selected),
          tooltip: 'Align bottom',
          type: 'button',
        },
      },
      dataHook: 'VerticalAlignment',
      name: 'VerticalAlignment',
      tooltip: 'Vertical alignment',
      type: 'group',
    },
    ...getAllCellsSelectionButtons(isAllCellsSelected, deleteBlock),
  };
};
