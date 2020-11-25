import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
import { TABLE_TYPE as type } from './types';
import { createEmptyRow } from './tableUtils';
import { ROW_DEFAULT_HEIGHT, COL_DEFAULT_WIDTH, COLORS } from './consts';

const createEmptyRows = (rowNum, colNum) => {
  const rows = {};
  [...Array(rowNum).fill(0)].map((row, i) => (rows[i] = createEmptyRow(colNum)));
  return rows;
};

export const getDefaultsSettings = (rowNum = 4, colNum = 4) =>
  Object.freeze({
    type,
    config: {
      size: 'content',
      alignment: 'center',
      colsWidth: [...Array(colNum).fill(COL_DEFAULT_WIDTH)],
      rowsHeight: [...Array(rowNum).fill(ROW_DEFAULT_HEIGHT)],
      rows: createEmptyRows(rowNum, colNum),
    },
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WRAPPER_PALETTE: any = {};
export const getColors = () => ({ ...COLORS, ...WRAPPER_PALETTE });

export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  const { textColor, bgColor, actionColor } = colors;
  WRAPPER_PALETTE.color1 = bgColor;
  WRAPPER_PALETTE.color5 = textColor;
  WRAPPER_PALETTE.color7 = utils.toCssRgbA(actionColor, 0.06);
  WRAPPER_PALETTE.color8 = actionColor;
};

export const getBorderStyle = () => `1px double ${getColors().color8}`;
