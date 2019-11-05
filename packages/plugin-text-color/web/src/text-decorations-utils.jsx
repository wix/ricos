import { TEXT_HIGHLIGHT_TYPE } from './types';

const normalizeStyle = style => {
  try {
    return JSON.parse(style);
  } catch (e) {
    return { FG: style };
  }
};

const isTextDecoration = (style, type) => {
  const parsed = normalizeStyle(style);
  return !!parsed[type];
};

const getColorByType = (style, type) => {
  const parsed = normalizeStyle(style);
  return parsed[type] || '';
};

export const getColor = style => {
  const parsed = normalizeStyle(style);
  return Object.values(parsed)[0];
};

export const textColorPredicateWrapper = styleSelectionPredicate => {
  return style => styleSelectionPredicate(getColorByType(style, 'FG'));
};

export const textHighlightPredicateWrapper = styleSelectionPredicate => {
  return style => styleSelectionPredicate(getColorByType(style, 'BG'));
};

export const customStyleFnWrapper = (customStyleFn, styleFilter) => {
  return styles => {
    const _styles = styles.filter(style => styleFilter(style)).map(style => getColor(style));
    return customStyleFn(_styles);
  };
};

export const viewerCustomStyleFnWrapper = (viewerCustomStyleFn, styleFilter) => {
  return style => {
    const _style = styleFilter(style) ? getColor(style) : '';
    return viewerCustomStyleFn(_style);
  };
};

export const isTextHighlight = style => isTextDecoration(style, 'BG');

export const isTextColor = style => !isTextDecoration(style, 'BG');

export const styleMapper = type => {
  return type === TEXT_HIGHLIGHT_TYPE
    ? color => JSON.stringify({ BG: color })
    : color => JSON.stringify({ FG: color });
};
