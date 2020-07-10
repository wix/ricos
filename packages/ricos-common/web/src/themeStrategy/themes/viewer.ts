/* eslint-disable camelcase */
import { PaletteColors, ThemeUtils } from '../themeTypes';

export default function viewer(colors: PaletteColors, utils: ThemeUtils) {
  const { actionColor, textColor } = colors;
  return {
    quote: {
      'border-left-color': actionColor,
      'border-right-color': actionColor,
    },
    //rich-content-viewer.scss
    code: {},
    codeBlock: {},
    editor: {
      '& $code, $codeBlock': {
        backgroundColor: utils.hexToRgbA(textColor, utils.isBright(textColor) ? 0.2 : 0.05),
      },
    },
  };
}
