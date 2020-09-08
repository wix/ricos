import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';
import { TABLE_TYPE as type } from './types';
import { createEmptyRow } from './tableUtils';

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
      rows: createEmptyRows(rowNum, colNum),
    },
  });

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const theme = (colors: PaletteColors, utils: ThemeUtils) => {
  // eslint-disable-next-line no-console
  console.warn(
    `Table needs to provide css definitions for Ricos.
    If you're using any color that arrives from Wix Palettes, then you should go to your
    plugin's "defaults.js" and add the relevant classnames.
    If you don't - you can remove this message.`
  );
  return {};
};
