import { difference } from 'lodash';
import { Palette } from 'ricos-common/src/themeTypes';

const BG_COLOR = 11;
const SECONDARY_COLOR = 13;
const COLOR4 = 14;
const TEXT_COLOR = 15;
const COLOR7 = 17;
const ACTION_COLOR = 18;

export const COLORS = { BG_COLOR, SECONDARY_COLOR, COLOR4, TEXT_COLOR, COLOR7, ACTION_COLOR };
export const assertPalette = (palette?: Palette) => {
  if (!palette) return;
  if (palette.length === 0) throw Error('Received empty palette colors array');
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
};
