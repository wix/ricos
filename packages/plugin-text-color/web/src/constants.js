import { isTextHighlight, isTextColor, getColor } from './text-decorations-utils';
import { isHexColor } from 'wix-rich-content-common';

export const DEFAULT_PALETTE = ['#ffffff', '#303030', '#3a54b4', '#bfad80', '#bf695c', '#f7f7f7'];
export const DEFAULT_COLOR = '#000000';
export const DEFAULT_HIGHLIGHT_COLOR = '#ffffff00';
export const PANEL_WIDTH = 216;
export const PANEL_HEIGHT = 116;

export const DEFAULT_STYLE_SELECTION_PREDICATE = style => isHexColor(style);

export const DEFAULT_FOREGROUND_STYLE_FN = style => {
  if (isTextColor(style)) {
    const color = getColor(style);
    return isHexColor(color) ? { color } : {};
  }
  return {};
};

export const DEFAULT_FOREGROUND_STYLE_FN_DRAFT = styles =>
  styles
    .toArray()
    .reduce((cssStyle, style) => ({ ...cssStyle, ...DEFAULT_FOREGROUND_STYLE_FN(style) }), {}); // eslint-disable-line new-cap

export const DEFAULT_BACKGROUND_STYLE_FN = style => {
  if (isTextHighlight(style)) {
    const color = getColor(style);
    return isHexColor(color) ? { backgroundColor: color, transition: 'all .8s' } : {};
  }
  return {};
};

export const DEFAULT_BACKGROUND_STYLE_FN_DRAFT = styles =>
  styles
    .toArray()
    .reduce((cssStyle, style) => ({ ...cssStyle, ...DEFAULT_BACKGROUND_STYLE_FN(style) }), {}); // eslint-disable-line new-cap

let userColors = [];
export const DEFAULTS = {
  configTextColor: {
    editor: {
      onColorAdded: color => (userColors = [...userColors, color]),
      getUserColors: () => userColors,
    },
    viewer: {},
  },
  configTextHighlight: {
    editor: {
      onColorAdded: color => (userColors = [...userColors, color]),
      getUserColors: () => userColors,
    },
    viewer: {},
  },
};
