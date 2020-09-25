import { difference } from 'lodash';
import { RicosTheme, WixColor, WixPalette } from 'ricos-common';

const BG_COLOR = 11;
const TEXT_COLOR = 15;
const ACTION_COLOR = 18;

export const COLORS = { BG_COLOR, TEXT_COLOR, ACTION_COLOR };
export const assertWixPalette = (palette: WixPalette) => {
  if (palette.length === 0) {
    throw Error('Received empty palette colors array');
  }
  const receivedColors = palette.map(val => val.name);
  const missingColors = difference(
    Object.values(COLORS).map(num => `color_${num}`),
    receivedColors
  );
  if (missingColors.length > 0) {
    const error: string[] = [];
    error.push(
      'Some palette colors were not supplied:',
      `\n${missingColors}\n`,
      'Palette array must include the following colors:',
      Object.entries(COLORS)
        .map(entry => `${entry[1]} - ${entry[0]}`)
        .toString()
        .split(',')
        .join('\n'),
      ''
    );
    throw Error(error.join('\n'));
  }
  return palette as WixPalette;
};

export const isRicosPalette = (palette: RicosTheme['palette']) =>
  palette &&
  typeof palette !== 'string' &&
  !Array.isArray(palette) &&
  palette.actionColor &&
  palette.textColor &&
  palette.bgColor;

export const getColorByCode = (wixPalette: WixPalette, code: number): WixColor => {
  const idx = code <= 5 ? code - 1 : code - 6;
  return wixPalette[idx];
};

export const getColorValue = (wixPalette: WixPalette, code: number): string =>
  getColorByCode(wixPalette, code).value;
