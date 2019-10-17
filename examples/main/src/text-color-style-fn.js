import { isHexColor } from 'wix-rich-content-common';
import { getColor, isTextHighlight, isTextColor } from 'wix-rich-content-plugin-text-color';

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
  if (isTextHighlight(style)) {
    return colorRule;
  }
  const _style = isTextColor(style) ? getColor(style) : style;
  if (colorScheme[_style] && isHexColor(colorScheme[_style].color)) {
    colorRule = { color: colorScheme[_style].color };
  } else if (isHexColor(_style)) {
    colorRule = { color: _style };
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

export const viewerCustomBackgroundStyleFn = style => {
  let colorRule = {};
  if (isTextHighlight(style)) {
    const _style = getColor(style);
    if (colorScheme[_style] && isHexColor(colorScheme[_style].color)) {
      colorRule = { backgroundColor: colorScheme[_style].color, transition: 'all .8s' };
    } else if (isHexColor(_style)) {
      colorRule = { backgroundColor: _style, transition: 'all .8s' };
    }
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

export const styleSelectionFGPredicate = style => {
  if (isTextHighlight(style)) {
    return false;
  }
  const _style = isTextColor(style) ? getColor(style) : style;
  (colorScheme[_style] && isHexColor(colorScheme[_style].color)) || isHexColor(_style);
};

export const styleSelectionBGPredicate = style => {
  if (isTextHighlight(style)) {
    const _style = getColor(style);
    return (colorScheme[_style] && isHexColor(colorScheme[_style].color)) || isHexColor(_style);
  }
  return false;
};
