import { isHexColor } from 'wix-rich-content-common';

export const getCustomStyleFn = colorMap => styles =>
  styles
    .toArray()
    .reduce(
      (cssStyle, style) => (
        { ...cssStyle, ...(isHexColor(colorMap[style]) ? { color: colorMap[style] } : {}) }, {}
      )
    );

export const getStyleSelectionPredicate = colorMap => style => isHexColor(colorMap[style]);

export const getPalleteColors = colorMap => Object.values(colorMap);
