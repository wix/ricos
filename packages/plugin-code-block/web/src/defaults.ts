import { PaletteColors, ThemeUtils } from 'wix-rich-content-common';

export const DEFAULTS = {
  config: {},
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const theme = ({ textColor }: PaletteColors, { hexToRgbA, isBright }: ThemeUtils) => ({
  //rich-content-editor.scss
  code: {},
  codeBlock: {},
  editor: {
    '& $code, $codeBlock': {
      backgroundColor: hexToRgbA(textColor, isBright(textColor) ? 0.2 : 0.05),
    },
  },
});
