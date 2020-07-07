export const DEFAULTS = {
  config: {},
};

export const THEME = ({ textColor }, { hexToRgbA, isBright }) => ({
  //rich-content-editor.scss
  code: {},
  codeBlock: {},
  editor: {
    '& $code, $codeBlock': {
      backgroundColor: hexToRgbA(textColor, isBright(textColor) ? 0.2 : 0.05),
    },
  },
});
