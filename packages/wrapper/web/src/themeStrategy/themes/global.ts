/* eslint-disable camelcase */
export default function global(colors: PaletteColors) {
  const { bgColor, textColor } = colors;
  return {
    editor: {
      background: bgColor,
      color: textColor,
    },
  };
}
