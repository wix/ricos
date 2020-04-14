/* eslint-disable camelcase */
export default function global(colors: any) {
  const { bgColor, textColor } = colors;
  return {
    editor: {
      background: bgColor,
      color: textColor,
    },
  };
}
