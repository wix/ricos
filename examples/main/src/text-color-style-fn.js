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

export const viewerCustomForegroundStyleFn = style => {
  let colorRule = {};
  if (colorScheme[style] && isHexColor(colorScheme[style].color)) {
    colorRule = { color: colorScheme[style].color };
  } else if (isHexColor(style)) {
    colorRule = { color: style };
  }
  return colorRule;
};

export const customForegroundStyleFn = styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...viewerCustomForegroundStyleFn(style),
    };
  }, {});

export const viewerCustomBackgroundStyleFn = style => {
  let colorRule = {};
  if (colorScheme[style] && isHexColor(colorScheme[style].color)) {
    colorRule = { backgroundColor: colorScheme[style].color };
  } else if (isHexColor(style)) {
    colorRule = { backgroundColor: style };
  }
  return colorRule;
};

export const customBackgroundStyleFn = styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...viewerCustomBackgroundStyleFn(style),
    };
  }, {});

export const styleSelectionPredicate = style => {
  return (colorScheme[style] && isHexColor(colorScheme[style].color)) || isHexColor(style);
};
