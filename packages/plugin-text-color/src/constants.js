import { isHexColor } from 'wix-rich-content-common';

export const DEFAULT_PALETTE = ['#303030', '#303030', '#3a54b4', '#bfad80', '#bf695c', '#f7f7f7'];
export const DEFAULT_COLOR = '#000000';
export const DEFAULT_SELECTION_COLOR = '#000000';
export const PANEL_WIDTH = 216;
export const PANEL_HEIGHT = 116;
export const MODAL_STYLES = {
  desktop: {
    content: {
      display: 'inline-table',
      minHeight: PANEL_HEIGHT,
      height: 'auto',
      position: 'absolute',
      borderRadius: 6,
      border: 'solid 1px #ededed',
      margin: 0,
      minWidth: PANEL_WIDTH,
      maxWidth: 360,
      width: 'auto',
    },
    overlay: {
      background: 'transparent',
    },
  },
  mobile: {
    content: {
      display: 'inline-table',
      position: 'absolute',
      boxShadow: '4px 0 4px 0 rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.1)',
      margin: 0,
      bottom: 0,
      top: 'unset',
      transform: 'unset',
      width: '100%',
    },
    overlay: {
      background: 'transparent',
    },
  },
};

export const DEFAULT_COLOR_TO_STYLE = color => color;

export const DEFAULT_STYLE_TO_COLOR = style => style;

export const DEFAULT_STYLE_SELECTION_PREDICATE = style => isHexColor(style);

export const DEFAULT_STYLE_FN = style => (isHexColor(style) ? { color: style } : {});

export const DEFAULT_STYLE_FN_DRAFT = styles =>
  styles.toArray().reduce((cssStyle, style) => ({ ...cssStyle, ...DEFAULT_STYLE_FN(style) }), {}); // eslint-disable-line new-cap
