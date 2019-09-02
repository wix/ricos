import { isHexColor } from 'wix-rich-content-common';

export const DEFAULT_PALETTE = ['#303030', '#303030', '#3a54b4', '#bfad80', '#bf695c', '#f7f7f7'];
export const DEFAULT_COLOR = '#000000';
export const PANEL_WIDTH = 216;
export const PANEL_HEIGHT = 116;

export const DEFAULT_STYLE_SELECTION_PREDICATE = style => isHexColor(style);

export const DEFAULT_STYLE_FN = style => (isHexColor(style) ? { color: style } : {});

export const DEFAULT_STYLE_FN_DRAFT = styles =>
  styles.toArray().reduce((cssStyle, style) => ({ ...cssStyle, ...DEFAULT_STYLE_FN(style) }), {}); // eslint-disable-line new-cap
