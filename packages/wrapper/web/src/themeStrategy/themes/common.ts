/* eslint-disable camelcase */
export default function commonStyles(colors: PaletteColors) {
  const { bgColor, textColor } = colors;
  return {
    editor: {
      background: bgColor,
      color: textColor,
    },
  };
}
