import head from 'lodash/head';
import { isHexColor } from 'wix-rich-content-common';

export const getViewerCustomStyleFn = colorMap => style => {
  let colorRule = {};
  if (isHexColor(colorMap[style])) {
    colorRule = { color: colorMap[style] };
  } else if (isHexColor(style)) {
    colorRule = { color: style };
  }
  return colorRule;
};

export const getCustomStyleFn = colorMap => styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...getViewerCustomStyleFn(colorMap)(style),
    };
  }, {});

export const getStyleSelectionPredicate = colorMap => style =>
  isHexColor(colorMap[style]) || isHexColor(style);

export const getColorToStyle = colorMap => color =>
  head(Object.keys(colorMap).filter(key => colorMap[key] === color)) || color;

export const getStyleToColor = colorMap => style => colorMap[style] || style;

export const getPaletteColors = colorMap => Object.values(colorMap);
