import { isTextHighlight, isTextColor, getColor } from './text-decorations-utils';
import { isHexColor } from 'wix-rich-content-common';

export const DEFAULT_PALETTE = ['#303030', '#303030', '#3a54b4', '#bfad80', '#bf695c', '#f7f7f7'];
export const DEFAULT_COLOR = '#000000';
export const PANEL_WIDTH = 216;
export const PANEL_HEIGHT = 116;

export const DEFAULT_STYLE_SELECTION_PREDICATE = style => isHexColor(style);

export const DEFAULT_STYLE_FN = style => (isTextColor(style) ? { color: getColor(style) } : {});

export const DEFAULT_STYLE_FN_DRAFT = styles =>
  styles.toArray().reduce((cssStyle, style) => ({ ...cssStyle, ...DEFAULT_STYLE_FN(style) }), {}); // eslint-disable-line new-cap

export const DEFAULT_BACKGROUND_STYLE_FN = style =>
  isTextHighlight(style) ? { 'background-color': getColor(style), transition: 'all .8s' } : {};

export const DEFAULT_BACKGROUND_STYLE_FN_DRAFT = styles =>
  styles
    .toArray()
    .reduce((cssStyle, style) => ({ ...cssStyle, ...DEFAULT_BACKGROUND_STYLE_FN(style) }), {}); // eslint-disable-line new-cap
