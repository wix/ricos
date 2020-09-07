/* eslint-disable camelcase */
import { PaletteColors } from 'wix-rich-content-common';

export default function commonStyles(colors: PaletteColors) {
  const { bgColor, textColor } = colors;
  return {
    editor: {
      background: bgColor,
      color: textColor,
    },
  };
}
