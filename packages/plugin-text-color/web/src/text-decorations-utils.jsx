import { TEXT_HIGHLIGHT_TYPE } from './types';

const textColorMapper = color => JSON.stringify({ FG: color });
const textHighlightMapper = color => JSON.stringify({ BG: color });

const splitStyle = style => {
  if (
    /^[\],:{}\s]*$/.test(
      style
        .replace(/\\["\\/bfnrtu]/g, '@')
        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    )
  ) {
    const _style = JSON.parse(style);
    return [...Object.keys(_style), ...Object.values(_style)];
  } else {
    return [style];
  }
};

const isTextDecoration = (style, type) => {
  const splitted = splitStyle(style);
  return splitted.length === 2 && splitted[0] === type;
};

const getColorByType = (style, type) => {
  const splitted = splitStyle(style);
  if (splitted.length === 2) {
    return splitted[0] === type ? splitted[1] : '';
  }
  return type === 'FG' ? style : '';
};

export const getColor = style => {
  const splitted = splitStyle(style);
  return splitted.length === 2 ? splitted[1] : splitted[0];
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
  return type === TEXT_HIGHLIGHT_TYPE ? textHighlightMapper : textColorMapper;
};
