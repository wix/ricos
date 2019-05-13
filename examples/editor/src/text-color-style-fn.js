import { isHexColor } from 'wix-rich-content-common';

export const colorScheme = {
  color1: {
    color: '#fff',
    index: 0,
  },
  color2: {
    color: '#303030',
    index: 1,
  },
  color3: {
    color: '#bfad80',
    index: 2,
  },
  color4: {
    color: '#bf695c',
    index: 3,
  },
  color5: {
    color: '#f7f7f7',
    index: 4,
  },
  color6: {
    color: '#f7f7f7',
    index: 5,
  },
};

export const viewerCustomStyleFn = style => {
  let colorRule = {};
  if (colorScheme[style] && isHexColor(colorScheme[style].color)) {
    colorRule = { color: colorScheme[style].color };
  } else if (isHexColor(style)) {
    colorRule = { color: style };
  }
  return colorRule;
};

export const customStyleFn = styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...viewerCustomStyleFn(style),
    };
  }, {});

export const styleSelectionPredicate = style =>
  (colorScheme[style] && isHexColor(colorScheme[style].color)) || isHexColor(style);
