/* eslint-disable camelcase */
export default function viewer(colors: any) {
  const { actionColor } = colors;
  return {
    quote: {
      'border-left-color': actionColor,
      'border-right-color': actionColor,
    },
  };
}
