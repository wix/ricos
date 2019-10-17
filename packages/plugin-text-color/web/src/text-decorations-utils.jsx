import { TEXT_HIGHLIGHT_TYPE } from './types';

const textColorMapper = color => JSON.stringify({ FG: color });
const textHighlightMapper = color => JSON.stringify({ BG: color });

const splitStyle = style => {
  const _style = JSON.parse(style);
  return [...Object.keys(_style), ...Object.values(_style)];
};

const isTextDecoration = (style, type) => {
  const splitted = splitStyle(style);
  return splitted.length === 2 && splitted[0] === type;
};

export const getColor = style => {
  return splitStyle(style)[1];
};

export const isTextHighlight = style => isTextDecoration(style, 'BG');

export const isTextColor = style => isTextDecoration(style, 'FG');

export const styleMapper = type => {
  return type === TEXT_HIGHLIGHT_TYPE ? textHighlightMapper : textColorMapper;
};
