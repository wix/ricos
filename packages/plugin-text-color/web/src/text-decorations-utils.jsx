import { isHexColor } from 'wix-rich-content-common';

const splitStyle = style => style.split(':');

const isTextDecoration = (style, type) => {
  const splitted = splitStyle(style);
  return splitted.length === 2 && splitted[0] === type && isHexColor(splitted[1]);
};

export const getColor = style => style.split(':')[1];

export const isTextHighlight = style => isTextDecoration(style, 'bg');

export const isTextColor = style => isTextDecoration(style, 'fg');
