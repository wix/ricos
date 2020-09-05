/* eslint-disable camelcase */
import { PaletteColors } from 'ricos-common';

export default function commonStyles(colors: PaletteColors) {
  const { bgColor, textColor } = colors;
  return {
    editor: {
      background: bgColor,
      color: textColor,
    },
  };
}
