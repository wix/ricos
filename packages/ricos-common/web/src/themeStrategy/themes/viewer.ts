/* eslint-disable camelcase */
import { PaletteColors } from '../themeTypes';

export default function viewer(colors: PaletteColors) {
  const { actionColor } = colors;
  return {
    quote: {
      'border-left-color': actionColor,
      'border-right-color': actionColor,
    },
  };
}
